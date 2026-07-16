import { supabase } from "./supabaseClient";

export async function getNotifications() {
  const { data, error } = await supabase
    .from("notifications")
    .select(`
      id,
      type,
      message,
      is_read,
      created_at,
      thread_id,
      comment_id,
      threads (
        slug,
        title
      )
    `)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function markNotificationAsRead(id: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function markAllNotificationsAsRead() {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}