# LE MOT — French Learning App

@docs/MASTER_PIPELINE_v1.2.1.md

> **Cloud sessions must follow `docs/MASTER_PIPELINE_v1.2.1.md`. Local-only Obsidian/mempalace/GSD steps become Sync Queue items in `docs/CLOUD_SYNC_QUEUE.md`.**
>
> **Current Dev APK work should follow `docs/DEV_APK_MVP_CANON.md`. If older notes conflict with that document, the MVP canon takes priority.**
>
> **Pedagogical / syllabus planning should follow `docs/learning-engine-v1.md`** — the learning-object spec defining how lessons work and how content stays compatible with Practice Pool, Daily Review, Natural Reveal, Mon Lexique, and Word Graph. Canon/spec layer, not runtime code.
>
> **Merged product canon (2026-05-11)** lives at `~/Desktop/Le Mot .md/May/11.05.2026/LeMot_Product_Canon_Merged_2026-05-11.md` (operator-vault, not readable from cloud). Decision Log + locked decisions in `~/Desktop/ObsidianVault/01 Projeler/LeMot/LeMot - User Journey.md` (v6 pending, operator-vault). When this CLAUDE.md and the merged canon disagree, the canon wins; cloud sessions surface the gap and queue any sync action in `docs/CLOUD_SYNC_QUEUE.md`.

## What This Is
A French learning app for English speakers. Expo/React Native standalone app (TypeScript, NativeWind, Expo Router). Also available as a single-file React artifact (le-mot-v7.jsx).

## Product Promise
"LE-MOT teaches French through meaning, patterns, and real expression — not memorization."

## Current State (v7 + Sprint 5B + 5C + 6 + 7 + 8 + 8B + 8C + 9-syllabus)
- **24 lessons** (full A1 curriculum, 4 milestones):
  - **M1 Basic Communicator (L1-L5, FREE)**: L1 Survival Kit, L2 Être, L3 Yes/No/You, L4 Avoir, L5 Articles
  - **M2 Independent Speaker (L6-L14, FREE)**: L6 Aller, L7 Questions I, L8 Numbers/Time/Money, L9 Food & Ordering, L10 Faire, L11 Everyday Structures, L12 My People, L13 Questions II, L14 More Negation + Y/En
  - **PAYWALL ($12.99/mo)** — after L14, before L15 (locked decision 2026-04-23)
  - **M3 Confident Conversationalist (L15-L20, PAID)**: L15 Places & Prepositions, L16 Vouloir/Pouvoir/Devoir, L17 My Day, L18 Regular -er Verbs, L19 Past Tense I (avoir), L20 Past Tense II (être)
  - **M4 Natural Expression (L21-L24, PAID — A1 consolidation)**: L21 Dire/Voir/Savoir, L22 Opinions & Feelings, L23 Venir/Prendre, L24 Putting It All Together
- **11-section lesson flow** (input-first, reordered): Read & Listen → Patterns → Weave Fill → French Fill → Build → Write → Quiz → Combine+Weave → Say It Your Way → Mini Conversation → Review
  - **Sprint 11 reframe pending**: 11 sections → 9 per Merged Canon §11 (Meet It / Notice the Pieces / Why This Works / Try It / Weave It / Shape It / Use It / Stay with It / Lesson End). Combine merges into Shape It; Say It + Mini Conversation merge into Mini Mission (Use It); Review renamed to Stay with It.
- **Build before Write** (Sprint 8B): Easier task (arrange tiles) before harder task (write from memory) — progressive difficulty
- **Say It Your Way** (sec 8): Free-write response to situation prompts, AI evaluation via Claude API, target word tracking
- **Mini Conversation** (sec 9): 3-4 turn AI chat locked to lesson topic, negotiation of meaning, listen button per message
- **AI Chat**: 4 modes (Free, Lesson Focus, Error Correction, Scenarios) with negotiation of meaning
- **Error tracking**: Every wrong answer logged, weak spots detected (3+ errors = weak)
- **Daily Review**: Home screen card with 5-word daily goal, weak spot priority, modal quiz overlay (streak tracking removed per locked decision 2026-04-23; streak language banned canon-wide — UX.1)
- **Can-Do Milestones**: 4 milestone tiers (Basic Communicator L1-5, Independent Speaker L6-14 FREE, Confident Conversationalist L15-20 PAID, Natural Expression L21-24 PAID — A1 consolidation)
- **Paywall**: After **L14** (between M2 and M3, before L15 Places & Prepositions) — $12.99/mo subscription unlocks L15-L24 (locked decision 2026-04-23, Merged Canon §18). `FEATURES.paywall=false` in dev-apk → banner not reachable in tester APK.
- **Enhanced Progress Tab**: Mastered/Learning/Weak word categories, daily review status, milestone badges (streak display removed; replacement "days on the path" per UX.1, Sprint 11 V4-B implementation)
- **Content Enrichment** (Sprint 8):
  - 3 common expressions per lesson (voilà, du coup, on y va, etc.)
  - 2 grammar nuggets per lesson ("aha moment" insights)
  - Faux amis (false friends) per lesson
  - Sound-meaning patterns (é→s, -tion cognates)
  - Cultural context bites
  - Difficulty indicators (easy/medium/hard) on lesson cards
  - End-of-lesson summary card ("What you learned today")
- **Unlockable Enrichment** (Sprint 8B): Expressions, nuggets, faux amis, culture bites unlock based on section performance (gamification)
- **Contextual Expression Quizzes** (Sprint 8B): Expressions tested in natural situations (fill-in-the-blank in context, NOT "what does X mean?")
- **Practice Tab → Scenarios** (Sprint 8B): Replaced flashcards with scenario cards ("You walk into a bakery → what do you say?") — meaning-first, not memorization
- **Lesson Chunking** (Sprint 8C): 11 sections split into 3 parts (Learn/Practice/Produce, ~7-8 min each). Chunk selector screen. "Take a Break" between parts.
- **SRS Algorithm** (Sprint 8C): Leitner-style 5-box spaced repetition on Practice scenario cards. Due cards prioritized. Progress stats (New/Learning/Familiar/Known/Mastered).
- **Mastery Criteria** (Sprint 8C): Per-section pass thresholds (60-70%). Below threshold: "Try Again" option. Users can "Continue Anyway" but section not marked mastered.
- **Expo/React Native app** (Sprint 7): Full migration complete with TypeScript, NativeWind, Expo Router
- **Storage**: `expo-sqlite/kv-store` on native, `window.localStorage` on web (Expo app) / `window.storage` (artifact) — structure: `{p, err, dr: {date, count}}` (`xp` + `streak` fields removed per Sprint commit `a883b2a`; schema migration on deployed Supabase DB deferred to public beta). SRS: `lm7_srs`

## Key Differentiator: Weave
Users write sentences mixing English + French ("weaving" two languages). Known words in French, unknown in English. Cognate highlighting (merci ≈ mercy). No other app does this. Formerly called "Franglais" — renamed to "Weave" for trademark distinctiveness.

## Architecture Decisions

### Sprint Plan:
- **5A ✅** Foundation: input-first reorder, error tracking, example expansion
- **5B ✅** Learning Engine: daily review goal, can-do milestones, progress upgrade, basic SRS
- **5C ✅** Production + AI: Say It Your Way (free write + AI eval), Mini Conversation (in-lesson chat)
- **6 ✅** Content: initial A1 curriculum — 16 lessons (added L6-L11, L13-L16)
- **7 ✅** Standalone: Expo/React Native migration (TypeScript, NativeWind, Expo Router)
- **7.5 ✅** Polish & QA: 18 issues fixed across 23 files
- **8 ✅** Content Enrichment: Weave rename, expressions, grammar nuggets, faux amis, sound patterns, culture bites, difficulty indicators, summary cards
- **8B ✅** Meaning-First Overhaul: Build↔Write reorder, unlockable enrichment system, Practice→scenarios, contextual expression quizzes
- **8C ✅** Learning Engine v2: Lesson chunking (3 parts), SRS algorithm (Leitner 5-box), mastery criteria per section
- **9-syllabus ✅** Syllabus Restructure: 16→24 lessons, 4 milestones rebracketed to **5-9-6-4** (M1 L1-5 / M2 L6-14 FREE / M3 L15-20 PAID / M4 L21-24 PAID), paywall **after L14** (locked decision 2026-04-23, Merged Canon §18), MountainMap 24 nodes, practice scenarios remapped + new (L10/L13/L14/L16)
- **10** (IN PROGRESS) Backend & AI: Supabase (DB, Edge Functions, Auth), AI exercise generation, Error tracking Phase C
    - Done: Supabase client, Auth hook/provider/screen, DB schema deployed (3 tables + RLS), progress sync in AppProvider, Sign In button on home, AsyncStorage v2.2.0 downgrade
    - Blocker: Supabase email confirmation must be disabled in Dashboard before testing auth flow
    - Next: E2E auth test → Edge Functions → AI exercise gen

### Model Routing (for standalone):
| Task | Model | Why |
|---|---|---|
| Exercise generation | Gemini 2.5 Flash-Lite | Cheapest, task is simple |
| AI Chat | Gemini 2.5 Flash | Better dialogue quality |
| Error analysis | Claude Haiku | Better reasoning |

### Research Foundation:
- Spaced repetition (strong evidence, implemented via Leitner SRS in Practice tab)
- Retrieval practice (strong evidence, already implemented)
- Thematic clustering (good evidence, lesson structure follows this)
- Semantic clustering AVOIDED (interference risk for similar words)
- Input before output (moderate evidence, implemented via Read & Listen first)

## Code Conventions
- Color palette in `P` object (red: #C0392B, green: #27AE60, amber: #E67E22, purple: #7C3AED)
- Fonts: Newsreader (serif, French text), Outfit (sans-serif, UI)
- Storage key: "lm7"
- Section keys in SECS array must match mk() calls exactly: read_listen, patterns, fill_fg, fill_fr, build, fill_write, quiz, combine_fg, say_it, mini_conv, review (**Sprint 11 reframe pending**: 11→9 keys per Merged Canon §11 — `combine_fg` merges into shape_it; `say_it` + `mini_conv` merge into use_it/mini_mission; `review` renames to stay_with_it)
- All section progress stored as `{lessonId}-{sectionKey}: true`
- Lesson data must include `sayIt` (array of {situation, target[]}) and `miniConv` ({topic, starter}) fields
- Lesson data enrichment fields: `expressions` (Expression[]), `grammarNuggets` (GrammarNugget[]), `fauxAmis?` (FauxAmi[]), `soundPatterns?` (SoundPattern[]), `cultureBite?` (string), `summary` (string[]), `difficulty` (easy|medium|hard)
- `cI2` state variable is shared between Combine and Say It sections — reset to 0 on transitions
- "Franglais" renamed to "Weave" everywhere — types: WeaveItem, WeaveBlank; components: WeaveFill, CombineWeave; lesson property: `weave`
- Lesson chunking: CHUNKS array in `constants/sections.ts` defines 3 parts (Learn[0-3], Practice[4-6], Produce[7-10])
- Mastery thresholds: MASTERY_THRESHOLDS in `constants/sections.ts` — 60-70% per scored section
- SRS storage key: `lm7_srs` — Leitner 5-box system, intervals: [0, 1, 3, 7, 30] days
- Practice tab uses ScenarioCard type (situation → answer → explanation), replaces old FlashCard-based flashcards

## What Claude Code Should Do Next:
1. **Sprint 10**: Backend & AI
   - Supabase backend: DB, Edge Functions (AI proxy), Auth
   - AI exercise generation system (single API call per lesson)
   - Error tracking Phase C (adaptive AI response using weak spots)
2. **Paywall/monetization**: Implement subscription purchase flow (paywall position defined: **after L14**, $12.99/mo — locked decision 2026-04-23)
3. **Push notifications**: Daily review reminders
4. **Dictionary & flashcards**: Update dictionary.ts and flashcards.ts comment labels for new lesson ID mapping
5. **APK build**: Android APK build config (EAS Build, GitHub Actions) — deferred from earlier branch

## Important: Do NOT
- Add separate vocabulary flashcard section (replaced with scenario cards, research-backed)
- Use semantic clustering for word groups (interference risk)
- Make AI the core — it's a supporting layer, content + learning engine is the core
- Add social features, leaderboards, or gamification (XP/streak removed per locked decision 2026-04-23 — only milestone display remains; no new gamification)
