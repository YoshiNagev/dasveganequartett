import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "PUBLIC_SUPABASE_URL und PUBLIC_SUPABASE_ANON_KEY müssen gesetzt sein."
  );
}

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    cookieOptions: {
      path: "/",
      sameSite: "lax",
      secure: import.meta.env.PROD,
    },
  }
);
