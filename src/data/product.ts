export const product = {
  siteName: "Das Vegane Quartett",
  domain: "dasveganequartett.de",
  name: "Das Quartett der Argumente (gegen Veganismus)",
  price: "12,00 €",
  deliveryNote: "Versandstart 20. November 2026",
  contents: ["54 Argumentkarten", "Deckkarte"],
  preorderCta: "Für 12,00 € vorbestellen",
  stripePriceId: import.meta.env.PUBLIC_STRIPE_PRICE_ID ?? "",
} as const;
