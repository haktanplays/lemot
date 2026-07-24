---
title: Copy and Tone
aliases: [Copy and Tone, Ton, Metin ve Ton, Voice, Banned Language, MOTIV]
type: design-spec
domain: design
status: active
canon_status: canonical
implementation_status: implemented
verification_status: unit-tested
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/constants/theme.ts", "CLAUDE.md", "docs/MASTER_PIPELINE_v1.2.1.md", "docs/agents/LE_MOT_AGENT_CONSTITUTION.md", "obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md"]
code_refs: ["lemot-app/constants/theme.ts:20-47", "lemot-app/app/how-weave-works.tsx", "lemot-app/components/lesson-v1/LessonRendererV1.tsx"]
test_refs: ["lemot-app/scripts/tests/componentCopyGuard.test.ts", "lemot-app/scripts/tests/devApkCopyGuard.test.ts"]
related: ["[[00 Le Mot Holy Codex]]", "[[Cairn Brand Direction]]", "[[Design System Overview]]", "[[Interaction Patterns]]", "[[Home and Journey]]", "[[AI Role and Guardrails]]"]
tags: [design, copy, tone, canonical, enforced]
---

# Copy and Tone

> [!canon] Purpose — Cairn'in sesi: "passive mirror" mentor tonu, `MOTIV` rotasyonu, ve **koda gömülü, testle enforce edilen yasak dil**. Bu not ton konusunun tek kanonik evidir.

## Executive Summary

Ton **CANONICAL ve kodla enforce ediliyor** (yalnızca aspirasyonel değil). İlke: **passive mirror** — "sit beside the learner, do not push" (`theme.ts:22-24`). Ödül/tezahürat/baskı dili (XP, streak, level up, "amazing", "perfect score", "come back tomorrow") canon-wide FORBIDDEN ve iki copy-guard testiyle CI'da bloklanır. Home'daki motivasyon satırları Fransız atasözleri + yumuşak yansımalardır, asla "keep going / great job" değil.

## Current Canon

### Passive-mirror mentor tonu (CANONICAL)

`theme.ts:20-24` yorumu (IMPLEMENTED, kaynak koddan):

> [!implemented]
> "Reward / cheerleader / pressure tones are intentionally absent (no XP, no streak, no 'keep going', no 'great job'). Tone is **passive mirror: sit beside the learner, do not push.**"

### MOTIV rotasyonu (IMPLEMENTED)

`theme.ts:25-47` — üç katman interleaved, günlük indeksle atasözü → yumuşak yansıma → yol yansıması olarak döner (`MOTIV`, satır 43-47). Gerçek string'ler (koddan, çevirme):

> [!example]
> **Atasözleri (`MOTIV_PROVERBS`):**
> - « Petit à petit, l'oiseau fait son nid. »
> - « On ne voit bien qu'avec le cœur. »
> - « Le temps fait toute chose. »
>
> **Yumuşak yansımalar (`MOTIV_SOFT_REFLECTIONS`):**
> - "Some French is starting to feel less distant."
> - "A few pieces are becoming familiar."
> - "Little by little, the language starts to answer back."
>
> **Yol yansımaları (`MOTIV_PATH_REFLECTIONS`):**
> - "The path is quieter when you return to it gently."
> - "You do not need to rush what is becoming yours."
> - "You are not behind. You are on the path."

Ton: karşılama değil, eşlik. "Geride değilsin, yoldasın" — ceza değil, sakin bir ayna.

### Yasak dil (FORBIDDEN, canon-wide)

Kaynaklar: `CLAUDE.md` "Do NOT" listesi + locked-decision 2026-04-23; `MASTER_PIPELINE` Rule 3; `LE_MOT_AGENT_CONSTITUTION.md` §4.

Yasak terimler: **streak · XP · level up · achievement · amazing · perfect score · goal complete · "come back tomorrow" baskısı.**

### Kod-seviyesinde enforce (unit-tested)

İki copy-guard testi bunu CI'da zorunlu kılar:

- `componentCopyGuard.test.ts` — first-run TSX bileşenlerini tarar: `LessonRendererV1.tsx`, `lesson-zero.tsx`, `how-weave-works.tsx`. Yasak kelimeler (`componentCopyGuard.test.ts:44-59`): `XP, streak, level, reward, Unlocked, Perfect, Amazing, scaffold, flow, lab, premium, paywall`; yasak ifadeler: `Mini Mission, Mini Chat`. Em/en dash da bloklanır.
- `devApkCopyGuard.test.ts` — yapısal `lesson001.screens` verisini aynı terimler için tarar.

> [!example]
> **Bilinçli izinli istisna:** `how-weave-works.tsx` içindeki anti-gamification öğrenci string'i "**No score.**" — "score" yalnızca bu string için allowlist'te; başka her "score" testi düşürür (`componentCopyGuard.test.ts:20-22`). Renderer yorumundaki negatif referans "No XP, level, streak, score, or percent." yorum olduğu için taranmaz.

## Guardrails

- Yeni öğrenci-metni eklerken banned kelime + em/en dash kullanma; aksi hâlde `npm run test:learning-engine` düşer.
- "Mini Mission"/"Mini Chat" eski framing'i geri getirilemez (yasak ifade).
- AI çıktısı da bu tona uyar ve görülmemiş form sızdırmaz — bkz. [[AI Role and Guardrails]].
- Kaldırılan streak yerine "days on the path" gibi sakin dil (UX.1, planlı).

## Kaynak içe aktarımı (Tasarım Envanteri + Visual Design Canon)

> [!source] İçe aktarılan: `Visual_Design_Canon.md` "Lesson UI Rules" + "Known Decisions" + `Tasarim_Envanteri.md`. Bu pass, passive-mirror tonunu görsel-kanon tarafından teyit eder ve **Weave etiket evrimini** kayıt altına alır.

### Weave etiketi evrimi [SOURCE + ingestion brief]

`Visual_Design_Canon.md` (satır 55, Known Decisions): *"Weave label changed toward learner-facing copy rather than internal terminology."* Yani etiket bir dönem **iç-jargon "Weave"den öğrenci-yüzü kopyaya** ("Try it in French") kaydı.

Ingestion brief'e göre yay tamamlandı: **"Try it in French" → restored "Weave" badge (per #155)** — öğrenci-yüzü deneyden sonra **"Weave" rozeti geri getirildi.** Bu, kod-tarafı marka kararıyla tutarlıdır: `CLAUDE.md` "Franglais → Weave for trademark distinctiveness" (Weave, tescil-ayırt ediciliği olan yerleşik etikettir).

> [!warning] **Yön gerginliği (kaydedildi):** `Visual_Design_Canon.md` etiketin *öğrenci-yüzü kopyaya doğru değiştiğini* söyler; ingestion brief #155 ise *"Weave" rozetinin geri getirildiğini* söyler. Bunlar bir yay olarak uzlaşır (Weave → "Try it in French" → restored Weave), ama iki kaynağın *anlık* yönü zıt okunur. "#155 restore" bu pass'te okunan iki kaynak dosyada **değildir** (daha geniş source setten gelir) → [[Contradictions]] · `REPORTS/_ingest_contradictions.md`. Aktif etiket: **Weave** (yerleşik, tescil-ayırt edici). [SOURCE — ingestion brief; iki ingested dosyada doğrulanamadı]

### İç-jargon yasağı + doğal referans kopya [SOURCE — mevcut ton ile tutarlı]

`Visual_Design_Canon.md` "Lesson UI Rules":

- **Etiketler iç-jargondan kaçınır** ("Labels avoid internal jargon") — kullanıcıya "Bridge", "scaffold", "flow", "lab" gibi analitik/creator-side terimler gösterilmez (zaten copy-guard testinde `scaffold/flow/lab` yasak).
- **Referans kopya "in English" garip hissettirmemeli** ("Reference copy such as 'in English' should not feel awkward") — Weave'de bilinmeyen kelimeleri İngilizce bırakma UX'i doğal okunmalı, özür dileyen bir ton değil.
- Reveal/confirm hiyerarşisi belirgin olmalı; chip'ler net ve yeniden-kullanılabilir görünmeli.

### Passive mirror teyidi [SOURCE]

`Visual_Design_Canon.md` "App UI Direction" bu notun passive-mirror ilkesini bağımsız olarak doğrular: *"Calm learning, not noisy gamification… no childish reward theatre… Feedback should feel gentle, clear, and actionable."* Yasak-dil listesi ([[#Yasak dil (FORBIDDEN, canon-wide)]]) değişmez; görsel kanon aynı yönü illüstrasyon/UI katmanında pekiştirir → [[Cairn Brand Direction]] · [[Visual Language]].

## Known Gaps

- Tam ses/üslup kılavuzu (cümle uzunluğu, İngilizce-açıklama kayıt seviyesi) operatör-vault'ta olabilir; repo'da yalnızca yasak-liste + MOTIV kanıtlı → [[Missing Source Inputs]].
- "#155 Weave badge restore" kararının tam metni/tarihi okunan iki kaynakta yok; teyit için operator import gerekir → [[Needs Verification]].

## Related Notes

- [[Cairn Brand Direction]] · [[Interaction Patterns]] · [[Home and Journey]] · [[AI Role and Guardrails]] · [[Design System Overview]]
