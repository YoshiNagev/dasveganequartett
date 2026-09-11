import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function asText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Ungültige Anfrage." }, 400);
  }

  if (!body || typeof body !== "object") {
    return json({ error: "Ungültige Anfrage." }, 400);
  }

  const data = body as Record<string, unknown>;
  const name = asText(data.name, 160);
  const email = asText(data.email, 254);
  const orderReference = asText(data.orderReference, 240);
  const scope = asText(data.scope, 80) || "Gesamte Bestellung";
  const details = asText(data.details, 2000);
  const website = asText(data.website, 200);

  // Honeypot gegen einfache automatisierte Formulareinsendungen.
  if (website) return json({ ok: true, reference: "received" });

  if (!name || !EMAIL_RE.test(email) || !orderReference) {
    return json(
      { error: "Bitte Name, gültige E-Mail-Adresse und Bestellreferenz vollständig angeben." },
      400,
    );
  }

  if (!["Gesamte Bestellung", "Teil der Bestellung"].includes(scope)) {
    return json({ error: "Ungültiger Umfang des Widerrufs." }, 400);
  }

  if (scope === "Teil der Bestellung" && !details) {
    return json({ error: "Bitte gib bei einem Teilwiderruf die betroffenen Waren oder Mengen an." }, 400);
  }

  const smtpUser = import.meta.env.PRIVATE_EMAIL_USER?.trim();
  const smtpPassword = import.meta.env.PRIVATE_EMAIL_PASSWORD?.trim();
  const recipient = import.meta.env.WITHDRAWAL_RECIPIENT?.trim() || smtpUser;
  const smtpHost = import.meta.env.PRIVATE_EMAIL_HOST?.trim() || "mail.privateemail.com";
  const smtpPort = Number(import.meta.env.PRIVATE_EMAIL_PORT || 465);

  if (!smtpUser || !smtpPassword || !recipient) {
    console.error("Withdrawal email is not configured.");
    return json({ error: "Die Widerrufsfunktion ist momentan nicht korrekt konfiguriert." }, 500);
  }

  const now = new Date();
  const receivedAt = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(now);
  const reference = `WID-${now.toISOString().slice(0, 10).replaceAll("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const text = [
    "Eingangsbestätigung deines Widerrufs",
    "",
    `Referenz: ${reference}`,
    `Eingang: ${receivedAt} (Europe/Berlin)`,
    "",
    "Folgende Widerrufserklärung ist eingegangen:",
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Bestellreferenz: ${orderReference}`,
    `Umfang: ${scope}`,
    `Waren / Ergänzung: ${details || "–"}`,
    "",
    "Diese Nachricht bestätigt ausschließlich den Eingang der Widerrufserklärung.",
    "",
    "Yoshi Vegan Games",
    "Josias Everett",
    "Emil-Nolde-Straße 42, 61130 Nidderau",
    "kontakt@dasveganequartett.de",
  ].join("\n");

  const html = `
    <h1>Eingangsbestätigung deines Widerrufs</h1>
    <p><strong>Referenz:</strong> ${escapeHtml(reference)}<br>
    <strong>Eingang:</strong> ${escapeHtml(receivedAt)} (Europe/Berlin)</p>
    <p>Folgende Widerrufserklärung ist eingegangen:</p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>E-Mail:</strong> ${escapeHtml(email)}</li>
      <li><strong>Bestellreferenz:</strong> ${escapeHtml(orderReference)}</li>
      <li><strong>Umfang:</strong> ${escapeHtml(scope)}</li>
      <li><strong>Waren / Ergänzung:</strong> ${escapeHtml(details || "–")}</li>
    </ul>
    <p>Diese Nachricht bestätigt ausschließlich den Eingang der Widerrufserklärung.</p>
    <p>Yoshi Vegan Games<br>Josias Everett<br>Emil-Nolde-Straße 42, 61130 Nidderau<br>kontakt@dasveganequartett.de</p>
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Eine SMTP-Nachricht an den Verbraucher und als BCC an das eigene Postfach:
    // Erfolgreiches Senden bestätigt, dass der Mailserver beide Empfänger akzeptiert hat.
    await transporter.sendMail({
      from: `Yoshi Vegan Games <${smtpUser}>`,
      to: email,
      bcc: recipient,
      replyTo: recipient,
      subject: `Eingangsbestätigung Widerruf – ${reference}`,
      text,
      html,
      headers: {
        "X-Withdrawal-Reference": reference,
      },
    });

    return json({ ok: true, reference, receivedAt });
  } catch (error) {
    console.error("Withdrawal email failed", error);
    return json(
      { error: "Der Widerruf konnte technisch nicht bestätigt werden. Bitte sende ihn ersatzweise per E-Mail an kontakt@dasveganequartett.de." },
      500,
    );
  }
};

export const ALL: APIRoute = async () =>
  json({ error: "Methode nicht erlaubt." }, 405);
