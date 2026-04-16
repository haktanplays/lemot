import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { callWithFallback } from "../_shared/providers.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const FALLBACK_TEXT = "Could not evaluate. Try again.";

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
      userText,
      situation,
      targetWords,
      lang = "fr",
    }: {
      userText: string;
      situation: string;
      targetWords: string[];
      lang?: string;
    } = await req.json();

    const system = `You evaluate an A1 ${lang.toUpperCase()} learner's writing and give feedback DIRECTLY TO THE LEARNER. Always address them as "you" (2nd person). NEVER say "the user", "the student", "the learner", or "they" — always "you". Check: 1) Did you use the target words? 2) Basic grammar. 3) Does it fit the situation? Give 2-3 sentences of encouraging feedback in English. Mention specific words you used well. Example good: "You nailed 'je voudrais' — that's the polite form."`;
    const prompt = `Situation: ${situation}\nTarget words: ${targetWords.join(", ")}\nYour writing: ${userText}`;

    const result = await callWithFallback(
      [{ role: "user", content: prompt }],
      system,
      200,
      lang,
      "evaluate",
    );

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
