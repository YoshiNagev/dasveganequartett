import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { createComment } from "../../lib/comments";

type Props = {
  threadId: string;
  parentId?: string | null;
  compact?: boolean;
  realtime?: boolean;
  onDone?: () => void;
};

export default function CommentForm({
  threadId,
  parentId = null,
  compact = false,
  realtime = false,
  onDone,
}: Props) {
  const [body, setBody] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setIsLoggedIn(Boolean(data.session));
      setLoadingSession(false);
    }

    checkSession();
  }, []);

  function insertMarkdown(
    before: string,
    after = before,
    placeholder = "Text"
  ) {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = body.slice(start, end);

    const replacement =
      selectedText.length > 0
        ? `${before}${selectedText}${after}`
        : `${before}${placeholder}${after}`;

    const newText =
      body.slice(0, start) +
      replacement +
      body.slice(end);

    setBody(newText);

    requestAnimationFrame(() => {
      textarea.focus();

      if (selectedText.length === 0) {
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + placeholder.length
        );
      }
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (body.trim().length < 5) {
      setMessage("Antwort muss mindestens 5 Zeichen lang sein.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      await createComment({
        threadId,
        parentId,
        body: body.trim(),
      });

      setBody("");

      if (onDone) {
        onDone();
      } else if (!realtime) {
        window.location.reload();
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Antwort konnte nicht gespeichert werden."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingSession) {
    return (
      <div className={compact ? "comment-form compact" : "comment-form"}>
        <p className="form-message">Lade Login-Status...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={compact ? "comment-form compact" : "comment-form"}>
        <p className="form-message">
          Melde dich an, um zu antworten.
        </p>

        <a className="create-thread-link" href="/account/login">
          Einloggen
        </a>
      </div>
    );
  }

  return (
    <form
      className={compact ? "comment-form compact" : "comment-form"}
      onSubmit={handleSubmit}
    >
      <label htmlFor={parentId ? `reply-${parentId}` : "comment"}>
        {parentId ? "Antwort verfassen" : "Antwort schreiben"}
      </label>

      <div className="markdown-toolbar">
        <button
          type="button"
          onClick={() => insertMarkdown("**", "**")}
          title="Fett"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("*", "*")}
          title="Kursiv"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("<u>", "</u>")}
          title="Unterstrichen"
        >
          U
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("~~", "~~")}
          title="Durchgestrichen"
        >
          S
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("> ", "", "Zitat")}
          title="Zitat"
        >
          ❝
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("- ", "", "Listenpunkt")}
          title="Liste"
        >
          •
        </button>

        <button
          type="button"
          onClick={() => insertMarkdown("[", "](https://)", "Linktext")}
          title="Link"
        >
          🔗
        </button>
      </div>

      <textarea
        ref={textareaRef}
        id={parentId ? `reply-${parentId}` : "comment"}
        placeholder={
          parentId
            ? "Schreibe eine Antwort auf diesen Kommentar..."
            : "Was möchtest du zur Diskussion beitragen?"
        }
        rows={compact ? 4 : 6}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        minLength={5}
        required
      />

      <div className="markdown-help">
        <span>Shortcuts:</span>
        <code>**fett**</code>
        <code>*kursiv*</code>
        <code>&lt;u&gt;unterstrichen&lt;/u&gt;</code>
        <code>~~durchgestrichen~~</code>
        <code>&gt; Zitat</code>
        <code>- Liste</code>
        <code>[Link](url)</code>
      </div>

      <button type="submit" disabled={submitting}>
        {submitting
          ? "Speichert..."
          : parentId
            ? "Antworten"
            : "Antwort veröffentlichen"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}