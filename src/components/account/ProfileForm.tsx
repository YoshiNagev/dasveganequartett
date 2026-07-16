import { useEffect, useState } from "react";
import { getCurrentProfile, updateCurrentProfile } from "../../lib/profile";
import AvatarPicker from "./AvatarPicker";

type Profile = {
  id: string;
  nickname: string;
  bio: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
};

export default function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/images/avatars/avatar-01.png");
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentProfile();

        setProfile(data);
        setNickname(data.nickname ?? "");
        setBio(data.bio ?? "");
        setAvatarUrl(data.avatar_url ?? "/images/avatars/avatar-01.png");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Profil konnte nicht geladen werden."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const updatedProfile = await updateCurrentProfile({
        nickname,
        bio,
        avatarUrl,
      });

      setProfile(updatedProfile);
      setAvatarPickerOpen(false);
      setMessage("Profil gespeichert.");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Profil konnte nicht gespeichert werden.";

      if (errorMessage.includes("profiles_nickname_key")) {
        setMessage("Dieser Nickname ist bereits vergeben.");
      } else {
        setMessage(errorMessage);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="profile-form">
        <p className="form-message">Profil wird geladen...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-form">
        <p className="form-message">{message}</p>
      </div>
    );
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="avatar-profile-preview compact">
        <div className="profile-avatar preview">
          <img src={avatarUrl} alt="Gewählter Avatar" />
        </div>

        <div>
          <p className="eyebrow">Avatar</p>
          <h2>Dein öffentlicher Auftritt</h2>
          <p>Dieser Avatar wird neben deinen Threads und Kommentaren angezeigt.</p>

          <button
            type="button"
            className="avatar-edit-button"
            onClick={() => setAvatarPickerOpen((value) => !value)}
          >
            {avatarPickerOpen ? "Auswahl schließen" : "Avatar ändern"}
          </button>
        </div>
      </div>

      {avatarPickerOpen && (
        <AvatarPicker value={avatarUrl} onChange={setAvatarUrl} />
      )}

      <label>
        Nickname
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          minLength={3}
          maxLength={32}
          required
        />
      </label>

      <label>
        Bio
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          rows={5}
          maxLength={400}
          placeholder="Schreibe kurz, wer du bist oder was dich interessiert..."
        />
      </label>

      <button type="submit" disabled={saving}>
        {saving ? "Speichert..." : "Profil speichern"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}