import type { APIRoute } from "astro";
import { AdminAuthError, requireAdmin } from "../../../lib/server/adminAuth";
import {
  accessCodeHint,
  createAccessCode,
  decryptAccessCode,
  encryptAccessCode,
  hashAccessCode,
} from "../../../lib/server/accessTokens";
import { supabaseAdmin } from "../../../lib/server/supabaseAdmin";

export const prerender = false;

type AccessLicenseRow = {
  id: string;
  source: "stripe" | "market" | "manual";
  status: "available" | "claimed" | "revoked";
  claim_token_hint: string | null;
  claim_token_ciphertext: string | null;
  note: string | null;
  created_at: string;
  claimed_at: string | null;
};

const licenseFields = `
  id,
  source,
  status,
  claim_token_hint,
  claim_token_ciphertext,
  note,
  created_at,
  claimed_at
`;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function getSiteUrl(request: Request): string {
  return (
    import.meta.env.PUBLIC_SITE_URL?.trim() || new URL(request.url).origin
  ).replace(/\/+$/, "");
}

function serializeCode(row: AccessLicenseRow, siteUrl: string) {
  let code: string | null = null;
  let decryptionFailed = false;

  if (row.claim_token_ciphertext) {
    try {
      code = decryptAccessCode(row.claim_token_ciphertext);
    } catch (error) {
      decryptionFailed = true;
      console.error(`Access code ${row.id} could not be decrypted:`, error);
    }
  }

  return {
    id: row.id,
    code,
    maskedCode: row.claim_token_hint
      ? `DVQ-••••-••••-${row.claim_token_hint}`
      : "Code nicht verfügbar",
    url: code
      ? `${siteUrl}/freischalten?code=${encodeURIComponent(code)}`
      : null,
    status: row.status,
    note: row.note,
    createdAt: row.created_at,
    claimedAt: row.claimed_at,
    decryptionFailed,
  };
}

function configurationError(error: unknown): Response | null {
  if (
    error instanceof Error &&
    error.message.includes("ACCESS_CODE_ENCRYPTION_KEY")
  ) {
    return json(
      {
        error:
          "Der Verschlüsselungsschlüssel für das Codearchiv fehlt oder ist ungültig.",
      },
      500
    );
  }

  return null;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    await requireAdmin(request);
    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .select(licenseFields)
      .order("created_at", { ascending: false });
    if (error) throw error;

    const rows = (data ?? []) as AccessLicenseRow[];
    const summary = rows.reduce<Record<string, number>>((result, item) => {
      const key = `${item.source}:${item.status}`;
      result[key] = (result[key] ?? 0) + 1;
      return result;
    }, {});
    const siteUrl = getSiteUrl(request);

    return json({
      summary,
      codes: rows
        .filter((item) => item.source === "market")
        .map((item) => serializeCode(item, siteUrl)),
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return json({ error: error.message }, error.status);
    }
    console.error("Access code list failed:", error);
    return json({ error: "Die Zugangscodes konnten nicht geladen werden." }, 500);
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
      return json(
        { error: "Erstelle zwischen 1 und 50 Codes gleichzeitig." },
        400
      );
    }

    const note =
      typeof body.note === "string" ? body.note.trim().slice(0, 160) : "";
    const generatedCodes = await Promise.all(
      Array.from({ length: quantity }, async () => {
        const code = createAccessCode();
        return {
          code,
          hash: await hashAccessCode(code),
          hint: accessCodeHint(code),
          ciphertext: encryptAccessCode(code),
        };
      })
    );

    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .insert(
        generatedCodes.map((entry) => ({
          source: "market",
          status: "available",
          claim_token_hash: entry.hash,
          claim_token_hint: entry.hint,
          claim_token_ciphertext: entry.ciphertext,
          note: note || "Direktverkauf",
        }))
      )
      .select(licenseFields);
    if (error) throw error;

    const siteUrl = getSiteUrl(request);
    const codes = ((data ?? []) as AccessLicenseRow[]).map((row) =>
      serializeCode(row, siteUrl)
    );

    return json({ codes });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return json({ error: error.message }, error.status);
    }
    const response = configurationError(error);
    if (response) return response;
    console.error("Access code creation failed:", error);
    return json({ error: "Die Zugangscodes konnten nicht erstellt werden." }, 500);
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    await requireAdmin(request);
    const body = (await request.json()) as { licenseId?: unknown };
    if (typeof body.licenseId !== "string") {
      return json({ error: "Der zu ersetzende Zugangscode fehlt." }, 400);
    }

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("access_licenses")
      .select("id, source, status, claimed_by")
      .eq("id", body.licenseId)
      .maybeSingle();
    if (lookupError) throw lookupError;

    if (!existing || existing.source !== "market") {
      return json({ error: "Dieser Marktcode wurde nicht gefunden." }, 404);
    }
    if (existing.status !== "available" || existing.claimed_by) {
      return json(
        { error: "Nur noch nicht eingelöste Codes können ersetzt werden." },
        409
      );
    }

    const code = createAccessCode();
    const { data, error } = await supabaseAdmin
      .from("access_licenses")
      .update({
        claim_token_hash: await hashAccessCode(code),
        claim_token_hint: accessCodeHint(code),
        claim_token_ciphertext: encryptAccessCode(code),
      })
      .eq("id", existing.id)
      .eq("status", "available")
      .is("claimed_by", null)
      .select(licenseFields)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return json({ error: "Der Code wurde zwischenzeitlich eingelöst." }, 409);
    }

    return json({
      code: serializeCode(data as AccessLicenseRow, getSiteUrl(request)),
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return json({ error: error.message }, error.status);
    }
    const response = configurationError(error);
    if (response) return response;
    console.error("Access code replacement failed:", error);
    return json({ error: "Der Zugangscode konnte nicht ersetzt werden." }, 500);
  }
};
