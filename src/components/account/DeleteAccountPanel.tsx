import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const CONFIRMATION_TEXT = "LÖSCHEN";

export default function DeleteAccountPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | null>(
    null
  );

  function closePanel() {
    if (deleting) return;

    setIsOpen(false);
    setConfirmation("");
    setMessage("");
    setMessageType(null);
  }

  async function handleDelete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (confirmation !== CONFIRMATION_TEXT) {
      setMessage(`Bitte gib ${CONFIRMATION_TEXT} vollständig ein.`);
      setMessageType("error");
      return;
    }

    setDeleting(true);
    setMessage("");
    setMessageType(null);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        throw new Error(
          "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an."
        );
      }

      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          confirmation,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error || "Dein Konto konnte nicht gelöscht werden."
        );
      }

      setMessageType("success");
      setMessage(result?.message || "Dein Konto wurde gelöscht.");

      // Der Auth-Nutzer existiert nun nicht mehr. Die lokale Sitzung wird
      // unabhängig vom Ergebnis des Sign-outs entfernt.
      try {
        await supabase.auth.signOut({ scope: "local" });
      } catch {
        // Die Weiterleitung erfolgt trotzdem, weil das Konto serverseitig
        // bereits erfolgreich gelöscht wurde.
      }

      window.setTimeout(() => {
        window.location.href = "/?accountDeleted=1";
      }, 900);
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Dein Konto konnte nicht gelöscht werden."
      );
      setDeleting(false);
    }
  }

  return (
    <section className="delete-account-card" aria-labelledby="delete-account-title">
      <div className="delete-account-copy">
        <p className="eyebrow danger-eyebrow">Gefahrenbereich</p>
        <h2 id="delete-account-title">Konto dauerhaft löschen</h2>

        <p>
          Dabei werden deine Anmeldedaten, dein Nickname, deine Bio und dein
          persönlicher Avatar endgültig entfernt.
        </p>

        <p>
          Deine bisherigen Threads, Kommentare und Argumentvorschläge bleiben
          erhalten, werden aber anschließend unter „Gelöschter Account“
          angezeigt. Deine Stimmen und persönlichen Benachrichtigungen werden
          gelöscht.
        </p>
      </div>

      {!isOpen ? (
        <button
          className="delete-account-open"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          Konto löschen
        </button>
      ) : (
        <form className="delete-account-confirmation" onSubmit={handleDelete}>
          <p className="delete-account-warning">
            Diese Aktion kann nicht rückgängig gemacht werden.
          </p>

          <label htmlFor="delete-account-confirmation">
            Gib <strong>{CONFIRMATION_TEXT}</strong> ein, um fortzufahren.
          </label>

          <input
            id="delete-account-confirmation"
            type="text"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            disabled={deleting}
          />

          <div className="delete-account-actions">
            <button
              className="delete-account-final"
              type="submit"
              disabled={deleting || confirmation !== CONFIRMATION_TEXT}
            >
              {deleting ? "Konto wird gelöscht..." : "Endgültig löschen"}
            </button>

            <button
              className="delete-account-cancel"
              type="button"
              onClick={closePanel}
              disabled={deleting}
            >
              Abbrechen
            </button>
          </div>
        </form>
      )}

      {message && (
        <p
          className={`delete-account-message ${
            messageType === "error" ? "is-error" : "is-success"
          }`}
          role={messageType === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </section>
  );
}
