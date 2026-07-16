import { supabase } from "../../lib/supabaseClient";

export default function LogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button className="logout-button" type="button" onClick={handleLogout}>
      Abmelden
    </button>
  );
}