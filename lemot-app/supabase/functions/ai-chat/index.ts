import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callWithFallback } from "../_shared/providers.ts";
import { validateChatBody, FALLBACK_CHAT } from "../_shared/contract.ts";
import { withinRateLimit } from "../_shared/ratelimit.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json(401, { error: "unauthorized" });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return json(401, { error: "unauthorized" });

    // Server-side per-user rate limit (fails closed).
    if (!(await withinRateLimit(supabase, "ai-chat"))) {
      return json(429, { error: "rate_limited" });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json(400, { error: "bad_request" });
    }

    // Server owns the system prompt + clamps maxTokens / message caps. Any
    // client `system` field is ignored.
    const parsed = validateChatBody(body);
    if (!parsed.ok) return json(400, { error: "bad_request" });

    const result = await callWithFallback(
      parsed.value.messages,
      parsed.value.system,
      parsed.value.maxTokens,
      parsed.value.lang,
      "chat",
    );

    // Do not return provider name or any internal detail (audit B15).
    return json(200, { text: result.text });
  } catch (err) {
    // Log internals server-side only; client gets a generic calm fallback.
    console.error("[ai-chat]", err instanceof Error ? err.message : String(err));
    return json(200, { text: FALLBACK_CHAT });
  }
});
