import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentVoteButton from "./CommentVoteButton";
import MarkdownText from "./MarkdownText";
import { editComment, hideComment, reportComment } from "../../lib/comments";
import { supabase } from "../../lib/supabaseClient";

export type CommentNode = {
  id: string;
  threadId: string;
  parentId: string | null;
  userId?: string | null;
  author: string;
  createdAt: string;
  body: string;
  votes: number;
  userVoted?: boolean;
  replies: CommentNode[];
};

type Props = {
  comment: CommentNode;
  depth?: number;
};

function countReplies(comment: CommentNode): number {
  return comment.replies.reduce(
    (total, reply) => total + 1 + countReplies(reply),
    0
  );
}

export default function CommentCard({ comment, depth = 0 }: Props) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [displayBody, setDisplayBody] = useState(comment.body);
  const [draftBody, setDraftBody] = useState(comment.body);
  const [savingEdit, setSavingEdit] = useState(false);

  const replyCount = countReplies(comment);
  const hasReplies = comment.replies.length > 0;
  const isOwnComment = Boolean(comment.userId && currentUserId === comment.userId);
  const canReport = Boolean(currentUserId && !isOwnComment);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      setCurrentUserId(data.session?.user.id ?? null);
    }

    loadUser();
  }, []);

  async function handleEditComment() {
    if (draftBody.trim().length < 5) {
      alert("Kommentar muss mindestens 5 Zeichen lang sein.");
      return;
    }

    setSavingEdit(true);

    try {
      await editComment(comment.id, draftBody.trim());
      setDisplayBody(draftBody.trim());
      setIsEditing(false);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Kommentar konnte nicht bearbeitet werden."
      );
    } finally {
      setSavingEdit(false);
    }
  }

  async function handleHideComment() {
    const confirmed = window.confirm(
      "Diesen Kommentar wirklich verbergen? Er verschwindet dann aus der Diskussion."
    );

    if (!confirmed) return;

    try {
      await hideComment(comment.id);
      setHidden(true);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Kommentar konnte nicht verborgen werden."
      );
    }
  }

  async function handleReportComment() {
    const reason = window.prompt(
      "Warum möchtest du diesen Kommentar melden?"
    );

    if (!reason || reason.trim().length < 5) return;

    try {
      await reportComment(comment.id, reason.trim());
      setHidden(true);
      alert("Danke, deine Meldung wurde gespeichert. Der Kommentar wurde vorläufig verborgen.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Kommentar konnte nicht gemeldet werden."
      );
    }
  }

  if (hidden) return null;

  return (
    <article className={depth > 0 ? "comment-card nested" : "comment-card"}>
      <div className="comment-header">
        <div>
          <strong>{comment.author}</strong>
          <span>{comment.createdAt}</span>
        </div>

        <div className="comment-header-actions">
          {hasReplies && (
            <button
              type="button"
              className="collapse-comment-button"
              onClick={() => setCollapsed((value) => !value)}
            >
              {collapsed ? `+ ${replyCount}` : "−"}
            </button>
          )}

          <CommentVoteButton
            commentId={comment.id}
            initialVotes={comment.votes}
            initiallyVoted={comment.userVoted}
          />
        </div>
      </div>

      {isEditing ? (
        <div className="comment-edit-form">
          <textarea
            value={draftBody}
            onChange={(event) => setDraftBody(event.target.value)}
            rows={5}
            minLength={5}
          />

          <div className="comment-actions">
            <button
              type="button"
              onClick={handleEditComment}
              disabled={savingEdit}
            >
              {savingEdit ? "Speichert..." : "Speichern"}
            </button>

            <button
              type="button"
              onClick={() => {
                setDraftBody(displayBody);
                setIsEditing(false);
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      ) : (
        <MarkdownText content={displayBody} />
      )}

      <div className="comment-actions">
        <button type="button" onClick={() => setReplyOpen((value) => !value)}>
          {replyOpen ? "Antwort schließen" : "Antworten"}
        </button>

        {hasReplies && (
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed
              ? `${replyCount} ${
                  replyCount === 1 ? "Antwort anzeigen" : "Antworten anzeigen"
                }`
              : "Antworten einklappen"}
          </button>
        )}

        {isOwnComment && (
          <>
            <button
              type="button"
              onClick={() => setIsEditing((value) => !value)}
            >
              {isEditing ? "Bearbeitung schließen" : "Bearbeiten"}
            </button>

            <button
              type="button"
              className="danger-action"
              onClick={handleHideComment}
            >
              Kommentar verbergen
            </button>
          </>
        )}

        {canReport && (
          <button
            type="button"
            className="danger-action"
            onClick={handleReportComment}
          >
            Melden
          </button>
        )}
      </div>

      {replyOpen && (
        <CommentForm threadId={comment.threadId} parentId={comment.id} compact />
      )}

      {!collapsed && hasReplies && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </article>
  );
}