# PROPOSED DRAFT PR BODY (öneri — açılmadı)

> Bu metin, onaylanırsa açılacak **draft** PR'ın gövdesidir. **PR draft kalır ve
> ASLA merge edilmez.** Bu pass'te PR **açılmadı.**

---

**Title:** `docs(memory): stage Cairn Product Brain v0.2 for online work`

**Draft:** ✅ evet · **Merge:** ❌ asla (geçici online çalışma katmanı)

## Ne
Le Mot / Cairn'in özel bilgi tabanı (Product Brain v0.1, 244 not) repo içinde
`obsidian-product-brain/` altına, GitHub web + mobilde okunabilir şekilde
**hazırlandı (untracked; `git add` çalıştırılmadı)**. Amaç: yerel makine erişimi yokken online geçici çalışma.

## Neden
Founder'ın kalıcı hafızası yerel `~/Documents/Smart Brain/` vault'udur; şu an
erişilemiyor. Bu katman, o erişim dönene kadar **geçici** bir çalışma yüzeyi
sağlar. **Yerel sistemin yerini almaz.**

## Kapsam (yalnızca `obsidian-product-brain/`, 281 dosya)
- `ACTIVE_CODEX/` — v0.1 vault (244 not) + relative-Markdown navigasyon/TOC + **kaynak-ingestion bölümleri** (Round 1.1/1.2 tarihçesi, egzersiz taksonomisi, tasarım envanteri, açık sorular).
- `README.md` — GitHub mobil giriş kapısı (17 hedef + 17 domain).
- `BUILD_REFERENCE/` — SHA-256 manifest'leri + taşınan `.obsidian` (referans, aktif değil).
- `SOURCE_ARCHIVE/AVAILABLE_INPUTS/` — **15 redakte kaynak** (18MB V4 HTML held back).
- `REPORTS/` — 10 rapor + manifest + ingestion çelişki günlüğü.
- `LOCAL_RECONCILIATION_PENDING.md`.

## Dürüst sınırlar
- ✅ 15 yüklenen kaynak **redakte edilip ingest edildi**; ama **2026-06-29 tarihli** (HEAD #196'nın gerisinde) → tarihsel/karar zenginleştirmesi, güncel kanon override edilmedi.
- ⚠️ **Yerel 28 notun TAMAMI import/uzlaştırılmadı:** yalnız 15 alt-küme sağlandı; kalan primary home'lar + orijinal-8'in 4'ü (LeMot, User Journey, Notes Archive Index, L1-L5 Proofreading) **eksik** — iddia edilmiyor.
- ⚠️ **18MB V4 Studies HTML held back** (repo PR'a uygun değil; tasarım gerçekleri envanterden alındı).
- ⚠️ **Private EAS/APK URL / credential / build-ID / yerel path REDAKTE edildi**; operatör/vault notlarının git'e dahli founder onayına bağlı.
- ⚠️ **L1 chip listesi kilitli değil:** 31 seçili + 3–4 açık; final seçilmedi.
- Kod/uygulama/doküman/migration/test/package: **değişmedi.** PR #197: **dokunulmadı.**

## Doğrulama
- Obsidian wikilink: **4.524 → 0** çözülmeyen.
- GitHub relative link: **363 → 0** kırık · TOC anchor: **1.563 → 0** kırık.
- Secret/private-link: **0** · tracked-file edit: **0** · scope: yalnızca `obsidian-product-brain/`.

## Merge etmeyin
Bu PR bir **çalışma alanı**dır. Onay sonrası kalıcı kanon, [Obsidian to Git
Promotion Rules](../ACTIVE_CODEX/10_OPERATIONS/Obsidian%20to%20Git%20Promotion%20Rules.md)
akışıyla ayrı ayrı promote edilir.
