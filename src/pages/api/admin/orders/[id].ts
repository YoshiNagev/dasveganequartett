import type { APIRoute } from "astro";
import { requireAdmin, AdminAuthError } from "../../../../lib/server/adminAuth";
import { supabaseAdmin } from "../../../../lib/server/supabaseAdmin";

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    await requireAdmin(request);
    if (!params.id) return json({ error: "Bestell-ID fehlt." }, 400);
    const body = await request.json().catch(() => null) as { action?: unknown } | null;
    const action = body?.action;
    if (action !== "mark_shipped" && action !== "undo_shipped") return json({ error: "Ungültige Aktion." }, 400);

    const { data: current, error: selectError } = await supabaseAdmin.from("orders").select("id,status").eq("id", params.id).maybeSingle();
    if (selectError) throw selectError;
    if (!current) return json({ error: "Bestellung nicht gefunden." }, 404);

    if (action === "mark_shipped" && current.status !== "paid") return json({ error: "Nur bezahlte Bestellungen können als versendet markiert werden." }, 409);
    if (action === "undo_shipped" && current.status !== "shipped") return json({ error: "Nur versendete Bestellungen können zurückgesetzt werden." }, 409);

    const update = action === "mark_shipped"
      ? { status: "shipped", shipped_at: new Date().toISOString() }
      : { status: "paid", shipped_at: null };

    const { data: order, error } = await supabaseAdmin.from("orders").update(update).eq("id", params.id).select("id,order_number,quantity,unit_price_cents,shipping_cost_cents,total_cents,currency,status,customer_email,shipping_name,shipping_address,stripe_checkout_session_id,stripe_payment_intent_id,created_at,updated_at,paid_at,shipped_at").single();
    if (error) throw error;
    return json({ order });
  } catch (error) {
    if (error instanceof AdminAuthError) return json({ error: error.message }, error.status);
    console.error("Admin order update failed:", error);
    return json({ error: "Der Versandstatus konnte nicht geändert werden." }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: "Methode nicht erlaubt." }, 405);
