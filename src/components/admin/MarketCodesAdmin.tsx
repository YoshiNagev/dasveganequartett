import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { supabase } from "../../lib/supabaseClient";

type MarketCode = {
  id: string;
  code: string | null;
  maskedCode: string;
  url: string | null;
  status: "available" | "claimed" | "revoked";
  note: string | null;
  createdAt: string;
  claimedAt: string | null;
  decryptionFailed: boolean;
};

type PrintableCode = MarketCode & { code: string; url: string; qr: string };

type AccessCodeResponse = {
  summary?: Record<string, number>;
  codes?: MarketCode[];
  code?: MarketCode;
  error?: string;
};

const statusLabels: Record<MarketCode["status"], string> = {
  available: "Verfügbar",
  claimed: "Eingelöst",
  revoked: "Gesperrt",
};

function formatDate(value: string | null) {
  if (!value) return "–";
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export default function MarketCodesAdmin() {
  const [accessToken, setAccessToken] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [note, setNote] = useState("Veganer Weihnachtsmarkt");
  const [codes, setCodes] = useState<MarketCode[]>([]);
  const [printCodes, setPrintCodes] = useState<PrintableCode[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [workingId, setWorkingId] = useState("");
  const [message, setMessage] = useState("");

  const printableAvailableCodes = useMemo(
    () =>
      codes.filter(
        (entry): entry is MarketCode & { code: string; url: string } =>
          entry.status === "available" && Boolean(entry.code && entry.url)
      ),
    [codes]
  );

  async function authFetch(path: string, init?: RequestInit) {
    const response = await fetch(path, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = (await response.json()) as AccessCodeResponse;
    if (!response.ok) {
      throw new Error(result.error ?? "Anfrage fehlgeschlagen.");
    }
    return result;
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token ?? "";
      setAccessToken(token);
      if (!token) {
        setMessage("Bitte melde dich mit deinem Administratorkonto an.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/access-codes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = (await response.json()) as AccessCodeResponse;
        if (!response.ok) {
          throw new Error(result.error ?? "Übersicht konnte nicht geladen werden.");
        }
        setSummary(result.summary ?? {});
        setCodes(result.codes ?? []);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Übersicht konnte nicht geladen werden."
        );
      }
      setLoading(false);
    });
  }, []);

  async function createCodes(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setMessage("");
    try {
      const result = await authFetch("/api/admin/access-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, note }),
      });
      const created = result.codes ?? [];
      setCodes((current) => [...created, ...current]);
      setSummary((current) => ({
        ...current,
        "market:available":
          (current["market:available"] ?? 0) + created.length,
      }));
      setMessage(
        `${created.length} ${created.length === 1 ? "Code wurde" : "Codes wurden"} erstellt und sicher im Archiv gespeichert.`
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Codes konnten nicht erstellt werden."
      );
    } finally {
      setCreating(false);
    }
  }

  async function replaceCode(entry: MarketCode) {
    if (
      !window.confirm(
        "Der bisherige Code wird dadurch sofort ungültig. Neuen Code erzeugen?"
      )
    ) {
      return;
    }

    setWorkingId(entry.id);
    setMessage("");
    try {
      const result = await authFetch("/api/admin/access-codes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseId: entry.id }),
      });
      if (!result.code) throw new Error("Der neue Code wurde nicht zurückgegeben.");
      setCodes((current) =>
        current.map((item) => (item.id === entry.id ? result.code! : item))
      );
      setMessage("Der alte Code wurde ersetzt und ist ab sofort ungültig.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Der Code konnte nicht ersetzt werden."
      );
    } finally {
      setWorkingId("");
    }
  }

  async function preparePrint(entries: Array<MarketCode & { code: string; url: string }>) {
    if (entries.length === 0) {
      setMessage("Es gibt keine verfügbaren, druckbaren Codes.");
      return;
    }

    setMessage("Druckansicht wird vorbereitet …");
    const printable = await Promise.all(
      entries.map(async (entry) => ({
        ...entry,
        code: entry.code,
        url: entry.url,
        qr: await QRCode.toDataURL(entry.url, {
          width: 600,
          margin: 1,
          color: { dark: "#000000", light: "#ffffff" },
        }),
      }))
    );
    setPrintCodes(printable);
    setMessage("");
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => window.print())
    );
  }

  function downloadCsv() {
    const visibleCodes = codes.filter(
      (entry): entry is MarketCode & { code: string; url: string } =>
        Boolean(entry.code && entry.url)
    );
    if (visibleCodes.length === 0) {
      setMessage("Es gibt noch keine abrufbaren Codes für den CSV-Export.");
      return;
    }

    const rows = [
      "code,url,status,notiz,erstellt,eingeloest",
      ...visibleCodes.map((entry) =>
        [
          entry.code,
          entry.url,
          statusLabels[entry.status],
          entry.note ?? "",
          entry.createdAt,
          entry.claimedAt ?? "",
        ]
          .map(escapeCsv)
          .join(",")
      ),
    ];
    const blob = new Blob([rows.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dvq-markt-zugangscodes.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (loading) return <p>Verwaltung wird geladen …</p>;

  return (
    <div className="market-admin">
      <section className="market-summary no-print">
        <div>
          <span>Verfügbare Marktcodes</span>
          <strong>{summary["market:available"] ?? 0}</strong>
        </div>
        <div>
          <span>Eingelöste Marktcodes</span>
          <strong>{summary["market:claimed"] ?? 0}</strong>
        </div>
        <div>
          <span>Stripe-Zugänge</span>
          <strong>
            {(summary["stripe:available"] ?? 0) +
              (summary["stripe:claimed"] ?? 0)}
          </strong>
        </div>
      </section>

      <form className="market-code-form no-print" onSubmit={createCodes}>
        <label>
          Anzahl
          <input
            type="number"
            min="1"
            max="50"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </label>
        <label>
          Notiz
          <input
            value={note}
            maxLength={160}
            onChange={(event) => setNote(event.target.value)}
          />
        </label>
        <button type="submit" disabled={creating || !accessToken}>
          {creating ? "Codes werden erstellt …" : "Codes erstellen"}
        </button>
      </form>

      {message && (
        <p className="access-message no-print" role="status">
          {message}
        </p>
      )}

      <section className="code-archive no-print">
        <div className="code-archive-heading">
          <div>
            <p className="eyebrow">Archiv</p>
            <h2>Erstellte Direktverkaufscodes</h2>
            <p>
              Neue Codes bleiben verschlüsselt abrufbar. Vor diesem Update
              erstellte Codes können nur maskiert angezeigt werden.
            </p>
          </div>
          <div className="market-toolbar">
            <button
              type="button"
              disabled={printableAvailableCodes.length === 0}
              onClick={() => preparePrint(printableAvailableCodes)}
            >
              Alle verfügbaren drucken
            </button>
            <button type="button" className="secondary" onClick={downloadCsv}>
              CSV speichern
            </button>
          </div>
        </div>

        {codes.length === 0 ? (
          <div className="empty-state">
            <h3>Noch keine Marktcodes</h3>
            <p>Erstelle oben den ersten Code für einen Direktverkauf.</p>
          </div>
        ) : (
          <div className="code-table-wrap">
            <table className="code-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Status</th>
                  <th>Notiz</th>
                  <th>Erstellt</th>
                  <th>Eingelöst</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((entry) => (
                  <tr key={entry.id}>
                    <td>
                      <code>{entry.code ?? entry.maskedCode}</code>
                      {!entry.code && (
                        <small>
                          {entry.decryptionFailed
                            ? "Schlüssel stimmt nicht"
                            : "Vollcode früher nicht gespeichert"}
                        </small>
                      )}
                    </td>
                    <td>
                      <span className={`code-status ${entry.status}`}>
                        {statusLabels[entry.status]}
                      </span>
                    </td>
                    <td>{entry.note ?? "–"}</td>
                    <td>{formatDate(entry.createdAt)}</td>
                    <td>{formatDate(entry.claimedAt)}</td>
                    <td>
                      <div className="code-row-actions">
                        {entry.status === "available" && entry.code && entry.url && (
                          <button
                            type="button"
                            onClick={() =>
                              preparePrint([
                                {
                                  ...entry,
                                  code: entry.code!,
                                  url: entry.url!,
                                },
                              ])
                            }
                          >
                            Drucken
                          </button>
                        )}
                        {entry.status === "available" && !entry.code && (
                          <button
                            type="button"
                            className="secondary"
                            disabled={workingId === entry.id}
                            onClick={() => replaceCode(entry)}
                          >
                            {workingId === entry.id
                              ? "Wird ersetzt …"
                              : "Code ersetzen"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="print-only print-code-grid" aria-label="Zugangscodes zum Ausschneiden">
        {printCodes.map((entry) => (
          <article className="print-code-card" key={entry.id}>
            <p>Das Vegane Quartett</p>
            <img src={entry.qr} alt="QR-Code zur Freischaltung" />
            <strong>{entry.code}</strong>
            <small>Einmalig einlösbar</small>
          </article>
        ))}
      </section>
    </div>
  );
}
