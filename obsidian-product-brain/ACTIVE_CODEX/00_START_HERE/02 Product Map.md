---
title: Product Map
aliases: [Product Map, Ürün Haritası]
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
related: ["[[00 Le Mot Holy Codex]]", "[[Product Vision]]", "[[Learning System Overview]]", "[[Runtime Content Architecture]]"]
tags: [index, map]
---

# Product Map

> Cairn'in parçaları ve nasıl bağlandıkları — tek diyagramda büyük resim.

```mermaid
flowchart TD
  subgraph Product[Ürün katmanı]
    V[Vizyon / Söz] --> PH[Öğrenme Felsefesi]
    PH --> STG[Product Stages / Flags]
  end
  subgraph Learn[Öğrenme sistemi]
    CH[Chip Sistemi] --> WV[Weave]
    CH --> LS[Ders Anatomisi]
    LS --> EX[Egzersizler]
    EX --> ERR[Error Tracking]
    ERR --> MAS[Mastery]
    MAS --> REV[Review / Daily Review]
    MAS --> LEX[Mon Lexique]
  end
  subgraph Content[İçerik]
    SYL[Syllabus L0-L24] --> LS
    REG[Item Registry] --> CH
  end
  subgraph Runtime[Runtime]
    B[Surface B: v1 renderer] --> STO[(lm7 store)]
    C[Surface C: learning-engine] --> EVT[(lm_le_events)]
    MAS -.tested-only.-> C
    B -.SHIPPED.-> STG
  end
  Product --> Learn --> Content --> Runtime
```

> Diyagram özeti: Vizyon → felsefe → chip sistemi (Weave dâhil) → ders/egzersiz →
> hata/mastery/review döngüsü. İçerik tarafında syllabus + item registry besler.
> Runtime'da **sevkedilen yüzey B** `lm7`'ye yazar; **motor yüzeyi C** ayrı
> `lm_le_events` log'una yazar ve şu an yalnızca test/sandbox'ta. İki store disjoint
> (ana entegrasyon bloğu). [[Runtime Content Architecture]].

## Ana giriş noktaları

| Ne öğrenmek istiyorsun? | Git |
|---|---|
| Ürün neden var | [[Product Vision]] · [[Product Promise]] |
| Nasıl öğretiyor | [[Learning System Overview]] · [[Weave System]] |
| Bir ders | [[Lesson Anatomy]] · [[Lesson Flow]] |
| Egzersizler | [[Exercise System Overview]] |
| Müfredat | [[Syllabus Overview]] · [[Lesson Status Matrix]] |
| Mimari | [[System Architecture]] · [[Data Flow]] |
| Ne kodlandı | [[Implementation Overview]] · [[Implementation Ledger]] |
| Kararlar | [[Decision Index]] |
| Şu an | [[03 Current State]] · [[05 Open Loops]] |
