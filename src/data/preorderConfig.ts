export const preorderConfig = {
  presalePrice: 12,
  regularPrice: 14,
  shippingCost: 3,
  allowedQuantities: [1, 2, 3, 4],
  estimatedShippingDate: "Dezember 2026",
  preorderOpen: false,
  contactEmail: "kontakt@dasveganequartett.de",
} as const;

export type AllowedPreorderQuantity =
  (typeof preorderConfig.allowedQuantities)[number];

export function calculatePreorderTotal(quantity: AllowedPreorderQuantity) {
  const subtotal = quantity * preorderConfig.presalePrice;
  const shipping = preorderConfig.shippingCost;
  return { subtotal, shipping, total: subtotal + shipping };
}
