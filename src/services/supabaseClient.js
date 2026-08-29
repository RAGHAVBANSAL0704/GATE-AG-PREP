import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://hhususrbbpyutrdcbyxe.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhodXN1c3JiYnB5dXRyZGNieXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNjkzNjQsImV4cCI6MjEwMjk0NTM2NH0.PepsaaaxRYkNRAw5uj5zeEIG7aHVeVD10a_xv6-ZLkI';

const isTestEnv = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || process.env.NODE_TEST_CONTEXT);
const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || (isTestEnv ? null : DEFAULT_SUPABASE_URL);
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || (isTestEnv ? null : DEFAULT_SUPABASE_ANON_KEY);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
