import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const ENCRYPTION_VERSION = "v1";

function accessCodeEncryptionKey(): Buffer {
  const encodedKey = import.meta.env.ACCESS_CODE_ENCRYPTION_KEY?.trim();

  if (!encodedKey) {
    throw new Error("ACCESS_CODE_ENCRYPTION_KEY fehlt.");
  }

  const key = Buffer.from(encodedKey, "base64");
  if (key.length !== 32) {
    throw new Error(
      "ACCESS_CODE_ENCRYPTION_KEY muss ein Base64-kodierter 32-Byte-Schlüssel sein."
    );
  }

  return key;
}

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

export function encryptAccessCode(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    accessCodeEncryptionKey(),
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authenticationTag = cipher.getAuthTag();

  return [
    ENCRYPTION_VERSION,
    iv.toString("base64url"),
    encrypted.toString("base64url"),
    authenticationTag.toString("base64url"),
  ].join(".");
}

export function decryptAccessCode(value: string): string {
  const [version, encodedIv, encodedValue, encodedTag] = value.split(".");
  if (
    version !== ENCRYPTION_VERSION ||
    !encodedIv ||
    !encodedValue ||
    !encodedTag
  ) {
    throw new Error("Das gespeicherte Zugangscodeformat ist ungültig.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    accessCodeEncryptionKey(),
    Buffer.from(encodedIv, "base64url")
  );
  decipher.setAuthTag(Buffer.from(encodedTag, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encodedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
