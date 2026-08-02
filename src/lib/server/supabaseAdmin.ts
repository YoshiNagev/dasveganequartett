import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseSecretKey =
  import.meta.env.SUPABASE_SECRET_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("PUBLIC_SUPABASE_URL fehlt.");
}

if (!supabaseSecretKey) {
  throw new Error(
    "SUPABASE_SECRET_KEY oder SUPABASE_SERVICE_ROLE_KEY fehlt."
  );
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);
