import { avatars } from "../../data/avatars";

type Props = {
  value: string;
  onChange: (avatarUrl: string) => void;
};

export default function AvatarPicker({ value, onChange }: Props) {
  return (
    <div className="avatar-picker">
      <p className="avatar-picker-title">Avatar auswählen</p>

      <div className="avatar-grid">
        {avatars.map((avatar) => {
          const isActive = value === avatar.src;

          return (
            <button
              key={avatar.id}
              type="button"
              className={isActive ? "avatar-option active" : "avatar-option"}
              onClick={() => onChange(avatar.src)}
              aria-label={avatar.label}
            >
              <img src={avatar.src} alt={avatar.label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}