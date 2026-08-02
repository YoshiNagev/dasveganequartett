import type { APIRoute } from "astro";
import {
  createServerPreorderQuote,
  PreorderValidationError,
} from "../../../lib/server/preorder";

export const prerender = false;

function json(
  body: unknown,
  status = 200
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
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json(
      { error: "Die Anfrage enthält kein gültiges JSON." },
      400
    );
  }

  try {
    const quantity =
      typeof body === "object" &&
      body !== null &&
      "quantity" in body
        ? (body as { quantity?: unknown }).quantity
        : undefined;

    const quote = createServerPreorderQuote(quantity);

    return json({ quote });
  } catch (error) {
    if (error instanceof PreorderValidationError) {
      return json({ error: error.message }, error.status);
    }

    console.error("Preorder quote error:", error);

    return json(
      { error: "Der Preis konnte nicht berechnet werden." },
      500
    );
  }
};

export const ALL: APIRoute = async () =>
  json({ error: "Methode nicht erlaubt." }, 405);
