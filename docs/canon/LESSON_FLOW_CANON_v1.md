# Cairn — Ders Akışı Kanonu v1.0
## Ders / Practice Hub / Readiness Gate / Hint & Struggle / Instruction Weave

**Tarih:** 5 Temmuz 2026
**Statü:** v1.0 — ders akışının KAPANMIŞ tasarım kanonu. v0.2'nin üzerine: 6 yaşam-döngüsü boşluğunun default'ları, birleşik hint/struggle merdiveni ve instruction weave eklendi.
**Kapsam duvarı:** Tasarım kanonu, kod yetkilendirmez. Dev APK canon ile çeliştiğinde Dev APK canon kazanır. İnşa sırası §12'de; tetikleyici kod hevesi değil, smoke sinyalidir.
**Sözleşme:** Contract'lar house-rule uyumlu — pure, deterministic, explicit `now`, fail davranışı belirtilmiş.

---

## 0. Mimari Özet — Üç Katman, Üç Soru

```text
DERS          = tanıştırma salonu   → "anladı mı?"          (ilk kanıt, hafif ölçüm)
PRACTICE HUB  = antrenman salonu    → "yapabiliyor mu?"      (tekrarlanan kanıt, yoğun ölçüm)
SRS / REVIEW  = zaman katmanı       → "hâlâ yapabiliyor mu?" (kalıcı kanıt, yayılmış ölçüm)
```

Hedef denge ~%30 ders / ~%70 hub — **dayatılmaz, dört kuraldan doğar:**

```text
K1. Ders asla 10 dakikayı geçmez (Payload Economy kollar).
K2. En yoğun günün bile 3-5 dk'lık anlamlı birimi vardır ("bugünün seti");
    Comeback Mode ara sonrası tabanı KÜÇÜLTÜR.
K3. Hub paketler halinde gelir, doğal biter ("bıraktım" değil "bitirdim").
K4. Hub'a kapı değil ihtiyaç-anında-davet çeker — tek istisna §7 Readiness Gate.
```

---

## 1. Ders Modeli

### 1.1 Sayısal bütçe (TEK bütçe — "sayılmayan ekran" yoktur)

```text
TOPLAM EKRAN BÜTÇESİ: 11-14 (öğrencinin gördüğü HER ekran sayılır)
  ├── aksiyon ekranları:   9-11 (meet, weave, fill, build, check...)
  └── insight-card kotası: 2-3  (tavan; §1.4 seviye-3)

Mikro-aksiyon:        15-25 (toplam)
Ekran başına aksiyon: 1-3, TAVAN 4
Süre hedefi:          7-10 dk (estimatedMinutes yansıtır)
Yeni aktif chip:      1-4 (müfredat disiplini, DEĞİŞMEZ)
Üretim aksiyonu:      3-5 (yaz/kur; 30-60 sn)
Keşif aksiyonu:       kalanı (dokun/seç; 5-15 sn)
```

**Zincir kuralı (v1):** Ekran içi zincir ≤4 aksiyon. Zincir yarıda kesilirse ekran
baştan başlar (kısa zincirde kabul edilebilir; adım işaretçisi FUTURE).
**Ders-seviyesi devam:** Ders yarıda kesilirse öğrenci EKRAN SINIRINDAN devam eder
(tamamlanmış ekranlar tekrar oynatılmaz).

### 1.2 Etkileşim spektrumu — "her ekran konuşur"

Her ekran şu dörtlüden en az birini ister:

```text
DOKUN → chip'e bas: aydınlanır + sesi çalar   (keşif, 2-5 sn)
SEÇ   → iki seçenekten birine bas              (keşif/karar, 5-15 sn)
KUR   → parçaları birleştir                    (üretim, 15-30 sn)
ÜRET  → yaz / söyle                            (üretim, 30-60 sn)
```

Pasif ekran kalmaz — YENİ EKRAN TİPİ AÇMADAN, payload seviyesinde:
- **meet-card:** kanon cümle bütün gelir; öğrenci chip'lere dokunarak ayrıştırır
  (dokunuş = aydınlat + ses). Devam, tüm chip'lere ≥1 dokunuşla aktifleşir (davet, kilit değil).
- **insight-card:** "one insight, one example, one action" — action kart içi tek
  dokunuşluk mini seçim.
- **recap:** "Yours now" pasif liste değil; öğrenci parçalarına dokunarak toplar
  ("taşını sen diz").

### 1.3 Keşif / Değerlendirme çizgisi

```text
Meet + Notice → KEŞİF: yanlış yok, not yok. Telemetri: item_seen/item_recognized (düşük ağırlık).
Build sonrası → DEĞERLENDİRME: cevap kanıt üretir. Telemetri: answer_submitted/item_produced.
```

Keşif dokunuşu asla puanlanmaz. Etkileşim ≠ sürtünme.

### 1.4 İnsight sistemi — üç seviye, tek bütçe

```text
SEVİYE 1 — KOÇ SESİ (gömülü, tek satır, başlıksız)
  "Bak, aynı parça yeni işte." → Her ekranda olabilir. Ekran SAYMAZ.

SEVİYE 2 — GÖMÜLÜ MİKRO-İNSIGHT (dokunuşla açılır)
  Chip'e uzun bas → tek cümlelik "neden böyle" balonu. Ekran SAYMAZ.

SEVİYE 3 — INSIGHT-CARD (ayrı ekran, tam sahne)
  Kendi ekranını HAK EDEN içgörü. Ders başına 2-3 TAVAN. Ekran SAYAR.
```

**Seviye-3 yerleşimi — takvimle değil ANLA:**

```text
KAPI AÇICI  → yeni kavramdan HEMEN ÖNCE   ("je suis vs j'ai", j'ai ilk kurulmadan)
KURTARICI   → öngörülebilir hatadan SONRA ("işte bu yüzden veux değil voudrais")
MÜHÜRLEYICİ → üretimden HEMEN SONRA        ("az önce yaptığının adı şu")
```

"Her aranın dolgusu" olarak insight-card YASAK. Kart, seviye-3'e TERFİ etmiş
insight'ın formudur; çoğu insight seviye 1-2'de yaşar, hiç ekran olmaz.

### 1.5 Kanon cümleler

Bol kanonik cümle serbest — cümle, chip'lerin anlamlı birleşiminin VİTRİNİdir.

```text
ÜRÜN DİLİ: model sentence / anchor sentence / scene sentence / weave example
YASAK:     memorize this / target sentence / perfect sentence
```

Bütçe notları: her cümle = bir TTS satırı (S1 maliyeti) + bir audit yüzeyi
("model-answer-only, asla chip olmaz" kuralı geçerli).

---

## 2. Surface Taksonomisi

```text
CHIP            = owned/supported production piece (öğrencinin malı)
SURFACE         = görülen/duyulan her Fransızca yüzey
FUTURE SURFACE  = henüz senin değil (ileriki malzeme)
GHOST SURFACE   = atmosfer / yakın Fransızca
```

### 2.1 Tür başına protokol

```text
AKTİF CHIP    → TANITILIR:   meet → insight → weave → check (tam protokol)
FUTURE/GHOST  → BULUNDURULUR: açıklanmaz, sorgulanmaz, bağlamda durur
RECYCLED CHIP → SELAMLANIR:  yeniden anlatılmaz; tanıdıklık işareti yeter
```

### 2.2 Future/ghost görünürlük (kapalı liste)

```text
GÖRÜNEBİLİR: compare reveal · listening-to-a-Weave · "you may hear this" satırı
             · Hub Weave recognition · Hub mixed sentence exposure
ASLA:        Meet It · chip ownership card · recap "Yours now" · expected answer
             · required fill · chip tray · grammar explanation · phrase list
```

### 2.3 Sert kurallar

```text
- Future surface asla doğru cevap olamaz; yanlışında ceza yok; üretimi istenemez.
- KANON: "A lesson teaches only its owned/supported chips. Any extra French
  appears only inside Weave-family context. The learner is never asked to
  produce future/ghost surfaces."
```

---

## 3. Exposure Ufku — kademeli + lexique-bilinçli

```text
KADEME 1 — YOĞUN:    sonraki 3-5 ders   (gerçek priming; L10 tohumu → L11 örneği)
KADEME 2 — HAFİF:    sonraki ünite ~10  (seyrek, Weave-bağlamlı)
KADEME 3 — ATMOSFER: 20-30 ders ötesi   (SADECE "listen and feel", nadir, görevsiz)
```

```ts
/** Pure, deterministic — Carryover Selector'ün kardeşi. */
function mayExpose(input: {
  candidateSurfaceId: string;
  sentenceItemIds: string[];   // surface'in yaşayacağı cümlenin parçaları
  lexique: LexiqueMemoryState;
  now: number;
}): boolean;
// Cümlenin future-DIŞI parçalarının ownership oranı
// COMPREHENSIBILITY_THRESHOLD (v1 = 0.90) altındaysa → GÖSTERME (fail-closed).
// Kademe 3: EXPOSURE_ATMOSPHERE_MAX_PER_SESSION (v1 = 1).
```

Hub'da izinli 4 future-exposure tipi: Listen and feel · Meaning recognition
(future üretilmez) · Weave compare · Not-yours-yet reveal ("coming later, just notice").

---

## 4. Instruction Weave — uygulamanın kendisi Fransızcalaşır

**Simetri:** İçerik Weave öğrencinin cümlelerini EN→FR taşır; instruction weave
uygulamanın SESİNİ taşır. Öğrenci Fransızca'yı öğrenmez yalnızca — solur.

### 4.1 Kademeler (mevcut `monolingualMode` alanı — kablo bağlanacak)

```text
english-guided : "You are at a café, ask for something"
mixed-french   : "Tu es dans un café, ask for something"
mostly-french  : "Tu es dans un café. Demande quelque chose."
french-led     : tamamen Fransızca; İngilizce yalnız acil çıkışta
```

### 4.2 Termostat kuralı — ders numarası DEĞİL, lexique sıcaklığı

```text
Bir talimat cümlesi Fransızca'ya ancak HER parçası öğrencinin sıcak malı
olduğunda döner (talimat eşiği içerik eşiğinden SERT: anlaşılmayan içerik merak,
anlaşılmayan talimat panik doğurur).
Hızlı öğrenci L22'de "Tu es dans un café" görür, yavaş öğrenci L35'te.
GERİ VİTES: parçalar soğursa talimat İngilizce'ye DÖNER — bug değil, özellik
(Comeback Mode'un talimat karşılığı). Instruction weave merdiven değil TERMOSTATTIR.
```

### 4.3 Yüzey sırası (A→D) ve acil çıkış

```text
A. Sahne bağlamları  ("Tu es dans un café")   — en ritüel, İLK döner
B. Koç sesi           ("À toi !" / "Essaie encore")
C. Buton/etiketler    ("Continuer", "Vérifier")
D. İnsight gövdeleri  — EN SON (açıklamanın anlaşılmaması öğretimin çöküşüdür;
                        B2 kapısına kadar bekler)
ACİL ÇIKIŞ: her kademede talimata uzun-basış → İngilizce belirir
(seviye-2 mikro-insight mekanizmasının kapsam genişlemesi).
```

---

## 5. Practice Hub

### 5.1 Yapı: sonsuz havuz + akıllı seçici

```text
"BUGÜNÜN SETİ": 5-8 mikro-aksiyon, 3-5 dk (TABAN). Paket biter → "bir set daha?"
(TAVAN: doğal durma). Bitirme hissi: "bugün patikaya bir taş koydun."
```

### 5.2 Seçici öncelikleri: SRS due (eski önce) → en zayıf weakPointTag →
yaklaşan entegrasyon dersinin ihtiyaç listesi (§7 bağı) → çeşitlilik (aynı aile ardışık ≤2).

### 5.3 İki ağırlık — KARIŞTIRILMAZ

```text
EVIDENCE WEIGHT  → kanıtın mastery çarpanı (yeri: mastery reducer)
SELECTION WEIGHT → bugün ne sunulacak      (yeri: practice selector)
Biri puanlama, biri sıralama. Ayrı modül, ayrı test.
```

### 5.4 Eligibility: yalnız AKTİF (ve olgun recycled) chip'ler egzersiz olur;
future/ghost sorgulanmaz (§3 4-tip hariç); terfi çizgisi: tohum → aktif → Hub-eligible.

### 5.5 Ders evidence profile

```ts
type LessonEvidenceProfile = { listening: number; production: number; recognition: number };
// toplam 1.0; ağırlık ÇARPANDIR, egzersiz ADEDİ değil.
// %30 listening = 18 listening egzersizi DEĞİL; 2 kanıta 0.30 çarpan.
```

---

## 6. (rezerve — §0'daki dört kural sweet spot bölümüdür)

---

## 7. Readiness Gate — entegrasyon kapısı

### 7.1 Ne sayar: süre değil, adet değil, HAZIRLIK

```ts
function assessReadiness(input: {
  lessonNeeds: string[];          // entegrasyon dersinin ihtiyaç itemId'leri
  lexique: LexiqueMemoryState;
  now: number;
}): { ready: boolean; coldItems: string[] };
// SICAK (v1, TUNABLE): son GATE_WARM_DAYS (v1=7) içinde ≥1 üretim kanıtı
//   VEYA refresh-due değil.
// FAIL-OPEN: veri eksik/bozuk/ilk kullanım → ready=true. Belirsizlikte engel YOK.
```

### 7.2 Akış: duvar değil teşhis + reçete

```text
Hepsi sıcak → kapı GÖRÜNMEZ.
Soğuk var   → "Bu ders senin parçalarını sahneye çıkarıyor: ... Üçü biraz
              soğumuş. 4 dakikalık ısınma seti hazırladım — ister misin?"
Reçeteyi practice selector doldurur (coldItems'tan set). Kanıt akışı = anahtar;
ayrı "kapı açma" mekanizması YOKTUR.
YASAK COPY: "Bu ders kilitli. 40 egzersiz tamamla."
```

### 7.3 Kapsam kilidi (kanon)

```text
"Readiness gate yalnızca review-integration arketipli derslerde yaşar."
Normal derslere YAYILMAZ.
```

---

## 8. Hint & Struggle — TEK birleşik merdiven

**İlke:** Proaktif hint (istekle) ve reaktif yardım (hatayla) AYNI merdivendir;
biri istekle, biri hatayla tırmanılır. Felsefe: varsayılan sessiz, cevap değil
malzeme, üretimi koruyan ("rebuild-the-thought, not copy" — Weave'deki mevcut
merdiven bu ruhu zaten taşıyor: gizli parçalar, ters sıra, iki basamak).

### 8.1 Merdiven (üretim ekranları: weave, say-it, build, fill)

```text
BASAMAK 0: sessiz. Tek görünen: "Need a hint?" (mevcut davranış — KORUNUR)
BASAMAK 1: malzeme — suggested pieces, TERS SIRADA (mevcut — KORUNUR)
BASAMAK 2: iskelet — hintCloze ("Bonjour, je voudrais ___, s'il vous plaît")
BASAMAK 3 (yalnız reaktif): cevap + "bir kez sen yaz" — görüp yazmak da
           üretimdir; DÜŞÜK ağırlıklı kanıt olarak işlenir, ders akışı devam eder.
```

### 8.2 Reaktif tırmanma (struggle policy — v1 default)

```text
1. yanlış → tek nudge (canon zaten izin veriyor) + merdiven basamağı ÖNERİLİR
            ("Bir ipucu ister misin?") — otomatik açılmaz, davet edilir
2. yanlış → basamak 2 önerilir (cloze)
3. yanlış → basamak 3: cevap + yaz-geç. SONSUZ DÖNGÜ YOKTUR.
"Geç" her basamakta mevcuttur → mastery reducer'daki SKIP kovasına düşer
(kova zaten var; UI kablosu eksikti — bağlanır).
```

### 8.3 Fill-with-traps kapsamı (mevcut eksik — kapanır)

```text
Fill'e merdiven felsefesi taşınır: ilk yanlışta trap'in NEDENİ tek satır
koç sesiyle (seviye-1) verilir — "kurtarıcı" anının mikro hali, kart gerektirmez.
```

### 8.4 Kanıt ve telemetri bağı (mevcut körlük — kapanır)

```text
- LearningEvent'e opsiyonel hintLevel alanı; hint'li success, evidence
  weighting'de success ile near-miss ARASINA konur.
- Telemetri: hint_used { screenId, level } — "hangi ekranda herkes hint'e
  sarılıyor" = içerik zorluk ayarının altın verisi.
- Say It confirm adımı ("You wrote: … — revise or keep?") korunur: en düşük
  müdahaleli hint türü, öz-düzeltme daveti.
```

---

## 9. Ders Yaşam Döngüsü (6 boşluğun default'ları)

### 9.1 Ders sonu dizisi + SRS'in görünür kılınması

```text
Check → Recap ("taşını sen diz") → SRS İLANI (tek cümle):
  "je vais artık senin — yarın kısa bir selam vermek için geri gelecek."
Mevcut DailyReviewHook deklarasyonu öğrenciye SÖYLENİR. Üç iş: yarın dönüş
beklentisi (streak'siz retention), Hub'ın varlık sebebi, "sistem hatırlıyor" güveni.
→ sonra bir-satır köprü: bir sonraki dersin sahnesi.
```

### 9.2 Replay politikası

```text
Replay SERBEST (geri dönmek meşru). Replay kanıtı DÜŞÜK çarpanla işlenir
("refresh" sınıfı) — aynı kolay dersi 3 kez oynayıp mastery şişirme açığı
kapanır; readiness gate yanlış "sıcak" okumaz.
```

### 9.3 İlerleme kilidi (normal dersler)

```text
v1 DEFAULT: doğrusal — L(n) bitmeden L(n+1) açılmaz.
Yerleştirme istisnası: placement L8 derse, L1-L7 "atlanmış" statüsü alır
(kilitli değil, tamamlanmış değil; replay serbest, kanıt refresh sınıfı).
```

### 9.4 İlk-kullanım öğretimi (affordance)

```text
L0'ın işi + ilk meet-card'da TEK SEFERLİK koç satırı: "Parçalara dokun."
Kalıcı tutorial ekranı YOK; öğretim, ilk dokunuşun kendisidir.
```

### 9.5 Ses default'u

```text
Meet-card ilk gösterimde kanon cümle AUTO-PLAY + kalıcı ses ayarı (kapatılabilir).
Chip dokunuş sesleri HER ZAMAN manuel. AUDIO FAIL: ikon sönük + "ses şu an yok";
ders asla ses yüzünden bloklanmaz.
```

### 9.6 Kenar durumları (üretim ekranları — smoke'ta zorunlu)

```text
EMPTY:   nazik dürtme + frame hatırlatma ("Je voudrais ___, s'il vous plaît")
GARBAGE: "Bunu çözemedim. Kahve istemeyi dene: …" — sıfırlama yok
```

---

## 10. Telemetri Ekleri (şema bump gerektirir)

```text
hint_used          { screenId, level }
gate_encountered   { lessonId, coldItemCount }
gate_passed        { lessonId, via: "already_warm" | "warmup_set" | "fail_open" }
chain_step_done    { screenId, stepIndex }
lesson_replayed    { lessonId }
srs_notice_seen    { lessonId }            // §9.1 ilanının görülmesi
```

Zincir disiplini: her mikro-aksiyon KENDİ event'ini atar — huni aksiyon-seviyesine iner.

**Kalibrasyon soruları (smoke):** kapı takılma oranı; ısınma seti süresi; medyan
ders süresi 7-10 bandında mı; hub oturum dağılımı; "bir set daha?" kabul oranı;
hint_used yoğunlaşan ekranlar.

---

## 11. Validator Kuralları (artımlı)

```text
V1  screen_action_count       ERROR   ekranda mikro-aksiyon > 4
V2  passive_screen            WARNING hiç etkileşim yok (Devam hariç)
V3  future_as_answer          ERROR   future/ghost doğru cevap konumunda
V4  future_in_forbidden_zone  ERROR   future §2.2 yasak listesinde
V5  insight_budget            WARNING ders içi seviye-3 kart > 3
V6  gate_scope                ERROR   gate review-integration dışında
V7  exposure_horizon          WARNING kademe-3 exposure oturumda > 1
V8  production_without_ladder WARNING üretim ekranında hint merdiveni tanımsız
V9  fill_without_recovery     WARNING fill'de trap-nedeni koç satırı yok
```

---

## 12. İnşa Sırası (Dev APK canon'a saygıyla)

```text
FAZ A — ŞİMDİ (doküman/contract, kod yok):
  bu kanon repoya (docs/) · terim kararı canon'a · V1-V9 spec olarak

FAZ B — İKİNCİ SMOKE SONRASI, sinyale göre:
  meet/insight/recap etkileşimleri (payload; tip seti 7'de kalır)
  birleşik hint/struggle merdiveni (§8 — Weave'deki mevcut merdivenin genişlemesi)
  ders sonu dizisi + SRS ilanı (§9.1) · kenar durumları (§9.6)
  practice selector v0 + "bugünün seti" · evidence profile alanı

FAZ C — HUB OTURDUKTAN SONRA:
  readiness gate (assessReadiness + telemetri)
  exposure selector (mayExpose) + kademeli ufuk
  replay çarpanı (§9.2) · kademe-3 atmosfer içerikleri

FAZ D — LEXIQUE VERİSİ BİRİKİNCE:
  instruction weave termostatı (§4) — yüzey sırası A→D, kademeli devreye alma

Gerekçe: kapının reçetesini hub doldurur; exposure ve instruction weave,
lexique memory birikmeden kalibre edilemez. Sıra bağımlılıktan gelir.
```

---

## 13. Açık Kararlar (tunable / adlandırma)

```text
- COMPREHENSIBILITY_THRESHOLD (0.90?) · GATE_WARM_DAYS (7?)          → telemetri kalibre eder
- Talimat eşiği: içerik eşiğinden ne kadar sert? (v1: %100 owned)     → telemetri
- Replay çarpanı değeri (0.25? 0.5?)                                   → telemetri
- "Bugünün seti" ürün adı · recycled görsel selamı (ton farkı mı?)    → isim/UI faslı
- Zincir adım işaretçisi (v1: ekran baştan)                            → kullanıcı sinyali
- BİLİNÇLİ RAF: erişilebilirlik (Faz 2+, Play politikaları sorunca) ·
  bildirim politikası (ürün kararı, ders akışı değil)
```

---

*v1.0 = v0.2 + §4 (instruction weave) + §8 (birleşik hint/struggle) + §9 (yaşam
döngüsü default'ları) + V8-V9 + telemetri ekleri + Faz D. Egzersip canon v0.4,
Payload Economy, chip taxonomy ve carryover spec'lerinin kardeşidir — hiçbirini
değiştirmez, boşluklarını kapatır. Bundan sonra değişiklik = versiyon bump.*
