export const product = {
  siteName: "Das Vegane Quartett",
  domain: "dasveganequartett.de",
  name: "Das Quartett der Argumente (gegen Veganismus)",
  price: "14,00 €",
  deliveryNote: "Produktionsstart März 2027",
  contents: ["54 Argumentkarten", "Deckkarte", "Anleitung", "Box"],
  preorderCta: "Für 14,00 € vorbestellen",
  stripePriceId: import.meta.env.PUBLIC_STRIPE_PRICE_ID ?? "",
} as const;
