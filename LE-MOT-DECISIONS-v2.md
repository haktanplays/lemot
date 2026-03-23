# LE MOT — DECISIONS v2
## Brainstorm Session (March 18, 2026)

---

## 1. STARTING POINT

- Latest working file: **le-mot-v6.jsx** (v7 was lost)
- 6 lessons exist: 1 (Survival Kit), 2 (Pronunciation I), 3 (Pronunciation II), 4 (Tu vs Vous), 5 (Être), 12 (Everyday Phrases)
- 10-section lesson structure, AI Chat (4 modes), Crossing DNA, Practice tab, Stats tab
- Storage key: lm6

---

## 2. RESEARCH FOUNDATION

### Strong Evidence (use confidently):
- **Spaced Repetition** — 100+ years of consistent results. 3x retention vs massed practice. Currently only in flashcards, needs to spread into lessons.
- **Retrieval Practice** — Active recall > passive review. Quiz/Write/Build/Combine already do this well.
- **Thematic Clustering** — Tinkham 1997: thematic clusters (frog, green, hop, pond) help; semantic clusters (eye, ear, nose) hurt. Le Mot's lesson structure is already thematic — keep it.

### Mixed Evidence (use carefully):
- **Comprehensible Input vs Output** — Krashen says input is enough, Swain says output matters, Long says interaction is key. Latest view: Krashen is outdated, all three matter. Le Mot needs more input AND more production.
- **Semantic Clustering** — Risk of interference when similar-meaning words taught together (souvent/parfois/rarement). Mitigated by embedding in context (McDonald & Reynolds 2023).

### No Evidence (innovating):
- Crossing/code-switching as pedagogy — no research, Le Mot is pioneering
- Cognate-based teaching — cognate advantage studied for reading speed, not as teaching method
- Self-paced app learning — most studies are lab/classroom

### Key Decision: NO separate Vocabulary flashcard section. 
Rationale: Flashcards = isolated, decontextualized, passive recognition. Research says first encounter should be in meaningful context. Instead, strengthen Examples section with AI-generated variety.

---

## 3. AI-GENERATED EXERCISES

### Architecture:
- Single API call when lesson opens
- Sends: lesson's target words, level, patterns, previous lesson words
- Returns: JSON with extra exercises for ALL sections
- Static data = failover (no internet → static-only, still works)

### What AI generates per lesson (~25 extra exercises):
- 4 extra Read & Listen sentences (different situations)
- 4 extra Crossing Fill questions
- 3 extra French Fill questions  
- 3 extra Build sentences
- 3 extra Quiz questions
- 2 extra Combine prompts
- 2 extra Crossing active sentences
- 3 Review questions mixing current + past lesson words

### Result: Same target words, 8-10 different contexts per word.

---

## 4. MODEL ROUTING

| Task | Model | Cost/1M tokens | Why |
|---|---|---|---|
| Exercise generation (JSON) | Gemini 2.5 Flash-Lite | $0.10 / $0.40 | Simple pattern-following, cheapest |
| AI Chat (conversation) | Gemini 2.5 Flash | $0.30 / $2.50 | Better dialogue quality needed |
| Error analysis / reports | Claude Haiku | $0.25 / $1.25 | Better reasoning for analysis |

### Cost estimate:
- 1000 users, 2 lessons/day + 5 chat messages = ~$15-20/month total
- 2 premium subscribers ($13/mo) covers entire API cost

### Note: Artifact phase uses Claude API (only available endpoint). 
Gemini switch happens at standalone app phase.

---

## 5. NEW SECTIONS (added to lesson flow)

### Say It Your Way (Section 9 → after Quiz)
- Situation given, no hints
- User writes freely in French
- AI evaluates: target word usage, grammar, naturalness
- Different from Combine: no scaffolding, pure production

### Mini Conversation (Section 10 → after Say It Your Way)
- 3-4 turn AI chat, locked to lesson topic
- Uses existing chat infrastructure
- Negotiation of meaning active
- Short and focused, not open-ended

### Updated 12-section flow:
1. Read & Listen (strengthened Examples, input-first)
2. Pattern Discovery (grammar)
3. Crossing Fill
4. French Fill
5. Write
6. Build
7. Quiz
8. Combine + Crossing Active (merged)
9. Say It Your Way (NEW — free production)
10. Mini Conversation (NEW — in-lesson AI chat)
11. Review (50% current lesson, 50% past lessons via AI)
12. Lesson Complete

---

## 6. MOTIVATION & RETENTION

### Daily Review Goal (Priority: HIGH)
- Home screen card: "Today: 0/5 reviews completed"
- Links to Practice tab with spaced repetition queue
- Streak tied to daily goal completion

### Can-Do Milestones (Priority: HIGH)
- After completing groups of lessons, show concrete ability:
  - After L1-4: "You can greet, order, and introduce yourself"
  - After L5-8: "You can describe people and talk about daily life"
  - After L9-12: "You can handle everyday conversations"
- Based on CEFR can-do statements
- Visual celebration on mountain map

### NOT doing now (standalone phase):
- Push notifications
- Leaderboard / social features
- Weekly email reports

---

## 7. ERROR TRACKING

### Phase A — Data Collection (this sprint):
- Every wrong answer saved to storage:
  - word_id, section_type, error_type, timestamp
  - What user chose vs correct answer
- Lightweight: append to error log in persistent storage

### Phase B — Weak Spot Detection (this sprint):
- Simple threshold: 3+ errors on same word/pattern = weak spot
- Weak spots displayed in Stats tab
- Categories: conjugation, gender, vocabulary recall, word order

### Phase C — Adaptive Response (next sprint):
- AI exercise prompt includes: "user struggles with: [weak spots]"
- AI generates more exercises targeting weak areas
- Review section weights weak spots higher
- Post-lesson mini-report: "Watch out: you keep mixing être/avoir"

---

## 8. THREE-PERSPECTIVE ANALYSIS

### Student risks:
- No speech/pronunciation practice (accepted limitation for now)
- Motivation loop is thin (B + D addresses this)
- No offline mode (static failover is partial solution)

### Educator risks:
- Production skills weak (Say It Your Way + Mini Conversation fixes)
- No mastery criteria defined (need to set: 80% per section = pass?)
- Grammar spiral between lessons weak (AI Review cross-references help)

### Investor risks:
- No moat beyond Crossing brand
- Retention metrics unknown (needs real user testing)
- Monetization strategy undefined
- Single-language, single-developer

---

## 9. EXTERNAL FEEDBACK (Product Advisor Review)

Key insights that changed our sprint order:
- "Ana motor içerik + öğrenme sistemi olmalı, AI chat destekleyici katman" → AI features last, not first
- "Lesson data'yı koddan çıkar" → JSON separation is prerequisite for everything
- "Tek cümlelik ürün vaadi" → Product clarity before code
- "Home ekranı: bugün ne yapacağım, neden, ne kadar sürecek" → Action-oriented home screen
- "Core loop: Learn → Practice → Recall → Speak" → Lock this before adding features

Product promise: "LE-MOT teaches French through meaning, patterns, and real expression — not memorization."

Target audience: English-speaking adults learning French who find Duolingo too gamey, Babbel too dry, and want to understand WHY French works the way it does. Premium, calm, aesthetic experience.

Primary differentiator: Crossing bridge + meaning-first learning
Supporting: cognates, etymology, elegant UI

---

## 10. SPRINT PLAN (Revised)

### Sprint 5A — Foundation (code zero features, fix architecture):
1. Product clarity doc (1 page: who, what, why, 7-day outcome)
2. Lesson data → separate JSON files (lessons/1.json, lessons/2.json...)
3. State management cleanup (custom hooks: useLessonProgress, useChat, useSpeech)
4. API wrapper (centralized error handling, model config, fallback)
5. Core loop lock: Learn → Practice → Recall → Speak (section reorder)

### Sprint 5B — Learning Engine (make it smart):
6. Error tracking A+B (wrong answer bank + weak spot detection)
7. Review system (50% current + 50% past lessons, spaced queue)
8. Daily review goal + home screen action cards
9. Can-do milestones (CEFR-based competency messages)
10. Progress screen upgrade (mastered words, weak areas, review due)

### Sprint 5C — Production + AI (add the magic):
11. Say It Your Way section (free write + AI evaluation)
12. Mini Conversation section (in-lesson 3-4 turn AI chat)
13. AI exercise generation system (all sections, single API call)
14. Error tracking C (adaptive AI response using weak spots)

### Sprint 6:
- Remaining A1 lessons (6-11, 13-16)
- SRS algorithm in Practice flashcards
- Mastery criteria system

### Sprint 7:
- Standalone app conversion (Expo/React Native)
- Gemini API integration
- Push notifications
- Paywall/monetization

---

## 11. OPEN QUESTIONS

- Mastery criteria: 70%? 80%? Per section or per lesson?
- Paywall position: after lesson 7? after AI features? chat limit?
- Pronunciation: Web Speech API recognition feasible in artifact?
- Offline: cache AI-generated exercises for offline replay?
- JSON structure: flat files or nested? How to handle cross-lesson references?
