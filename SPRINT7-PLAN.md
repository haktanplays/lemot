# Sprint 7 — Expo/React Native Migration

## Context
Le Mot is a complete A1 French learning app (16 lessons, 11-section flow, AI chat, daily review) currently running as a single-file React web artifact (`le-mot-v7.jsx`, 2551 lines). Sprint 7 converts it to a standalone Expo/React Native mobile app targeting Android first, with a modular TypeScript codebase.

## Source: `c:\Users\Eren\Desktop\Le Mot\le-mot-v7.jsx`
## Target: `c:\Users\Eren\Desktop\Le Mot\lemot-app/` (new Expo project)

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Expo SDK 53 + Expo Router | File-based routing, no native build needed for dev |
| Language | TypeScript | Type safety, scalable codebase |
| Styling | NativeWind v4 | Tailwind for RN, fast iteration |
| Icons | lucide-react-native | Drop-in replacement for lucide-react |
| Storage | react-native-mmkv | Fastest sync storage, offline-first |
| TTS | expo-speech | Replaces Web Speech API |
| SVG | react-native-svg | Mountain map |
| Fonts | expo-font | Newsreader + Outfit |
| AI Proxy | Supabase Edge Functions | Hide API keys, model routing |
| Auth | Supabase Auth (later) | Not needed for MVP |
| Animations | react-native-reanimated | Card flip, transitions |

---

## Project Structure

```
lemot-app/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout (fonts, providers)
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab navigator (Journey, Chat, Practice, Progress)
│   │   ├── index.tsx             # Home/Journey screen
│   │   ├── chat.tsx              # AI Chat screen
│   │   ├── practice.tsx          # Flashcards + Translation
│   │   └── stats.tsx             # Progress/Stats screen
│   └── lesson/
│       └── [id].tsx              # Lesson screen (dynamic route)
├── components/
│   ├── Btn.tsx                   # Styled button
│   ├── FrText.tsx                # Interactive word glosses (tap → tooltip)
│   ├── FrMix.tsx                 # French word highlighting
│   ├── MCQ.tsx                   # Multiple choice question
│   ├── GrammarRenderer.tsx       # Grammar section types (intro, block, tip, conjugation...)
│   ├── MountainMap.tsx           # SVG mountain visualization
│   ├── DailyReviewOverlay.tsx    # Modal review quiz
│   ├── LessonCard.tsx            # Lesson list card
│   ├── MilestoneCard.tsx         # Can-do milestone badge
│   ├── TransitionScreen.tsx      # Score display between sections
│   └── sections/                 # 11 lesson section components
│       ├── ReadListen.tsx         # sec 0: Examples + audio
│       ├── Patterns.tsx           # sec 1: Grammar + quick recall
│       ├── FranglaisFill.tsx      # sec 2: Franglais MCQ
│       ├── FrenchFill.tsx         # sec 3: French MCQ
│       ├── WriteSection.tsx       # sec 4: Type from memory
│       ├── BuildSentence.tsx      # sec 5: Word arrangement
│       ├── Quiz.tsx               # sec 6: Mixed questions
│       ├── CombineFranglais.tsx   # sec 7: Translation + Franglais
│       ├── SayItYourWay.tsx       # sec 8: Free write + AI eval
│       ├── MiniConversation.tsx   # sec 9: In-lesson AI chat
│       └── Review.tsx             # sec 10: Mixed review
├── data/
│   ├── dictionary.ts             # DICT object (~106 entries)
│   ├── flashcards.ts             # FLASH array (~80+ cards)
│   ├── milestones.ts             # MILESTONES array (5 tiers)
│   ├── scenarios.ts              # Chat scenarios (3)
│   └── lessons/
│       ├── index.ts              # Re-exports all lessons as LESSONS array
│       ├── lesson1.ts            # L1: Survival Kit
│       ├── lesson2.ts            # ... through lesson16.ts
│       └── lesson16.ts           # L16: Places & Prepositions
├── hooks/
│   ├── useStorage.ts             # MMKV wrapper (prog, xp, errors, dailyRev, streak)
│   ├── useLessonProgress.ts      # lp(), mk(), gx(), section completion
│   ├── useSpeech.ts              # expo-speech wrapper (say function)
│   ├── useChat.ts                # AI chat state + API calls
│   └── useErrors.ts              # Error logging + weakSpots computation
├── lib/
│   ├── ai.ts                     # AI API client (Supabase Edge Function calls)
│   ├── normalize.ts              # norm() text normalization
│   └── types.ts                  # TypeScript interfaces (Lesson, DictEntry, FlashCard, etc.)
├── constants/
│   ├── theme.ts                  # P colors, fonts, shadows
│   └── sections.ts               # SECS, SEC_N, SEC_I arrays
├── providers/
│   └── AppProvider.tsx           # Context combining storage + progress + errors
├── tailwind.config.js            # NativeWind theme (Le Mot colors)
├── global.css                    # Tailwind directives
├── app.json                      # Expo config
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Skeleton (get app running on Expo Go)
**Goal**: Empty app with tab navigation, fonts, theme — visible on phone

**Steps**:
1. `npx create-expo-app@latest lemot-app --template tabs`
2. Install deps: `nativewind`, `tailwindcss`, `lucide-react-native`, `react-native-mmkv`, `expo-speech`, `react-native-svg`, `react-native-reanimated`, `expo-font`
3. Configure NativeWind (tailwind.config.js, global.css, metro.config.js, babel)
4. Set up tab layout with 4 tabs: Journey, Chat, Practice, Progress
5. Add Le Mot colors to tailwind config
6. Load Outfit font (use expo-google-fonts or bundled)
7. Create placeholder screens with "Le Mot" branding

**Files**: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/*.tsx`, `tailwind.config.js`, `global.css`, `constants/theme.ts`

**Verify**: App runs on Expo Go, 4 tabs visible, Le Mot colors applied

---

### Phase 2: Types + Data Extraction
**Goal**: All lesson data in typed, modular files

**Steps**:
1. Define TypeScript interfaces in `lib/types.ts`: `Lesson`, `Example`, `FillItem`, `BuildItem`, `QuizItem`, `CombineItem`, `FranglaisItem`, `SayItItem`, `MiniConvConfig`, `ReviewItem`, `DictEntry`, `FlashCard`, `Milestone`
2. Extract DICT → `data/dictionary.ts`
3. Extract FLASH → `data/flashcards.ts`
4. Extract MILESTONES → `data/milestones.ts`
5. Extract SCENARIOS → `data/scenarios.ts`
6. Extract SECS/SEC_N/SEC_I → `constants/sections.ts`
7. Extract each lesson into `data/lessons/lesson{N}.ts` (16 files)
8. Create `data/lessons/index.ts` barrel export

**Files**: `lib/types.ts`, `data/*.ts`, `data/lessons/*.ts`, `constants/sections.ts`

**Verify**: All imports resolve, TypeScript compiles clean

---

### Phase 3: Core Utilities + Hooks
**Goal**: Storage, TTS, progress tracking, error logging working

**Steps**:
1. `lib/normalize.ts` — port `norm()` function
2. `hooks/useStorage.ts` — MMKV init, load/save with same `{p, xp, err, dr, streak}` shape
3. `hooks/useLessonProgress.ts` — `mk()`, `gx()`, `lp()` using storage hook
4. `hooks/useSpeech.ts` — `say(text)` using expo-speech (lang: 'fr-FR', rate: 0.85)
5. `hooks/useErrors.ts` — `logErr()`, `weakSpots` memo
6. `providers/AppProvider.tsx` — React Context combining all hooks
7. `lib/ai.ts` — fetch wrapper for AI calls (direct Claude API for now, Supabase proxy later)

**Files**: `lib/*.ts`, `hooks/*.ts`, `providers/AppProvider.tsx`

**Verify**: Storage persists across app restarts, TTS speaks French text

---

### Phase 4: Core Components
**Goal**: Reusable UI components ready for screens

**Steps**:
1. `Btn.tsx` — pressable with Le Mot styling (color prop, disabled state)
2. `FrText.tsx` — Pressable words → tooltip popover (dictionary lookup)
3. `FrMix.tsx` — Parse `*word*` syntax → styled Text spans
4. `MCQ.tsx` — Options list with correct/incorrect visual feedback
5. `GrammarRenderer.tsx` — Render grammar section types (intro, block, tip, culture, conjugation, etymology, howToSay)
6. `TransitionScreen.tsx` — Section completion with score + motivational message
7. `LessonCard.tsx` — Lesson tile with progress bar
8. `MilestoneCard.tsx` — Achievement badge card

**Files**: `components/*.tsx`

**Verify**: Components render correctly in a test screen

---

### Phase 5: Home Screen
**Goal**: Full home tab with mountain map, daily review, lesson list

**Steps**:
1. `MountainMap.tsx` — Convert SVG to react-native-svg (Svg, Path, Circle, Text)
2. `DailyReviewOverlay.tsx` — Modal with MCQ review items
3. Home screen: Mountain map + daily review card + milestone cards + lesson list
4. Wire up: lesson card press → navigate to `lesson/[id]`

**Files**: `components/MountainMap.tsx`, `components/DailyReviewOverlay.tsx`, `app/(tabs)/index.tsx`

**Verify**: Home screen shows all 16 lessons, mountain map renders, daily review works

---

### Phase 6: Lesson Screen + All 11 Sections
**Goal**: Complete lesson flow working — this is the core of the app

**Steps**:
1. `app/lesson/[id].tsx` — Section header, tabs, navigation logic, transition handling
2. Port each section component (11 files in `components/sections/`):
   - ReadListen: FrText examples + audio buttons
   - Patterns: GrammarRenderer + quick recall
   - FranglaisFill: MCQ with context
   - FrenchFill: MCQ fully in French
   - WriteSection: TextInput + answer checking via norm()
   - BuildSentence: Pressable word chips (drag not needed, tap to select)
   - Quiz: Mixed MCQ with "spot the mistake" variant
   - CombineFranglais: Two-phase (translate → franglais)
   - SayItYourWay: TextInput + AI evaluation call
   - MiniConversation: Chat UI with AI
   - Review: Mixed review types (listen, odd, context, fill_ctx, franglais)
3. Section state management: each section manages own state, reports completion up via callback
4. Progress bar with completion checkmarks

**Files**: `app/lesson/[id].tsx`, `components/sections/*.tsx`

**Verify**: Can complete any lesson start-to-finish, progress saves, XP increments

---

### Phase 7: Chat + Practice + Stats Screens
**Goal**: Remaining tabs functional

**Steps**:
1. `app/(tabs)/chat.tsx` — 4 chat modes, message bubbles, Claude API, scenario selection
2. `app/(tabs)/practice.tsx` — Flashcard deck (animated flip), translation practice
3. `app/(tabs)/stats.tsx` — XP, streak, mastered/weak words, milestone badges, lesson progress table
4. `hooks/useChat.ts` — Chat state, message history, API integration

**Files**: `app/(tabs)/chat.tsx`, `app/(tabs)/practice.tsx`, `app/(tabs)/stats.tsx`, `hooks/useChat.ts`

**Verify**: All 4 tabs fully functional, chat sends/receives messages

---

### Phase 8: Polish + AI Proxy
**Goal**: Production-quality feel

**Steps**:
1. Animated card flip (Reanimated) for flashcards
2. Section transition animations
3. Supabase project setup + Edge Function for AI proxy
4. Font refinement (Newsreader for French text if available, fallback serif)
5. App icon + splash screen
6. Error boundaries + loading states

**Files**: Various polish across all files, `supabase/functions/ai-proxy/index.ts`

**Verify**: App feels premium and calm, no exposed API keys

---

## Key Migration Mappings

| Web (le-mot-v7.jsx) | React Native |
|---|---|
| `<div>` | `<View>` |
| `<span>` | `<Text>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<Pressable>` or `<TouchableOpacity>` |
| `style={{...}}` | NativeWind `className="..."` |
| `window.storage` | `react-native-mmkv` |
| `speechSynthesis` | `expo-speech` |
| `lucide-react` | `lucide-react-native` |
| `<svg>` | `react-native-svg` |
| Direct Claude API | Supabase Edge Function (later) |
| CSS 3D transforms | `react-native-reanimated` |
| `onClick` | `onPress` |
| `position: fixed` | Expo Router tab bar |

---

## Verification (after each phase)

1. `npx expo start` — app loads without errors
2. Open on Expo Go (Android) — screens render correctly
3. TypeScript: `npx tsc --noEmit` — no type errors
4. Storage: close and reopen app — progress persists
5. TTS: tap speaker icon — French audio plays
6. Complete a full lesson → progress bar fills, XP increases
7. AI features: chat sends message → gets response

---

## Notes

- **No Java/Android Studio needed** — Expo Go handles dev testing
- **AI API keys**: For MVP, use direct Claude API calls (same as web version). Move to Supabase Edge Function proxy before any public release
- **Fonts**: Start with system fonts + Outfit (Google Fonts via expo-google-fonts). Add Newsreader later if available
- **Offline-first**: MMKV stores everything locally. Supabase sync is a future feature
- **Keep web artifact**: Don't delete le-mot-v7.jsx — it remains the reference implementation
