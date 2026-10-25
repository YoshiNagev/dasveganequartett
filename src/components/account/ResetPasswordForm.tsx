import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const [linkIsValid, setLinkIsValid] = useState(false);
  const [saving, setSaving] = useState(false);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const urlError = params.get("error_description") || params.get("error") || hashParams.get("error_description") || hashParams.get("error");

    if (urlError) {
      setMessage("Der Link ist ungültig oder abgelaufen. Fordere bitte einen neuen an.");
      setCheckingLink(false);
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || session) {
        setLinkIsValid(true);
        setMessage("");
        setCheckingLink(false);
      }
    });

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (data.session) {
        setLinkIsValid(true);
      } else if (error) {
        setMessage("Der Link konnte nicht geprüft werden.");
      } else {
        setMessage("Der Link ist ungültig oder abgelaufen. Fordere bitte einen neuen an.");
      }
      setCheckingLink(false);
    }).catch(() => {
      if (!active) return;
      setMessage("Der Link konnte nicht geprüft werden. Bitte lade die Seite erneut.");
      setCheckingLink(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || !linkIsValid) return;
    setMessage("");

    if (password.length < 8) {
      setMessage("Das neue Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }

    if (password !== confirmation) {
      setMessage("Die beiden Passwörter stimmen nicht überein.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setComplete(true);
      setPassword("");
      setConfirmation("");
    } catch {
      setMessage("Das Passwort konnte nicht geändert werden. Bitte versuche es erneut oder fordere einen neuen Link an.");
    } finally {
      setSaving(false);
    }
  }

  if (checkingLink) {
    return (
      <section className="auth-form" aria-live="polite">
        <p className="form-message">Sicherer Link wird geprüft …</p>
      </section>
    );
  }

  if (complete) {
    return (
      <section className="auth-form auth-success-panel" aria-live="polite">
        <p className="eyebrow">Passwort geändert</p>
        <h2>Dein neues Passwort ist aktiv.</h2>
        <p>Du bist bereits angemeldet und kannst direkt zu deinem Profil wechseln.</p>
        <a className="auth-primary-link" href="/account/profile">
          Profil öffnen
        </a>
      </section>
    );
  }

  if (!linkIsValid) {
    return (
      <section className="auth-form auth-success-panel">
        <p className="form-message is-error" role="alert">{message}</p>
        <a className="auth-primary-link" href="/account/forgot-password">
          Neuen Link anfordern
        </a>
        <a className="auth-text-link" href="/account/login">
          Zurück zum Login
        </a>
      </section>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} aria-busy={saving}>
      <header className="ea-form-heading"><p className="ed-kicker">Schritt 2 · Neues Passwort</p><h2>Wieder startklar.</h2></header>
      <label htmlFor="new-password">
        Neues Passwort
        <div className="password-field">
          <input
            id="new-password"
            aria-describedby="password-hint"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            autoComplete="new-password"
            required
            disabled={saving}
          />
          <button
            className="password-toggle"
            type="button"
            aria-controls="new-password new-password-confirmation"
            disabled={saving}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Verbergen" : "Anzeigen"}
          </button>
        </div>
      </label>

      <p id="password-hint" className="er-hint">Mindestens 8 Zeichen. Wiederhole dasselbe Passwort im zweiten Feld.</p>
      <label htmlFor="new-password-confirmation">
        Neues Passwort wiederholen
        <input
          id="new-password-confirmation"
          type={showPassword ? "text" : "password"}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          minLength={8}
          autoComplete="new-password"
          required
          disabled={saving}
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Passwort wird gespeichert …" : "Neues Passwort speichern"}
      </button>

      {message && (
        <p className="form-message is-error" role="alert">{message} <a href="/account/forgot-password">Neuen Link anfordern</a></p>
      )}
    </form>
  );
}
