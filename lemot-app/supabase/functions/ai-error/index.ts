import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

    const { errors } = await req.json();

    const system = `You analyze French A1 learner errors. Given a list of errors (word, section, given answer, correct answer), identify patterns and weak spots. Return JSON: { "weakSpots": [{ "word": string, "count": number, "pattern": string, "tip": string }], "summary": string }. Max 5 weak spots. Tips should be concise (1 sentence). Summary max 2 sentences.`;
    const prompt = `Analyze these errors:\n${JSON.stringify(errors)}`;

    const res = await fetch(ANTHROPIC_URL, {
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
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[ai-error] Anthropic error:", err);
      return new Response(
        JSON.stringify({ weakSpots: [], summary: "Analysis unavailable." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "{}";

    try {
      const parsed = JSON.parse(text);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      return new Response(
        JSON.stringify({ weakSpots: [], summary: text }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch (err) {
    console.error("[ai-error] Error:", err);
    return new Response(
      JSON.stringify({ weakSpots: [], summary: "Technical problem." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
