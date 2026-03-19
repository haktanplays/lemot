import Constants from "expo-constants";

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
// MVP: API key from app.json extra config. Move to Supabase Edge Function before release.
const API_KEY = Constants.expoConfig?.extra?.anthropicApiKey ?? "";

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Send a chat message to the AI API.
 * For MVP: direct Claude API calls.
 * For production: replace with Supabase Edge Function proxy.
 */
export async function sendAIMessage(
  messages: AIMessage[],
  system: string,
  maxTokens: number = 300
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system,
        messages,
      }),
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[AI] API error: ${res.status}`);
      return "Désolé, réessayez.";
    }

    const data = await res.json();
    return data.content?.[0]?.text || "Désolé, réessayez.";
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      return "Temps d'attente dépassé. Réessayez.";
    }
    return "Problème technique.";
  }
}

/**
 * Build system prompt for chat modes.
 */
export function buildChatSystem(
  mode: string,
  scenarioDesc?: string
): string {
  const base = `You are a French conversation partner. User is an English speaker at A1-A2.
RULES: Always respond in French, short simple sentences. NEVER directly correct errors — say "je n'ai pas bien compris" and force self-correction. After 2nd attempt: indirect hint. After 3rd: provide correct form. 1-3 sentences max. No emojis. If user writes English: "En français, s'il vous plaît !"`;

  if (mode === "scenario" && scenarioDesc) {
    return `${base}\nROLE: ${scenarioDesc}. Stay in character.`;
  }
  return base;
}

/**
 * Evaluate "Say It Your Way" free writing.
 */
export async function evaluateSayIt(
  userText: string,
  situation: string,
  targetWords: string[]
): Promise<string> {
  const system = `You evaluate A1 French learners' writing. Check: 1) Did they use target words? 2) Basic grammar. 3) Does it fit the situation? Give 2-3 sentences of encouraging feedback in English. Mention specific words they used well.`;
  const prompt = `Situation: ${situation}\nTarget words: ${targetWords.join(", ")}\nStudent wrote: ${userText}`;
  return sendAIMessage(
    [{ role: "user", content: prompt }],
    system,
    200
  );
}

/**
 * Get AI response for mini conversation.
 */
export async function sendMiniConv(
  messages: AIMessage[],
  topic: string
): Promise<string> {
  const system = `You are a French conversation partner for an A1 learner. Topic: ${topic}. Rules: Respond in simple French (1-2 sentences). If user makes errors, naturally rephrase correctly. Ask follow-up questions to keep conversation going. No English unless user is completely stuck.`;
  return sendAIMessage(messages, system, 150);
}
