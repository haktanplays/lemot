---
title: Passive Familiarity and Ghost Weave
aliases: [Ghost Exposure, Familiarization, Broad-to-Narrow Learning, No Surprise Production, Passive Familiarity and Active Control, Pasif Aşinalık]
type: system-spec
domain: learning
status: active
canon_status: canonical
implementation_status: spec-only
verification_status: reported-only
owner: cairn-product-brain
created: 2026-08-04
last_updated: 2026-08-04
last_reviewed: 2026-08-04
source_of_truth: ["Founder decision 2026-08-04", "docs/learning-engine-v1.md", "docs/canon/LESSON_FLOW_CANON_v1.md", "docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md"]
code_refs: []
test_refs: []
related: ["[[Learning System Overview]]", "[[Lesson Anatomy]]", "[[Weave System]]", "[[Chip Taxonomy]]", "[[Whole First, Unpack Later]]", "[[Difficulty and Cognitive Load]]", "[[Exercise System Overview]]", "[[Content Selection]]"]
supersedes: []
superseded_by: []
tags: [learning, familiarization, ghost, exposure, weave, passive-familiarity]
---

# Passive Familiarity and Ghost Weave

<!-- gh-toc -->

## İçindekiler

- [Executive Summary](#executive-summary)
- [Why It Exists](#why-it-exists)
- [1. Broad-to-narrow](#1-broad-to-narrow--geniş-dünya-dar-sorumluluk)
- [2. Familiarization](#2-familiarization--haritayı-çizen-açılış)
- [3. Sentence-pool composition](#3-sentence-pool-composition)
- [4. Passive familiarity vs active control](#4-passive-familiarity-ve-active-control-iki-ayrı-eksen)
- [5. Weave as the ghost-exposure carrier](#5-weave--tekrarlı-ghost-maruziyetin-asıl-evi)
- [6. No surprise production](#6-no-surprise-production)
- [7. Prompt-side vs output-side](#7-prompt-tarafı-ve-output-tarafı-aynı-şey-değildir)
- [8. Ghost recoverability](#8-ghost-recoverability--geri-kurulabilirlik)
- [9. No stacked unknown systems](#9-üst-üste-binmiş-bilinmeyen-sistemler-yasak)
- [10. Worked example: vous voulez](#10-işlenmiş-örnek-vous-voulez)
- [11. Explanation-intensity ladder](#11-explanation-intensity-ladder)
- [12. Visible structure, delayed decomposition](#12-visible-structure-delayed-decomposition)
- [13. Exposure and promotion ladder](#13-exposure-ve-promotion-merdiveni)
- [14. Pre-familiarization target](#14-pre-familiarization-hedefi)
- [15. Practice Hub relationship](#15-practice-hub-ilişkisi)
- [16. Curation](#16-curation--küratörlük)
- [17. Broad chunk inventory](#17-geniş-chunk-envanteri)
- [18. Authoring metadata candidate](#18-authoring-metadata-adayı)
- [Non-Claims](#non-claims)
- [Open Questions](#open-questions)
- [Related Notes](#related-notes)
- [🧭 GitHub Navigation](#-github-navigation)

> [!canon] Purpose — Cairn öğrenciye **sorumluluk yüklediğinden daha geniş bir dil dünyası gösterir.** Bu not o modelin kanonunu taşır: familiarization (harita), pasif aşinalık ile aktif kontrolün ayrılması, Weave'in ghost taşıyıcısı rolü ve **no surprise production** kuralı. Ayrıntılı sayılar burada; yüksek-seviye ilke [[CAIRN_PRODUCT_BRAIN_v1.0]] §6/§8'de.

## Executive Summary

**"Show the whole world, assign only a small part."** Cairn geniş bir iletişimsel sahne gösterir, ama o sahnenin yalnızca küçük bir bölümünü öğrencinin **üretim sorumluluğuna** verir. Aradaki fark bir kusur değil, ürünün tasarım kararıdır: öğrenci gördüğünden daha azını üretmekle yükümlüdür, ve bu asla sürpriz bir talebe dönüşmez.

İki cümle bütün notu özetler:

> **Familiarization creates the map; Weave creates familiarity.**
> **Passive familiarity is not active mastery.**

Familiarization dersin başında **haritayı** çizer. Weave, o haritadaki geniş dili tekrar tekrar sahneye sokarak **aşinalığı** üretir. Aktif kontrol ise ayrı bir eksende, kendi merdiveniyle gelir. Bir chunk sahneye girebilir; bu onu öğrencinin sorumluluğu yapmaz.

> [!warning] **Bu not spec'tir, implementasyon değildir.** Aşağıdaki hiçbir rol, eşik veya metadata alanı bugün runtime'da yoktur. Bkz. [[#Non-Claims]].

## Why It Exists

Sadece izole parçalar gösteren sistemlerde öğrenci kelimeleri öğrenir ama **anı** öğrenmez: bir kafede karşısındakinin ne diyeceğini, konuşma kırıldığında ne olacağını, sahnenin kenarında duran dili hiç görmez. Cairn'in farkı, önce iletişimsel resmin bütününü göstermesi.

Bu farkın bedeli, karışması çok kolay iki şeyi ayrı tutma zorunluluğudur: **görülen dil** ile **sorumlu olunan dil**. Ayrım kaybolursa iki tipik hata gelir — ya ürün "gösterdiysem öğretmişimdir" sanır ve öğrenciden hiç kurmadığı bir şeyi ister, ya da korkudan geniş dili hiç göstermez ve öğrenci steril bir fragman koleksiyonu içinde kalır. Bu not o ayrımı yazılı ve bağlayıcı hale getirir.

## 1. Broad-to-narrow — geniş dünya, dar sorumluluk

**CANONICAL.** Cairn geniş → dar ilerler:

1. küratörlüğü yapılmış bir dil dünyası gösterilir;
2. öğrencinin anlamlı parçaları **fark etmesine** izin verilir;
3. aktif sorumluluk küçük bir kümeye **daraltılır**;
4. daha geniş pasif dil **Weave** ile canlı tutulur;
5. yapı daha sonra **resmî olarak açılır**;
6. pratikle esnek aktif kontrole taşınır.

> [!canon] Bu **"önce her şeyi öğret" değildir.** Öğrenci sahip olması istenenden fazlasını *görür*; fazlasını *üretmesi* istenmez.

## 2. Familiarization — haritayı çizen açılış

**CANONICAL (yapı) + TUNABLE PLANNING BAND (sayılar).**

Familiarization küratörlüğü yapılmış bir ders açılışıdır. **Düz bir kelime listesi değildir; test değildir.**

| Öğe | Değer | Sınıf |
|---|---|---|
| Curated cümle/ifade yüzeyi | normalde **10–15** | TUNABLE PLANNING BAND |
| Gruplama | psikolojik, tek korkutucu liste değil | CANONICAL |
| Grup başlıkları | iletişimsel duruma göre değişir | CANONICAL |
| Küratörlük | ders başına **elle** | CANONICAL |

Tipik grup mantığı (iskelet, zorunlu şablon değil):

- ne söyleyebilirsin;
- ne duyabilirsin;
- konuşma devam ederse;
- konuşma kırılırsa;
- altta yatan bir örüntü.

**Her yüzey eşit açıklama almaz.** Önerilen dağılım — **TUNABLE PLANNING BAND**, bilimsel eşik değil, runtime garantisi hiç değil:

| Derinlik | Yüzey sayısı | Ne olur |
|---|---|---|
| Anchor | **3–4** | ayrıntılı açılım |
| Light | **4–6** | hafif chunk vurgusu |
| Exposure | **3–5** | dinle-ve-fark-et |

> [!canon] **Familiarization creates the map; Weave creates familiarity.** Familiarization haritayı çizer; ghost dilin asıl **tekrar motoru değildir**.

## 3. Sentence-pool composition

**Ders başına tam olarak 30 öğretim cümlesi şartı REDDEDİLMİŞTİR.**

- 30 yalnızca **30 yüzeyin her biri ayrı değer taşıdığında** meşrudur;
- noktalama-farkı, nezaket-farkı ve mekanik ikame varyantları **kota doldurmak için kullanılamaz**;
- evaluator'ın kabul ettiği alternatifler, gerçek bir **register / ritim / iletişimsel** fark öğretmiyorsa ayrı öğretim yüzeyi **sayılmaz**.

Çalışma bantları — hepsi **TUNABLE PLANNING BAND**:

| Havuz | Bant |
|---|---|
| Familiarization panorama | **10–15** |
| Kontrollü ders varyantı / egzersiz yüzeyi | ~**5–7** |
| Geniş Practice Hub rekombinasyonu | ~**6–8** |
| Normal toplam authoring havuzu | ~**22–28** |
| 30'a kadar | yalnızca gerçek iletişimsel çeşitlilik gerekçelendirirse |

Yakın varyantlar ağırlıkla **kontrollü ders egzersizlerine**; geniş rekombinasyonlar ağırlıkla **Practice Hub**'a aittir. Bazı anchor yüzeyler birden fazla evde meşru olarak görünebilir — bu onları **farklı Fransızca yüzeyler yapmaz**.

## 4. Passive familiarity ve active control: iki ayrı eksen

> [!canon] **Passive familiarity is not active mastery.**

Bir öğrenci aynı anda şunları yapabilir:

- bir chunk'ı bağlam içinde **anlayabilir**;
- görsel/işitsel **şeklini tanıyabilir**;
- iletişimsel **işlevini önceden kestirebilir**;
- morfolojik bir **sinyali fark edebilir**;

…ve yine de onu bağımsız üretmeye **muktedir ya da yetkili olmayabilir**.

İki kavramsal eksen:

| A. Passive familiarity | B. Active control |
|---|---|
| unseen | not yet required |
| ghost / exposed | supported |
| recognized | recalled |
| increasingly familiar | owned / transferable |

> [!warning] Bunlar **runtime enum'u değildir.** `LearningItem.status`'u değiştirmez, onun yerine geçmez. Gelecekte açık bir Engineering kararı uygulamadıkça **authoring ve pedagoji rolleri** olarak kalırlar.

Bir chunk, resmî dersinden **önce** yüksek pasif aşinalığa ulaşabilirken aktif kontrolde düşük kalabilir. Bu bir tutarsızlık değil, hedeflenen durumdur.

## 5. Weave — tekrarlı ghost maruziyetin asıl evi

**CANONICAL.** Familiarization geniş dünyayı **tanıtır**; Weave o geniş dünyayı tekrar tekrar **tanıdık kılar**.

Ghost/exposed dil bir Weave içinde şu rollerde görünebilir:

- INTERLOCUTOR_INPUT;
- AMBIENT_INPUT;
- MODEL_REVEAL;
- RECOGNITION_TARGET;
- bağlamsal destek.

**Göründüğü için puanlanan öğrenci çıktısına dönüşemez.** Katman, chunk'ın Weave içinde **ne beklendiğini** belirler — görünmesine izin verilip verilmediğini değil.

Bir Weave şunları uyumlandırmalıdır:

- **bir** aktif öğrenci hedefi;
- geri dönüştürülen, öğrencinin sahip olduğu malzeme;
- isteğe bağlı destekli malzeme;
- tanınan/ghost girdiden oluşan küçük bir **pasif hale**.

> [!canon] Weave yalnızca sahip olunan dilin testi değildir; pasif aşinalıktan sonraki aktif kontrole giden **köprüdür**.

Mevcut W1 ve open-Weave kuralları [[Weave System]]'de değişmeden durur. Pasif hale, Weave'in tamamını varsayılan olarak **ungraded yapmaz**; yalnızca öğrenci çıktı hedefi mevcut puanlama kurallarını izler.

## 6. No surprise production

> [!canon] **CANONICAL.** Bir pratik veya ders, maruz kalınmış (exposed) ya da tanınmış (recognized) bir ifadeyi **girdi** olarak kullanabilir; ancak öğrenci uygun bir **destekli kurulum**, **hatırlama fırsatı** veya **resmî terfi** almadan ondan **bağımsız üretim isteyemez**.

**İzinli:**

- karşıdaki kişi "Vous voulez un café ?" der;
- öğrenci sahip olduğu dille yanıtlar: "Oui, merci." / "Non merci, je voudrais un thé."

**İzinsiz:**

- öğrenci "vous voulez"i bir kez ambient girdi olarak görür, ve Practice Hub hemen ardından ondan "Vous voulez un café ?" cümlesini **hatırlayarak üretmesini** ister.

> [!canon] **A passive chunk may enter the scene without becoming the learner's responsibility.**

## 7. Prompt tarafı ve output tarafı aynı şey değildir

Ayrı Weave rolleri kaydedilir:

| Rol | Anlamı |
|---|---|
| TARGET_OUTPUT | öğrencinin üretmesi beklenen hedef |
| SUPPORTED_OUTPUT | destek görünürken üretilen hedef |
| INTERLOCUTOR_INPUT | karşıdaki kişinin repliği |
| AMBIENT_INPUT | sahnenin ortam dili |
| MODEL_REVEAL | denemeden sonra gösterilen doğal model |
| RECOGNITION_TARGET | tanıma sorulan, üretilmesi istenmeyen hedef |

Örnekler:

- `vous voulez` → RECOGNIZED + INTERLOCUTOR_INPUT;
- `je voudrais` → OWNED/SUPPORTED + TARGET_OUTPUT;
- `très bien` → GHOST + AMBIENT_INPUT.

Aynı sahne üçünü de içerebilir; bu onları **eşit öğrenci yükü** yapmaz.

> [!warning] Bu enum adlarının uygulandığı **ima edilmemektedir**. Bunlar **authoring-dili adaylarıdır**.

## 8. Ghost recoverability — geri kurulabilirlik

Geçerli bir ghost cümlesi **kelime-yüzdesiyle** tanımlanmaz. Authoring sorusu şudur:

> "Öğrenci bildiği chunk'lardan, sahneden, çeviri desteğinden ve söylem şeklinden iletişimsel anlamın **ne kadarını yeniden kurabilir**?"

**PROVISIONAL / TUNABLE** authoring hedefleri:

| Bant | Recoverability | Ghost yükü |
|---|---|---|
| L1–L3 | ~**75–85%** | normalde Weave biriminde **en fazla bir** ana ghost chunk; birden fazla bilinmeyen sistem üst üste binmez |
| L4–L10 | ~**70–80%** | normalde bir ana ghost + **en fazla bir** hafif ambient parça |

> [!warning] Bu yüzdeler **öğrenciye gösterilmez**, **mastery skoru değildir**, ve **ampirik olarak kalibre edildiği iddia edilmez**. Smoke kanıtı gelene kadar authoring sezgisidirler.

## 9. Üst üste binmiş bilinmeyen sistemler yasak

**CANONICAL guardrail.** Bir ghost cümlesi, içinde tanıdık **tek bir parça** bulunuyor diye birden fazla bağımsız bilinmeyen sistemi üst üste bindiremez.

Erken seviye için **kötü** örnek:

> "Hier, je suis allé au cinéma avec mes amis."

Erken bir öğrenci için bu cümle şunları içerebilir: `hier` · passé composé · `allé` · `au cinéma` · iyelik `mes` · `amis` · ve zaten tanıdık olan `je suis`'in **değişmiş işlevi**. Öğrenci `je suis` ya da `avec`'i tanıyor diye bu cümle geri kurulabilir **değildir**.

Kullanışlı bir ghost cümlesi:

- doğal Fransızca olmalı;
- gerçek bir iletişimsel iş yapmalı;
- çoğunlukla geri kurulabilir bir çerçeve taşımalı;
- **one unfamiliar edge at a time** — tek seferde bir anlamlı yabancı kenar getirmeli.

> [!canon] Pedagojik olarak seçilmiş sadelik **serbesttir**. Yalnızca ghost yerleştirmek için yazılmış **doğal olmayan Fransızca serbest değildir**.

## 10. İşlenmiş örnek: vous voulez

**Sahne**

> Bir kafedesin. Garson soruyor:
> *Would you like a coffee?*

**Fransızca girdi**

> **Vous voulez un café ?**

**Bilinen / destekleyici malzeme**

- `vous` görülmüş;
- `un café` biliniyor ya da sahiplenilmiş;
- kafe bağlamı ve soru niyeti açık.

**Ghost**

- `voulez` — ya da korunan girdi chunk'ı olarak `vous voulez`.

**Öğrenci sorumluluğu**

- bildiği Fransızcayla **cevap ver**;
- `vous voulez`i **üretme**.

**Olası yanıtlar**

- `Oui, merci.`
- `Non, merci.`
- `Un thé, s'il vous plaît.`

**Erken açıklama**

> "`voulez`i fark et.
> Henüz kullanman gerekmiyor.
> Burada garsonun ne istediğini sormasına yarıyor."

**Morfoloji notice'ı**

> "`vous` ile gelen `-ez` sonunu fark et.
> Bu şekli tekrar göreceksin.
> Örüntüyü daha sonra açacaksın."

> [!warning] Bu bir **notice**'tır, çekim dersi değildir. **`vous + -ez` üretim ustalığı verilmez.** Ayrıntılı `je veux / vous voulez` karşıtlığı **resmî derste** gelir.

## 11. Explanation-intensity ladder

**CANONICAL yön:**

> hint → notice → light meaning → structural pattern → full explanation → active control

Dört authoring derinliği:

| Derinlik | Ne yapar | Ne yapmaz |
|---|---|---|
| **NOTICE** | bir şekle dikkat çeker | kural dökmez; üretim beklemez |
| **LIGHT** | iletişimsel işlevi söyler, chunk'ı bütün tutar | iç yapıyı parçalamaz |
| **STRUCTURAL** | anlamlı iç parçaları / gramer çerçevesini gösterir | henüz neden ayrılmadığını açıklamayı atlamaz |
| **FULL** | resmî ders açıklaması; alternatifleri karşılaştırır; "neden bu, neden şu değil" | — (aktif kurulum ve transfer artık serbest) |

Uygulama sesi **şeffaf ve sakin** olmalı. Tercih edilen dil:

- "Inside this phrase…"
- "A pattern underneath…"
- "Keep this together for now."
- "You do not need to build this yet."
- "You will open this later."
- "Here is why French uses this shape."
- "Here is why we are not separating this piece yet."

Kaçınılacaklar: erken terminoloji dökümü · görünür iç yapıyı gizlemek · açıklamasız kara kutu ezberi · bütün bir formülün iç parçası yokmuş gibi davranmak.

## 12. Visible structure, delayed decomposition

> [!canon] **Visible structure, delayed decomposition.**

Kullanışlı bir ifade anlamlı iç parçalar içerdiğinde:

- parçaları **pedagojik olarak yararlı olduğunda göster**;
- ne yaptıklarını **açıkla**;
- kendi iletişimsel kullanımları olmadan **bağımsız ustalık isteme**;
- ifadenin neden **korunmuş** kaldığını açıkla;
- alttaki yapının **ne zaman açılacağını** belirt.

Bütün kalması gereken, ama iç yapısı gösterilebilecek örnekler:

`ce n'est pas grave` · `ça va` · `je vous écoute` · `une petite question` · `et avec ceci ?` · `c'est tout` · `faire une pause` · `on fait une pause ?`

Altta yaşayabilecek gramer çerçeveleri:

`ne … pas` · `je suis + [yer/durum]` · `j'ai + [durum/isim]` · `je voudrais + [şey/eylem]` · `je vais + [hedef/eylem]` · `c'est + [yer/yön]` · `vous + fiil şekli`

> [!warning] Her iç atomu otomatik olarak **öğrenciye görünen birincil UI chip'ine çevirme.** Cümle-chip yasağı ve UI uygunluk kuralları [[Chip Taxonomy]]'de geçerliliğini korur.

## 13. Exposure ve promotion merdiveni

Hedeflenen authoring yolculuğu:

1. ambient ghost maruziyeti;
2. ikinci anlamlı bağlam;
3. tanıma seçimi veya anlam eşleme;
4. görünür seçeneklerle düşük-baskılı fill;
5. hafif notice açıklaması;
6. bir bağlamsal Weave daha;
7. resmî ders açılımı (unpack);
8. destekli üretim;
9. hatırlama (recall);
10. esnek Practice Hub yeniden kullanımı.

**Basit bir fill tanımayı artırabilir ama sahipliği kanıtlamaz.** Üçünü eşit kanıt sayma:

| Tip | Görünürlük | Amaç |
|---|---|---|
| **Recognition fill** | seçenekler görünür | teşhis |
| **Supported build** | chunk'lar görünür | kontrollü kurulum |
| **Recall fill** | doğrudan seçenek yok | aktif geri getirme |

## 14. Pre-familiarization hedefi

**PROVISIONAL / TUNABLE.** Bir chunk'ın resmî dersinden önce, iyi tohumlanmış bir chunk şunlara sahip olabilir:

- ~**3–6** anlamlı önceki karşılaşma;
- en az **iki farklı ama tutarlı** bağlam;
- authoring hedefi olarak ~**70–80%** pasif aşinalık.

> [!warning] Bu bir **runtime mastery yüzdesi değildir** · öğrenciye **gösterilmez** · henüz **kanıt-kalibre edilmiş bir algoritma değildir** · kesin eşikler **açıktır**. Nitelik ve geri-kurulabilirlik, mekanik maruziyet sayısından **daha önemlidir**.

## 15. Practice Hub ilişkisi

Practice Hub aynı sistemi **genişletir**; ikinci bir müfredat **kurmaz**.

Practice Hub şunları kullanabilir: öğrenci-sahipli chunk'lar · destekli chunk'lar · geri dönüştürülen chunk'lar · korunan formüller · onaylı gramer çerçeveleri · onaylı slot değerleri · **girdi tarafında** tanınan/ghost chunk'lar.

Serbest (freestyle) Practice Hub Weave'i:

- öğrenci çıktısı **destekli veya sahiplenilmiş** dilden kurulur;
- tanınan/ghost dil **interlocutor veya ambient** bağlamı zenginleştirebilir;
- ghost dil sessizce **puanlanan çıktıya çevrilmez**;
- geniş rekombinasyon yalnızca **onaylı** chunk, çerçeve ve slot'lardan yapılır.

> [!canon] **Müfredat dışı rastgele Fransızca üretimi yoktur.**

## 16. Curation — küratörlük

**CANONICAL.** Familiarization gruplamaları **ders başına küratörlüğü yapılır**. Yalnızca etiketlerden **otomatik gruplama yapılmaz**.

Genel bir iskelet tekrar kullanılabilir, ama gerçek kategoriler, sıra ve vurgu **iletişimsel anı** takip etmelidir.

> [!canon] Manuel küratörlük idari israf değildir; Cairn'in pedagojik değerinin **parçasıdır**.

## 17. Geniş chunk envanteri

Cairn, tek başına active-new sayısının ima ettiğinden **daha geniş** bir yazılı chunk envanteri gerektirir. Envanter şunları içerebilir:

active/spine parçaları · destekli parçalar · geri dönüştürülen parçalar · tanıma parçaları · ghost/exposure parçaları · korunan formüller · isim paketleri · gramer çerçeveleri · söylem işaretleyicileri · görünür-ama-ertelenmiş bileşenler · onaylı slot ve karşıtlık biçimleri.

> [!warning] Bu görevde **toplam benzersiz-chunk kotası kilitlenmez.** Önceki kaba **120–145** veya **197** sayıları **founder-onaylı kanonik hedef değildir**; toplam sayı hedefleri bir **audit sorusudur**, kanon değil.

Sabit invariant değişmez:

- normal ders **active-new yükü 1–4 bütçesi** içinde kalır ([[Difficulty and Cognitive Load]], [[Lesson Anatomy]]);
- **pasif envanter genişliği aktif üretim yükü ile karıştırılamaz.**

## 18. Authoring metadata adayı

Belgelenmiştir, **uygulanmamıştır**:

`firstExposureLesson` · `formalLesson` · `pedagogicalStatus` · `weaveRoles` · `structuralClass` · `knownContextSupport` · `recoverabilityBand` · `explanationDepth` · `requiredPreExposures` · `contextDiversity` · `learnerOutputEligibility` · `formalPromotionCondition` · `approvedSlots` · `contentHome`

> [!warning] **Aday metadata.** Runtime şema yetkisi **yoktur**; registry migrasyon yetkisi **yoktur**. Uygulanması için Content/Engineering Bible'ların **ratifikasyonu** gerekir.

## Non-Claims

> [!warning] Bu notun **açıkça iddia ETMEDİKLERİ**:

- Yeni bir runtime state machine **uygulanmadı**.
- Mevcut hiçbir Weave renderer'ı bu rollerin **tamamını desteklemiyor**.
- Otomatik bir **recoverability hesaplayıcısı yok**.
- **70–80% aşinalık metriği** bugün **mevcut değil**.
- Öğrenciye görünen hiçbir **yüzde önerilmiyor**.
- Yeni bir **ekran tipi yetkilendirilmedi**.
- **Registry enum genişletmesi yetkilendirilmedi**.
- Mevcut **L1–L10 cümle envanteri bu Brain güncellemesiyle onaylanmadı**.
- Fransızca içerik hâlâ **founder incelemesi ve isimli insan French QA** gerektiriyor.
- Eşikler **ampirik olarak kalibre edilmedi**.

## Open Questions

Bkz. [[OPEN_QUESTIONS]] — familiarization bandının ders arketipine göre kesinleşmesi, recoverability'nin insan-yazımı mı hesaplanan mı olacağı, ghost → recognized → supported terfisi için gereken kanıt, egzersiz rollerinin runtime temsili, familiarization'ın mevcut payload'larla mı yoksa sonraki UI genişlemesiyle mi taşınacağı, ve karşılaşma sayıları ile recoverability bantlarının ampirik kalibrasyonu.

## Related Notes

[[Learning System Overview]] · [[Lesson Anatomy]] · [[Weave System]] · [[Chip Taxonomy]] · [[Whole First, Unpack Later]] · [[Difficulty and Cognitive Load]] · [[Exercise System Overview]] · [[Content Selection]] · [[CAIRN_PRODUCT_BRAIN_v1.0]] · [[DECISION_REGISTER]]

<!-- gh-nav -->

## 🧭 GitHub Navigation

[⬆ README](../../README.md) · [🪨 Holy Codex](../00_START_HERE/00%20Le%20Mot%20Holy%20Codex.md) · [Learning System Overview](./Learning%20System%20Overview.md) · [Weave System](./Weave%20System.md) · [Chip Taxonomy](./Chip%20Taxonomy.md) · [Difficulty and Cognitive Load](./Difficulty%20and%20Cognitive%20Load.md)
