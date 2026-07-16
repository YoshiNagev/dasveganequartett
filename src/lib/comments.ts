import { supabase } from "./supabaseClient";

export async function createComment({
  threadId,
  body,
  parentId = null,
}: {
  threadId: string;
  body: string;
  parentId?: string | null;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Du musst eingeloggt sein, um zu antworten.");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      thread_id: threadId,
      parent_id: parentId,
      user_id: user.id,
      body,
    })
    .select("id, thread_id, parent_id, user_id, body")
    .single();

  if (error) throw new Error(error.message);

  if (parentId) {
    const { data: parentComment } = await supabase
      .from("comments")
      .select("user_id")
      .eq("id", parentId)
      .maybeSingle();

    if (parentComment && parentComment.user_id !== user.id) {
      await supabase.from("notifications").insert({
        user_id: parentComment.user_id,
        actor_id: user.id,
        type: "reply_to_comment",
        thread_id: threadId,
        comment_id: data.id,
        message: "Jemand hat auf deinen Kommentar geantwortet.",
      });
    }
  }

  return data;
}

export async function editComment(commentId: string, body: string) {
  const { error } = await supabase.rpc("edit_own_comment", {
    target_comment_id: commentId,
    new_body: body,
  });

  if (error) throw new Error(error.message);
}

export async function hideComment(commentId: string) {
  const { error } = await supabase.rpc("hide_own_comment", {
    target_comment_id: commentId,
  });

  if (error) throw new Error(error.message);
}

export async function reportComment(commentId: string, reason: string) {
  const { error } = await supabase.rpc("report_comment", {
    target_comment_id: commentId,
    report_reason: reason,
  });

  if (error) throw new Error(error.message);
}

export async function toggleCommentVote(commentId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Du musst eingeloggt sein, um abzustimmen.");
  }

  const { data: existingVote, error: existingVoteError } = await supabase
    .from("comment_votes")
    .select("id")
    .eq("comment_id", commentId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingVoteError) throw new Error(existingVoteError.message);

  if (existingVote) {
    const { error } = await supabase
      .from("comment_votes")
      .delete()
      .eq("id", existingVote.id);

    if (error) throw new Error(error.message);

    return { voted: false };
  }

  const { error } = await supabase.from("comment_votes").insert({
    comment_id: commentId,
    user_id: user.id,
  });

  if (error) throw new Error(error.message);

  return { voted: true };
}