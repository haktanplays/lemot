---
title: Needs Verification
aliases: [Doğrulama Gerektirenler, Unverified Claims, Verify Queue]
type: open-loop
domain: meta
status: active
canon_status: provisional
implementation_status: unknown
verification_status: unverified
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["docs/STATUS.md", "lemot-app/scripts/"]
related: ["[[Contradictions]]", "[[Unknowns]]", "[[Test Source Index]]", "[[Device Verification Matrix]]", "[[05 Open Loops]]", "[[06 Canon and Status Legend]]"]
tags: [gap, needs-verification, unverified]
---

# Needs Verification

<!-- gh-toc -->

## İçindekiler

- [V-1 — validate:content mevcut main'de geçiyor mu? (54 vs 56)](#v-1-validatecontent-mevcut-mainde-geçiyor-mu-54-vs-56)
- [V-2 — 42 engine testi hepsi yeşil mi?](#v-2-42-engine-testi-hepsi-yeşil-mi)
- [V-3 — L7-L15 gerçekten V1_LESSONS'a kayıtlı mı + validate ile geçiyor mu?](#v-3-l7-l15-gerçekten-v1lessonsa-kayıtlı-mı-validate-ile-geçiyor-mu)
- [V-4 — PR #197 (privacy) canlı durumu](#v-4-pr-197-privacy-canlı-durumu)
- [V-5 — Round 1 runtime baseline hangi commit'te ACCEPTED?](#v-5-round-1-runtime-baseline-hangi-committe-accepted)
- [V-6 — Deployed Supabase DB'de streak kolonu / ai_usage durumu](#v-6-deployed-supabase-dbde-streak-kolonu-aiusage-durumu)
- [V-7 — Working tree "current main" gerçekten neresi?](#v-7-working-tree-current-main-gerçekten-neresi)
- [V-8 — ITEM_REGISTRY gerçek key sayısı (54?) + tip dağılımı](#v-8-itemregistry-gerçek-key-sayısı-54-tip-dağılımı)
- [V-9 — ici/faim unregistered chip surface (R3)](#v-9-icifaim-unregistered-chip-surface-r3)
- [V-10 — validate:pools 6 legacy warning gerçekten "OK" mü?](#v-10-validatepools-6-legacy-warning-gerçekten-ok-mü)
- [Nasıl kapatılır](#nasıl-kapatılır)
- [İlgili notlar](#ilgili-notlar)

> [!warning] Bir kaynağın **iddia ettiği ama bağımsız kanıtı olmayan** (reported-only /
> source-inspected ama çalıştırılmamış) şeyler. Bunlar UNKNOWN değil (bir cevap var), çelişki
> değil — sadece **teyit edilmemiş**. Doğrulama yolu belirtilir. Bkz. [[06 Canon and Status Legend]]
> `verification_status` ekseni.

## V-1 — `validate:content` mevcut main'de geçiyor mu? (54 vs 56)
- **İddia:** CI zinciri yeşil; ama `ITEM_REGISTRY` 54 key vs `shipped-item-ids.json` 56 id;
  K3 bidirectional check tam bu drift'i hard-fail eder.
- **Kanıt durumu:** Bu read-only geçişte `validate:content` **çalıştırılmadı** (Pack 05 §Cross-cutting).
- **Doğrulama yolu:** `cd lemot-app && npm run validate:content` → 0 hard error mı?
- → [[Contradictions]] C6, [[Test Source Index]].

## V-2 — 42 engine testi hepsi yeşil mi?
- **İddia:** `test:learning-engine` geçiyor (STATUS/smoke checklist §2 "0 hard errors").
- **Kanıt durumu:** Bu geçişte koşulmadı.
- **Doğrulama yolu:** `npm run test:learning-engine`.
- → [[Test Coverage Matrix]].

## V-3 — L7-L15 gerçekten `V1_LESSONS`'a kayıtlı mı + validate ile geçiyor mu?
- **İddia:** 16 dosya kayıtlı; L7-L15 "registered for validation; NOT learner-visible".
- **Kanıt durumu:** Dosyaların varlığı doğrulandı (`ls` 16 dosya); ama `V1_LESSONS` index kaydı
  ve validate:content'ten geçiş bu geçişte doğrudan koşulmadı. STATUS snapshot'ı `91f1b04`
  hâlâ 7 ders diyor.
- **Doğrulama yolu:** `content/lessons/v1/index.ts` importlarını + `npm run validate:content`.
- → [[Contradictions]] C4, [[Lesson Status Matrix]].

## V-4 — PR #197 (privacy) canlı durumu
- **İddia (session brief):** PR #197 = paused, NOT merged, 17 unresolved thread, head `fd22c40`.
- **Kanıt durumu:** Repo HEAD `02f9f7a` (#196); #197 local git shallow window'da doğrulanamadı.
  Reported-only.
- **Doğrulama yolu:** `mcp__github__pull_request_read` (owner/repo/197) → state + thread sayısı.
- → [[PR Map]], [[Privacy and Data Deletion]].

## V-5 — Round 1 runtime baseline hangi commit'te ACCEPTED?
- **İddia:** #136 `8cefe81`'de P0-P3 zero ACCEPTED & FROZEN; sonra #139/#141 baseline'i ilerletti
  → operator device smoke `91f1b04`'ü yeniden kapsamalı.
- **Kanıt durumu:** Doc-reported; fiziksel-cihaz smoke **PENDING** (operator-only).
- **Doğrulama yolu:** Operator device pass + build ID kaydı.
- → [[Device Verification Matrix]], [[Smoke Test Playbook]].

## V-6 — Deployed Supabase DB'de `streak` kolonu / `ai_usage` durumu
- **İddia:** `schema.sql`'den `streak` drop edildi ama deployed DB'de olabilir; `ai_usage` +
  `bump_ai_usage` deploy edilmemiş olabilir.
- **Kanıt durumu:** `schema.sql` ≠ deployed DB; deployed durum cloud'dan görülemez.
- **Doğrulama yolu:** Operator Supabase Dashboard.
- → [[Supabase]], [[External Artifact Index]].

## V-7 — Working tree "current main" gerçekten neresi?
- **İddia:** Farklı evidence pack'ler farklı base cite ediyor: `02f9f7a` (#196, HEAD),
  `91f1b04` (STATUS), `84a5b8e` (chip audit), `4b68f4c` (loop audit v2).
- **Kanıt durumu:** `git log -1` = `02f9f7a`. Diğerleri o kaynakların yazıldığı andaki base.
- **Doğrulama yolu:** Her iddiayı yazıldığı commit'e göre yorumla; "current" için `02f9f7a`.
- → [[Commit and Milestone Timeline]].

## V-8 — `ITEM_REGISTRY` gerçek key sayısı (54?) + tip dağılımı
- **İddia:** Pack 05 "54 items" (34 chunk / 5 noun / 4 pronoun / 3 verb / 3 grammar-nugget /
  2 adverb / 2 sound-pattern / 1 micro-contrast; 32 active / 16 supported / 6 recognition).
- **Kanıt durumu:** Source-inspected (Pack 05); bağımsız sayım yapılmadı.
- **Doğrulama yolu:** `itemRegistry.ts` key sayımı + `grep -c 'id:'`.
- → [[Registry Usage Matrix]].

## V-9 — `ici`/`faim` unregistered chip surface (R3)
- **İddia:** `ici` ve `faim` registry item'ı olmadan chip olarak üretiliyor → mastery event'leri
  hiçbir şeye bağlanmıyor (chip audit R3).
- **Kanıt durumu:** Audit-reported (`84a5b8e`).
- **Doğrulama yolu:** Registry'de `word-ici`/`noun-faim` var mı + ilgili lesson surface.
- → [[Chip Coverage Matrix]].

## V-10 — validate:pools 6 legacy warning gerçekten "OK" mü?
- **İddia:** validate:pools 6 bilinen legacy warning verir, error yok.
- **Kanıt durumu:** Reported (smoke checklist §2).
- **Doğrulama yolu:** `npm run validate:pools`.
- → [[Validation Gates]].

## Nasıl kapatılır
Her satır çalıştırılıp/GitHub'dan okunup teyit edilince: sonucu ilgili nota `verification_status`
olarak yaz (device-verified / integration-tested / …), buradan çıkar. Doğrulama araçları:
`mcp__github__*` (PR/commit), `npm run *` (validators/tests), operator (cihaz/Supabase).

## İlgili notlar
- [[Contradictions]] · [[Unknowns]] · [[Test Source Index]]
- [[Device Verification Matrix]] · [[PR Map]] · [[05 Open Loops]]
