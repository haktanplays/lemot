import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callWithFallback } from "../_shared/providers.ts";
import {
  validateEvaluateBody,
  MAX_TOKENS_EVALUATE,
  FALLBACK_EVALUATE,
} from "../_shared/contract.ts";
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

    if (!(await withinRateLimit(supabase, "ai-evaluate"))) {
      return json(429, { error: "rate_limited" });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json(400, { error: "bad_request" });
    }

    const parsed = validateEvaluateBody(body);
    if (!parsed.ok) return json(400, { error: "bad_request" });
    const { userText, situation, targetWords, lang } = parsed.value;

    // System prompt is entirely server-owned.
    const system = `You evaluate an A1 ${lang.toUpperCase()} learner's writing and give feedback DIRECTLY TO THE LEARNER. Always address them as "you" (2nd person). NEVER say "the user", "the student", "the learner", or "they" — always "you". Check: 1) Did you use the target words? 2) Basic grammar. 3) Does it fit the situation? Give 2-3 sentences of encouraging feedback in English. Mention specific words you used well. Example good: "You nailed 'je voudrais' — that's the polite form."`;
    const prompt = `Situation: ${situation}\nTarget words: ${targetWords.join(", ")}\nYour writing: ${userText}`;

    const result = await callWithFallback(
      [{ role: "user", content: prompt }],
      system,
      MAX_TOKENS_EVALUATE,
      lang,
      "evaluate",
    );

    return json(200, { text: result.text });
  } catch (err) {
    console.error("[ai-evaluate]", err instanceof Error ? err.message : String(err));
    return json(200, { text: FALLBACK_EVALUATE });
  }
});
