# Cairn — Deployment Yol Haritası v1.0
## Beş Taş, Beş Kapı, ~24 PR

**Tarih:** 5 Temmuz 2026
**Statü:** Deployment'a kadar olan işlerin KAPALI listesi. Yeni fikir bu listeye sızmaz → backlog matrisine gider. Her taşın PR'ları, önceki taşın kapısı geçilmeden başlamaz.
**Yapı:** Taş = iş paketi. Kapı = tek cümlelik çıkış sorusu. Kapı sorusuna "evet" denmeden sonraki taş açılmaz.

---

## SİSTEM YASALARI (bugünden itibaren, taş bağımsız)

Bu ikisi PR değil, her PR'a uygulanan anayasa maddesi:

```text
YASA 1 — MIGRATION ZORUNLULUĞU (local-first veri koruması)
Her şema değişikliği (snapshot, lexique, telemetri, event) bir migration
fonksiyonuyla gelir: eski şekli yeniye çeviren pure + test-locked dönüştürücü.
Migration yazılamıyorsa şema değişikliği YAPILAMAZ. Hiçbir koşulda kullanıcı
verisi silinerek "temiz başlangıç" yapılmaz — local-first'te ilerleme kaybı
geri alınamaz ve güven ölümüdür. Kolaylaştırıcı: event log en dayanıklı
katmandır; snapshot'lar log'dan yeniden türetilebilir ("snapshot'ı at,
yeniden hesapla" çoğu migration'ın ucuz yoludur).

YASA 2 — ITEMID DOKUNULMAZLIĞI (içerik fabrikası ön koşulu)
Bir itemId shipping'e girdiyse SONSUZA DEK donar: yeniden adlandırılamaz,
silinip yeniden yaratılamaz. Kullanıcının tüm mastery/SRS/lexique geçmişi
itemId referanslarıyla yaşar; rename = kanıtın öksüz kalması.
Validator satırı: "shipped itemId değişti → ERROR" (registry hygiene
audit'inin makineleşmesi).
```

---

## TAŞ 0 — İkinci Smoke (ŞİMDİ, kod yok)

**Kapı sorusu:** "L7-L15'li haliyle sıkıcılık gitti mi?"

```text
İş: mevcut build'i telefonda oyna (sen + 1-2 kişi).
Telemetri ilk kez sayı verir: lesson_started → lesson_completed hunisi.
Bu taş atlanamaz: Taş 1'in içeriği bu cevaba göre şekillenir.
```

---

## TAŞ 1 — Ders Deneyimi İskeleti (~8 PR)

**Kapı sorusu:** "Ders 'phrasebook değil, üretiyorum' hissi veriyor mu?" (kısa founder smoke ile)

| # | PR | Not |
|---|---|---|
| 1 | `docs(canon)`: Ders Akışı Kanonu v1.0 repoya | İlk gün; sonraki her PR buna referans verir |
| 2 | `feat(content)`: natural-reveal'ı derslere ekle | Tip + component ZATEN VAR, sıfır kod — en yüksek değer/maliyet |
| 3 | `feat(lesson-v1)`: build + repair ekran tipleri | ~150'şer satır; sonra tip seti ~10'da DONAR |
| 4 | `feat(lesson-v1)`: recap → mini-moment-check | Zorunlu kapı; metrik arkada, insani sonuç önde |
| 5 | `feat(lesson-v1)`: birleşik hint/struggle merdiveni | Kanon §8: reaktif tırmanma + fill trap-satırı + hintLevel kanıtı + hint_used telemetrisi |
| 6 | `feat(lesson-v1)`: ders sonu dizisi + SRS ilanı | Kanon §9.1: "je vais artık senin — yarın geri gelecek" |
| 7 | `feat(lesson-v1)`: kenar durumları (EMPTY/GARBAGE) | Kanon §9.6; tester'da kesin tetiklenir |
| 8 | `feat(lesson-v1)`: meet/insight/recap etkileşimleri | Payload seviyesi; pasif ekran kalmaz |

**RETROFIT KARARI (bu taşa bağlı):**

```text
Dalga 1 (Taş 1 içinde): yalnız L1-L3 yeni modele taşınır — tester'ın ilk
  temas yüzeyi. L4-L15 ESKİ modelde kalır (çalışıyor, bozma).
Dalga 2 (Taş 4'te): L4-L15 taşınır.
L16+: doğrudan yeni modelle doğar.
Gerekçe: "hepsini şimdi güncelle" = haftalarca görünmez iş (premortem 1);
"hiç güncelleme" = tutarsız deneyim. Dalga, ikisinin arasındaki bilinçli yol.
```

---

## TAŞ 2 — Dış Tester Kapısı: Güvenlik + Hukuk (~7 PR)

**Kapı sorusu:** "Bu APK'yı tanımadığım birine verebilir miyim?"

| # | PR | Not |
|---|---|---|
| 9 | `chore(release)`: EAS env + supabaseReady banner | R1; 10 dk, sessiz-başarısızlık sigortası |
| 10 | `feat(edge)`: ai-chat hardening | G2/PR-E: mode-id allowlist + maxTokens clamp + günlük sayaç. AI'lı build bu inmeden dışarı ÇIKMAZ (DD4) |
| 11 | `feat(privacy)`: delete-account + DELETE policy'ler + tam lokal silme + export | G1; dış tester'ın YASAL eşiği |
| 12 | `docs(privacy)`: disclosure metni | İşleyici listesi (Google/Groq/Mistral, ABD) + KVKK aktarım rızası + tester_cohort copy |
| 13 | `chore(supabase)`: email confirmation geri aç | G3; tek toggle |
| 14 | `feat(hub)`: Practice Hub v0 — "bugünün seti" | ÖN KOŞUL: türetme kararı (aşağıda) verilmiş olmalı. K6 (2026-07-05): deriveDrill şablon copy'lerine ton turu bu PR kapsamındadır (instruction-weave koç sesi diliyle birlikte ele alınır). |
| 15 | `feat(app)`: geri bildirim kanalı | Ayarlar → "sorun bildir" → mailto; SDK yok |

**HUB TÜRETME KARARI (PR 14'ten ÖNCE verilmeli):**

```text
Soru: Hub egzersizleri nereden doğar?
  A) Her item için elle yazılmış statik egzersiz (güvenli, 80 derse ölçeklenmez)
  B) TÜRETİLMİŞ: item + ekran tipi şablonundan deterministik üretim
     ("bu chip'i fill formuna dök") — engine'ler (fill_with_traps vb.) tohumuydu
Öneri: B — mevcut component'leri yeniden kullanır, tip seti şişmez, içerik
fabrikasının ilk ürünü olur. (Bkz. fabrika tartışması — ayrı oturum.)
```

**Kapı geçilince:** APK 5-15 dış tester'a gider. Veri dönüş yolu HAZIR olmalı:
tester_cohort consent VEYA export-butonu-WhatsApp yolu (ikisi de mevcut altyapı; birini seç).

---

## TAŞ 3 — Tester Turu ve Telemetri Döngüsü (PR listesi önceden YAZILAMAZ)

**Kapı sorusu:** "Hook kriterleri tutuyor mu?"
(72 saatte kendiliğinden ikinci açılış · L1→L2 geçişi · hatırlanan bir cümle)

```text
Disiplin: bu taşta YENİ ÖZELLİK PR'ı YASAK. Yalnız telemetrinin gösterdiği
düzeltmeler (`fix(content): L9 screen-4 drop-off` gibi).
Süre kutusu: 2-3 hafta. Sonra karar:
  tuttu → Taş 4 · kısmen → düzelt, aynı gruba tekrar ver · tutmadı → premortem 3 masaya
```

---

## TAŞ 4 — Beta Cilası + Mağaza Hazırlığı (~9 PR)

**Kapı sorusu:** "Play Store kapalı beta track'ine koymaya utanır mıyım?"

| # | PR | Not |
|---|---|---|
| 16 | `feat(audio)`: S1 pre-generated ses pipeline'ı | Cihaz TTS'inden kaliteli MP3'e; ucuz Android sigortası |
| 17 | `feat(ui)`: aksan çubuğu (é è ç…) | U1; her yazma egzersizinin tabanı |
| 18 | `feat(srs)`: Comeback Mode | Ara verene küçülen due kuyruğu; beta'da ilk gerçek ara-verenler |
| 19 | `feat(gate)`: Readiness Gate | Kanon §7; hub verisi birikti, termostatın okuyacağı şey var |
| 20 | `feat(ui)`: L1 UI Faz 2 cilası | Progressive disclosure + Weave görsel ayrıcalığı + cairn-taşı progress |
| 21 | `feat(content)`: RETROFIT DALGA 2 — L4-L15 yeni modele | Taş 1'deki kararın ikinci yarısı |
| 22 | `feat(progress)`: %-Fransızca metriği + "ilk cümleler arşivi" | Event log'dan pure projection; duygusal getiri şampiyonları, Carte Postale hammaddesi |
| 23 | `chore(release)`: versionCode + runtimeVersion + production profili + legacy temizlik | R4 + `data/lessons` ve eski renderer'ın silinmesi (Home tam v1'deyse) |
| 24 | `chore(store)`: mağaza varlıkları + Cairn marka taraması + onboarding v1 | Listing, data safety, gizlilik URL'i; Cairn için App Store/EUIPO/domain kontrolü (Le Mot dersi!); ilk-60-saniye tasarımı (Cognate Radar + yerleştirmenin evi) |

**Not — paywall:** Eski kanonun L14 sınırı yeni müfredata OTOMATİK TAŞINMAZ;
açık beta ücretsiz başlar, paywall yeri ayrı bir karar kapısıdır (Taş 5 sonrası).

---

## TAŞ 5 — Deployment: Kapalı Beta → Açık Beta (operasyon, PR değil)

**Kapı sorusu:** "Kapalı beta metrikleri (D7 dönüş, tamamlama hunisi) açık kapıyı hak ediyor mu?"

```text
Play Console kapalı track → geri bildirim döngüsü → açık beta.

BİLİNÇLİ ERTELEMELER (blocker DEĞİL):
- exposure selector + instruction weave (Faz D — lexique verisi beta'dan birikecek)
- paywall / RevenueCat (ayrı karar kapısı)
- iOS · çoklu dil ailesi · içerik fabrikası tam otomasyonu
```

---

## Açık Karar Kaydı

```text
VERİLDİ:   retrofit dalga stratejisi (Taş 1/4) · tip seti donması (~10)
VERİLMELİ: hub türetme (Taş 2 öncesi) · fabrika ilk ürünü (ayrı oturum)
           · paywall yeri (Taş 5 sonrası) · onboarding akışı (Taş 4 içinde)
TUNABLE:   kanon §13'teki tüm eşikler → telemetri kalibre eder
```

---

*Bu yol haritası kapalıdır: ~24 tanımlı PR + Taş 3'ün veri-güdümlü düzeltmeleri.
Kaba ufuk: Taş 1 = 1-2 hafta · Taş 2 = 1 hafta · Taş 3 = takvim kutusu ·
Taş 4 = 2-3 hafta → deployment ~2 ay. Yeni fikirler backlog matrisine;
taşlara sızan her fikir kapıyı bir hafta uzaklaştırır. Ders Akışı Kanonu v1.0,
Egzersip Canon v0.4 ve Payload Economy'nin kardeşidir.*
