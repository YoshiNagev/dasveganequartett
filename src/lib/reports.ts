import { supabase } from "./supabaseClient";

export type ReportStatus = "open" | "reviewed" | "dismissed" | "resolved";
export type ReportTab = "open" | "archive";

export type ModerationReport = {
  id: string;
  reporter_id: string | null;
  thread_id: string | null;
  comment_id: string | null;
  reason: string;
  status: ReportStatus;
  moderator_note: string | null;
  created_at: string;
  comments?: any | null;
  threads?: any | null;
};

export async function checkIsModerator() {
  const { data, error } = await supabase.rpc("is_moderator");
  if (error) throw new Error(error.message);
  return Boolean(data);
}

export async function getReports(tab: ReportTab = "open") {
  let query = supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  query =
    tab === "open"
      ? query.eq("status", "open")
      : query.neq("status", "open");

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const reports = (data ?? []) as ModerationReport[];

  for (const report of reports) {
    if (report.comment_id) {
      const { data: comment } = await supabase
        .from("comments")
        .select("id, body, user_id, thread_id, is_hidden, created_at, updated_at")
        .eq("id", report.comment_id)
        .maybeSingle();

      if (comment) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", comment.user_id)
          .maybeSingle();

        const { data: thread } = await supabase
          .from("threads")
          .select("slug, title")
          .eq("id", comment.thread_id)
          .maybeSingle();

        report.comments = {
          ...comment,
          profiles: profile,
          threads: thread,
        };
      }
    }

    if (report.thread_id) {
      const { data: thread } = await supabase
        .from("threads")
        .select("id, title, body, slug, user_id, is_hidden, created_at, updated_at")
        .eq("id", report.thread_id)
        .maybeSingle();

      if (thread) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", thread.user_id)
          .maybeSingle();

        report.threads = {
          ...thread,
          profiles: profile,
        };
      }
    }
  }

  return reports;
}

export async function updateReportStatus({
  reportId,
  status,
  moderatorNote,
}: {
  reportId: string;
  status: ReportStatus;
  moderatorNote?: string;
}) {
  const { error } = await supabase
    .from("reports")
    .update({
      status,
      moderator_note: moderatorNote ?? null,
    })
    .eq("id", reportId);

  if (error) throw new Error(error.message);
}

export async function hideReportedComment(commentId: string) {
  const { error } = await supabase.rpc("moderator_hide_comment", {
    target_comment_id: commentId,
  });

  if (error) throw new Error(error.message);
}

export async function hideReportedThread(threadId: string) {
  const { error } = await supabase.rpc("moderator_hide_thread", {
    target_thread_id: threadId,
  });

  if (error) throw new Error(error.message);
}

export async function unhideReportedComment(commentId: string) {
  const { error } = await supabase.rpc("moderator_unhide_comment", {
    target_comment_id: commentId,
  });

  if (error) throw new Error(error.message);
}

export async function unhideReportedThread(threadId: string) {
  const { error } = await supabase.rpc("moderator_unhide_thread", {
    target_thread_id: threadId,
  });

  if (error) throw new Error(error.message);
}