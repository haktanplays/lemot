> [!runtime] Legacy test checklist — check [[Home - Le Mot]] first
> This checklist reflects an older runtime/build context and may be superseded by current Le Mot canon.
> Use it as a historical QA/reference note only. Do not treat it as the current implementation checklist without checking [[Home - Le Mot]] and the repo docs.

# Le Mot — Dev APK Test Checklist

> Status: Historical archive. Preserved for context. Current canon lives in [[Home - Le Mot]], [[Cairn Codex]], and task-specific v0.2 notes.

## v0.2 Role

Use this note for:

- Historical private QA checklist context for an older Dev APK build.
- Remembering prior smoke categories and failure modes.

Do not use this note for:

- Current tester protocol.
- Current repo smoke checklist.
- Current build/artifact state.

Active replacements: [[PR and Smoke Log]] · [[Agent Workflow Playbook]] · future [[User Testing Protocol]]


> **Aktif APK build**: `[REDACTED-BUILD-ID]` · Profile `preview` · `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` · Commit `e07e97f` (APK Test Findings sprint sonrası)
> Install: [REDACTED-EAS-URL]
> Build başlatıldı: 2026-05-02 · Tester: Haktan (sonra: 5 external tester)
> Önceki build: `[REDACTED-BUILD-ID]` (2026-04-29) — superseded
> İlişkili: [[LeMot]] · [[LeMot - User Journey]] · [[Tasarım Envanteri]]

> **Pre-flight bu build için tamam**: Supabase project active · 4 Edge Function ACTIVE · AI provider secrets Supabase Dashboard'da yazılı · EAS preview env değişkenleri set edildi.
> Bu build'in ana farkı önceki build'e göre: **APK Test Findings sprint'i (12 commit) + AI features aktif**.

> Her madde "geçti / geçmedi / not" olarak işaretlenir. Kritik fail varsa fix → yeni build → tekrar tara.

---

## 0. Pre-flight (her test öncesi)

- [ ] APK güncel (`e07e97f` commit'ten build, build ID `7fbaff1c`)
- [ ] Cihaz / emulator: Android 10+ (Pixel 5 emulator önerilen, gerçek Galaxy/Xiaomi de iyi)
- [ ] App'i daha önce kurduysan: **uninstall + clean install** (Lesson Zero flag + cache fresh olsun)
- [ ] İnternet bağlantısı açık (AI features için zorunlu, lesson core flow'u offline çalışır)

---

## 0.5 APK Test Findings Sprint Doğrulaması (öncelikli — bu build'in core sebebi)

> 12 atomik commit (`d465c60..e07e97f`, 2026-05-02) ile 6 bug fix'lendi. Her birini ayrıca doğrula. Bu bölüm fail ederse sprint geri çağrılır.

### Bug A — Layout overflow (Adım 1, 7B)
- [ ] L1 Read & Listen → CaReFuL pronunciation kartında "C, R, F, L are pronounced..." metni container içinde, taşmıyor
- [ ] Pronunciation kartının iki sütunu (French ↔ English): French üstte, English altta vertical stack — yan yana clip yok
- [ ] L1 Patterns → "Pouvez-vous répéter" kartında "pouvez-vous" tam görünüyor (sadece "pouvez" değil)
- [ ] L1 Patterns → "Au revoir" tam görünüyor (sadece "au" değil)
- [ ] L1 Patterns → "Je voudrais..." tam görünüyor (sadece "je" değil)
- [ ] Multi-line text 2+ satır olduğunda hiçbir satır clip olmuyor

### Bug B — Scoring 5/5 perfect (Adım 3, 4, 5)
- [ ] Lesson section'da yanlış cevap ver → section sonu transition ekranında **"5/5 done"** üstte küçük + **"3/5 correct"** altta yıldızla görünüyor
- [ ] Yanlış cevap varken **yıldız boş** (perfect şeklinde dolu görünmüyor)
- [ ] Tüm cevaplar doğru ise → **"5/5 done · 5/5 correct"** + yıldız dolu (amber)
- [ ] WriteSection: son item dahil tüm cevaplar sayılıyor (önce stale state'le 4/5 görünüyordu)
- [ ] CombineWeave: combine + weave fazları **toplam** olarak puanlanıyor (sadece combine değil)
- [ ] Yanlış cevap progression'ı bloklamıyor (next butonu çalışıyor)

### Bug C — Daily Review L1 user → L4 content sızıntısı (Adım 6)
- [ ] Sadece L1 tamamlandı → Daily Review aç → **yalnız L1 kelimeleri** geliyor
- [ ] L4'e ait kelime (örn: "j'ai faim", "j'ai besoin") Daily Review'da görünmüyor
- [ ] Distractor seçenekleri de L1 havuzundan (yanlış seçenek olarak L4 kelimesi gelmiyor)
- [ ] L1+L2 tamamlandı → Daily Review L1+L2 kelimelerinden, L3+ yok

### Bug D — Phrase fragmentation (Adım 7, 7B)
- [ ] L1 BuildSentence #2: "Merci beaucoup, au revoir" tile'ları → `[Merci] [beaucoup] [au revoir]` (au+revoir ayrı tile değil)
- [ ] L1 lesson1.ts: "Pouvez-vous répéter ?" tam phrase görünüyor (`?` punctuation dahil)
- [ ] Pool1 line 104 fillFG: visible cümle "Pardon ! Je ne comprends pas. Pouvez-vous répéter ?" — sadece son blank "répéter"

### Bug E — TTS placeholder sesi (Adım 2, 8)
- [ ] L1 Weave Fill Listen butonu → TTS `[___]`, `___`, `[...]` SES çıkarmıyor — temiz Fransızca cümle okuyor
- [ ] Multi-blank fill'de Listen → doğru cevaplarla doldurulmuş tam cümle okuyor (örn: "Je ne comprends pas." değil "Je [pause] [pause] [pause] pas.")
- [ ] L1 French Fill Listen → `item.fr` field'ı kullanılıyor (raw template değil)
- [ ] Quiz English/oklu/T-F sorularında Listen butonu **görünmüyor** (looksFrench filter)

### Bug F — In-lesson AI (Adım 9, 10)
> Pre-req: Supabase active, EAS env set, Edge Functions deploy edilmiş

- [ ] L1 Part 3 → **Say It Your Way** açıldı, situation prompt + target kelimeler görünüyor
- [ ] Cümle yazıp submit → AI evaluation cevap dönüyor (5-15 sn içinde)
- [ ] AI feedback Fransızca + İngilizce karışık, "you" 2. tekil kullanılıyor ("the user" yasak)
- [ ] Target kelime kullanımı kontrol ediliyor
- [ ] L1 Part 3 → **Mini Conversation** açıldı, AI ilk Fransızca mesajı atıyor
- [ ] User cevap → AI 3-4 turlu konuşma sürdürüyor, ders konusuna kilitli
- [ ] Mesaj başına Listen butonu var, AI mesajı temiz okuyor
- [ ] AI fail durumunda (rate limit, timeout) crash yok, fallback string görünüyor
- [ ] Chat tab **gizli** (FEATURES.aiChat=false dev-apk'te) — `aiLesson` flag aktif olsa da chat tab kapalı

### Validator state
- [ ] Build sırasında validator warning sayısı 6 (L6+ phrase-fragmented warnings) — Dev APK kapsamında 0 error
- [ ] L1-L5'te phrase-fragmented warning yok (bu build'in scope kontrolü)

---

## 1. İlk Açılış Akışı (Lesson Zero)

### Splash + Lesson Zero entry
- [ ] App açıldığında "Le Mot" splash görünüyor (FAF9F7 background, splash icon)
- [ ] Splash sonrası **Home değil, Lesson Zero**'ya yönlendiriyor
- [ ] Lesson Zero açılırken Home flash'ı **görünmüyor** (spinner ile gizli)

### Lesson Zero 8 step flow
- [ ] **Step 1 (MCQ)**: "I ___ a coffee" sorusu, 4 seçenek (suis / veux / **voudrais** / comprends)
- [ ] Yanlış seçim → feedback ekranı yine "Correct answer: voudrais" gösteriyor (cezalı dil yok)
- [ ] **Step 2 (Weave reveal)**: "I voudrais a coffee" + "You already know more than you think." mesajı
- [ ] **Step 3 (Listen)**: "Bonjour, je voudrais un café" + Listen butonu
  - [ ] Listen butonuna basınca **temiz Fransızca** TTS okuyor (English aksanı yok, sadece FR)
  - [ ] Cümleyi birden çok kez çalabiliyorsun (block yok)
- [ ] **Step 4 (Comprehension)**: "What are you doing?" → Greeting / **Ordering coffee** / Asking direction
- [ ] **Step 5 (Build)**: 5 tile [Bonjour] [Je] [voudrais] [un] [café] — drag/tap ile sıralanıyor
  - [ ] Tile'lar shuffle'lı geliyor (her açılışta sıralı değil)
  - [ ] Yanlış tile koyunca tekrar al-ver mümkün
  - [ ] Doğru cümle "Bonjour, je voudrais un café" olduğunda Check butonu aktif
- [ ] **Step 6 (Write)**: Empty input + "Type it yourself" prompt
  - [ ] `bonjour je voudrais un cafe` (aksansız) kabul ediliyor
  - [ ] `bonjour, je voudrais un café` (virgüllü+aksanlı) kabul ediliyor
  - [ ] Eksik karakter / yanlış kelime → Check yine Continue'ya geçiyor (lesson zero'da hard-block yok)
- [ ] **Step 7 (Final)**: "Used. Not memorized." + "You just built real French." + "Start Lesson 1" butonu
- [ ] "Start Lesson 1" basınca **Lesson 1**'e gidiyor (Home'a değil)

### Returning user
- [ ] App'i kapatıp yeniden aç → **Home**'a gidiyor (Lesson Zero tekrar açılmıyor)
- [ ] App data clear edip yeniden aç → Lesson Zero tekrar görünüyor (flag temizlendi)

---

## 2. Home Screen (dev-apk profile)

### Görünmesi gerekenler
- [ ] Üst satırda "Le Mot · Day N · Weekday" formatlı tarih label'ı
- [ ] Sağ üstte "Sign In" butonu (henüz giriş yapmadıysan) ya da "Account" (yapdıysan)
- [ ] Mountaineer / journey illustration hero görseli (current stage'e uygun)
- [ ] Stage caption ("Stage X of 14 · ...") + subtitle
- [ ] Motivational quote (italic, serif) — günlük rotate ediyor
- [ ] **Daily Review** kartı (target icon + 0/5 progress + "Start Review" / "You used French today.")
- [ ] **Lesson list**: **sadece L1, L2, L3, L4, L5** görünüyor — **L6+ asla görünmüyor**

### Görünmemesi gerekenler (kritik)
- [ ] ❌ XP göstergesi yok (hiçbir sayı / gradient bar XP olarak etiketlenmemiş)
- [ ] ❌ Streak göstergesi yok (alev ikonu, "day streak" yazısı yok)
- [ ] ❌ "$12.99/mo" hiçbir yerde yok
- [ ] ❌ "Premium" / "Subscribe" / "Trial" / "Unlock" copy yok
- [ ] ❌ L11 ile L12 arası paywall banner yok (zaten L11+ görünmüyor — banner da yok)
- [ ] ❌ Reward dili yok ("Goal complete!", "Level up!", "Amazing!")
- [ ] ❌ "Come back tomorrow" gibi günlük baskı yok

### Bottom navigation (4 tab — Chat olmamalı)
- [ ] **Journey** (mountain icon, default selected)
- [ ] **Practice** (layers icon)
- [ ] **Progress** / Stats (bar chart icon)
- [ ] ❌ **Chat** tab **görünmüyor** (FEATURES.aiChat=false dev-apk'te)

---

## 3. Lesson Zero → Lesson 1 Smoke Test

Lesson 1 (Survival Kit) açıldığında 11 section sırayla geçilmeli. Her section "geçildi mi" olarak işaretle:

- [ ] **01 · Read & Listen** — Fransızca cümleler + Listen butonu (TTS temiz okuyor)
- [ ] **02 · Patterns** — Grammar block, etymology, conjugation tabloları render
- [ ] **03 · Weave Fill** — `s` (English+French karışık) + Listen + 4 seçenek
  - [ ] Listen butonu **temiz Fransızca** okuyor (`fr` field'ı kullanılıyor)
- [ ] **04 · French Fill** — Pure French sentence + cloze
- [ ] **05 · Build** — Tile arrangement
- [ ] **06 · Write** — Type-from-memory input
- [ ] **07 · Quiz** — Multiple choice
- [ ] **08 · Combine + Weave** — Hint → sentence build
- [ ] **09 · Say It Your Way** — Free text input
  - [ ] AI evaluation çalışıyor (Supabase active, detay 0.5/Bug F bölümü)
- [ ] **10 · Mini Conversation** — AI chat
  - [ ] AI cevap veriyor (Supabase active, detay 0.5/Bug F bölümü)
- [ ] **11 · Review** — Mixed exercises + audio
- [ ] Lesson tamamlanınca Home'a geri dönüyor
- [ ] Lesson 1 tamamlandı → Home'da Lesson 1 progress 11/11 görünüyor

L2, L3, L4, L5 için **en az açılıyor mu, ilk section çalışıyor mu** smoke test:
- [ ] L2 (Être) açılıyor, ilk section render
- [ ] L3 (Yes/No/You) açılıyor, ilk section render
- [ ] L4 (Avoir) açılıyor, ilk section render
- [ ] L5 (Articles) açılıyor, ilk section render

---

## 4. TTS (Kritik — Le Mot'un kalbi)

- [ ] Lesson Zero Listen butonu → "Bonjour, je voudrais un café." temiz okuyor
- [ ] L1 Read&Listen TTS temiz okuyor
- [ ] L1 Weave Fill Listen butonu → karışık `s` yerine temiz Fransızca `fr` okuyor (örnek: `s = "I [___] a coffee, please."` ama TTS `Je voudrais un café, s'il vous plaît.` der)
- [ ] Aksanlar doğru ("café" → "ka-fey" değil "ka-fé")
- [ ] Hızlı arka arkaya 3 kez basınca crash yok
- [ ] TTS başlamadan önce 1-2 saniye boş ses yok (ilk-play glitch fix'lendi mi?)
- [ ] Sessize alınmış cihazda Listen butonu **basıyor ama ses çıkmıyor** (cihaz volume bağımlı, app crash etmiyor)

---

## 5. Daily Review

- [ ] Home'daki Daily Review kartı görünüyor (Target icon + 0/5 bar + "Start Review")
- [ ] "Start Review" basınca overlay açılıyor (modal, full-screen değil)
- [ ] 5 review item geliyor (en az birkaç kelime gösteriyor)
- [ ] 5/5 tamamlandığında overlay kapanıyor
- [ ] Home'a dön: kart "You used French today." mesajı + tickle yeşil
- [ ] **Yarın açıldığında**: count sıfırlanıyor, yeni 5 word
- [ ] ❌ "Goal complete!" yazısı yok (eski reward dili)
- [ ] ❌ Streak counter yok

---

## 6. Stats / Progress Tab

- [ ] Stats tab açılıyor
- [ ] **"Lessons done" 0/24** olarak gösteriliyor (24 — `LESSONS.length`, **kesinlikle 16 değil**)
- [ ] L1 tamamlandı sonrası 1/24 gösteriyor
- [ ] Sections counter ("of 264 sections") doğru artıyor
- [ ] Weak Spots section yarayan kelime varsa listeliyor
- [ ] Daily Review counter doğru (Home ile aynı)
- [ ] Milestones — Basic Communicator (L1-5) tüm L1-L5 bittiğinde "Completed!" oluyor
- [ ] Lesson Progress tablosu 24 lesson hepsini listeliyor (L6-L24 0/11 görünür ama açılmaz — dev-apk'te home'da gizli)
- [ ] ❌ XP, Level, Streak hiç yok

---

## 7. Practice Tab

- [ ] Practice tab açılıyor (Layers icon)
- [ ] Scenario kartları görünüyor (en az birkaç tane)
- [ ] Bir scenario kartı açıldığında: situation + answer + explanation + Listen
- [ ] Listen TTS temiz Fransızca okuyor
- [ ] SRS (Leitner 5-box) yeni kart → bilinen kart progression çalışıyor
- [ ] Pratik bir kartı 3 kere doğru → "Mastered" aşamasına geçiyor (zaman içinde)

---

## 8. Auth (Sign In Flow — Opsiyonel)

- [ ] Home'da sağ üst "Sign In" butonu basınca `/auth` route'una gidiyor
- [ ] Sign Up çalışıyor (email + password ile yeni hesap)
- [ ] Sign In çalışıyor (mevcut hesap)
- [ ] Sign in olduktan sonra Home'da display name ya da email görünüyor
- [ ] Sign Out → Home'a dönünce "Sign In" butonu yine görünüyor
- [ ] Auth offline'ken (uçak modunda) → kibar hata mesajı, crash yok

> **Not**: Supabase project active (2026-05-02 resume). Auth crash etmemeli, normal flow beklenir.

---

## 9. Negatif Test — Bunlar **olmamalı**

- [ ] L6, L7, L8, L9, L10, L11 Home'da **listede yok**
- [ ] L12, L13, ..., L24 Home'da **listede yok**
- [ ] Chat tab bottom nav'da **yok**
- [ ] Mon Lexique / Lexique tab **yok**
- [ ] Hiçbir ekranda "$12.99" yazısı **yok**
- [ ] Hiçbir ekranda "Premium" CTA **yok**
- [ ] Hiçbir ekranda "Trial" / "Subscribe" **yok**
- [ ] Hiçbir ekranda flame / streak ikonu **yok**
- [ ] Hiçbir ekranda XP sayacı **yok**
- [ ] Lesson tamamlandığında "Goal complete!" / "+50 XP!" mesajı **yok**
- [ ] Yanlış cevap verince "Wrong!" / "Try again or you'll lose progress!" **yok** — onun yerine "Take another look." veya specific feedback

---

## 10. Performance / Stability

- [ ] App açılış süresi 3 saniyenin altında (Pixel 5 emulator)
- [ ] Lesson section geçişleri akıcı (frame drop yok)
- [ ] 10 lesson section arka arkaya tamamlandığında memory leak / yavaşlama yok
- [ ] Home'a dön → Lesson aç → Home → Lesson farklı → Home, sırasında crash yok
- [ ] App'i background'a at, geri getir → state korunuyor
- [ ] App'i tamamen kapat (force close), tekrar aç → progress kaydedilmiş

---

## 11. Visual / UX (V4-B redesign **öncesi**, mevcut UI)

> Mevcut UI V3'ün polish hali. V4-B redesign sonrası bu maddeler güncellenecek.

- [ ] Renk paleti tutarlı (red `#C0392B`, green `#27AE60`, amber `#E67E22`)
- [ ] Newsreader (serif) font Fransızca text'lerde ve hero'da çalışıyor
- [ ] Outfit (sans-serif) UI'da çalışıyor
- [ ] Karanlık modda da app çalışıyor (userInterfaceStyle: "light" forced ama cihaz dark olsa bile)
- [ ] Tablet / büyük ekranlarda layout bozulmuyor (supportsTablet false ama Android'de büyük ekranlar var)

---

## Sonuç Özeti (her test sonrası doldur)

```
Build: 7fbaff1c (commit e07e97f, 2026-05-02)
Tester: Haktan
Test tarihi: 2026-__-__
Süre: __ dakika

Section 0.5 (sprint doğrulaması):
  Bug A (layout): ☐ geçti / ☐ fail (not: __)
  Bug B (scoring): ☐ geçti / ☐ fail (not: __)
  Bug C (daily review): ☐ geçti / ☐ fail (not: __)
  Bug D (phrases): ☐ geçti / ☐ fail (not: __)
  Bug E (TTS placeholder): ☐ geçti / ☐ fail (not: __)
  Bug F (in-lesson AI): ☐ geçti / ☐ fail (not: __)

Genel:
  GEÇTİ: __ / __
  GEÇMEDİ: __ / __
  KRİTİK FAIL: __ tane

NOTLAR:
- 
- 
- 

VERDIKT: ☐ ✅ Internal test geçti — V4-B redesign sprint başlat
        ☐ ⚠️ Minor fix gerekli — V3 üzerinden devam, V4-B sonra
        ☐ ❌ Major fail — Dev APK fix loop (sprint bug'larından biri tekrar açıldı)
```

---

## Build Log

| Build ID | Commit | Tarih | Tester | Verdikt | Notlar |
|---|---|---|---|---|---|
| `7fbaff1c` | `e07e97f` | 2026-05-02 | Haktan | TBD | APK Test Findings sprint sonrası ilk build, Supabase active, AI features aktif |
| `f2c64465` | `c21a13c` | 2026-04-29 | Haktan | superseded | İlk preview APK, Supabase paused durumdaydı |

---

## Notlar

- Bu checklist **V3 görsel + dev-apk scope** test eder. V4-B redesign sonrası ayrı checklist gerekli (özellikle: Daily Review 4-screen ritüeli, Lesson Anchor / Outro yeni ekranları, asimetrik nefes layout doğrulaması — bkz [[Tasarım Envanteri]]).
- Bu build'te AI features ilk kez aktif test edilebiliyor (Supabase active + Edge Functions deploy + EAS env set).
- 5 external tester'a APK gönderilirse test bulgularını burada agg edip sprint planı çıkar.
- Section 0.5'teki 6 bug'dan herhangi biri fail ederse: ilgili commit'in fix mantığı tekrar açılıyor demektir, sprint geri çağrılır ve yeni bir patch round'u gerekir.
