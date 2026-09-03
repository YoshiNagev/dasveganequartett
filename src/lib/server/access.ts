import type { AstroCookies } from "astro";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "../supabaseServer";
import { supabaseAdmin } from "./supabaseAdmin";

export type AccessState = {
  user: User | null;
  nickname: string | null;
  isAdmin: boolean;
  hasFullAccess: boolean;
};

export class AccessAuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AccessAuthError";
    this.status = status;
  }
}

export async function getAccessState(
  cookies: AstroCookies,
  request: Request
): Promise<AccessState> {
  const supabase = createSupabaseServerClient(cookies, request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      nickname: null,
      isAdmin: false,
      hasFullAccess: false,
    };
  }

  const [{ data: profile }, { data: license }] = await Promise.all([
    supabase
      .from("profiles")
      .select("nickname, role")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("access_licenses")
      .select("id")
      .eq("claimed_by", user.id)
      .eq("status", "claimed")
      .limit(1)
      .maybeSingle(),
  ]);

  const isAdmin = profile?.role === "admin";

  return {
    user,
    nickname: profile?.nickname ?? null,
    isAdmin,
    hasFullAccess: isAdmin || Boolean(license),
  };
}

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice("Bearer ".length).trim() || null;
}

export async function requireApiUser(request: Request): Promise<User> {
  const token = bearerToken(request);
  if (!token) {
    throw new AccessAuthError("Bitte melde dich zuerst an.", 401);
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    throw new AccessAuthError(
      "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.",
      401
    );
  }

  return user;
}

export async function userHasFullAccess(userId: string): Promise<boolean> {
  const [{ data: profile }, { data: license, error }] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle(),
    supabaseAdmin
      .from("access_licenses")
      .select("id")
      .eq("claimed_by", userId)
      .eq("status", "claimed")
      .limit(1)
      .maybeSingle(),
  ]);

  if (error) {
    throw new AccessAuthError(
      "Der digitale Zugang konnte nicht geprüft werden.",
      500
    );
  }

  return profile?.role === "admin" || Boolean(license);
}

export async function requireFullAccess(request: Request): Promise<User> {
  const user = await requireApiUser(request);
  if (!(await userHasFullAccess(user.id))) {
    throw new AccessAuthError(
      "Für diesen Bereich benötigst du einen aktivierten Käuferzugang.",
      403
    );
  }
  return user;
}
