import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  cardId: number;
};

export default function CreateThreadBox({ cardId }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      setIsLoggedIn(Boolean(data.session));
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="create-thread-box">
        <div>
          <p className="eyebrow">Diskussion starten</p>
          <h2>Lade Login-Status...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="create-thread-box">
      <div>
        <p className="eyebrow">Diskussion starten</p>
        <h2>Hast du einen besseren Einwand?</h2>
        <p>
          {isLoggedIn
            ? `Erstelle einen neuen Thread zu Karte #${String(cardId).padStart(2, "0")}.`
            : "Melde dich an, um eigene Threads zu erstellen."}
        </p>
      </div>

      {isLoggedIn ? (
        <a className="create-thread-link" href={`/forum/new/${cardId}`}>
          Thread erstellen
        </a>
      ) : (
        <a className="create-thread-link" href="/account/login">
          Einloggen
        </a>
      )}
    </div>
  );
}