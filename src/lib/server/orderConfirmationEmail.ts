import { Resend } from "resend";

const apiKey = import.meta.env.RESEND_API_KEY;
const fromAddress =
  import.meta.env.ORDER_EMAIL_FROM ||
  "Das Vegane Quartett <bestellung@dasveganequartett.de>";
const replyTo =
  import.meta.env.ORDER_EMAIL_REPLY_TO ||
  "kontakt@dasveganequartett.de";

if (!apiKey) {
  throw new Error("RESEND_API_KEY fehlt.");
}

const resend = new Resend(apiKey);

type Address = {
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export type ConfirmationOrder = {
  id: string;
  order_number: string;
  quantity: number;
  unit_price_cents: number;
  shipping_cost_cents: number;
  total_cents: number;
  currency: string;
  customer_email: string;
  shipping_name: string | null;
  shipping_address: Address | null;
};

function euro(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function esc(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function country(code?: string | null) {
  if (!code) return "";
  return code.toUpperCase() === "DE" ? "Deutschland" : code.toUpperCase();
}

function lines(order: ConfirmationOrder) {
  const address = order.shipping_address;
  return [
    order.shipping_name,
    address?.line1,
    address?.line2,
    [address?.postal_code, address?.city].filter(Boolean).join(" "),
    address?.state,
    country(address?.country),
  ].filter((value): value is string => Boolean(value?.trim()));
}

function textVersion(order: ConfirmationOrder) {
  return `Hallo${order.shipping_name ? ` ${order.shipping_name}` : ""},

vielen Dank für deine Vorbestellung!

Bestellnummer: ${order.order_number}

${order.quantity} × Das Vegane Quartett: ${euro(
    order.quantity * order.unit_price_cents
  )}
Versand: ${euro(order.shipping_cost_cents)}
Gesamt: ${euro(order.total_cents)}

Voraussichtlicher Versand: Dezember 2026

Dein digitaler Zugang:
Der erste Deck-Zugang wurde automatisch für dein beim Kauf verwendetes Profil aktiviert. Weitere Deck-Zugänge kannst du als Geschenk weitergeben:
https://dasveganequartett.de/account/access

Lieferadresse:
${lines(order).join("\n")}

Sobald deine Bestellung versendet wurde, erhältst du eine weitere Nachricht.

Bei Fragen antworte einfach auf diese E-Mail.

Das Vegane Quartett
https://dasveganequartett.de`;
}

function htmlVersion(order: ConfirmationOrder) {
  const address = lines(order).map(esc).join("<br>");

  return `<!doctype html>
<html lang="de">
<body style="margin:0;background:#07090a;color:#fffdf4;font-family:Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#07090a;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#181b1d;border:1px solid #2b3033;border-radius:22px;overflow:hidden;">
          <tr>
            <td style="padding:32px;">
              <div style="color:#7effcb;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">Vorbestellung bestätigt</div>
              <h1 style="margin:14px 0 0;font-size:36px;line-height:1.05;color:#fffdf4;">Vielen Dank${order.shipping_name ? ` ${esc(order.shipping_name)}` : ""}!</h1>
              <p style="color:#c8c7c1;font-size:17px;line-height:1.65;">Deine Zahlung wurde bestätigt und deine Vorbestellung ist eingegangen.</p>

              <div style="margin-top:22px;padding:18px 20px;background:#07090a;border-radius:15px;">
                <div style="color:#a8aaa7;font-size:13px;">Bestellnummer</div>
                <div style="margin-top:5px;font-weight:800;">${esc(order.order_number)}</div>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:18px;border-collapse:collapse;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #2b3033;">${order.quantity} × Das Vegane Quartett</td>
                  <td align="right" style="padding:14px 0;border-bottom:1px solid #2b3033;font-weight:800;">${euro(order.quantity * order.unit_price_cents)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #2b3033;color:#c8c7c1;">Versand</td>
                  <td align="right" style="padding:14px 0;border-bottom:1px solid #2b3033;font-weight:800;">${euro(order.shipping_cost_cents)}</td>
                </tr>
                <tr>
                  <td style="padding:18px 0;font-size:19px;font-weight:800;">Gesamt</td>
                  <td align="right" style="padding:18px 0;color:#7effcb;font-size:22px;font-weight:900;">${euro(order.total_cents)}</td>
                </tr>
              </table>

              <div style="padding:18px 20px;border:1px solid #315b49;border-radius:15px;background:#102019;">
                <div style="color:#a8aaa7;font-size:12px;font-weight:800;text-transform:uppercase;">Voraussichtlicher Versand</div>
                <div style="margin-top:6px;color:#7effcb;font-size:19px;font-weight:900;">Dezember 2026</div>
              </div>

              <div style="margin-top:18px;padding:18px 20px;border:1px solid #315b49;border-radius:15px;background:#102019;">
                <div style="color:#7effcb;font-size:13px;font-weight:800;text-transform:uppercase;">Digitaler Käuferzugang</div>
                <p style="margin:8px 0 0;color:#c8c7c1;line-height:1.6;">Der erste Deck-Zugang wurde für dein beim Kauf verwendetes Profil aktiviert. Weitere Zugänge kannst du als Geschenk weitergeben.</p>
                <a href="https://dasveganequartett.de/account/access" style="display:inline-block;margin-top:14px;color:#7effcb;font-weight:800;">Zugänge verwalten</a>
              </div>

              <h2 style="margin:26px 0 10px;font-size:19px;">Lieferadresse</h2>
              <p style="margin:0;color:#c8c7c1;line-height:1.65;">${address || "Keine Lieferadresse gespeichert."}</p>

              <p style="margin:26px 0 0;color:#c8c7c1;line-height:1.65;">Sobald deine Bestellung versendet wurde, erhältst du eine weitere Nachricht. Bei Fragen kannst du einfach auf diese E-Mail antworten.</p>

              <a href="https://dasveganequartett.de/cards" style="display:inline-block;margin-top:26px;padding:13px 18px;border-radius:999px;background:#7effcb;color:#07110d;font-weight:900;text-decoration:none;">Alle Argumente öffnen</a>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px;border-top:1px solid #2b3033;color:#8c8e8a;font-size:13px;line-height:1.6;">
              Das Vegane Quartett · kontakt@dasveganequartett.de<br>
              Für Tiere. Für gute Argumente. Für bessere Gespräche.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendOrderConfirmationEmail(
  order: ConfirmationOrder
): Promise<string> {
  const { data, error } = await resend.emails.send(
    {
      from: fromAddress,
      to: [order.customer_email],
      replyTo,
      subject: `Deine Vorbestellung ${order.order_number}`,
      html: htmlVersion(order),
      text: textVersion(order),
      tags: [
        { name: "email_type", value: "order_confirmation" },
        {
          name: "order_number",
          value: order.order_number.replaceAll(/[^a-zA-Z0-9_-]/g, "_"),
        },
      ],
    },
    {
      idempotencyKey: `order-confirmation/${order.id}`,
    }
  );

  if (error) {
    throw new Error(`Resend-Fehler: ${error.message}`);
  }

  if (!data?.id) {
    throw new Error("Resend hat keine E-Mail-ID zurückgegeben.");
  }

  return data.id;
}
