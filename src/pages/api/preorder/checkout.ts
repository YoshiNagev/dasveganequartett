import type { APIRoute } from "astro";
import { preorderConfig } from "../../../data/preorderConfig";
import {
  createServerPreorderQuote,
  PreorderValidationError,
} from "../../../lib/server/preorder";
import { stripe } from "../../../lib/server/stripe";

export const prerender = false;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getSiteUrl(request: Request): string {
  const configuredUrl = import.meta.env.PUBLIC_SITE_URL?.trim();
  return (configuredUrl || new URL(request.url).origin).replace(/\/+$/, "");
}

export const POST: APIRoute = async ({ request }) => {
  const checkoutEnabled = import.meta.env.DEV || preorderConfig.preorderOpen;

  if (!checkoutEnabled) {
    return json(
      { error: "Die Vorbestellung ist derzeit noch nicht geöffnet." },
      403
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Die Anfrage enthält kein gültiges JSON." }, 400);
  }

  try {
    const quantity =
      typeof body === "object" && body !== null && "quantity" in body
        ? (body as { quantity?: unknown }).quantity
        : undefined;

    const quote = createServerPreorderQuote(quantity);
    const siteUrl = getSiteUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "de",
      success_url:
        `${siteUrl}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/preorder/cancelled`,
      customer_creation: "always",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["DE"],
      },
      line_items: [
        {
          quantity: quote.quantity,
          price_data: {
            currency: quote.currency,
            unit_amount: quote.unitPriceCents,
            product_data: {
              name: "Das Vegane Quartett",
              description:
                "Presale · voraussichtlicher Versand im Dezember 2026",
            },
          },
        },
        {
          quantity: 1,
          price_data: {
            currency: quote.currency,
            unit_amount: quote.shippingCostCents,
            product_data: {
              name: "Versand",
              description:
                "Pauschale Versandkosten pro Bestellung innerhalb Deutschlands",
            },
          },
        },
      ],
      metadata: {
        product: "das-vegane-quartett",
        quantity: String(quote.quantity),
        unit_price_cents: String(quote.unitPriceCents),
        shipping_cost_cents: String(quote.shippingCostCents),
        expected_total_cents: String(quote.totalCents),
        estimated_shipping_date: quote.estimatedShippingDate,
      },
    });

    if (!session.url) {
      return json(
        { error: "Stripe hat keine Checkout-Adresse zurückgegeben." },
        500
      );
    }

    return json({ checkoutUrl: session.url, sessionId: session.id });
  } catch (error) {
    if (error instanceof PreorderValidationError) {
      return json({ error: error.message }, error.status);
    }

    console.error("Stripe checkout error:", error);

    return json(
      {
        error:
          "Der Stripe-Checkout konnte nicht gestartet werden. Prüfe den Testschlüssel und versuche es erneut.",
      },
      500
    );
  }
};

export const ALL: APIRoute = async () =>
  json({ error: "Methode nicht erlaubt." }, 405);
