import type { APIRoute } from "astro";
import { AccessAuthError, requireApiUser } from "../../../lib/server/access";
import {
  accessCodeHint,
  createAccessCode,
  hashAccessCode,
} from "../../../lib/server/accessTokens";
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const user = await requireApiUser(request);
    const body = (await request.json()) as { licenseId?: unknown };
    if (typeof body.licenseId !== "string") {
      return json({ error: "Zugang fehlt." }, 400);
    }

    const { data: license, error: licenseError } = await supabaseAdmin
      .from("access_licenses")
      .select("id, status, claimed_by, order_id")
      .eq("id", body.licenseId)
      .maybeSingle();

    if (licenseError) throw licenseError;
    const { data: order } = license?.order_id
      ? await supabaseAdmin
          .from("orders")
          .select("user_id")
          .eq("id", license.order_id)
          .maybeSingle()
      : { data: null };

    if (!license || order?.user_id !== user.id) {
      return json({ error: "Dieser Zugang gehört nicht zu deiner Bestellung." }, 403);
    }

    if (license.status === "revoked") {
      return json({ error: "Dieser Zugang wurde gesperrt." }, 409);
    }

    if (license.claimed_by && license.claimed_by !== user.id) {
      return json({ error: "Der Zugang wurde bereits von einer anderen Person aktiviert." }, 409);
    }

    const code = createAccessCode();
    const claimTokenHash = await hashAccessCode(code);
    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .update({
        status: "available",
        claimed_by: null,
        claimed_at: null,
        claim_token_hash: claimTokenHash,
        claim_token_hint: accessCodeHint(code),
      })
      .eq("id", license.id)
      .neq("status", "revoked")
      .or(`claimed_by.is.null,claimed_by.eq.${user.id}`)
      .select("id")
      .maybeSingle();

    if (error) throw error;
    if (!data) return json({ error: "Der Geschenklink konnte nicht erstellt werden." }, 409);

    const siteUrl = (
      import.meta.env.PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
    ).replace(/\/+$/, "");

    return json({
      ok: true,
      code,
      giftUrl: `${siteUrl}/freischalten?code=${encodeURIComponent(code)}`,
    });
  } catch (error) {
    if (error instanceof AccessAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Gift access failed:", error);
    return json({ error: "Der Geschenklink konnte nicht erstellt werden." }, 500);
  }
};
