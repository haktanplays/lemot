import { supabase, supabaseReady } from "@/lib/supabase";

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Call a Supabase Edge Function with auth.
 * Falls back to a default message on failure.
 */
async function callEdgeFunction(
  fnName: string,
  body: Record<string, unknown>,
  fallback: string,
): Promise<string> {
  if (!supabaseReady) return fallback;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const { data, error } = await supabase.functions.invoke(fnName, {
      body,
    });
    clearTimeout(timeout);

    if (error) {
      console.warn(`[AI] ${fnName} error:`, error.message);
      return fallback;
    }
    return data?.text ?? fallback;
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      return "Temps d'attente dépassé. Réessayez.";
    }
    return fallback;
  }
}

/**
 * Send a chat message via ai-chat Edge Function (Gemini Flash).
 */
export async function sendAIMessage(
  messages: AIMessage[],
  system: string,
  maxTokens: number = 300,
): Promise<string> {
  return callEdgeFunction(
    "ai-chat",
    { messages, system, maxTokens },
    "Désolé, réessayez.",
  );
}

/**
 * Build system prompt for chat modes.
 */
export function buildChatSystem(
  mode: string,
  scenarioDesc?: string,
): string {
  const base = `You are a French conversation partner. User is an English speaker at A1-A2.
RULES: Always respond in French, short simple sentences. NEVER directly correct errors — say "je n'ai pas bien compris" and force self-correction. After 2nd attempt: indirect hint. After 3rd: provide correct form. 1-3 sentences max. No emojis. If user writes English: "En français, s'il vous plaît !"`;

  if (mode === "scenario" && scenarioDesc) {
    return `${base}\nROLE: ${scenarioDesc}. Stay in character.`;
  }
  return base;
}

/**
 * Evaluate "Say It Your Way" free writing via ai-evaluate Edge Function (Gemini Flash-Lite).
 */
export async function evaluateSayIt(
  userText: string,
  situation: string,
  targetWords: string[],
): Promise<string> {
  return callEdgeFunction(
    "ai-evaluate",
    { userText, situation, targetWords },
    "Could not evaluate. Try again.",
  );
}

/**
 * Get AI response for mini conversation via ai-chat Edge Function (Gemini Flash).
 */
export async function sendMiniConv(
  messages: AIMessage[],
  topic: string,
): Promise<string> {
  const system = `You are a French conversation partner for an A1 learner. Topic: ${topic}. Rules: Respond in simple French (1-2 sentences). If user makes errors, naturally rephrase correctly. Ask follow-up questions to keep conversation going. No English unless user is completely stuck.`;
  return sendAIMessage(messages, system, 150);
}

/**
 * Analyze user errors via ai-error Edge Function (Claude Haiku).
 */
export async function analyzeErrors(
  errors: Array<{
    word: string;
    section: string;
    given_answer: string;
    correct_answer: string;
  }>,
): Promise<{
  weakSpots: Array<{
    word: string;
    count: number;
    pattern: string;
    tip: string;
  }>;
  summary: string;
}> {
  if (!supabaseReady) return { weakSpots: [], summary: "Analysis unavailable." };

  try {
    const { data, error } = await supabase.functions.invoke("ai-error", {
      body: { errors },
    });
    if (error) {
      console.warn("[AI] ai-error error:", error.message);
      return { weakSpots: [], summary: "Analysis unavailable." };
    }
    return data ?? { weakSpots: [], summary: "Analysis unavailable." };
  } catch {
    return { weakSpots: [], summary: "Analysis unavailable." };
  }
}
