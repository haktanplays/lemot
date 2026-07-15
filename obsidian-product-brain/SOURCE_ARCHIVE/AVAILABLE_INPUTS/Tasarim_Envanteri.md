# Le Mot — Tasarım Envanteri

> Status: Mixed historical note. Contains useful visual inventory and stale implementation/design backlog. Verify against active v0.2 canon before use.

## v0.2 Role

Use this note for:

- Historical visual inventory and V4 design/source coverage.
- Finding old screen/state ideas that may inform future design work.
- Tracing why visual decisions were considered.

Do not use this note for:

- Current active visual direction without checking [[Visual Design Canon]].
- Current implementation scope or sprint planning.
- Reviving archived/post-beta screens without explicit product approval.

Active replacements: [[Visual Design Canon]] · [[Brand & Naming Canon]] · [[Notes Archive Index]]


> **Amaç**: Sandbox app'teki TÜM ekranları/state'leri listeleyip Claude Design (V4 Studies HTML) ile karşılaştırmak.
> ☑ = V4 Studies'te tasarımı VAR · ☐ = tasarım YOK, yapılması gerek
> Oluşturulma: 2026-05-02 · Son güncelleme: **2026-05-11** (V4 Studies Disposition + Merged Canon classification overlay)
> İlgili: [[LeMot]] · [[LeMot - User Journey]] (v6)
>
> **2026-05-08 V4 Yumuşatma + Mon Lexique pass**: yeni HTML `~/Desktop/Le Mot .md/May/08.05.2026/Le Mot V4 Studies _standalone_.html`. Bu pass Settings, Notifications, Edge states, GDPR, Paywall ceremony (Le sommet + Abandonment B/D + Trial reminder), ek Daily Review state'leri (All caught up, Bon retour), Lesson transitions (chunk picker, section pass / below threshold, chunk complete), Mon Lexique search no-results, ve Halftone visual treatment ekledi. Yeni V4 ekran sayısı 36 → 71+.
>
> **2026-05-11 V4 Disposition + Merged Canon overlay**: V4 Studies spec extraction (`C:\Users\<operator>\v4_studies_spec.md`) ve Merged Canon (`LeMot_Product_Canon_Merged_2026-05-11.md`) ile her item'a classification flag eklendi. Yeni section 19 "Sprint 11 Yeni Required States" (**40 ekran/state**) Merged Canon kararlarından çıkarıldı. **Classification legend**:
>
> - **[VALID]** = V4'te var + canon-uyumlu, implementasyona hazır
> - **[REDESIGN]** = V4'te var ama Merged Canon kırıyor — yeniden tasarım gerek (taxonomy / streak / XP / level)
> - **[DEPRECATED]** = V4'te var ama post-MVP veya canon dışı (V4-A/C/D variants, halftone)
> - **[NEW]** = V4'te yok, Merged Canon ekliyor (Pieces / How Weave Works / Stay with It variants / Insight Cards)
> - **[ARCHIVE]** = post-MVP scope (Mon Lexique full, Paywall ceremony, Word Graph)
> - **[VALID — Sprint 12+]** = tasarım hazır, implementation public beta sonrasına ertelenmiş

---

## 1. Auth & Onboarding

- [x] Auth — Login / Signup ekranı (`app/auth.tsx`) — **2026-05-08: Auth — sign up + Onboarding — auth tasarlandı**
- [ ] Auth — "Continue without account" state
- [x] Lesson Zero — 8 adımlı first-use tutorial (`app/lesson-zero.tsx`) — **2026-05-08: Onboarding — auth pass**
- [ ] +not-found / 404 (`app/+not-found.tsx`)

## 2. Home (Journey tab)

- [x] Home — base layout (V4-A/B/C/D variants tasarlandı, **V4-B seçildi**); 2026-05-08'de "Modern Home variants" pass ile yumuşatma uygulandı
- [ ] Home — Account modal (üst sağdaki avatar'a tıklayınca açılan overlay)
- [ ] Home — Sign-In CTA banner (giriş yapmamış kullanıcı için)
- [ ] Home — empty/first-load state (henüz lesson yok)

## 3. Chat tab (Parle avec moi)

- [x] Chat hub — mode selection (Free / Lesson Focus / Error Correction + Scenarios listesi)
- [x] Chat — Free mode aktif konuşma
- [x] Chat — Lesson Focus mode aktif konuşma
- [x] Chat — Error Correction mode (inline strikethrough + correct form)
- [x] Chat — Scenario aktif (At the Café — scene framing + role + turn count)
- [x] Chat — Scenario debrief (soft wrap + words used)
- [ ] Chat — typing/loading indicator state
- [ ] Chat — daily message cap reached UI (`{count}/{MSG_LIMIT}`)
- [ ] Chat — empty conversation reset state

## 4. Practice tab (Pratique)

- [x] Practice hub (progress strip + 5 mode menu)
- [x] Practice — Scenarios pre-reveal (question + tap to reveal)
- [x] Practice — Scenarios revealed (answer + 2-button feedback)
- [x] Practice — Lesson Practice listesi (stage hierarchy, locked rhythm)
- [x] Practice — Translation Quiz (empty input)
- [x] Practice — Translation Quiz (correct + alternative)
- [ ] Practice — Translation Quiz (wrong answer state)
- [ ] Practice — Lesson Practice mid-session (LessonPractice component aktif)
- [ ] Practice — session complete CTA (chat'e git / stats'e git)
- [ ] Practice — empty deck state ("no scenarios for this stage")

## 5. Progress tab (Tes progrès / Stats)

- [x] Progress Overview (XP/Level/Streak strip + milestones + weak spots aside) — **[REDESIGN]** — XP/Level/Streak strip kaldır, replace with "12 days on the path" + "147 words gathered" + "Stage X/Y" per UX.1-UX.3 + V4.OUTRO.1
- [x] Progress — Lessons (section-level analytics + heatmap + 7-day sparkline) — **[VALID]** — heatmap + sparkline canon-uyumlu, Sprint 11 V4-B implementation
- [x] Progress — Words (mastery breakdown + slipping list + lexique link) — **[VALID]** — 5-tier mastery (new/learning/familiar/known/mastered) per MC.7
- [ ] Progress — empty state (henüz lesson yapılmamış) — **[NEW]**
- [ ] Progress — lesson detail drill-down (ders bazlı section breakdown) — **[NEW]**
- Tab adı: **"Progress"** (V4 "Stats" rejected per V4.NAV.1)

## 6. Lesson Player — Navigation & Frame

- [x] Lesson 01 Anchor (lesson opening) — V4 yeni — **[REDESIGN — fold into Meet It first card]** per V4.ANCHOR.1; no separate screen, respect 12-15 cap
- [x] Lesson chunk selector (Learn/Practice/Produce 3 part picker) — **[REDESIGN — Sprint 11 taxonomy 11→9]** per MC.3
- [x] Lesson header bar — chunk nav scrollable tabs (sırala: 11 section) — **[REDESIGN — 9-section after Sprint 11 refactor]** per MC.3
- [x] Lesson exit confirmation ("Take a break? Progress saved") — **[VALID]**

## 7. Lesson — Part 1: Learn

- [x] 02 Read & Listen (`ReadListen.tsx`) — **[REDESIGN → Meet It]** per MC.3; Bridge sentences (V4 unique pedagogical primitive) preserve per MC.5
- [x] 03 Patterns (`Patterns.tsx`) — **[REDESIGN → Notice the Pieces + Why This Works]** per MC.3 + MC.5; "Patterns" name dropped; chunk-first display
- [x] 04 Vocab list (V4 yeni ayrı ekran) — **[REDESIGN → Notice the Pieces sub-flow]** per MC.5
- [x] 05 Vocab card — deep view (V4 yeni ayrı ekran) — **[REDESIGN → Insight Card / Pieces expandable]** per MC.5 + MC.2
- [ ] **Weave Fill** (`WeaveFill.tsx`) — Killer #1, V4'te ayrı artboard yok — **[REDESIGN → Try It]** per MC.3
- [ ] **French Fill** (`FrenchFill.tsx`) — V4'te ayrı artboard yok — **[REDESIGN → Try It]** per MC.3

## 8. Lesson — Part 2: Practice

- [x] 06 Build — arrange tiles (`BuildSentence.tsx`) — **[REDESIGN → Shape It (Build the Moment)]** per MC.3
- [x] 07 Write — type from memory (`WriteSection.tsx`) — **[REDESIGN → Weave It (Free Weave + Typed Weave)]** per MC.1 + MC.3
- [x] 08 Quiz / Drill — multiple choice (`Quiz.tsx`) — **[REDESIGN → Try It / Stay with It (limited)]** per MC.3

## 9. Lesson — Part 3: Produce

- [x] 09 Combine — brief → sentence (`CombineWeave.tsx`) — **[REDESIGN → Build the Moment in Shape It]** per MC.3 (Combine merge)
- [x] 10 Say It — free expression (`SayItYourWay.tsx`) — **[KEEP → Say It Your Way / production screen]** per Tier B 2026-05-16 (v1 §16). Eski "Mini Mission input" redesign iptal — Say It Your Way flagship olarak ayrı section kalır.
- [x] 11 Mini Chat (`MiniConversation.tsx`) — **[LEGACY Dev APK section]** per Tier B 2026-05-16. Generic chat v1'de core değil ("generic AI chat is weak", v1 §22); ileride **A Small Moment** (v1 §18, 3-4 line situation + AI eval) olarak evolve edebilir. Eski "Mini Mission scene" merge iptal.
- [x] 12 Review — mixed, audio (`Review.tsx`) — **[RE-HOME per Tier B 2026-05-16]** Stay with It section v1'de yok; 8 variant Practice Pool Build + Daily Review + Try It inline traps'e re-home (bkz. §19.E)

## 10. Lesson — Transitions & Overlays

- [x] Section transition screen — pass (X/Y correct + unlock card) (`TransitionScreen.tsx`) — **[REDESIGN — drop "Unlocked!" gamification framing → Insight Card reframe]** per MC.2
- [x] Section transition — below threshold (Try Again / Continue Anyway) — **[REDESIGN — "Try Again" → "Take Another Look" microcopy ("This one still needs a little settling — Try once more")]** per UX.5
- [x] Chunk complete screen — Part 1/2/3 done (Continue / Take a Break) — **[REDESIGN — drop "Unlocked!" reward framing]** per MC.2
- [x] 13 Lesson Outro — completion ceremony (V4 yeni) — **[REDESIGN — passive mirror only, drop XP/streak/accuracy/time stats]** per V4.OUTRO.1; keep "You used French today." + "Pieces you used: ..." format
- [ ] Lesson Complete — inline summary + CTA (Next / Practice / Chat) — eski versiyon — **[DEPRECATED]**
- [x] Unlock card overlay — Expression (`UnlockCard.tsx`) — **[REDESIGN → Insight Card reframe]** per MC.2 (small discovery, not reward)
- [ ] Unlock card overlay — Grammar Nugget — **[REDESIGN → Insight Card]** per MC.2
- [ ] Unlock card overlay — Faux Ami — **[REDESIGN → Insight Card]** per MC.2
- [ ] Unlock card overlay — Culture Bite — **[REDESIGN → Insight Card]** per MC.2
- [ ] Unlock card overlay — Sound Pattern — **[REDESIGN → Insight Card]** per MC.2
- [ ] Take Another Look / I'm done — self-correction overlay (A.4) — **[NEW]** per A.4 + UX.5

## 11. Daily Review — 4-screen ritüel (V4 yeni DNA)

- [x] Review 01 Fragments (poetic intro) — **[VALID]** per CR.A1 + Merged §16
- [x] Review 02 Reading ritual (micro-story, tap → peek) — **[VALID]** per CR.A1
- [x] Review 03 Recognition (soft cloze, 3 options) — **[VALID]** per CR.A1
- [x] Review 04 Outro (gathered, no scoring) — **[REDESIGN]** — V4 design'da "12 · DAY STREAK" var, kaldır → "12 days on the path" per V4.OUTRO.1; "gathered/returns tomorrow" semantics keep per Merged §16
- [ ] Daily Review v1 (mevcut `DailyReviewOverlay.tsx`) — V4 ile değiştirilecek — **[DEPRECATED]** Sprint 11 4-screen ritual replace eder
- [x] Daily Review — already done state ("Today's done, see you tomorrow") — **[VALID]**
- [ ] Daily Review — Le Carnet yazı modu (kullanıcı kendi cümlesini yazar) — **[ARCHIVE — Sprint 12+]** per Carnet scope
- [x] **NEW** Bon retour — soft return after absence — **[VALID]** per Merged §4 "Le retour"

## 12. Mon Lexique (Killer #2 — sandbox 5. tab)

> 🔄 **REVISED — Tier B 2026-05-16 (v1 Canon §21)**
> Mon Lexique scope **3 tier'a bölündü**:
> - **Mon Lexique Basic = MVP** (v1 §21): basic learner notebook + MonLexiqueSuggestion component + filters (word/chunk/piece/idiom/verb/pronoun) + sort (old-to-new / mastery) + examples + where used + lesson source + user notes + mastery level. Mevcut dev-apk `FEATURES.monLexique=false` durumu MVP shape için **enable edilmeli** (basic version only).
> - **Mon Lexique Full 7-screen = Sprint 12+ / public beta**: Are.na "channels" metaphor + V4.LEX.1 bilingual UX + V4-B visual DNA (asymmetric breathing, brown/navy semantic). Aşağıdaki 7-screen liste bu tier için.
> - **Word Graph compatibility = post-beta** (v1 §21 "must remain compatible with future Word Graph"). Data structure'ı uyumlu kalmalı ama Word Graph kendi feature olarak post-beta.

**MVP scope (basic notebook)** — yeni eklenenler:
- [ ] Mon Lexique Basic — flat list (sort: old-to-new / mastery / type filter)
- [ ] Mon Lexique Basic — entry detail (word/chunk + examples + lesson source + user notes + mastery level)
- [ ] MonLexiqueSuggestion inline component (lesson/practice sonrası "Add to Mon Lexique?" prompt) per v1 §14
- [ ] Daily Review hook: Mon Lexique entries feed weak-spot rotation per v1 §20

**Sprint 12+ public beta — 7-screen Full** (Are.na "channels" metaphor):
- [x] Mon Lexique — ana ekran (Are.na DNA) — **[Sprint 12+]**; Are.na "channels" worth preserving
- [x] Mon Lexique — kelime detayı (deep view) — **[Sprint 12+]**
- [ ] Mon Lexique — empty state (L4 öncesi locked) — **[Sprint 12+]**
- [x] Mon Lexique — search & filter UI — **[Sprint 12+]**
- [ ] Mon Lexique — AI question generation modal (paid) — **[Sprint 12+]**
- [ ] Mon Lexique — AI sentence example modal (paid) — **[Sprint 12+]**
- [ ] Mon Lexique — connected words list (Word Graph mini) — **[Post-beta]** (Word Graph compatibility)
- **V4.LEX.1 reminder**: default system channel labels MUST follow UI language (English UI ≠ Turkish "Tüm kelimeler"); user notes any language

## 13. Paywall (POST-MVP — public beta)

> **Tüm bölüm**: **[ARCHIVE — public beta scope]**; dev-apk'te `FEATURES.paywall=false` (banner not reachable per L31 CLAUDE.md). Climber/summit metaphor worth preserving.

- [x] Paywall — The Summit (V4, climber metaforu) — **[ARCHIVE]** + **[VALID — Sprint 12+]**
- [x] Paywall — L14→L15 ceremony (özet ekranı + passport stamp + image transition) — **[ARCHIVE — Sprint 12+]**
- [ ] Trial — 3 gün ücretsiz, kart yok ekranı — **[ARCHIVE — Sprint 12+]**
- [x] Trial — son gün hatırlatma ("Yarın paywall geri gelecek") — **[ARCHIVE — Sprint 12+]**
- [ ] "Burada dur" abandonment flow — c (%50 indirim teklifi) — **[ARCHIVE — Sprint 12+]**
- [x] "Burada dur" abandonment flow — d (mikro-survey) — **[ARCHIVE — Sprint 12+]**
- [x] "Burada dur" abandonment flow — b (sıcak veda + kapı açık) — **[ARCHIVE — Sprint 12+]**

## 14. Word Connection Graph (~~Killer #3 — UX.3~~ POST-BETA per Q3 lock 2026-05-16)

> 🔄 **SUPERSEDED — Q3 Final Strategy Lock 2026-05-16**
> Word Graph **post-beta**. Killer #3 framing archived. Active killer trinity: Weave + Say It Your Way + Natural Reveal. Aşağıdaki 3 ekran ARCHIVE — Sprint 12+/public beta'da implement edilmez. Word Graph data structure compatibility (related items + chunks/pieces/words/idioms link) Mon Lexique Basic'te preserve edilir.

- [ ] ~~Word Graph — L9 live demo (5 user kelime + network çiz)~~ → ARCHIVE (Q3 lock)
- [ ] ~~Word Graph — full visualization (force-directed / cluster / timeline)~~ → POST-BETA (Q3 lock)
- [ ] ~~Word Graph — paywall vitrini context'i~~ → ARCHIVE (Q4 Campfire lock kills "paywall vitrini" concept too)

## 15. Monolingual Transition (UX.1 — L40+)

- [ ] L39 sonu özel onboarding ekranı ("L40'te tam Fransızca'ya geçiyorsun")
- [ ] EN/FR toggle button (header, L40-L60 aktif)
- [ ] EN/FR 3-saniye basılı tutma görsel feedback
- [ ] Re-unlock fallback — "Kademeli geçiyoruz" mesajı (zorlanan kullanıcı)
- [ ] L40 zirve — bayrak ceremony (Image #8)

## 16. L80 Ceremony & Trail Badges

- [ ] L80 ceremony — promise kanıt ekranı (sertifika hissi)
- [ ] M1 Basic Communicator — trail checkpoint badge
- [ ] M2 Independent Speaker — trail checkpoint badge
- [ ] M3 Confident Conversationalist — trail checkpoint badge
- [ ] M4 Natural Expression — trail checkpoint badge

## 17. Settings / Account (eksik bölüm)

- [x] Settings ana ekranı (account modal'dan ayrı, dedicated screen) — **2026-05-08: Settings — main + Settings hub — account**
- [x] Account — sign out confirm — **2026-05-08: Sign out confirm — soft modal sheet**
- [x] Settings — language toggle (TR / EN UI) — **2026-05-08: Language toggle — EN**
- [x] Settings — TTS voice picker (expo-speech / Forvo) — **2026-05-08: Voice picker — Forvo native**
- [x] Settings — notifications toggle — **2026-05-08: Notifications — daily nudge time + permission ask**
- [x] GDPR — "Verilerimi indir" ekranı — **2026-05-08: Download my data — GDPR export**
- [x] GDPR — "Verilerimi sil" confirm flow — **2026-05-08: Delete account — gentle but final**
- [x] Privacy policy görüntüleme ekranı — **2026-05-08: Privacy — dedicated screens + Privacy policy — plain words**
- [x] **NEW** Profile main — stats — **2026-05-08**
- [x] **NEW** About — brand statement — **2026-05-08**
- [x] **NEW** Special thanks — credits page — **2026-05-08**
- [x] **NEW** Learning — pace radio (gentle/steady/brisk) — **2026-05-08**

## 18. Sistem & Edge States

- [x] Network error / offline banner — **2026-05-08: No internet — offline state + Edge states**
- [ ] Supabase auth error state
- [ ] AI service down fallback ("Try again later")
- [ ] App update required ekranı
- [x] **NEW** Push preview — lock screen — **2026-05-08**
- [x] **NEW** Notification states — push (delivered/missed/tapped) — **2026-05-08**
- [x] **NEW** Halftone dot pattern overlay — printed-feel visual treatment — **2026-05-08** — **[DEPRECATED — V4-D variant rejected; V4-B locked]**; halftone treatment optional Sprint 12+ visual polish

---

## 19. Sprint 11 Yeni Required States (Merged Canon 2026-05-11)

> **Tüm bölüm**: **[NEW]** — V4 Studies'te yok, Merged Canon (MC.1-9) eklediği states. Sprint 11 implementation backlog. Detay: [[LeMot - User Journey]] v6 § Merged Canon + [[#Sprint 11 implementation pointer]].

### 19.A — How Weave Works (MC.6)

- [ ] How Weave Works — Card 1 (Permission): "You do not need perfect French yet."
- [ ] How Weave Works — Card 2 (Method): "Use the French pieces you know. Leave the rest in English." + example
- [ ] How Weave Works — Card 3 (Reveal): "Le Mot will show the natural French version." + example

3-card interstitial, Lesson Zero sonrası, Lesson 1 öncesi (one-time).

### 19.B — Pieces Mechanic (MC.5)

- [ ] Pieces Card — chunk-first display (`[bonjour] [je voudrais] [un café] [s'il vous plaît]`)
- [ ] Expandable Piece Card — micro-fragment reveal on tap (`je voudrais` → `je = I` + `voudrais = would like`)
- [ ] Light Piece Hunt — interactive piece identification

Replaces "Bridge" naming user-side; "Bridge" stays creator-side for analytical concept.

### 19.C — Free Weave + Natural Reveal (MC.1)

- [ ] Free Weave Item — mixed FR-EN input field, no expected answer
- [ ] Natural Reveal — "Natural French:" label + full French sentence (TTS reads only this)
- [ ] Choose Your Pieces — variant prompt (limited piece challenge)
- [ ] Upgrade the Sentence — variant prompt (one step more French)

Typed Weave **already in code** (commit `a6a4f93`) — **[VALID — in-code]** per MC.1.

### 19.D — Mini Mission / Try a Scene (MC.3 + Use It)

> 🔄 **SUPERSEDED — Tier B 2026-05-16 (v1 Canon §16 + §18)**
> Mini Mission core lesson spine'dan **kaldırıldı**. Replaced by 2 ayrı mekanik:
> - **Say It Your Way** (v1 §16): flagship production mechanic, kendi section'ı. Input moment + Natural Reveal pattern korunuyor.
> - **A Small Moment** (v1 §18): yeni mekanik. 3-4 line situation → French response → AI eval (meaning/grammar/naturalness/tone/comprehension/weak-point tags). Use cases: Daily Review light slot, Practice Pool Challenge, Post-Summit, Milestones, premium AI feature. **Limited/later** MVP scope (v1 §14).
>
> AI typing/loading + AI cap reached state'ler her iki yeni mekanik için de geçerli — preserve.
> Cancel: WS.8 (Mini Mission implementation workstream).

- [ ] ~~Mini Mission — input moment~~ → **Say It Your Way input** (v1 §16; existing screen, keep)
- [ ] ~~Mini Mission — Natural French reveal~~ → **Say It Your Way Natural Reveal** (v1 §17)
- [ ] ~~Mini Mission — scene response (AI continuation)~~ → **A Small Moment** (v1 §18, new mechanic, limited/later MVP)
- [ ] AI typing/loading state — **preserve** (used by SayItYourWay + A Small Moment)
- [ ] AI cap reached state — **preserve**

### 19.E — Stay with It Variants (MC.7 — 8 internal exercise types)

> 🔄 **RE-HOMED — Tier B 2026-05-16 (v1 Canon §8 + §19 + §20)**
> Stay with It section v1 lesson spine'da **yok** (yerine Natural Reveal + Recap). 8 exercise type kaybolmuyor — 3 yeni home'a dağıtıldı:
> - **Practice Pool Build bucket** (v1 §19): listening/discrimination traps. Catch the Moment / Listen for Useful Piece / Which Pieces Did You Hear / Hear the Shape / What Changed → v1 ListeningTrap + MicroContrastChoice + FillWithTraps component'leri.
> - **Practice Pool Build bucket** (micro-contrast): Wrong Scene Trap / Negation Trap / Tu-Vous Trap → v1 MicroContrastChoice component.
> - **Daily Review** rotation (v1 §20): Micro-Contrast or Sound Trap slot'unda 4-step rhythm'in 2. adımında.
> - **In-lesson Try It inline traps** (v1 §8 Try It stage): 2-3 light recognition/discrimination cards opsiyonel inline kalabilir — ama section değil, inline.
>
> Cancel: Stay With It as core lesson section. Re-spec: WS.7 (Stay with It workstream — re-home, not implement as section).

- [ ] ~~Stay with It — Catch the Moment (audio + meaning)~~ → **Practice Build / Daily Review** (ListeningTrap)
- [ ] ~~Stay with It — What Changed?~~ → **Practice Build** (FillWithTraps variant)
- [ ] ~~Stay with It — Wrong Scene Trap~~ → **Practice Build** (MicroContrastChoice)
- [ ] ~~Stay with It — Which Pieces Did You Hear?~~ → **Practice Build / Daily Review** (ListeningTrap)
- [ ] ~~Stay with It — Hear the Shape (rhythm/landing)~~ → **Practice Build / Daily Review** (ListeningTrap)
- [ ] ~~Stay with It — Negation Trap~~ → **Practice Build** (MicroContrastChoice)
- [ ] ~~Stay with It — Tu/Vous Trap~~ → **Practice Build** (MicroContrastChoice)
- [ ] ~~Stay with It — Listen for Useful Piece~~ → **Practice Build / Daily Review** (ListeningTrap)
- [ ] Try It inline trap card (opsiyonel, 1-2 per lesson) — recognition/discrimination, section değil

### 19.F — Insight Cards Reframe (MC.2)

> Existing Unlock overlays (Section 10) → reframe to Insight Cards. Same content types, different framing.

- [ ] Insight Card — Expression (small comfort phrase)
- [ ] Insight Card — Grammar Nugget (effect/feeling, not rule)
- [ ] Insight Card — Faux Ami (Not this / But this)
- [ ] Insight Card — Culture Bite (sparingly)
- [ ] Insight Card — Sound Pattern (clear Listen CTA)
- [ ] Insight Card — Tiny Throwback (callback to earlier piece)
- [ ] Insight Card — Take Another Look ("This one still needs a little settling")

Max 1 per chunk OR 2 per lesson. Drop reward language ("Unlocked!") per MC.2.

### 19.G — Practice Tab Expansion (MC.8)

- [ ] Practice — Use What You Have (limited-piece challenge)
- [ ] Practice — Survival Mode (timed/pressure optional)
- [ ] Practice — Make It Natural (naturalness/register)
- [ ] Practice — Two Ways to Say It (breaks one-correct mindset)
- [ ] Practice — Scene Repair (social/pragmatic correction)
- [ ] Practice — More Stay with It (review variants)
- [ ] Practice — Show me / Got it 2-button SRS feedback (drop time labels)

5 yeni mod + SRS UX revize per MC.8 + V4-B PR.1.

### 19.H — Code-side Sprint 11 (V4 Disposition)

- [ ] aiLesson defensive guard — `if (!FEATURES.aiLesson) return null` in SayItYourWay + MiniConversation per V4.FLAG.1
- [ ] MOTIV 3-layer rotation — proverb / soft reflection / path reflection per V4.MOTIV.1
- [ ] LessonOutro stats removal — XP/level/streak/accuracy/time → passive mirror per V4.OUTRO.1

---

## Özet

| Bölüm                    | Toplam  | ☑ V4'te var | ☐ Yapılacak | 2026-05-08 Δ | 2026-05-11 Classification |
| ------------------------ | ------- | ----------- | ----------- | ------------- | -------------------- |
| 1. Auth & Onboarding     | 4       | **2**       | 2           | +2 ☑           | 2 VALID, 2 NEW |
| 2. Home                  | 4       | 1           | 3           | (notation)    | 1 VALID (V4-B locked), 3 NEW |
| 3. Chat                  | 9       | 6           | 3           | —             | sandbox/public-beta scope (Chat tab) |
| 4. Practice              | 10      | 6           | 4           | —             | 6 VALID, 4 NEW |
| 5. Progress              | 5+1     | 3           | 2           | —             | **1 REDESIGN** (Overview XP/Streak/Level), 2 VALID, 2 NEW + tab adı "Progress" locked |
| 6. Lesson Frame          | 4       | **4**       | 0           | +3 ☑           | **4 REDESIGN** (LessonAnchor fold, taxonomy 11→9) |
| 7. Lesson Part 1         | 6       | 4           | 2           | —             | **6 REDESIGN** (Read & Listen → Meet It; Patterns → Notice the Pieces; Vocab → Insight Card; Weave Fill / French Fill → Try It) |
| 8. Lesson Part 2         | 3       | 3           | 0           | —             | **3 REDESIGN** (Build → Shape It; Write → Weave It; Quiz → Try It / Stay with It) |
| 9. Lesson Part 3         | 4       | 4           | 0           | —             | **4 RE-LABEL per Tier B 2026-05-16** (Combine → Build It / Shape It; Say It → Say It Your Way / production screen (v1 §16); Mini Chat → LEGACY Dev APK, may evolve into A Small Moment v1 §18; Review → re-home Stay With It variants into Practice Pool / Daily Review / Try It inline traps, NOT a section) |
| 10. Transitions/Overlays | 11      | **5**       | 6           | +4 ☑           | **6 REDESIGN** (Insight Card reframe + LessonOutro passive mirror + Take Another Look microcopy), 1 DEPRECATED, 4 VALID/NEW |
| 11. Daily Review         | **8**   | **6**       | 2           | +1 row, +2 ☑    | 6 VALID, **1 REDESIGN** (Outro streak removal), 1 DEPRECATED, 1 ARCHIVE |
| 12. Mon Lexique          | 7       | **3**       | 4           | +1 ☑           | **7 ARCHIVE** (Sprint 12+ public beta) + V4.LEX.1 bilingual rule |
| 13. Paywall              | 8       | **5**       | 3           | +4 ☑           | **8 ARCHIVE** (public beta scope) |
| 14. Word Graph           | 3       | 0           | 3           | —             | 3 ARCHIVE (Sprint 12+) |
| 15. Monolingual L40+     | 5       | 0           | 5           | —             | 5 ARCHIVE (Wave 3 — Open Decision A) |
| 16. L80 & Trail          | 5       | 0           | 5           | —             | 5 ARCHIVE (Wave 3) |
| 17. Settings             | **12**  | **12**      | 0           | +4 rows, +12 ☑  | 12 VALID — Sprint 12+ public beta implementation |
| 18. Edge states          | **7**   | **4**       | 3           | +3 rows, +4 ☑   | 4 VALID, 3 NEW + Halftone DEPRECATED (V4-D rejected) |
| **19. Sprint 11 Yeni**   | **40**  | **0** (yeni) | **40**      | **NEW section** | **Per Tier B 2026-05-16**: How Weave Works × 3 KEEP / Pieces × 3 KEEP / Free Weave + Natural Reveal × 4 KEEP / ~~Mini Mission × 5~~ SUPERSEDED → Say It Your Way + A Small Moment (v1 §16+§18) / ~~Stay with It × 8~~ RE-HOMED to Practice Pool Build + Daily Review + Try It inline traps / Insight Cards × 7 KEEP / Practice expansion × 7 RE-SPEC under v1 Build/Stretch/Challenge bucket (v1 §19) / code-side V4 disposition × 3 KEEP. Typed Weave already in code. |
| **TOPLAM**               | **155** | **68**      | **87**      | **+40 row, +0 ☑** | classification overlay applied (~25 REDESIGN, ~30 VALID, 4 DEPRECATED, ~28 ARCHIVE, 40 NEW) |

**2026-05-08 V4 Yumuşatma + Mon Lexique pass özeti**: 8 yeni ekran satırı eklendi (Bon retour, Profile main, About brand, Special thanks, Learning pace, Push preview, Notification states, Halftone overlay). 32 ekran ☐ → ☑ flip'lendi. Settings sektörü 0/8'den 12/12'ye sıçradı (tam kapsama). Edge states 0/4'ten 4/7'ye. Paywall 1/8'den 5/8'e. Lesson Frame 1/4'ten 4/4'e (tam kapsama).

**2026-05-11 V4 Disposition + Merged Canon overlay özeti**: Section 19 (Sprint 11 Yeni Required States) eklendi — **40 yeni state** Merged Canon kararlarından (MC.1-9 + V4.* dispositions) çıkarıldı. Mevcut 18 section'a classification flag eklendi. **Section 6-10 Lesson Player full REDESIGN** (taxonomy 11→9 per MC.3). **Section 12 Mon Lexique + Section 13 Paywall = 15 item ARCHIVE** (Sprint 12+ public beta scope). Section 5 Progress XP/Streak strip + Lesson Outro stats grid = REDESIGN-required (canon-conflict). Toplam ekran 115 → **155 (+40 row)**. **Current APK blocker: HİÇBİRİ** (V4 design Sprint 11 implementation öncesi, code'da V4 visual implement edilmemiş).

---

## Öncelik Sırası (önerim)

**Yakın MVP (Dev APK + sandbox temel)**:
1. Lesson transitions/overlays (10 ekran) — kritik, ders deneyiminin tutkalı
2. Auth & Lesson Zero (4 ekran) — kullanıcının ilk teması
3. Weave Fill + French Fill ayrı artboard (2 ekran) — Killer #1'in çekirdeği

**Sandbox açılışı (V4 implement)**:
4. Mon Lexique 5 eksik ekran (search, empty, AI modals, connected words)
5. Daily Review eksik state'ler (3 ekran)
6. Lesson chunk selector + header bar (3 ekran)

**Public beta hazırlığı**:
7. Paywall ceremony + abandonment flow (7 ekran)
8. Settings & GDPR (8 ekran)
9. Trail badges + L80 ceremony (5 ekran)

**Wave 3 (post-launch)**:
10. Word Graph full (3 ekran)
11. Monolingual L40+ (5 ekran)
12. Edge/system states (4 ekran)

---

## İlgili

- [[LeMot]] — ana proje notu
- [[LeMot - User Journey]] — felsefe + decision log
- [[Test Checklist]] — APK test checklist'i
- V4 Studies HTML (eski): `~/Desktop/Le Mot Prototype Handoff/Le Mot Protoype-handoff/le-mot-protoype/project/Le Mot V4 Studies.html`
- **V4 Yumuşatma + Mon Lexique HTML (yeni, 2026-05-08)**: `~/Desktop/Le Mot .md/May/08.05.2026/Le Mot V4 Studies _standalone_.html` — Settings/Notifications/Edge states/Paywall ceremony/ek Daily Review/Lesson transitions/Mon Lexique search ekran kapsamını genişletti.
