# LE MOT — French Learning App

## What This Is
A French learning app for English speakers. Expo/React Native standalone app (TypeScript, NativeWind, Expo Router). Also available as a single-file React artifact (le-mot-v7.jsx).

## Product Promise
"LE-MOT teaches French through meaning, patterns, and real expression — not memorization."

## Current State (v7 + Sprint 5B + 5C + 6 + 7 + 8 + 8B + 8C + 9-syllabus)
- **24 lessons** (full A1 curriculum, 4 milestones):
  - **M1 Basic Communicator (L1-L5, FREE)**: L1 Survival Kit, L2 Être, L3 Yes/No/You, L4 Avoir, L5 Articles
  - **M2 Independent Speaker (L6-L11, FREE)**: L6 Aller, L7 Questions I, L8 Numbers/Time/Money, L9 Food & Ordering, L10 Faire, L11 Everyday Structures
  - **PAYWALL ($12.99/mo)**
  - **M3 Confident Conversationalist (L12-L17, PAID)**: L12 My People, L13 Questions II, L14 More Negation + Y/En, L15 Places & Prepositions, L16 Vouloir/Pouvoir/Devoir, L17 My Day
  - **M4 Natural Expression (L18-L24, PAID)**: L18 Regular -er Verbs, L19 Past Tense I (avoir), L20 Past Tense II (être), L21 Dire/Voir/Savoir, L22 Opinions & Feelings, L23 Venir/Prendre, L24 Putting It All Together
- **11-section lesson flow** (input-first, reordered): Read & Listen → Patterns → Weave Fill → French Fill → Build → Write → Quiz → Combine+Weave → Say It Your Way → Mini Conversation → Review
- **Build before Write** (Sprint 8B): Easier task (arrange tiles) before harder task (write from memory) — progressive difficulty
- **Say It Your Way** (sec 8): Free-write response to situation prompts, AI evaluation via Claude API, target word tracking
- **Mini Conversation** (sec 9): 3-4 turn AI chat locked to lesson topic, negotiation of meaning, listen button per message
- **AI Chat**: 4 modes (Free, Lesson Focus, Error Correction, Scenarios) with negotiation of meaning
- **Error tracking**: Every wrong answer logged, weak spots detected (3+ errors = weak)
- **Daily Review**: Home screen card with 5-word daily goal, weak spot priority, streak tracking, modal quiz overlay
- **Can-Do Milestones**: 4 milestone tiers (Basic Communicator L1-5, Independent Speaker L6-11, Confident Conversationalist L12-17, Natural Expression L18-24)
- **Paywall**: After L11 (M2), $12.99/mo subscription unlocks M3+M4
- **Enhanced Progress Tab**: Mastered/Learning/Weak word categories, daily review status, milestone badges, streak display
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
- **Storage**: MMKV (Expo app) / window.storage (artifact) — structure: `{p, xp, err, dr: {date, count}, streak}`, SRS: `lm7_srs`

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
- **9-syllabus ✅** Syllabus Restructure: 16→24 lessons, 4 milestones (5-6-6-7), paywall after L11 ($12.99/mo), MountainMap 24 nodes, practice scenarios remapped + new (L10/L13/L14/L16)
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
- Section keys in SECS array must match mk() calls exactly: read_listen, patterns, fill_fg, fill_fr, build, fill_write, quiz, combine_fg, say_it, mini_conv, review
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
2. **Paywall/monetization**: Implement subscription purchase flow (paywall position defined: after L11, $12.99/mo)
3. **Push notifications**: Daily review reminders
4. **Dictionary & flashcards**: Update dictionary.ts and flashcards.ts comment labels for new lesson ID mapping
5. **APK build**: Android APK build config (EAS Build, GitHub Actions) — deferred from earlier branch

## Important: Do NOT
- Add separate vocabulary flashcard section (replaced with scenario cards, research-backed)
- Use semantic clustering for word groups (interference risk)
- Make AI the core — it's a supporting layer, content + learning engine is the core
- Add social features, leaderboards, or gamification beyond XP/milestones yet
