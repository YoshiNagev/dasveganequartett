import type { APIRoute } from "astro";
import {
  AccessAuthError,
  requireApiUser,
  userHasFullAccess,
} from "../../../lib/server/access";
import { supabaseAdmin } from "../../../lib/server/supabaseAdmin";

export const prerender = false;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await requireApiUser(request);
    const [{ data: profile }, { data: orders, error: ordersError }] =
      await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("nickname, role")
          .eq("id", user.id)
          .maybeSingle(),
        supabaseAdmin
          .from("orders")
          .select("id, order_number, quantity, status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

    if (ordersError) throw ordersError;

    const orderIds = (orders ?? []).map((order) => order.id);
    let licenseQuery = supabaseAdmin
      .from("access_licenses")
      .select(
        "id, source, order_id, order_item_number, status, claimed_by, claim_token_hint, note, created_at"
      )
      .order("created_at", { ascending: true });

    if (orderIds.length > 0) {
      licenseQuery = licenseQuery.or(
        `claimed_by.eq.${user.id},order_id.in.(${orderIds.join(",")})`
      );
    } else {
      licenseQuery = licenseQuery.eq("claimed_by", user.id);
    }

    const { data: licenses, error: licensesError } = await licenseQuery;
    if (licensesError) throw licensesError;

    const orderMap = new Map(
      (orders ?? []).map((order) => [order.id, order])
    );

    return json({
      account: {
        email: user.email ?? "",
        nickname: profile?.nickname ?? "Profil",
      },
      hasFullAccess: await userHasFullAccess(user.id),
      licenses: (licenses ?? []).map((license) => ({
        id: license.id,
        source: license.source,
        orderNumber: license.order_id
          ? orderMap.get(license.order_id)?.order_number ?? null
          : null,
        itemNumber: license.order_item_number,
        status:
          license.status === "revoked"
            ? "revoked"
            : license.claimed_by === user.id
              ? "mine"
              : license.claimed_by
                ? "claimed"
                : "available",
        note: license.note,
        codeHint: license.claim_token_hint,
      })),
    });
  } catch (error) {
    if (error instanceof AccessAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Access status failed:", error);
    return json({ error: "Die Zugänge konnten nicht geladen werden." }, 500);
  }
};
