
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("CRITICAL ERROR: Supabase Environment Variables are missing!");
    console.error("Make sure your .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
}

export const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

// Safely initialize client to prevent app-wide crash if variables are missing
export const supabase = (() => {
    try {
        if (isConfigured) {
            return createClient(supabaseUrl, supabaseAnonKey);
        } else {
            console.warn("Supabase Config Missing: Client set to null.");
        }
    } catch (e) {
        console.error("Supabase Init Failed:", e);
    }
    return null;
})();
