import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type License = {
  id: string;
  source: "stripe" | "market" | "manual";
  orderNumber: string | null;
  itemNumber: number | null;
  status: "mine" | "available" | "claimed" | "revoked";
  note: string | null;
  codeHint: string | null;
};

type StatusResponse = {
  account: { email: string; nickname: string };
  hasFullAccess: boolean;
  licenses: License[];
  error?: string;
};

type Gift = { code: string; giftUrl: string };

export default function AccessManager() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [message, setMessage] = useState("");
  const [gift, setGift] = useState<Gift | null>(null);

  async function loadStatus(token: string) {
    const response = await fetch("/api/access/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = (await response.json()) as StatusResponse;
    if (!response.ok) throw new Error(result.error ?? "Zugänge konnten nicht geladen werden.");
    setStatus(result);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token ?? "";
      setAccessToken(token);
      if (token) {
        try {
          await loadStatus(token);
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Zugänge konnten nicht geladen werden.");
        }
      }
      setLoading(false);
    });
  }, []);

  async function postAction(path: string, body: Record<string, string>) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const result = (await response.json()) as Gift & { error?: string };
    if (!response.ok) throw new Error(result.error ?? "Aktion fehlgeschlagen.");
    return result;
  }

  async function claimForMe(licenseId: string) {
    setWorkingId(licenseId);
    setMessage("");
    setGift(null);
    try {
      await postAction("/api/access/claim", { licenseId });
      await loadStatus(accessToken);
      setMessage("Der digitale Zugang ist jetzt für dein Profil aktiviert.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Aktivierung fehlgeschlagen.");
    } finally {
      setWorkingId("");
    }
  }

  async function createGift(license: License) {
    if (
      license.status === "mine" &&
      !window.confirm(
        "Wenn du diesen Zugang verschenkst, verliert dein Profil diesen Zugang. Fortfahren?"
      )
    ) {
      return;
    }

    setWorkingId(license.id);
    setMessage("");
    setGift(null);
    try {
      const result = await postAction("/api/access/gift", { licenseId: license.id });
      setGift({ code: result.code, giftUrl: result.giftUrl });
      await loadStatus(accessToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Geschenklink konnte nicht erstellt werden.");
    } finally {
      setWorkingId("");
    }
  }

  async function copyGiftLink() {
    if (!gift) return;
    await navigator.clipboard.writeText(gift.giftUrl);
    setMessage("Geschenklink kopiert.");
  }

  if (loading) return <div className="access-panel"><p>Zugänge werden geladen …</p></div>;

  if (!accessToken) {
    return (
      <div className="access-panel">
        <h2>Bitte zuerst einloggen</h2>
        <p>Deine Zugänge sind fest mit deinem Profil verbunden.</p>
        <div className="access-panel-actions">
          <a className="primary" href="/account/login?returnTo=%2Faccount%2Faccess">Einloggen</a>
          <a href="/account/register?returnTo=%2Faccount%2Faccess">Profil erstellen</a>
        </div>
      </div>
    );
  }

  return (
    <div className="access-dashboard">
      <section className={status?.hasFullAccess ? "access-status active" : "access-status"}>
        <div>
          <p className="eyebrow">Zugangsstatus</p>
          <h2>{status?.hasFullAccess ? "Vollständiger Zugang aktiv" : "Noch kein Zugang aktiviert"}</h2>
          <p>
            {status?.hasFullAccess
              ? "Du kannst alle 54 Argumente und die vollständigen Foren öffnen."
              : "Bestelle ein Deck oder löse einen Markt- beziehungsweise Geschenkcode ein."}
          </p>
        </div>
        {status?.hasFullAccess && <a href="/cards">Alle Argumente öffnen</a>}
      </section>

      {gift && (
        <section className="gift-result" aria-live="polite">
          <p className="eyebrow">Einmaliger Geschenklink</p>
          <h2>Jetzt weitergeben</h2>
          <p>Dieser Link wird aus Sicherheitsgründen nur jetzt vollständig angezeigt.</p>
          <code>{gift.giftUrl}</code>
          <strong>{gift.code}</strong>
          <button type="button" onClick={copyGiftLink}>Link kopieren</button>
        </section>
      )}

      {message && <p className="access-message" role="status">{message}</p>}

      <section>
        <div className="access-section-heading">
          <div>
            <p className="eyebrow">Deine Decks</p>
            <h2>Zugänge verwalten</h2>
          </div>
          <a href="/freischalten">Code einlösen</a>
        </div>

        {status && status.licenses.length > 0 ? (
          <div className="license-grid">
            {status.licenses.map((license, index) => (
              <article className="license-card" key={license.id}>
                <span>Zugang {index + 1}</span>
                <h3>
                  {license.status === "mine" && "Für dein Profil aktiviert"}
                  {license.status === "available" && (license.codeHint ? `Geschenklink erstellt · …${license.codeHint}` : "Noch frei verfügbar")}
                  {license.status === "claimed" && "Bereits weitergegeben"}
                  {license.status === "revoked" && "Gesperrt"}
                </h3>
                <p>
                  {license.orderNumber
                    ? `Bestellung ${license.orderNumber}${license.itemNumber ? ` · Deck ${license.itemNumber}` : ""}`
                    : license.note ?? "Direkt- oder Geschenkzugang"}
                </p>
                {license.orderNumber &&
                  (license.status === "mine" || license.status === "available") && (
                  <div className="license-actions">
                    {license.status === "available" && (
                      <button
                        type="button"
                        disabled={workingId === license.id}
                        onClick={() => claimForMe(license.id)}
                      >
                        Für mich aktivieren
                      </button>
                    )}
                    <button
                      type="button"
                      className="secondary"
                      disabled={workingId === license.id}
                      onClick={() => createGift(license)}
                    >
                      {license.status === "available" && license.codeHint
                        ? "Neuen Geschenklink erstellen"
                        : "Als Geschenk weitergeben"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Noch keine Zugänge</h3>
            <p>Nach einer bezahlten Bestellung erscheinen deine Deck-Zugänge hier automatisch.</p>
          </div>
        )}
      </section>
    </div>
  );
}
