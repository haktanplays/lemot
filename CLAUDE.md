# LE MOT — French Learning App

## What This Is
A French learning app for English speakers. Currently a single-file React component (le-mot-v7.jsx) built as a Claude artifact. Goal: convert to standalone Expo/React Native app.

## Product Promise
"LE-MOT teaches French through meaning, patterns, and real expression — not memorization."

## Current State (v7 + Sprint 5B + 5C + 6 + 7 + 8 + 8B)
- **16 lessons** (full A1 curriculum):
  - L1 Survival Kit, L2 Pronunciation I, L3 Pronunciation II, L4 Tu vs Vous
  - L5 Être, L6 Avoir, L7 Articles & Gender, L8 Numbers & Time
  - L9 Food & Ordering, L10 Family, L11 Negation, L12 Everyday Phrases
  - L13 Aller & Future, L14 Questions, L15 Daily Routine, L16 Places & Prepositions
- **11-section lesson flow** (input-first, reordered): Read & Listen → Patterns → Weave Fill → French Fill → Build → Write → Quiz → Combine+Weave → Say It Your Way → Mini Conversation → Review
- **Build before Write** (Sprint 8B): Easier task (arrange tiles) before harder task (write from memory) — progressive difficulty
- **Say It Your Way** (sec 8): Free-write response to situation prompts, AI evaluation via Claude API, target word tracking
- **Mini Conversation** (sec 9): 3-4 turn AI chat locked to lesson topic, negotiation of meaning, listen button per message
- **AI Chat**: 4 modes (Free, Lesson Focus, Error Correction, Scenarios) with negotiation of meaning
- **Error tracking**: Every wrong answer logged, weak spots detected (3+ errors = weak)
- **Daily Review**: Home screen card with 5-word daily goal, weak spot priority, streak tracking, modal quiz overlay
- **Can-Do Milestones**: 5 milestone tiers (Foundation L1-4, Grammar Power L5-7, Social Ready L8-10, Expression Master L11-13, Independence L14-16)
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
- **Expo/React Native app** (Sprint 7): Full migration complete with TypeScript, NativeWind, Expo Router
- **Storage**: MMKV (Expo app) / window.storage (artifact) — structure: `{p, xp, err, dr: {date, count}, streak}`

## Key Differentiator: Weave
Users write sentences mixing English + French ("weaving" two languages). Known words in French, unknown in English. Cognate highlighting (merci ≈ mercy). No other app does this. Formerly called "Franglais" — renamed to "Weave" for trademark distinctiveness.

## Architecture Decisions (see LE-MOT-DECISIONS-v2.md for full details)

### Sprint Plan:
- **5A ✅** Foundation: input-first reorder, error tracking, example expansion
- **5B ✅** Learning Engine: daily review goal, can-do milestones, progress upgrade, basic SRS
- **5C ✅** Production + AI: Say It Your Way (free write + AI eval), Mini Conversation (in-lesson chat)
- **6 ✅** Content: full A1 curriculum — 16 lessons (added L6-L11, L13-L16)
- **7 ✅** Standalone: Expo/React Native migration (TypeScript, NativeWind, Expo Router)
- **7.5 ✅** Polish & QA: 18 issues fixed across 23 files
- **8 ✅** Content Enrichment: Weave rename, expressions, grammar nuggets, faux amis, sound patterns, culture bites, difficulty indicators, summary cards
- **8B ✅** Meaning-First Overhaul: Build↔Write reorder, unlockable enrichment system, Practice→scenarios, contextual expression quizzes
- **9** Backend & AI: Supabase (DB, Edge Functions, Auth), AI exercise generation, Error tracking Phase C

### Model Routing (for standalone):
| Task | Model | Why |
|---|---|---|
| Exercise generation | Gemini 2.5 Flash-Lite | Cheapest, task is simple |
| AI Chat | Gemini 2.5 Flash | Better dialogue quality |
| Error analysis | Claude Haiku | Better reasoning |

### Research Foundation:
- Spaced repetition (strong evidence, needs expansion in-app)
- Retrieval practice (strong evidence, already implemented)
- Thematic clustering (good evidence, lesson structure follows this)
- Semantic clustering AVOIDED (interference risk for similar words)
- Input before output (moderate evidence, implemented via Read & Listen first)

## Code Conventions
- Single-file React component with inline styles
- Color palette in `P` object (red: #C0392B, green: #27AE60, amber: #E67E22, purple: #7C3AED)
- Fonts: Newsreader (serif, French text), Outfit (sans-serif, UI)
- Storage key: "lm7"
- Section keys in SECS array must match mk() calls exactly: read_listen, patterns, fill_fg, fill_fr, build, fill_write, quiz, combine_fg, say_it, mini_conv, review
- All section progress stored as `{lessonId}-{sectionKey}: true`
- Lesson data must include `sayIt` (array of {situation, target[]}) and `miniConv` ({topic, starter}) fields
- Lesson data enrichment fields: `expressions` (Expression[]), `grammarNuggets` (GrammarNugget[]), `fauxAmis?` (FauxAmi[]), `soundPatterns?` (SoundPattern[]), `cultureBite?` (string), `summary` (string[]), `difficulty` (easy|medium|hard)
- `cI2` state variable is shared between Combine and Say It sections — reset to 0 on transitions
- "Franglais" renamed to "Weave" everywhere — types: WeaveItem, WeaveBlank; components: WeaveFill, CombineWeave; lesson property: `weave`

## What Claude Code Should Do Next:
1. **Lesson chunking**: Split 11 sections into 3 digestible chunks (~7-8 min each)
2. **SRS algorithm**: ts-fsrs in Practice scenario cards
3. **Mastery criteria**: Define pass threshold per section (70%? 80%?)
4. **Sprint 9**: Backend & AI
   - Supabase backend: DB, Edge Functions (AI proxy), Auth
   - AI exercise generation system (single API call per lesson)
   - Error tracking Phase C (adaptive AI response using weak spots)

## Important: Do NOT
- Add separate vocabulary flashcard section (replaced with scenario cards, research-backed)
- Use semantic clustering for word groups (interference risk)
- Make AI the core — it's a supporting layer, content + learning engine is the core
- Add social features, leaderboards, or gamification beyond XP/milestones yet
