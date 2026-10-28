import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [printing, setPrinting] = useState(false);
  const [filter, setFilter] = useState("available");
  const [search, setSearch] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [note, setNote] = useState("Aktiviert durch Zugangscode");
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

  const selectedCodes = printableAvailableCodes.filter((entry) => selectedIds.has(entry.id));
  const visibleCodes = codes.filter((entry) =>
    (filter === "all" || entry.status === filter) &&
    `${entry.code ?? entry.maskedCode} ${entry.note ?? ""}`.toLocaleLowerCase("de").includes(search.toLocaleLowerCase("de"))
  );
  const selectableVisible = visibleCodes.filter((entry) =>
    entry.status === "available" && Boolean(entry.code && entry.url)
  );
  const allVisibleSelected = selectableVisible.length > 0 && selectableVisible.every((entry) => selectedIds.has(entry.id));

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  // Render directly below body: the website's header, footer and wrappers
  // can then be excluded from print without depending on their class names.
  useEffect(() => {
    if (!printing || printCodes.length === 0) return;
    let cancelled = false;
    async function printWhenReady() {
      try {
        await Promise.all(Array.from(document.querySelectorAll<HTMLImageElement>(".dvq-print-root img")).map((img) => img.decode()));
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        if (!cancelled) window.print();
      } catch {
        if (!cancelled) setMessage("Druckbilder konnten nicht geladen werden. Bitte erneut versuchen und den Logo-Pfad prüfen.");
      } finally {
        if (!cancelled) setPrinting(false);
      }
    }
    void printWhenReady();
    return () => { cancelled = true; };
  }, [printCodes]);

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
      setSelectedIds(new Set(created.filter((entry) => entry.status === "available" && entry.code && entry.url).map((entry) => entry.id)));
      setFilter("available");
      setSearch("");
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

    if (printing) return;
    setPrinting(true);
    setMessage("Druckansicht wird vorbereitet …");
    try {
    const printable = await Promise.all(
      entries.map(async (entry) => ({
        ...entry,
        code: entry.code,
        url: entry.url,
        qr: await QRCode.toDataURL(entry.url, {
          width: 600,
          margin: 4,
          color: { dark: "#000000", light: "#ffffff" },
        }),
      }))
    );
    setPrintCodes(printable);
    setMessage("");
    } catch {
      setPrinting(false);
      setMessage("QR-Codes konnten nicht erstellt werden. Bitte erneut versuchen.");
    }
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
            required
            step="1"
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
        <button type="submit" disabled={creating || printing || !accessToken}>
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
            <h2>Zugangscodes</h2>
            <p>
              Wähle verfügbare Codes aus und drucke die passenden Zugangskarten.
              Neu erstellte Codes werden automatisch ausgewählt.
            </p>
          </div>
          <div className="market-toolbar">
            <button
              type="button"
              disabled={printing || selectedCodes.length === 0}
              onClick={() => preparePrint(selectedCodes)}
            >
              {printing ? "Druck wird vorbereitet …" : `Auswahl drucken (${selectedCodes.length})`}
            </button>
            <button type="button" className="secondary" onClick={downloadCsv}>
              CSV speichern
            </button>
          </div>
        </div>

        <div className="market-filters">
          <label>Status<select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value="available">Verfügbar</option><option value="claimed">Eingelöst</option>
            <option value="revoked">Gesperrt</option><option value="all">Alle</option>
          </select></label>
          <label>Code oder Notiz suchen<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Suchen …" /></label>
          <button type="button" className="secondary" onClick={() => setSelectedIds(new Set())} disabled={selectedIds.size === 0}>Auswahl aufheben</button>
        </div>
        <p className="selection-hint">{selectedCodes.length} ausgewählt · {visibleCodes.length} angezeigt. Die Auswahl bleibt beim Filtern erhalten. Nur verfügbare, vollständig abrufbare Codes sind druckbar.</p>
        {codes.length === 0 ? (
          <div className="empty-state">
            <h3>Noch keine Marktcodes</h3>
            <p>Erstelle oben den ersten Code für einen Direktverkauf.</p>
          </div>
        ) : visibleCodes.length === 0 ? <p>Keine passenden Codes gefunden.</p> : (
          <div className="code-table-wrap">
            <table className="code-table">
              <thead>
                <tr>
                  <th><input type="checkbox" aria-label="Alle angezeigten druckbaren Codes auswählen" checked={allVisibleSelected} disabled={printing || selectableVisible.length === 0} onChange={() => setSelectedIds((current) => {
                    const next = new Set(current);
                    selectableVisible.forEach((entry) => { if (allVisibleSelected) next.delete(entry.id); else next.add(entry.id); });
                    return next;
                  })} /></th>
                  <th>Code</th>
                  <th>Status</th>
                  <th>Notiz</th>
                  <th>Erstellt</th>
                  <th>Eingelöst</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {visibleCodes.map((entry) => (
                  <tr key={entry.id}>
                    <td><input type="checkbox" aria-label={`Code ${entry.code ?? entry.maskedCode} auswählen`} checked={selectedIds.has(entry.id)} disabled={printing || entry.status !== "available" || !entry.code || !entry.url} onChange={() => toggleSelection(entry.id)} /></td>
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
                            disabled={printing}
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

      {printCodes.length > 0 && typeof document !== "undefined" && createPortal(
        <div className="dvq-print-root">
          <style>{PRINT_STYLES}</style>
          {printCodes.map((entry) => (
            <article className="dvq-access-card" key={entry.id}>
              <img className="dvq-card-logo" src="/images/dvq-logo-print.png" alt="Das Vegane Quartett" />
              <h2>Dein Zugangscode</h2>
              <p>Zum Freischalten aller<br />Funktionen der Website</p>
              <img className="dvq-card-qr" src={entry.qr} alt="QR-Code zur Freischaltung" />
              <strong>{entry.code}</strong>
              <p>QR-Code scannen und Zugang aktivieren.</p>
              <small>dasveganequartett.de · Einmalig einlösbar</small>
            </article>
          ))}
        </div>, document.body
      )}
    </div>
  );
}

const PRINT_STYLES = `
.dvq-print-root { display:none; }
@media print {
  @page { size:A4 portrait; margin:10mm; }
  html, body { margin:0!important; padding:0!important; width:auto!important; min-height:0!important; background:#fff!important; color:#000!important; color-scheme:light!important; }
  body > :not(.dvq-print-root) { display:none!important; }
  body > .dvq-print-root { display:grid!important; grid-template-columns:repeat(3,60mm); gap:4mm; align-content:start; justify-content:center; margin:0!important; padding:0!important; font-family:Arial,sans-serif; color:#000; }
  .dvq-print-root .dvq-access-card { box-sizing:border-box; width:60mm; height:84mm; border:.2mm dashed #aaa; padding:3mm; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.5mm; break-inside:avoid; page-break-inside:avoid; text-align:center; background:#fff; color:#000; box-shadow:none; }
  .dvq-print-root .dvq-card-logo { display:block; width:39mm; height:16mm; object-fit:contain; }
  .dvq-print-root .dvq-card-qr { display:block; width:28mm; height:28mm; object-fit:contain; }
  .dvq-print-root h2 { margin:0; font:700 11pt Arial,sans-serif; color:#000; }
  .dvq-print-root p { margin:0; font:8pt/1.25 Arial,sans-serif; color:#000; }
  .dvq-print-root strong { max-width:100%; overflow-wrap:anywhere; font:700 10pt/1.2 monospace; letter-spacing:.3mm; color:#000; }
  .dvq-print-root small { font:6.5pt/1.2 Arial,sans-serif; color:#000; }
}
`;
