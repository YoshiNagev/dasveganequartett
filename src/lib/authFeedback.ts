/** Friendly UI feedback only; authentication remains with Supabase. */
export function authFeedback(error: { code?: string; status?: number }, action: "login" | "register") {
  if (error.status === 429) return "Zu viele Versuche in kurzer Zeit. Warte bitte einen Moment und versuche es erneut.";
  switch (error.code) {
    case "invalid_credentials": return "E-Mail oder Passwort stimmen nicht. Prüfe deine Eingabe oder setze dein Passwort zurück.";
    case "email_not_confirmed": return "Bitte bestätige zuerst deine E-Mail-Adresse über den Link in deiner Bestätigungsmail.";
    case "weak_password": return "Dieses Passwort ist zu leicht zu erraten. Wähle ein längeres, einzigartiges Passwort.";
    case "email_address_invalid": return "Bitte gib eine gültige E-Mail-Adresse ein.";
    case "user_already_exists": case "email_exists": return "Diese Registrierung konnte nicht abgeschlossen werden. Falls du schon ein Konto hast, logge dich ein oder setze dein Passwort zurück.";
    case "signup_disabled": return "Neue Registrierungen sind gerade nicht verfügbar. Bitte versuche es später noch einmal.";
    case "over_email_send_rate_limit": case "over_request_rate_limit": return "Zu viele Versuche in kurzer Zeit. Warte bitte einen Moment und versuche es erneut.";
    default: return action === "login"
      ? "Das Einloggen hat gerade nicht geklappt. Prüfe deine Verbindung und versuche es erneut."
      : "Dein Konto konnte gerade nicht erstellt werden. Prüfe deine Verbindung und versuche es erneut.";
  }
}
