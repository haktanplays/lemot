import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callWithFallback, type ChatMessage } from "../_shared/providers.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const FALLBACK_TEXT = "Désolé, réessayez.";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const {
      messages,
      system,
      maxTokens = 150,
      lang = "fr",
    }: {
      messages: ChatMessage[];
      system: string;
      maxTokens?: number;
      lang?: string;
    } = await req.json();

    const result = await callWithFallback(messages, system, maxTokens, lang, "chat");

    return new Response(
      JSON.stringify({ text: result.text, provider: result.provider }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ text: FALLBACK_TEXT, error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
