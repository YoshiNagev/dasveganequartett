import type { APIRoute } from "astro";
import type Stripe from "stripe";
import {
  createServerPreorderQuote,
  PreorderValidationError,
} from "../../../lib/server/preorder";
import { stripe } from "../../../lib/server/stripe";
import { supabaseAdmin } from "../../../lib/server/supabaseAdmin";
import {
  sendOrderConfirmationEmail,
  type ConfirmationOrder,
} from "../../../lib/server/orderConfirmationEmail";

export const prerender = false;

const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

function text(message: string, status = 200): Response {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function parseIntegerMetadata(
  value: string | null | undefined,
  fieldName: string
): number {
  if (!value || !/^\d+$/.test(value)) {
    throw new Error(`Ungültige Stripe-Metadaten: ${fieldName}.`);
  }

  return Number(value);
}

function getPaymentIntentId(
  paymentIntent: string | Stripe.PaymentIntent | null
): string | null {
  if (!paymentIntent) return null;
  return typeof paymentIntent === "string"
    ? paymentIntent
    : paymentIntent.id;
}

type SessionWithCollectedShipping = Stripe.Checkout.Session & {
  collected_information?: {
    shipping_details?: {
      name?: string | null;
      address?: Stripe.Address | null;
    } | null;
  } | null;
};

function getShippingDetails(session: Stripe.Checkout.Session) {
  const extendedSession = session as SessionWithCollectedShipping;
  const collected =
    extendedSession.collected_information?.shipping_details;
  const customer = session.customer_details;

  return {
    name: collected?.name ?? customer?.name ?? null,
    address: collected?.address ?? customer?.address ?? null,
  };
}

function statusFromSession(
  session: Stripe.Checkout.Session,
  eventType: string
): "pending" | "paid" | "cancelled" {
  if (
    eventType === "checkout.session.async_payment_succeeded" ||
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required"
  ) {
    return "paid";
  }

  if (
    eventType === "checkout.session.async_payment_failed" ||
    eventType === "checkout.session.expired"
  ) {
    return "cancelled";
  }

  return "pending";
}

type StoredOrder = ConfirmationOrder & {
  status: "pending" | "paid" | "cancelled" | "refunded" | "shipped";
  confirmation_email_sent_at: string | null;
};

async function saveCheckoutSession(
  session: Stripe.Checkout.Session,
  eventType: string
): Promise<StoredOrder> {
  const metadata = session.metadata ?? {};

  if (metadata.product !== "das-vegane-quartett") {
    throw new Error("Unbekanntes Produkt in der Checkout-Session.");
  }

  const quantity = parseIntegerMetadata(metadata.quantity, "quantity");
  const expectedQuote = createServerPreorderQuote(quantity);

  const metadataUnitPrice = parseIntegerMetadata(
    metadata.unit_price_cents,
    "unit_price_cents"
  );
  const metadataShipping = parseIntegerMetadata(
    metadata.shipping_cost_cents,
    "shipping_cost_cents"
  );
  const metadataExpectedTotal = parseIntegerMetadata(
    metadata.expected_total_cents,
    "expected_total_cents"
  );

  if (
    metadataUnitPrice !== expectedQuote.unitPriceCents ||
    metadataShipping !== expectedQuote.shippingCostCents ||
    metadataExpectedTotal !== expectedQuote.totalCents
  ) {
    throw new Error(
      "Stripe-Metadaten und serverseitige Preisberechnung stimmen nicht überein."
    );
  }

  if (
    session.currency !== expectedQuote.currency ||
    session.amount_total !== expectedQuote.totalCents
  ) {
    throw new Error(
      "Der von Stripe bestätigte Betrag oder die Währung ist ungültig."
    );
  }

  const status = statusFromSession(session, eventType);
  const shipping = getShippingDetails(session);
  const now = new Date().toISOString();

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .upsert(
      {
        user_id: null,
        quantity: expectedQuote.quantity,
        unit_price_cents: expectedQuote.unitPriceCents,
        shipping_cost_cents: expectedQuote.shippingCostCents,
        total_cents: expectedQuote.totalCents,
        currency: expectedQuote.currency,
        status,
        customer_email: session.customer_details?.email ?? null,
        shipping_name: shipping.name,
        shipping_address: shipping.address,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: getPaymentIntentId(
          session.payment_intent
        ),
        paid_at: status === "paid" ? now : null,
      },
      {
        onConflict: "stripe_checkout_session_id",
      }
    )
    .select(`
      id,
      order_number,
      quantity,
      unit_price_cents,
      shipping_cost_cents,
      total_cents,
      currency,
      status,
      customer_email,
      shipping_name,
      shipping_address,
      confirmation_email_sent_at
    `)
    .single();

  if (error || !order) {
    throw new Error(
      `Supabase konnte die Bestellung nicht speichern: ${
        error?.message ?? "Keine Bestellung zurückgegeben."
      }`
    );
  }

  return order as StoredOrder;
}

async function sendConfirmationIfNeeded(
  order: StoredOrder
): Promise<void> {
  if (
    !["paid", "shipped"].includes(order.status) ||
    order.confirmation_email_sent_at
  ) {
    return;
  }

  if (!order.customer_email) {
    await supabaseAdmin
      .from("orders")
      .update({
        confirmation_email_status: "failed",
        confirmation_email_error:
          "Keine Kunden-E-Mail in der Stripe-Session vorhanden.",
      })
      .eq("id", order.id);

    return;
  }

  const { data: claimed, error: claimError } =
    await supabaseAdmin.rpc(
      "claim_order_confirmation_email",
      {
        target_order_id: order.id,
      }
    );

  if (claimError) {
    throw new Error(
      `Bestellmail konnte nicht reserviert werden: ${claimError.message}`
    );
  }

  if (!claimed) {
    return;
  }

  try {
    const resendId = await sendOrderConfirmationEmail(order);

    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        confirmation_email_status: "sent",
        confirmation_email_sent_at: new Date().toISOString(),
        confirmation_email_resend_id: resendId,
        confirmation_email_error: null,
      })
      .eq("id", order.id);

    if (updateError) {
      throw new Error(
        `E-Mail-Status konnte nicht gespeichert werden: ${updateError.message}`
      );
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unbekannter Fehler beim E-Mail-Versand.";

    await supabaseAdmin
      .from("orders")
      .update({
        confirmation_email_status: "failed",
        confirmation_email_error: message.slice(0, 2000),
      })
      .eq("id", order.id);

    throw error;
  }
}

async function processCheckoutSession(
  session: Stripe.Checkout.Session,
  eventType: string
): Promise<void> {
  const order = await saveCheckoutSession(session, eventType);
  await sendConfirmationIfNeeded(order);
}

export const POST: APIRoute = async ({ request }) => {
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET fehlt.");
    return text("Webhook ist nicht konfiguriert.", 500);
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return text("Stripe-Signatur fehlt.", 400);
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Ungültige Stripe-Webhook-Signatur:", error);
    return text("Ungültige Stripe-Signatur.", 400);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        await processCheckoutSession(session, event.type);
        break;
      }

      default:
        break;
    }

    return text("ok", 200);
  } catch (error) {
    if (error instanceof PreorderValidationError) {
      console.error("Ungültige Bestellmenge im Webhook:", error);
      return text(error.message, 400);
    }

    console.error(
      "Stripe-Webhook-Verarbeitung fehlgeschlagen:",
      error
    );

    return text(
      import.meta.env.DEV && error instanceof Error
        ? `Webhook-Verarbeitung fehlgeschlagen: ${error.message}`
        : "Webhook-Verarbeitung fehlgeschlagen.",
      500
    );
  }
};

export const ALL: APIRoute = async () =>
  text("Methode nicht erlaubt.", 405);
