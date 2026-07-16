import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import CommentCard, { type CommentNode } from "./CommentCard";
import CommentForm from "./CommentForm";

type FlatComment = Omit<CommentNode, "replies">;

type Props = {
  threadId: string;
  initialComments: FlatComment[];
};

function buildTree(comments: FlatComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  const roots: CommentNode[] = [];

  map.forEach((comment) => {
    if (comment.parentId && map.has(comment.parentId)) {
      map.get(comment.parentId)!.replies.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

export default function RealtimeComments({ threadId, initialComments }: Props) {
  const [comments, setComments] = useState<FlatComment[]>(initialComments);

  const nestedComments = useMemo(() => buildTree(comments), [comments]);

  useEffect(() => {
    const channel = supabase
      .channel(`comments-thread-${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `thread_id=eq.${threadId}`,
        },
        async (payload) => {
          const newComment = payload.new as {
            id: string;
            thread_id: string;
            parent_id: string | null;
            body: string;
            created_at: string;
            user_id: string;
          };

          const { data: profile } = await supabase
            .from("profiles")
            .select("nickname")
            .eq("id", newComment.user_id)
            .maybeSingle();

          setComments((current) => {
            if (current.some((comment) => comment.id === newComment.id)) {
              return current;
            }

            return [
              ...current,
              {
                id: newComment.id,
                threadId: newComment.thread_id,
                parentId: newComment.parent_id,
                userId: newComment.user_id,
                author: profile?.nickname ?? "Unbekannt",
                createdAt: new Date(newComment.created_at).toLocaleDateString("de-DE"),
                body: newComment.body,
                votes: 0,
                userVoted: false,
              },
            ];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          const updatedComment = payload.new as {
            id: string;
            is_hidden?: boolean;
          };

          if (updatedComment.is_hidden) {
            setComments((current) =>
              current.filter((comment) => comment.id !== updatedComment.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  return (
    <>
      {nestedComments.length > 0 ? (
        <div className="comment-list upgraded">
          {nestedComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Noch keine Antworten</h3>
          <p>Sei die erste Person, die hier antwortet.</p>
        </div>
      )}

      <div style={{ marginTop: "2.5rem" }}>
        <CommentForm threadId={threadId} realtime />
      </div>
    </>
  );
}