# Digitalen Käuferzugang einrichten

Die Website enthält jetzt ein gemeinsames Zugangssystem für Onlinekäufe,
Geschenke und Direktverkäufe. Pro verkauftem Deck entsteht genau eine digitale
Zugangsberechtigung.

## 1. Supabase-Migration ausführen

Öffne im Supabase-Dashboard den SQL Editor und führe den vollständigen Inhalt
dieser Datei aus:

`supabase/migrations/011_digital_access.sql`

Die Migration erstellt die Tabelle `access_licenses`, die sicheren
Zugriffsfunktionen und die neuen RLS-Regeln für Kartenforen. Sie ist so gebaut,
dass eine wiederholte Stripe-Benachrichtigung keine doppelten Zugänge erzeugt.

## 2. Umgebungsvariablen in Vercel prüfen

Die Erweiterung benötigt keine neuen Geheimnisse. Diese vorhandenen Variablen
müssen für Production gesetzt sein:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` oder `SUPABASE_SECRET_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PUBLIC_SITE_URL=https://dasveganequartett.de`
- `RESEND_API_KEY`
- `ORDER_EMAIL_FROM`
- `ORDER_EMAIL_REPLY_TO`

Echte Werte gehören ausschließlich in Vercel beziehungsweise in eine lokale
`.env`-Datei und niemals in Git.

## 3. Stripe-Webhook ergänzen

Der Endpoint bleibt:

`https://dasveganequartett.de/api/stripe/webhook`

Aktiviere für diesen Endpoint diese Ereignisse:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`
- `charge.refunded`

Nach einer erfolgreichen Zahlung speichert der Webhook die Profil-ID in der
Bestellung und ruft `provision_order_access_licenses` auf. Der erste Zugang wird
für das kaufende Profil aktiviert; weitere Zugänge bleiben zum Verschenken frei.
Bei einer vollständigen Erstattung werden die zugehörigen Zugänge gesperrt.

## 4. Öffentliche Beispielkarten

Aktuell öffentlich sind die Karten:

`1, 16, 24, 29, 37, 48`

Die Liste steht in `src/lib/access.ts` und zusätzlich in der SQL-Funktion
`is_public_dvq_card` innerhalb der Migration. Bei einer späteren Änderung müssen
beide Stellen dieselben Nummern enthalten.

## 5. Käufer- und Geschenkablauf testen

1. Mit einem normalen Profil einloggen.
2. `/preorder` öffnen und prüfen, ob Nickname und E-Mail angezeigt werden.
3. Stripe-Checkout im Testmodus abschließen.
4. In Stripe prüfen, ob der Webhook mit HTTP 200 beantwortet wurde.
5. `/account/access` öffnen.
6. Prüfen, ob der erste Zugang aktiv ist.
7. Bei mehreren Decks einen freien Zugang als Geschenklink erzeugen.
8. Den Link in einem anderen Browser beziehungsweise Profil einlösen.
9. Eine geschützte Karte wie `/cards/2` mit und ohne Zugang öffnen.

## 6. Zugangskarten für Direktverkäufe

Das eingeloggte Administratorkonto öffnet:

`/admin/access`

Dort können bis zu 50 einmalige Markt-Codes gleichzeitig erzeugt werden. Die
Seite erstellt zu jedem Code einen QR-Code und eine druckbare Zugangskarte.
Die vollständigen Codes werden nur unmittelbar nach ihrer Erzeugung angezeigt;
deshalb sofort drucken oder als CSV speichern.

Kundinnen und Kunden lösen den Code unter `/freischalten` ein. Nach erfolgreicher
Einlösung wird der Code unbrauchbar und der Zugang bleibt am jeweiligen Profil.

## 7. Wichtige Seiten

- `/cards` – sechs Vorschaukarten oder alle 54 bei Käuferzugang
- `/forum` – öffentliche Beispielbereiche oder vollständiges Käuferforum
- `/account/access` – eigene Zugänge aktivieren und verschenken
- `/freischalten` – Markt- und Geschenkcodes einlösen
- `/admin/access` – Markt-Zugangskarten erstellen

## 8. Veröffentlichung

Nach der Migration und den Stripe-Einstellungen die Änderungen wie gewohnt zu
GitHub pushen. Vercel baut die Astro-Website anschließend mit dem vorhandenen
Server-Adapter neu.
