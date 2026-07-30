import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  variant?: "landing" | "profile";
};

export default function AuthCta({ variant = "landing" }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      setIsLoggedIn(Boolean(session));

      if (session?.user && variant === "profile") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", session.user.id)
          .maybeSingle();

        setNickname(profile?.nickname ?? "");
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoggedIn(Boolean(session));

      if (session?.user && variant === "profile") {
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", session.user.id)
          .maybeSingle();

        setNickname(profile?.nickname ?? "");
      } else {
        setNickname("");
      }
    });

    return () => subscription.unsubscribe();
  }, [variant]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (isLoggedIn === null) {
    return null;
  }

  if (isLoggedIn) {
    const publicProfileHref =
      variant === "profile" && nickname
        ? `/user/${encodeURIComponent(nickname)}`
        : "/account/profile";

    return (
      <section className="auth-cta-card">
        <p className="eyebrow">Account</p>

        <h2>
          {variant === "profile"
            ? "Du bist angemeldet"
            : "Willkommen zurück"}
        </h2>

        <p>
          {variant === "profile"
            ? "Öffne dein öffentliches Profil oder melde dich ab."
            : "Du kannst jetzt Threads erstellen, kommentieren und Hinweise erhalten."}
        </p>

        <div className="auth-cta-actions">
          <a href={publicProfileHref}>
            {variant === "profile"
              ? "Öffentliches Profil öffnen"
              : "Profil öffnen"}
          </a>

          <button type="button" onClick={logout}>
            Abmelden
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-cta-card">
      <p className="eyebrow">Account</p>

      <h2>
        {variant === "profile"
          ? "Du bist nicht eingeloggt"
          : "Diskutiere mit"}
      </h2>

      <p>
        Melde dich an, um Threads zu erstellen, Antworten zu schreiben und dein
        Profil zu verwalten.
      </p>

      <div className="auth-cta-actions">
        <a href="/account/login">Einloggen</a>
        <a href="/account/register">Registrieren</a>
      </div>
    </section>
  );
}