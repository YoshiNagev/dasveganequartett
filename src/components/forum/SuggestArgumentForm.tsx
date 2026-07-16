import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { createSuggestedArgument } from "../../lib/suggestedArguments";

export default function SuggestArgumentForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

    if (description.trim().length < 20) {
      setMessage("Bitte beschreibe das Argument etwas ausführlicher.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      await createSuggestedArgument({
        title: title.trim(),
        description: description.trim(),
      });

      window.location.href = "/forum/suggest";
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Argument konnte nicht vorgeschlagen werden."
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
          Melde dich an, um ein neues Argument vorzuschlagen.
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
        Argument
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={5}
          maxLength={160}
          placeholder="z. B. Veganer:innen benutzen auch Straßen, auf denen Tiere sterben."
          required
        />
      </label>

      <label>
        Erklärung
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={7}
          minLength={20}
          maxLength={1200}
          placeholder="Beschreibe, wie dieses Argument typischerweise gemeint ist, wann du es hörst und warum es eine eigene Diskussion wert ist."
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Wird gespeichert..." : "Argument vorschlagen"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}