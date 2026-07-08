/**
 * AI Edge request contract (PR-C hardening, audit B4/B15).
 *
 * Pure and runtime-agnostic — NO Deno globals, NO network, NO imports — so it is
 * shared by the Deno Edge Functions AND exercised by the Node test harness.
 *
 * It owns: server-side request validation, `maxTokens` clamping, the SERVER-owned
 * chat system prompt (clients may only fill constrained labels), per-user rate
 * limits, and generic client-facing fallbacks (no provider/internal leakage).
 */

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ---- Request caps (conservative; easy to change) ----
// The app's chat sends full history up to MSG_LIMIT (15) user turns (~30
// messages). MAX_MESSAGES sits above that so legitimate conversations are not
// rejected, while still blocking gross abuse; the per-message and total caps
// bound overall payload size / token cost.
export const MAX_MESSAGES = 40;
export const MAX_MESSAGE_CHARS = 2000;
export const MAX_TOTAL_CHARS = 12000;
export const MAX_LABEL_CHARS = 240; // scenario / topic labels

// `maxTokens` clamp caps.
export const MAX_TOKENS_CHAT = 300;
export const MAX_TOKENS_EVALUATE = 200;

// Per-user daily rate limits (enforced server-side via the bump_ai_usage RPC).
export const RATE_LIMITS: Record<string, number> = {
  "ai-chat": 20,
  "ai-evaluate": 40,
  "ai-error": 10,
};

// Generic, non-leaking client-facing fallbacks.
export const FALLBACK_CHAT = "Désolé, réessayez.";
export const FALLBACK_EVALUATE = "Could not evaluate. Try again.";

/** Clamp an untrusted `maxTokens` to [1, cap]; non-numbers fall back to `cap`. */
export function clampMaxTokens(value: unknown, cap: number): number {
  const n =
    typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : cap;
  if (n < 1) return 1;
  if (n > cap) return cap;
  return n;
}

// ---- Server-owned chat system prompt (B4) ----
export type ChatPromptSpec = {
  mode?: string;
  scenario?: string;
  topic?: string;
};

const CHAT_BASE = `You are a French conversation partner. User is an English speaker at A1-A2.
RULES: Always respond in French, short simple sentences. NEVER directly correct errors — say "je n'ai pas bien compris" and force self-correction. After 2nd attempt: indirect hint. After 3rd: provide correct form. 1-3 sentences max. No emojis. If user writes English: "En français, s'il vous plaît !"`;

function miniBase(topic: string): string {
  return `You are a French conversation partner for an A1 learner. Topic: ${topic}. Rules: Respond in simple French (1-2 sentences). If user makes errors, naturally rephrase correctly. Ask follow-up questions to keep conversation going. No English unless user is completely stuck.`;
}

function clampLabel(s: unknown): string {
  return typeof s === "string" ? s.slice(0, MAX_LABEL_CHARS) : "";
}

/**
 * Build the chat system prompt SERVER-SIDE from an allowlisted mode. The client
 * may only supply short, length-capped labels (scenario / topic) that fill a
 * slot in a fixed template — it can never send the raw system instructions (B4).
 */
export function buildChatSystem(spec: ChatPromptSpec | undefined): string {
  const mode = typeof spec?.mode === "string" ? spec.mode : "free";
  if (mode === "mini") {
    return miniBase(clampLabel(spec?.topic));
  }
  if (mode === "scenario") {
    const scenario = clampLabel(spec?.scenario);
    if (scenario) return `${CHAT_BASE}\nROLE: ${scenario}. Stay in character.`;
  }
  return CHAT_BASE;
}

// ---- Validation ----
export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export type ChatRequest = {
  messages: ChatMessage[];
  system: string;
  maxTokens: number;
  lang: string;
};

/**
 * Validate an ai-chat body. The `system` field is IGNORED (server-owned); the
 * system prompt is derived from `prompt`. Rejects malformed/oversized payloads.
 */
export function validateChatBody(body: unknown): ValidationResult<ChatRequest> {
  if (!isObject(body)) return { ok: false, error: "body_not_object" };
  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages)) return { ok: false, error: "messages_not_array" };
  if (rawMessages.length < 1) return { ok: false, error: "messages_empty" };
  if (rawMessages.length > MAX_MESSAGES) return { ok: false, error: "too_many_messages" };

  let total = 0;
  const messages: ChatMessage[] = [];
  for (const m of rawMessages) {
    if (!isObject(m)) return { ok: false, error: "message_not_object" };
    const role = m.role;
    if (role !== "user" && role !== "assistant") return { ok: false, error: "bad_role" };
    const content = m.content;
    if (typeof content !== "string") return { ok: false, error: "content_not_string" };
    if (content.length < 1) return { ok: false, error: "content_empty" };
    if (content.length > MAX_MESSAGE_CHARS) return { ok: false, error: "message_too_long" };
    total += content.length;
    if (total > MAX_TOTAL_CHARS) return { ok: false, error: "payload_too_large" };
    messages.push({ role, content });
  }

  const lang = typeof body.lang === "string" ? body.lang : "fr";
  const maxTokens = clampMaxTokens(body.maxTokens, MAX_TOKENS_CHAT);
  const system = buildChatSystem(body.prompt as ChatPromptSpec | undefined);
  return { ok: true, value: { messages, system, maxTokens, lang } };
}

export type EvaluateRequest = {
  userText: string;
  situation: string;
  targetWords: string[];
  lang: string;
};

/** Validate an ai-evaluate body (input length caps; server owns maxTokens). */
export function validateEvaluateBody(
  body: unknown,
): ValidationResult<EvaluateRequest> {
  if (!isObject(body)) return { ok: false, error: "body_not_object" };
  const userText = body.userText;
  if (typeof userText !== "string" || userText.length < 1) {
    return { ok: false, error: "bad_userText" };
  }
  if (userText.length > MAX_MESSAGE_CHARS) return { ok: false, error: "userText_too_long" };
  const situation =
    typeof body.situation === "string" ? body.situation.slice(0, 500) : "";
  const rawTargets = Array.isArray(body.targetWords) ? body.targetWords : [];
  const targetWords = rawTargets
    .filter((w): w is string => typeof w === "string")
    .slice(0, 20)
    .map((w) => w.slice(0, 50));
  const lang = typeof body.lang === "string" ? body.lang : "fr";
  return { ok: true, value: { userText, situation, targetWords, lang } };
}

// ---- Rate-limit decision (pure; the counter I/O lives in the RPC) ----
/** After incrementing to `countAfter`, is the request within `limit`? */
export function quotaAllows(countAfter: number, limit: number): boolean {
  return countAfter <= limit;
}
