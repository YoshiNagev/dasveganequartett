import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = {
  returnTo: string;
};

export default function AccessGateActions({ returnTo }: Props) {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(Boolean(data.session));
    });
  }, []);

  const encodedReturn = encodeURIComponent(returnTo);

  if (loggedIn === null) {
    return <p className="access-gate-status">Zugang wird geprüft …</p>;
  }

  if (loggedIn) {
    return (
      <div className="access-gate-actions">
        <a className="access-primary" href="/preorder">Deck vorbestellen</a>
        <a href="/account/access">Meine Zugänge prüfen</a>
      </div>
    );
  }

  return (
    <div className="access-gate-actions">
      <a
        className="access-primary"
        href={`/account/login?returnTo=${encodedReturn}`}
      >
        Einloggen
      </a>
      <a href={`/account/register?returnTo=${encodedReturn}`}>
        Profil erstellen
      </a>
    </div>
  );
}
