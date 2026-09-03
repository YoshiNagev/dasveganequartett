export const DVQ_PRODUCT_KEY = "das-vegane-quartett";

// Diese sechs Karten bilden die frei zugängliche Vorschau. Alle Kategorien
// sind vertreten und für jede Karte existiert bereits ein Kartenbild.
export const PUBLIC_CARD_IDS = [1, 16, 24, 29, 37, 48] as const;

export function isPublicCardId(id: number): boolean {
  return PUBLIC_CARD_IDS.includes(id as (typeof PUBLIC_CARD_IDS)[number]);
}

export function safeReturnPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/account/access";
  }

  return value;
}
