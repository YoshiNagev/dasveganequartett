import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { AstroCookieSetOptions, AstroCookies } from "astro";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

function requestCookies(request: Request) {
  const header = request.headers.get("cookie") ?? "";
  if (!header) return [];

  return header.split(";").flatMap((part) => {
    const separator = part.indexOf("=");
    if (separator < 1) return [];
    const name = part.slice(0, separator).trim();
    const rawValue = part.slice(separator + 1).trim();
    try {
      return [{ name, value: decodeURIComponent(rawValue) }];
    } catch {
      return [{ name, value: rawValue }];
    }
  });
}

export function createSupabaseServerClient(
  cookies: AstroCookies,
  request: Request
) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return requestCookies(request);
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookies.set(name, value, {
            ...(options as CookieOptions as AstroCookieSetOptions),
            path: options.path ?? "/",
          });
        }
      },
    },
  });
}
