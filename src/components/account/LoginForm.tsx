import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  returnTo?: string;
};

export default function LoginForm({ returnTo = "/account/profile" }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    window.location.href = returnTo;
  }

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <label htmlFor="login-email">
        E-Mail
        <input
          id="login-email"
          type="email"
          placeholder="deine@email.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label htmlFor="login-password">
        Passwort
        <div className="password-field">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            className="password-toggle"
            type="button"
            aria-controls="login-password"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Verbergen" : "Anzeigen"}
          </button>
        </div>
      </label>

      <a className="forgot-password-link" href="/account/forgot-password">
        Passwort vergessen?
      </a>

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
