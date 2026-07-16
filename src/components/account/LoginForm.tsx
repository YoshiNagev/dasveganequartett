import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Login erfolgreich.");

    window.location.href = "/account/profile";
  }

  return (
    <form className="auth-form" onSubmit={handleLogin}>
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
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Einloggen..." : "Einloggen"}
      </button>

      {message && (
        <p className="form-message">
          {message}
        </p>
      )}
    </form>
  );
}