import { useMemo, useState } from "react";

type Card = {
  id: number;
  slug: string;
  title: string;
  argument: string;
  shortReply?: string;
  categorySlug: string;
  categoryLabel: string;
};

type Props = {
  cards: Card[];
  categories: string[];
};

export default function CardBrowser({ cards, categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const visibleCategories =
    categories.length > 0
      ? categories
      : Array.from(new Set(cards.map((card) => card.categoryLabel)));

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return cards.filter((card) => {
      const matchesCategory =
        activeCategory === "Alle" || card.categoryLabel === activeCategory;

      const searchableText = [
        card.id,
        card.title,
        card.argument,
        card.categoryLabel,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [cards, query, activeCategory]);

  return (
    <section className="card-browser">
      <div className="card-browser-panel">
        <div className="search-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Argument oder Kategorie suchen..."
            className="search-input"
          />

          <span className="result-pill">
            {filteredCards.length}/{cards.length}
          </span>
        </div>

        <div className="category-chip-row" aria-label="Kategorien filtern">
          <button
            type="button"
            className={
              activeCategory === "Alle"
                ? "category-chip active"
                : "category-chip"
            }
            onClick={() => setActiveCategory("Alle")}
          >
            Alle
          </button>

          {visibleCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "category-chip active"
                  : "category-chip"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filteredCards.length === 1
          ? "1 Karte gefunden"
          : `${filteredCards.length} Karten gefunden`}
      </p>

      <div className="card-grid">
        {filteredCards.map((card) => (
          <a className="card-tile" href={`/cards/${card.id}`} key={card.id}>
            <div className="card-tile-top">
              <span className="card-id">
                #{String(card.id).padStart(2, "0")}
              </span>

              <span className="card-category">
                {card.categoryLabel}
              </span>
            </div>

            <div className="card-tile-section">
              <span>Argument</span>
              <h3>{card.argument}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}