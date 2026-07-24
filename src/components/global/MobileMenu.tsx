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

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <nav
          id="mobile-menu-panel"
          className="mobile-menu-panel"
          aria-label="Mobile Hauptnavigation"
        >
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/rules" onClick={closeMenu}>Spielanleitung</a>
          <a href="/cards" onClick={closeMenu}>Argumente</a>
          <a href="/forum" onClick={closeMenu}>Forum</a>
          <a href="/forum/threads" onClick={closeMenu}>Alle Threads</a>
          <a href="/forum/suggest" onClick={closeMenu}>
            Zusätzliche Argumente
          </a>

          {isLoggedIn ? (
            <>
              <a href="/account/notifications" onClick={closeMenu}>
                Hinweise
              </a>
              <a href="/account/profile" onClick={closeMenu}>Profil</a>
              <button type="button" onClick={logout}>
                Abmelden
              </button>
            </>
          ) : (
            <>
              <a href="/account/login" onClick={closeMenu}>Einloggen</a>
              <a href="/account/register" onClick={closeMenu}>
                Registrieren
              </a>
            </>
          )}

          <a
            className="mobile-menu-primary"
            href="/preorder"
            onClick={closeMenu}
          >
            Vorbestellen
          </a>
        </nav>
      )}
    </div>
  );
}