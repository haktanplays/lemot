# Pool Generation Principles

Reference for producing `poolN.ts` (Practice-tab exercise pools) for lessons N = 2–24.
Captured from Pool1 generation mistakes and the corrections applied 2026-04-16.

## The One Rule (Weave pattern)

**The BLANK ANSWER must be a word the lesson has taught.** The rest of the
sentence can be anything — English context, non-lesson French, cognates.

```ts
// GOOD — user produces French word they learned this lesson
{ s: "[___], I'd like a coffee.", a: "Bonjour", o: ["Bonjour", "Merci", ...] }

// BAD — user produces an English word (teaching English to English speakers)
{ s: "There you [___]!", a: "go", o: ["go", "are", "is", ...] }

// BAD — user produces French word from a later lesson
{ s: "I don't [___] French.", a: "parle", o: [...] }   // "parle" = L18 conjugation
```

## Who must produce what

| Pool array | User action | Rule for answer words |
|------------|-------------|----------------------|
| `fillFG`, `fillBlanks` | Picks word to fill blank | Must be lesson vocab |
| `quiz` | Picks MCQ option | Option text can be anything — recognition, not production |
| `build` | Assembles provided words into sentence | Words shown on screen → exposure OK |
| `combine` | Types whole French sentence from English hint | Every word in `answer` must be lesson vocab |
| `weave` | Types French for words in `known[]`, English for rest | Every word in `known[]` must be lesson vocab |
| `review` type `fill_ctx`, `scramble` | Produces word | Must be lesson vocab |
| `review` type `listen`, `context`, `odd`, `match` | Recognition | Anything OK |

## Exposure words (non-L1 French in the sentence)

Non-lesson French words **may appear** in:
- Sentence surroundings (for realism)
- Distractor options (wrong MCQ choices — user learns by rejecting)
- `ctx` (situational description, English)

They must **not** be the correct answer the user produces.

When such words appear, add them to `data/exposureGlossary.ts` so the
Practice tab shows translations below the sentence. New lessons will
reuse the same dictionary.

## Pool1 mistakes, concretely

What went wrong the first time:

1. **English-answer blanks** (`"go"`, `"everything"`, `"kind"`, `"evening"`, `"find"`)
   → Teaching English vocabulary to English speakers. Meaningless exercise.

2. **Out-of-lesson French answers** (`parle`, `gentil`, `quatre`, `trois`,
   `pharmacie`, `annonce`, `français`, `changer`, `addition`, `rejoindre`)
   → User forced to produce vocabulary the curriculum hasn't introduced yet.

3. **`known[]` leaking later vocabulary** in weave items — same issue, weave
   requires user to write that word in French.

4. **`ctx` as translation crutch**: original L1 had `"In French this would be
   'Voilà!'"` as ctx while the blank was "go" in English — a confession the
   exercise wasn't teaching French.

## Generation checklist (apply before saving)

Before committing a new pool file, verify:

- [ ] Every `a:` value is in the lesson's vocabulary (check `lessonN.ts`).
- [ ] For multi-blank items, every word in `blanks:` array is lesson vocab.
- [ ] For `combine`: every word in `answer` is lesson vocab.
- [ ] For `weave`: every word in `known:` array is lesson vocab.
- [ ] For `review` fill_ctx / scramble: answer is lesson vocab.
- [ ] No blank answer is an English word.
- [ ] Any non-lesson French word that appears in sentences/options is in
      `exposureGlossary.ts` (add if missing).
- [ ] Typecheck passes: `npx tsc --noEmit`.

## Item count targets (per lesson)

Match Pool1 sizing to keep Practice variety consistent:

| Array | Count | Difficulty mix |
|-------|-------|---------------|
| `examples` | 20 | easy / medium / hard graduated |
| `fillFG` (Weave) | 50 | 15 easy / 15 medium / 10 hard / 5 expert / 5 full-French |
| `fillBlanks` (all-French) | 45 | 15 easy / 15 medium / 10 hard / 5 faux-amis |
| `quiz` | 45 | varied formats (mcq / truefalse / order) |
| `build` | 20 | graduated |
| `combine` | 18 | graduated |
| `weave` | 12 | short / long |
| `review` | 50 | 10 listen / 10 context / 8 fill_ctx / 8 odd / 6 weave / 4 match / 4 scramble |

Total per lesson: **~260 items**.

## Prompt template for AI generation

If generating via LLM, include these rules explicitly:

```
You are creating Lesson N practice exercises for LE MOT (French-learning app).

LESSON N VOCABULARY (you may use these as blank answers):
<paste lesson.vocabulary and lesson.expressions from lessonN.ts>

HARD CONSTRAINTS:
1. Every `a:` field and every word in `blanks:` / `known:` arrays MUST be
   in the vocabulary list above. No exceptions.
2. Never use an English word as a blank answer. Blanks always produce French.
3. Sentences may contain English context and French loan words freely, but
   the word the user *produces* must be lesson vocabulary.
4. For distractor options (non-answer slots): any plausible French word is OK.
5. Match the item-count targets in POOL_GENERATION.md.
6. Keep ctx fields as real-world situations (English, 1 sentence), not
   translations of the French blank.
```
