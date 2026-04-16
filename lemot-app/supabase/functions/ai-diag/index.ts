import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const result: Record<string, unknown> = {};
  const authHeader = req.headers.get("Authorization") ?? "";
  result.hasAuthHeader = authHeader.length > 0;
  result.authHeaderLength = authHeader.length;
  result.authHeaderStart = authHeader.slice(0, 15);

  const token = authHeader.replace(/^Bearer\s+/i, "");
  result.tokenLength = token.length;

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data, error } = await supabase.auth.getUser();
    result.hasUser = !!data.user;
    result.userIdPresent = !!data.user?.id;
    result.userEmailLocal = data.user?.email ? data.user.email.split("@")[0].slice(0, 3) + "***" : null;
    result.authErrorMessage = error?.message ?? null;
  } catch (e) {
    result.authThrow = e instanceof Error ? e.message : String(e);
  }

  return new Response(JSON.stringify(result, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
