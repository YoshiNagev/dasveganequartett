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
    if (license.status === "mine") {
      const activeLicenseCount =
        status?.licenses.filter((item) => item.status === "mine").length ?? 0;
      const confirmationText =
        activeLicenseCount === 1
          ? "Das ist dein einziger aktiver Zugang. Sobald du den Geschenklink erzeugst, verliert dein Profil den vollständigen Zugriff. Fortfahren?"
          : "Dieser Zugang wird von deinem Profil gelöst und als Geschenklink bereitgestellt. Dein anderer aktiver Zugang bleibt erhalten. Fortfahren?";

      if (!window.confirm(confirmationText)) return;
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

  const activeLicenses =
    status?.licenses.filter((license) => license.status === "mine") ?? [];
  const ownLicense = activeLicenses[0] ?? null;
  const additionalLicenses =
    status?.licenses.filter((license) => license.id !== ownLicense?.id) ?? [];

  function renderLicenseCard(
    license: License,
    label: string,
    isOwnLicense = false
  ) {
    const canManageOrderLicense =
      Boolean(license.orderNumber) &&
      (license.status === "mine" || license.status === "available");

    return (
      <article
        className={isOwnLicense ? "license-card is-own-license" : "license-card"}
        key={license.id}
      >
        <span>{label}</span>
        <h3>
          {license.status === "mine" &&
            (isOwnLicense
              ? "Für dein Profil aktiviert"
              : "Zusätzlich für dein Profil aktiviert")}
          {license.status === "available" &&
            (license.codeHint
              ? `Geschenklink erstellt · …${license.codeHint}`
              : "Bereit zum Verschenken")}
          {license.status === "claimed" && "Von einer anderen Person aktiviert"}
          {license.status === "revoked" && "Gesperrt"}
        </h3>
        <p>
          {license.orderNumber
            ? `Bestellung ${license.orderNumber}${license.itemNumber ? ` · Deck ${license.itemNumber}` : ""}`
            : license.note ?? "Eingelöster Direkt- oder Geschenkzugang"}
        </p>

        {isOwnLicense && license.status === "mine" && (
          <p className="license-explanation">
            Dieser Zugang gibt deinem Profil den vollständigen Zugriff. Einen
            über die Website gekauften Zugang kannst du als Geschenk
            weitergeben.
          </p>
        )}

        {canManageOrderLicense && (
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
                : isOwnLicense
                  ? "Eigenen Zugang verschenken"
                  : "Als Geschenk weitergeben"}
            </button>
          </div>
        )}

        {isOwnLicense && license.status === "mine" && !license.orderNumber && (
          <p className="license-restriction">
            Dieser Zugang wurde über einen Code aktiviert und kann nicht erneut
            weitergegeben werden.
          </p>
        )}
      </article>
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
          <p>
            Teile diesen Link mit der beschenkten Person. Sobald sie ihn
            einlöst, wird der Zugang fest mit ihrem Profil verbunden. Der
            vollständige Link wird aus Sicherheitsgründen nur jetzt angezeigt.
          </p>
          <code>{gift.giftUrl}</code>
          <strong>{gift.code}</strong>
          <button type="button" onClick={copyGiftLink}>Link kopieren</button>
        </section>
      )}

      {message && <p className="access-message" role="status">{message}</p>}

      <section className="own-access-section">
        <div className="access-section-heading">
          <div>
            <p className="eyebrow">Dein Profil</p>
            <h2>Dein eigener Zugang</h2>
          </div>
          <a href="/freischalten">Code einlösen</a>
        </div>

        {ownLicense ? (
          <div className="license-grid single-license">
            {renderLicenseCard(ownLicense, "Eigener Zugang", true)}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Noch kein eigener Zugang aktiviert</h3>
            <p>
              Nach deiner ersten bezahlten Bestellung wird der erste
              Deck-Zugang automatisch für dein Profil aktiviert.
            </p>
          </div>
        )}
      </section>

      <section className="additional-access-section">
        <div className="access-section-heading">
          <div>
            <p className="eyebrow">Geschenke</p>
            <h2>Weitere Zugänge</h2>
            <p className="access-section-copy">
              Jeder weitere Deck-Zugang ist separat. Freie Zugänge kannst du
              verschenken, ohne deinen eigenen Zugang abzugeben.
            </p>
          </div>
        </div>

        {additionalLicenses.length > 0 ? (
          <div className="license-grid">
            {additionalLicenses.map((license, index) =>
              renderLicenseCard(license, `Weiterer Zugang ${index + 1}`)
            )}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Keine weiteren Zugänge vorhanden</h3>
            <p>
              Kaufst du mehrere Decks, erscheint jeder zusätzliche Zugang hier
              und kann mit einem eigenen Geschenklink weitergegeben werden.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
