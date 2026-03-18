# LE MOT — French Learning App

## What This Is
A French learning app for English speakers. Currently a single-file React component (le-mot-v7.jsx) built as a Claude artifact. Goal: convert to standalone Expo/React Native app.

## Product Promise
"LE-MOT teaches French through meaning, patterns, and real expression — not memorization."

## Current State (v7 + Sprint 5B + 5C + 6)
- **16 lessons** (full A1 curriculum):
  - L1 Survival Kit, L2 Pronunciation I, L3 Pronunciation II, L4 Tu vs Vous
  - L5 Être, L6 Avoir, L7 Articles & Gender, L8 Numbers & Time
  - L9 Food & Ordering, L10 Family, L11 Negation, L12 Everyday Phrases
  - L13 Aller & Future, L14 Questions, L15 Daily Routine, L16 Places & Prepositions
- **11-section lesson flow** (input-first): Read & Listen → Patterns → Franglais Fill → French Fill → Write → Build → Quiz → Combine+Franglais → Say It Your Way → Mini Conversation → Review
- **Say It Your Way** (sec 8): Free-write response to situation prompts, AI evaluation via Claude API, target word tracking
- **Mini Conversation** (sec 9): 3-4 turn AI chat locked to lesson topic, negotiation of meaning, listen button per message
- **AI Chat**: 4 modes (Free, Lesson Focus, Error Correction, Scenarios) with negotiation of meaning
- **Error tracking**: Every wrong answer logged, weak spots detected (3+ errors = weak)
- **Daily Review**: Home screen card with 5-word daily goal, weak spot priority, streak tracking, modal quiz overlay
- **Can-Do Milestones**: 5 milestone tiers (Foundation L1-4, Grammar Power L5-7, Social Ready L8-10, Expression Master L11-13, Independence L14-16)
- **Enhanced Progress Tab**: Mastered/Learning/Weak word categories, daily review status, milestone badges, streak display
- **Storage**: window.storage API (artifact) — key "lm7", structure: `{p, xp, err, dr: {date, count}, streak}`

## Key Differentiator: Franglais Bridge
Users write sentences mixing English + French. Known words in French, unknown in English. Cognate highlighting (merci ≈ mercy). No other app does this.

## Architecture Decisions (see LE-MOT-DECISIONS-v2.md for full details)

### Sprint Plan:
- **5A ✅** Foundation: input-first reorder, error tracking, example expansion
- **5B ✅** Learning Engine: daily review goal, can-do milestones, progress upgrade, basic SRS
- **5C ✅** Production + AI: Say It Your Way (free write + AI eval), Mini Conversation (in-lesson chat)
- **6 ✅** Content: full A1 curriculum — 16 lessons (added L6-L11, L13-L16)
- **7** Standalone: Expo/React Native (Supabase backend, NativeWind, ts-fsrs), Android priority

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
- Section keys in SECS array must match mk() calls exactly: read_listen, patterns, fill_fg, fill_fr, fill_write, build, quiz, combine_fg, say_it, mini_conv, review
- All section progress stored as `{lessonId}-{sectionKey}: true`
- Lesson data must include `sayIt` (array of {situation, target[]}) and `miniConv` ({topic, starter}) fields
- `cI2` state variable is shared between Combine and Say It sections — reset to 0 on transitions

## What Claude Code Should Do Next:
1. **Sprint 7**: Expo/React Native standalone app conversion (see master plan)
   - Environment setup (Git, Node, JDK 17, Android Studio, EAS CLI)
   - Expo project skeleton with TypeScript + NativeWind + Expo Router
   - Code migration: le-mot-v7.jsx → modular components
   - Supabase backend: DB, Edge Functions (AI proxy), Auth
   - AI exercise generation system (single API call per lesson)
   - Error tracking Phase C (adaptive AI response using weak spots)

## Important: Do NOT
- Add separate vocabulary flashcard section (decided against, research-backed)
- Use semantic clustering for word groups (interference risk)
- Make AI the core — it's a supporting layer, content + learning engine is the core
- Add social features, leaderboards, or gamification beyond XP/milestones yet
