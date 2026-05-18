# Le Mot — Claude Skills Master Pipeline v1.2.1 (Cloud-Adapted)

> Amaç: Claude Code içindeki 1500+ skill'i doğrudan kullanmaya çalışmak yerine, Le Mot için akışkan, güvenli ve tekrar edilebilir bir geliştirme sistemi kurmak.
>
> Temel prensip: **Canon önce gelir. Skill sonra gelir. Kod en son gelir.**
>
> v1.2.1 polish: v1.2 üzerine path standardı netleştirildi, task-vs-workstream cümlesi düzeltildi, Test Checklist path'i eklendi, mempalace çift kayıt önlendi, `/gsd:progress` session bootstrap'a taşındı ve default executor prompt'una Operator blocker uyarısı eklendi.
>
> **Cloud-adapted copy.** This is the repo-contained version of v1.2.1, rewritten so Claude Code Cloud sessions can follow it without local `~/Desktop`, Obsidian, mempalace, or local-only `~/.claude` dependencies. The local-machine original may still live at `~/Desktop/Le Mot .md/MASTER_PIPELINE_v1.2.1.md`; if the two diverge, the repo copy wins for any session running in cloud / CI / web.

---

## Cloud Mode Addendum (read first)

This addendum overrides any conflicting instruction later in the document **when the session is running in Claude Code Cloud / Web / CI**, i.e. anywhere without local-machine access to the operator's home directory, Obsidian vault, or locally-installed Claude skills/MCP servers.

### What changes in cloud

1. **Obsidian sync is operator-only.** Cloud sessions must not attempt to read or write any `~/Desktop/...` or `~/Desktop/ObsidianVault/...` path. Treat such paths as references for the operator to action later, not as live sources.
2. **Mempalace sync is operator-only.** Cloud sessions must not call `mempalace_check_duplicate`, `mempalace_add_drawer`, `mempalace_kg_add`, or any other mempalace MCP tool. They are not connected in cloud.
3. **GSD commands are local-only unless explicitly present.** `/gsd:progress`, `/gsd:plan-phase`, `/gsd:execute-phase`, `/gsd:verify-work`, `/gsd:ship`, `/gsd:new-project`, `/gsd:new-milestone`, `/gsd:session-report`, `/gsd:pause-work` must not be assumed available. If a GSD command is not listed in the session's available-skills list, skip it and emit the equivalent content as plain markdown in the final report.
4. **Missing skills fall back to plain reasoning.** Any skill referenced in §4 / §6 / §7 that is not in the current session's skill list must be replaced by direct reasoning, and the substitution must be noted in the final report under "Skill substitutions". Do not silently skip the step.
5. **Cloud emits a Sync Queue, not Obsidian/mempalace writes.** Every durable decision, archive reclassification, or canon update that would have triggered Obsidian/mempalace work in §P.6/§P.7 must instead be appended to `docs/CLOUD_SYNC_QUEUE.md` using the template in that file. The operator drains the queue later.
6. **EAS, Supabase dashboard, secrets, APK rebuild, and physical Android smoke test are Operator-only.** Cloud sessions never run `eas build`, never push EAS env vars, never deploy Supabase Edge Functions, never write Supabase secrets, never install an APK, never touch a physical device. Cloud may prepare checklists and command stubs; Operator executes.
7. **Cloud must not mark a sprint, milestone, or release as complete while Operator blockers remain open.** Code-side readiness is reportable as "code-side ready, awaiting operator". A release is not "done" in cloud.
8. **GitHub access is via the `mcp__github__*` MCP tools only.** `gh` and `hub` CLIs are unavailable. Anywhere in this document that implies `gh pr create`, `gh issue ...`, or similar, substitute the corresponding `mcp__github__*` tool.
9. **Final report must include "Sync Queue" and "Skill substitutions" sections** whenever either applies.

### Cloud-safe canonical paths

| Canon concept | Local-machine path (original v1.2.1) | Cloud-safe repo path |
|---|---|---|
| Master Pipeline | `~/Desktop/Le Mot .md/MASTER_PIPELINE_v1.2.1.md` | `docs/MASTER_PIPELINE_v1.2.1.md` |
| Test Checklist | `~/Desktop/Le Mot .md/Test Checklist.md` | `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` (placeholder until imported) |
| Workstream specs | `~/Desktop/Le Mot .md/{Month}/{DD.MM.YYYY}/Sprint{N}_SW{X}_{slug}.md` | `docs/workstreams/Sprint{N}_SW{X}_{slug}.md` |
| Sync Queue | (n/a — handled in Obsidian / mempalace locally) | `docs/CLOUD_SYNC_QUEUE.md` |

If a canon file does not yet exist in the repo (e.g. v1 Canon TOP, User Journey, Tasarım Envanteri, Notes Archive Index, Merged Product Canon 2026-05-11), it is **operator-side canon**. Cloud sessions read whatever subset is committed to `docs/` or `CLAUDE.md`, surface the gap in the report, and add an import item to the Sync Queue.

---

## 0. Net karar

Mevcut skill ekosistemi çok güçlü ama Le Mot için olduğu gibi kullanılırsa verim değil gürültü üretir.

Le Mot'un gerçek ihtiyacı:

1. Daha fazla skill değil.
2. Daha iyi skill routing.
3. Daha net canon precedence.
4. Daha küçük PR parçaları.
5. Daha disiplinli QA / smoke test.
6. Legacy ile aktif canon'un asla karışmaması.
7. Review-then-commit disiplininin bozulmaması.
8. Obsidian + mempalace karar senkronunun ihmal edilmemesi (cloud'da: Sync Queue üzerinden).

Bu yüzden pipeline'ın merkezi şu olmalı:

```txt
Canon Sync
→ Task Classification
→ Prompt Pack / .md Step Spec
→ Claude Code Execution
→ Review / Simplify / Typecheck
→ Manual QA
→ User Review
→ Commit or Amend
→ Documentation Sync
→ Archive / Memory / Mempalace Update  (cloud: Sync Queue append)
```

### Where this doc lives

Canonical location (repo-contained):

```txt
docs/MASTER_PIPELINE_v1.2.1.md
```

Local-machine mirror (operator-only, may diverge):

```txt
~/Desktop/Le Mot .md/MASTER_PIPELINE_v1.2.1.md
```

Claude Code visibility requirement:

```txt
Root CLAUDE.md must include an @ reference to docs/MASTER_PIPELINE_v1.2.1.md.
Cloud sessions must load this file at session start.
```

Versioning rule:

```txt
When the pipeline version bumps, update the CLAUDE.md @ reference and the repo file name.
The repo copy is the source of truth for cloud sessions. Operator is responsible for keeping the local-machine mirror in sync, not the other way around.
```

---

## 1. Claude + ChatGPT rol ayrımı

### ChatGPT / Product Orchestrator

Benim rolüm:

- Ürün kararlarını netleştirmek
- Canon çakışmalarını çözmek
- Sprint scope'u küçültmek
- Claude Code prompt pack yazmak
- Test checklist üretmek
- UI / UX / pedagogy eleştirisi yapmak
- Le Mot felsefesinin korunup korunmadığını denetlemek
- Legacy ile aktif kararları ayırmak
- Büyük resmi yönetmek

Benim yapmamam gerekenler:

- Repo içinde doğrudan körlemesine kod yönlendirmek
- Her fikri onaylamak
- 1500 skill'i tek tek devreye sokmak
- Claude'a belirsiz görev vermek
- "Bunu da ekleyelim" şişkinliği yaratmak

### Claude Code / Implementation Agent

Claude Code'un rolü:

- Repo okumak
- Dosya bazlı değişiklik yapmak
- TypeScript / React Native / Expo kodu yazmak
- Diff üretmek
- Typecheck çalıştırmak
- Test scriptlerini çalıştırmak
- Commit / PR hazırlamak
- Shannon review, simplify, GSD gibi skill'leri (mevcut oldukları sürece) çalıştırmak

Claude Code'un yapmaması gerekenler:

- Canon kararı uydurmak
- Legacy dokümandaki eski kararı aktif sanmak
- Büyük product direction değiştirmek
- Paywall / monetization / lesson flow gibi konuları kullanıcı onayı olmadan yeniden tasarlamak
- "Streak", "XP", "Amazing!", "Level up!" gibi yasaklanmış dili geri sokmak
- User onayı olmadan commit atmak
- Review concern geldiğinde yeni commit açmak yerine amend gerekip gerekmediğini atlamak

### Operator / Jamo

Operator rolü, AI'ın yapamayacağı veya yapmaması gereken manuel/hesap-bağımlı işleri yürütür.

Operator sorumlulukları:

- Local APK rebuild
- EAS environment variable push
- Supabase Edge Function deploy
- Supabase Dashboard secrets doğrulama
- Physical Android device smoke test
- EAS build link / build ID kayıt
- Final approval phrases: `devam`, `onaylandı`, `commit`
- Review interruption phrases: `Concern`, `Öneri`, `şunu düzelt`
- Obsidian vault writes
- Mempalace writes
- Draining `docs/CLOUD_SYNC_QUEUE.md`

Operator-only task rule:

```txt
Claude cannot mark a sprint/release complete if an operator-only blocker is still open.
Claude may prepare commands/checklists, but completion requires Operator confirmation.
```

Role boundary reminder:

```txt
ChatGPT writes product-level prompts and resolves canon.
Claude Code implements and reports.
Operator approves, rebuilds, deploys, physically tests, and syncs Obsidian/mempalace.
```

---

## 2. Le Mot Canon Precedence

Her Claude task'ı başlamadan önce şu öncelik sırası uygulanmalı.

### 1. Active codebase canon

```txt
CLAUDE.md
docs/DEV_APK_MVP_CANON.md
docs/EAS_PREVIEW_BUILD.md
docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (placeholder until populated)
docs/workstreams/Sprint{N}_SW{X}_{slug}.md (current sprint)
```

> Not: Eski `docs/SPRINT_11_PLAN.md` artık active source olarak otomatik okunmamalı. Sadece repo içinde current sprint gerçekten oradaysa okunur. Sprint 12 için current sprint state / active workstream file kazanır.

### 2. Active product canon

```txt
v1 Canon TOP — 2026-05-16 Tier B locked
Q1-Q6 locked decisions
D1-D6 locked decisions
Killer trinity: Weave + Say It Your Way + Natural Reveal
Campfire Mode @ L24
Core 150 syllabus
Current User Journey / LeMot.md sprint status
Tasarım Envanteri current classification
```

> Cloud note: Most of the above currently lives in the operator's Obsidian vault. Until imported into `docs/`, cloud sessions can only read whatever fragments are reflected in `CLAUDE.md` or `docs/DEV_APK_MVP_CANON.md`. Surface the gap in the report.

### 3. Content QA canon

```txt
L1-L5 Proofreading.md (operator vault)
docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (cloud, placeholder)
```

Canonical Test Checklist path (cloud):

```txt
docs/DEV_APK_SMOKE_TEST_CHECKLIST.md
```

Local-machine mirror (operator-only):

```txt
~/Desktop/Le Mot .md/Test Checklist.md
```

### 4. Design source

```txt
V4 Studies spec
V4 standalone HTML
V4 source JSX
```

Design source is not automatically implementation scope. V4-B asymmetrical breath is selected, but global V4-B redesign is deferred until Dev APK smoke / internal test feedback unless explicitly reactivated.

### 5. Archive / reference only

```txt
LeMot_Product_Canon_Merged_2026-05-11.md
Notes Archive Index.md içindeki SUPERSEDED / REFERENCE / PROMPT LOG dosyaları
Older Sprint 11 taxonomy notes
Old 11-section lesson taxonomy if superseded
Old Mini Mission / Mini Chat framing unless explicitly reactivated
Old L14/L15 paywall assumptions if contradicted by current canon
```

Merged 2026-05-11 status:

```txt
PARTIALLY HARVESTED, not simply discarded.

Accepted into v1 Canon TOP:
- MC.1
- MC.2
- MC.4
- MC.5
- MC.6

Changed by 2026-05-16 Tier B lock:
- MC.3 revised
- MC.7 re-homed
- MC.8 re-mapped
- MC.9 cancelled

Rule:
Do not re-read Merged 2026-05-11 for active decisions.
Read v1 Canon TOP / current User Journey instead.
```

### Conflict rule

```txt
Newer active canon > current codebase canon > older active canon > design reference > archive.
```

Claude'a her prompt'ta şu cümle konmalı:

```txt
If any source conflicts, active canon wins. Do not revive legacy decisions unless explicitly requested.
```

### Current stale traps

Claude must actively avoid these stale assumptions:

```txt
- Do not treat Merged Product Canon 2026-05-11 as current top-level active canon.
- Do not treat Sprint 11 recommended shape as current sprint plan.
- Do not revive SYLL.1 if it was cancelled by 2026-05-16 Q9 lock.
- Do not schedule V4-B global redesign inside Sprint 12 unless explicitly requested.
- Do not treat Mon Lexique as dev-apk scope.
```

---

## 3. Le Mot için sadeleştirilmiş Tier sistemi

Mevcut global tier sistemi doğru ama Le Mot için daha pratik isimlendirme lazım.

### Tier LM-1 — Micro Copy / Tiny UI

Örnek:

- Bir padding düzeltmesi
- Bir typo
- Bir yasaklı kelime değişimi
- Tek string değişimi
- Küçük visual alignment

Skill:

```txt
No skill by default for truly tiny changes
/simplify if change is more than one line or touches logic
/commit only after user approval (cloud: plain git commit after approval)
```

Clarification:

```txt
LM-1 = global Tier 1-2 hybrid.
If it is a single literal/string/style value, direct patch is OK.
If it touches logic, conditionals, routing, state, or more than one line, /simplify is required.
```

Süreç:

```txt
Read exact file
Patch
Typecheck if TS touched
Report diff
Wait for user approval
Commit only after approval
```

---

### Tier LM-2 — Small Bug / One Component

Örnek:

- Lesson outro copy cleanup
- Transition screen microcopy
- One component style fix
- One lesson screen state fix
- TTS placeholder issue

Skill:

```txt
/simplify
/review optional
/commit after approval
```

Süreç:

```txt
Read relevant file
Patch narrowly
Run npm run typecheck
Run targeted test/validator if exists
/simplify
Report exact files changed
Wait for user approval
```

---

### Tier LM-3 — Feature Slice / PR-sized Workstream

Örnek:

- How Weave Works interstitial
- Natural Reveal screen
- Daily Review 4-screen ritual first pass
- Practice Pool Build/Stretch/Challenge UI shell
- AI cap UI
- L17-L23 v1 syllabus rewrite slice

Skill:

```txt
/write-plan
/gsd:plan-phase optional when workstream has multiple steps (skip in cloud if absent)
Context7 if library/API involved (skip in cloud if absent)
/react-best-practices or expo-* if relevant
/review
/simplify
/commit after approval
/pr optional (cloud: use mcp__github__create_pull_request)
```

Süreç:

```txt
Canon read
Step spec in docs/workstreams/Sprint{N}_SW{X}_{slug}.md
Plan
Patch
Typecheck
Manual QA checklist
Review
Simplify
User review
Commit or amend
Sprint log update
```

Important:

```txt
If the workstream already exists in a .md spec, update that spec before coding.
If user says "devam" or "onaylandı", commit the approved step.
If user raises "Concern", "Öneri", or correction after review, amend the last commit when appropriate instead of creating a noisy new commit.
```

---

### Tier LM-4 — Canon / Design / Architecture Workstream

Örnek:

- Lesson engine taxonomy refactor
- V4-B visual implementation after smoke test
- Mon Lexique data model
- Practice Pool architecture
- AI feedback architecture
- Supabase schema / RLS
- Paywall architecture

Skill:

```txt
/graphify
/brainstorm
/architecture
/gsd:plan-phase
/gsd:execute-phase
/review
/simplify
/gsd:verify-work
```

(Cloud: skip any unavailable skill and substitute reasoning; note in report.)

Süreç:

```txt
Graph/codebase impact
Canon conflict audit
Design inventory mapping
Task breakdown into 2–5 PRs
Execute one PR at a time
Review + QA
Docs sync
```

---

### Tier LM-5 — Product Phase / Release

Örnek:

- Dev APK release
- Public beta preparation
- Paywall beta launch
- L1-L24 content expansion
- App Store launch prep

Skill:

```txt
/gsd:new-project or /gsd:new-milestone
/deep-research if market/API changes
/security-review
/gitleaks
/playwright or android_ui_verification
/app-store-optimization
/pricing-strategy
```

Süreç:

```txt
Milestone definition
Scope freeze
Release checklist
Security checklist
QA checklist
Build (Operator-only in cloud)
Smoke test (Operator-only in cloud)
Regression test
Release notes
Post-release archive sync (Operator drains CLOUD_SYNC_QUEUE.md)
```

---

## 4. Le Mot Skill Router

### A. Canon / documentation work

Use when:

- Yeni karar konuşuldu
- Eski karar değişti
- Sprint log güncellenecek
- Tasarım Envanteri update edilecek
- Archive ayrımı yapılacak

Primary skills:

```txt
/obsidian-markdown (operator-only; cloud: queue in CLOUD_SYNC_QUEUE.md)
/documentation
/docs-architect
/architecture-decision-records
/context-optimization
```

Prompt shape:

```txt
Objective:
Canonical source to update:
Decision:
Files allowed:
Do not modify:
Archive handling:
Mempalace sync: (cloud: Sync Queue entry)
Output:
```

Acceptance:

- Current canon güncellendi
- Archive dosyası gerekiyorsa sadece reference olarak işaretlendi
- Legacy active canon'a karışmadı
- "locked/open question/archive" durumu net
- Obsidian dışı karar varsa cloud Sync Queue kuyruğuna eklendi

---

### B. Product / pedagogy judgement

Use when:

- Lesson flow tartışılıyor
- Weave / Say It Your Way / Natural Reveal tasarlanıyor
- Syllabus genişletiliyor
- Paywall sonrası ne verilecek konuşuluyor
- Feature scope şişiyor

Primary skills:

```txt
/product-manager-toolkit
/ai-product
/jobs-to-be-done-analyst
/competitive-landscape
/deep-research
/beautiful-prose only for final copy, not decisions
```

Le Mot-specific rule:

```txt
Do not optimize for generic engagement. Optimize for production readiness, natural French, calm premium journey, and learner confidence without gamification pressure.
```

Red flags:

- Duolingo-like mechanics
- Streak pressure
- XP/level reward language
- Generic chatbot scenes
- Too many unlocks too early
- Lesson screens exceeding attention budget
- Full bespoke lesson flow for every lesson
- Syllabus changes that ignore active/supported/recognition-only distinction

---

### C. UI / design work

Use when:

- V4-B implementation after reactivation
- Screen state design
- Component polish
- Visual QA
- Accessibility check

Primary skills:

```txt
/aidesigner
/design-md
/design-system-ref
/design-spells
/ui-ux-pro-max
/ui-a11y
/accessibility-compliance-accessibility-audit
/android_ui_verification (Operator-only in cloud)
```

Important rule:

```txt
AI-generated UI: extract tokens, rhythm, hierarchy, spacing, and interaction ideas.
Raw paste is allowed only in pre-canon discovery prototypes, never as production implementation without adaptation.
```

Le Mot design checks:

- Premium calm
- Soft mountain journey
- No gamey reward language
- No crowded Duolingo-like loops
- Typography breathable
- Error states neutral
- V4-B asymmetry preserved when V4-B is active scope
- Touch targets mobile-safe
- Offline / empty / cap states designed

Next/image warning for web surfaces:

```txt
If Le Mot web/landing code uses next/image, never use the fill prop inside fragile position:absolute containers unless parent sizing is explicit and tested. Prefer explicit width/height or robust parent aspect-ratio wrappers.
```

---

### D. React Native / Expo implementation

Use when:

- Component writing
- Expo upgrade
- Navigation fix
- Native Android issue
- TTS/audio behavior
- Local build or EAS build (EAS = Operator-only in cloud)

Primary skills:

```txt
/react-best-practices
/typescript-*
/expo-*
/frontend-mobile-*
/zustand-store-ts
/upgrading-expo
/android_ui_verification (Operator-only in cloud)
```

MCP / docs:

```txt
Context7 for Expo / React Native / Supabase docs when APIs are involved (skip in cloud if not connected).
```

Expo Router typed routes note:

```txt
After adding a new route, typed route generation may lag until Metro/Expo regenerates types.
Temporary `"/path" as never` casts may be acceptable as a narrow bridge, but must be revisited after route types regenerate.
Do not scatter broad `as any` route casts.
```

Required checks:

```bash
npm run typecheck
npm run validate:pools   # if content/pool touched
npx expo-doctor          # if dependencies/build touched
```

---

### E. Supabase / AI / backend

Use when:

- Edge Functions
- AI proxy
- Rate limits
- Auth
- RLS
- User data
- Telemetry

Primary skills:

```txt
/supabase-automation
/zod-validation-expert
/api-security-best-practices
/privacy-by-design
/gdpr-data-handling
/secrets-management
```

Rules:

```txt
RLS always on.
service_role never client-side.
AI limits enforced server-side, not only UI-side.
No unbounded AI response.
No user text stored without intentional schema.
```

Schema migration discipline:

```txt
If schema.sql drops a column, do not assume deployed DB was changed.
A deployed DB may still contain old columns until migration is applied.
Column drops and destructive migrations belong in explicit migration tasks, preferably before public beta, not as incidental sprint edits.
Cloud may write the migration file; deploying it to a live DB is Operator-only.
```

Known active migration debt:

```txt
The `streak` column was dropped from schema.sql, but the deployed DB may still contain it.
Drop migration is deferred to public beta / explicit migration task.
Do not infer from this debt that streak should return to UI or product logic.
```

---

### F. QA / test / release

Use when:

- Before merge
- Before APK build
- After major UI refactor
- Before public beta

Primary skills:

```txt
/review
/simplify
/find-bugs
/lint-and-validate
/e2e-testing
/playwright
/android_ui_verification (Operator-only in cloud)
/security-review
/gitleaks (not installed in cloud by default)
```

Le Mot smoke focus:

- Lesson Zero first launch
- L1-L5 visibility in dev-apk
- Chat tab hidden if gated
- Paywall absent in dev-apk
- No XP/streak/reward language
- TTS clean FR only
- Weave Fill does not speak placeholders
- Daily Review only eligible lesson pool
- AI lesson features fail gracefully
- Offline banner safe
- Screen overflow safe on Android

---

### G. Content / French proofreading

Use when:

- L1-L5 content
- New lesson content
- French sentence QA
- Natural Reveal alternatives
- Mon Lexique entries
- Practice Pool items
- L17-L23 v1 syllabus rewrite

Primary skills:

```txt
/professional-proofreader
/copy-editing
/i18n-localization
/linguistic or language-specific skill if available
/avoid-ai-writing
```

Le Mot-specific content rules:

- French must be natural, not just literal.
- Beginner output must not require unseen forms.
- If a form appears before taught, it must be supported/chunked.
- Weave can leave unknown words in English early.
- Natural Reveal should explain naturalness and alternatives.
- Do not overload one lesson with too many active items.
- Keep Active / Supported / Recognition-only distinction.
- Do not revive cancelled SYLL.1 framing.
- L17-L23 rewrite should follow v1 syllabus, not old taxonomy cleanup assumptions.

---

## 5. The Le Mot Pipeline Phases

Terminology rule:

```txt
P.0–P.7 = universal pipeline phases used inside any task.
SW.1–SW.X = sprint workstreams, e.g. Sprint 12 SW.5.
Do not use WS for both. If an old note says WS, clarify whether it means pipeline phase or sprint workstream before acting.
```

Workstream `.md` location convention (cloud-canonical):

```txt
docs/workstreams/Sprint{N}_SW{X}_{slug}.md

Example:
docs/workstreams/Sprint12_SW5_L17-L23-v1-syllabus-rewrite.md
```

Local-machine mirror (operator-only, may diverge):

```txt
~/Desktop/Le Mot .md/{Month}/{DD.MM.YYYY}/Sprint{N}_SW{X}_{slug}.md
```

Rule:

```txt
The active workstream path must be named at the top of every Claude prompt.
If no workstream `.md` exists for an LM-3+ task, create/update the step spec under docs/workstreams/ before coding.
```

Every task inside a sprint workstream follows these phases.

```txt
SW.X may contain multiple tasks.
Each task runs through P.0–P.7 independently.
```

```txt
P.0 — Canon Sync
P.1 — Scope Gate
P.2 — Prompt Pack / Step Spec
P.3 — Implementation
P.4 — Verification
P.5 — User Review → Commit / Amend
P.6 — Documentation Sync
P.7 — Archive / Memory / Mempalace Update   (cloud: Sync Queue append)
```

---

### P.0 — Canon Sync

Claude Code must start with:

```txt
Read:
- CLAUDE.md
- docs/DEV_APK_MVP_CANON.md
- docs/MASTER_PIPELINE_v1.2.1.md (this file)
- current docs/workstreams/Sprint{N}_SW{X}_{slug}.md (if it exists)
- relevant product note (if committed to repo)
- relevant design inventory section (if committed to repo)
- docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (note: placeholder)
- git log -1
- git status --short
```

Output expected:

```txt
Canon Summary:
- Active decision:
- Forbidden legacy:
- Files likely touched:
- Open risks:
- Canon gaps (sources not yet in repo):
```

No code yet.

---

### P.1 — Scope Gate

Before writing code:

```txt
Classify:
- Tier:
- User-visible change:
- Files allowed:
- Files forbidden:
- Test command:
- Manual QA:
- Commit boundary:
```

Hard rule:

```txt
One PR = one product intention.
```

Bad PR:

```txt
"Update lesson flow, fix TTS, redesign Daily Review, clean docs"
```

Good PR:

```txt
"Add one-time How Weave Works interstitial"
```

---

### P.2 — Prompt Pack / Step Spec

Every Claude task should use this prompt shell.

```md
# Le Mot Task Prompt

## Objective
[One clear goal]

## Tier
[LM-1/2/3/4/5]

## Canon Sources
- [specific files, all repo-relative in cloud]
- Active canon wins over archive.

## Current State
[brief current repo/state summary]

## Step Spec
Before coding, append or update this step in the relevant docs/workstreams/Sprint{N}_SW{X}_{slug}.md:
- Goal
- Files expected
- Acceptance criteria
- Tests
- Review status

## Allowed Files
- [exact files or directories]

## Forbidden
- Do not touch unrelated files.
- Do not revive XP/streak/reward copy.
- Do not alter paywall gates unless requested.
- Do not change lesson content unless requested.
- Do not change public beta scope unless requested.
- Do not commit until I approve.

## Implementation Rules
- Small surgical diff.
- TypeScript strict.
- No mutation of existing objects.
- Keep Turkish UI / English code rule if applicable.
- Preserve Le Mot tone.
- Avoid broad `as any`; route casts must be narrow and temporary.
- If schema is touched, state whether deployed DB migration is required.

## Acceptance Criteria
- [specific user-visible checks]
- [specific technical checks]

## Test Commands
```bash
npm run typecheck
npm run validate:pools
```

## Report Format
- Summary
- Files changed
- Tests run
- Manual QA needed
- Risks
- Skill substitutions (if any expected skill was unavailable)
- Sync Queue items (if any local-only canon work was deferred)
- Suggested commit message
```

Review-then-commit rule:

```txt
Claude must not commit immediately after implementation.
User review controls commit.
"devam" / "onaylandı" = commit approved step.
"Concern" / "Öneri" / correction = patch and amend previous commit if it belongs to same step.
```

---

### P.3 — Implementation

Claude Code executes only after P.0–P.2.

Implementation rules:

```txt
Read before edit.
Patch narrowly.
Do not opportunistically refactor.
Do not update docs unless task includes docs.
Do not commit before user approval unless explicitly allowed.
```

Expo Router rule:

```txt
If adding routes, prefer waiting for typed-route regeneration.
If needed, use `"/route" as never` only narrowly and mention it in report.
Never use broad route `as any` as a permanent fix.
```

For Tier LM-3+:

```txt
Run /review before PR.
Run /simplify after review fixes.
Use /gsd:plan-phase if the feature slice has multiple step specs (skip in cloud if absent).
```

For Tier LM-4+:

```txt
Use /graphify before editing (skip in cloud if absent; substitute targeted Grep/Read).
Use /gsd:plan-phase if multiple tasks (skip in cloud if absent).
Use /gsd:execute-phase only after task split (skip in cloud if absent).
```

---

### P.4 — Verification

Minimum verification by task type.

#### UI-only

```bash
npm run typecheck
```

Manual:

```txt
Open affected screen.
Check Android small viewport.
Check text overflow.
Check no forbidden copy.
```

(Manual Android = Operator-only in cloud.)

#### Lesson/content

```bash
npm run typecheck
npm run validate:pools
```

Manual:

```txt
Run affected lesson.
Listen to TTS.
Check prerequisites.
Check Natural Reveal / answer copy.
```

#### AI/Supabase

```bash
npm run typecheck
```

Manual:

```txt
Online success case.
Rate limit/cap case.
Network fail case.
Fallback string.
No crash.
No secret exposed.
```

#### Release

```bash
npm run typecheck
npm run validate:pools
npx expo-doctor
gitleaks detect --source .  # cloud: skip if gitleaks not installed; note in report
```

Manual:

```txt
Full Dev APK smoke checklist (Operator-only in cloud).
Install fresh.
Returning user.
Offline behavior.
```

---

### P.5 — User Review → Commit / Amend

Claude report format:

```md
## Summary
- ...

## Files changed
- ...

## Tests
- `npm run typecheck` ✅/❌
- `npm run validate:pools` ✅/❌

## Manual QA
- Needed:
- Not covered:

## Risks
- ...

## Skill substitutions
- [skill] not available → substituted with [approach]

## Sync Queue
- [items appended to docs/CLOUD_SYNC_QUEUE.md, or "none"]

## Suggested commit
`feat(lesson-v1): add how weave works interstitial`
```

Commit discipline:

```txt
Do not commit until user says approval phrase.
If user says "devam", "onaylandı", "commit", or equivalent → commit.
If user says "Concern", "Öneri", "şunu düzelt", or review feedback → patch the same step.
If the feedback belongs to the same logical step, amend the previous commit.
If feedback creates a new logical scope, create a new step spec before coding.
```

Conventional commit types:

```txt
feat:
fix:
refactor:
docs:
test:
chore:
build:
```

No vague commits:

```txt
update stuff
fix things
final changes
```

---

### P.6 — Documentation Sync

After meaningful PR:

Update only what changed.

Potential docs (repo-side, cloud-writable):

```txt
CLAUDE.md
docs/MASTER_PIPELINE_v1.2.1.md (only if pipeline itself changes)
docs/DEV_APK_MVP_CANON.md
docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (once populated)
docs/workstreams/Sprint{N}_SW{X}_{slug}.md
docs/CLOUD_SYNC_QUEUE.md
```

Potential docs (operator vault, cloud queues only):

```txt
LeMot.md
LeMot - User Journey.md
Tasarım Envanteri.md
Notes Archive Index.md
```

Doc update decision:

```txt
Code behavior changed? → CLAUDE.md / repo project note
Canon decision changed (cloud-side)? → docs/* + Sync Queue entry for operator vault
Canon decision changed (operator-only)? → Sync Queue entry only
Screen state changed? → Tasarım Envanteri (Sync Queue)
Test path changed? → docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (or Sync Queue if vault canon)
Old note replaced? → Notes Archive Index (Sync Queue)
```

---

### P.7 — Archive / Memory / Mempalace Update

Use when:

- A decision is locked
- A feature is explicitly deprecated
- A legacy item is reclassified
- A sprint ends
- Obsidian note was updated with a durable decision

Cloud behavior:

```txt
Cloud sessions DO NOT call mempalace tools and DO NOT write to Obsidian.
Instead, append a Sync Queue item to docs/CLOUD_SYNC_QUEUE.md using its template.
Operator drains the queue from the local machine.
```

Output (always required if any durable decision was made):

```txt
Decision:
Status: LOCKED / OPEN / ARCHIVE / SUPERSEDED
Source:
Affected files:
Next action:
Mempalace sync: (cloud: "queued in CLOUD_SYNC_QUEUE.md row N")
```

Mempalace sync requirement (local sessions only):

```txt
If a durable decision was added manually to Obsidian or project notes:
1. mempalace_check_duplicate
2. if no duplicate: mempalace_add_drawer
3. mempalace_kg_add relationship
4. record source pointer
```

Cloud equivalent:

```txt
1. Append a Sync Queue row using the template in docs/CLOUD_SYNC_QUEUE.md.
2. Reference the source commit/PR.
3. Mark Operator action explicitly.
4. Status: PENDING.
```

Never mix archive and active canon.

---

## 6. Le Mot-specific workstream templates

### Template A — UI Screen Implementation

Use for:

- V4 screen after reactivation
- New state
- Empty/loading/error/cap screen
- Mobile layout polish

Skills:

```txt
/aidesigner optional
/design-system-ref
/ui-a11y
/react-best-practices
/simplify
```

Pipeline:

```txt
1. Read design source and Tasarım Envanteri classification (Sync Queue if not in repo).
2. Confirm status: VALID / REDESIGN / NEW / ARCHIVE.
3. Confirm whether V4-B is active scope or deferred.
4. Implement only active state.
5. Avoid archive/post-MVP states.
6. Check Android overflow.
7. Typecheck.
8. Report screenshots/manual QA required (Operator-only in cloud).
```

Acceptance:

- Matches active canon
- No XP/streak/reward copy
- Touch-safe
- No overflow
- Works in dev-apk gates
- Does not accidentally implement deferred V4-B global redesign

Web-specific warning:

```txt
If next/image is involved, avoid fragile `fill` usage inside absolute-position containers unless parent sizing is explicit and verified.
```

---

### Template B — Lesson Engine Change

Use for:

- Weave
- Natural Reveal
- Say It Your Way
- Section transitions
- Lesson outro
- Resume state
- Taxonomy refactor only if current canon explicitly requires it

Skills:

```txt
/graphify
/write-plan
/gsd:plan-phase optional
/react-best-practices
/typescript-*
/review
/simplify
```

Pipeline:

```txt
1. Read lesson renderer and target screen.
2. Read active lesson flow canon.
3. Verify no unseen content assumptions.
4. Patch one section/mechanic.
5. Typecheck.
6. Run manual lesson smoke.
7. Update test checklist if flow changed.
```

Acceptance:

- Lesson still progresses
- Section completion accurate
- Tone passive mirror / non-gamified
- Resume/progress not broken
- No legacy Mini Mission / Mini Chat revival unless explicitly active
- No cancelled SYLL.1 assumption

Schema/data caution:

```txt
If lesson engine change also touches persisted progress schema, treat it as backend/schema work and apply migration discipline.
```

---

### Template C — Content / Pool Update

Use for:

- L1-L5 proofreading
- Pool item edits
- Flashcards
- TTS cleanups
- Natural alternatives
- L17-L23 v1 syllabus rewrite

Skills:

```txt
/professional-proofreader
/i18n-localization
/copy-editing
/avoid-ai-writing
```

Pipeline:

```txt
1. Read exact lesson/pool file.
2. Read relevant proofreading or syllabus note.
3. Identify active/supported/recognition forms.
4. Patch content.
5. Run validate:pools.
6. Smoke TTS if relevant (Operator-only in cloud).
7. Report changed FR strings.
```

Acceptance:

- French natural
- English explanation clear
- No unseen active forms
- TTS field exists for fill items
- No placeholder speech
- No double negation bugs
- v1 syllabus wins over cancelled syllabus framing

---

### Template D — AI / Supabase Work

Use for:

- AI lesson evaluation
- AI chat caps
- Edge Functions
- Provider fallback
- Telemetry
- Auth/user data
- Schema migrations

Skills:

```txt
/supabase-automation
/zod-validation-expert
/api-security-best-practices
/privacy-by-design
/secrets-management
/review
/security-review
```

Pipeline:

```txt
1. Read EAS/Supabase docs.
2. Confirm env vars and Edge Function names.
3. Design server-side guard.
4. Patch Edge Function/client call.
5. Typecheck.
6. Manual fail-case QA (Operator-only in cloud for live deploy).
7. Security review before PR.
8. If schema changed, document migration status. Live deploy = Operator-only.
```

Acceptance:

- No service_role in client
- RLS assumption documented
- Rate limits server-side
- AI fail does not crash
- User-facing fallback calm
- No unbounded token use
- Deployed DB migration need clearly stated

Schema migration rule:

```txt
Schema file edits are not the same as deployed database migrations.
Any column drop, table rename, destructive migration, or RLS policy change needs explicit migration planning before public beta.
Cloud writes the file; Operator deploys.
```

Expo Router route cast note:

```txt
If AI/Supabase work adds a route or screen, apply the Expo Router typed routes rule from section 4.D.
```

---

### Template E — Release / APK Build

Use for:

- Internal APK
- Preview build
- Public beta build
- Tester wave

Skills:

```txt
/gsd:ship
/security-review
/gitleaks
/deployment-validation-config-validate
/android_ui_verification
```

Pipeline:

```txt
1. Check git status.
2. Check last commit.
3. Run typecheck.
4. Run validate:pools.
5. Check env docs.
6. Build. (Operator-only in cloud)
7. Install fresh. (Operator-only in cloud)
8. Run smoke checklist. (Operator-only in cloud)
9. Record build ID. (Operator-only in cloud)
10. Update Test Checklist / LeMot.md.
```

PR creation in cloud:

```txt
Use mcp__github__create_pull_request (and related mcp__github__* tools), not gh.
```

Acceptance:

- Build link recorded
- Profile recorded
- Commit hash recorded
- Known fails listed
- Tester instructions clear
- Dev APK scope still sacred

---

## 7. Skill shortlist for Le Mot

Do not use 1500 skills. Use this active shortlist.

Cloud caveat: if a skill is not in the current session's available-skills list, fall back to plain reasoning and note the substitution. Do not invoke skills via `Skill` unless they appear in the session's list.

### Session bootstrap

```txt
/gsd:progress   (local-only; cloud: skip and read CLAUDE.md + docs/MASTER_PIPELINE_v1.2.1.md directly)
```

Use at session start, not as a generic task skill.

### Always useful

```txt
/write-plan
/review
/simplify
/commit
/graphify
/context-optimization
```

### Product / canon

```txt
/product-manager-toolkit
/ai-product
/docs-architect
/architecture-decision-records
/obsidian-markdown   (operator-only; cloud: queue)
```

### Frontend / mobile

```txt
/react-best-practices
/typescript-*
/expo-*
/frontend-mobile-*
/android_ui_verification   (Operator-only)
/ui-a11y
```

### Design

```txt
/aidesigner
/design-md
/design-system-ref
/design-spells
/ui-ux-pro-max
```

### Backend / AI

```txt
/supabase-automation
/zod-validation-expert
/api-security-best-practices
/privacy-by-design
/secrets-management
```

### QA / security

```txt
/find-bugs
/lint-and-validate
/security-review
/gitleaks
/e2e-testing
```

### Content

```txt
/professional-proofreader
/copy-editing
/i18n-localization
/avoid-ai-writing
```

### Research

```txt
/deep-research
/competitive-landscape
/agent-reach
```

### Shortlist maintenance

```txt
Skill catalogue is not static.
Claudeception may create new skills at session end.
Do not auto-promote new skills into the Le Mot shortlist.
Review the shortlist monthly or quarterly and promote only skills that solve repeated Le Mot workflow problems.
```

### Cloud-side skill catalogue

```txt
The active skill set for cloud sessions is whatever the harness reports as available, plus skills registered in lemot-app/skills-lock.json once installed. The ~/.claude/skills/ shortlist applies only to local sessions.
```

---

## 8. Skills to avoid by default

Avoid unless a task explicitly needs them.

```txt
SEO skills
marketing automation skills
CRM automation skills
blockchain/web3 skills
pentest exploit skills except security review phase
medical/health analyzer skills
random celebrity thinking skills
generic startup growth skills
generic chatbot builders
```

Reason:

```txt
They will create noise and pull Le Mot away from product focus.
```

---

## 9. Le Mot anti-chaos rules

### Rule 1 — No canon-free coding

Claude must never code from memory when active docs exist.

### Rule 2 — No broad refactor inside feature PR

If a refactor is needed, make it a separate PR.

### Rule 3 — No resurrection of deprecated language

Forbidden unless explicitly requested:

```txt
streak
XP
level up
achievement
amazing
perfect score
goal complete
come back tomorrow pressure
```

### Rule 4 — No generic language app drift

Avoid:

```txt
restaurant chatbot drills as main feature
drag/drop-only lesson spine
Anki clone
Duolingo reward loops
heavy grammar-table teaching
```

### Rule 5 — Every new feature needs a home

Before implementation answer:

```txt
Where does it live?
Lesson?
Daily Review?
Practice Pool?
Mon Lexique?
Post-beta?
Archive?
```

### Rule 6 — Every item has mastery level

For lesson/content:

```txt
Active
Supported
Recognition-only
Recycled
```

### Rule 7 — Dev APK scope is sacred

For dev-apk:

```txt
L1-L5 only unless current canon says otherwise
No paywall
No RevenueCat
Chat tab gated unless active flag says otherwise
Mon Lexique hidden unless current stage allows
No public beta promises in UI
```

### Rule 8 — Mon Lexique has explicit scope

Mon Lexique is not a vague bucket.

```txt
Dev APK: out of scope / hidden unless explicitly reactivated
Tier B lock: 3-tier split applies
MVP/base: learner notebook + gathered items
Later: deeper AI features
Post-beta: Word Graph adjacency / advanced connected knowledge
```

Any Mon Lexique task must state which tier it touches.

### Rule 9 — V4-B is selected but deferred

```txt
V4-B asymmetrical breath is the preferred direction.
Global V4-B redesign waits until Dev APK smoke / internal test feedback unless explicitly reactivated.
Do not sneak V4-B token refactor into unrelated Sprint 12 work.
```

Reactivation signal:

```txt
V4-B is reactivated only when the user explicitly says to open/restart V4-B implementation after Dev APK smoke/internal test feedback.
```

### Rule 10 — Review controls commit

```txt
No auto-commit after implementation.
User review controls commit/amend.
```

### Rule 11 — Cloud never mutes Operator blockers (new in cloud-adapted copy)

```txt
Cloud may declare "code-side ready".
Cloud must not declare "complete", "shipped", or "done" while any Operator blocker (APK rebuild, EAS env push, Supabase deploy, secrets verification, physical Android smoke test, build ID record) remains open.
```

---

## 10. Recommended daily/session flow

### Start of Le Mot Claude session (cloud)

```txt
1. Skip /gsd:progress unless available; if absent, read directly.
2. Read root CLAUDE.md
3. Read docs/MASTER_PIPELINE_v1.2.1.md (this file)
4. Read docs/DEV_APK_MVP_CANON.md
5. Read current docs/workstreams/Sprint{N}_SW{X}_{slug}.md if present
6. Read docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (note: placeholder)
7. git status --short
8. git log -1 --oneline
9. State current branch and uncommitted files
10. Note any canon gaps (files referenced but not in repo)
```

### When user gives a task

```txt
1. Classify tier
2. Identify active canon
3. Identify allowed files
4. Identify forbidden files
5. Produce small plan
6. Update docs/workstreams/Sprint{N}_SW{X}_{slug}.md step spec if applicable
7. Execute
8. Verify
9. Report (include Skill substitutions + Sync Queue sections)
10. Wait for review
11. Commit or amend
```

### End of session (cloud)

```txt
1. Ensure git status understood
2. Commit if approved
3. Update repo docs if needed
4. Append durable decisions to docs/CLOUD_SYNC_QUEUE.md
   - Skip duplicates if P.7 already queued the decision.
   - Use this only for cross-task session-level decisions.
5. Skip /gsd:session-report and /gsd:pause-work in cloud; emit equivalent content as a markdown block in the final reply.
```

---

## 11. Claude prompt: default Le Mot executor

Use this when sending Claude Code most tasks.

```md
You are working on Le Mot, a premium French learning app.

Role boundary:
You are Claude Code. ChatGPT writes product-level prompts and resolves canon. Operator/Jamo approves commits, rebuilds APKs, deploys Supabase/EAS changes, and physically tests.

Environment note:
If you are running in Claude Code Cloud / Web / CI, follow the Cloud Mode Addendum at the top of docs/MASTER_PIPELINE_v1.2.1.md. Do not attempt Obsidian or mempalace writes; emit Sync Queue items instead.

Follow active canon. Do not revive legacy/archive decisions.

Start by reading:
- CLAUDE.md
- docs/MASTER_PIPELINE_v1.2.1.md
- docs/DEV_APK_MVP_CANON.md
- current docs/workstreams/Sprint{N}_SW{X}_{slug}.md (if present)
- relevant file(s)
- git status --short
- git log -1 --oneline

Task:
[PASTE TASK]

Tier:
[LM-1/LM-2/LM-3/LM-4/LM-5]

Allowed files:
[LIST]

Forbidden:
- Do not touch unrelated files.
- Do not introduce XP/streak/reward language.
- Do not change paywall gates.
- Do not change lesson content unless requested.
- Do not commit until I approve.
- Do not treat Merged Canon 2026-05-11 as current top-level canon.
- Do not schedule V4-B global redesign unless explicitly requested.
- Do not declare Sprint 12 or any release complete while Operator blockers remain open.

Acceptance criteria:
[LIST]

Tests:
- npm run typecheck
- npm run validate:pools if lesson/content/pool touched

Report:
- Summary
- Files changed
- Tests run
- Manual QA needed
- Risks
- Skill substitutions (cloud)
- Sync Queue items (cloud)
- Suggested commit message
```

---

## 12. Claude prompt: canon audit before coding

Use before big tasks.

```md
Before coding, audit the active canon for this task.

Read:
- CLAUDE.md
- docs/MASTER_PIPELINE_v1.2.1.md
- docs/DEV_APK_MVP_CANON.md
- current docs/workstreams/Sprint{N}_SW{X}_{slug}.md
- any committed v1 Canon TOP / User Journey / LeMot.md fragments
- docs/DEV_APK_SMOKE_TEST_CHECKLIST.md (note: placeholder)

Return only:
1. Active decisions relevant to the task
2. Deprecated/legacy decisions to avoid
3. Files likely affected
4. Scope risks
5. Recommended Tier
6. Suggested PR boundary
7. Whether Sync Queue entry will be needed (cloud) or mempalace sync (local)
8. Canon gaps (referenced but not present in repo)

Do not edit files yet.
```

---

## 13. Claude prompt: post-implementation review

Use after Claude Code changes files.

```md
Review the changes you just made.

Run:
- git diff --stat
- git diff
- npm run typecheck
- npm run validate:pools if content touched

Then run (skip any unavailable):
/review
/simplify

Return:
1. Bugs found and fixed
2. Bugs found but not fixed
3. Files changed
4. Tests passed/failed
5. Manual QA checklist (note Operator-only items)
6. Suggested commit message
7. Whether this should be commit or amend after user approval
8. Skill substitutions (cloud)
9. Sync Queue items (cloud)

Do not commit yet.
```

---

## 14. Sprint 12 recommended shape

Current working assumption:

```txt
Sprint 12 IN PROGRESS
SW.1–SW.4 pushed @ ed9ca07
SW.5 local
```

Recommended Sprint 12 shape:

```txt
PR-A — Stabilize / finish current SW.5 local work
PR-B — L17-L23 v1 syllabus rewrite according to 2026-05-16 v1 canon
PR-C — Completion copy cleanup / passive mirror residue audit if still needed
PR-D — Test checklist alignment for Sprint 12 changes
PR-E — Documentation sync / archive cleanup / Sync Queue drain (operator-side)
```

Open blockers before Sprint 12 can close (all Operator-only):

```txt
Operator-side APK rebuild
EAS environment variable push / verification
Supabase Edge Function deploy
Supabase secrets verification
Physical Android device smoke test
Build ID / build link recorded in Test Checklist or LeMot.md
```

Claude completion rule:

```txt
Claude may say "code-side ready", but cannot mark Sprint 12 complete until Operator confirms the rebuild/deploy/smoke-test blockers.
```

Explicitly not Sprint 12 unless reactivated:

```txt
V4-B global visual token/base layout implementation
Old Lesson taxonomy 11→9 cleanup as a standalone goal
Old SYLL.1 framing
Mon Lexique full implementation
Word Graph implementation
Paywall ceremony implementation
```

Important:

```txt
Do not combine syllabus rewrite with V4-B visual refactor.
Do not combine content proofreading with lesson engine refactor.
Do not combine AI behavior with UI copy cleanup.
Do not combine docs archive cleanup with production code unless the PR is explicitly docs-only.
```

---

## 15. My critical recommendation

Your current system is already powerful enough.

The bottleneck is not missing skills.

The bottleneck is:

```txt
Too many possible tools
+ too many docs
+ too many legacy ideas
+ too much temptation to batch unrelated work
+ stale canon references inside otherwise-good pipeline docs
```

So the winning strategy is:

```txt
Use fewer skills.
Use stricter prompts.
Use smaller PRs.
Use canon-first execution.
Use review-then-commit.
Use documentation + Sync Queue (cloud) / mempalace (local) as a required final step.
```

The Le Mot master pipeline should be a **traffic controller**, not a tool catalog.

---

## 16. v1.2.1 patch summary

Patched from v1.2:

```txt
1. Pipeline canonical path changed from yearly folder to root / optional _canon folder.
2. CLAUDE.md @ reference updated to MASTER_PIPELINE_v1.2.1.md.
3. Workstream wording clarified: each task inside SW.X follows P.0–P.7 independently.
4. Canonical Test Checklist path added.
5. End-of-session mempalace sync now skips duplicate sync if P.7 already handled the decision.
6. /gsd:progress moved from Always useful to Session bootstrap.
7. Default executor prompt now forbids declaring sprint/release complete with Operator blockers open.
```

v1.2 retained:

```txt
1. Operator/Jamo role added.
2. Pending APK rebuild / EAS env / Supabase deploy / physical smoke-test blockers added.
3. Workstream .md path convention added.
4. Pipeline phases renamed P.0–P.7 to avoid confusion with Sprint SW.1–SW.X.
5. Canonical doc location and CLAUDE.md @ reference requirement added.
6. Merged 2026-05-11 status clarified as PARTIALLY HARVESTED.
7. Known migration debt added: streak column dropped from schema.sql but deployed DB may still contain it.
8. /write-plan vs /gsd:plan-phase distinction clarified.
9. V4-B reactivation signal clarified.
10. Default Claude prompt now includes role boundary.
```

v1.1 retained:

```txt
Sprint 12/current sprint wording
v1 Canon TOP 2026-05-16 / Tier B locked as active product canon
SYLL.1 cancelled warning
V4-B global redesign deferred
L17-L23 v1 syllabus rewrite direction
Review-then-commit .md spec workflow
Mempalace sync requirement (cloud: Sync Queue equivalent)
Mon Lexique dev-apk out-of-scope + 3-tier split rule
Expo Router typed routes cast note
Schema migration discipline
next/image fill warning
LM-1 global Tier 1-2 hybrid clarification
Claudeception / skill shortlist maintenance note
```

Cloud-adaptation patch on top of v1.2.1 (this repo copy only, not a version bump):

```txt
1. Cloud Mode Addendum added at top.
2. Canonical paths table added (local vs cloud-safe).
3. P.7 cloud equivalent (Sync Queue) defined.
4. Skill router and shortlist annotated with cloud-availability caveats.
5. Operator-only items explicitly flagged in Template E and §P.4 Release.
6. GitHub access path noted (mcp__github__* in cloud, not gh).
7. Rule 11 added: cloud never silently mutes Operator blockers.
8. Default executor prompt updated to point at cloud-safe canon paths.
```
