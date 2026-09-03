import type { APIRoute } from "astro";
import { AdminAuthError, requireAdmin } from "../../../lib/server/adminAuth";
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

export const GET: APIRoute = async ({ request }) => {
  try {
    await requireAdmin(request);
    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .select("source, status")
      .order("created_at", { ascending: false });
    if (error) throw error;

    const summary = (data ?? []).reduce<Record<string, number>>((result, item) => {
      const key = `${item.source}:${item.status}`;
      result[key] = (result[key] ?? 0) + 1;
      return result;
    }, {});

    return json({ summary });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Access code summary failed:", error);
    return json({ error: "Die Übersicht konnte nicht geladen werden." }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    await requireAdmin(request);
    const body = (await request.json()) as {
      quantity?: unknown;
      note?: unknown;
    };
    const quantity = Number(body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      return json({ error: "Erstelle zwischen 1 und 50 Codes gleichzeitig." }, 400);
    }

    const note = typeof body.note === "string" ? body.note.trim().slice(0, 160) : "";
    const codes = await Promise.all(
      Array.from({ length: quantity }, async () => {
        const code = createAccessCode();
        return {
          code,
          hash: await hashAccessCode(code),
          hint: accessCodeHint(code),
        };
      })
    );

    const { error } = await supabaseAdmin.from("access_licenses").insert(
      codes.map((entry) => ({
        source: "market",
        status: "available",
        claim_token_hash: entry.hash,
        claim_token_hint: entry.hint,
        note: note || "Direktverkauf",
      }))
    );
    if (error) throw error;

    const siteUrl = (
      import.meta.env.PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
    ).replace(/\/+$/, "");

    return json({
      codes: codes.map(({ code }) => ({
        code,
        url: `${siteUrl}/freischalten?code=${encodeURIComponent(code)}`,
      })),
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Access code creation failed:", error);
    return json({ error: "Die Zugangscodes konnten nicht erstellt werden." }, 500);
  }
};
