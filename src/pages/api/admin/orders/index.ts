import type { APIRoute } from "astro";
import { requireAdmin, AdminAuthError } from "../../../../lib/server/adminAuth";
import { supabaseAdmin } from "../../../../lib/server/supabaseAdmin";

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export const GET: APIRoute = async ({ request, url }) => {
  try {
    await requireAdmin(request);
    const status = url.searchParams.get("status");
    const search = (url.searchParams.get("search") ?? "").trim().replace(/[,%_]/g, " ").trim();

    let query = supabaseAdmin.from("orders").select("id,order_number,quantity,unit_price_cents,shipping_cost_cents,total_cents,currency,status,customer_email,shipping_name,shipping_address,stripe_checkout_session_id,stripe_payment_intent_id,created_at,updated_at,paid_at,shipped_at").order("created_at", { ascending: false }).limit(250);
    if (status && ["pending","paid","cancelled","refunded","shipped"].includes(status)) query = query.eq("status", status);
    if (search) query = query.or(`order_number.ilike.%${search}%,customer_email.ilike.%${search}%,shipping_name.ilike.%${search}%`);

    const { data: orders, error } = await query;
    if (error) throw error;
    const rows = orders ?? [];
    const summary = {
      orderCount: rows.length,
      deckCount: rows.reduce((sum, o) => sum + o.quantity, 0),
      revenueCents: rows.filter(o => ["paid","shipped"].includes(o.status)).reduce((sum, o) => sum + o.total_cents, 0),
      paidCount: rows.filter(o => ["paid","shipped"].includes(o.status)).length,
      shippedCount: rows.filter(o => o.status === "shipped").length,
    };
    return json({ orders: rows, summary });
  } catch (error) {
    if (error instanceof AdminAuthError) return json({ error: error.message }, error.status);
    console.error("Admin orders endpoint failed:", error);
    return json({ error: "Die Bestellungen konnten nicht geladen werden." }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: "Methode nicht erlaubt." }, 405);
