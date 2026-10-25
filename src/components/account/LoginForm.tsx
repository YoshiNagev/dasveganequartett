import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabaseClient";
import { authFeedback } from "../../lib/authFeedback";

type Props = { returnTo?: string };

export default function LoginForm({ returnTo = "/account/profile" }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) {
        setMessage(authFeedback(error, "login"));
        setLoading(false);
        return;
      }
      window.location.href = returnTo;
    } catch {
      setMessage("Die Verbindung ist gerade unterbrochen. Bitte versuche es erneut.");
      setLoading(false);
    }
  }

  return (
    <form method="post" className="auth-form" onSubmit={handleLogin} aria-label="Einloggen mit E-Mail">
      <header className="ea-form-heading"><p className="ed-kicker">Dein Konto</p><h2>Einloggen</h2><p>Mit deiner E-Mail-Adresse und deinem Passwort.</p></header>
      <div className="ea-field"><label htmlFor="login-email">E-Mail-Adresse</label><input id="login-email" name="email" type="email" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" autoCapitalize="none" spellCheck={false} disabled={loading} required /></div>
      <div className="ea-field"><label htmlFor="login-password">Passwort</label><div className="password-field"><input id="login-password" name="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" disabled={loading} required /><button className="password-toggle" type="button" aria-label="Passwort anzeigen" aria-controls="login-password" aria-pressed={showPassword} onClick={() => setShowPassword(v => !v)}>{showPassword ? "Verbergen" : "Anzeigen"}</button></div></div>
      <a className="forgot-password-link" href="/account/forgot-password">Passwort vergessen?</a>
      {message && <p className="ea-message ea-message--error" role="alert">{message}</p>}
      <button className="ea-submit" type="submit" disabled={!ready || loading}>{loading ? "Du wirst eingeloggt …" : "Einloggen"}<span aria-hidden="true">→</span></button>
      <p className="ea-live" role="status">{loading ? "Anmeldung läuft. Bitte warte kurz." : ""}</p>
      <p className="ea-switch">Noch kein Konto? <a href={`/account/register?returnTo=${encodeURIComponent(returnTo)}`}>Jetzt registrieren</a></p>
    </form>
  );
}
