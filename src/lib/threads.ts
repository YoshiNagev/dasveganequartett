import { supabase } from "./supabaseClient";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createThreadForCard({
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

  const slug = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("threads")
    .insert({
      user_id: user.id,
      card_id: cardId,
      suggested_argument_id: null,
      title,
      body,
      slug,
    })
    .select("slug")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function createThreadForSuggestedArgument({
  suggestedArgumentId,
  title,
  body,
}: {
  suggestedArgumentId: string;
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

  const slug = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("threads")
    .insert({
      user_id: user.id,
      card_id: null,
      suggested_argument_id: suggestedArgumentId,
      title,
      body,
      slug,
    })
    .select("slug")
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function editThread({
  threadId,
  title,
  body,
}: {
  threadId: string;
  title: string;
  body: string;
}) {
  const { error } = await supabase.rpc("edit_own_thread", {
    target_thread_id: threadId,
    new_title: title,
    new_body: body,
  });

  if (error) throw new Error(error.message);
}

export async function hideThread(threadId: string) {
  const { error } = await supabase.rpc("hide_own_thread", {
    target_thread_id: threadId,
  });

  if (error) throw new Error(error.message);
}

export async function reportThread(threadId: string, reason: string) {
  const { error } = await supabase.rpc("report_thread", {
    target_thread_id: threadId,
    report_reason: reason,
  });

  if (error) throw new Error(error.message);
}