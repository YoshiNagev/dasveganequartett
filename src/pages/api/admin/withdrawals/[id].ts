import type { APIRoute } from "astro";
import { requireAdmin, AdminAuthError } from "../../../../lib/server/adminAuth";
import { supabaseAdmin } from "../../../../lib/server/supabaseAdmin";
import { stripe } from "../../../../lib/server/stripe";
import { syncRefunds } from "../../../../lib/server/refunds";
export const prerender = false;
const json = (body: unknown,status=200) => new Response(JSON.stringify(body),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
export const POST: APIRoute = async ({request,params}) => {
 try {
  const admin = await requireAdmin(request);
  const body = await request.json().catch(()=>null);
  if(!body || !params.id) return json({error:"Ungültige Anfrage."},400);
  const {data:w,error} = await supabaseAdmin.from("withdrawals").select("*").eq("id",params.id).maybeSingle();
  if(error) throw error;
  if(!w) return json({error:"Widerruf nicht gefunden."},404);
  const audit = { reviewed_by:admin.id, reviewed_at:new Date().toISOString() };
  if(body.action === "close" || body.action === "reopen") {
   const note = typeof body.note === "string" ? body.note.trim().slice(0,2000) : "";
   if(body.action === "close" && !note) return json({error:"Bitte Bearbeitungsnotiz angeben."},400);
   const {error:e} = await supabaseAdmin.from("withdrawals").update({...audit,status:body.action === "close" ? "closed":"open",admin_note:note}).eq("id",w.id);
   if(e) throw e;
   return json({message:"Bearbeitungsstatus gespeichert."});
  }
  if(body.action === "assign") {
   const ref = typeof body.orderReference === "string" ? body.orderReference.trim().toUpperCase() : "";
   const {data:o,error:e} = await supabaseAdmin.from("orders").select("id").eq("order_number",ref).maybeSingle();
   if(e) throw e;
   if(!o) return json({error:"Bestellung nicht gefunden."},404);
   const {error:save} = await supabaseAdmin.from("withdrawals").update({...audit,order_id:o.id}).eq("id",w.id);
   if(save) throw save;
   return json({message:"Bestellung zugeordnet. Identität und Umfang vor einer Erstattung prüfen."});
  }
  if(!["sync","refund"].includes(body.action)) return json({error:"Unbekannte Aktion."},400);
  if(!w.order_id) return json({error:"Bitte zuerst eine Bestellung zuordnen."},409);
  const {data:o,error:oe} = await supabaseAdmin.from("orders").select("*").eq("id",w.order_id).single();
  if(oe) throw oe;
  if(!o.stripe_payment_intent_id) return json({error:"Keine Stripe-Zahlung zugeordnet."},409);
  const summary = await syncRefunds(o.stripe_payment_intent_id);
  if(body.action === "sync") return json({message:"Stripe-Erstattungsstatus aktualisiert."});
  if(w.status !== "open" || w.scope !== "Gesamte Bestellung") return json({error:"Nur offene vollständige Widerrufe können hier erstattet werden. Teilbeträge bitte direkt in Stripe bearbeiten."},409);
  if(body.confirmOrder !== o.order_number || body.confirmAmount !== o.total_cents || body.reviewed !== true)
    return json({error:"Bitte Bestellung, Betrag und Berechtigung bestätigen."},400);
  if(!summary || summary.refunds.length) return json({error:"Es existiert bereits ein Erstattungsvorgang. Bitte dessen Status in Stripe prüfen; keine weitere Erstattung ausgelöst."},409);
  const payment = await stripe.paymentIntents.retrieve(o.stripe_payment_intent_id);
  if(payment.status !== "succeeded" || payment.amount_received !== o.total_cents || payment.currency !== o.currency)
    return json({error:"Zahlung nicht erfolgreich oder Betrag/Währung stimmen nicht überein."},409);
  // Unique order_id schützt auch bei mehreren Widerrufen und parallelen Requests.
  const {error:claimError} = await supabaseAdmin.from("order_refund_requests").insert({order_id:o.id,withdrawal_id:w.id,requested_by:admin.id});
  if(claimError) {
   if(claimError.code === "23505") return json({error:"Für diese Bestellung wurde bereits ein Erstattungsversuch gestartet. Status abgleichen und gegebenenfalls direkt in Stripe prüfen."},409);
   throw claimError;
  }
  const refund = await stripe.refunds.create({payment_intent:o.stripe_payment_intent_id,amount:o.total_cents,
    reason:"requested_by_customer",metadata:{order_id:o.id,withdrawal_reference:w.reference}},
    {idempotencyKey:`dvq-full-refund-${o.id}`});
  const {error:saveError} = await supabaseAdmin.from("order_refund_requests").update({stripe_refund_id:refund.id,status:refund.status ?? "pending"}).eq("order_id",o.id);
  if(saveError) throw saveError;
  const {error:auditError} = await supabaseAdmin.from("withdrawals").update(audit).eq("id",w.id);
  if(auditError) throw auditError;
  await syncRefunds(o.stripe_payment_intent_id);
  return json({message:refund.status === "succeeded" ? "Stripe bestätigt die vollständige Erstattung. Widerruf nach Prüfung abschließen." : "Erstattung an Stripe übergeben. Status prüfen; noch nicht als abgeschlossen behandeln."});
 } catch(e) {
  if(e instanceof AdminAuthError) return json({error:e.message},e.status);
  console.error("Withdrawal action failed", e instanceof Error ? e.message : "unknown");
  return json({error:"Aktion nicht abschließend bestätigt. Vor einem weiteren Versuch Stripe-Status abgleichen. Bei einem Erstattungsversuch bleibt die Doppelauszahlungssperre bestehen."},500);
 }
};
