import type { APIRoute } from "astro";
import { AccessAuthError, requireApiUser } from "../../../lib/server/access";
import { hashAccessCode } from "../../../lib/server/accessTokens";
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
    const body = (await request.json()) as {
      code?: unknown;
      licenseId?: unknown;
    };
    const now = new Date().toISOString();

    if (typeof body.code === "string" && body.code.trim()) {
      const tokenHash = await hashAccessCode(body.code);
      const { data, error } = await supabaseAdmin
        .from("access_licenses")
        .update({
          status: "claimed",
          claimed_by: user.id,
          claimed_at: now,
          claim_token_hash: null,
        })
        .eq("claim_token_hash", tokenHash)
        .eq("status", "available")
        .is("claimed_by", null)
        .select("id")
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return json(
          { error: "Dieser Code ist ungültig oder wurde bereits eingelöst." },
          409
        );
      }

      return json({ ok: true });
    }

    if (typeof body.licenseId !== "string") {
      return json({ error: "Zugang oder Code fehlt." }, 400);
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

    if (license.status !== "available" || license.claimed_by) {
      return json({ error: "Dieser Zugang ist nicht mehr verfügbar." }, 409);
    }

    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .update({
        status: "claimed",
        claimed_by: user.id,
        claimed_at: now,
        claim_token_hash: null,
        claim_token_hint: null,
      })
      .eq("id", license.id)
      .eq("status", "available")
      .is("claimed_by", null)
      .select("id")
      .maybeSingle();

    if (error) throw error;
    if (!data) return json({ error: "Der Zugang wurde bereits verwendet." }, 409);
    return json({ ok: true });
  } catch (error) {
    if (error instanceof AccessAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Claim access failed:", error);
    return json({ error: "Der Zugang konnte nicht aktiviert werden." }, 500);
  }
};
