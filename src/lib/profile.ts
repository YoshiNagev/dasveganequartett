import { supabase } from "./supabaseClient";

async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session?.user) {
    throw new Error("Du bist nicht eingeloggt.");
  }

  return data.session.user;
}

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  const { data: existingProfile, error: selectError } = await supabase
    .from("profiles")
    .select("id, nickname, bio, avatar_url, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  if (existingProfile) {
    return existingProfile;
  }

  const rawNickname =
    user.user_metadata?.nickname ||
    user.email?.split("@")[0] ||
    "User";

  const fallbackNickname = `${rawNickname}-${user.id.slice(0, 6)}`;

  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      nickname: fallbackNickname,
      bio: "",
      avatar_url: "/images/avatars/avatar-01.png",
      role: "user",
    })
    .select("id, nickname, bio, avatar_url, role, created_at")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newProfile;
}

export async function updateCurrentProfile({
  nickname,
  bio,
  avatarUrl,
}: {
  nickname: string;
  bio: string;
  avatarUrl: string;
}) {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      nickname,
      bio,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)
    .select("id, nickname, bio, avatar_url, role, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}