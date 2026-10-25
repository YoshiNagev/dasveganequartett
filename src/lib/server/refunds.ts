import { stripe } from "./stripe";
import { supabaseAdmin } from "./supabaseAdmin";
import { refundSummary } from "./refundSummary";

export async function syncRefunds(paymentIntentId: string) {
 const { data: order, error } = await supabaseAdmin.from("orders")
   .select("id,total_cents,status").eq("stripe_payment_intent_id",paymentIntentId).maybeSingle();
 if (error) throw error;
 if (!order) return null;
 // Alle Seiten lesen und aktuelle Stripe-Objekte nutzen, nicht veraltete Eventdaten.
 const refunds = [];
 for await (const refund of stripe.refunds.list({ payment_intent: paymentIntentId, limit: 100 })) refunds.push(refund);
 const summary = refundSummary(refunds, order.total_cents);
 const { error: saveError } = await supabaseAdmin.from("orders").update({
   refund_status: summary.status, refunded_amount_cents: summary.amount,
   refund_checked_at: new Date().toISOString(),
   ...(summary.status === "succeeded" ? { status: "refunded" } : {}),
 }).eq("id",order.id);
 if (saveError) throw saveError;
 if (summary.status === "succeeded") {
   const { error: licenseError } = await supabaseAdmin.from("access_licenses")
     .update({ status: "revoked", revoked_at: new Date().toISOString(), claim_token_hash: null })
     .eq("order_id",order.id).neq("status","revoked");
   if (licenseError) throw licenseError;
 }
 return { ...summary, refunds };
}
