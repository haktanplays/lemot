export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ProviderResult {
  text: string;
  provider: string;
}

export interface Provider {
  name: string;
  enabled: boolean;
  call(
    messages: ChatMessage[],
    system: string,
    maxTokens: number,
  ): Promise<string>;
}

const GEMINI_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const GROQ_KEY = Deno.env.get("GROQ_API_KEY") ?? "";
const MISTRAL_KEY = Deno.env.get("MISTRAL_API_KEY") ?? "";

async function postJson(
  url: string,
  headers: Record<string, string>,
  body: unknown,
  providerName: string,
): Promise<Response> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new ProviderError(providerName, res.status, text);
  }
  return res;
}

const gemini: Provider = {
  name: "gemini",
  enabled: !!GEMINI_KEY,
  async call(messages, system, maxTokens) {
    const res = await postJson(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      { "x-goog-api-key": GEMINI_KEY },
      {
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 },
        },
      },
      "gemini",
    );
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new ProviderError("gemini", 500, "empty response");
    return text;
  },
};

const geminiPro: Provider = {
  name: "gemini-pro",
  enabled: !!GEMINI_KEY,
  async call(messages, system, maxTokens) {
    const res = await postJson(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent",
      { "x-goog-api-key": GEMINI_KEY },
      {
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
        },
      },
      "gemini-pro",
    );
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new ProviderError("gemini-pro", 500, "empty response");
    return text;
  },
};

const groq: Provider = {
  name: "groq",
  enabled: !!GROQ_KEY,
  async call(messages, system, maxTokens) {
    const res = await postJson(
      "https://api.groq.com/openai/v1/chat/completions",
      { Authorization: `Bearer ${GROQ_KEY}` },
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: system },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      "groq",
    );
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new ProviderError("groq", 500, "empty response");
    return text;
  },
};

const mistral: Provider = {
  name: "mistral",
  enabled: !!MISTRAL_KEY,
  async call(messages, system, maxTokens) {
    const res = await postJson(
      "https://api.mistral.ai/v1/chat/completions",
      { Authorization: `Bearer ${MISTRAL_KEY}` },
      {
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: system },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      "mistral",
    );
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new ProviderError("mistral", 500, "empty response");
    return text;
  },
};

export class ProviderError extends Error {
  constructor(
    public provider: string,
    public status: number,
    public body: string,
  ) {
    super(`[${provider}] ${status}: ${body.slice(0, 200)}`);
  }
  isRetryable(): boolean {
    return this.status === 429 || this.status >= 500;
  }
}

const REGISTRY: Record<string, Provider> = {
  gemini,
  "gemini-pro": geminiPro,
  groq,
  mistral,
};

// Per-language provider preference. Add new languages here as LeMot scales.
const LANG_ORDERS: Record<string, string[]> = {
  fr: ["mistral", "gemini", "groq"],
  es: ["mistral", "gemini", "groq"],
  it: ["mistral", "gemini", "groq"],
  pt: ["mistral", "gemini", "groq"],
  de: ["gemini", "mistral", "groq"],
};

const DEFAULT_ORDER = ["gemini", "mistral", "groq"];

export type ChainPurpose = "chat" | "evaluate";

export function getProviderChain(
  lang: string = "fr",
  purpose: ChainPurpose = "chat",
): Provider[] {
  const envOverride = Deno.env.get("AI_PROVIDER_ORDER");
  let order: string[];
  if (envOverride) {
    order = envOverride.split(",").map((s) => s.trim());
  } else if (purpose === "evaluate") {
    order = ["mistral", "gemini-pro", "gemini"];
  } else {
    order = LANG_ORDERS[lang] ?? DEFAULT_ORDER;
  }
  return order
    .map((name) => REGISTRY[name])
    .filter((p): p is Provider => !!p && p.enabled);
}

export async function callWithFallback(
  messages: ChatMessage[],
  system: string,
  maxTokens: number,
  lang: string = "fr",
  purpose: ChainPurpose = "chat",
): Promise<ProviderResult> {
  const chain = getProviderChain(lang, purpose);
  if (chain.length === 0) {
    throw new Error("No AI providers configured");
  }
  const errors: string[] = [];
  for (const provider of chain) {
    try {
      const text = await provider.call(messages, system, maxTokens);
      return { text, provider: provider.name };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${provider.name}:${msg}`);
      if (err instanceof ProviderError && !err.isRetryable()) {
        continue;
      }
    }
  }
  throw new Error(`All providers failed: ${errors.join(" | ")}`);
}
