# V4-B → Cairn: the shared-primitive map

**Status:** pass 1 of the migration is in the codebase. This document is the
measured mapping it was made from, and the record of what was deliberately left
for later.

**Rule this pass followed:** migrate through shared primitives, not screen by
screen. A screen-by-screen adoption produces two palettes living at once and a
long tail of half-migrated surfaces; the product looks like two products for as
long as the migration takes.

---

## The map

| V4-B element | Cairn shared primitive | Verdict | Notes |
|---|---|---|---|
| Page ground `--bg #FAFAF7` | `P.bg` | **adapted** | Value moved, name kept. Every surface already read `P.bg`, so the whole product moved together. |
| `--ink #0E1116` | `P.ink` | **adapted** | Warm near-black → cool near-black. |
| `--ink-2 #494E58` | `P.ink2` | **adapted** | Darker *and* cooler. Body-secondary contrast on the page rises from about 5.1:1 to about 8:1 — the one part of this that is an accessibility change, not a taste one. |
| `--mute #9CA0A8` | `P.ink3` | **adapted** | Contrast unchanged; it is the label/meta ink in both. |
| `--rule rgba(14,17,22,0.07)` | `P.border` | **adapted** | Flattened to `#EDEEEF`. React Native composites a translucent border against whatever is behind it, and these hairlines sit over both `bg` and `paper`. |
| `--surface #FFFFFF` | `P.paper` | **reuse** | Identical already. |
| `--halo #F0EEE7` | `P.halo` (new) | **new** | Named, not yet used. The hero pool it grounds is not converted. |
| `--accent #2E4A7A` | `P.accent` (new) | **new, partially adopted** | Used by the new primitives where V4-B uses it. **Not** applied to the progression action — see *Held back*. |
| Kicker (10px / 0.18em / uppercase) | `Kicker` (new) | **new, fully adopted** | Replaced 29 hand-rolled label styles across three dialects (`letterSpacing` 0.3, 0.4 and 1). |
| Kicker + meta on one baseline | `KickerRow` (new) | **new, not yet used** | Shipped because `Kicker`'s `tone` rule only makes sense as a pair; no converted surface needs the meta yet. |
| Hairline anchor block | `AnchorBlock` (new) | **new, adopted on the Journey** | Replaces card-with-radius-and-border. Owns no horizontal padding — see *Divergences*. |
| Button `13×18 / r14` | `RADIUS.action` + `actions.tsx` | **adapted** | Radius taken (12 → 14). Label size **not** taken — see *Divergences*. |
| Progress rule (2px, square, accent) | — | **obsolete for now** | Written, then cut: the only candidate caller is the legacy Daily Review card, whose conversion is behaviour as well as typography. A primitive with no caller is a guess about a surface nobody has converted. |
| Mono numerals (JetBrains Mono) | — | **available, not adopted** | `assets/fonts/SpaceMono-Regular.ttf` is already in the repo and is *not* loaded. One line in `app/_layout.tsx` would buy the stage/lesson numerals. Held because no converted surface needs them yet. |
| Fraunces / Instrument Serif | `frenchSerif()` | **reuse, with a finding** | Cairn loads `Newsreader` in `app/_layout.tsx` and then **never uses it**: `frenchSerif()` sets `fontFamily: "serif"`, the platform default. Pre-existing, not touched here, and worth its own decision. |
| Varied trail indents (0/14/4/24/10) | — | **deferred** | A Journey-list change, not a primitive. |
| Asymmetric page padding (`52 22 18`, `28 70 16 22`) | `SPACE` | **deferred** | Cairn pages inset at 20 (`SPACE.xl` / `px-5`); V4-B uses 22. A two-point difference is churn on its own, and the asymmetry it belongs to needs the pages to go full-bleed first. |

---

## What changed on screen

Priority surfaces from the brief, and where each stands:

1. **Lesson shell** — `part n of m` is a `Kicker`. Frame geometry unchanged.
2. **Goal / milestone** — not converted.
3. **Active exercise** — Weave's target label and Say It Your Way's title are `Kicker`s.
4. **Explanation / noticing / interlude** — Insight, Pattern Reel, Showcase cluster labels, Showcase *Look Closer* (Sound / Writing / Cognate / Notice / Structure / Usage / Compare / In depth) are all `Kicker`s.
5. **Natural Reveal** — "A natural version" and the note kickers are `Kicker`s.
6. **PieceChip / detail** — Mon Lexique entry detail's four labels are `Kicker`s.
7. **Recap** — "A small recap" is a `Kicker`.
8. **Journey anchor / Continue state** — **converted**. Both offers were paper cards with a 1.5px red-tinted border and a 16px radius; they are now hairline anchor blocks on the page ground. The accent goes to exactly one of them: a lesson already open outranks the next one to open, so *Where you left off* takes it when it exists and *Your next step* takes it otherwise.
9. **My French** — section labels are `Kicker`s.

Also migrated: orientation, Mon Lexique bands, Context Cards set labels, Practice Hub, Privacy & data.

---

## Held back, deliberately

**The accent is not the button.** V4-B's primary action is navy `#2E4A7A`; Cairn's is brick red `#C0392B`. Swapping it here would restyle every primary action, both feedback bands and the piece chips in a commit whose subject is tokens — including the pale pink `PieceChip` accepted two commits ago. It is its own decision, and it is pinned in the tests so that when it happens it happens on purpose.

**Not re-skinned:** the legacy v7 lesson route (`app/lesson/[id].tsx`, `components/sections/**`, the Practice and Stats tabs), and the learning-engine renderer shell, which is reachable only from `app/learn/[fixtureId].tsx` — a fixture harness, not a screen. The exclusion list is pinned in `scripts/tests/v4bPrimitives.test.ts` with its reasons, and pinned by length, so adding to it is a visible edit rather than a quiet one.

---

## Divergences from the design, and why

- **`AnchorBlock` has no horizontal padding.** In V4-B the rules run edge to edge, which only works on a page that does not inset its own content. Cairn's pages do inset today. A block that padded again would sit its rules two gutters in and read as a *narrower card* — the exact thing the design removes. Leaving the horizontal to the page reads correctly in both, and a page that later goes full-bleed gets the design's version for free.
- **The primary action keeps its 15px label.** V4-B's button is 13px with the label left and an arrow right; Cairn's is centred and full width, where 13px reads as weak. The radius transfers; the type does not.
- **One brand tag keeps its own spacing.** The Weave badge is the mechanic's *name* on an inked pill, not a section label, and the primitive would upper-case it. "Weave" is what the founder called this. Named as a single exception in the guard rather than pattern-matched.

---

## Next, in order

1. Convert the Daily Review card to an anchor block (kicker + meta + serif line + action). This is the remaining large box on the Journey, and it brings `ProgressRule` and `KickerRow` their first callers.
2. Decide the accent: navy progression action, or brick red kept as Cairn's own.
3. Take the pages full-bleed so anchor blocks reach the edges, then the asymmetric padding and the varied trail indents.
4. Load `SpaceMono` and give the stage / lesson numerals the design's mono.
5. Settle `Newsreader`: use it in `frenchSerif()` or stop loading it.

**Not claimed:** none of this has been seen on a device. No APK was built and no device validation was performed in this pass; every statement above is about source and about the rendered geometry it specifies.
