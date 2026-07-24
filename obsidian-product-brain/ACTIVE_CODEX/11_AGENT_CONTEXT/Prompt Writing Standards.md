---
title: Prompt Writing Standards
aliases: [Prompt Standards, Prompt Pack, Executor Prompt, Görev Prompt Standardı]
type: handoff
domain: ops
status: active
canon_status: canonical
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/MASTER_PIPELINE_v1.2.1.md", "docs/engineering/karpathy.md", "docs/agents/LE_MOT_AGENT_CONSTITUTION.md"]
related: ["[[Agent Start Here]]", "[[Claude Code Workflow]]", "[[Task Context Packs]]", "[[Canonical Context Pack]]", "[[Agent Do Not Assume List]]"]
tags: [agent, ops, prompt]
---

# Prompt Writing Standards

> [!canon] Bir Cairn görevini bir ajana (Claude Code) verirken kullanılan **default executor prompt**
> şekli. Kaynak: `docs/MASTER_PIPELINE_v1.2.1.md` §11. Amaç: küçük PR, tek niyet, review-then-commit disiplini.
> Operasyon karşılığı: [[Claude Code Workflow]].

## Neden katı bir prompt şekli?
Le Mot'un darboğazı eksik skill değil; **çok fazla olası araç + çok fazla doküman + çok fazla legacy fikir +
ilgisiz işi batch'leme cazibesi**. Prompt bunu bir **trafik kontrolörü** gibi daraltır: tek niyet, açık dosya
sınırı, açık kabul kriteri.

## Zorunlu prompt bölümleri

Her görev prompt'u şunları taşımalı:

1. **Objective** — tek net hedef. (Kötü: "ders akışını güncelle, TTS düzelt, Daily Review'i yeniden tasarla." İyi: "tek-seferlik How Weave Works interstitial ekle.")
2. **Tier** — LM-1 / LM-2 / LM-3 / LM-4 / LM-5. Küçük string/style = LM-1; tek component bug = LM-2; PR-sized feature slice = LM-3; mimari = LM-4; release = LM-5.
3. **Canon Sources** — okunacak repo-relative dosyalar. "Active canon wins over archive."
4. **Current State** — kısa repo/durum özeti.
5. **Allowed Files** — tam dosya/dizin listesi.
6. **Forbidden** — ilgisiz dosyalara dokunma; XP/streak/reward copy dirilme yok; paywall gate değiştirme yok; ders içeriği değiştirme yok (istenmedikçe); **onay olmadan commit yok**; Merged Canon 2026-05-11'i top-level kanon sayma; V4-B global redesign planlama.
7. **Acceptance Criteria** — spesifik user-visible + teknik kontroller.
8. **Test Commands** — `npm run typecheck`; içerik/pool dokunulduysa `npm run validate:pools` (+ engine için `test:learning-engine`, `validate:content`).
9. **Report Format** — Summary · Files changed · Tests run · Manual QA needed · Risks · Skill substitutions (cloud) · Sync Queue items (cloud) · Suggested commit message.

## Kopyalanabilir iskelet

```md
## Objective
[Tek net hedef]

## Tier
[LM-1/2/3/4/5]

## Canon Sources
- [repo-relative dosyalar] — Active canon wins over archive.

## Current State
[kısa durum]

## Allowed Files
- [tam dosya/dizin]

## Forbidden
- İlgisiz dosyalara dokunma.
- XP/streak/reward copy dirilme yok.
- Paywall gate / ders içeriği değiştirme yok (istenmedikçe).
- Onayım olmadan commit yok.

## Acceptance Criteria
- [user-visible + teknik kontroller]

## Test Commands
- npm run typecheck
- npm run validate:pools   # içerik/pool dokunulduysa

## Report Format
Summary · Files changed · Tests · Manual QA · Risks · Skill substitutions · Sync Queue · Suggested commit
```

## Review-then-commit kuralı (bağlayıcı)
- Implementation'dan **hemen sonra commit YOK**; commit'i kullanıcı review'ı kontrol eder.
- `devam` / `onaylandı` / `commit` → onaylı adımı commit et.
- `Concern` / `Öneri` / düzeltme → aynı mantıksal adımsa önceki commit'i **amend** et; yeni scope ise önce yeni step spec.
- Conventional commit tipleri: `feat` `fix` `refactor` `docs` `test` `chore` `build`. "update stuff / fix things" YASAK.

## Tier'a göre skill zinciri (mevcutsa)
- LM-1: gerekirse `/simplify`, onay sonrası `/commit`.
- LM-2: `/simplify`, opsiyonel `/review`.
- LM-3: `/write-plan` → step spec (`docs/workstreams/…`) → `/review` → `/simplify` → onay sonrası commit.
- LM-4+: impact analizi (graph/Grep) → task split → PR başına bir adım.
Bulutta olmayan skill = plain reasoning + raporda "Skill substitutions" notu.

## Karpathy zorunluluğu
Prompt LM-2+ ise: **önce oku (canon+kod), sonra kodla**; simplest structure; cerrahi diff (tek niyet/PR);
engine kodu için purity contract; PR öncesi triple validation yeşil. Ana evi: [[Claude Code Workflow]] · `docs/engineering/karpathy.md`.

## İlgili Notlar
- [[Agent Start Here]] · [[Claude Code Workflow]] · [[Codex Review Workflow]] · [[PR Discipline]]
- [[Task Context Packs]] · [[Canonical Context Pack]] · [[Agent Do Not Assume List]]
