import type { User } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabaseAdmin";

export class AdminAuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminAuthError";
    this.status = status;
  }
}

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    throw new AdminAuthError("Du bist nicht eingeloggt.", 401);
  }
  const token = authorization.slice(7).trim();
  if (!token) throw new AdminAuthError("Die Sitzung ist ungültig.", 401);
  return token;
}

export async function requireAdmin(request: Request): Promise<User> {
  const token = getBearerToken(request);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    throw new AdminAuthError("Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.", 401);
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Admin role lookup failed:", profileError);
    throw new AdminAuthError("Die Berechtigung konnte nicht geprüft werden.", 500);
  }
  if (profile?.role !== "admin") {
    throw new AdminAuthError("Du hast keine Berechtigung für diesen Bereich.", 403);
  }
  return user;
}
