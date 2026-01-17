import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = "https://ytyyebmntkhkujpqxmra.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0eXllYm1udGtoa3VqcHF4bXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4Nzk1MDIsImV4cCI6MjA3NjQ1NTUwMn0.gRQtGGh2zChrw96RUSY6o6P-Vier0VaawfN2MpX9uqE";
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
