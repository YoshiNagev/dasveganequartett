import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = { initialCode?: string };

export default function RedeemAccess({ initialCode = "" }: Props) {
  const [code, setCode] = useState(initialCode);
  const [accessToken, setAccessToken] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAccessToken(data.session?.access_token ?? "");
      setLoadingSession(false);
    });
  }, []);

  async function redeem(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim() || !accessToken) return;
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/access/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ code }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Code konnte nicht eingelöst werden.");
      setSuccess(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Code konnte nicht eingelöst werden.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingSession) return <p>Zugang wird vorbereitet …</p>;

  const returnTo = `/freischalten${code ? `?code=${encodeURIComponent(code)}` : ""}`;

  if (!accessToken) {
    return (
      <div className="redeem-card">
        <h2>Profil erforderlich</h2>
        <p>Melde dich an oder erstelle ein Profil. Der eingegebene Code bleibt dabei erhalten.</p>
        <div className="access-panel-actions">
          <a className="primary" href={`/account/login?returnTo=${encodeURIComponent(returnTo)}`}>Einloggen</a>
          <a href={`/account/register?returnTo=${encodeURIComponent(returnTo)}`}>Profil erstellen</a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="redeem-card success">
        <p className="eyebrow">Freigeschaltet</p>
        <h2>Dein vollständiger Zugang ist aktiv.</h2>
        <p>Du kannst jetzt alle 54 Argumente und die vollständigen Diskussionen öffnen.</p>
        <div className="access-panel-actions">
          <a className="primary" href="/cards">Alle Argumente öffnen</a>
          <a href="/account/access">Zugänge verwalten</a>
        </div>
      </div>
    );
  }

  return (
    <form className="redeem-card" onSubmit={redeem}>
      <label>
        Zugangscode
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="DVQ-XXXX-XXXX-XXXX"
          autoComplete="one-time-code"
          required
        />
      </label>
      <button type="submit" disabled={submitting || !code.trim()}>
        {submitting ? "Wird eingelöst …" : "Zugang freischalten"}
      </button>
      {message && <p className="form-message" role="alert">{message}</p>}
    </form>
  );
}
