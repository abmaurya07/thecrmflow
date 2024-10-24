import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REA_SUPABASE_URL;
const supabaseAnonKey = process.env.REA_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
