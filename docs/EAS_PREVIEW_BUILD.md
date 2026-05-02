# EAS Preview Build — Lesson AI Setup Checklist

> Required reading for every Dev APK preview build that ships in-lesson AI
> (Say It Your Way + Mini Conversation). If any step here is skipped, the
> built APK loads but lesson AI silently returns the fallback message
> ("Désolé, réessayez.") and the feature appears broken to testers.

This checklist is split by who runs each step. Codebase changes already
landed in commits `config(ai): split lesson AI flags from chat tab` and
related; what remains is operator-side configuration.

---

## 1. Why this exists

Lesson AI (Say It Your Way evaluation, Mini Conversation chat) calls
Supabase Edge Functions from the client:

| Component | File | Edge Function |
|-----------|------|---------------|
| Say It Your Way evaluation | `components/sections/SayItYourWay.tsx` → `lib/ai.ts:evaluateSayIt` | `ai-evaluate` |
| Mini Conversation chat | `components/sections/MiniConversation.tsx` → `lib/ai.ts:sendMiniConv` → `sendAIMessage` | `ai-chat` |
| Error analysis (future) | `lib/ai.ts:analyzeErrors` | `ai-error` |
| Diagnostic | `lib/ai.ts` | `ai-diag` |

For these calls to succeed, three things must be true at runtime:

1. The APK must know the Supabase project URL and anon key (client envs).
2. The Edge Functions must be deployed to that Supabase project.
3. The Supabase project must have model-provider API keys set as
   function secrets (Gemini at minimum; Groq / Mistral / Anthropic
   optional fallbacks).

Steps 2 and 3 are operator work, not code. The codebase already does
the right thing — `lib/supabase.ts` reads `EXPO_PUBLIC_SUPABASE_URL` /
`EXPO_PUBLIC_SUPABASE_ANON_KEY`, and `lib/ai.ts` invokes the functions
with the user's JWT.

---

## 2. EAS Dashboard env — set once per project

Open the EAS Dashboard for the project, go to
`Project settings → Environment variables`, and add the following with
visibility `Plain text` (or `Sensitive` for the anon key — both work, the
key is meant to be public). Scope: `Preview` build profile (or `All` if
you also want them available to dev/production profiles).

| Variable | Value source | Notes |
|----------|--------------|-------|
| `EXPO_PUBLIC_SUPABASE_URL` | `lemot-app/.env` `EXPO_PUBLIC_SUPABASE_URL` | The `https://<project-ref>.supabase.co` URL. |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `lemot-app/.env` `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Anon JWT. Public by design — Supabase RLS gates real access. |

`eas.json` itself does not list these — they are pulled from the EAS
Dashboard at build time and inlined into the bundle. `.env` in the repo
working tree is `.gitignore`d and is **not** read by EAS, so the
Dashboard is the only place EAS sees them.

The existing `eas.json` `preview.env.EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`
stays as-is — that one is environment-specific to the build profile, not
project-wide.

To verify after a build:
```
eas build:list --platform android --profile preview --status finished --limit 1
# inspect the build's "Build details" page → "Environment variables"
# section and confirm both EXPO_PUBLIC_SUPABASE_* keys are present.
```

---

## 3. Supabase Edge Functions — deploy

These functions live in `lemot-app/supabase/functions/`. They must be
deployed to the linked Supabase project before any APK build will reach
them.

```bash
cd ~/Desktop/lemot/lemot-app

# One-time auth + link if not already linked
supabase login
supabase link --project-ref <project-ref-from-supabase-url>

# Deploy each function. Order does not matter; redeploys are idempotent.
supabase functions deploy ai-chat
supabase functions deploy ai-evaluate
supabase functions deploy ai-error
supabase functions deploy ai-diag
```

To verify:
```
supabase functions list
# expect: ai-chat, ai-evaluate, ai-error, ai-diag (all "ACTIVE")
```

---

## 4. Supabase Edge Function secrets — set once

Edge Functions read provider API keys from Supabase secrets at runtime.
These are server-side only and never reach the client. Set via Dashboard
(`Project settings → Edge Functions → Secrets`) or CLI:

```bash
supabase secrets set GEMINI_API_KEY=...     # required, primary
supabase secrets set GROQ_API_KEY=...        # optional, fallback
supabase secrets set MISTRAL_API_KEY=...     # optional, fallback
supabase secrets set ANTHROPIC_API_KEY=...   # required for ai-error (future use)
```

`supabase/functions/_shared/providers.ts` falls through provider chains
in order, so missing optional keys are fine — but with no GEMINI key the
functions return `"No AI providers configured"` 500 errors and the
client surfaces the silent fallback.

To verify:
```
supabase secrets list
# expect at minimum GEMINI_API_KEY present
```

---

## 5. Pre-flight before building the preview APK

- [ ] Step 2: both `EXPO_PUBLIC_SUPABASE_URL` and
      `EXPO_PUBLIC_SUPABASE_ANON_KEY` set in EAS Dashboard for the
      `preview` profile (or `All`).
- [ ] Step 3: `supabase functions list` shows all four functions ACTIVE.
- [ ] Step 4: `supabase secrets list` shows `GEMINI_API_KEY`.
- [ ] Supabase project status is **Active** (not paused) on the
      Supabase Dashboard home.
- [ ] Confirm `config/productStage.ts` `dev-apk` stage has
      `aiLesson: true` (committed) — gates the lesson AI sections in
      the bundle.

---

## 6. Post-build smoke test

On the installed APK, signed in as a test user:

1. Open Lesson 1.
2. Advance to Section 8 ("Say It Your Way"). Type a short French
   sentence, hit Submit. Expect AI feedback within ~3 seconds.
3. Advance to Section 9 ("Mini Conversation"). Send the first turn.
   Expect a back-and-forth reply.
4. If either returns the fallback `"Désolé, réessayez."` consistently,
   re-run the verification commands in Steps 2-4. The most common
   cause is a missed function deploy or a typo in `GEMINI_API_KEY`.

If lesson AI works but the Chat tab is missing, that is **expected** in
dev-apk — `aiChat: false` hides the standalone tab on purpose.

---

## 7. What changes when leaving dev-apk

Switching `EXPO_PUBLIC_PRODUCT_STAGE` to `public-beta` in eas.json (or
adding a new build profile) flips `aiChat: true` and surfaces the Chat
tab. The lesson AI flag stays on. No additional Supabase work is needed
unless the public-beta stage points to a different project — in which
case repeat Steps 2-4 against the new project ref.
