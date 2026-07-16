import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/account/login`,
    data: {
      nickname,
    },
  },
});

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Registrierung erfolgreich. Prüfe deine E-Mails zur Bestätigung."
    );

    setNickname("");
    setEmail("");
    setPassword("");

    setLoading(false);
  }

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <label>
        Nickname
        <input
          type="text"
          placeholder="z. B. MoralMango"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </label>

      <label>
        E-Mail
        <input
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Passwort
        <input
          type="password"
          placeholder="Mindestens 8 Zeichen"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading
          ? "Account wird erstellt..."
          : "Account erstellen"}
      </button>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}
    </form>
  );
}