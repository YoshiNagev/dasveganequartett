import type { APIRoute } from "astro";
import { requireAdmin, AdminAuthError } from "../../../../lib/server/adminAuth";
import { supabaseAdmin } from "../../../../lib/server/supabaseAdmin";
export const prerender = false;
const json = (body: unknown, status=200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type":"application/json", "Cache-Control":"no-store" } });
export const GET: APIRoute = async ({request,url}) => {
 try {
  await requireAdmin(request);
  const page = Math.floor(Math.max(0, Math.min(100000, Number(url.searchParams.get("page")) || 0)));
  let q = supabaseAdmin.from("withdrawals").select("*,orders(id,order_number,customer_email,total_cents,status,shipped_at,stripe_payment_intent_id,refund_status,refunded_amount_cents,refund_checked_at)")
    .order("created_at",{ascending:false}).order("id").range(page*50,page*50+49);
  if (url.searchParams.get("status") !== "all") q=q.eq("status","open");
  const {data,error} = await q;
  if(error) throw error;
  return json({ withdrawals:data });
 } catch(e) {
  if(e instanceof AdminAuthError) return json({error:e.message},e.status);
  console.error("Withdrawal list failed",e);
  return json({error:"Widerrufe konnten nicht geladen werden. Migration 013 prüfen."},500);
 }
};
