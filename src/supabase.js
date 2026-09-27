import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://itdujhqnshdydkodhtae.supabase.co";
const supabaseKey = "sb_publishable_Upjrn3nL8T2v4LAFBFB0Yg_waMqiaxn";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);