import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServerKey =
  import.meta.env.SUPABASE_SECRET_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
const deletedAccountUserId = import.meta.env.DELETED_ACCOUNT_USER_ID;

function json(
  body: Record<string, unknown>,
  status: number
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseUrl || !supabaseServerKey || !deletedAccountUserId) {
    console.error(
      "Kontolöschung: Erforderliche Server-Umgebungsvariablen fehlen."
    );

    return json(
      {
        error:
          "Die Kontolöschung ist momentan nicht vollständig konfiguriert.",
      },
      503
    );
  }

  let body: { confirmation?: unknown };

  try {
    body = await request.json();
  } catch {
    return json({ error: "Ungültige Anfrage." }, 400);
  }

  if (body.confirmation !== "LÖSCHEN") {
    return json(
      { error: "Die Sicherheitsbestätigung ist nicht korrekt." },
      400
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return json(
      { error: "Du bist nicht angemeldet oder deine Sitzung ist abgelaufen." },
      401
    );
  }

  const accessToken = authorization.slice("Bearer ".length).trim();

  if (!accessToken) {
    return json(
      { error: "Du bist nicht angemeldet oder deine Sitzung ist abgelaufen." },
      401
    );
  }

  const admin = createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  const {
    data: { user },
    error: userError,
  } = await admin.auth.getUser(accessToken);

  if (userError || !user) {
    return json(
      { error: "Deine Sitzung ist ungültig oder abgelaufen." },
      401
    );
  }

  if (user.id === deletedAccountUserId) {
    return json(
      { error: "Das neutrale Systemkonto kann nicht gelöscht werden." },
      403
    );
  }

  const { error: deletionError } = await admin.rpc(
    "delete_user_and_anonymize",
    {
      target_user_id: user.id,
      replacement_user_id: deletedAccountUserId,
    }
  );

  if (deletionError) {
    console.error("Kontolöschung fehlgeschlagen:", deletionError);

    return json(
      {
        error:
          "Dein Konto konnte nicht gelöscht werden. Bitte versuche es später erneut.",
      },
      500
    );
  }

  return json(
    {
      success: true,
      message: "Dein Konto wurde dauerhaft gelöscht.",
    },
    200
  );
};
