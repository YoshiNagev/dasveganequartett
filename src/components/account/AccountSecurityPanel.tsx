import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type MessageType = "success" | "error" | null;

export default function AccountSecurityPanel() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [emailMessageType, setEmailMessageType] =
    useState<MessageType>(null);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageType, setPasswordMessageType] =
    useState<MessageType>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setEmailMessage(
          "Deine Kontodaten konnten nicht geladen werden. Bitte melde dich erneut an."
        );
        setEmailMessageType("error");
        setLoading(false);
        return;
      }

      setCurrentEmail(user.email ?? "");
      setNewEmail(user.email ?? "");
      setLoading(false);
    }

    loadUser();
  }, []);

  async function handleEmailChange(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedEmail = newEmail.trim().toLowerCase();

    setEmailMessage("");
    setEmailMessageType(null);

    if (!normalizedEmail) {
      setEmailMessage("Bitte gib eine neue E-Mail-Adresse ein.");
      setEmailMessageType("error");
      return;
    }

    if (normalizedEmail === currentEmail.toLowerCase()) {
      setEmailMessage(
        "Diese E-Mail-Adresse ist bereits mit deinem Konto verbunden."
      );
      setEmailMessageType("error");
      return;
    }

    setSavingEmail(true);

    const { error } = await supabase.auth.updateUser(
      {
        email: normalizedEmail,
      },
      {
        emailRedirectTo: `${window.location.origin}/account/profile`,
      }
    );

    if (error) {
      setEmailMessage(error.message);
      setEmailMessageType("error");
    } else {
      setEmailMessage(
        "Die Änderung wurde angefordert. Bitte bestätige die neue Adresse über die zugesandte E-Mail."
      );
      setEmailMessageType("success");
    }

    setSavingEmail(false);
  }

  async function handlePasswordChange(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordMessageType(null);

    if (newPassword.length < 8) {
      setPasswordMessage(
        "Das neue Passwort muss mindestens 8 Zeichen lang sein."
      );
      setPasswordMessageType("error");
      return;
    }

    if (newPassword !== passwordConfirmation) {
      setPasswordMessage("Die beiden Passwörter stimmen nicht überein.");
      setPasswordMessageType("error");
      return;
    }

    setSavingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setPasswordMessage(error.message);
      setPasswordMessageType("error");
    } else {
      setNewPassword("");
      setPasswordConfirmation("");
      setPasswordMessage("Dein Passwort wurde erfolgreich geändert.");
      setPasswordMessageType("success");
    }

    setSavingPassword(false);
  }

  if (loading) {
    return (
      <section className="account-security-panel">
        <p className="form-message">Kontodaten werden geladen...</p>
      </section>
    );
  }

  return (
    <section
      className="account-security-panel"
      aria-labelledby="account-security-heading"
    >
      <div className="account-security-header">
        <div>
          <p className="eyebrow">Sicherheit</p>
          <h2 id="account-security-heading">E-Mail und Passwort</h2>
        </div>

        <p>Verwalte hier deine persönlichen Anmeldedaten.</p>
      </div>

      <div className="account-security-grid">
        <form
          className="account-security-card"
          onSubmit={handleEmailChange}
        >
          <div>
            <p className="eyebrow">E-Mail-Adresse</p>
            <h3>E-Mail ändern</h3>

            <p>
              Deine aktuelle Adresse lautet:
              <strong className="current-account-email">
                {currentEmail || "Unbekannt"}
              </strong>
            </p>
          </div>

          <label htmlFor="account-new-email">
            Neue E-Mail-Adresse
            <input
              id="account-new-email"
              type="email"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              autoComplete="email"
              required
              disabled={savingEmail}
            />
          </label>

          <button type="submit" disabled={savingEmail}>
            {savingEmail
              ? "Änderung wird angefordert..."
              : "E-Mail-Adresse ändern"}
          </button>

          {emailMessage && (
            <p
              className={`account-security-message ${
                emailMessageType === "error" ? "is-error" : "is-success"
              }`}
              role={emailMessageType === "error" ? "alert" : "status"}
            >
              {emailMessage}
            </p>
          )}
        </form>

        <form
          className="account-security-card"
          onSubmit={handlePasswordChange}
        >
          <div>
            <p className="eyebrow">Passwort</p>
            <h3>Passwort ändern</h3>

            <p>
              Verwende mindestens acht Zeichen und kein bereits mehrfach
              genutztes Passwort.
            </p>
          </div>

          <label htmlFor="account-new-password">
            Neues Passwort
            <input
              id="account-new-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={8}
              autoComplete="new-password"
              required
              disabled={savingPassword}
            />
          </label>

          <label htmlFor="account-confirm-password">
            Neues Passwort wiederholen
            <input
              id="account-confirm-password"
              type="password"
              value={passwordConfirmation}
              onChange={(event) =>
                setPasswordConfirmation(event.target.value)
              }
              minLength={8}
              autoComplete="new-password"
              required
              disabled={savingPassword}
            />
          </label>

          <button type="submit" disabled={savingPassword}>
            {savingPassword
              ? "Passwort wird geändert..."
              : "Passwort ändern"}
          </button>

          {passwordMessage && (
            <p
              className={`account-security-message ${
                passwordMessageType === "error" ? "is-error" : "is-success"
              }`}
              role={passwordMessageType === "error" ? "alert" : "status"}
            >
              {passwordMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}