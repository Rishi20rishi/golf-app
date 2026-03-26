import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://quyuabuahtpaqarfpfcx.supabase.co";
const supabaseKey = "sb_publishable_VIYXkR7zkH0TMrbiTTH4Lg_GfO7XxrM"; // paste your key

export const supabase = createClient(supabaseUrl, supabaseKey);