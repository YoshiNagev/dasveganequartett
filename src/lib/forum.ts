import { supabase } from "./supabaseClient";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createThread({
  cardId,
  title,
  body,
}: {
  cardId: number;
  title: string;
  body: string;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Du musst eingeloggt sein, um einen Thread zu erstellen.");
  }

  const baseSlug = slugify(title);
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("threads")
    .insert({
      card_id: cardId,
      user_id: user.id,
      title,
      body,
      slug,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}