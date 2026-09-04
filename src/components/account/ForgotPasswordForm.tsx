import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: `${window.location.origin}/account/reset-password`,
      }
    );

    if (error) {
      setMessage(
        "Die E-Mail konnte gerade nicht versendet werden. Bitte versuche es später erneut."
      );
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <section className="auth-form auth-success-panel" aria-live="polite">
        <p className="eyebrow">E-Mail versendet</p>
        <h2>Prüfe dein Postfach.</h2>
        <p>
          Wenn ein Konto für <strong>{email}</strong> existiert, erhältst du
          einen sicheren Link zum Festlegen eines neuen Passworts. Prüfe bitte
          auch deinen Spam-Ordner.
        </p>
        <button type="button" onClick={() => setSent(false)}>
          E-Mail erneut eingeben
        </button>
        <a className="auth-text-link" href="/account/login">
          Zurück zum Login
        </a>
      </section>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="reset-email">
        E-Mail
        <input
          id="reset-email"
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={loading}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "E-Mail wird versendet …" : "Link zum Zurücksetzen senden"}
      </button>

      <a className="auth-text-link" href="/account/login">
        Zurück zum Login
      </a>

      {message && (
        <p className="form-message is-error" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
