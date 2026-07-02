# Cairn — Güncel Yol Haritası (Temmuz 2026)

> **Kaynak durum:** `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` (repo'ya henüz commit edilmedi) + `haktanplays/lemot` repo analizi (Round 1 runtime ACCEPTED & FROZEN, 2026-06-17, 262 yeşil test).
>
> **Sıralama mantığı:** Önce zemini agent-güvenli yap → en küçük riskli dilimlerden motorlara tırman → kod gerektirmeyen kararları tek kapıda topla → içerik ve release en sona.

---

## Genel bakış

| Faz | Ad | Süre | Kim | Çıktı |
|-----|----|------|-----|-------|
| 0 | Zemin hijyeni | ~yarım gün | Claude oturumu | Temiz canon, karar kuyruğu |
| 1 | §29 cleanup PR | ~yarım gün | Claude oturumu | L4/L6 chip ayrıştırma |
| 2 | Guardrail lint | ~1 gün | Claude oturumu | Recap kuralı CI'da |
| 3 | Error Engine v0 | ~1 hafta | Claude oturumu | Verdict + taksonomi + test |
| 4 | Mastery kontratı | ~1–2 hafta | Claude + Haktan review | Sayısal formüller + Carryover v0 |
| 5 | Karar kapısı | 1 oturum | **Haktan** | 4 kilitli karar |
| 6 | İçerik fabrikası | sürekli | Ortak | Unit unit authoring döngüsü |
| 7 | Release hattı | ~1 hafta | Ortak (EAS/store: Haktan) | Prod build, crash raporlama, beta |

**Gerçekçi takvim (tam zamanlı işin yanında):** Faz 0–2 bu hafta → Faz 3–4 Temmuz sonu → Faz 5 Ağustos başı → sonrası içerik maratonunun temposuna bağlı.

---

## Faz 0 — Zemin hijyeni

**Neden ilk:** Bu faz atlanırsa sonraki her agent oturumu yanlış canon'u okuma riskiyle başlar. Kod yazmadan önce agent'ların çalışacağı zemin temizlenir. Ucuz sigorta.

**İşler:**

1. `CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` dosyasını `docs/` altına commit et (repo'da şu an sadece v0.1 var — bir agent repo'yu açınca v0.1'i canon sanabilir).
2. Precedence zincirini güncelle: `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0`.
3. Spec içindeki superseded v0.3 bölümlerini fiziken sil ya da ayrı arşiv dosyasına taşı (agent'ın hangi bölümün hangisini geçersiz kıldığını karıştırma riski gerçek).
4. Legacy karantinası: `data/lessons/lesson1-24`, flashcards, milestones ağacına ve `app/(tabs)/practice.tsx` + `chat.tsx` route'larına açık **LEGACY — DO NOT BUILD ON THIS** uyarısı. (Bu iki tab hâlâ `useSRS`/`useErrors`/`useChat` legacy hook'larını import ediyor; dev-apk'da gizli ama kod canlı — agent tuzağı.)
5. `docs/KNOWN_GAPS.md` oluştur: tespit edilen 14 açık, her biri için karar sorusu + önerilen default (aşağıdaki "Açık envanteri" bölümü temel alınabilir).

**Kabul kriteri:** Yeni bir agent oturumu repo'yu açtığında tek ve doğru canon'u görüyor; legacy'ye dokunmuyor.

---

## Faz 1 — §29 cleanup PR

**Branch:** `fix/round1-3a-recap-mainpieces-cleanup`
**Sınıf:** Content-only → spec §56.2'ye göre smoke-free. Schema ve runtime'a dokunmaz. Sadece 2 dosya.

**Neden Faz 2'den önce:** Faz 2'deki lint yazılmadan önce içerik kurala uymalı; yoksa lint eklendiği an CI kırmızıya döner.

**Değişiklikler:**

- `lesson-004.ts` → `piecesUsed`: `["j'ai", "j'ai faim", "j'ai une question", "Bonjour"]` yerine `["j'ai", "faim", "une question", "Bonjour"]`
- `lesson-006.ts` → `piecesUsed`: `["Bonjour", "Je suis ici", "J'ai une question", "Merci", "Au revoir"]` yerine `["Bonjour", "je suis", "ici", "j'ai", "une question", "Merci", "Au revoir"]`

**Doğrulama zinciri (hepsi CI'da mevcut):** `typecheck` → `validate:content` → `validate:pools` → `test:learning-engine` (262 test).

---

## Faz 2 — Guardrail lint

**Neden:** §29 regresyonunun kök nedeni, validator'ların learning-engine fixture'larını doğrulayıp lesson-v1 içerik kurallarını doğrulamaması. Recap kuralı ("piecesUsed'da tam cümle olamaz") prose olarak var, otomatik kontrol yok.

**İşler:**

1. `validate:content`'e yeni kural: piecesUsed girdileri cümle olamaz (heuristik: büyük harfle başlayıp özne+yüklem içeren çok-chip'li girişler, protected chunk listesi hariç).
2. Dar TTS placeholder regex'inin genişletilmesi (bilinen borç).
3. Yeni kuralların testleri + CI'a giriş.

**Kalıcı kazanç:** Bu kural CI'a girdiği an hiçbir agent bir daha sentence-chip sokamaz. "Contracts constrain" doktrininin mekanik uygulaması.

---

## Faz 3 — Error Engine v0

**Kapsam:** Saf engine — UI yok. Tamamı pure function + test. Bu yüzden tamamı Claude oturumlarında bitip CI'da doğrulanabilir; cihaza iş düşmez.

**İşler:**

1. §13'ün 7 feedback verdict'i TypeScript union tipine: `accepted | accepted_with_note | neutral_compare | precision_issue | wrong_target | repair_opportunity | not_yet`.
2. 11 girişlik error taksonomisi (`wrong_auxiliary_faim`, `partitive_negative`, `sentence_replay`, `article_gender_mismatch`, `overliteral_translation`, `register_mismatch`, `protected_chunk_split`, ...) veri + eşleme fonksiyonları olarak.
3. **Migration eşlemesi:** Mevcut `grade.ts` sonuç modeli ("correct" / error-tag) → yeni verdict'ler. Codebase'de iki feedback dili yaşamamalı.
4. **Kritik tasarım kararı:** Her error id'ye `deterministic | ai_assisted` etiketi. v0 **AI olmadan da çalışır** (deterministic-only mod) — böylece Faz 5'teki AI hattı kararı bu fazı bloklamaz. AI-assisted teşhisler için fallback merdiveni tanımı: AI yoksa/rate-limitliyse deterministik alt kümeye düş.
5. Test seti + CI.

---

## Faz 4 — Mastery kontratı

**Neden:** Spec'in en büyük drift deliği. Lexique Memory'nin 25+ alanı (strengthScore, decayScore, transferCount, contextFitScore...) isimlendirilmiş ama **formülsüz**. Formül verilmeyince iki farklı agent, ikisi de "spec'e uygun" ama birbirinden farklı iki mastery sistemi yazar.

**İşler:**

1. **Önce spec'e sayılar:** decay eğrisi (ör. üstel, yarı ömür parametresi), state machine geçiş eşikleri (ghost → recognition → active → supported → recycled → dormant için sayısal kriterler), transfer sayacının mastery'ye etkisi.
2. Pure function implementasyonu + **property-based testler** (ör. "decay hiçbir zaman strength'i artıramaz", "tek recognition olayı production mastery veremez", "Micro-Logic tek başına production mastery'yi artıramaz").
3. **Carryover Selector v0 bütçe kontratı:** ders başına max N carryover; öncelik sırası `weak > decaying > transfer-ready`; "recycle cannot steal the lesson" ilkesinin mekanik hali (carryover item'ları ders hedefi item'larının önüne geçemez, exercise slotlarının belirli oranını aşamaz).
4. Bu faz bitince Micro-Logic ve Repair Loop kartları güvenle inşa edilebilir hale gelir — "bu kart mastery'yi nasıl etkiler" sorusunun artık sayısal cevabı vardır.

**Haktan'ın rolü:** Formül parametrelerinin pedagojik review'u (eşikler çok mu agresif / çok mu gevşek).

> **Durum (2026-07-02):** Faz 4A tamam — sayısal kontrat spec §65'e yazıldı ve
> Option A (frozen `mastery-v0.2` üzerine pure derived layer) operatör onayıyla
> kilitlendi; `recycled` v0.1'de query-time carryover rolü, intrinsic state
> değil. Faz 4B (pure `lexique-memory.ts` + testler) bekliyor. Açık kalemler:
> `docs/KNOWN_GAPS.md` #2.

---

## Faz 5 — Karar kapısı (kod yok)

Faz 1–4 hiçbir karara bağımlı değil; sen karar vermeden dört haftalık iş akabilir. Ama Faz 6–7 bu kararlar olmadan başlayamaz. Tek oturumda dört karar:

### 5.1 Ses stratejisi
- Spec'in kendi doktrini (elision, liaison) ses temelli; ama 10 egzersiz kontratının hepsi metin-tabanlı. Dedicated listening kontratı yok, pronunciation yok.
- **Karar:** Kayıtlı native ses mi, expo-speech TTS ile devam mı? Listening comprehension kontratı hangi fazda? Ses asset pipeline'ı (kayıt, depolama, bundle boyutu) nasıl?

### 5.2 AI hattı
- **Mevcut çelişki:** Edge function'lar (`ai-chat`, `ai-evaluate`, `ai-error`) `supabase.auth.getUser()` ile login zorunlu kılıyor; ürün yönü ise no-auth/local-only (`noSupabaseAuthGuard.test.ts` bunu koruyor). Yani AI altyapısı **fiilen çağrılamaz** durumda.
- **Routing sapması:** `providers.ts` gerçeği Gemini 2.5 Flash → Gemini 2.5 Pro → Groq Llama 3.3 → Mistral. Planlanan Flash-Lite/Flash/Haiku zincirinde Claude hiç yok.
- **Rate limit yok:** per-user kota, günlük token tavanı, istek sıklığı limiti yok. Auth açıldığı gün maliyet riski.
- **Karar:** Auth'suz dünyada edge function'lar nasıl çağrılacak (anon device token + kota?), routing güncellenecek mi, rate limit politikası ne?

### 5.3 Monetizasyon
- Spec'te para modeli **hiç yok**; legacy canon'da ise kilitli karar var (L14 sonrası paywall, $12.99/ay) ve paywall kodu repo'da duruyor — agent yanlışlıkla diriltebilir.
- **Karar:** Cairn'de paywall var mı, yok mu, ertelendi mi? Karar spec'e yazılır; legacy paywall kodu karantinaya/silmeye gider.

### 5.4 Sync
- Remote şema legacy dönemde donmuş (sadece profiles, user_progress, user_errors). Event-sourced learning-engine'in hiçbir remote karşılığı yok. Local-only kararıyla tutarlı ama "telefon kaybolursa ilerleme gider" gerçeği yazılı bir karar değil.
- **Karar:** Local-only ne kadar sürecek? Repository abstraction'ın remote implementasyon kontratı ne zaman tasarlanacak? Ara çözüm olarak manuel export/backup yeterli mi?

---

## Faz 6 — İçerik fabrikası (asıl maraton)

**Neden kritik:** 180 derslik syllabus bir topic haritası; geriye ~174 ders var. Engine, içerikten çok önce bitecek. Gerçek darboğaz burası.

**Authoring döngüsü kontratı:**

1. Batch = Unit bazlı (ör. Unit 2: A1 Social Survival, ~12 ders tek batch).
2. Agent, lesson taslağını **validator-first** üretir: taslak `validate:content` + `validate:pools`'tan geçmeden review'a gelmez.
3. Haktan pedagojik review yapar (chip seçimi, whole-first sırası, carryover yükü).
4. Merge → CI → bir sonraki batch.

**Destekleyen işler:**

- **Telemetry v0** (local event log): hangi ders nerede kaybettiriyor görülmeden 180 ders yazmak kör uçuştur. Spec'te şema var, kodda implementasyon yok — burada devreye girer.
- Micro-Logic Card + Repair Loop implementasyonu (learning-engine tarafına — **v1 FROZEN, v1'e eklenmez**).
- Event compaction/snapshot politikası (event-sourced mastery 10k event'te ne yapacak — büyümeden önce kural konur).

**Paralellik:** Faz 3–4 ile kısmen paralel yürüyebilir, ama Faz 2 guardrail'leri olmadan başlamamalı.

---

## Faz 7 — Release hattı

**Neden en son:** Crash görünürlüğü ancak dışarıya kullanıcı çıkınca değer üretir; öncesinde yapılan release mühendisliği ölü yatırımdır.

**İşler:**

1. `eas.json`'a **production profili** (şu an sadece `preview` var), sürümleme stratejisi, gerekiyorsa OTA update (expo-updates şu an package.json'da yok).
2. **Crash raporlama** (Sentry vb.) — şu an sadece expo-router'ın default ErrorBoundary'si var; tester'ın telefonunda çökerse haber alamazsın.
3. `public-beta` stage aktivasyonu (`productStage.ts` fail-closed tasarımı zaten hazır — repo'nun en olgun parçalarından).
4. Tester wave → geri bildirim döngüsü → store hazırlığı.

---

## Açık envanteri (KNOWN_GAPS.md için hammadde)

**Spec'in kavramsal açıkları (1–7):**

1. Ses/dinleme katmanı yok — 10 kontratın hepsi metin-tabanlı, doktrin-uygulama çelişkisi.
2. Lexique Memory matrisi formülsüz — 25+ alan isimli ama hesapsız; drift mıknatısı.
3. İçerik fabrikası tanımsız — 180 dersin authoring süreci yok; gerçek darboğaz.
4. Monetizasyon + auth/sync kararları sessiz — legacy paywall kodu diriltilme riski.
5. v1 pedagoji lint'i yok — §29 regresyonunun kök nedeni.
6. Error Engine'in AI sınırı belirsiz — deterministik/AI-assisted ayrımı ve fallback merdiveni pinlenmemiş.
7. Hijyen: v1.0 commit edilmemiş, superseded bölümler silinmemiş, event compaction politikası yok.

**Repo'nun operasyonel açıkları (8–14):**

8. AI altyapısı fiilen ölü (auth zorunlu × no-auth ürün yönü) + routing planı sapmış (Claude yok).
9. Rate limit / maliyet kontrolü sıfır.
10. Release engineering yok (sadece preview profili; production, iOS, OTA, store yok).
11. Crash görünürlüğü sıfır (Sentry yok).
12. Legacy sistem aktif route'larda canlı (practice.tsx, chat.tsx).
13. Remote şema legacy'de donmuş — learning-engine'in remote karşılığı yok.
14. Telemetry spec'te var, kodda yok — içerik kararları için ölçüm şart.

**İyi durumda olanlar (dokunma):** `productStage.ts` fail-closed tasarımı; 4 komutluk CI zinciri; RLS policy'ler; `supabaseReady` guard'ı; Mon Lexique'in "asla ham skor gösterme" kuralının kodda uygulanmış olması; repository abstraction'ın remote'a hazır arayüzü.

---

## İş bölümü özeti

- **Claude oturumlarında uçtan uca bitebilenler:** Faz 0, 1, 2, 3 ve Faz 4'ün implementasyonu (repo klonlanır, CI zinciri container'da koşulur, doğrulanmış PR diff'i teslim edilir).
- **Haktan'a düşenler:** merge + emülatör smoke (runtime'a dokunan işlerde), Faz 4 formül review'u, Faz 5'in dört kararı, Faz 6 pedagojik review, Faz 7'nin EAS/store adımları.
- **İlk hamle:** Spec MD'sini oturuma yükle → Faz 0 + Faz 1 tek oturumda biter (toplam bir günlük iş bile değil).
