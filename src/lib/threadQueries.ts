import { supabase } from "./supabaseClient";

export async function getAllThreads() {
  const { data, error } = await supabase
    .from("threads")
    .select(`
      id,
      card_id,
      suggested_argument_id,
      title,
      body,
      slug,
      created_at,
      updated_at,
      profiles (
        nickname
      ),
      comments (
        id,
        created_at
      )
    `)
    .eq("is_hidden", false)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}