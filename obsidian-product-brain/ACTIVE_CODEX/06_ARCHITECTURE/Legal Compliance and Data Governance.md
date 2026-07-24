---
title: Legal Compliance and Data Governance
aliases: [Legal Compliance, Data Governance, Legal, Hukuki Uyum, Veri Yönetişimi, KVKK Legal, GDPR Legal]
type: governance
domain: architecture
status: skeleton
canon_status: provisional
implementation_status: not-started
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-17
last_updated: 2026-07-17
last_reviewed: 2026-07-17
source_of_truth: ["obsidian-product-brain/ACTIVE_CODEX/06_ARCHITECTURE/Privacy and Data Deletion.md", "obsidian-product-brain/ACTIVE_CODEX/09_DECISIONS/ADR-0023 privacy-local-first-consent-gated-remote.md"]
code_refs: []
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Privacy and Data Deletion]]", "[[Supabase]]", "[[Data Flow]]", "[[05 Open Loops]]"]
supersedes: []
superseded_by: []
tags: [architecture, governance, legal, compliance, kvkk, gdpr, skeleton]
---

# Legal Compliance and Data Governance

<!-- gh-toc -->

## İçindekiler

- [Purpose and Boundary](#purpose-and-boundary)
- [Known Current Product Posture](#known-current-product-posture)
- [Governance Decision Register](#governance-decision-register)
- [Data-Processing Inventory Skeleton](#data-processing-inventory-skeleton)
- [User Rights and Operational Flows](#user-rights-and-operational-flows)
- [Decision Gates](#decision-gates)
- [Non-Claims](#non-claims)
- [Related Notes](#related-notes)

> [!warning] Skeleton Banner
> - Bu bir **yönetişim iskeletidir, hukuki tavsiye değildir.**
> - **GDPR/KVKK uyumu İDDİA EDİLMEZ.** Hiçbir uyum durumu burada onaylanmamıştır.
> - Çözülmemiş kararlar **OPEN** veya **UNKNOWN** olarak kalır — bu pass'te hiçbiri uydurulmadı.
> - **Teknik gizlilik/güvenlik mimarisi tek başına hukuki uyum kurmaz.** Yerel-önce mimari ([[Privacy and Data Deletion]]) iyi bir teknik temeldir ama hukuki bir sonuç değildir.

## Purpose and Boundary

Bu not, hukuk/uyum/veri-yönetişimi sorularının **tek kanonik evidir** — hukuki kararların verilmiş gibi davranmadan. Amaç: dağınık soruların nereye ait olduğunu belirlemek, cevapları değil.

Ayrımı netleştir:

- **Teknik gizlilik/güvenlik** (bu notun kapsamı DEĞİL, ayrı ele alınır): verinin cihazda nerede yaşadığı, nasıl silindiği/dışa aktarıldığı, RLS, `service_role` disiplini, consent-gate mekaniği — çoğu kod-tarafı tanımlı → [[Privacy and Data Deletion]] · [[Supabase]] · [[Data Flow]].
- **Hukuki uyum** (bu notun evi olduğu ama HENÜZ karar içermeyen katman): hukuki dayanak, sorumlu/işleyen kimliği, saklama, yaş politikası, sınır-ötesi transfer, bildirim/şartlar metinleri, tester rıza dili, olay sahipliği, mağaza beyanları. Hiçbiri kararlaştırılmadı.

> [!canon] Kural: **teknik `IMPLEMENTED` ≠ hukuki `COMPLIANT`.** Bir gizlilik özelliğinin kodda hazır olması, ilgili hukuki yükümlülüğün karşılandığı anlamına gelmez. İki katman ayrı izlenir.

## Known Current Product Posture

Yalnız **bugün doğru olan** teknik duruş (yeni karar değil; kayıt için):

- **Local-first:** bugün öğrenme motorundan hiçbir veri cihazı terk etmiyor ([[Privacy and Data Deletion]]).
- **Uzak senkron DISABLED / consent-gated:** `le_*` şeması **PROPOSED**; client'ta asla `service_role`; owner-scoped, deny-by-default RLS ([[Supabase]]).
- **Bulut silme DEFERRED** (audit C1): yerel reset bulut verisini silmez.
- **Dev-APK kapsamı:** hesap yok, analytics yok, AI dormant — bu yüzden birçok hukuki yükümlülük henüz **tetiklenmemiş** ama tester/public lansmandan önce **tetiklenecek**.

Bu duruş bir uyum iddiası değildir; yalnızca hukuki kapıların hangi zeminde açılacağını gösterir.

## Governance Decision Register

> [!open-loop] Aşağıdaki kalemlerin hiçbiri çözülmedi. Her satır **OPEN** veya **UNKNOWN**'dır; bu pass'te hiçbir değer uydurulmadı. Bu, karar **kaydı**dır, karar değil.

| # | Karar kalemi | Durum | Not (uydurma yok) |
|---|---|---|---|
| 1 | Legal entity / publisher (yayıncı tüzel kişilik) | **UNKNOWN** | Kim yayınlıyor — belirlenmedi |
| 2 | Data controller (veri sorumlusu) | **UNKNOWN** | KVKK "veri sorumlusu" ataması yok |
| 3 | Processors / subprocessors (işleyenler) | **OPEN** | Supabase/AI sağlayıcı vb. liste yapılmadı |
| 4 | GDPR/KVKK rol eşlemesi (controller/processor) | **OPEN** | Hangi rejim hangi kullanıcıya — doğrulanmadı |
| 5 | Lawful basis (hukuki dayanak) | **UNKNOWN** | İşleme gerekçesi seçilmedi |
| 6 | Cross-border transfer (sınır-ötesi transfer) | **OPEN** | Türkiye ⇄ Supabase bölge/mekanizma açık ([[Unknowns]] U14) |
| 7 | Privacy notice (gizlilik bildirimi) | **OPEN** | Metin yok |
| 8 | Terms (kullanım şartları) | **OPEN** | Metin yok |
| 9 | Consent / withdrawal (rıza/geri çekme) | **OPEN** | `consent_version`/`consent_at` mekaniği PROPOSED; hukuki dil yok |
| 10 | Retention / deletion (saklama/silme) | **UNKNOWN** | Saklama süresi yok; bulut silme DEFERRED (C1) |
| 11 | Data-subject requests (veri-sahibi talepleri) | **OPEN** | Erişim/silme/taşıma talep süreci tanımsız |
| 12 | Age / children (yaş / çocuk politikası) | **UNKNOWN** | Minimum yaş / çocuk koruması belirlenmedi |
| 13 | Incident ownership (olay/ihlal sahipliği) | **UNKNOWN** | İhlal bildirimini kim sahiplenir — yok |
| 14 | Store privacy declarations (mağaza beyanları) | **OPEN** | Play data-safety formu doldurulmadı |
| 15 | AI-provider disclosure (AI sağlayıcı açıklaması) | **OPEN** | Hangi veri hangi sağlayıcıya — açıklama yok (AI dormant) |
| 16 | Tester / cohort data (tester verisi) | **OPEN** | Tester rıza dili + veri işleme tanımsız (→ ROADMAP Taş 2 disclosure) |

## Data-Processing Inventory Skeleton

> [!warning] Bu envanter **iskelettir** — teknik gerçeğe işaret eder, hukuki sınıflandırma **yapmaz** (kategori/dayanak/saklama = OPEN).

| Veri kümesi | Bugün nerede | Bugün cihazı terk eder mi | Hukuki kategori/dayanak/saklama |
|---|---|---|---|
| Öğrenme durumu (`lm7`, `lm7_srs`, `lm_le_*`) | cihaz | Hayır (local-first) | **OPEN** |
| Ham serbest-metin öğrenci cevapları (`__corrupt` sibling'ları dâhil) | cihaz | Hayır | **OPEN** (yüksek hassasiyet) |
| Auth token | cihaz | — | **OPEN** |
| Gelecek uzak senkron (`le_*`) | PROPOSED | consent-gated (bugün hayır) | **OPEN** |
| AI sağlayıcıya giden veri | yok (dormant) | Hayır | **OPEN** |
| Telemetri | cihaz (local-only) | Hayır | **OPEN** (→ [[Measurement and Experimentation]]) |

Teknik detay envanteri: [[Privacy and Data Deletion]] (delete = export tek-gerçek-kaynak).

## User Rights and Operational Flows

Hukuki hakların **operasyonel karşılığı** — hangi mekanik var, hangi hak henüz karşılanmıyor:

- **Erişim / dışa aktarma:** yerel export özeti var (öğrenci-güvenli, ham JSON değil) — hukuki "veri taşınabilirliği" hakkını karşılar mı **OPEN**.
- **Silme:** yerel reset var; **bulut silme yok (DEFERRED)** — synced kullanıcı için "silme hakkı" bugün eksik (audit C1 / [[Missing Documentation]] MD10).
- **Rıza geri çekme:** mekanik PROPOSED; operasyonel akış tanımsız.
- **İtiraz / düzeltme:** akış yok — **OPEN**.

> [!open-loop] Bu akışların hukuki yeterliliği hukuki inceleme kapısına bağlı (Operator-only). Teknik mevcudiyet ≠ hukuki yeterlilik.

## Decision Gates

> [!canon] Bu kapılar **tester/public lansmandan önce** cevaplanmalı; hiçbiri bu pass'te açılmadı. Karar Operator-only + hukuki inceleme; Claude hukuki karar üretmez.
> - **G-L1:** Yayıncı tüzel kişilik + veri sorumlusu kim? (Register #1–#2)
> - **G-L2:** Hukuki dayanak + rejim eşlemesi (KVKK/GDPR)? (Register #4–#5)
> - **G-L3:** Bildirim + şartlar + rıza dili yazıldı mı? (Register #7–#9)
> - **G-L4:** Silme/saklama/veri-sahibi talep yolu (bulut silme dâhil)? (Register #10–#11 · MD10)
> - **G-L5:** Mağaza data-safety + AI açıklaması + tester rıza dili? (Register #14–#16 · ROADMAP Taş 2)
>
> İzlenen yer: [[05 Open Loops]] · [[Current Priorities]] (Legal identity / data-controller gate).

## Non-Claims

Bu not **açıkça iddia ETMEZ**:

- KVKK veya GDPR uyumu sağlandığını.
- Herhangi bir hukuki dayanağın, saklama süresinin, yaş politikasının veya sorumlu/işleyen atamasının belirlendiğini.
- Marka/ticari-marka hukuki temizliğinin yapıldığını (isim kararı ayrı; hukuki temizlik yapılmadı → [[Naming and Brand Registry]]).
- Bir hukuki incelemenin gerçekleştiğini.

Yukarıdaki her kalem **OPEN/UNKNOWN**'dır ve bir Operator + hukuki inceleme kapısı gerektirir.

## Related Notes

[[Privacy and Data Deletion]] · [[Supabase]] · [[Data Flow]] · [[Sync Architecture]] · [[Measurement and Experimentation]] · [[Naming and Brand Registry]] · [[Missing Documentation]] · [[Unknowns]] · [[05 Open Loops]] · [[Current Priorities]] · [[00 Le Mot Holy Codex]]
