import { useState } from "react";
import { createThread } from "../../lib/forum";

type Props = {
  cardId: number;
  cardTitle: string;
};

export default function CreateThreadForm({ cardId, cardTitle }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const thread = await createThread({
        cardId,
        title,
        body,
      });

      window.location.href = `/forum/thread/${thread.slug}`;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Der Thread konnte nicht erstellt werden."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="create-thread-form" onSubmit={handleSubmit}>
      <div className="form-context">
        <span>Karte #{String(cardId).padStart(2, "0")}</span>
        <strong>{cardTitle}</strong>
      </div>

      <label>
        Titel des Threads
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="z. B. Wie antworte ich darauf am besten?"
          minLength={5}
          required
        />
      </label>

      <label>
        Beitrag
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Schreibe deinen Gedanken, Einwand oder deine Frage..."
          rows={8}
          minLength={20}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Thread wird erstellt..." : "Thread veröffentlichen"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}