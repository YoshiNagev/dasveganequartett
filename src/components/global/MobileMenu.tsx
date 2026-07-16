import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
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

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label="Menü öffnen"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu-panel">
          <a href="/cards">Argumente</a>
          <a href="/">Home</a>
          <a href="/forum">Forum</a>
          <a href="/forum/threads">Alle Threads</a>
          <a href="/forum/suggest">Zusätzliche Argumente</a>

          {isLoggedIn ? (
            <>
              <a href="/account/notifications">Hinweise</a>
              <a href="/account/profile">Profil</a>
              <button type="button" onClick={logout}>
                Abmelden
              </button>
            </>
          ) : (
            <>
              <a href="/account/login">Einloggen</a>
              <a href="/account/register">Registrieren</a>
            </>
          )}

          <a className="mobile-menu-primary" href="/preorder">
            Vorbestellen
          </a>
        </div>
      )}
    </div>
  );
}