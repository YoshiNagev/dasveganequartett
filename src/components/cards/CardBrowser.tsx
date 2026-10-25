import { useMemo, useState } from "react";
import CardImage from "./CardImage";
import { PUBLIC_CARD_IDS } from "../../lib/access";

type Card = { id: number; title: string; argument: string; categorySlug: string; categoryLabel: string };
type Props = { cards: Card[]; categories: string[]; fullAccess?: boolean };

export default function CardBrowser({ cards, categories, fullAccess = false }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  // Follow the order of the deck, rather than alphabetical category order.
  const orderedCategories = Array.from(new Set(cards.map(c => c.categoryLabel))).filter(c => categories.includes(c));
  const filtered = useMemo(() => cards.filter(card =>
    (!category || card.categoryLabel === category) &&
    `${card.id} ${card.title} ${card.argument} ${card.categoryLabel}`.toLocaleLowerCase("de").includes(query.trim().toLocaleLowerCase("de"))
  ), [cards, query, category]);
  const reset = () => { setQuery(""); setCategory(""); };
  return <section className="ec-browser" aria-label="Argumentkarten durchsuchen">
    <div className="ec-tools">
      <label className="ec-search">Karte finden
        <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Begriff, Kategorie oder Kartennummer" />
      </label>
      <p className="ec-access-note">{fullAccess ? "Dein Zugang: alle 54 Argumente" : "Sechs Karten frei zugänglich"}</p>
    </div>
    <div className="ec-filters" role="group" aria-label="Nach Kategorie filtern">
      <button type="button" aria-pressed={!category} onClick={() => setCategory("")}>Alle Kategorien</button>
      {orderedCategories.map((label, i) => <button key={label} type="button" aria-pressed={category === label} onClick={() => setCategory(label)}><span aria-hidden="true">0{i + 1}</span>{label}</button>)}
    </div>
    <div className="ec-result"><p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "Karte" : "Karten"} gefunden</p>{(query || category) && <button type="button" onClick={reset}>Filter zurücksetzen ↺</button>}</div>
    {filtered.length ? <div className="ec-grid">
      {filtered.map(card => {
        const isPublic = (PUBLIC_CARD_IDS as readonly number[]).includes(card.id);
        return <a href={`/cards/${card.id}`} className="ec-card" key={card.id} aria-label={`Karte ${card.id}: ${card.title}`}>
          <div className="ec-card-art" data-category={card.categorySlug}>
            <CardImage id={card.id} title={card.argument} category={card.categoryLabel} />
          </div>
          <div className="ec-card-caption"><span>{String(card.id).padStart(2,"0")} · {isPublic ? "Frei zugänglich" : "In deinem Deck"}</span><h2>{card.title}</h2><p>{card.categoryLabel}</p><span className="ec-open">Argument entdecken <span aria-hidden="true">↗</span></span></div>
        </a>;
      })}
    </div> : <div className="ec-empty"><h2>Hier ist noch keine passende Karte.</h2><p>Versuche einen anderen Begriff oder zeige wieder alle verfügbaren Karten.</p><button className="ed-button" type="button" onClick={reset}>Alle verfügbaren Karten zeigen</button></div>}
  </section>;
}
