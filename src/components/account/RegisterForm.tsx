import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabaseClient";
import { authFeedback } from "../../lib/authFeedback";

type Props = { returnTo?: string };

export default function RegisterForm({ returnTo = "/account/profile" }: Props) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage("");
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(), password,
        options: {
          emailRedirectTo: `${window.location.origin}/account/login?returnTo=${encodeURIComponent(returnTo)}`,
          data: { nickname: nickname.trim() },
        },
      });
      if (error) {
        setMessage(authFeedback(error, "register"));
        return;
      }
      // Respect projects with email confirmation disabled as well.
      if (data.session) {
        window.location.href = returnTo;
        return;
      }
      setSuccess(true);
      setNickname(""); setEmail(""); setPassword(""); setShowPassword(false);
    } catch {
      setMessage("Die Verbindung ist gerade unterbrochen. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <section className="ea-success" aria-label="Nächster Schritt" role="status">
      <p className="ed-kicker">Fast geschafft</p><h2>Schau in dein Postfach.</h2>
      <p>Wenn eine Bestätigung nötig ist, erhältst du eine E-Mail mit einem Link. Öffne ihn und logge dich anschließend ein.</p>
      <p>Keine Mail da? Prüfe auch deinen Spamordner und warte ein paar Minuten. Falls du bereits ein Konto hast, kannst du dich direkt einloggen oder dein Passwort zurücksetzen.</p>
      <a className="ed-button" href={`/account/login?returnTo=${encodeURIComponent(returnTo)}`}>Weiter zum Login <span aria-hidden="true">→</span></a>
      <a href="/account/forgot-password">Passwort zurücksetzen</a>
    </section>
  );

  return (
    <form method="post" className="auth-form" onSubmit={handleRegister} aria-label="Konto erstellen">
      <header className="ea-form-heading"><p className="ed-kicker">Dein Einstieg</p><h2>Konto erstellen</h2><p>Alle drei Felder sind erforderlich.</p></header>
      <div className="ea-field"><label htmlFor="register-nickname">Nickname</label><input id="register-nickname" name="nickname" type="text" placeholder="z. B. MoralMango" value={nickname} onChange={e => setNickname(e.target.value)} autoComplete="nickname" aria-describedby="nickname-hint" pattern=".*\S.*" disabled={loading} required /><small id="nickname-hint">Unter diesem Namen sehen andere deine Beiträge.</small></div>
      <div className="ea-field"><label htmlFor="register-email">E-Mail-Adresse</label><input id="register-email" name="email" type="email" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" autoCapitalize="none" spellCheck={false} aria-describedby="email-hint" disabled={loading} required /><small id="email-hint">Deine E-Mail-Adresse wird nicht im Forum angezeigt.</small></div>
      <div className="ea-field"><label htmlFor="register-password">Passwort</label><div className="password-field"><input id="register-password" name="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" minLength={8} aria-describedby="password-hint" disabled={loading} required /><button className="password-toggle" type="button" aria-label="Passwort anzeigen" aria-controls="register-password" aria-pressed={showPassword} onClick={() => setShowPassword(v => !v)}>{showPassword ? "Verbergen" : "Anzeigen"}</button></div><small id="password-hint">Mindestens 8 Zeichen. Nutze ein einzigartiges Passwort.</small></div>
      {message && <p className="ea-message ea-message--error" role="alert">{message}</p>}
      <button className="ea-submit" type="submit" disabled={!ready || loading}>{loading ? "Konto wird erstellt …" : "Konto erstellen"}<span aria-hidden="true">→</span></button>
      <p className="ea-live" role="status">{loading ? "Registrierung läuft. Bitte warte kurz." : ""}</p>
      <p className="ea-privacy">Wie deine Daten verarbeitet werden, erfährst du in der <a href="/legal/datenschutz">Datenschutzerklärung</a>.</p>
      <p className="ea-switch">Schon registriert? <a href={`/account/login?returnTo=${encodeURIComponent(returnTo)}`}>Zum Login</a></p>
    </form>
  );
}
