# PROPOSED COMMIT SCOPE (onay bekliyor — bu pass'te uygulanmadı)

> [!warning] Bu bir **öneridir.** Bu pass'te **commit/push/branch/PR yok.**
> Aşağıdakiler yalnızca onay verildiğinde uygulanır.

## Branch — KARAR VERİLDİ
- **Final working branch:** `docs/obsidian-product-brain-v0.2` (founder 2026-07-14).
- Standing `claude/lemot-holy-codex-obsidian-8o24qz` **final branch olarak kullanılmayacak.**
- ⚠️ Bu hâlâ verification pass — **branch oluşturulmadı/switch edilmedi.** Onay gelince:
  `git fetch origin main && git checkout -B docs/obsidian-product-brain-v0.2 origin/main`.
- Origin/main baseline: `02f9f7a…`.

## Git index durumu (netleştirme)
- `git add` **çalıştırılmadı.** `git diff --cached` = **boş** (0 dosya staged).
- `git status --short` = tek satır: `?? obsidian-product-brain/` (untracked).
- Tracked-file değişikliği: **0.** Yani tüm hazırlık **prepared/untracked**, "staged" değil.

## Source archive kararı — OPTION (a) UYGULANDI
15 redakte Le Mot kaynak kopyası SOURCE_ARCHIVE'a dahil. Koşullar:
- Yalnız **redakte, repo-güvenli** kopyalar (redaksiyon 13 token, doğrulandı).
- **Redakte edilmemiş orijinal YOK** repoda (oturum-yerel `/tmp`).
- **historical/source material** olarak sınıflandırıldı (aktif kanon değil) → `SOURCE_ARCHIVE/AVAILABLE_INPUTS/README.md`.
- **Primary GitHub navigasyonu dışında** (README nav'a bağlı değil; nav doğrulaması SOURCE_ARCHIVE'ı hariç tutar).
- Manifest + SHA-256 hash'leri korundu (`SOURCE_MANIFEST.csv`, 0 mismatch).
- Redaksiyon açıklamaları korundu (`SECURITY_REPORT.md` + manifest notes).
- Alâkasız kişisel bilgi yok.
- **18MB V4 Studies HTML git'ten hariç** — filename/size/SHA/reason/status/informed-notes/design-facts `SOURCE_INGESTION_REPORT.md`'de kayıtlı; HTML'in PR workspace'te bulunduğu **iddia edilmiyor**.

## Değişen dosyalar (tümü YENİ, untracked, tek dizin — 281 dosya)
```
obsidian-product-brain/
  README.md
  LOCAL_RECONCILIATION_PENDING.md
  ACTIVE_CODEX/**                (244 not + nav/TOC + kaynak-ingestion bölümleri)
  BUILD_REFERENCE/
    ORIGINAL_ZIP.sha256 · EXTRACTED_NOTES_MANIFEST.csv · README.md
    optional-vault-config/       (taşınan .obsidian: 4 json + DO_NOT_OVERWRITE uyarısı)
  SOURCE_ARCHIVE/AVAILABLE_INPUTS/
    README.md + 15 REDAKTE kaynak .md   (18MB V4 HTML held back — yok)
  REPORTS/**                     (10 rapor + SOURCE_MANIFEST.csv + _ingest_contradictions.md)
```
- Repo'nun geri kalanı: **değişmedi** (0 tracked edit).

> [!warning] **Onay noktası — operatör/vault notları git'te.** SOURCE_ARCHIVE'daki
> 15 dosyanın bir kısmı operatör/vault notudur (kendi kuralları "keep private/
> operator notes out of git"). Private URL/credential/path **redakte edildi** ve
> secret kalmadı; ama bu notların **redakte hâlde bile** draft PR'a dahil edilmesi
> founder kararıdır. Seçenekler: (a) hepsini dahil et (redakte); (b) yalnız
> ACTIVE_CODEX ingestion'ını dahil et, ham SOURCE_ARCHIVE kopyalarını hariç tut;
> (c) belirli dosyaları hariç tut. **Commit öncesi netleştirin.**

## Önerilen commit
- **Tek commit** (docs-only, kod yok):
  `docs(memory): stage Cairn Product Brain v0.2 for online work`
- Squash-merge konvansiyonu (K5) ile uyumlu — ama **bu PR draft kalır, merge edilmez**.

## Uygulanmayacaklar (bu iş kapsamında)
- Kaynak ingestion (dosyalar gelene kadar).
- Yerel 28 not import/reconciliation.
- Uygulama/kod/doküman/migration/test değişikliği.
- PR #197'ye herhangi bir işlem.

## Onay checklist (commit öncesi)
- [x] Branch kararı: `docs/obsidian-product-brain-v0.2` (verildi).
- [x] Source archive kararı: option (a) — 15 redakte kopya dahil (uygulandı).
- [ ] **Founder "commit"/"onaylandı" der** → tek commit + push + draft PR.
- [ ] (Açık, bloke değil) Kalan 4 unavailable dosya (LeMot / User Journey / Notes Archive Index / L1-L5 Proofreading) + Cairn Codex/Promotion Rules vb. re-provide → ayrı ingestion pass.
- [ ] (Açık) Test_Checklist (copied-not-ingested) bir Codex notuna işlensin mi?
- [ ] Draft PR **asla merge edilmez.**

## Onay sonrası tam komut dizisi (henüz çalıştırılmadı)
```bash
git fetch origin main
git checkout -B docs/obsidian-product-brain-v0.2 origin/main
git add obsidian-product-brain/
git commit -m "docs(memory): stage Cairn Product Brain v0.2 for online work"
git push -u origin docs/obsidian-product-brain-v0.2
# sonra: mcp__github__create_pull_request (draft: true) — asla merge edilmez
```
