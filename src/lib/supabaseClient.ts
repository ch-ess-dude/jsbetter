import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		// In the browser this will use localStorage by default. Keep explicit for clarity.
		storage: typeof window !== 'undefined' ? window.localStorage : undefined,
	},
});

export default supabase;
