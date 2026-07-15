# Ingest Contradictions & Notes

> Bu dosya, SOURCE_ARCHIVE özel notlarının ACTIVE_CODEX'e içe aktarımı sırasında saptanan
> çelişkileri, bayat referansları ve dikkat notlarını **append-only** biçimde tutar.

## 2026-07-14 — Open Questions / Backlog / Tech-Privacy / Sprint 12 ingestion

Kaynaklar: `SOURCE_ARCHIVE/AVAILABLE_INPUTS/Open_Questions.md`, `Backlog_and_Deferred.md`,
`Tech_and_Privacy_Decisions.md`, `Sprint_12_Plan_2026-05-16.md` (2026-05/2026-06 özel notları).
Reconciliation ilkesi: bunlar açık-döngüleri/kararları/gizliliği **zenginleştirir**, güncel repo
kanonunu (HEAD #196, learning-engine) **geçersiz kılmaz**.

### Çelişki / gerilim
- **Paywall pozisyonu (mevcut vault gerilimiyle tutarlı, yeni değil):** kaynak notlar legacy "L14 / $12.99"i
  SUPERSEDED sayar; vault zaten Campfire ~L24 vs §66.3 "post-validation re-decide" gerilimini [[05 Open Loops]] D3
  ve [[ADR-0025 paywall-campfire-l24]]'te izliyor. Kaynak yeni bir çelişki eklemez, mevcut olanı pekiştirir.
- **Backend "open" ↔ vault Supabase-merkezli notlar:** `Tech_and_Privacy_Decisions.md` "Cloudflare vs Supabase" hâlâ
  OPEN der; oysa vault mimari notları ([[Privacy and Data Deletion]], [[Sync Architecture]]) uzak `le_*` şemasını
  **Supabase/RLS** üzerinden PROPOSED olarak modelliyor. Gerilim: kaynak backend seçimini açık bırakır, vault tasarımı
  Supabase varsayar. Not olarak Q-IN8 açık tutuldu; vault tasarımı "PROPOSED, kilitli değil" kabulüyle uyumlu.

### Bayat / tarihsel referanslar (içe aktarılmadı veya "bayat" etiketiyle taşındı)
- **SHA'lar:** `8cfdce75` (#154), `2df34699` (#155+#156), `658a321`, `df4d074`, `622c43b` — hepsi 2026-05/06 dönemi;
  güncel main HEAD #196 değil. Yalnız köken kaydı olarak, "bayat" işaretiyle anıldı.
- **"MMKV":** Sprint 12 notunun kendisi bunu stale işaretler — gerçek storage `expo-sqlite/kv-store`. Taşınmadı.
- **Sprint 12 planı:** kaynağın kendisi "Superseded, do not use as current canon" der. Yalnız niyet özeti olarak
  [[Future Features]]'a girdi; aktif scope değil.
- **WS.1–WS.10 / D1–D6 numaralandırması:** tarihsel Sprint 12 workstream taksonomisi; güncel learning-engine
  Faz/Taş yapısıyla birebir eşleşmez. Yalnız köken bağlamı olarak özetlendi.

### Resolved-elsewhere (açık-döngüye taşınmadı, yalnız not)
- Round 1.1 EAS/APK URL recovery; tek-cihaz Android TTS OK (2026-06-29); Weave etiket/layout (#155);
  L3 recap `oui` temizliği (#156); legacy 24-ders/L14 paywall inaktif. Kaynak `Open_Questions.md` "Resolved Elsewhere".
- Repeated-previous-answer nudge: **DECIDED → deferred** (#155 salience copy gönderdi); evaluator değişmedi.
  [[05 Open Loops]] Q-IN4 olarak DECIDED/DEFERRED kaydedildi.

### Gizlilik / URL hijyeni
- İçe aktarımda hiçbir private URL, build-ID veya yerel path yazılmadı (kaynaklar zaten redaksiyonlu).

## 2026-07-14 — Round 1.1 / 1.2 vault upload (2026-06-29 sources) ingestion

Kaynaklar: `PR_and_Smoke_Log.md`, `Tester_Feedback_Log.md`, `Agent_Handoff.md`,
`Home_-_Le_Mot.md`, `User_Testing_Protocol.md`, `Le_Mot_Round1_Context_Handoff_2026-06-13.md`.
Vault git zemini (hedef): HEAD `02f9f7a` (#196). Reconciliation ilkesi: bu materyal
HISTORICAL / karar-zenginleştirmedir, güncel-canon override DEĞİL.

### Çelişki / reconciliation
1. **"Current main" mismatch (load-bearing):** beş 2026-06-29 notu da `2df3469`
   (#156, Round 1.2)'yi "current main" der; gerçek repo HEAD `02f9f7a` (#196, privacy
   PR-H) daha YENİ. Çözüm: materyal tarihsel; hiçbir "Current State" HEAD fact'i
   değiştirilmedi, #196'nın gerisinde işaretli Round 1.1/1.2 tarihçe bölümleri eklendi.
2. **Fiziksel spot-check `8cfdce75`'te ↔ #196 device durumu ayrı:** vault, fiziksel
   cihaz spot-check'in `8cfdce75` (Round 1.1, #154; Haktan, TTS OK) DONE olduğunu
   söyler. Ama `8cfdce75`, #196'nın **atasıdır**; arada #155/#156 (smoke edilmedi) +
   #157–#196 indi. Yani spot-check yalnız `8cfdce75` için device-verified'dir, güncel
   HEAD'i device-verified YAPMAZ. [[Device Verification Matrix]] + [[03 Current State]]'e
   ayrı/açık madde olarak yazıldı.
3. **Fiziksel TTS caveat kapandı — ama yalnız `8cfdce75`'te:** emülatör-only TTS
   caveat (fra-FRA / fr-fr-x-vlf-server duyulamadı) fiziksel cihazda OK ile kapandı,
   ama scope `8cfdce75`. Güncel main TTS bağımsız yeniden doğrulanmadı. #136 emülatör
   satırları korundu; `8cfdce75`-scope'lu yeni fiziksel-TTS satırı eklendi.
4. **Round 1.2 "merged" ≠ "device-verified":** #155/#156 main'e merged ama
   code-validated only (328/328), APK/smoke-doğrulanmadı. Ledger + matrix satırları
   buna göre etiketlendi ("merged ⇒ shipped/verified" drift'ini önlemek için).
5. **Tarih ↔ PR-numarası sırası (minor):** notlar 2026-06-29 tarihli ve `2df3469`
   (#156)'yı current sayar; oysa codex [[Product Timeline]] Cairn import'u (#146–#148)
   2026-07-02'ye tarihler — PR numarasıyla #151–#156'dan ÖNCE. Yani #156 (kaynakta
   2026-06-29) #146'dan (codex'te 2026-07-02) daha yüksek PR numarası taşır. Muhtemelen
   gevşek tarihleme; çözülmedi, flag'lendi. Blok PR-numarasıyla #146→#196 git
   window'una yerleştirildi, 2026-06-29 upload tarihi belirtildi.
6. **Tester sayısı nüansı:** operatör self spot-check (Haktan, bir gate) ≠ Tester 1
   (ilk gerçek dış tester). `User_Testing_Protocol.md` Stage 2 = pending, yani
   "GO / tester-ready" ≠ "tester-validated". Ayrım korundu; "validated"e yükseltilmedi.
7. **Kaynak-içi supersede:** `Le_Mot_Round1_Context_Handoff_2026-06-13.md` main
   `cabaad0` (#132)'yi frontier sayar — 2026-06-29 notlarının `2df3469`'u ile zaten
   superseded. Yalnız #130/#131/#132 soy-kütüğü detayı için kullanıldı, güncel state
   olarak değil.

### Gizlilik / URL hijyeni
- Round 1.1 EAS/APK çıktıları operator-vault-only; "[private EAS/APK artifacts held
  in operator vault]" olarak referanslandı. Hiçbir URL/build-ID/yerel path yazılmadı.

## 2026-07-14 — Learning Engine Taxonomy ingest (2026-06-29 vault)

Kaynaklar: `Learning_Engine_and_Exercise_Types.md`, `Syllabus_Delta_Log.md`,
`Le_Mot_Round1_Context_Handoff_2026-06-13.md`. Reconciliation: vault (2026-06-29) özel
product/architecture kanonu; repo runtime kanonunu (HEAD `02f9f7a` / #196) **zenginleştirir,
override ETMEZ**. Vault öz-kuralı: content/schema = source of truth; renderer displays;
deterministic validator = judge; AI = bounded coach.

Hard contradiction YOK. Staleness / gerilim notları (override değil):

1. **Commit-pointer staleness (bilgi):** vault `main after #154 = 8cfdce7`, Round 1.2
   `#155/#156 = 2df3469` der; ACTIVE_CODEX HEAD `02f9f7a` / #196'ya bağlı. Vault daha eski
   snapshot; tutarlı tarihçe, çelişki değil. Pointer ayrışmasında runtime canon kazanır.
2. **`faim` active-chip ↔ registry-item gap (gerilim, çelişki değil):** `Syllabus_Delta_Log.md`
   #153 `faim`'i **aktif reusable piece** onaylar; ACTIVE_CODEX `L4 J'ai.md` R3 uyarısı `faim`
   chip'inin registry item'sız olduğunu, mastery event tutunmadığını söyler [DEFERRED]. Bir arada:
   "derste aktif" ≠ "mastery telemetrisi için kayıtlı". Her iki notta flag'lendi; değişiklik yok.
3. **L3 `oui` recap cleanup ↔ Watchlist R2 (hizalı, cross-ref):** #156 L3 recap `piecesUsed`'tan
   passive `oui`'yi kaldırdı; Watchlist R2 hâlâ `oui` demotion adayını listeler. Çelişki değil —
   #156 recap-only slice; geniş oui/non demotion WATCH/PROPOSED kalıyor. Olduğu gibi bırakıldı.
4. **11 ürün-egzersiz tipi ↔ 7 v1 ekran tipi (reconciled):** vault §1 = 11 learner-facing tip;
   runtime = frozen 7 ekran tipi. "Egzersiz tipi ≠ renderer" (vault §8 eşlemesi) ile uzlaştırıldı.
   Tip 9–11 (Diagnostic Drill / Repair / Generative-Adaptive) FUTURE / validator-gated etiketlendi;
   runtime'da yok. Frozen-7 kanonu override edilmedi.
5. **Weave evaluator dokunulmadı:** vault §1.3 Tester-1 carry-over/salience sinyali Friction/
   UI-Attention'dır, açıkça "no evaluator change implied". Yalnız copy/salience rehberi olarak
   içe alındı; W1 (open Weave gradesiz, `matchExpected` deterministik) korundu.

### Gizlilik / URL hijyeni
- İçe aktarımda hiçbir private URL, build-ID veya yerel path yazılmadı (kaynaklar redaksiyonlu).

## 2026-07-14 — Tasarım Envanteri + Visual Design Canon ingest (07_DESIGN)

Kaynaklar: `SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tasarim_Envanteri.md` (2026-05 ekran/state envanteri,
2026-05-11 son overlay), `SOURCE_ARCHIVE/AVAILABLE_INPUTS/Visual_Design_Canon.md` (aktif görsel kanon,
last_reviewed 2026-06-29). Reconciliation: bunlar tasarım SOURCE'tur; envanterin kendi statüsü
"Mixed historical note … verify against active v0.2 canon before use". Visual Canon envanterin bayat
kısımlarını supersede eder. Codex pozisyonu: V4-B SELECTED ama DEFERRED — override edilmedi.

### Çelişki / gerilim
- **C-1 (yön gerilimi) — Weave etiketi:** `Visual_Design_Canon.md:55` "Weave label changed **toward
  learner-facing copy** rather than internal terminology" der (yön: "Weave" jargonundan uzağa).
  Ingestion brief #155 ise **"Try it in French" → restored "Weave" badge** der (yön: "Weave"e geri).
  Bir yay olarak uzlaşır ama anlık yön zıt okunur. **"#155 restore" okunan iki kaynak dosyada YOK**
  (daha geniş source setten). [[Copy and Tone]]'a warning + [[Needs Verification]] flag'iyle yazıldı;
  aktif etiket = **Weave** (`CLAUDE.md` "Franglais → Weave", tescil-ayırt edici).
- **C-3 (supersession) — bayat envanter kısımları:** envanter halftone/V4-D + eski streak/XP/"Unlocked!"
  framing taşır; aktif Visual Canon bunları geçersiz kılar (V4-D halftone [DEPRECATED — rejected];
  oyunlaştırma yasak). Çatışmada aktif Visual Canon kazanır. [[Design Inventory]] + [[V4 Studies Disposition]].

### Scope trap (çelişki değil, tuzak-uyarısı)
- **C-2 — envanter = SOURCE, plan değil:** 155-item katalog `[VALID]`/☑ item'larla bir backlog gibi
  okunabilir; okunmadı. V4-B "selected/locked" = görsel-yön tercihi, implementasyon onayı değil.
  Global V4-B redesign DEFERRED kaldı → [[V4 Studies Disposition]].

### Notlar
- **N-1 — "design ≠ code" sınırı korundu:** envanter ☑ = "V4 Studies'te tasarlandı", "kodda var" DEĞİL.
  [[Design Inventory]]'nin repo-doğrulanabilir state tablosu (empty/error/cap UNKNOWN) olduğu gibi bırakıldı;
  155-item özet ayrı, açıkça-etiketli bir bölüm olarak eklendi. Hiçbir repo-implementasyon iddiası yükseltilmedi.
- **N-2 — V4 Studies HTML held back:** ~18MB standalone HTML repo'ya alınmadı. Tasarım *gerçekleri*
  (varyant seçimi, halftone reddi, disposition overlay) envanter üzerinden ingest edildi; görsel içerik
  satır-seviyesinde doğrulanamıyor → [[Missing Source Inputs]].
- **Ölçek notu:** V4 ekran sayısı 36 → 71 → 155 büyüdü (envanter Özet + 2026-05-08/2026-05-11 pass'leri).

### Gap resolution
- [[Missing Source Inputs]]: `Tasarım Envanteri.md` → NOW PROVIDED; V4 Studies → design facts provided
  (HTML held back). **Hâlâ eksik** (iddia yazılmadı): `LeMot.md`, `LeMot - User Journey.md`,
  `Notes Archive Index.md`, `L1-L5 Proofreading.md`, TOP CANON.

### Gizlilik / URL hijyeni
- Hiçbir private URL, build-ID veya yerel path yazılmadı (kaynaklar redaksiyonlu). V4 HTML yolu/boyutu
  operator-referansı olarak bırakıldı, içerik alınmadı.
