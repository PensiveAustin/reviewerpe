// Creates the shared Supabase client. If config is empty, SB stays null and the
// public site falls back to the content in js/data.js.
window.SB = (window.supabase && window.SUPABASE_URL && window.SUPABASE_KEY)
  ? window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_KEY)
  : null;
