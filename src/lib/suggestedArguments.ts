import { supabase } from "./supabaseClient";

export async function getSuggestedArguments() {
  const { data, error } = await supabase
    .from("suggested_arguments")
    .select(`
      id,
      title,
      description,
      status,
      created_at,
      profiles (
        nickname
      ),
      threads (
        id
      )
    `)
    .eq("is_hidden", false)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createSuggestedArgument({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Du musst eingeloggt sein, um ein Argument vorzuschlagen.");
  }

  const { data, error } = await supabase
    .from("suggested_arguments")
    .insert({
      user_id: user.id,
      title,
      description,
    })
    .select("id, title, description, status, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}