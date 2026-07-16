import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthNav() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn) {
    return (
      <div className="auth-nav-group">
        <a href="/account/profile" className="header-auth-link">
          Profil
        </a>

        <button
          type="button"
          className="header-auth-link logout"
          onClick={handleLogout}
        >
          Abmelden
        </button>
      </div>
    );
  }

  return (
    <div className="auth-nav-group">
      <a href="/account/login" className="header-auth-link">
        Einloggen
      </a>

      <a href="/account/register" className="header-auth-link">
        Registrieren
      </a>
    </div>
  );
}