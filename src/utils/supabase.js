import { createClient } from "@supabase/supabase-js";

<<<<<<< HEAD
// Check if running in Node.js environment
const isNode = typeof process !== "undefined" && process.env;
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push("VITE_SUPABASE_URL");
  if (!supabaseAnonKey) missing.push("VITE_SUPABASE_ANON_KEY");
  throw new Error(`Missing environment variables: ${missing.join(", ")}`);
}
>>>>>>> b60475d04599e2a561478312c848612bb4d3bdc5

const supabaseUrl = isNode
	? process.env.VITE_SUPABASE_URL
	: import.meta.env.VITE_SUPABASE_URL;

const supabaseAnonKey = isNode
	? process.env.VITE_SUPABASE_ANON_KEY
	: import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseServiceKey = isNode
	? process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
	: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(
	supabaseUrl,
	supabaseAnonKey,
	supabaseServiceKey
);
