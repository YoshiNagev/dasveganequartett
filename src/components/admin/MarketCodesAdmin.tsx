import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { supabase } from "../../lib/supabaseClient";

type CreatedCode = { code: string; url: string; qr?: string };

export default function MarketCodesAdmin() {
  const [accessToken, setAccessToken] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [note, setNote] = useState("Veganer Weihnachtsmarkt");
  const [codes, setCodes] = useState<CreatedCode[]>([]);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  async function authFetch(path: string, init?: RequestInit) {
    const response = await fetch(path, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Anfrage fehlgeschlagen.");
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
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Übersicht konnte nicht geladen werden.");
        setSummary(result.summary ?? {});
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Übersicht konnte nicht geladen werden.");
      }
      setLoading(false);
    });
  }, []);

  async function createCodes(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setCodes([]);
    setMessage("");
    try {
      const result = await authFetch("/api/admin/access-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity, note }),
      });
      const withQr = await Promise.all(
        (result.codes as CreatedCode[]).map(async (entry) => ({
          ...entry,
          qr: await QRCode.toDataURL(entry.url, {
            width: 420,
            margin: 1,
            color: { dark: "#07110d", light: "#ffffff" },
          }),
        }))
      );
      setCodes(withQr);
      setSummary((current) => ({
        ...current,
        "market:available": (current["market:available"] ?? 0) + withQr.length,
      }));
      setMessage("Codes erstellt. Drucke oder speichere sie jetzt; vollständig werden sie nur einmal angezeigt.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Codes konnten nicht erstellt werden.");
    } finally {
      setCreating(false);
    }
  }

  function downloadCsv() {
    const rows = ["code,url", ...codes.map((item) => `"${item.code}","${item.url}"`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
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
        <div><span>Verfügbare Marktcodes</span><strong>{summary["market:available"] ?? 0}</strong></div>
        <div><span>Eingelöste Marktcodes</span><strong>{summary["market:claimed"] ?? 0}</strong></div>
        <div><span>Stripe-Zugänge</span><strong>{(summary["stripe:available"] ?? 0) + (summary["stripe:claimed"] ?? 0)}</strong></div>
      </section>

      <form className="market-code-form no-print" onSubmit={createCodes}>
        <label>Anzahl<input type="number" min="1" max="50" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label>
        <label>Notiz<input value={note} maxLength={160} onChange={(event) => setNote(event.target.value)} /></label>
        <button type="submit" disabled={creating || !accessToken}>{creating ? "Codes werden erstellt …" : "Codes erstellen"}</button>
      </form>

      {message && <p className="access-message no-print" role="status">{message}</p>}

      {codes.length > 0 && (
        <>
          <div className="market-toolbar no-print">
            <button type="button" onClick={() => window.print()}>Zugangskarten drucken</button>
            <button type="button" className="secondary" onClick={downloadCsv}>CSV speichern</button>
          </div>
          <section className="print-code-grid">
            {codes.map((item) => (
              <article className="print-code-card" key={item.code}>
                <p>Das Vegane Quartett</p>
                <h2>Digitalen Begleitbereich freischalten</h2>
                {item.qr && <img src={item.qr} alt="QR-Code zur Freischaltung" />}
                <strong>{item.code}</strong>
                <small>dasveganequartett.de/freischalten</small>
                <p>Einmalig einlösbar · alle 54 Argumente und Käuferforen</p>
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
