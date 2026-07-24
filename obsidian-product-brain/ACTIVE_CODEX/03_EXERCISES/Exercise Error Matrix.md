---
title: Exercise Error Matrix
aliases: [Hata Matrisi, Exercise ErrorTagCode Matrix]
type: system-spec
domain: exercise
status: active
canon_status: canonical
implementation_status: partial
verification_status: source-inspected
owner: cairn-product-brain
created: 2026-07-14
last_updated: 2026-07-14
last_reviewed: 2026-07-14
source_of_truth: ["lemot-app/content/learning-engine/events.ts:31-47", "cairn_build/evidence/03_exercises.md", "SOURCE_ARCHIVE/AVAILABLE_INPUTS/Learning_Engine_and_Exercise_Types.md"]
code_refs: ["lemot-app/content/learning-engine/events.ts:31-47", "lemot-app/content/learning-engine/error-engine.ts"]
test_refs: []
related: ["[[00 Le Mot Holy Codex]]", "[[Exercise System Overview]]", "[[Exercise Evidence Matrix]]", "[[Error Tracking System]]"]
tags: [exercise, matrix, errors]
---

# Exercise Error Matrix

> [!canon] Her egzersizin **kavramsal olarak** üretebileceği `ErrorTagCode`'lar. 16-değerli union yalnız learning-engine grader'ında (`grade()`, sandbox) yaşar. **v1/legacy runtime bu kodları emit ETMEZ** — bu yüzden runtime satırı büyük ölçüde UNKNOWN/none; aşağıdaki `●` işaretleri egzersiz tipinin *doğası gereği* hangi kodları doğurabileceğini gösterir (canon eşlemesi).

Yukarı: [[00 Le Mot Holy Codex]] · [[Exercise System Overview]] · [[Error Tracking System]]

16 kod (`events.ts:31-47`, frozen — YASA 3): `correct, accepted_variant, punctuation_only, accent_only, spelling_near_miss, wrong_item, wrong_order, missing_word, extra_word, wrong_register, meaning_shift, blocked_form_used, recognition_only_form_used, overproduction_unseen_form, incorrect_but_understandable, empty_or_skip`.

## Matris (kavramsal üretilebilirlik)

Kısaltmalar: cor=correct, av=accepted_variant, punc=punctuation_only, acc=accent_only, spell=spelling_near_miss, w-item=wrong_item, w-ord=wrong_order, miss=missing_word, extra=extra_word, w-reg=wrong_register, m-shift=meaning_shift, over=overproduction_unseen_form, ibu=incorrect_but_understandable, skip=empty_or_skip.

| Egzersiz | Seçim mi/Yazım mı | Doğurabildiği kodlar (kavramsal) | Runtime emit |
|---|---|---|---|
| Meet | cevapsız | — (discovery, kanıt yok) | none |
| Insight and Notice | cevapsız | — | none |
| Read and Listen | cevapsız | — | none |
| Multiple Choice | seçim | cor, w-item, (recognition_only_form_used) | UNKNOWN (v1 emit yok) |
| Fill | seçim | cor, w-item | UNKNOWN (v1 emit yok) |
| French Fill | seçim | cor, w-item | UNKNOWN (legacy `logErr` only) |
| Build | dizme (tiles) | cor, w-ord, miss, extra, w-item | UNKNOWN (legacy `logErr`) |
| Weave | yazım (open ungraded) | cor, av, punc, acc, spell, w-item, w-ord, miss, extra, m-shift, ibu, over, skip | **none** (W1: open Weave gradesiz) |
| Combine and Weave | yazım ×2 | cor, av, miss, extra, m-shift, spell, skip | UNKNOWN (legacy `logErr`) |
| Write | yazım (bellekten) | cor, av, punc, acc, spell, w-item, skip | UNKNOWN (legacy `logErr`) |
| Say It Your Way | serbest yazım | (gradesiz) — canon: over, ibu, m-shift, skip mümkün ama emit yok | none (asla gradelemez) |
| Mini Conversation | serbest diyalog | (gradesiz) | none (dev-apk null) |
| Review (Recap) | cevapsız | — | none |
| Daily Review | seçim (MCQ) | cor, w-item | none (engine event yok) |
| Natural Reveal | cevapsız | — | none |
| **engine grader** | — | `grade()` 16'nın güvenli 12'lik altkümesini emit eder; registry-aware adaptör `wrong_item`/`overproduction_unseen_form`/`meaning_shift` ekler | **Evet (sandbox)** |

## Kritik notlar

- **v1 emit yok:** Fill/Weave/SayIt doğruluğu lokal hesaplar, `ErrorTagCode` üretmez (Evidence Pack 03 §6, IMPLEMENTED gerçek). Runtime sütunu bu yüzden çoğunlukla `none`/`UNKNOWN`.
- **Weave open weaves gradesiz (W1):** `matchExpected` → `none` bir *compare* durumudur, hata değil; error-tag emit edilmez. Bkz. [[Weave]].
- **Precision near-miss** (`punctuation_only`, `accent_only`, `spelling_near_miss`) = soft signal, asla failure (mastery bucket'ı, `mastery.ts`). Yalnız yazım-tipi egzersizlerde doğar. Bkz. [[Mastery Model]].
- **Selection-tipi egzersizler** yazım hatası (punc/acc/spell) doğuramaz — sadece `wrong_item`.
- `grade()` "safe deterministic subset (12 of 16)" emit eder; `wrong_item`/`overproduction_unseen_form`/`meaning_shift` registry-aware adaptör gerektirir (`p0-p2-checkpoint.md:70-72`). Mastery reducer her tag'i generic işler → superset ilişkisi, gap değil.

> [!warning] `blocked_form_used` / `recognition_only_form_used` / `overproduction_unseen_form` = boundary/exposure ihlalleri. Bunlar öncelikle **canon-anti-pattern** olarak *tasarım zamanında* validator'la (V3/V4) yakalanır, runtime gradelemeyle değil. Bkz. [[Exercise Anti-Patterns]].

## Kaynak içe aktarımı (Learning Engine Taxonomy, 2026-06-29 vault)

> [!info] Kaynak: `Learning_Engine_and_Exercise_Types.md` §5 (Error Tracking Taxonomy). **Zenginleştirir ama override ETMEZ** — runtime canon (HEAD `02f9f7a` / #196) üstün; 16-değerli `ErrorTagCode` union ve YASA 3 hâlâ **kayıtlı grading dili**dir. Aşağıdaki kaynak, o kodların *öncesindeki* **hata-kaynağı sınıflandırmasını** ekler.

**Hata-kaynağı sınıfları (error source classes).** Bir "hata", ahlaki başarısızlık değil, **lokal bir sebeptir**; ve bir öğrenci-zayıf-noktasına dönüşmeden ÖNCE kaynağı sınıflandırılmalıdır. Kötü bir distraktör, erken reveal, bozuk validator veya güvensiz üretilmiş bir item **öğrenci zayıflığı değildir**:

- **Learner error** — öğrencinin gerçek üretim/tanıma kayması.
- **Content error** — kötü distraktör, eksik accepted-answer, aşırı-yükleme.
- **Validator error** — yanlış "correct option" mantığı / bozuk match.
- **UI / flow error** — erken reveal, öğrencinin ne yapacağını anlamaması, salience kaybı.
- **Tone error** — sert/cezalandırıcı feedback.
- **AI / generator error** — güvensiz veya kapsam-dışı üretilmiş içerik.
- **Mastery-mapping error** — yanlış `piecesUsed`, hatalı tag→mastery eşlemesi.

Kural: "raw text or AI freeform labels" **kanonik hata sistemine dönüşemez** — hatalar ancak bir taksonomiye *authored* edildikten sonra weak-point repair'i besler.

### 7-satırlık hata tablosu (kaynak §5)

| Hata sınıfı | Örnek | Nasıl track edilir | Repair yolu |
|---|---|---|---|
| Missing target piece | L2 hedefinde `ici` atlanır | `missing-piece: item id` | Sonraki guided production veya hint |
| Wrong owned piece | `suis` gerekirken `voudrais` | `trap-selected + item ids` | Micro-contrast |
| Unsupported form | Görülmemiş grameri üretir | `outside-scope form` | Yönlendir; anında öğretme |
| Register mismatch | Fazla direkt / fazla resmî | `register/naturalness signal` | Natural Reveal notu |
| Article / package confusion | `un`/`une` yanlış paket | `package-choice trap` | Recognition repair |
| Sound / writing confusion | Aksan, liaison, sessiz sonek | `sound-writing tag` | Listening/writing trap |
| Empty / avoidance | Deneme yok | `skipped/empty` | Daha yumuşak prompt/destek (ceza değil) |

> [!note] Bu 7-satırlık **kaynak** tablosu, bu notun üstündeki 16-değerli `ErrorTagCode` matrisiyle **çelişmez**; onun *kavramsal öncülüdür*. Ör. "Article/package confusion" → runtime'da `wrong_item`; "Sound/writing" → `accent_only`/`spelling_near_miss`; "Empty/avoidance" → `empty_or_skip`. Runtime emit gerçeği değişmez: **v1 renderer bu kodların hiçbirini emit etmez** (yalnız engine/sandbox).

## Related Notes

[[Error Tracking System]] · [[Exercise Evidence Matrix]] · [[Mastery Model]] · [[Exercise Anti-Patterns]]
</content>
