const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function normalizeAccessCode(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function createAccessCode(): string {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  const characters = Array.from(
    bytes,
    (byte) => ALPHABET[byte % ALPHABET.length]
  ).join("");

  return `DVQ-${characters.slice(0, 4)}-${characters.slice(4, 8)}-${characters.slice(8, 12)}`;
}

export async function hashAccessCode(value: string): Promise<string> {
  const normalized = normalizeAccessCode(value);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(normalized)
  );

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

export function accessCodeHint(value: string): string {
  const normalized = normalizeAccessCode(value);
  return normalized.slice(-4);
}
