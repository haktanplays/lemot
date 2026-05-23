# L1 — Survival Kit (Lesson Spec)

> Follows `docs/learning-engine-v1.md` + `docs/syllabus/lesson-spec-template-v1.1.md`.
> Planning/spec document only — authorizes **no** code, content, flag, or runtime change.
> Locked product canon wins on conflict (see Canon Alignment Note below).

> **PILOT.** This is the first lesson spec produced with Learning Engine v1 / Template v1.1. It doubles as a **stress test** of the template and the early-lesson item budget. §15 records the findings, including changes the template itself may need.

---

## Canon Alignment Note (read first)

**Canon decision (operator, locked this step).** The v1 syllabus spine is now decided — the identity fork the pilot surfaced is **resolved**:

| Slot | Decided role |
|---|---|
| **L0 / Lesson Zero** | First taste / onboarding moment using `Bonjour, je voudrais un café.` |
| **L1** | **Survival Kit** — social doorway + polite request + rescue moment |
| **L2** | **Être** — identity / state / `c'est`, the first architecture verb |

**L0 → L1 is deliberate expansion, not duplicate teaching.** L0 is a short onboarding *taste* of one café line; L1 **expands the same core** into a fuller social exchange and a generative production engine (`je voudrais ___`). The café order is therefore treated in this spec as **carry-in / review from L0** that is grown, not re-taught (see §7). **être is deferred to L2.**

This direction matches the legacy Dev APK spine (`M1: L1 Survival Kit → L2 Être → L3 Yes/No/You → L4 Avoir → L5 Articles`) and is grounded in the existing runtime lesson `lemot-app/data/lessons/lesson1.ts` (read-only).

**Future content alignment (after smoke test — not this step).** The committed v1 sandbox currently holds L0 = café order (`content/lessons/v1/lesson-000.ts`) and **L1 = "Je suis"** (`content/lessons/v1/lesson-001.ts`, @ df4d074). Under the decision above, that "Je suis" content belongs at **L2**. **This runtime/content realignment is a future task to be done after the Dev APK smoke test — it is NOT performed here.** This spec is planning canon only: it changes no code and no runtime content now. The realignment is logged as a future-action item in §15 / §16.

---

## 1. Lesson Identity

| Field | Value |
|---|---|
| **Lesson number** | L1 |
| **Lesson title** | Survival Kit |
| **Journey phase** | First Ascent (Core 150) / M1 Basic Communicator (legacy) — *first full lesson, not Lesson Zero* |
| **Lesson archetype** | `social-survival` + `chunk-natural-speech` (two coupled engines, see §3) |
| **Estimated lesson time** | ~6–7 min |
| **Monolingual mode / explanation language** | `english-guided` |
| **Practice Pool expansion level** | seeds-only (Build + light Stretch; no full pool) |
| **Main can-do outcome** | "I can greet someone, ask for what I want politely, recover when I'm stuck, and leave politely — in my first real French interaction." |
| **Pedagogical reason** | L1 is the learner's *first full social loop*. Before any verb architecture (être starts L2), the learner must be able to **survive a short real exchange**: open politely → make a soft request → repair a breakdown → close politely. It converts L0's single café sentence into a flexible, repeatable social routine. |

---

## 2. Prerequisite Check

> L1 follows Lesson Zero (v1 L0 "The First Step").

| Field | Value |
|---|---|
| **Assumed from L0 (carry-in)** | `chunk-bonjour`, `chunk-je-voudrais`, `noun-cafe`, `chunk-sil-vous-plait` — the L0 café order. L1 *reuses and grows* these (it does not re-teach them as new). |
| **Required prior grammar / phenomena** | None. L0 taught no grammar system; L1 also avoids grammar tables. |
| **Required prior sound / writing awareness** | Comfort hearing/reading short French chunks (L0). No rule-level pronunciation knowledge assumed. |
| **Required prior verb forms** | None as systems. `je voudrais` is known **as a fixed chunk** from L0 (its conditional nature is not yet explained). |
| **Unseen forms — allowed only as supported / recognition** | `je ne comprends pas` (negation `ne…pas` met as a whole chunk → recognition; not taught as a system). `pouvez-vous répéter ?` (vous-question → supported chunk, not conjugation). `où est …` (`est`/être appears → recognition only; être is L2). `réserver` (infinitive chain → supported chunk, not explained). `bonsoir` (parallel to bonjour → supported). **No unseen form is an unscaffolded active target.** |

---

## 3. Engine Plan

> The Step 3 brief requests **2 primary engines** for L1. Both run **full-cycle**. This is a deliberate exception to the engine-doc preference for *one* full-cycle engine early (engine §4) — justified because the two engines are not independent topics: together they are the single communicative act *"order politely."* The cost of this choice is the lesson's main budget pressure (see §15).

| Engine | Depth | Why it exists |
|---|---|---|
| **A — Social doorway** (open & close) | full-cycle | You cannot transact in French without the social frame. Greet, thank, take leave, get attention. `bonjour`/`bonsoir` · `merci`/`merci beaucoup` · `au revoir` · `excusez-moi`. Carries the *bonjour-first social contract* (culture). |
| **B — Polite request** (`je voudrais` + slot) | full-cycle | The single most generative early frame. Grows L0's fixed café line into a slot frame: `je voudrais ___`. Fillers: `un café` (carry-in), `une baguette`, `un croissant`, `un thé`. |
| **C — Rescue / repair** | short-cycle | Real exchanges break. `je ne comprends pas` + `pouvez-vous répéter ?` + `pardon`. Seeds negation (`ne…pas`) as recognition for L3. |
| **D — Light location** (`où est …`) | ambient | One useful escape hatch — `Excusez-moi, où est la gare ?` Met and lightly supported, **not** a full production target (keeps `est`/être out of active scope until L2). |

---

## 4. Opening Sentence Family

> A scene-flow, not a flat list: **entering → asking politely → changing the slot → getting stuck → recovering → leaving politely.**

| Role | Sentence | Note |
|---|---|---|
| **Anchor (open)** | `Bonjour.` | the social door |
| **Variation (time)** | `Bonsoir.` | same move, evening register |
| **Anchor (ask)** | `Bonjour, je voudrais un café, s'il vous plaît.` | the full polite request — carry-in from L0 |
| **Variation (slot)** | `Bonjour, je voudrais une baguette, s'il vous plaît.` | same frame, new slot filler |
| **Variation (action)** | `Je voudrais réserver une table.` | supported infinitive-chain filler |
| **Contrast** | `Je veux un café.` | blunt vs `je voudrais` — teaches the politeness boundary (register, not error) |
| **Stuck** | `Je ne comprends pas.` | the breakdown moment |
| **Recover** | `Pouvez-vous répéter ?` | supported repair |
| **Escape (ambient)** | `Excusez-moi, où est la gare ?` | light location, supported |
| **Close** | `Merci beaucoup, au revoir !` | polite leave |

- **Interchangeable pieces**: `je voudrais` + { `un café` / `une baguette` / `un croissant` / `un thé` / `réserver une table` }; greeting { `bonjour` / `bonsoir` }; close { `merci` / `merci beaucoup` } + `au revoir`.
- **Fixed frame**: `je voudrais ___ (, s'il vous plaît).`
- **Replaceable slots**: the object/action after `je voudrais`; the greeting; the location noun after `où est`.
- **Forbidden / not-yet-ready substitutions**: no `je suis …` (être is L2); no `tu`-register forms (tu/vous split is L3) — `salut` stays recognition-only; no conjugated verbs beyond fixed chunks; no `j'ai …` (avoir is L4).

---

## 5. Item Budget

> Planning targets, not validators (engine §7). Counts below are explicit so the pilot can judge realism.

| Tier | This lesson | Target band | Notes |
|---|---|---|---|
| **Active — new** | **9** | ~12–15 | bonsoir, merci, au revoir, excusez-moi, je ne comprends pas, pardon, `frame-je-voudrais-slot`, une baguette, un croissant |
| **Active — recycled from L0** | **4** | (counts toward reuse) | bonjour, s'il vous plaît, je voudrais, un café |
| **Active — total** | **13** | ~12–15 | within band only because 4 are carry-in reuse |
| **Supported — new** | **8** | ~10–12 | merci beaucoup, réserver une table, pouvez-vous répéter, `frame-ou-est`, la gare, un thé, `frame-cafe-order`, bonsoir↔bonjour pairing |
| **Recognition / ambient** | **12** | ~10–15 | salut, voilà, politeness-in-verb, ne…pas sandwich, CaReFuL, silent finals, é="ay", merci≈mercy, comprendre≈comprehend, répéter≈repeat, baguette faux-ami, bonjour-first culture |
| **Traps (option-only)** | **2** | — | `je veux` (blunt), `salut`-to-authority (register) |
| **Total exposure** | **~35** | ~30–45 | within band |
| **Production targets** | **5–6 sentences** | ~4–6 | café order, baguette slot-swap, "je ne comprends pas", "où est la gare ?" (supported), polite close; optional "réserver une table" |

> **Budget honesty (preview of §15):** the **active-NEW count lands at 9, below the ~12–15 band.** Forcing it to 12–15 would mean promoting fixed social chunks (`voilà`, `salut`, register variants) to active production — which would make L1 a **phrasebook**, the exact failure mode the engine warns against. The pilot recommends the band read **~8–12 active-new for a social-survival L1**, not 12–15. See §15.

---

## 6. Item Tables

> Shared columns: label · canonical ID (placeholder) · learner meaning · status · first-seen/reused · Mon Lexique behavior · review hook · weak-point tag. Canonical-ID convention is **not locked** (§17); IDs reuse the existing `itemRegistry` where present (bonjour/je-voudrais/café/s'il-vous-plaît) and are placeholders otherwise.

### 6.1 Chunk items (active)

| Label | Canonical ID | Meaning | Status | First seen / reused | Mon Lexique | Review hook | Weak-point |
|---|---|---|---|---|---|---|---|
| Bonjour | `chunk-bonjour` | hello (daytime) | active (recycled) | L0 → reused | update (where-used+1) | +1d, +7d | — |
| Bonsoir | `chunk-bonsoir` | good evening | active (new) | L1 | new | +1d, +3d | register/time |
| Merci | `chunk-merci` | thank you | active (new) | L1 | new | +1d, +3d | — |
| Au revoir | `chunk-au-revoir` | goodbye | active (new) | L1 | new | +1d, +3d | silent-finals |
| Excusez-moi | `chunk-excusez-moi` | excuse me (attention) | active (new) | L1 | new | +1d, +7d | politeness |
| S'il vous plaît | `chunk-sil-vous-plait` | please (formal) | active (recycled) | L0 → reused | update | +3d | politeness, elision |
| je voudrais | `chunk-je-voudrais` | I would like | active (recycled) | L0 → reused | update | +1d, +7d | politeness, conditional-softness |
| Je ne comprends pas | `chunk-je-ne-comprends-pas` | I don't understand | active (new) | L1 | new | +1d, +3d | negation |
| Pardon | `chunk-pardon` | sorry / excuse me | active (new) | L1 | new | +7d | — |

### 6.2 Sentence frames

| Label | Canonical ID | Meaning | Status | Fixed part | Slot(s) | Allowed fillers |
|---|---|---|---|---|---|---|
| polite-request frame | `frame-je-voudrais-slot` | "I would like ___" | active (new) | `je voudrais` | object/action | un café, une baguette, un croissant, un thé, réserver une table |
| café-order composite | `frame-cafe-order` | full polite order | supported (new) | `Bonjour, je voudrais ___, s'il vous plaît.` | object | café / baguette / croissant |
| location question | `frame-ou-est` | "where is ___?" | supported (new) | `où est ___ ?` | place noun | la gare (+ recognition: la station, les toilettes) |

### 6.3 Word items (nouns)

| Label | Canonical ID | Meaning | Status | Gender | First seen / reused | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|---|
| café | `noun-cafe` | coffee / café | active (recycled) | m (un) | L0 → reused | update | gender, articles |
| baguette | `noun-baguette` | baguette | active (new) | f (une) | L1 | new | gender, articles |
| croissant | `noun-croissant` | croissant | active (new) | m (un) | L1 | new | gender |
| thé | `noun-the` | tea | supported (new) | m (un) | L1 | new | gender, accent |
| gare | `noun-gare` | station | supported (new) | f (la) | L1 | new | gender |

### 6.4 Supported chunks

| Label | Canonical ID | Meaning | Status | First seen | Mon Lexique | Weak-point |
|---|---|---|---|---|---|---|
| Merci beaucoup | `chunk-merci-beaucoup` | thank you very much | supported (new) | L1 | new | silent-finals (-p) |
| réserver une table | `chunk-reserver-une-table` | to book a table | supported (new) | L1 | new | infinitive-chain |
| Pouvez-vous répéter ? | `chunk-pouvez-vous-repeter` | can you repeat? | supported (new) | L1 | new | vous-register |

### 6.5 Grammar / phenomenon tags (recognition — insight, not drilled)

| Label | Canonical ID | Insight | Status | Future expansion |
|---|---|---|---|---|
| Politeness lives in the verb | `grammar-politeness-in-verb` | `je voudrais` (polite) vs `je veux` (blunt) — the verb form carries politeness | recognition | vouloir / conditionnel (later) |
| The `ne…pas` sandwich | `grammar-ne-pas-sandwich` | negation wraps the verb: `ne … pas` | recognition | full negation **L3** |

### 6.6 Sound / writing tags (recognition)

| Label | Canonical ID | Fact | Status |
|---|---|---|---|
| CaReFuL rule | `sound-careful-rule` | final C, R, F, L are usually pronounced | recognition |
| Silent finals | `sound-silent-finals` | most other final consonants are silent | recognition |
| é = "ay" | `sound-accent-e-acute` | the acute accent marks the sound (café, répéter) | recognition |

> The liaison/sound-bridge `vous-z-êtes` is **deferred to L2** (it belongs to être). Legacy `lesson1.ts` itself says "You'll meet this more in Lesson 2."

### 6.7 Trap tags (option text only — no production target)

| Label | Canonical ID | Distractor for | Trap reason |
|---|---|---|---|
| je veux | `trap-je-veux` | `je voudrais` | grammatically fine but blunt; teaches register, not "wrong" |
| salut (to authority) | `trap-salut-formal` | `bonjour` | informal; wrong register with a stranger/boss |

### 6.8 Cognate / root / sound-bridge items (recognition — insight layer, **not** the backbone)

| Label | Canonical ID | Bridge | Status |
|---|---|---|---|
| merci ≈ mercy | `cognate-merci-mercy` | shared Latin root | recognition |
| comprendre ≈ comprehend | `cognate-comprendre-comprehend` | com + prehendere | recognition |
| répéter ≈ repeat | `cognate-repeter-repeat` | repetere | recognition |
| au revoir ≈ review | `cognate-revoir-review` | re + voir | recognition |

### 6.9 Faux ami / culture items (recognition)

| Label | Canonical ID | Note | Status |
|---|---|---|---|
| baguette (false friend) | `faux-ami-baguette` | also wand / baton / chopsticks, not only bread | recognition |
| bonjour-first | `culture-bonjour-first` | greeting first is a social contract, not optional | recognition |

> **Demoted / cut from legacy `lesson1.ts` (flagged in §15):** `comme ci, comme ça` is **cut** (a "ça va ?" response — belongs to a later social-check lesson, out of L1 scope). The heavy pronunciation block (CaReFuL + accents + silent finals) is **demoted to recognition insight**, not production content. `salut` stays **recognition-only** (tu-register → L3).

---

## 7. Continuity Map

| Field | Value |
|---|---|
| **Carry-in from recent (L0)** | `bonjour`, `je voudrais`, `un café`, `s'il vous plaît` — the L0 café order, reused and grown into a slot frame. |
| **Carry-in from foundation** | none (L1 is the first full lesson). |
| **New items introduced** | bonsoir, merci(+beaucoup), au revoir, excusez-moi, je ne comprends pas, pardon, pouvez-vous répéter, `frame-je-voudrais-slot`, `frame-ou-est`, baguette, croissant, thé, gare, réserver une table. |
| **Carry-out to next lessons** | see transformation plan below. |
| **Fade plan** | café order: was *anchor-taught* in L0 → *recycled-active* in L1 → *expected* (assumed) from L2. `je voudrais` frame: active here → expected from L2. |
| **Expected-production point** | greetings + polite close + `je voudrais ___` assumed unprompted from L2 onward and in Daily Review. |

**Transformation plan (carry-out):**

| Carried item | Transforms into | Lands in |
|---|---|---|
| `je voudrais` | `je voudrais être médecin` (identity) | **L2 être** |
| `je voudrais` | `je voudrais avoir un chien` (possession) | **L4 avoir** |
| `je ne comprends pas` | productive `ne … pas` negation | **L3 negation** |
| `bonjour` / `excusez-moi` / vous | tu-vous register split, yes/no | **L3** |
| `où est …` | `est` → être present system | **L2** |
| `un café` / `une baguette` | un/une → full article + gender system | **L5 articles** |

**Transformation types used (engine §9):** ☑ same frame / new slot · ☑ register / naturalness shift (je voudrais vs je veux) · ☑ negation (recognition seed) · ☐ new subject · ☐ question (only as fixed chunk) · ☐ article/gender change (recognition seed) · ☐ verb chain (supported chunk only) · ☐ tense doorway (chunk only) · ☐ pronoun insertion.

> **Principle check** (engine §8): introduces new (social close + rescue + location) ✓ · grows old (L0 café order → flexible frame) ✓ · prepares future (être/negation/avoir/articles seeds) ✓.

---

## 8. Tense / Aspect / Mood Doorway

> For L1: forms appear **as chunks / recognition only**. No grammar systems opened.

| Form | Status here | Chunk or grammar system? | Future lesson that expands |
|---|---|---|---|
| **conditionnel** | recognition (via `je voudrais`) | **chunk only** | vouloir / conditionnel (later) — *do not teach as a system in L1* |
| **infinitive chain** | supported (via `je voudrais réserver`) | **chunk only** | infinitive constructions (later) — *do not over-explain in L1* |
| **present** | recognition (via `comprends`, `pouvez`, `est`) | fixed chunks only | **L2** (être) and beyond |
| **negation** (`ne…pas`) | recognition (via `je ne comprends pas`) | met whole | **L3** |

> Explicitly **not** taught in L1: conditional as a system, infinitive-chain mechanics, any conjugation paradigm.

---

## 9. Exercise Flow Mapping

| Section | Purpose | Input used | Learner action | Expected output | Feedback style | Offline |
|---|---|---|---|---|---|---|
| **Meet It** | First social door | `Bonjour.` / `Bonsoir.` (TTS) | listen, read | recognition | passive mirror | ✓ |
| **Notice the Pieces** | See greeting + request + close as separable | café-order sentence with highlights | tap pieces | identify slots | neutral | ✓ |
| **Why This Works** | Politeness lives in the verb | `je voudrais` vs `je veux` micro-contrast | read insight | recognition | none (insight) | ✓ |
| **Try It** | Fill the soft request (traps) | `Bonjour, je voudrais ___.` | choose `un café` over `merci`/`je veux` | supported production | reveal + reason | ✓ |
| **Weave It** | Build the full order with pieces given | café-order composite | assemble | supported production | model-answer reveal, accepted alternatives | ✓ |
| **Shape It** | Swap the slot | `je voudrais ___` + new filler | produce baguette/croissant order | active production (transform) | passive mirror | ✓ |
| **Say It Your Way** | Free polite request in a scene | "You enter a bakery in the morning…" | free write/say | active production | model-answer-only (no AI in L1) + natural alternatives | ✓ (model-answer-only) |
| **Natural Reveal** | Show why it's natural + alternatives + register | learner's attempt | read reveal | recognition | natural upgrade, register note | ✓ |
| **Stay With It** | Light retrieval of the social loop | mixed prompts (greet/ask/stuck/close) | recall | active/supported | passive mirror | ✓ |
| **Lesson End** | Calm close, name the win | recap card | read | — | passive mirror ("You handled a real exchange.") | ✓ |

> Feedback stays neutral/passive-mirror throughout. **No AI in L1** (Say It Your Way is `model-answer-only`, matching L0). TTS reads French only; never reads placeholders or option labels.

---

## 10. Natural Reveal / Feedback Plan

**Café order (primary production):**
- **Expected target**: `Bonjour, je voudrais un café, s'il vous plaît.`
- **Acceptable alternatives**: `Bonjour, un café s'il vous plaît.` (casual); unaccented `cafe` / `plait`; comma-optional variants.
- **Natural upgrade**: full form leans formal; short form leans casual — both fine.
- **Register note**: `je voudrais` > `je veux` with a stranger.
- **Common mistakes**: omitting `bonjour`; using `je veux`; ordering before greeting.
- **"Take another look" hint**: "You named the coffee — add the greeting first; in France the order starts with `bonjour`."
- **Weak-point tags**: `politeness`, `articles`.
- **Passive mirror**: "You ordered politely, the French way."

**Slot swap (baguette/croissant):**
- **Expected**: `Bonjour, je voudrais une baguette, s'il vous plaît.`
- **Alternatives**: `un croissant`, casual short form.
- **Common mistakes**: `un baguette` (gender). **Hint**: "baguette is *une* — feminine."
- **Weak-point**: `gender`.

**Rescue:**
- **Expected**: `Je ne comprends pas.` / `Pouvez-vous répéter ?`
- **Alternatives**: `Pardon ?` (short repair).
- **Common mistakes**: dropping `ne` or `pas`. **Hint**: "Negation comes in two parts that hug the verb: `ne … pas`." (recognition only — not corrected harshly).
- **Weak-point**: `negation`.

**Location (supported):**
- **Expected**: `Excusez-moi, où est la gare ?`
- **Register note**: `excusez-moi` softens the interruption.
- **Passive mirror**: "You asked for help politely."

**Close:**
- **Expected**: `Merci beaucoup, au revoir !`
- **Passive mirror**: "You closed the way locals do."

---

## 11. Practice Pool Seeds

> Seed formats only — no full pool (engine §13).

| Seed type | Examples |
|---|---|
| **Build** | arrange tiles: `Je / voudrais / un / café` ; `Merci / beaucoup` ; `Au / revoir` |
| **Stretch** | slot-swap the order: "order a baguette / a tea politely" |
| **Challenge** | full scene from a prompt: "greet, order, get stuck, recover, leave" |
| **Listening traps** | `bonjour` vs `bonsoir` (time) ; `merci` vs `mercredi` (sound) ; `salut` (register flag) |
| **Repair items** | re-practice `je ne comprends pas` / `pouvez-vous répéter ?` |
| **Transformation items** | `je voudrais un café` → `je voudrais une baguette` (slot) ; `je voudrais` → `je veux` register contrast |

---

## 12. Daily Review Hooks

| Hook | Items |
|---|---|
| **Next-day (+1d)** | bonjour, je voudrais, merci, je ne comprends pas |
| **3-day (+3d)** | bonsoir, merci beaucoup, café-order composite, au revoir |
| **7-day (+7d)** | excusez-moi, où est la gare, pardon, frame-je-voudrais-slot |
| **Old-engine return** | L0 café sentence resurfaces inside L1's social loop |
| **Weave review hook** | "Hello, I don't understand. Where is the station?" (mix known FR + English), reusing bonjour/comprends/où est |

> Daily Review draws only from reached lessons; calm offer, never streak/pressure language.

---

## 13. Mon Lexique Output

> Mon Lexique = learner-facing memory of the engine, **not** a separate dictionary (engine §14). Entries below carry rich metadata internally; the learner sees only the simple surface. **No matrix codes / IDs shown to the learner.**

| Entry | Learner-facing meaning | Where-used examples | Related pieces | Mastery event | Review hook | Word Graph edge (placeholder) |
|---|---|---|---|---|---|---|
| **bonjour** | hello (daytime) | "Bonjour, je voudrais un café." | bonsoir, salut, au revoir | reused → strengthened | +1d | greeting↔bonsoir; opens→je voudrais |
| **je voudrais** | I would like (polite) | "Je voudrais un café / une baguette." | s'il vous plaît, je veux (contrast) | grew L0→frame | +1d,+7d | request→{café,baguette}; →vouloir(future) |
| **s'il vous plaît** | please (formal) | "…un café, s'il vous plaît." | merci, vous-register | reused | +3d | politeness↔merci |
| **un café** | a coffee | "je voudrais un café" | une baguette, un croissant | reused | +3d | object-of→je voudrais; un/m gender |
| **une baguette** | a baguette | "je voudrais une baguette" | un café, un croissant | new | +3d | object-of→je voudrais; une/f; faux-ami |
| **je ne comprends pas** | I don't understand | "Je ne comprends pas." | pouvez-vous répéter, pardon | new | +1d,+3d | rescue↔répéter; seeds ne…pas |
| **pouvez-vous répéter ?** | can you repeat? | "Pouvez-vous répéter ?" | je ne comprends pas | new (supported) | +3d | rescue pair |
| **excusez-moi** | excuse me (attention) | "Excusez-moi, où est la gare ?" | pardon, où est | new | +1d,+7d | opens→où est; politeness |
| **merci / merci beaucoup** | thank you / very much | "Merci beaucoup, au revoir !" | au revoir, s'il vous plaît | new | +1d,+3d | close↔au revoir; merci≈mercy |
| **au revoir** | goodbye | "Merci beaucoup, au revoir !" | merci, bonjour | new | +3d | close; ≈review(root) |
| **(recognition) bonsoir** | good evening | "Bonsoir." | bonjour | recognition | +3d | greeting/time |
| **(recognition) salut** | hi (informal) | — | bonjour | recognition (register-flagged) | — | greeting/register→L3 |
| **(recognition) voilà** | here you go | "Voilà, monsieur." (waiter) | — | recognition | — | service phrase |
| **(recognition) la gare** | the station | "où est la gare ?" | où est | recognition | +7d | place-of→où est |

---

## 14. QA Checks

| Check | Verdict |
|---|---|
| Begins with a usable human moment? | ✅ first real exchange, not a word/rule |
| Sentence family, not one sentence? | ✅ 10-sentence scene-flow (§4) |
| Active / supported / recognition separated? | ✅ §5–§6 explicit |
| Every production item prerequisite-safe? | ✅ all rest on L0 carry-in or given input |
| Unseen forms supported/recognition only? | ✅ ne…pas, vous-question, est, réserver all scaffolded |
| Grows ≥ 2–3 older engines? | ⚠️ only **L0 exists** to grow; it grows the L0 café order thoroughly, but "2–3 older engines" is structurally impossible at L1 — flagged §15 |
| Avoids too many full-cycle engines? | ⚠️ **2 full-cycle** (A + B), deliberate exception (§3) — at the budget edge, flagged §15 |
| ≥ 1 meaningful production moment? | ✅ café order + slot swap + Say It |
| Mon Lexique-compatible metadata? | ✅ §13 |
| Practice Pool + Daily Review hooks? | ✅ §11–§12 |
| No streak/XP/reward language? | ✅ passive mirror throughout |
| Le Mot tone preserved? | ✅ calm, neutral on mistakes, premium |

**Explicit concern flags:**
- **Too many active items?** No — *opposite*: active-new is 9, *below* the 12–15 band. Hitting 12–15 would force phrasebook bloat.
- **Too travel-survival heavy?** Borderline. Social + request + rescue + location is a lot of *domains* for one lesson. Mitigated by keeping location ambient and rescue short-cycle.
- **Too phrasebook-like?** Risk present (the legacy lesson is a phrasebook). Mitigated by the `je voudrais ___` **frame** (generative, not memorized) and by demoting greetings-list/pronunciation-rules to recognition.
- **Enough production?** Yes — 5–6 production targets including a real transform (slot swap).
- **Enough continuity?** Carry-*out* is strong (seeds L2/L3/L4/L5). Carry-*in* is limited to L0 (unavoidable at L1).
- **Mon Lexique too technical?** No — learner surface kept simple; rich metadata internal only.
- **Unseen-form risk?** Low — every unseen form is recognition/supported, none is an unscaffolded active target.

---

## 15. L1 Pilot Findings

**Does the template work?** Yes. All 14 sections filled without structural gaps. The item tables, continuity map, and Mon Lexique sections were the most valuable — they forced the L0/L1 overlap and the être-deferral to surface explicitly rather than hide. The template is fit for syllabus work.

**Is the item budget realistic?** **Partly — one band needs revision.**
- The **active-NEW band of ~12–15 is too high for a social-survival lesson.** Social survival is built from many small *fixed chunks*; pushing 12–15 of them to active production turns the lesson into a phrasebook (the engine's named failure mode). This lesson lands at **9 active-new + 4 recycled-active = 13 active total**, which feels right.
- **Recommendation:** soften the engine/template early-lesson band to **~8–12 active-new**, OR add a note that *chunk-dense* lessons legitimately sit at the low end. Total-exposure (~30–45), supported (~10–12), and recognition (~10–15) bands all held well.

**Which parts were too heavy?**
- **Two full-cycle engines** (Social doorway + Polite request) is the budget's stress point. Justified here because they form one act, but it confirms the engine's "ideally one full-cycle" guidance is the right default — L1 is an *exception*, not a template.
- **Domain spread** (greet + request + rescue + location) is wide. Keeping location *ambient* and rescue *short-cycle* was necessary to stay calm.
- The **legacy `lesson1.ts` is overloaded**: 4 greetings, a full pronunciation-rules block (CaReFuL/accents/silent-finals), 3 expressions, 2 grammar nuggets, faux-ami, culture bite, plus gare/baguette/croissant/table. This spec **demotes** the pronunciation block to recognition, **cuts** `comme ci, comme ça`, and holds `salut`/`voilà` at recognition — otherwise L1 blows the budget.

**Which parts should be simplified before L2–L5?**
- The **L0↔L1 boundary is now decided** (see Canon Alignment Note): L0 is a short onboarding taste, L1 deliberately expands it. So the café order is *carry-in/review* in L1, not equal-weight re-teaching — keep it that way in the implementation.
- For L2–L5, **one full-cycle engine each** should be the rule; L1's two-engine shape should not be copied forward. **L2 = Être** is the next spec.

**Changes needed to `lesson-spec-template-v1.1.md`?** Two small patches — **now applied** in this review step:
1. **§6 Item Budget** — added a clarification that chunk-dense social/survival lessons may sit at ~8–12 active-new, and must not inflate active counts with fixed social phrases (Patch B).
2. **§15 / §16 QA Checks** — softened *"grows at least 2–3 older engines"* to grow *available prior engines* (L1 expands L0; later lessons target 2–3 older-engine returns unless justified) (Patch C).

**The product decision — now RESOLVED (canon, locked this step):**
> **v1 L1 = Survival Kit; L2 = Être** (see Canon Alignment Note). L0 → L1 is deliberate expansion, not duplication. The committed v1 sandbox `lesson-001.ts` ("Je suis") content belongs at **L2** under this decision; **re-slotting it is a future content-alignment task to be done after the Dev APK smoke test, not now.** This spec makes no runtime change. → carried into §16 as a future action, not an open question.

---

## 16. Open Decisions

**Decided / locked this step** (no longer open):

- ✅ **v1 syllabus spine** — L0 onboarding taste → **L1 Survival Kit** → **L2 Être**. L0→L1 is deliberate expansion, not duplication. (Canon Alignment Note.)
- ✅ **L0 ↔ L1 café-order boundary** — L0 = short taste; L1 = full expansion treating the café order as carry-in/review.
- ✅ **Active-new budget band for chunk-dense lessons** — ~8–12 active-new acceptable; template §6 updated (Patch B).

**Future action (after smoke test — not now):**

- 🔜 **Re-slot committed v1 content** — `content/lessons/v1/lesson-001.ts` ("Je suis") moves to L2; a new L1 runtime lesson realizes this Survival Kit spec. Runtime/content task, post-smoke. No code change in this step.

**Still genuinely open:**

- **Canonical ID naming convention** — placeholders used here (`chunk-au-revoir`, `frame-je-voudrais-slot`, …); not locked (inherited from engine §17).
- **Item counting method** — whether a frame + its fillers counts as one item or several.
- **`salut` / tu-register timing** — held at recognition here, expanded L3; confirm.
- **Mon Lexique surfacing** — when L1's entries become visible to the learner (Dev APK hides Mon Lexique).

---

*End of L1 Survival Kit pilot spec. Planning canon only — authorizes no code, content, flag, or runtime change. The Dev APK smoke test remains the boundary before any runtime work.*
