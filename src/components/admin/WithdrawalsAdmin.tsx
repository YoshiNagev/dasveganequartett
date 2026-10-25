import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
type Order = {id:string; order_number:string; customer_email:string|null; total_cents:number;status:string;shipped_at:string|null;stripe_payment_intent_id:string|null;refund_status:string;refunded_amount_cents:number;refund_checked_at:string|null};
type Withdrawal = {id:string;reference:string;created_at:string;name:string;email:string;order_reference:string;scope:string;details:string;status:string;mail_status:string;admin_note:string;orders:Order|null};
const money = (n:number) => new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(n/100);
const date = (s:string) => new Date(s).toLocaleString("de-DE",{timeZone:"Europe/Berlin"});
const refundLabels:Record<string,string> = {none:"Keine Erstattung",succeeded:"Vollständig erstattet",partial:"Teilweise erstattet",pending:"In Bearbeitung / Aktion erforderlich",failed:"Fehlgeschlagen / abgebrochen"};
const orderLabels:Record<string,string> = {pending:"Zahlung ausstehend",paid:"Bezahlt",shipped:"Versendet",cancelled:"Zahlung abgebrochen",refunded:"Erstattet"};
export default function WithdrawalsAdmin() {
 const [rows,setRows]=useState<Withdrawal[]>([]),[message,setMessage]=useState("");
 const [busy,setBusy]=useState(false),[page,setPage]=useState(0),[all,setAll]=useState(false);
 async function api(path:string,body?:unknown) {
  const {data}=await supabase.auth.getSession();
  if(!data.session) throw new Error("Bitte als Admin anmelden.");
  const res=await fetch(path,{method:body?"POST":"GET",headers:{Authorization:`Bearer ${data.session.access_token}`,"Content-Type":"application/json"},...(body?{body:JSON.stringify(body)}:{})});
  const result=await res.json(); if(!res.ok) throw new Error(result.error || "Anfrage fehlgeschlagen.");return result;
 }
 async function load() {
  const result=await api(`/api/admin/withdrawals?page=${page}&status=${all?"all":"open"}`);
  setRows(result.withdrawals);
 }
 useEffect(()=>{setBusy(true);setMessage("");load().catch(e=>{setRows([]);setMessage(e.message);}).finally(()=>setBusy(false));},[page,all]);
 async function action(w:Withdrawal,body:Record<string,unknown>) {
  setBusy(true);setMessage("");
  try {const result=await api(`/api/admin/withdrawals/${w.id}`,body);await load();setMessage(result.message);}
  catch(e){setMessage(e instanceof Error?e.message:"Aktion fehlgeschlagen.");}
  finally{setBusy(false);}
 }
 function assign(w:Withdrawal) {
  const ref=prompt("Exakte Bestellnummer zur Zuordnung (Identität anschließend prüfen):",w.order_reference);
  if(ref?.trim()) void action(w,{action:"assign",orderReference:ref});
 }
 function refund(w:Withdrawal) {
  const o=w.orders;if(!o)return;
  if(!confirm(`Vollständige Rückzahlung von ${money(o.total_cents)} für ${o.order_number} auslösen?\n\nKäufer-E-Mail: ${o.customer_email || "fehlt"}\nWiderrufs-E-Mail: ${w.email}\nVersand: ${o.shipped_at?date(o.shipped_at):"Nicht als versendet markiert"}\n\nIch habe die Zuordnung, Berechtigung und gegebenenfalls die Rücksendung geprüft. Die Zahlung geht an das ursprüngliche Zahlungsmittel zurück.`))return;
  void action(w,{action:"refund",confirmOrder:o.order_number,confirmAmount:o.total_cents,reviewed:true});
 }
 return <section className="withdrawals-admin">
  <p>Ein eingegangener Widerruf löst noch keine Rückzahlung aus. Prüfe die Zuordnung und den Umfang. Beträge und Erstattungsstatus lassen sich mit Stripe abgleichen.</p>
  <div className="withdrawal-actions"><label><input type="checkbox" checked={all} disabled={busy} onChange={e=>{setAll(e.target.checked);setPage(0);}}/> Auch abgeschlossene anzeigen</label>
  <button disabled={busy} onClick={()=>{setBusy(true);load().catch(e=>setMessage(e.message)).finally(()=>setBusy(false));}}>Aktualisieren</button></div>
  <p role="status" aria-live="polite">{busy?"Wird geladen …":message}</p>
  {!busy&&!rows.length&&<p>Keine Widerrufe in dieser Ansicht.</p>}
  {rows.map(w=><article className="withdrawal-card" key={w.id}>
   <header><h2>{w.reference}</h2><span>{w.status==="open"?"Offen":"Abgeschlossen"}</span></header>
   <p>Eingang: {date(w.created_at)} · Bestätigungsmail: {w.mail_status==="sent"?"Versendet":w.mail_status==="failed"?"Versand fehlgeschlagen":"Versand unbestätigt"}</p>
   <p>{w.name} · {w.email}</p><p>Angegebene Referenz: <strong>{w.order_reference}</strong> · {w.scope}</p>
   {w.details&&<p className="withdrawal-details">{w.details}</p>}
   {w.orders?<section className="withdrawal-order"><h3>Zugeordnet: {w.orders.order_number}</h3>
    <p>{w.orders.customer_email || "Keine Bestell-E-Mail"} · {money(w.orders.total_cents)} · {orderLabels[w.orders.status] || w.orders.status}</p>
    {w.orders.customer_email?.trim().toLowerCase()!==w.email.trim().toLowerCase()&&<p><strong>E-Mail-Adressen weichen ab. Zuordnung vor Erstattung prüfen.</strong></p>}
    <p>{refundLabels[w.orders.refund_status] || w.orders.refund_status} · Bestätigt erstattet: {money(w.orders.refunded_amount_cents)}</p>
    <p>{w.orders.refund_checked_at?`Stripe-Abgleich: ${date(w.orders.refund_checked_at)}`:"Noch kein Stripe-Abgleich – gespeicherter Status kann veraltet sein."}</p>
    {w.orders.shipped_at&&<p>Versandmarkierung: {date(w.orders.shipped_at)}. Rücksendung vor Erstattung prüfen.</p>}
    {w.orders.stripe_payment_intent_id&&<a href={`https://dashboard.stripe.com/payments/${encodeURIComponent(w.orders.stripe_payment_intent_id)}`} target="_blank" rel="noopener noreferrer">Zahlung in Stripe öffnen</a>}
   </section>:<p><strong>Keine automatische Zuordnung. Bitte Bestellung und Identität prüfen.</strong></p>}
   {w.admin_note&&<p className="withdrawal-details">Bearbeitungsnotiz: {w.admin_note}</p>}
   <div className="withdrawal-actions">
    <button disabled={busy} onClick={()=>assign(w)}>Bestellung zuordnen</button>
    {w.orders&&<button disabled={busy} onClick={()=>void action(w,{action:"sync"})}>Stripe-Status abgleichen</button>}
    {w.orders&&w.status==="open"&&w.scope==="Gesamte Bestellung"&&w.orders.refund_status==="none"&&<button className="primary" disabled={busy} onClick={()=>refund(w)}>Gesamtbetrag erstatten ({money(w.orders.total_cents)})</button>}
    {w.status==="open"?<button disabled={busy} onClick={()=>{const note=prompt("Bearbeitungsnotiz (z. B. vollständig erstattet, Duplikat oder Test):",w.admin_note);if(note?.trim())void action(w,{action:"close",note});}}>Als bearbeitet abschließen</button>:<button disabled={busy} onClick={()=>void action(w,{action:"reopen",note:w.admin_note})}>Wieder öffnen</button>}
   </div>
   {w.scope==="Teil der Bestellung"&&<p>Teilrückzahlungen nach Prüfung direkt in Stripe ausführen und anschließend den Status abgleichen.</p>}
  </article>)}
  <div className="withdrawal-actions"><button disabled={busy||page===0} onClick={()=>setPage(page-1)}>Zurück</button><span>Seite {page+1}</span><button disabled={busy||rows.length<50} onClick={()=>setPage(page+1)}>Weiter</button></div>
 </section>;
}
