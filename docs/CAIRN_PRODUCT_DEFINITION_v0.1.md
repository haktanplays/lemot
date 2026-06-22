# Cairn — Final Product Definition v0.1

> **Planning/vision only.** This defines the long-term Cairn product. It
> authorizes no code, no lesson implementation, no Home-visibility change, and
> does not unblock L7. Current shippable scope remains the Round 1 Dev APK
> (L0-L6), governed by `docs/DEV_APK_MVP_CANON.md` and `docs/STATUS.md`; where
> this vision and the Dev APK canon differ, the Dev APK canon wins for anything
> being built now.

> Status: v0.1 founder draft. Several items below are stated assumptions for
> validation, not locked decisions. This document does not claim any Round 1
> device smoke has passed; that remains pending and operator-only.

> System index: the engines, modules, matrices, and surfaces that build this
> vision are mapped in `docs/CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` (planning/index
> only). This document stays the vision layer; system mechanics live there.

---

## 1. One-sentence product definition

Cairn is a calm, premium French-learning app with a structured zero-to-B2 path
and an AI-supported mentor that teaches learners how and why to build real
sentences — so they stop fearing speaking.

## 2. Product promise

We remove the fear of speaking French. Cairn helps you understand how a sentence
is built, why it works that way, notice and fix your own mistakes, and swap what
you don't know for something you can say — until speaking feels safe, not scary.
The goal is enough real French to live in France for months without getting
lost: confident everyday French, not literary or business French.

## 3. Target learner

- Duolingo-fatigued serious learners who want depth, not points.
- Long-term zero-to-B2 learners committed to a real path.
- Culture, social, and self-improvement learners (travel, living in France,
  personal growth).

Shared trait: motivated adults who genuinely want to speak, over months and
years.

## 4. Non-target learner

- Children.
- Mostly-free, casual game-style users.
- Near-term exam-first / DELF-by-deadline learners. Cairn helps toward B2, but
  it is not a cram-for-the-test product.

## 5. Learning philosophy

- Meaning and usage before rules; grammar serves expression, never lectures.
- Input before output; production is the point, but it is scaffolded.
- Mistakes are data, not punishment — calm correction with the natural
  alternative.
- Confidence is the real outcome: knowing how and why to build a sentence beats
  memorizing lists.
- The mentor is a steady guide, not a quizmaster and not a mascot.

## 6. Core learning loop

A lesson moves: meet meaning, notice the pieces, understand why, try it
(scaffolded), Weave (bridge), Say It Your Way (produce), Natural Reveal
(naturalize and add nuance). What the learner produces lands in Mon Lexique and
resurfaces in Daily Review. Say It Your Way is the core production moment; Daily
Review is the calm habit loop around it.

## 7. Role of Weave

Weave (mixing known French with English and replacing unknown words with
alternatives) is the early/mid transition tool. It lets learners produce before
they have full vocabulary and teaches the "swap what you don't know" survival
skill. Learners should consciously understand what Weave is and why it works. It
is expected to fade as production matures — a bridge, not necessarily a
permanent mechanic.

## 8. Role of AI

AI is a support layer, never the product leader.

- Now: bounded, contained feedback (correction, naturalization), no open
  chatbot.
- Later: possibly scoped conversation practice.
- Always: tied to the lesson and learner context, never a generic chatbot, and
  not a premium-only gate — core feedback stays available across tiers.

AI augments the mentor; it is not the core of the product.

## 9. Role of Mon Lexique and mastery

**Mon Lexique** is the learner's personal dictionary, learning memory, "French
treasure," visible progress face, and the engine that feeds review. It is where
growth becomes tangible.

**Mastery is multi-dimensional**, tracked per item across recognition,
production, listening, spelling, speed/confidence, and contextual use — not a
single known/unknown flag. An item can be strong in recognition yet weak in
production, and Cairn treats those as separate states.

## 10. Review and retention philosophy

- Daily Review is the primary habit loop, but deliberately a "1.5 layer" — a
  calm daily moment, not the entire experience.
- Retention comes from meaning, not addiction mechanics: Mon Lexique growth,
  visible path/cairn progression, small daily moments, personal memory, mentor
  continuity, and real-life usefulness.
- Explicitly not XP, streak, or loss-aversion pressure.

## 11. Curriculum scale and B2 north star

- 120-150 core lessons, extendable to 180-200 with advanced content.
- B2 is the internal north star and path direction, not a near-term public DELF
  guarantee.
- Practical ceiling for the core promise: confident everyday, travel, and
  living French — not literary or business register.

## 12. Monetization assumption

Freemium plus subscription. Roughly the first ~24 lessons plus meaningful review
value are free, then a paywall for the long path. Premium deepens the journey;
it does not wall off basic AI feedback. Position and price are assumptions for
validation, not locked decisions.

## 13. Data/privacy assumption

- Accounts and default cloud sync are expected later; Round 1 is local-first
  today.
- Analytics yes; no data selling.
- Privacy is handled as genuine compliance (KVKK/GDPR posture), not as a brand
  positioning angle.

## 14. Brand and visual direction

Cairn: premium calm, French editorial. Mountain / path / cairn progression
metaphor; a mentor/guide presence; warm, human illustrations. Minimalist
black/cream palette, a serif for French paired with a clean sans for UI. Soft
but not childish. No mascot antics, no gamified confetti.

## 15. Success metrics

- Early: L1 to L2 return, D7 return, paywall conversion, lesson
  success/completion.
- Health (longer-term): Mon Lexique growth per active learner, path progression
  depth, and return that is not manufactured by streak pressure.

## 16. Expansion strategy

French first. Then, in waves: Romance/Latin languages, then Germanic, then
Slavic, then Arabic, then East Asian, then niche languages such as Turkish. The
engine (Weave, Say It Your Way, Natural Reveal, Mon Lexique, the mastery model)
is language-agnostic and ports across.

## 17. Product anti-patterns / hard no list

- No XP, streak, or loss-aversion addiction loops.
- No childish mascot tone.
- No excessive grammar lectures or grammar-table teaching.
- No generic AI chatbot chaos.
- No rote memorization lists as the spine.
- No AI-as-core; no premium-walled basic feedback; no data selling.

## 18. MVP vs v1 vs full-product distinction

- **Now — Round 1 Dev APK (MVP smoke):** L0-L6, dev-apk stage, no paywall, AI
  closed (fallback-only), local-only, near-circle testing. Governed by
  `docs/DEV_APK_MVP_CANON.md` and `docs/STATUS.md`. Android device smoke is
  still pending; L7 is blocked.
- **v1 (first real product):** ~24+ lessons live, paywall plus subscription,
  accounts and cloud sync, bounded AI feedback on, Mon Lexique plus
  multi-dimensional mastery plus Daily Review as shipped systems, Android first.
- **Full product:** the 120-200 lesson path toward B2, scoped AI conversation,
  iOS, then language expansion.

This vision sits above the Dev APK canon. It does not change current Round 1
scope, and nothing here is implementation authorization.

## 19. Open questions

- Exact free/paid boundary and price point (the "~24 lessons" assumption).
- When Weave fades, and how that transition is signaled to the learner.
- Scope and guardrails for "later AI conversation" before it is allowed near
  production.
- Whether B2 ever becomes a public claim, and how that interacts with any DELF
  positioning.
- Cloud sync and account model timing versus the local-first present.
- How multi-dimensional mastery is surfaced to learners without becoming a stats
  dashboard (anti-pattern risk).
- Reconciliation between this vision and the operator-vault canon (User Journey,
  Merged Product Canon); likely a `docs/CLOUD_SYNC_QUEUE.md` item later.
- Passport / assessment levels: whether and how progress is marked with
  milestones/checkpoints.
- Motivation-without-XP mechanism: what concretely drives return, given the
  no-XP/no-streak stance.
- Notifications / habit loop: the mechanism behind the daily habit, without
  streak pressure.
- Technical observability: crash / TTS-failure / AI-failure / sync-conflict
  tracking before any wider beta.
- Local-first to account/cloud migration: timing and safe path from today's
  local-only state.

---

*End of Cairn Final Product Definition v0.1. Planning/vision only — authorizes no
code, content, flag, or runtime change. Round 1 Dev APK scope and the pending
operator device smoke are unchanged by this document.*
