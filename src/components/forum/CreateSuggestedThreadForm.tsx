import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { createThreadForSuggestedArgument } from "../../lib/threads";

type Props = {
  suggestedArgumentId: string;
};

export default function CreateSuggestedThreadForm({
  suggestedArgumentId,
}: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
      setLoadingSession(false);
    }

    checkSession();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim().length < 5) {
      setMessage("Der Titel muss mindestens 5 Zeichen lang sein.");
      return;
    }

    if (body.trim().length < 10) {
      setMessage("Der Beitrag muss mindestens 10 Zeichen lang sein.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const thread = await createThreadForSuggestedArgument({
        suggestedArgumentId,
        title: title.trim(),
        body: body.trim(),
      });

      window.location.href = `/forum/thread/${thread.slug}`;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Thread konnte nicht erstellt werden."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingSession) {
    return (
      <div className="create-thread-form">
        <p className="form-message">Login-Status wird geladen...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="create-thread-form">
        <p className="form-message">
          Melde dich an, um einen Thread zu diesem Argument zu starten.
        </p>

        <a className="create-thread-link" href="/account/login">
          Einloggen
        </a>
      </div>
    );
  }

  return (
    <form className="create-thread-form" onSubmit={handleSubmit}>
      <label>
        Thread-Titel
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={5}
          maxLength={160}
          placeholder="z. B. Wie antwortet man auf dieses seltene Argument?"
          required
        />
      </label>

      <label>
        Beitrag
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={7}
          minLength={10}
          maxLength={2000}
          placeholder="Schreibe deinen Einstieg in die Diskussion..."
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Wird erstellt..." : "Thread erstellen"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}