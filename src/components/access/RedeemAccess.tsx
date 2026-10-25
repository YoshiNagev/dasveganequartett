import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = { initialCode?: string };

export default function RedeemAccess({ initialCode = "" }: Props) {
  const [code, setCode] = useState(initialCode);
  const [accessToken, setAccessToken] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionFailed, setSessionFailed] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) throw error;
      setAccessToken(data.session?.access_token ?? "");
    }).catch(() => {
      if (active) setSessionFailed(true);
    }).finally(() => {
      if (active) setLoadingSession(false);
    });
    return () => { active = false; };
  }, []);

  const returnTo = `/freischalten${code ? `?code=${encodeURIComponent(code)}` : ""}`;
  const loginUrl = `/account/login?returnTo=${encodeURIComponent(returnTo)}`;

  async function redeem(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || !code.trim() || !accessToken) return;
    busy.current = true;
    setSubmitting(true); setMessage("");
    try {
      const response = await fetch("/api/access/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ code: code.trim() }),
      });
      if (response.status === 401) {
        setAccessToken("");
        setMessage("Deine Anmeldung ist abgelaufen. Logge dich erneut ein; dein Code bleibt erhalten.");
        return;
      }
      if (response.status === 409) {
        setMessage("Dieser Code ist ungültig oder wurde bereits eingelöst. Prüfe den vollständigen Code oder sieh unter „Meine Zugänge“ nach.");
        return;
      }
      const result = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok || result.ok !== true) {
        setMessage(result.error || "Der Zugang konnte gerade nicht aktiviert werden. Bitte versuche es erneut.");
        return;
      }
      setSuccess(true);
    } catch {
      setMessage("Die Freischaltung konnte nicht bestätigt werden. Prüfe deine Verbindung und „Meine Zugänge“, bevor du es erneut versuchst.");
    } finally {
      busy.current = false; setSubmitting(false);
    }
  }

  if (loadingSession) return <section className="redeem-card" role="status"><p className="ed-kicker">Einen Moment</p><h2>Gleich geht’s los.</h2><p>Deine Anmeldung wird geprüft …</p></section>;
  if (sessionFailed) return <section className="redeem-card"><p className="ed-kicker">Verbindung unterbrochen</p><h2>Versuchen wir es noch einmal.</h2><p role="alert">Deine Anmeldung konnte gerade nicht geprüft werden. Dein Code wurde nicht eingelöst.</p><a className="ed-button" href={returnTo}>Erneut laden</a></section>;
  if (success) return <section className="redeem-card success" role="status"><p className="ed-kicker">Freigeschaltet</p><h2>Das ganze Quartett ist für dich da.</h2><p>Dein vollständiger Zugang ist aktiv. Du kannst jetzt alle 54 Argumente und die vollständigen Diskussionen öffnen.</p><div className="redeem-actions"><a className="ed-button" href="/cards">Alle Argumente öffnen <span aria-hidden="true">→</span></a><a className="redeem-text-link" href="/account/access">Zugänge verwalten</a></div></section>;
  if (!accessToken) return <section className="redeem-card"><p className="ed-kicker">Schritt 1 · Dein Konto</p><h2>Erst einloggen.<br />Dann loslegen.</h2><p>Melde dich an oder erstelle ein Profil, damit der Zugang dir zugeordnet werden kann.</p>{code.trim() && <p className="redeem-notice">Ein Code wurde aus deinem Link übernommen. Er bleibt beim Einloggen oder Registrieren erhalten.</p>}{message && <p className="redeem-error" role="alert">{message}</p>}<div className="redeem-actions"><a className="ed-button" href={loginUrl}>Einloggen <span aria-hidden="true">→</span></a><a className="redeem-secondary" href={`/account/register?returnTo=${encodeURIComponent(returnTo)}`}>Profil erstellen</a></div><p className="redeem-small">Du hast eine Zugangskarte? Nach dem Einloggen kannst du deinen Code eingeben.</p></section>;
  return <form className="redeem-card" onSubmit={redeem} aria-busy={submitting}>
    <header><p className="ed-kicker">Schritt 2 · Code einlösen</p><h2>Dein Zugang wartet.</h2></header>
    <p>Der Code wird mit deinem aktuell angemeldeten Profil verknüpft.</p>
    <a className="redeem-text-link" href="/account/profile">Mein Profil prüfen</a>
    <label htmlFor="access-code">Zugangscode<input id="access-code" value={code} onChange={event => { setCode(event.target.value.toUpperCase()); setMessage(""); }} placeholder="DVQ-XXXX-XXXX-XXXX" autoComplete="off" autoCapitalize="characters" spellCheck={false} aria-describedby="access-code-hint" required disabled={submitting} /></label>
    <p id="access-code-hint" className="redeem-small">{initialCode ? "Der Code aus deinem Link ist bereits eingetragen. Du kannst ihn bei Bedarf korrigieren." : "Gib den vollständigen Code von deiner Zugangskarte ein."}</p>
    <button className="ed-button" type="submit" disabled={submitting || !code.trim()}>{submitting ? "Wird eingelöst …" : "Zugang freischalten"}<span aria-hidden="true">→</span></button>
    {message && <p className="redeem-error" role="alert">{message}</p>}
    <a className="redeem-text-link" href="/account/access">Meine Zugänge ansehen</a>
  </form>;
}
