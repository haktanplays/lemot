import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

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

    const { userText, situation, targetWords } = await req.json();

    const system = `You evaluate A1 French learners' writing. Check: 1) Did they use target words? 2) Basic grammar. 3) Does it fit the situation? Give 2-3 sentences of encouraging feedback in English. Mention specific words they used well.`;
    const prompt = `Situation: ${situation}\nTarget words: ${targetWords.join(", ")}\nStudent wrote: ${userText}`;

    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.5,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[ai-evaluate] Gemini error:", err);
      return new Response(
        JSON.stringify({ text: "Could not evaluate. Try again." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Could not evaluate. Try again.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ai-evaluate] Error:", err);
    return new Response(
      JSON.stringify({ text: "Technical problem." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
