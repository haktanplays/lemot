import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { withinRateLimit } from "../_shared/ratelimit.ts";

const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_TIMEOUT_MS = 10000;
const MAX_ERRORS = 50;

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

const GENERIC = { weakSpots: [], summary: "Analysis unavailable." };

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

    if (!(await withinRateLimit(supabase, "ai-error"))) {
      return json(429, { error: "rate_limited" });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json(400, { error: "bad_request" });
    }
    const rawErrors = (body as { errors?: unknown })?.errors;
    // Bound the payload that gets stringified into the prompt.
    const errors = Array.isArray(rawErrors) ? rawErrors.slice(0, MAX_ERRORS) : [];

    const system = `You analyze a French A1 learner's errors and write tips DIRECTLY TO THE LEARNER. Always address them as "you" (2nd person). NEVER say "the user", "the student", "the learner", or "they" — always "you". Given a list of errors (word, section, given answer, correct answer), identify patterns and weak spots. Return JSON: { "weakSpots": [{ "word": string, "count": number, "pattern": string, "tip": string }], "summary": string }. Max 5 weak spots. Tips should be concise (1 sentence, addressed to "you"). Summary max 2 sentences, addressed to "you".`;
    const prompt = `Analyze these errors:\n${JSON.stringify(errors)}`;

    let res: Response;
    try {
      res = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system,
          messages: [{ role: "user", content: prompt }],
        }),
        signal: AbortSignal.timeout(ANTHROPIC_TIMEOUT_MS),
      });
    } catch (err) {
      // Timeout / network failure — log server-side, return generic.
      console.error("[ai-error] fetch:", err instanceof Error ? err.message : String(err));
      return json(200, GENERIC);
    }

    if (!res.ok) {
      const detail = await res.text();
      console.error("[ai-error] Anthropic error:", detail);
      return json(200, GENERIC);
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "{}";
    try {
      return json(200, JSON.parse(text));
    } catch {
      return json(200, { weakSpots: [], summary: text });
    }
  } catch (err) {
    console.error("[ai-error]", err instanceof Error ? err.message : String(err));
    return json(200, GENERIC);
  }
});
