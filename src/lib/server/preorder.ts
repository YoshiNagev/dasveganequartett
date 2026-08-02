import {
  preorderConfig,
  type AllowedPreorderQuantity,
} from "../../data/preorderConfig";

export class PreorderValidationError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "PreorderValidationError";
    this.status = status;
  }
}

export type ServerPreorderQuote = {
  quantity: AllowedPreorderQuantity;
  unitPriceCents: number;
  subtotalCents: number;
  shippingCostCents: number;
  totalCents: number;
  currency: "eur";
  estimatedShippingDate: string;
};

export function parsePreorderQuantity(
  input: unknown
): AllowedPreorderQuantity {
  if (
    typeof input !== "number" ||
    !Number.isInteger(input) ||
    !preorderConfig.allowedQuantities.includes(
      input as AllowedPreorderQuantity
    )
  ) {
    throw new PreorderValidationError(
      "Die Bestellmenge muss 1, 2, 3 oder 4 Decks betragen."
    );
  }

  return input as AllowedPreorderQuantity;
}

export function createServerPreorderQuote(
  input: unknown
): ServerPreorderQuote {
  const quantity = parsePreorderQuantity(input);

  const unitPriceCents = Math.round(
    preorderConfig.presalePrice * 100
  );
  const shippingCostCents = Math.round(
    preorderConfig.shippingCost * 100
  );
  const subtotalCents = quantity * unitPriceCents;
  const totalCents = subtotalCents + shippingCostCents;

  return {
    quantity,
    unitPriceCents,
    subtotalCents,
    shippingCostCents,
    totalCents,
    currency: "eur",
    estimatedShippingDate:
      preorderConfig.estimatedShippingDate,
  };
}
