import { createClient } from "@supabase/supabase-js";

<<<<<<< HEAD
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
=======
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
>>>>>>> 49021b2678479017d4633f00e455f629d1513f6e

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const handleSupabaseError = (error) => {
	console.error("Supabase error:", error);
	if (error.message === "JWT expired") {
		// Handle session expiration
		window.location.reload();
	}
	return error.message;
};
