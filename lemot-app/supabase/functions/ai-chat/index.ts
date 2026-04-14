import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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
    // Verify auth
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

    const { messages, system, maxTokens = 150 } = await req.json();

    // Convert to Gemini format
    const geminiContents = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }),
    );

    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_KEY,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[ai-chat] Gemini error:", err);
      return new Response(
        JSON.stringify({ text: "Désolé, réessayez." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Désolé, réessayez.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ai-chat] Error:", err);
    return new Response(
      JSON.stringify({ text: "Problème technique." }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
