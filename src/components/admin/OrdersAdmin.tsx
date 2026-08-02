import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Status = "pending" | "paid" | "cancelled" | "refunded" | "shipped";
type Address = { line1?: string|null; line2?: string|null; postal_code?: string|null; city?: string|null; state?: string|null; country?: string|null };
type Order = { id:string; order_number:string; quantity:number; total_cents:number; status:Status; customer_email:string|null; shipping_name:string|null; shipping_address:Address|null; stripe_checkout_session_id:string|null; stripe_payment_intent_id:string|null; created_at:string; paid_at:string|null; shipped_at:string|null };
type Summary = { orderCount:number; deckCount:number; revenueCents:number; paidCount:number; shippedCount:number };

const labels: Record<Status,string> = { pending:"Ausstehend", paid:"Bezahlt", cancelled:"Storniert", refunded:"Erstattet", shipped:"Versendet" };
const money = (c:number) => new Intl.NumberFormat("de-DE", { style:"currency", currency:"EUR" }).format(c/100);
const date = (v:string|null) => v ? new Intl.DateTimeFormat("de-DE", { dateStyle:"medium", timeStyle:"short" }).format(new Date(v)) : "–";

async function token() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export default function OrdersAdmin() {
  const [orders,setOrders] = useState<Order[]>([]);
  const [summary,setSummary] = useState<Summary|null>(null);
  const [status,setStatus] = useState<string>("all");
  const [search,setSearch] = useState("");
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const [denied,setDenied] = useState(false);
  const [updating,setUpdating] = useState<string|null>(null);

  async function load(nextStatus=status,nextSearch=search) {
    setLoading(true); setMessage(""); setDenied(false);
    try {
      const accessToken = await token();
      if (!accessToken) throw new Error("Bitte melde dich an, um den Admin-Bereich zu öffnen.");
      const params = new URLSearchParams();
      if (nextStatus !== "all") params.set("status",nextStatus);
      if (nextSearch.trim()) params.set("search",nextSearch.trim());
      const res = await fetch(`/api/admin/orders?${params}`, { headers:{ Authorization:`Bearer ${accessToken}` } });
      const data = await res.json();
      if (!res.ok) { if ([401,403].includes(res.status)) setDenied(true); throw new Error(data.error ?? "Fehler beim Laden."); }
      setOrders(data.orders ?? []); setSummary(data.summary ?? null);
    } catch (e) { setOrders([]); setSummary(null); setMessage(e instanceof Error ? e.message : "Fehler beim Laden."); }
    finally { setLoading(false); }
  }

  useEffect(() => { load("all",""); }, []);

  async function change(order:Order, action:"mark_shipped"|"undo_shipped") {
    if (!confirm(action === "mark_shipped" ? `${order.order_number} als versendet markieren?` : `Versandstatus von ${order.order_number} zurücksetzen?`)) return;
    setUpdating(order.id); setMessage("");
    try {
      const accessToken = await token(); if (!accessToken) throw new Error("Sitzung abgelaufen.");
      const res = await fetch(`/api/admin/orders/${order.id}`, { method:"PATCH", headers:{ "Content-Type":"application/json", Authorization:`Bearer ${accessToken}` }, body:JSON.stringify({action}) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error ?? "Status konnte nicht geändert werden.");
      await load(status,search);
      setMessage(action === "mark_shipped" ? "Bestellung als versendet markiert." : "Versandstatus zurückgesetzt.");
    } catch(e) { setMessage(e instanceof Error ? e.message : "Fehler."); }
    finally { setUpdating(null); }
  }

  if (denied) return <section className="admin-access-card"><p className="eyebrow">Geschützter Bereich</p><h2>Zugriff nicht möglich</h2><p>{message}</p><a href="/account/login">Einloggen</a></section>;

  return <section className="orders-admin">
    <div className="orders-summary-grid">
      <article><span>Bestellungen</span><strong>{summary?.orderCount ?? 0}</strong></article>
      <article><span>Decks</span><strong>{summary?.deckCount ?? 0}</strong></article>
      <article><span>Bezahlter Umsatz</span><strong>{money(summary?.revenueCents ?? 0)}</strong></article>
      <article><span>Noch zu versenden</span><strong>{summary ? Math.max(summary.paidCount-summary.shippedCount,0) : 0}</strong></article>
    </div>

    <div className="orders-toolbar">
      <form onSubmit={e=>{e.preventDefault();load(status,search)}}><label htmlFor="order-search">Bestellung suchen</label><div><input id="order-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Bestellnummer, Name oder E-Mail"/><button>Suchen</button></div></form>
      <div className="orders-filter">{[["all","Alle"],["paid","Bezahlt"],["shipped","Versendet"],["pending","Ausstehend"],["cancelled","Storniert"],["refunded","Erstattet"]].map(([v,l])=><button key={v} type="button" className={status===v?"is-active":""} onClick={()=>{setStatus(v);load(v,search)}}>{l}</button>)}</div>
    </div>

    {message && <p className="admin-orders-message">{message}</p>}
    {loading ? <div className="admin-orders-loading">Bestellungen werden geladen …</div> : orders.length===0 ? <div className="empty-state"><h3>Keine Bestellungen gefunden</h3></div> : <div className="orders-list">{orders.map(o=>{
      const a=o.shipping_address; const lines=[a?.line1,a?.line2,[a?.postal_code,a?.city].filter(Boolean).join(" "),a?.state,a?.country].filter(Boolean) as string[];
      return <article className="admin-order-card" key={o.id}>
        <header><div><p className="eyebrow">Bestellung</p><h2>{o.order_number}</h2></div><span className={`order-status ${o.status}`}>{labels[o.status]}</span></header>
        <div className="order-key-data"><div><span>Menge</span><strong>{o.quantity} {o.quantity===1?"Deck":"Decks"}</strong></div><div><span>Gesamt</span><strong>{money(o.total_cents)}</strong></div><div><span>Bestellt</span><strong>{date(o.created_at)}</strong></div><div><span>Bezahlt</span><strong>{date(o.paid_at)}</strong></div></div>
        <div className="order-detail-grid">
          <section><h3>Kundendaten</h3><p><strong>{o.shipping_name ?? "Kein Name"}</strong></p><p>{o.customer_email ? <a href={`mailto:${o.customer_email}`}>{o.customer_email}</a> : "Keine E-Mail"}</p></section>
          <section><h3>Lieferadresse</h3>{lines.length ? <address>{lines.map(x=><span key={x}>{x}</span>)}</address> : <p>Keine Lieferadresse gespeichert.</p>}</section>
          <section><h3>Stripe</h3><p>{o.stripe_checkout_session_id ?? "–"}</p><p>{o.stripe_payment_intent_id ?? "–"}</p></section>
        </div>
        <footer><span>{o.status==="shipped" ? `Versendet am ${date(o.shipped_at)}` : ""}</span><div className="order-actions">{o.status==="paid" && <button disabled={updating===o.id} onClick={()=>change(o,"mark_shipped")}>Als versendet markieren</button>}{o.status==="shipped" && <button className="secondary" disabled={updating===o.id} onClick={()=>change(o,"undo_shipped")}>Versandstatus zurücksetzen</button>}</div></footer>
      </article>})}</div>}
  </section>;
}
