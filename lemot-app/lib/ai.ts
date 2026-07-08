import { supabase, supabaseReady } from "@/lib/supabase";
import { FEATURES } from "@/config/productStage";

interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Chat prompt spec sent to the server. The server OWNS the system prompt (audit
 * B4); the client only supplies a mode and short constrained labels. It never
 * sends the raw system instructions.
 */
export interface ChatPromptSpec {
  mode?: string;
  scenario?: string;
  topic?: string;
}

const AI_TIMEOUT_MS = 15000;

/**
 * Call a Supabase Edge Function with auth and a hard client timeout.
 * Falls back to a default message on failure.
 */
async function callEdgeFunction(
  fnName: string,
  body: Record<string, unknown>,
  fallback: string,
): Promise<string> {
  // Fail closed: the AI master switch must be on AND Supabase configured.
  // When AI is disabled, return the deterministic fallback and make no call.
  if (!FEATURES.aiEnabled || !supabaseReady) return fallback;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    // Wire the abort signal so the timeout actually cancels the request (B15).
    const { data, error } = await supabase.functions.invoke(fnName, {
      body,
      signal: controller.signal,
    });

    if (error) {
      console.warn(`[AI] ${fnName} error:`, error.message);
      return fallback;
    }
    return data?.text ?? fallback;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      return "Temps d'attente dépassé. Réessayez.";
    }
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Send a chat message via the ai-chat Edge Function. The server derives the
 * system prompt from `prompt`; the client never sends raw system text.
 */
export async function sendAIMessage(
  messages: AIMessage[],
  prompt: ChatPromptSpec,
  maxTokens: number = 300,
): Promise<string> {
  return callEdgeFunction(
    "ai-chat",
    { messages, prompt, maxTokens },
    "Désolé, réessayez.",
  );
}

/**
 * Evaluate "Say It Your Way" free writing via the ai-evaluate Edge Function.
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
 * Get AI response for a mini conversation via the ai-chat Edge Function. The
 * server builds the topic-scoped system prompt from the `mini` mode + topic.
 */
export async function sendMiniConv(
  messages: AIMessage[],
  topic: string,
): Promise<string> {
  return sendAIMessage(messages, { mode: "mini", topic }, 150);
}

/**
 * Analyze user errors via the ai-error Edge Function (Claude Haiku).
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
  const unavailable = { weakSpots: [], summary: "Analysis unavailable." };
  if (!FEATURES.aiEnabled || !supabaseReady) return unavailable;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
  try {
    const { data, error } = await supabase.functions.invoke("ai-error", {
      body: { errors },
      signal: controller.signal,
    });
    if (error) {
      console.warn("[AI] ai-error error:", error.message);
      return unavailable;
    }
    return data ?? unavailable;
  } catch {
    return unavailable;
  } finally {
    clearTimeout(timeout);
  }
}
