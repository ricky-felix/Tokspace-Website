import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
