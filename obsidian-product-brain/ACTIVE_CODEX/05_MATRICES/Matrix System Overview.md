---
title: Matrix System Overview
aliases: [Matrisler, Matrix Index]
type: index
domain: meta
status: canonical
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
related: ["[[00 Le Mot Holy Codex]]", "[[08 Source of Truth Map]]", "[[Spec to Runtime Matrix]]"]
tags: [index, matrix]
---

# Matrix System Overview

> [!canon] Matrisler bu vault'un **çapraz doğrulama sistemidir.** Amaç: spec ↔
> registry ↔ runtime ↔ test ↔ cihaz zincirinin nerede eşleştiğini, nerede
> koptuğunu tek bakışta görmek. Boş/bilinmeyen hücre **UNKNOWN** işaretlenir ve
> bir açık döngüye bağlanır — asla uydurulmaz.

## Matrisler

| Matris | Ne eşler | Ana boyut |
|---|---|---|
| [[Lesson Matrix]] | Ders × (Canon/Runtime/Registry/Tests/Device) | kapsama boşlukları |
| [[Chip Coverage Matrix]] | Chip × (ilk ders/rol/yüzey/accounting/mastery/error/lexique/review) | chip izlenebilirliği |
| [[Exercise Matrix]] | Egzersiz × (recognition/recall/controlled/free/audio/error/band) | egzersiz yetenekleri |
| [[Error Matrix]] | Error tag × (üreten egzersiz/ders/recovery) | hata → review zinciri |
| [[Mastery Matrix]] | Mastery durumu × (kaynak/threshold/runtime) | mastery mekaniği |
| [[Syllabus Coverage Matrix]] | Band × (vocab/grammar/phenomena) | müfredat kapsama |
| [[Spec to Runtime Matrix]] | Sistem × (canon kaynağı/runtime kaynağı/match/divergence/aksiyon) | **en yüksek değer** |
| [[Registry Usage Matrix]] | Registry item × (tip/status/kullanım/dormant) | registry sağlığı |
| [[Feature Stage Matrix]] | Feature × (sandbox/dev-apk/public-beta/impl) | stage görünürlüğü |
| [[Route Matrix]] | Route × (stage/loader/data source/status) | navigasyon |
| [[Test Coverage Matrix]] | Sistem × (unit/integration/wiring/validator/device) | test boşlukları |
| [[Device Verification Matrix]] | Yüzey × (doğrulandı mı/nasıl/ne zaman) | kanıt seviyesi |

## Okuma kuralı

> [!warning] Bir hücrede "IMPLEMENTED" görmek "cihazda doğrulandı" demek değildir.
> Runtime yüzeyi B (static v1) sevkedilir ama motor yüzeyi C (learning-engine)
> yalnızca sandbox/test'tedir. Her zaman **hangi runtime** olduğunu kontrol et.
> Üç boyutlu statü: [[06 Canon and Status Legend]].

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Current State](../00_START_HERE/03%20Current%20State.md) · [Open Loops](../00_START_HERE/05%20Open%20Loops.md)

**Bu klasördeki notlar (05_MATRICES):**

- [Chip Coverage Matrix](./Chip%20Coverage%20Matrix.md)
- [Device Verification Matrix](./Device%20Verification%20Matrix.md)
- [Error Matrix](./Error%20Matrix.md)
- [Exercise Matrix](./Exercise%20Matrix.md)
- [Feature Stage Matrix](./Feature%20Stage%20Matrix.md)
- [Lesson Matrix](./Lesson%20Matrix.md)
- [Mastery Matrix](./Mastery%20Matrix.md)
- [Matrix System Overview](./Matrix%20System%20Overview.md) ⟵ *bu not*
- [Registry Usage Matrix](./Registry%20Usage%20Matrix.md)
- [Route Matrix](./Route%20Matrix.md)
- [Spec to Runtime Matrix](./Spec%20to%20Runtime%20Matrix.md)
- [Syllabus Coverage Matrix](./Syllabus%20Coverage%20Matrix.md)
- [Test Coverage Matrix](./Test%20Coverage%20Matrix.md)
