# L1–L10 Sentence & Chunk System — Candidate v0.2

> **Status: CANDIDATE. Not approved, not implemented, not reviewed.**
> Every French sentence in this document is AI-authored candidate content.
> No named human French reviewer has seen it. Every founder and reviewer
> verdict column is deliberately blank. Nothing here has been written into a
> lesson file, a registry, or a payload — this is a plan.

| | |
|---|---|
| Base branch | `docs/l1-l10-french-qa-pack` |
| Base commit | `b3bb0e6cc4d65482a72e9b8733616e19771df1a3` |
| Working branch | `content/l1-l10-sentence-chunk-canon-draft` |
| Scope | Lessons 1–10 (`v1-lesson-001` … `v1-lesson-010`) |
| Master CSV | `L1_L10_SENTENCE_CHUNK_ROWS_v0.1.csv` (one row per **exact surface**) |
| Reviewer sentence CSV | `docs/qa/french/L1_L10_HUMAN_FRENCH_REVIEW_SIMPLE_v0.2.csv` (exact surfaces) |
| Reviewer chunk CSV | `docs/qa/french/L1_L10_HUMAN_FRENCH_CHUNK_REVIEW_SIMPLE_v0.1.csv` |
| L1 density reference | `docs/workstreams/L1_SENTENCE_ECOSYSTEM_v0.1.md` (30 seeds, preserved) |
| Evidence base | `docs/qa/french/L1_L10_FRENCH_QA_PACK_v0.1.md` (the extraction of what ships today) |

**Governing canon read for this draft:** Content Bible v1.0 (§5.2 surface
ceiling, §18.3 French-QA gate, §19 parameters), Lesson Flow Canon v1 (§1.1
screen and production budget), Payload Economy v0 (§3 ceiling, §4.1 survival
formulas, §4.2 oui, §6 L1–L5 enrichment targets), the L7–L10 lesson specs, and
the shipped `lesson-001.ts`–`lesson-010.ts` with their registries and
identity tests. Where the shipped lessons and a spec disagree, the
disagreement is reported as a founder decision rather than resolved silently.

---

## 0. Counting model — read before §1

**The human French-QA unit is an exact learner-facing surface, not a sentence
family.** The v0.1 draft of this document counted 68 sentence families and
offered them to the reviewer as the review inventory. That was wrong twice
over: a family hides the exact strings a reviewer has to judge, and 68 rows
under-scopes ten lessons of French.

This revision keeps families as the *internal* planning unit — they are still
in §2 and §3, and they are still what the implementation map is built on — and
adds the layer that actually goes to the reviewer:

| Layer | Unit | Count | Where it lives |
|---|---|---:|---|
| Human QA inventory | exact French surface | **305** | `L1_L10_HUMAN_FRENCH_REVIEW_SIMPLE_v0.2.csv` |
| Human QA chunk inventory | exact French chunk, per lesson | **140** | `L1_L10_HUMAN_FRENCH_CHUNK_REVIEW_SIMPLE_v0.1.csv` |
| Internal master | exact surface + internal metadata | **305** | `L1_L10_SENTENCE_CHUNK_ROWS_v0.1.csv` |
| Internal planning | sentence family | 68 | §2 and §3 of this document |

**The density reference is L1's existing 30-seed set**
(`docs/workstreams/L1_SENTENCE_ECOSYSTEM_v0.1.md`, reviewer pack
`L1_HUMAN_FRENCH_QA_REVIEW_PACK_v0.1.md`). All 30 seeds — `L1-SE-001` through
`L1-SE-033` — are preserved here verbatim: same exact French, same role, same
treatment, same input-only and model-only distinctions. Nothing in L1 was
reduced, merged or re-worded. L2–L10 are authored to that same granularity.

### Surfaces per lesson

| | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Exact French surfaces | 30 | 30 | 30 | 30 | 30 | 32 | 30 | 30 | 30 | 33 | **305** |
| Chunks for review | 16 | 16 | 14 | 15 | 13 | 12 | 12 | 14 | 12 | 16 | **140** |
| Active-new chunks | 3 | 1 | 4 | 1 | 2 | 0 | 1 | 1 | 1 | 0 | — |

### What a surface is, and what it is not

| Treatment | Rows | What the learner does |
|---|---:|---|
| INTERLOCUTOR | 95 | hears the other person say it |
| PRODUCE | 77 | writes or says it from intent |
| MODEL | 50 | is shown it after their own attempt, as one natural way |
| SUPPORTED | 35 | produces it with the pieces visible on screen |
| READ/LISTEN | 27 | reads or hears it; never asked to produce it |
| ACCEPTED ALTERNATIVE | 13 | may write it instead, and is marked right |
| CONTRAST | 8 | sees it beside the target, to feel a difference |

**This is a QA inventory, not a screen plan.** A lesson can carry ~30 surfaces
for review while still rendering 11–14 screens, asking for 3–5 production
actions, and introducing 1–4 active-new chunks. Most of the density is French
the learner *hears or reads* — the other person's lines, ambient service
French, models shown after an attempt. Those need a native eye precisely
because nobody is grading them.

### Padding controls applied

- No surface repeats inside a lesson.
- No surface exists only as an emphatic punctuation twin. Three such rows
  (`Je suis ici !`, `J'ai faim !`, a second `Merci beaucoup. Au revoir.`) were
  written and then cut, and replaced with surfaces that do a different job.
- Five same-words/different-punctuation pairs survive **on purpose**, because
  each is a real question for the reviewer, not a variant:

| Lesson | Pair | Why both |
|---|---|---|
| L3 | `Non, merci.` / `Non merci.` | comma or no comma is exactly the kind of call the L1 pack routes to a decision card |
| L5 | `une table` / `Une table ?` | one is a package chip the learner assembles; the other is a spoken offer with a rising tone |
| L7 | `Je vais à la maison. Au revoir.` / `Je vais à la maison, au revoir.` | the shipped natural-reveal already teaches this as two rhythms |
| L9 | `On fait une pause ?` / `On fait une pause.` | suggesting versus announcing — different acts |
| L10 | `Bonjour. C'est où ?` / `Bonjour, c'est où ?` | the shipped accepted-alternative pair |

- Cross-lesson repetition is deliberate and carries a different situation each
  time: 305 rows over 230 distinct strings. A recycled surface is a
  different review question in a different scene, and the reviewer sees the
  scene on every row.

---

## 0b. Lesson-by-lesson surface inventory

The complete reviewer inventory. Chunk tables follow each lesson.

### L1 — 30 surfaces, 16 chunks, 3 active-new

*Get attention, order politely, thank — and recover when you lose the thread.*

**Preserved verbatim from the L1 30-seed set.** Every row carries its
original `L1-SE-###` id in the origin column of the master CSV.

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Bonjour.** | Hello. | You walk in and open the exchange. | PRODUCE | L1-SE-001 (preserved) |
| 2 | **Je voudrais un café.** | I would like a coffee. | You have already greeted; now you order. | PRODUCE | L1-SE-002 (preserved) |
| 3 | **Bonjour, je voudrais un café.** | Hello, I would like a coffee. | Greeting and order in one turn. | PRODUCE | L1-SE-003 (preserved) |
| 4 | **Bonjour, je voudrais un café, s'il vous plaît.** | Hello, I would like a coffee, please. | The full polite order — the central L1 sentence. | PRODUCE | L1-SE-004 (preserved, anchor) |
| 5 | **Je voudrais un café, s'il vous plaît.** | I would like a coffee, please. | Ordering when you have already said hello. | PRODUCE | L1-SE-005 (preserved) |
| 6 | **Un café, s'il vous plaît.** | A coffee, please. | The short order a regular gives at a busy counter. | PRODUCE | L1-SE-006 (preserved) |
| 7 | **Je voudrais un thé, s'il vous plaît.** | I would like a tea, please. | Same order, different drink; the words for the tea are in front of you. | SUPPORTED | L1-SE-007 (preserved) |
| 8 | **Un thé, s'il vous plaît.** | A tea, please. | The short tea order; the words are in front of you. | SUPPORTED | L1-SE-008 (preserved) |
| 9 | **Merci.** | Thank you. | The drink arrives and you thank them. | PRODUCE | L1-SE-009 (preserved) |
| 10 | **Au revoir.** | Goodbye. | You close the exchange and leave. | PRODUCE | L1-SE-010 (preserved) |
| 11 | **Merci, au revoir.** | Thank you, goodbye. | Thanks and goodbye as one exit. | PRODUCE | L1-SE-011 (preserved) |
| 12 | **S'il vous plaît.** | Please. | The formula shown and heard on its own, never demanded alone. | READ/LISTEN | L1-SE-012 (preserved) |
| 13 | **Je ne comprends pas.** | I don't understand. | You lost the thread; the formula is in front of you. | SUPPORTED | L1-SE-013 (preserved) |
| 14 | **Vous pouvez répéter ?** | Can you say that again? | Asking for a repeat; the formula is in front of you. | SUPPORTED | L1-SE-014 (preserved) |
| 15 | **Je ne comprends pas. Vous pouvez répéter ?** | I don't understand. Can you say that again? | The whole recovery move in one turn. | SUPPORTED | L1-SE-015 (preserved) |
| 16 | **Excusez-moi, je ne comprends pas.** | Excuse me, I don't understand. | Interrupting politely to say you are lost. | SUPPORTED | L1-SE-016 (preserved) |
| 17 | **Excusez-moi.** | Excuse me. | Getting someone's attention — not an apology. | SUPPORTED | L1-SE-017 (preserved) |
| 18 | **Je veux un café.** | I want a coffee. | Shown as a contrast: real French, but blunt with a stranger. | CONTRAST | L1-SE-018 (preserved) |
| 19 | **Bonjour, monsieur.** | Hello, sir. | The server greets you; you only hear it. | INTERLOCUTOR | L1-SE-019 (preserved) |
| 20 | **Bonjour, madame.** | Hello, madam. | The server greets you; you only hear it. | INTERLOCUTOR | L1-SE-020 (preserved) |
| 21 | **Un café, madame ?** | A coffee, madam? | The server offers, with a rising tone. | INTERLOCUTOR | L1-SE-021 (preserved) |
| 22 | **Un café.** | One coffee. | The server repeats your order back, flat. | INTERLOCUTOR | L1-SE-023 (preserved) |
| 23 | **Un croissant ?** | A croissant? | The server offers something extra; heard only. | INTERLOCUTOR | L1-SE-024 (preserved) |
| 24 | **Voilà.** | Here you are. | The drink is set down in front of you. | INTERLOCUTOR | L1-SE-025 (preserved) |
| 25 | **Voilà, monsieur.** | Here you are, sir. | The same handover, addressed. | INTERLOCUTOR | L1-SE-026 (preserved) |
| 26 | **Merci, madame.** | Thank you, madam. | Shown after your own thanks, as a warmer version. | MODEL | L1-SE-027 (preserved) |
| 27 | **Au revoir, madame.** | Goodbye, madam. | The server's close, shown as a model. | MODEL | L1-SE-028 (preserved) |
| 28 | **Bonjour, je voudrais un café, s'il vous plaît. Merci !** | Hello, I would like a coffee, please. Thank you! | One natural way to run the whole order. | MODEL | L1-SE-030 (preserved) |
| 29 | **Bonjour, un café, s'il vous plaît. Merci !** | Hello, a coffee, please. Thank you! | The shorter, more casual way to run the same order. | MODEL | L1-SE-031 (preserved) |
| 30 | **Merci beaucoup, au revoir !** | Thank you very much, goodbye! | A warmer exit, shown after yours. | MODEL | L1-SE-033 (preserved) |

**Chunks — L1**

| French chunk | English | Use | Role |
|---|---|---|---|
| merci | thank you | Closes any exchange. | **active-new** |
| s'il vous plaît | please | Softens any request; always used whole. | **active-new** |
| bonjour | hello | Opens any exchange, from morning to late afternoon. | recycled |
| je voudrais | I would like | The polite way to ask for something. | recycled |
| un café | a coffee | The drink and its little word, learned together. | noun package |
| un thé | a tea | The second drink; given to the learner when they produce it. | supported |
| excusez-moi | excuse me | Getting attention — not an apology. | supported |
| je ne comprends pas | I don't understand | Said whole when you lose the thread. | survival formula |
| vous pouvez répéter ? | can you say that again? | Said whole to ask for a repeat. | survival formula |
| au revoir | goodbye | Closes the moment as you leave. | **active-new** |
| merci beaucoup | thank you very much | A warmer thanks. | supported |
| madame | madam | Address form; heard, not required. | recognition-only |
| monsieur | sir | Address form; heard, not required. | recognition-only |
| un croissant | a croissant | Heard at the counter; produced later. | recognition-only |
| voilà | here you are | Heard as something is handed over. | recognition-only |
| je veux | I want | Shown only as a blunt contrast to je voudrais. | recognition-only |

Active-new: `merci`, `s'il vous plaît`, `au revoir` — 3 of a maximum 4.

---

### L2 — 30 surfaces, 16 chunks, 1 active-new

*Put yourself somewhere, and say what state you are in.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Je suis ici.** | I am here. | Someone calls your name and you answer. | PRODUCE | shipped L2 |
| 2 | **Bonjour, je suis ici.** | Hello, I am here. | You step into the room and greet before placing yourself. | PRODUCE | shipped L2 (met, produced in L6) |
| 3 | **Je suis là.** | I'm here. | The same answer with the other place word; both are normal. | ACCEPTED ALTERNATIVE | new |
| 4 | **Je suis à l'heure.** | I'm on time. | The opposite of being late, said with relief. | READ/LISTEN | new |
| 5 | **Je suis en retard.** | I'm late. | You arrive after things have started. | SUPPORTED | new |
| 6 | **Excusez-moi, je suis en retard.** | Excuse me, I'm late. | Slipping in once the room is already busy. | SUPPORTED | new |
| 7 | **Bonjour, je suis en retard.** | Hello, I'm late. | Greeting and owning it in one turn. | PRODUCE | new |
| 8 | **Moi, je suis ici.** | Me, I'm here. | Shown as a contrast: same meaning, more emphasis on you. | CONTRAST | new |
| 9 | **Je suis fatigué.** | I'm tired. | The same shape naming a state instead of a place (man speaking). | READ/LISTEN | new |
| 10 | **Je suis fatiguée.** | I'm tired. | The same sentence when a woman says it. | READ/LISTEN | new |
| 11 | **Je suis prêt.** | I'm ready. | Another state, shown beside the place (man speaking). | READ/LISTEN | shipped L2 insight |
| 12 | **Je suis prête.** | I'm ready. | The same sentence when a woman says it. | READ/LISTEN | new |
| 13 | **Je suis désolé.** | I'm sorry. | Heard after arriving late (man speaking). | READ/LISTEN | new |
| 14 | **Je suis désolée.** | I'm sorry. | The same apology when a woman says it. | READ/LISTEN | new |
| 15 | **Vous êtes ici ?** | Are you here? | Someone checks whether you have arrived. | INTERLOCUTOR | new |
| 16 | **Vous êtes là ?** | Are you there? | The same check, called through a door. | INTERLOCUTOR | new |
| 17 | **Ah, vous êtes là !** | Ah, there you are! | They spot you and are pleased. | INTERLOCUTOR | new |
| 18 | **Vous êtes prêt ?** | Are you ready? | Someone asks if you are set (asking a man). | INTERLOCUTOR | new |
| 19 | **Vous êtes prête ?** | Are you ready? | The same question asked of a woman. | INTERLOCUTOR | new |
| 20 | **Vous êtes en retard.** | You're late. | Said to you, without reproach. | INTERLOCUTOR | new |
| 21 | **Ce n'est pas grave.** | It's fine / no harm done. | The reply after you say you're late. | INTERLOCUTOR | new |
| 22 | **Entrez.** | Come in. | Heard at the door; you only need to understand it. | INTERLOCUTOR | new |
| 23 | **Par ici.** | This way. | Someone shows you where to go. | INTERLOCUTOR | new |
| 24 | **Une seconde.** | One second. | Heard while someone finishes something. | INTERLOCUTOR | new |
| 25 | **Asseyez-vous.** | Have a seat. | Heard as you are shown in. | INTERLOCUTOR | new |
| 26 | **Bonjour. Je suis ici. Merci.** | Hello. I'm here. Thank you. | One natural way to run a whole small arrival. | MODEL | new |
| 27 | **Bonjour, je suis en retard. Excusez-moi.** | Hello, I'm late. Sorry. | The same arrival on a day that went wrong. | MODEL | new |
| 28 | **Je ne comprends pas.** | I don't understand. | Still available when the room answers too fast. | SUPPORTED | L1 seed, recycled |
| 29 | **Vous pouvez répéter ?** | Can you say that again? | The second half of the same recovery. | SUPPORTED | L1 seed, recycled |
| 30 | **Excusez-moi.** | Excuse me. | Getting attention before you place yourself. | SUPPORTED | L1 seed, recycled |

**Chunks — L2**

| French chunk | English | Use | Role |
|---|---|---|---|
| je suis | I am | Says who or where you are. | **active-new** |
| ici | here | The place word that answers where. | supported |
| là | here / there | The other place word; just as common. | supported |
| en retard | late | A state; never changes form. | supported |
| fatigué / fatiguée | tired | A state; the ending changes with the speaker. | recognition-only |
| prêt / prête | ready | A state; the ending changes with the speaker. | recognition-only |
| désolé / désolée | sorry | An apology; the ending changes with the speaker. | recognition-only |
| vous êtes | you are | The same shape pointed at the other person; heard only. | recognition-only |
| ce n'est pas grave | it's fine / no harm done | The reassurance you get after apologising. | recognition-only |
| entrez | come in | Heard at a door. | recognition-only |
| par ici | this way | Heard when someone shows you where to go. | recognition-only |
| asseyez-vous | have a seat | Heard as you are shown in. | recognition-only |
| une seconde | one second | Heard while someone finishes something. | recognition-only |
| bonjour | hello | Still opening every arrival. | recycled |
| à l'heure | on time | The opposite of en retard; never changes form. | recognition-only |
| excusez-moi | excuse me | Now used before placing yourself. | recycled |

Active-new: `je suis` — 1 of a maximum 4.

---

### L3 — 30 surfaces, 14 chunks, 4 active-new

*Answer yes or no, refuse politely, and say what is not so.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Non.** | No. | The fastest answer there is. | PRODUCE | shipped L3 |
| 2 | **Oui.** | Yes. | Its opposite, just as fast. | PRODUCE | shipped L3 |
| 3 | **Non, merci.** | No, thank you. | Turning down an offer without being sharp. | PRODUCE | shipped L3 (choice only) |
| 4 | **Non merci.** | No thanks. | The same refusal written without the comma. | ACCEPTED ALTERNATIVE | shipped L3 |
| 5 | **Oui, merci.** | Yes, thank you. | Accepting the same offer. | PRODUCE | new |
| 6 | **Je ne suis pas ici.** | I am not here. | Someone is looking for you in the wrong room. | PRODUCE | shipped L3 |
| 7 | **Non, je ne suis pas ici.** | No, I am not here. | Answering first, then explaining. | PRODUCE | shipped L3 |
| 8 | **Je ne suis pas là.** | I'm not there. | The same answer with the other place word. | ACCEPTED ALTERNATIVE | new |
| 9 | **Ce n'est pas ici.** | It is not here. | Someone points at the wrong place. | PRODUCE | shipped L3 |
| 10 | **Non, ce n'est pas ici.** | No, it is not here. | Answering a where-question in the negative. | PRODUCE | new |
| 11 | **Je ne comprends pas.** | I don't understand. | Now built from the wrap the lesson teaches. | PRODUCE | L1 seed, owned here |
| 12 | **Excusez-moi, je ne comprends pas.** | Excuse me, I don't understand. | Interrupting politely to say you are lost. | SUPPORTED | L1 seed, recycled |
| 13 | **Vous pouvez répéter ?** | Can you say that again? | The repeat request that follows it. | SUPPORTED | L1 seed, recycled |
| 14 | **Je ne suis pas en retard.** | I'm not late. | The same wrap on a different state. | MODEL | new |
| 15 | **Je ne suis pas fatigué.** | I'm not tired. | Another state turned around (man speaking). | MODEL | new |
| 16 | **Je ne veux pas.** | I don't want to. | The full written form of a plain refusal. | READ/LISTEN | new |
| 17 | **Je veux pas.** | I don't want to. | Shown as a contrast: how it is usually said out loud. | CONTRAST | new |
| 18 | **Vous voulez un café ?** | Would you like a coffee? | The offer you are going to turn down. | INTERLOCUTOR | new |
| 19 | **Un café ?** | Coffee? | The same offer, shortened. | INTERLOCUTOR | L1 pattern, recycled |
| 20 | **Un thé ?** | Tea? | The other offer. | INTERLOCUTOR | new |
| 21 | **Vous êtes ici ?** | Are you here? | The question that gets a no. | INTERLOCUTOR | L2, recycled |
| 22 | **C'est ici ?** | Is it here? | Someone checking the place with you. | INTERLOCUTOR | new |
| 23 | **Ce n'est pas grave.** | It's fine. | Now something you can take apart, not just recognise. | READ/LISTEN | L2, recycled |
| 24 | **Pas de problème.** | No problem. | The usual reply to a refusal. | INTERLOCUTOR | new |
| 25 | **D'accord.** | All right. | Heard when someone accepts your no. | INTERLOCUTOR | new |
| 26 | **Ah, d'accord.** | Ah, all right. | The same, with the beat of understanding in front. | INTERLOCUTOR | new |
| 27 | **Ça va.** | It's fine / I'm fine. | Heard constantly; understood long before it is used. | READ/LISTEN | new |
| 28 | **Non, merci, ça va.** | No thanks, I'm fine. | One natural way to refuse warmly. | MODEL | new |
| 29 | **Non, je ne comprends pas.** | No, I don't understand. | Answering a check with an honest no. | MODEL | new |
| 30 | **Excusez-moi, ce n'est pas ici.** | Excuse me, it's not here. | Correcting someone politely. | MODEL | new |

**Chunks — L3**

| French chunk | English | Use | Role |
|---|---|---|---|
| non | no | The fastest refusal. | **active-new** |
| oui | yes | Its opposite. | **active-new** |
| je ne suis pas | I am not | Said whole; the two halves never separate. | **active-new** |
| ce n'est pas | it is not | Said whole; the two halves never separate. | **active-new** |
| non merci | no thanks | A soft, complete refusal. | supported |
| je ne comprends pas | I don't understand | Now built from the wrap this lesson teaches. | survival formula |
| je ne veux pas | I don't want to | A plain refusal; shown, not required. | recognition-only |
| je veux pas | I don't want to (spoken) | How it is usually said out loud; contrast only. | recognition-only |
| pas de problème | no problem | The usual reply to a refusal. | recognition-only |
| d'accord | all right | Heard when someone accepts your answer. | recognition-only |
| ça va | it's fine / I'm fine | Heard constantly long before it is used. | recognition-only |
| vous voulez | would you like | Opens the offer you will refuse; heard only. | recognition-only |
| merci | thank you | Now softening a refusal. | recycled |
| ici | here | Still the place being denied. | recycled |

Active-new: `non`, `oui`, `je ne suis pas`, `ce n'est pas` — 4 of a maximum 4.

---

### L4 — 30 surfaces, 15 chunks, 1 active-new

*Say what you feel and what you have.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **J'ai faim.** | I'm hungry. | Past noon and you have not eaten. | PRODUCE | shipped L4 |
| 2 | **J'ai soif.** | I'm thirsty. | A long afternoon with nothing to drink. | PRODUCE | new |
| 3 | **J'ai une question.** | I have a question. | You came with one thing to ask. | PRODUCE | shipped L4 |
| 4 | **Bonjour, j'ai une question.** | Hello, I have a question. | Greeting first, then opening your question. | PRODUCE | shipped L4 |
| 5 | **Excusez-moi, j'ai une question.** | Excuse me, I have a question. | Nobody has looked up yet. | PRODUCE | new |
| 6 | **J'ai une idée.** | I have an idea. | Something has stalled and you can see a way through. | SUPPORTED | new |
| 7 | **Vous avez une idée ?** | Do you have an idea? | Someone asks you for a way forward. | INTERLOCUTOR | new |
| 8 | **J'ai une question, s'il vous plaît.** | I have a question, please. | Softening the ask with the formula you own. | ACCEPTED ALTERNATIVE | new |
| 9 | **J'ai froid.** | I'm cold. | Shown as an example: the pattern reaches further. | READ/LISTEN | new |
| 10 | **J'ai chaud.** | I'm hot. | Its opposite, shown beside it. | READ/LISTEN | new |
| 11 | **Je n'ai pas faim.** | I'm not hungry. | The wrap from the last lesson, on the new engine. | MODEL | new |
| 12 | **Je suis ici.** | I'm here. | Shown beside J'ai faim: two engines, two jobs. | CONTRAST | L2, recycled |
| 13 | **Je suis fatigué, et j'ai faim.** | I'm tired, and I'm hungry. | Two feelings, split across the two engines. | READ/LISTEN | new |
| 14 | **J'ai une petite question.** | I have a small question. | One natural way to make the ask lighter. | MODEL | new |
| 15 | **Vous avez faim ?** | Are you hungry? | Someone asks you first. | INTERLOCUTOR | new |
| 16 | **Vous avez soif ?** | Are you thirsty? | The same question about drinking. | INTERLOCUTOR | new |
| 17 | **Vous avez une question ?** | Do you have a question? | They notice you waiting. | INTERLOCUTOR | new |
| 18 | **Une question ?** | A question? | The same thing, shortened. | INTERLOCUTOR | new |
| 19 | **Dites-moi.** | Tell me. | The invitation to go ahead. | INTERLOCUTOR | new |
| 20 | **Je vous écoute.** | I'm listening. | A slightly warmer version of the same invitation. | INTERLOCUTOR | new |
| 21 | **Allez-y.** | Go ahead. | Heard when it is your turn to speak. | INTERLOCUTOR | new |
| 22 | **Bien sûr.** | Of course. | The easy yes to a request. | INTERLOCUTOR | new |
| 23 | **Moi aussi, j'ai faim.** | Me too, I'm hungry. | Someone agrees with you. | INTERLOCUTOR | new |
| 24 | **Vous voulez un café ?** | Would you like a coffee? | The offer that answers your thirst. | INTERLOCUTOR | L3, recycled |
| 25 | **Oui, j'ai soif. Je voudrais un café, s'il vous plaît.** | Yes, I'm thirsty. I'd like a coffee, please. | A state, and the request it leads to. | MODEL | new |
| 26 | **Non merci, je n'ai pas soif.** | No thanks, I'm not thirsty. | Turning the offer down with a reason. | MODEL | new |
| 27 | **Excusez-moi, j'ai soif.** | Excuse me, I'm thirsty. | Saying what you need before asking for it. | MODEL | new |
| 28 | **Je ne comprends pas.** | I don't understand. | Still there when the answer comes too fast. | SUPPORTED | L1 seed, recycled |
| 29 | **Vous pouvez répéter ?** | Can you say that again? | The repeat request. | SUPPORTED | L1 seed, recycled |
| 30 | **Merci beaucoup.** | Thank you very much. | The warmer thanks, once they have answered. | MODEL | L1 seed, recycled |

**Chunks — L4**

| French chunk | English | Use | Role |
|---|---|---|---|
| j'ai | I have | Says what you feel or have. | **active-new** |
| faim | hunger | Used bare, with no little word. | supported |
| soif | thirst | Used bare, exactly like faim. | supported |
| une question | a question | A thing you can have. | noun package |
| une idée | an idea | Another thing you can have. | supported |
| je n'ai pas | I don't have / I'm not | The wrap on the new shape; shown, not required. | recognition-only |
| froid | cold | Heard in examples only. | recognition-only |
| chaud | hot | Heard in examples only. | recognition-only |
| vous avez | do you have / are you | The question pointed at you; heard only. | recognition-only |
| dites-moi | tell me | The invitation to speak. | recognition-only |
| je vous écoute | I'm listening | A warmer invitation. | recognition-only |
| allez-y | go ahead | Heard when it is your turn. | recognition-only |
| bien sûr | of course | The easy yes. | recognition-only |
| une petite question | a small question | A lighter way to open an ask. | recognition-only |
| je suis | I am | Now standing next to j'ai for contrast. | recycled |

Active-new: `j'ai` — 1 of a maximum 4.

---

### L5 — 30 surfaces, 13 chunks, 2 active-new

*Ask for and name things with the little word that travels with them.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **un café** | a coffee | The drink and its little word, learned as one piece. | PRODUCE | shipped L5 |
| 2 | **une question** | a question | The other package, with the other little word. | PRODUCE | shipped L5 |
| 3 | **un thé** | a tea | A second un package, already met. | SUPPORTED | L1, recycled |
| 4 | **une table** | a table | A une package you can actually ask for. | SUPPORTED | new |
| 5 | **un croissant** | a croissant | The package heard at the counter in Lesson 1. | SUPPORTED | L1 ghost, produced here |
| 6 | **Je voudrais un café.** | I would like a coffee. | The package inside a request. | PRODUCE | shipped L5 |
| 7 | **Je voudrais un café, s'il vous plaît.** | I would like a coffee, please. | The same request, softened. | PRODUCE | L1, recycled |
| 8 | **J'ai une question.** | I have a question. | The une package inside the engine you own. | PRODUCE | shipped L5 |
| 9 | **Je voudrais une table, s'il vous plaît.** | I would like a table, please. | You step into a small restaurant at lunchtime. | PRODUCE | new |
| 10 | **Je voudrais un croissant, s'il vous plaît.** | I would like a croissant, please. | Back at the counter, and this time you're hungry. | PRODUCE | new |
| 11 | **Je voudrais un thé, s'il vous plaît.** | I would like a tea, please. | The tea order, back with the package in focus. | PRODUCE | L1, recycled |
| 12 | **Un café, s'il vous plaît.** | A coffee, please. | The package on its own at a busy counter. | PRODUCE | L1 seed, recycled |
| 13 | **Une table, s'il vous plaît.** | A table, please. | The short version at the restaurant door. | ACCEPTED ALTERNATIVE | new |
| 14 | **Un croissant, s'il vous plaît.** | A croissant, please. | The short version at the counter. | ACCEPTED ALTERNATIVE | new |
| 15 | **un question** | (wrong package) | Shown as a wrong option only; never accepted. | CONTRAST | shipped L5 trap |
| 16 | **question** | question (on its own) | Shown as a wrong option only: the noun without its word. | CONTRAST | shipped L5 trap |
| 17 | **Je voudrais un café et un croissant, s'il vous plaît.** | I'd like a coffee and a croissant, please. | Two packages in one order. | MODEL | new |
| 18 | **Une table pour deux, s'il vous plaît.** | A table for two, please. | Heard at the door; you only need to follow it. | READ/LISTEN | new |
| 19 | **Vous voulez une table ?** | Would you like a table? | The greeter meets you at the door. | INTERLOCUTOR | new |
| 20 | **Une table ?** | A table? | The same question, shortened. | INTERLOCUTOR | new |
| 21 | **Un café ou un thé ?** | Coffee or tea? | Being offered a choice. | INTERLOCUTOR | new |
| 22 | **Et avec ceci ?** | Anything else? | The line every French counter says. | INTERLOCUTOR | new |
| 23 | **C'est tout ?** | Is that everything? | The same check, more plainly. | INTERLOCUTOR | new |
| 24 | **Oui, c'est tout, merci.** | Yes, that's everything, thank you. | One natural way to close the order. | MODEL | new |
| 25 | **Voilà, un café.** | Here you are, one coffee. | The handover, naming what it is. | INTERLOCUTOR | new |
| 26 | **Voilà votre café.** | Here's your coffee. | The same handover, a little warmer. | INTERLOCUTOR | new |
| 27 | **un restaurant** | a restaurant | Another package, heard in passing. | READ/LISTEN | new |
| 28 | **une maison** | a house | A une package you will need later. | READ/LISTEN | new |
| 29 | **Merci, c'est parfait.** | Thank you, that's perfect. | One natural way to accept what arrives. | MODEL | new |
| 30 | **Je ne comprends pas.** | I don't understand. | Still there when the counter answers fast. | SUPPORTED | L1 seed, recycled |

**Chunks — L5**

| French chunk | English | Use | Role |
|---|---|---|---|
| un café | a coffee | The package, now taught as the unit. | **active-new** |
| une question | a question | The other package, with the other little word. | **active-new** |
| un thé | a tea | A second un package. | supported |
| une table | a table | A une package you can ask for. | supported |
| un croissant | a croissant | A un package you can ask for. | supported |
| un restaurant | a restaurant | Heard in passing. | recognition-only |
| une maison | a house | Heard in passing; needed later. | recognition-only |
| et avec ceci ? | anything else? | The line every counter says. | recognition-only |
| c'est tout ? | is that everything? | The same check, more plainly. | recognition-only |
| voilà | here you are | Still heard at every handover. | recycled |
| je voudrais | I would like | Still carrying every request. | recycled |
| j'ai | I have | Still carrying the question. | recycled |
| s'il vous plaît | please | Still softening every ask. | recycled |

Active-new: `un café`, `une question` — 2 of a maximum 4.

---

### L6 — 32 surfaces, 12 chunks, 0 active-new

*Carry one whole small moment, from the door to goodbye.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Bonjour.** | Hello. | You are at the door. | PRODUCE | L1 seed, recycled |
| 2 | **Bonjour, je suis ici.** | Hello, I am here. | Greeting, then placing yourself. | PRODUCE | shipped L6 |
| 3 | **Je suis ici.** | I am here. | Inside, once they look up. | PRODUCE | L2, recycled |
| 4 | **J'ai une question.** | I have a question. | The reason you came. | PRODUCE | L4/L5, recycled |
| 5 | **Excusez-moi, j'ai une question.** | Excuse me, I have a question. | Nobody has looked up yet. | PRODUCE | new |
| 6 | **Non merci.** | No thanks. | Someone offers you a coffee and you're fine. | PRODUCE | L3, recycled |
| 7 | **Non merci. J'ai une question.** | No thanks. I have a question. | Declining the offer and saying why you're there. | PRODUCE | new |
| 8 | **Merci.** | Thank you. | Once they have helped. | PRODUCE | L1 seed, recycled |
| 9 | **Au revoir.** | Goodbye. | The close of the moment. | PRODUCE | shipped L6 |
| 10 | **Merci, au revoir.** | Thank you, goodbye. | Thanks and goodbye together. | PRODUCE | shipped L6 |
| 11 | **Bonjour. Je suis ici. J'ai une question.** | Hello. I'm here. I have a question. | The three-beat arrival. | PRODUCE | shipped L6 |
| 12 | **Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.** | Hello. I'm here. I have a question. Thank you. Goodbye. | The whole moment, door to goodbye. | PRODUCE | shipped L6 |
| 13 | **Bonjour. J'ai une question. Merci. Au revoir.** | Hello. I have a question. Thank you. Goodbye. | The same moment with the middle beat left out. | ACCEPTED ALTERNATIVE | shipped L6 |
| 14 | **Bonjour. Excusez-moi, je suis en retard.** | Hello. Excuse me, I'm late. | The same arrival on a day that went wrong. | MODEL | new |
| 15 | **Merci, à bientôt.** | Thank you, see you soon. | Closing when you know you are coming back. | MODEL | new |
| 16 | **Merci beaucoup, au revoir !** | Thank you very much, goodbye! | The warmest of the three closes. | MODEL | L1 seed, recycled |
| 17 | **Merci, au revoir, madame.** | Thank you, goodbye, madam. | The close with the address form added. | MODEL | new |
| 18 | **Bonjour, madame.** | Hello, madam. | How you will be greeted at the door. | READ/LISTEN | L1 seed, recycled |
| 19 | **Au revoir, monsieur.** | Goodbye, sir. | How you will be sent off. | READ/LISTEN | new |
| 20 | **Bonne journée !** | Have a good day! | The close you will hear more than any other. | INTERLOCUTOR | new |
| 21 | **Bonne journée, au revoir !** | Have a good day, goodbye! | The two closes together. | MODEL | new |
| 22 | **À bientôt.** | See you soon. | Heard when you are expected back. | INTERLOCUTOR | new |
| 23 | **Ah, bonjour ! Entrez.** | Ah, hello! Come in. | They recognise you at the door. | INTERLOCUTOR | new |
| 24 | **Vous êtes là ?** | Are you there? | Called through the door before you answer. | INTERLOCUTOR | L2, recycled |
| 25 | **Vous voulez un café ?** | Would you like a coffee? | The offer you will decline. | INTERLOCUTOR | L3, recycled |
| 26 | **Une question ? Bien sûr.** | A question? Of course. | The easy yes when you open your question. | INTERLOCUTOR | new |
| 27 | **Je vous en prie.** | You're welcome. | The formal reply to your thanks. | INTERLOCUTOR | new |
| 28 | **De rien.** | It's nothing. | The everyday reply to your thanks. | INTERLOCUTOR | new |
| 29 | **Asseyez-vous.** | Have a seat. | Heard as you are shown in. | INTERLOCUTOR | L2, recycled |
| 30 | **Je ne comprends pas. Vous pouvez répéter ?** | I don't understand. Can you say that again? | The recovery, in a room where people talk fast. | SUPPORTED | L1 seed, recycled |
| 31 | **Excusez-moi, je ne comprends pas.** | Excuse me, I don't understand. | Interrupting to say you're lost. | SUPPORTED | L1 seed, recycled |
| 32 | **Voilà.** | There we go. | Heard as something is handed to you. | INTERLOCUTOR | L1 seed, recycled |

**Chunks — L6**

| French chunk | English | Use | Role |
|---|---|---|---|
| au revoir | goodbye | Closes the arc that bonjour opened. | recycled |
| bonne journée | have a good day | The close you will hear most often. | recognition-only |
| à bientôt | see you soon | Heard when you are expected back. | recognition-only |
| je vous en prie | you're welcome | The formal reply to thanks. | recognition-only |
| de rien | it's nothing | The everyday reply to thanks. | recognition-only |
| bonjour | hello | Opening the moment. | recycled |
| je suis | I am | Placing yourself inside it. | recycled |
| j'ai | I have | Opening your reason for being there. | recycled |
| une question | a question | The reason itself. | recycled |
| merci | thank you | Closing it. | recycled |
| non merci | no thanks | Declining the coffee on the way through. | recycled |
| excusez-moi | excuse me | Getting attention inside the room. | recycled |

Active-new: none. This is an integration lesson and adds no new active chunk.

---

### L7 — 30 surfaces, 12 chunks, 1 active-new

*Say where you are heading, and leave well.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Je vais à la maison.** | I'm going home. | The evening is winding down. | PRODUCE | shipped L7 |
| 2 | **Je vais au café.** | I'm going to the café. | Midday, and someone asks where you're off to. | PRODUCE | new |
| 3 | **Je vais à la maison. Au revoir.** | I'm going home. Goodbye. | Saying where you're going, then leaving. | PRODUCE | shipped L7 |
| 4 | **Je vais à la maison, au revoir.** | I'm going home, goodbye. | The same two moves run together in one breath. | ACCEPTED ALTERNATIVE | shipped L7 |
| 5 | **Merci. Je vais à la maison. Au revoir.** | Thank you. I'm going home. Goodbye. | The gathering is ending and you take your leave. | PRODUCE | shipped L7 |
| 6 | **à la maison** | home | The destination, learned whole. | SUPPORTED | shipped L7 |
| 7 | **au café** | to the café | A second destination, learned the same way. | SUPPORTED | new |
| 8 | **Je vais au restaurant.** | I'm going to the restaurant. | A third destination, heard only. | READ/LISTEN | new |
| 9 | **Je ne vais pas à la maison.** | I'm not going home. | The wrap you own, on the new engine. | MODEL | new |
| 10 | **Je suis à la maison.** | I'm at home. | Shown beside Je vais à la maison: being there, not heading there. | CONTRAST | new |
| 11 | **J'y vais.** | I'm off. | The shortest way to say you're leaving; heard only. | READ/LISTEN | new |
| 12 | **On y va.** | Let's go. | Said by someone else as the group moves. | INTERLOCUTOR | new |
| 13 | **Vous allez où ?** | Where are you going? | The question your sentence answers. | INTERLOCUTOR | new |
| 14 | **Vous allez à la maison ?** | Are you going home? | The same question, guessing the answer. | INTERLOCUTOR | new |
| 15 | **Vous partez ?** | Are you leaving? | Noticed as you pick up your coat. | INTERLOCUTOR | new |
| 16 | **Déjà ?** | Already? | The mild surprise that follows. | INTERLOCUTOR | new |
| 17 | **Vous venez ?** | Are you coming? | Someone heading out asks you along. | INTERLOCUTOR | new |
| 18 | **Bonne soirée !** | Have a good evening! | The evening version of the goodbye you know. | INTERLOCUTOR | new |
| 19 | **Bonne journée !** | Have a good day! | The daytime version. | INTERLOCUTOR | L6, recycled |
| 20 | **Bonne route !** | Safe trip! | Heard when you say you're heading home. | INTERLOCUTOR | new |
| 21 | **À demain.** | See you tomorrow. | Said when you'll be back the next day. | INTERLOCUTOR | new |
| 22 | **À bientôt.** | See you soon. | Said when the next time is vaguer. | INTERLOCUTOR | L6, recycled |
| 23 | **Au revoir, à demain !** | Goodbye, see you tomorrow! | One natural way to close a working day. | MODEL | new |
| 24 | **Merci beaucoup. Au revoir.** | Thank you very much. Goodbye. | The warmer close you already know. | MODEL | L6, recycled |
| 25 | **Non merci, je vais à la maison.** | No thanks, I'm going home. | Turning down one last coffee. | MODEL | new |
| 26 | **Excusez-moi, je vais à la maison.** | Excuse me, I'm going home. | Leaving a conversation that is still going. | MODEL | new |
| 27 | **Je suis fatigué. Je vais à la maison.** | I'm tired. I'm going home. | The reason, then the move. | MODEL | new |
| 28 | **Je vais faire une pause.** | I'm going to take a break. | Heard now; you will say it yourself next lesson. | READ/LISTEN | preview of L9 |
| 29 | **Je ne comprends pas.** | I don't understand. | Still there when the goodbyes come fast. | SUPPORTED | L1 seed, recycled |
| 30 | **Au revoir.** | Goodbye. | On its own, at the door. | PRODUCE | L1 seed, recycled |

**Chunks — L7**

| French chunk | English | Use | Role |
|---|---|---|---|
| je vais | I'm going | Says where you are heading. | **active-new** |
| à la maison | home | A destination, learned whole. | supported |
| au café | to the café | A second destination, learned the same way. | supported |
| je ne vais pas | I'm not going | The wrap on the new shape; shown, not required. | recognition-only |
| j'y vais | I'm off | The shortest way to announce leaving; heard only. | recognition-only |
| on y va | let's go | Said by the group; heard only. | recognition-only |
| vous allez | you are going | The question pointed at you; heard only. | recognition-only |
| bonne soirée | have a good evening | The evening close. | recognition-only |
| à demain | see you tomorrow | Said when you'll be back. | recognition-only |
| bonne route | safe trip | Heard when you say you're heading home. | recognition-only |
| au revoir | goodbye | Closing the door behind you. | recycled |
| merci | thank you | Thanking the moment before you go. | recycled |

Active-new: `je vais` — 1 of a maximum 4.

---

### L8 — 30 surfaces, 14 chunks, 1 active-new

*Ask where something is, and answer from either side.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **C'est où ?** | Where is it? | You're looking for a room and can't see it. | PRODUCE | shipped L8 |
| 2 | **C'est ici.** | It's here. | Now you're the one who knows. | PRODUCE | shipped L8 |
| 3 | **C'est là.** | It's there. | The same answer, pointing a little further. | PRODUCE | new |
| 4 | **Le café, c'est où ?** | The café, where is it? | Naming the thing first, then asking. | PRODUCE | shipped L8 example, produced here |
| 5 | **Ce n'est pas ici.** | It's not here. | Answering a where-question honestly. | PRODUCE | L3, recycled |
| 6 | **Bonjour, c'est où ?** | Hello, where is it? | Opening politely before you ask. | PRODUCE | shipped L8 |
| 7 | **Excusez-moi, c'est où ?** | Excuse me, where is it? | Stopping a stranger in a corridor. | PRODUCE | new |
| 8 | **où** | where | The one word that turns a statement into a question. | SUPPORTED | shipped L8 |
| 9 | **c'est** | it is / this is | The frame that carries both the question and the answer. | SUPPORTED | shipped L8 |
| 10 | **Excusez-moi, le café c'est où, s'il vous plaît ?** | Excuse me, where's the café, please? | The full polite version of the ask. | MODEL | new |
| 11 | **La maison, c'est où ?** | The house, where is it? | The same pattern with a different place. | READ/LISTEN | new |
| 12 | **Les toilettes, c'est où ?** | Where are the toilets? | The question you will need first, heard here. | READ/LISTEN | new |
| 13 | **Où est le café ?** | Where is the café? | Shown as a contrast: the fuller, more written way to ask. | CONTRAST | new |
| 14 | **Oui, c'est ici.** | Yes, it's here. | Confirming when someone asks you. | PRODUCE | new |
| 15 | **Non, ce n'est pas ici.** | No, it's not here. | The other half of the same answer. | MODEL | L3, recycled |
| 16 | **C'est là-bas.** | It's over there. | The answer you will get most often. | INTERLOCUTOR | new |
| 17 | **C'est par là.** | It's that way. | The same answer, with a gesture. | INTERLOCUTOR | new |
| 18 | **Par ici.** | This way. | Someone walks you towards it. | INTERLOCUTOR | L2, recycled |
| 19 | **À droite.** | On the right. | Part of the answer you must be able to follow. | INTERLOCUTOR | new |
| 20 | **À gauche.** | On the left. | Its opposite. | INTERLOCUTOR | new |
| 21 | **Tout droit.** | Straight ahead. | The third direction you will hear. | INTERLOCUTOR | new |
| 22 | **C'est au fond.** | It's at the back. | Heard inside a building. | INTERLOCUTOR | new |
| 23 | **Vous cherchez quelque chose ?** | Are you looking for something? | Someone notices you standing lost. | INTERLOCUTOR | new |
| 24 | **Je peux vous aider ?** | Can I help you? | The same offer, more directly. | INTERLOCUTOR | new |
| 25 | **Vous êtes où ?** | Where are you? | Asked on the phone when you can't be found. | INTERLOCUTOR | new |
| 26 | **Je ne sais pas.** | I don't know. | The honest answer you will sometimes get. | INTERLOCUTOR | new |
| 27 | **Je ne comprends pas. Vous pouvez répéter ?** | I don't understand. Can you say that again? | Directions come fast; this is the way out. | SUPPORTED | L1 seed, recycled |
| 28 | **Excusez-moi, je ne comprends pas.** | Excuse me, I don't understand. | Stopping the directions politely. | SUPPORTED | L1 seed, recycled |
| 29 | **Merci beaucoup !** | Thank you very much! | Once you have been pointed the right way. | MODEL | L1 seed, recycled |
| 30 | **C'est où, s'il vous plaît ?** | Where is it, please? | The softened version of the bare question. | ACCEPTED ALTERNATIVE | new |

**Chunks — L8**

| French chunk | English | Use | Role |
|---|---|---|---|
| c'est où | where is it | The whole question, taken as one piece. | **active-new** |
| où | where | The one word that asks. | supported |
| c'est | it is / this is | Carries both the question and the answer. | supported |
| le café | the café | Naming the place you are asking about. | supported |
| là-bas | over there | The answer you will hear most. | recognition-only |
| par là | that way | The same answer, with a gesture. | recognition-only |
| à droite | on the right | Part of any direction. | recognition-only |
| à gauche | on the left | Its opposite. | recognition-only |
| tout droit | straight ahead | The third direction. | recognition-only |
| au fond | at the back | Heard inside a building. | recognition-only |
| je ne sais pas | I don't know | The honest answer you will sometimes get. | recognition-only |
| je peux vous aider ? | can I help you? | The offer of help; heard only. | recognition-only |
| ici | here | Now the answer rather than the place. | recycled |
| ce n'est pas | it is not | Answering where in the negative. | recycled |

Active-new: `c'est où` — 1 of a maximum 4.

---

### L9 — 30 surfaces, 12 chunks, 1 active-new

*Ask for a break — and see one engine ask while another announces.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Je voudrais faire une pause.** | I'd like to take a break. | The afternoon has been long. | PRODUCE | shipped L9 |
| 2 | **Je voudrais faire une pause, s'il vous plaît.** | I'd like to take a break, please. | The same ask, softened. | PRODUCE | shipped L9 |
| 3 | **Je voudrais une pause.** | I'd like a break. | Asking for the break itself rather than the act. | ACCEPTED ALTERNATIVE | shipped L9 reveal |
| 4 | **Excusez-moi, je voudrais faire une pause.** | Excuse me, I'd like to take a break. | The others are mid-conversation and you need to stop. | PRODUCE | new |
| 5 | **Je vais faire une pause.** | I'm going to take a break. | Telling them rather than asking them. | PRODUCE | new |
| 6 | **faire une pause** | to take a break | The action, learned as one piece. | SUPPORTED | shipped L9 |
| 7 | **une pause** | a break | The thing itself, beside the action. | SUPPORTED | shipped L9 |
| 8 | **Je voudrais un café.** | I'd like a coffee. | Shown beside the break: one engine, a thing and an action. | PRODUCE | L1/L5, recycled |
| 9 | **Je ne veux pas faire une pause.** | I don't want to take a break. | The refusal, shown rather than asked for. | READ/LISTEN | new |
| 10 | **On fait une pause ?** | Shall we take a break? | Suggesting it to the group; heard here. | READ/LISTEN | new |
| 11 | **On fait une pause.** | We're taking a break. | The decision, once it's made. | INTERLOCUTOR | new |
| 12 | **Je suis fatigué. Je voudrais faire une pause.** | I'm tired. I'd like to take a break. | The reason, then the ask. | MODEL | new |
| 13 | **J'ai soif. Je voudrais un café, s'il vous plaît.** | I'm thirsty. I'd like a coffee, please. | A state, and the request it leads to. | MODEL | L4, recycled |
| 14 | **Je voudrais faire une pause maintenant.** | I'd like to take a break now. | One natural way to say when. | MODEL | new |
| 15 | **Je voudrais faire une pause. Merci.** | I'd like to take a break. Thank you. | The ask, closed politely. | MODEL | new |
| 16 | **Vous voulez faire une pause ?** | Would you like to take a break? | Someone offers before you have to ask. | INTERLOCUTOR | new |
| 17 | **Vous êtes fatigué ?** | Are you tired? | They notice before you say anything. | INTERLOCUTOR | new |
| 18 | **Vous avez soif ?** | Are you thirsty? | The other thing they might notice. | INTERLOCUTOR | L4, recycled |
| 19 | **Un café ?** | Coffee? | The offer that usually follows. | INTERLOCUTOR | L1/L3, recycled |
| 20 | **Cinq minutes ?** | Five minutes? | How long the break is going to be. | INTERLOCUTOR | new |
| 21 | **Bonne idée !** | Good idea! | The warm agreement to your suggestion. | INTERLOCUTOR | new |
| 22 | **D'accord.** | All right. | The plain agreement. | INTERLOCUTOR | L3, recycled |
| 23 | **Pas de problème.** | No problem. | The easy yes. | INTERLOCUTOR | L3, recycled |
| 24 | **Après la pause.** | After the break. | Heard as things are rescheduled. | INTERLOCUTOR | new |
| 25 | **Ça va ?** | Are you all right? | Asked when you look like you need to stop. | INTERLOCUTOR | new |
| 26 | **Ça va, merci.** | I'm fine, thank you. | One natural way to answer it. | MODEL | new |
| 27 | **Non merci, ça va.** | No thanks, I'm fine. | Turning down the break itself. | MODEL | L3, recycled |
| 28 | **Oui, merci.** | Yes, thank you. | Accepting the offer of a break. | PRODUCE | L3, recycled |
| 29 | **Je ne comprends pas.** | I don't understand. | Still there when the plan changes fast. | SUPPORTED | L1 seed, recycled |
| 30 | **Vous pouvez répéter ?** | Can you say that again? | The repeat request. | SUPPORTED | L1 seed, recycled |

**Chunks — L9**

| French chunk | English | Use | Role |
|---|---|---|---|
| faire une pause | to take a break | An action, carried by je voudrais. | **active-new** |
| une pause | a break | The thing itself, beside the action. | supported |
| maintenant | now | Says when. | recognition-only |
| on fait une pause ? | shall we take a break? | Suggesting it to the group; heard only. | recognition-only |
| je ne veux pas | I don't want to | Refusing the break; shown, not required. | recognition-only |
| cinq minutes | five minutes | How long the break will be. | recognition-only |
| bonne idée | good idea | The warm agreement. | recognition-only |
| ça va ? | are you all right? | Asked when you look like you need to stop. | recognition-only |
| je voudrais | I would like | Now carrying an action, not just a thing. | recycled |
| je vais | I'm going | Announcing the break instead of asking. | recycled |
| s'il vous plaît | please | Still softening the ask. | recycled |
| soif | thirst | The state that leads to the request. | recycled |

Active-new: `faire une pause` — 1 of a maximum 4.

---

### L10 — 33 surfaces, 16 chunks, 0 active-new

*Live a whole small day in French, including the part where you do not understand.*

| # | Exact French | English | Situation | Treatment | Origin |
|---|---|---|---|---|---|
| 1 | **Bonjour. C'est où ?** | Hello. Where is it? | Morning, first time in the building. | PRODUCE | shipped L10 |
| 2 | **Bonjour, c'est où ?** | Hello, where is it? | The same opening run as one turn. | ACCEPTED ALTERNATIVE | shipped L10 |
| 3 | **Excusez-moi, le café c'est où ?** | Excuse me, where's the café? | Looking for somewhere to sit at midday. | MODEL | L8, recycled |
| 4 | **Excusez-moi, je ne comprends pas. Vous pouvez répéter ?** | Excuse me, I don't understand. Can you say that again? | They answered fast and you caught almost none of it. | PRODUCE | new |
| 5 | **Je ne comprends pas. Vous pouvez répéter ?** | I don't understand. Can you say that again? | The same recovery without the opener. | ACCEPTED ALTERNATIVE | L1 seed, recycled |
| 6 | **Bonjour. Je suis ici.** | Hello. I'm here. | Arriving where you are expected. | PRODUCE | L2/L6, recycled |
| 7 | **Bonjour, je suis en retard.** | Hello, I'm late. | The morning did not go to plan. | PRODUCE | L2, recycled |
| 8 | **J'ai une question.** | I have a question. | The thing you came to ask. | PRODUCE | L4/L5, recycled |
| 9 | **Je voudrais faire une pause.** | I'd like to take a break. | Midday, and you've been on your feet. | PRODUCE | L9, recycled |
| 10 | **Je suis fatigué. Je voudrais faire une pause.** | I'm tired. I'd like to take a break. | The reason and the ask together (man speaking). | MODEL | L9, recycled |
| 11 | **Je suis fatiguée. Je voudrais faire une pause.** | I'm tired. I'd like to take a break. | The same, when a woman says it. | MODEL | new |
| 12 | **J'ai soif. Je voudrais un thé, s'il vous plaît.** | I'm thirsty. I'd like a tea, please. | The break, and what you do with it. | MODEL | new |
| 13 | **Je voudrais un café, s'il vous plaît.** | I'd like a coffee, please. | The order you have had since the first lesson. | PRODUCE | L1 seed, recycled |
| 14 | **C'est ici.** | It's here. | Now you can answer the question you asked this morning. | PRODUCE | L8, recycled |
| 15 | **Non, ce n'est pas ici.** | No, it's not here. | The other answer, just as useful. | PRODUCE | L3/L8, recycled |
| 16 | **Merci. Je vais à la maison. Au revoir.** | Thank you. I'm going home. Goodbye. | The end of your first full day. | PRODUCE | L7, recycled |
| 17 | **Je vais à la maison. Au revoir.** | I'm going home. Goodbye. | The same leaving, without the thanks. | ACCEPTED ALTERNATIVE | L7, recycled |
| 18 | **Non merci, je vais à la maison.** | No thanks, I'm going home. | Turning down one last coffee at the door. | MODEL | L7, recycled |
| 19 | **Merci, au revoir.** | Thank you, goodbye. | The shortest complete exit. | PRODUCE | L1 seed, recycled |
| 20 | **Merci beaucoup, au revoir !** | Thank you very much, goodbye! | The warmest exit, back on the last day. | MODEL | L1 seed, recycled |
| 21 | **Au revoir, à demain !** | Goodbye, see you tomorrow! | Because you are coming back. | MODEL | L7, recycled |
| 22 | **Merci pour tout.** | Thanks for everything. | One natural way to close a first day. | MODEL | new |
| 23 | **Excusez-moi.** | Excuse me. | The opener that has worked all day. | SUPPORTED | L1 seed, recycled |
| 24 | **D'accord, merci.** | All right, thank you. | Accepting an answer and closing the beat. | MODEL | new |
| 25 | **Vous pouvez m'aider ?** | Can you help me? | Listen only — this one arrives next lesson. | READ/LISTEN | shipped L10 preview |
| 26 | **Je peux vous aider ?** | Can I help you? | The same shape pointed the other way; heard today. | INTERLOCUTOR | L8, recycled |
| 27 | **Bonjour ! Vous êtes là ?** | Hello! Are you there? | Called down a corridor as you arrive. | INTERLOCUTOR | L2, recycled |
| 28 | **C'est par là.** | It's that way. | The answer to your first question of the day. | INTERLOCUTOR | L8, recycled |
| 29 | **On fait une pause ?** | Shall we take a break? | Someone else suggests it first. | INTERLOCUTOR | L9, recycled |
| 30 | **Bonne journée !** | Have a good day! | Heard as you head out at midday. | INTERLOCUTOR | L6, recycled |
| 31 | **Bonne soirée !** | Have a good evening! | Heard as you leave for the last time. | INTERLOCUTOR | L7, recycled |
| 32 | **À demain !** | See you tomorrow! | The last thing said to you. | INTERLOCUTOR | L7, recycled |
| 33 | **Je vous en prie.** | You're welcome. | The reply to your thanks at the door. | INTERLOCUTOR | L6, recycled |

**Chunks — L10**

| French chunk | English | Use | Role |
|---|---|---|---|
| vous pouvez m'aider ? | can you help me? | Listen only — it arrives next lesson. | recognition-only |
| merci pour tout | thanks for everything | Closing a first day. | recognition-only |
| bonjour | hello | Opening the day. | recycled |
| c'est où | where is it | The first question of the morning. | recycled |
| je suis | I am | Placing yourself when you arrive. | recycled |
| en retard | late | On the morning that went wrong. | recycled |
| j'ai | I have | The question you brought. | recycled |
| soif | thirst | What sends you to the café at midday. | recycled |
| je voudrais | I would like | Asking for the break and the drink. | recycled |
| faire une pause | to take a break | The middle of the day. | recycled |
| je vais | I'm going | The end of it. | recycled |
| à la maison | home | Where you are heading. | recycled |
| au revoir | goodbye | Closing the day as it opened. | recycled |
| je ne comprends pas | I don't understand | The move that rescues the whole day. | survival formula |
| vous pouvez répéter ? | can you say that again? | Its other half. | survival formula |
| excusez-moi | excuse me | The opener that worked all day. | recycled |

Active-new: none. This is an integration lesson and adds no new active chunk.

---

## 1. Executive summary

> **Superseded counting note.** The family counts in this section are the
> INTERNAL planning view and are unchanged from v0.1. The human-QA inventory is
> 305 exact surfaces and 140 chunks — see §0 above.

| Measure | Now | Proposed | Δ |
|---|---:|---:|---:|
| Unique sentence families (all roles) | 54 | 68 | +14 |
| Unique production families | 24 | 41 | +17 |
| Chunks named in sentence families | 29 | 34 | +5 |
| Active-new chunks, summed over the ten lessons | 19 | 14 | — |
| Registry entries that must be authored | — | 7 | — |
| Dormant registered items brought back into use | — | 5 | — |

### Active-new per lesson (the invariant that must not move)

Cap is 4, integrations 0 (Content Bible §5.2 / §6.8).

| | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Now | 5 | 2 | 3 | 3 | 2 | 1 | 1 | 1 | 1 | 0 |
| Proposed | 2 | 1 | 4 | 1 | 2 | 1 | 1 | 1 | 1 | 0 |

**Read L1's 5 carefully.** It is a measurement artifact, not a violation:
this count only looks at L1–L10, so `bonjour`, `je voudrais` and `un café`
register as first-produced in L1 when L0 actually owns their first contact —
which is exactly what `lesson-001.ts`'s own design notes say. Counting L0,
L1's real active-new is `merci` + `s'il vous plaît` = 2, which is what the
proposal carries. **Founder decision D-08**: confirm that L0 is treated as
first contact for those three, so the L1 ledger reads 2 rather than 5.

Every other lesson sits inside the cap in both columns, and the proposal
lowers several by moving cargo from active to supported where the learner is
given the piece on screen.

### Treatment of what ships today

| Verdict | Families | Meaning |
|---|---:|---|
| KEEP | 24 | strong enough to ship as authored |
| REVISE | 13 | same pedagogical job, better French, context or accepted-alternative set |
| REPLACE | 1 | the job stays, the sentence should change |
| ADD | 34 | a communicative need with no current surface at all |
| DROP / DEFER | 0 | nothing is dropped — every current production surface survives |

**41 production families** across ten lessons, against the
30–45 guideline for core production. **68 total families** against the 70–100
guideline for all families — deliberately just under, because the last few
sentences considered were padding and were not written. Two lessons (L7, L10)
are genuinely small, and the document says so rather than inflating them.

**How the baseline is counted.** "Now" counts the shipped build the same way
the proposal counts itself: a sentence family is a full utterance (two tokens
or more), deduped after answer-normalization, so capitalization, punctuation
and apostrophe variants collapse into one. Bare chips and trap tokens (`ici`,
`voudrais`, `suis`) are not families. This is a narrower figure than the 135
surfaces in the QA pack, which counted every learner-visible French string
including single chips — the two documents are measuring different things on
purpose.

### The three things this draft is actually fixing

1. **Six of the ten lessons produce fewer than three distinct sentences.** L2 types one sentence twice. L4, L5, L7, L8 and L9 each type two. A learner who finishes L2 has written `Je suis ici.` and nothing else, which teaches a phrase rather than an engine.
2. **There is no repair move anywhere in L1–L10.** The learner can order, locate, refuse, ask and leave, but cannot say they did not understand. Payload Economy v0 §4.1 already names `je ne comprends pas` and `vous pouvez répéter ?` as a closed survival class, and both are *already registered and dormant*.
3. **Situational variation is carried by one word.** `ici` appears in L2, L3, L6 and L8; `à la maison` is `je vais`'s only destination; `un café` and `une question` are the only two packages. Each engine has roughly one piece of cargo, which is the exact diagnosis Payload Economy v0 §1 recorded.

### Unresolved founder decisions

Seven, listed in full in §4. In one line each:

- **D-01** `un café` vs `café` — the screen piece and the registry item disagree on where the chunk ends.
- **D-02** 12 accepted alternatives accept a missing apostrophe, contradicting the normalizer's stated policy.
- **D-03** one French surface, two English glosses, in seven places.
- **D-04** `fatigué(e)` — the canon wants it; the app does not know the learner's gender.
- **D-05** L6 introduces `au revoir` as active-new, but integration lessons are budgeted at 0.
- **D-06** `C'est où` without the question mark is accepted while the lesson teaches that the rising tone asks.
- **D-07** `le café` — introducing the definite article to make L8's generalization producible.
- **D-08** L1's active-new ledger reads 5 when L0 is excluded from the count and 2 when it is not.
- **D-09** L1 would carry 6 production screens against a canon budget of 3–5.

---

## 2. Lesson-by-lesson plan

### L1 — Survival Kit

**Communicative promise.** Get someone's attention, order politely, thank them — and know one sentence that rescues you when you lose the thread.

Current can-do: *Greet, ask for something politely, and thank.*

| | |
|---|---|
| Sentence families in this lesson | 11 (9 first appear here, 2 recycled in) |
| Core production families | 6 |
| Produced (typed or open task) | 6 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 2 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-sil-vous-plait` (s'il vous plaît), `chunk-merci` (merci) |
| Recycled chunks | `chunk-bonjour`, `chunk-je-voudrais`, `noun-cafe`, `chunk-un-cafe`, `grammar-ne-pas-sandwich`, `chunk-un-croissant` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L01-02 | **Bonjour, je voudrais un café, s'il vous plaît.**<br>*alt:* Bonjour, un café, s'il vous plaît. · Je voudrais un café, s'il vous plaît. | Hello, I would like a coffee, please. | Add the soft close to your order. | vous / stranger-facing | KEEP | Politeness is the lesson's real content. The current natural alternative 'Bonjour, un café s'il vous plaît.' is missing its comma; folded in here as a properly punctuated alternative. |
| C-L01-01 | **Bonjour, je voudrais un café.** | Hello, I would like a coffee. | You step up to the counter and order simply. | vous / stranger-facing | KEEP | The founding polite request. Recycled from L0 straight into production; the frame carries every later ask. No natural alternative is offered: dropping je voudrais without adding s'il vous plaît lands brusque, and that variant belongs to C-L01-02. |
| C-L01-05 | **Excusez-moi, je voudrais un café, s'il vous plaît.**<br>*alt:* Excusez-moi. Je voudrais un café, s'il vous plaît. | Excuse me, I would like a coffee, please. | The person behind the counter is turned away, busy with the machine. | vous / stranger-facing | ADD | The missing first move. Every real counter exchange starts by getting attention, and the lesson currently assumes the server is already looking at you. Uses the DORMANT registered item chunk-excusez-moi (no new registry entry). Payload Economy v0 §6 names excusez-moi as L1 supported cargo. |
| C-L01-04 | **Je voudrais un thé, s'il vous plaît.**<br>*alt:* Un thé, s'il vous plaît. | I would like a tea, please. | The server looks over. This time it's a tea. | vous / stranger-facing | KEEP | Registered Supported sentence. Proves the frame carries a second drink; the tea package stays supported so no independent claim is manufactured. |
| C-L01-03 | **Merci.**<br>*alt:* Merci ! · Merci beaucoup. | Thank you. | The server sets it down and waits a moment. | vous / neutral | KEEP | Registered pilot sentence; the one unscaffolded first production in L1. 'Merci beaucoup.' added as a natural alternative the learner will hear constantly. |
| C-L01-11 | **Bonjour, je voudrais un café, s'il vous plaît. Merci !**<br>*alt:* Bonjour, un café, s'il vous plaît. Merci ! | Hello, I would like a coffee, please. Thank you! | The counter is quiet, and the person behind it turns to you. | vous / stranger-facing | KEEP | L1's target performance and the only place the five survival pieces run together. Keep, including its shorter casual alternative. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L01-06 | **Un café, s'il vous plaît.**<br>*alt:* Un thé, s'il vous plaît. | A coffee, please. | Reveal beside the fuller order: how a regular actually says it. | vous / stranger-facing | REVISE | Currently only exists inside a longer alternative and is missing the comma before s'il vous plaît. Stands better on its own as the casual register model. |

**Contrast / trap families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L01-10 | **Je veux un café.** | I want a coffee. | Trap option: it works, but it lands blunt with a stranger. | vous / stranger-facing | KEEP | Register taught as register, not error. Correctly tagged wrong_register, never wrong grammar. Must never become a chip or an accepted answer. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L01-07 | **Bonjour madame.**<br>*alt:* Bonjour monsieur. | Hello (to a woman). | Culture note: in a French shop, bonjour rarely travels alone. | vous / stranger-facing | ADD | Payload Economy v0 §6 lists madame / monsieur as L1 ghosts. Entering a French shop without one reads as brusque; the learner should recognise it long before producing it. Ghost only: never a required answer, never in piecesUsed. |
| C-L03-05 | **Je ne comprends pas.** | I don't understand. | Insight example: the one sentence that rescues any exchange. | vous / neutral | ADD | Repair is the largest functional hole in L1-L10: a learner can order but cannot recover. Shown as a ghost in L1 (Payload Economy v0 §4.1 wants repair reachable from L1), owned in L3 where ne...pas is actually taught. Uses the DORMANT registered chunk-je-ne-comprends-pas. |
| C-L05-04 | **Je voudrais un croissant, s'il vous plaît.**<br>*alt:* Un croissant, s'il vous plaît. | I would like a croissant, please. | Insight example: the same frame, a different thing. | vous / stranger-facing | ADD | Payload Economy v0 §6 lists un croissant as an L1 ghost and L5 cargo. Shown once in L1 so its L5 production is a return, not a first meeting. |

**Reuse into later lessons.** C-L01-02 → L5, L9, L10 · C-L01-01 → L5, L9 · C-L01-05 → L4, L6, L8, L9, L10 · C-L01-04 → L5 · C-L01-03 → L3, L6, L7, L9, L10 · C-L01-06 → L5 · C-L03-05 → L9, L10

**Estimated production load.** 6 produced families across 6 distinct scenes; 2 active-new + 6 recycled chunks in play.

**Not padded.** L1 would run 6 produced families, one above the Lesson Flow Canon §1.1 target of 3–5. That is a real budget breach, not a rounding note: see founder decision D-09. The proposal does NOT pick which one to cut — C-L01-01 (the unsoftened café order) and C-L01-05 (the attention-getting order) are the two candidates, and choosing between them is a pedagogical call about whether the learner should meet politeness or attention first.

---

### L2 — Être

**Communicative promise.** Put yourself somewhere, and say what state you are in, with one engine.

Current can-do: *Say where you are, in French.*

| | |
|---|---|
| Sentence families in this lesson | 9 (9 first appear here, 0 recycled in) |
| Core production families | 4 |
| Produced (typed or open task) | 4 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-je-suis` (je suis) |
| Recycled chunks | `chunk-bonjour`, `chunk-en-retard`, `chunk-je-voudrais`, `chunk-je-vais`, `chunk-excusez-moi`, `chunk-merci`, `chunk-fatigue`, `chunk-tu-es-pret`, `chunk-vous-etes-pret` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-02 | **Bonjour, je suis ici.**<br>*alt:* Bonjour. Je suis ici. | Hello, I am here. | You step into a small room. People look up. | vous / neutral | REVISE | Currently only met and modelled in L2, then typed for the first time in L6 — four lessons after the learner could write it. Move first production to L2 and let L6 recycle it in a model. This also removes the L2/L6 duplicate flagged as C2 in the QA pack. |
| C-L02-03 | **Je suis en retard.** | I'm late. | You arrive after the others have started. | vous / neutral | ADD | L2 currently produces ONE sentence, twice. The engine needs a second job or it reads as a memorised phrase, not a shape. en retard is high-frequency, arrives with no new grammar, and — unlike fatigué(e) — carries NO gender agreement, so it is safe in an app that does not know the learner's gender. Needs one new registry entry (planned, not created). |
| C-L02-01 | **Je suis ici.** | I am here. | Someone called your name. Let them know you've arrived. | vous / neutral | KEEP | The first engine. Keep exactly as is. |
| C-L02-04 | **Excusez-moi, je suis en retard.** | Excuse me, I'm late. | You slip into a room where something has already started. | vous / stranger-facing | ADD | First recombination of two lessons' material into one social move. Gives L2's open task something to do beyond repeating je suis ici. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-09 | **Bonjour. Je suis ici. Merci.** | Hello. I'm here. Thank you. | Open-task model: the whole arrival in three owned pieces. | vous / neutral | ADD | L2's open task currently models the same sentence the weaves already produced. A three-beat model shows recombination without asking for anything new. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-05 | **Je suis fatigué.**<br>*alt:* Je suis fatiguée. (feminine form) | I'm tired. | Insight example: the engine names states, not only places. | vous / neutral | ADD | Named by Payload Economy v0 §6 (L2 supported) and by the L10 syllabus spec's can-do ('say I'm tired'). Proposed as RECOGNITION here rather than production, because the app has no learner gender and would have to pick one form for the learner to type. Founder decision D-04 required. |
| C-L02-06 | **Je suis prêt.**<br>*alt:* Je suis prête. (feminine form) | I'm ready. | Insight example beside je suis ici. | vous / neutral | KEEP | Already on screen as an insight example. Keep as recognition; the same gender caveat as fatigué applies, which is exactly why neither is a production target. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-07 | **Je suis là.** | I'm here / I'm there. | Ghost beside ici: French answers the door with là as often as ici. | vous / neutral | ADD | Payload Economy v0 §6 lists là as the L2 ghost. ici carries L2, L3, L6 and L8 almost alone; hearing là once stops ici from being memorised as 'the French word for here'. |
| C-L02-08 | **Vous êtes prêt ?** | Are you ready? | Ghost: the same shape pointed at someone else. | vous / stranger-facing | ADD | Uses a dormant registered item at zero registry cost. The learner hears that French has a second person long before any conjugation lesson, which stops je suis reading as 'the verb'. |

**Reuse into later lessons.** C-L02-02 → L6 · C-L02-03 → L6, L10 · C-L02-01 → L3, L4, L6, L8, L10 · C-L02-04 → L6, L10 · C-L02-09 → L6 · C-L02-05 → L10 · C-L02-07 → L8

**Estimated production load.** 4 produced families across 4 distinct scenes; 1 active-new + 9 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 4 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L3 — Non

**Communicative promise.** Answer no, refuse politely, say what is not so — and say you did not understand.

Current can-do: *Say no, and say what is not true.*

| | |
|---|---|
| Sentence families in this lesson | 10 (10 first appear here, 0 recycled in) |
| Core production families | 5 |
| Produced (typed or open task) | 5 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 4 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-ce-n-est-pas` (ce n'est pas), `chunk-je-ne-suis-pas` (je ne suis pas), `chunk-non` (non), `chunk-oui` (oui) |
| Recycled chunks | `grammar-ne-pas-sandwich`, `chunk-je-suis`, `chunk-merci` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L03-02 | **Ce n'est pas ici.** | It is not here. | Someone points to the wrong place. | vous / neutral | REVISE | Sentence kept. Its accepted alternatives must go: 'Ce n est pas ici' and 'Ce n est pas ici.' accept a MISSING apostrophe, which contradicts normalizeAnswer.ts ('a missing apostrophe is NOT silently accepted as correct') on the very frame where the elision is the teaching point. Founder decision D-02. |
| C-L03-05 | **Je ne comprends pas.** | I don't understand. | They answered quickly and you caught none of it. | vous / neutral | ADD | Repair is the biggest functional hole across L1-L10 and it belongs here: it IS the ne...pas sandwich the lesson teaches, so it costs no new grammar and pays the lesson's own rule back immediately. Uses a dormant registered item — no new registry entry. |
| C-L03-01 | **Je ne suis pas ici.** | I am not here. | Someone is looking for you in the wrong room. | vous / neutral | KEEP | The negation frame, taught whole. Keep. |
| C-L03-04 | **Non merci.**<br>*alt:* Non, merci. | No thank you. | Someone offers you something you don't want. | vous / stranger-facing | REVISE | The single most useful sentence in the lesson is currently only ever tapped, never written. A learner who has only chosen it from three options has not produced a refusal. Promote to typed production. Note the surface appears in four punctuations across the pack ('non merci', 'Non merci.', 'Non, merci.', 'Non merci') — one preferred form plus one alternative, not four. |
| C-L03-03 | **Non, je ne suis pas ici.** | No, I am not here. | Answer first, then say where you are not. | vous / neutral | KEEP | Answer-plus-sentence is how a real refusal sounds. Keep. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L03-10 | **Je ne suis pas en retard.** | I'm not late. | Model: the frame turns any je suis sentence around. | vous / neutral | ADD | Every negation the lesson shows ends in 'ici'. One model on a different complement proves the frame is a shape rather than a phrase, and pays back L2's new cargo immediately. |
| C-L03-08 | **Oui, je suis ici.** | Yes, I am here. | Model beside the negative answer: both sides of the same call. | vous / neutral | ADD | L3 shows three ways to say no and no way to say yes in a sentence. One positive model stops the lesson reading as a negation drill. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L03-07 | **Oui.**<br>*alt:* Oui, c'est ça. | Yes. | The fastest answer in French, beside its opposite. | vous / neutral | KEEP | Payload Economy v0 §4.2 rehabilitates oui as a producible answer word. Kept as recognition inside L1-L10 because no current or proposed scene needs a bare yes as a written answer; the alternative 'Oui, c'est ça.' is listed for the reviewer but not produced. |
| C-L03-06 | **Vous pouvez répéter ?** | Can you say that again? | The other half of the repair pair, shown beside it. | vous / stranger-facing | ADD | Repair is a pair: saying you did not understand without being able to ask for a repeat leaves the learner stuck. Recognition in L3, produced in L10's integration. Dormant registered item — no new registry entry. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L03-09 | **Pas de problème.** | No problem. | Ghost: what you will hear back after a refusal. | vous / neutral | ADD | Payload Economy v0 §6 lists pas de problème as the L3 ghost. The learner refuses things in this lesson and never hears the reply; one exposure closes the exchange. |

**Reuse into later lessons.** C-L03-02 → L8 · C-L03-05 → L9, L10 · C-L03-01 → L6 · C-L03-04 → L6 · C-L03-07 → L8 · C-L03-06 → L9, L10

**Estimated production load.** 5 produced families across 5 distinct scenes; 4 active-new + 3 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 5 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L4 — J'ai

**Communicative promise.** Say what you feel and what you have, with the second engine.

Current can-do: *Say how you feel and what you have.*

| | |
|---|---|
| Sentence families in this lesson | 8 (6 first appear here, 2 recycled in) |
| Core production families | 5 |
| Produced (typed or open task) | 5 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-j-ai` (j'ai) |
| Recycled chunks | `chunk-bonjour`, `noun-soif`, `noun-idee`, `chunk-excusez-moi`, `chunk-une-question`, `chunk-je-suis`, `chunk-fatigue` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L04-02 | **Bonjour, j'ai une question.**<br>*alt:* Bonjour. J'ai une question. | Hello, I have a question. | You step up to ask someone something. | vous / stranger-facing | REVISE | Sentence kept; same apostrophe-dropping alternatives must go. Note the pack found this surface glossed as 'question' on L4/s03 and 'a question' on L5 — one gloss, please (founder decision D-03). |
| C-L04-01 | **J'ai faim.** | I'm hungry. | It is past noon and you have not eaten. | vous / neutral | REVISE | Sentence kept. Its accepted alternatives 'J ai faim', 'J ai faim.' and 'j ai faim' must go: they accept a missing apostrophe on the exact elision the lesson exists to teach (insight s04 is about j' itself). Founder decision D-02. |
| C-L04-03 | **J'ai soif.** | I'm thirsty. | A long afternoon, and you have not had anything to drink. | vous / neutral | ADD | faim alone cannot show that avoir-for-states is a pattern; one instance is a phrase, two is a shape. soif takes no article and no gender, costs no grammar, and connects straight to the drinks the learner can already order. Named by Payload Economy v0 §6. Needs one new registry entry (planned, not created). |
| C-L04-04 | **J'ai une idée.** | I have an idea. | Something has stalled and you can see a way through. | vous / neutral | ADD | Gives j'ai a third job — feeling, thing to ask, thing to offer — so the engine reads as general rather than as two memorised lines. Uses the DORMANT registered noun-idee, which Payload Economy v0 §6 explicitly earmarks ('the R4 payoff'). No new registry entry. |
| C-L06-04 | **Excusez-moi, j'ai une question.** | Excuse me, I have a question. | Open task: someone is busy and you need a moment of their time. | vous / stranger-facing | REPLACE | L4's open task currently asks for a sentence the learner has just typed twice. This is the same lesson content in the situation an adult beginner actually meets first. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L05-02 | **J'ai une question.** | I have a question. | Model beside the greeted version. | vous / neutral | KEEP | Met in L4, produced in L5 under the package lesson. Keep as the model; the production home stays L5. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L04-08 | **Je suis fatigué, et j'ai faim.** | I'm tired, and I'm hungry. | Micro-contrast example: French splits these two feelings across two engines. | vous / neutral | ADD | The insight already contrasts je suis and j'ai using ici and faim — a place against a feeling, which is not the real contrast. Two FEELINGS split across the two engines is the point, and it is what actually surprises an English speaker. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L04-07 | **J'ai froid.** | I'm cold. | Insight example: the pattern reaches further than hunger. | vous / neutral | ADD | Payload Economy v0 §6 lists j'ai froid / j'ai chaud as L4 ghosts, examples only. Two more instances make avoir-for-states unmistakable without adding anything the learner must produce. Shown on the same card beside J'ai chaud. — a sibling example, not an alternative wording of this sentence. |

**Reuse into later lessons.** C-L04-02 → L5, L6 · C-L04-01 → L6, L10 · C-L04-03 → L9, L10 · C-L06-04 → L10 · C-L05-02 → L6 · C-L04-08 → L10

**Estimated production load.** 5 produced families across 5 distinct scenes; 1 active-new + 7 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 5 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L5 — Un, une

**Communicative promise.** Ask for and name things with the little word that travels with them.

Current can-do: *Ask for things with the right little word.*

| | |
|---|---|
| Sentence families in this lesson | 7 (6 first appear here, 1 recycled in) |
| Core production families | 4 |
| Produced (typed or open task) | 4 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 2 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-une-question` (une question), `chunk-un-cafe` (un café) |
| Recycled chunks | `chunk-j-ai`, `chunk-je-voudrais`, `chunk-sil-vous-plait`, `chunk-un-croissant`, `chunk-une-table`, `noun-cafe` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L05-02 | **J'ai une question.** | I have a question. | You want to ask something. Use the right little word. | vous / neutral | REVISE | Sentence kept, apostrophe-dropping alternatives removed (D-02). L6 must stop re-producing it: L5 owns the first production, L6 recycles it in a model. Removes the L5/L6 duplicate flagged as C2. |
| C-L05-01 | **Je voudrais un café.** | I would like a coffee. | Order at the counter, with the right little word. | vous / stranger-facing | KEEP | Keep. The lesson's job is the package boundary, and this sentence is where it lands. |
| C-L05-04 | **Je voudrais un croissant, s'il vous plaît.**<br>*alt:* Un croissant, s'il vous plaît. | I would like a croissant, please. | The counter again, and this time you are hungry. | vous / stranger-facing | ADD | A second un package, so the un side is a pattern rather than one word. Ghosted in L1 and produced here, which is the spiral working as designed. Named by Payload Economy v0 §6. Needs one new registry entry (planned). |
| C-L05-03 | **Je voudrais une table, s'il vous plaît.**<br>*alt:* Une table, s'il vous plaît. | I would like a table, please. | You step into a small restaurant at lunchtime. | vous / stranger-facing | ADD | The lesson teaches un versus une with exactly one example of each, and the une example is an abstract noun the learner asks about rather than for. une table is concrete, requestable, and puts the une package inside the same je voudrais frame as un café — which is the comparison the lesson is actually making. Named by Payload Economy v0 §6. Needs one new registry entry (planned). |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L01-06 | **Un café, s'il vous plaît.**<br>*alt:* Un thé, s'il vous plaît. | A coffee, please. | Open-task alternative: the shortest natural order. | vous / stranger-facing | KEEP | Already the natural alternative on the open task and correctly punctuated there. Keep. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L05-05 | **un café** | a coffee | Meet cards and package chips: the noun never travels alone. | neutral (no addressee) | KEEP | Keep the package chips. The alternatives column lists the full package set the lesson should be able to show by the end. The package set the lesson should be able to show by the end — une question, un thé, une table, un croissant — appears alongside on the same chips, as siblings rather than as alternative wordings of un café. |

**Contrast / trap families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L05-06 | **question**<br>*alt:* un question | question (bare, no package) | Trap options: the noun without its little word, and the wrong little word. | neutral (no addressee) | KEEP | Keep. This is the trap that makes D-01 visible to the learner: the package is the unit, the bare noun is not. |

**Reuse into later lessons.** C-L05-02 → L6 · C-L05-01 → L9 · C-L05-05 → L9

**Estimated production load.** 4 produced families across 4 distinct scenes; 2 active-new + 6 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 4 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L6 — Un petit moment

**Communicative promise.** Carry one whole small moment, from the door to goodbye, with nothing new.

Current can-do: *Carry a whole small moment, from greeting to goodbye.*

| | |
|---|---|
| Sentence families in this lesson | 8 (7 first appear here, 1 recycled in) |
| Core production families | 5 |
| Produced (typed or open task) | 5 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-au-revoir` (au revoir) |
| Recycled chunks | `chunk-excusez-moi`, `chunk-j-ai`, `chunk-une-question`, `chunk-merci`, `chunk-non-merci`, `chunk-bonjour`, `chunk-je-suis` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L06-04 | **Excusez-moi, j'ai une question.** | Excuse me, I have a question. | There is one small thing you came to ask, and nobody has looked up. | vous / stranger-facing | REPLACE | Keeps the lesson's communicative job (open your question) while removing the L5/L6 duplicate and adding the move the learner will actually need at a real door. |
| C-L06-02 | **Merci, au revoir.**<br>*alt:* Merci. Au revoir. | Thank you, goodbye. | You are about to leave. Thank them, then close. | vous / stranger-facing | KEEP | The bonjour → au revoir arc closes here. Keep. Note this makes L6 a 1-active-new lesson rather than a 0-active-new integration; founder decision D-05. |
| C-L06-03 | **Non merci. J'ai une question.** | No thank you. I have a question. | Inside, someone offers you a coffee, but you came to ask something. | vous / stranger-facing | ADD | L6 is the integration lesson and currently integrates by re-typing single sentences it already owns. This joins a refusal (L3) to a request (L4/L5) in one move, which is what integration means. No new lexis — Payload Economy v0 §6 requires L6 to add none. |
| C-L06-08 | **Bonjour. Je suis ici. J'ai une question.**<br>*alt:* Bonjour. J'ai une question. | Hello. I'm here. I have a question. | You have just stepped in. Greet them, say you are here, and open your one small question. | vous / stranger-facing | KEEP | The three-beat arrival, one step below the full five-beat moment. Keep both: the shorter one is the rehearsal for the longer. |
| C-L06-05 | **Bonjour. Je suis ici. J'ai une question. Merci. Au revoir.**<br>*alt:* Bonjour. J'ai une question. Merci. Au revoir. · Bonjour. Je suis ici. J'ai une question. Merci, au revoir. | Hello. I'm here. I have a question. Thank you. Goodbye. | You arrive for a small first meeting and carry the whole arc. | vous / stranger-facing | KEEP | The strongest surface in the current ten lessons. Keep exactly, including its answer bands. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-02 | **Bonjour, je suis ici.**<br>*alt:* Bonjour. Je suis ici. | Hello, I am here. | You are at the door. Greet, then say you have arrived. | vous / neutral | REVISE | Demote from typed production to a model. First production moves to L2 (C-L02-02), where the learner already had every piece. Keeps L6 an integration lesson and removes a cross-lesson duplicate. |
| C-L06-06 | **Bonjour. Excusez-moi, je suis en retard.** | Hello. Excuse me, I'm late. | Model: the same arrival, on a day that did not go to plan. | vous / stranger-facing | ADD | The integration lesson runs one scene, one way. A second arrival variant shows the same pieces answering a different day, which is the difference between integration and repetition. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L06-07 | **Bonjour.** | Hello. | Culture card: a French moment opens and closes with a word. | vous / stranger-facing | KEEP | Keep. The arc framing is what makes L6 feel like a moment rather than a review. Shown on the same culture card beside Au revoir. — the two ends of the arc, not two ways of saying one thing. |

**Reuse into later lessons.** C-L06-04 → L10 · C-L06-02 → L7, L10 · C-L06-05 → L10 · C-L06-06 → L10 · C-L06-07 → L7, L10

**Estimated production load.** 5 produced families across 5 distinct scenes; 1 active-new + 7 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 5 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L7 — Je vais

**Communicative promise.** Say where you are heading, and leave well.

Current can-do: *Say you're heading home, and close the moment.*

| | |
|---|---|
| Sentence families in this lesson | 6 (5 first appear here, 1 recycled in) |
| Core production families | 4 |
| Produced (typed or open task) | 4 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-je-vais` (je vais) |
| Recycled chunks | `chunk-au-revoir`, `chunk-a-la-maison`, `chunk-au-cafe`, `chunk-merci`, `grammar-ne-pas-sandwich` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L07-01 | **Je vais à la maison.** | I'm going home. | The evening is winding down. Let them know where you're heading. | vous / neutral | KEEP | The third engine. Keep, including the s08 fill that guards the à la maison boundary. |
| C-L07-02 | **Je vais à la maison. Au revoir.**<br>*alt:* Je vais à la maison, au revoir. | I'm going home. Goodbye. | You're at the door. Close it the way you did before. | vous / neutral | REVISE | Sentence kept and its alternative is genuinely natural. But it is typed again, unchanged, in L10 — the same sentence cannot be new twice. L10 should recycle it inside a longer leave-taking (C-L10-03) rather than re-produce it alone. |
| C-L07-03 | **Je vais au café.** | I'm going to the café. | Midday. Someone asks where you're off to. | vous / neutral | ADD | je vais currently has exactly one destination, so the engine is indistinguishable from the phrase 'je vais à la maison'. A second destination makes it a shape. au café reuses a place the learner has been ordering from since L1, and is taught as a package exactly like à la maison — no à + le rule. Needs one new registry entry (planned). |
| C-L10-03 | **Merci. Je vais à la maison. Au revoir.**<br>*alt:* Je vais à la maison. Au revoir. | Thank you. I'm going home. Goodbye. | The small gathering is ending. People are picking up their coats. | vous / stranger-facing | KEEP | The lesson's target performance and a genuinely three-beat move. Keep. Note L10/s07 currently uses the identical situation and model; L10 should vary the scene (see C-L10-03). |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L07-05 | **Je ne vais pas à la maison.** | I'm not going home. | Model: the negation frame reaches the new engine too. | vous / neutral | ADD | The L7 syllabus spec's can-do includes saying where you are not going. Shown as a model rather than produced, because ne...pas around vais is a composition and the protected-chunk set is deliberately frozen at two frames. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L07-01 | **Je vais à la maison.** | I'm going home. | Culture card: say where you're heading, then close the door with a word. | vous / neutral | KEEP | Keep. It names the pragmatic rule the lesson is really teaching. Shown on the same culture card beside Au revoir. — the second of the two leaving moves, not an alternative to the first. |

**Reuse into later lessons.** C-L07-01 → L10 · C-L07-02 → L10 · C-L07-03 → L10 · C-L07-01 → L10

**Estimated production load.** 4 produced families across 4 distinct scenes; 1 active-new + 5 recycled chunks in play.

**Not padded.** L7 stays the smallest teaching lesson in the set. One engine, two destinations, one leave-taking. A third destination was considered and rejected: it would have been a word, not a new thing to do.

---

### L8 — C'est où ?

**Communicative promise.** Ask where something is, and answer from either side.

Current can-do: *Ask where something is, and answer it's here.*

| | |
|---|---|
| Sentence families in this lesson | 7 (5 first appear here, 2 recycled in) |
| Core production families | 5 |
| Produced (typed or open task) | 5 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-c-est-ou` (c'est où ?) |
| Recycled chunks | `chunk-c-est`, `chunk-ce-n-est-pas`, `chunk-le-cafe`, `chunk-bonjour`, `chunk-oui`, `chunk-non` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L08-02 | **C'est ici.** | It's here. | Now you're the local. Someone asks you C'est où ? | vous / neutral | KEEP | Both sides of one exchange is the right shape for this lesson. Keep. |
| C-L08-01 | **C'est où ?** | Where is it? | You're looking for the room. Someone friendly is standing nearby. | vous / stranger-facing | REVISE | Sentence kept. Its accepted alternatives "C'est où" and "c'est où" both normalize to the same string as each other (case is folded), so one of the two is dead weight; and dropping the question mark is accepted here while the reveal teaches that the rising tone does the asking. Founder decision D-06. |
| C-L03-02 | **Ce n'est pas ici.** | It is not here. | Someone asks you where it is, and you know it isn't this floor. | vous / neutral | ADD | The location exchange currently has one answer: yes, here. A real hallway answer is at least as often 'not here'. Costs no new material — it is L3's protected frame arriving where it is finally useful, which is exactly what recycling should look like. |
| C-L08-03 | **Le café, c'est où ?** | The café, where is it? | You know what you're looking for, and you can name it. | vous / stranger-facing | ADD | This is already on screen twice as an example and never produced, yet it is the whole generalization: name a thing, then ask. Without it the learner leaves L8 able to ask 'where is it?' only when 'it' is already obvious. Introduces le, which the lesson does not otherwise teach — founder decision D-07 (teach le café as a package, or keep this recognition-only). La maison, c'est où ? is the same pattern with a different noun, shown as a sibling example rather than an alternative wording. |
| C-L10-01 | **Bonjour. C'est où ?**<br>*alt:* Bonjour, c'est où ? | Hello. Where is it? | A hallway with three doors, no signs. Someone comes out of one. | vous / stranger-facing | REVISE | Keep the open task, add 'Excusez-moi, c'est où ?' as an alternative. Stopping a stranger in a corridor is the one place where excusez-moi is more natural than bonjour, and the lesson currently offers only the greeting. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L08-06 | **Oui, c'est ici.** | Yes, it's here. | Model pair: both answers to the same question. | vous / neutral | ADD | Pays back L3's oui/non and gives the learner both replies to a question they will be asked as often as they ask it. Shown as a pair with Non, ce n'est pas ici. — the opposite answer, not an alternative wording. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L08-07 | **C'est là.** | It's there. | Ghost beside c'est ici: what a French speaker points with. | vous / neutral | ADD | là was ghosted in L2 and never returns. One reappearance here, in the lesson about locating things, is where it earns its place. |

**Reuse into later lessons.** C-L08-02 → L10 · C-L08-01 → L10

**Estimated production load.** 5 produced families across 5 distinct scenes; 1 active-new + 6 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 5 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L9 — Faire une pause

**Communicative promise.** Ask for a break — and see one engine ask while another announces.

Current can-do: *Ask for a break, politely, in French.*

| | |
|---|---|
| Sentence families in this lesson | 7 (6 first appear here, 1 recycled in) |
| Core production families | 4 |
| Produced (typed or open task) | 4 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 1 — cap 4 (Content Bible §5.2) |
| New chunks | `chunk-faire-une-pause` (faire une pause) |
| Recycled chunks | `chunk-excusez-moi`, `chunk-je-voudrais`, `chunk-je-vais`, `chunk-sil-vous-plait`, `chunk-j-ai`, `noun-cafe`, `chunk-je-ne-comprends-pas`, `chunk-vous-pouvez-repeter` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L09-03 | **Excusez-moi, je voudrais faire une pause.** | Excuse me, I'd like to take a break. | The others are mid-conversation and you need to stop. | vous / stranger-facing | ADD | Asking for a break almost always means interrupting, and the lesson's two current sentences both assume someone is waiting for you to speak. This is the same ask in the situation it actually happens in. |
| C-L09-04 | **Je vais faire une pause.** | I'm going to take a break. | You are not asking permission this time; you are telling them. | vous / neutral | ADD | The lesson's real insight is that je voudrais can carry an action. That only lands if the learner also sees a DIFFERENT engine carry the same action — asking versus announcing. It costs no new lexis, recycles L7, and is the clearest engine-contrast available in the first ten lessons. |
| C-L09-02 | **Je voudrais faire une pause, s'il vous plaît.** | I'd like to take a break, please. | You're working through something together. It's a good moment to ask. | vous / stranger-facing | REVISE | Sentence kept. Its accepted alternative differs from the expected answer by a comma only, which normalization already strips — it accepts nothing new and should go (D-02). |
| C-L09-01 | **Je voudrais faire une pause.**<br>*alt:* Je voudrais une pause. | I'd like to take a break. | The afternoon has been long, and your head is getting heavy. | vous / neutral | REVISE | Sentence kept, and 'Je voudrais une pause.' is a genuinely natural alternative (currently only a reveal note). But L10 re-produces this sentence unchanged; L10 should recycle it inside the day rather than re-teach it. |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L09-05 | **J'ai soif. Je voudrais un café, s'il vous plaît.** | I'm thirsty. I'd like a coffee, please. | Model: a state you can name, and the ask that follows it. | vous / stranger-facing | ADD | The first model in the ten lessons where a feeling causes a request. It is the shape most real exchanges have, and every piece is already owned. |
| C-L09-06 | **Je ne comprends pas. Vous pouvez répéter ?** | I don't understand. Can you say that again? | Model: the repair pair, working together for the first time. | vous / stranger-facing | ADD | Repair owned in L3, paired here, produced in L10. Shown in L9 because this is the first lesson where the learner asks for something and can genuinely be answered with more French than they can follow. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L05-01 | **Je voudrais un café.** | I would like a coffee. | Culture card: the same engine carries a thing or an action. | vous / stranger-facing | KEEP | Keep. It states the lesson's generalization in one line, using two sentences the learner owns. Shown on the same culture card beside Je voudrais faire une pause. — one frame carrying a thing and an action, two examples rather than two wordings. |

**Reuse into later lessons.** C-L09-03 → L10 · C-L09-04 → L10 · C-L09-01 → L10 · C-L09-05 → L10 · C-L09-06 → L10

**Estimated production load.** 4 produced families across 4 distinct scenes; 1 active-new + 8 recycled chunks in play.

**Not padded.** Every family above answers a distinct communicative moment; 4 produced families sit inside the 3–5 canon target, and no sentence exists only to raise a count.

---

### L10 — Une petite journée

**Communicative promise.** Live a whole small day in French, including the part where you do not understand.

Current can-do: *Arrive, ask where, take a break, and leave.*

| | |
|---|---|
| Sentence families in this lesson | 8 (6 first appear here, 2 recycled in) |
| Core production families | 3 |
| Produced (typed or open task) | 3 — Lesson Flow Canon §1.1 target is 3–5 |
| Active-new chunks | 0 — cap 4 (Content Bible §5.2) |
| New chunks | none (integration) |
| Recycled chunks | `chunk-bonjour`, `chunk-c-est-ou`, `chunk-merci`, `chunk-je-vais`, `chunk-a-la-maison`, `chunk-au-revoir`, `chunk-excusez-moi`, `chunk-je-ne-comprends-pas`, `chunk-vous-pouvez-repeter`, `chunk-je-suis`, `chunk-je-voudrais`, `chunk-faire-une-pause`, `chunk-fatigue`, `chunk-non-merci` |

**Core production sentence families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L10-01 | **Bonjour. C'est où ?**<br>*alt:* Bonjour, c'est où ? | Hello. Where is it? | Morning. Your first time in this building. | vous / stranger-facing | REVISE | Keep the sentence. Its accepted alternative 'Bonjour, c'est où' (no question mark) should go for the same reason as D-06, and 'Bonjour, c'est où ?' is a real punctuation variant rather than a different sentence. |
| C-L10-03 | **Merci. Je vais à la maison. Au revoir.**<br>*alt:* Je vais à la maison. Au revoir. | Thank you. I'm going home. Goodbye. | The day at the new place is done. Someone walks you to the door. | vous / stranger-facing | REVISE | L10 currently types 'Je vais à la maison. Au revoir.' (identical to L7) and then models the three-beat version in an open task with the same situation as L7's. Typing the three-beat version once is both harder and less repetitive: the learner produces what L7 only modelled. |
| C-L10-04 | **Excusez-moi, je ne comprends pas. Vous pouvez répéter ?**<br>*alt:* Je ne comprends pas. Vous pouvez répéter ? | Excuse me, I don't understand. Can you say that again? | Someone answers your question quickly, and you catch almost none of it. | vous / stranger-facing | ADD | The single largest gap in L1-L10: the learner can open, ask, order and leave, but cannot recover. A day in French without a repair move is not a day in French. Every piece is a dormant registered item and the L10 syllabus spec's can-do already names it ('recover when I don't understand'). |

**Model / reveal families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L10-06 | **Je suis fatigué. Je voudrais faire une pause.**<br>*alt:* Je suis fatiguée. Je voudrais faire une pause. (feminine form) | I'm tired. I'd like to take a break. | Model: the state, then the ask it justifies. | vous / neutral | ADD | Named directly by the L10 syllabus spec, which calls the recombination chunk je-suis-fatigue + je-voudrais-faire-une-pause a supported combination of owned pieces. Kept as a model rather than a production target so the gender agreement never has to be forced on the learner. |
| C-L09-01 | **Je voudrais faire une pause.**<br>*alt:* Je voudrais une pause. | I'd like to take a break. | Midday. You've been on your feet since you arrived. | vous / neutral | REVISE | Demote to a model inside the day. It is typed unchanged in L9 four screens earlier in the learner's week; re-typing it is repetition, not integration. Its accepted alternative also adds ', s'il vous plaît' while the instruction asks only for the plain break — the alternative is broader than the instruction (C6 in the QA pack). |
| C-L10-08 | **Non merci, je vais à la maison.** | No thank you, I'm going home. | Model: someone offers one more coffee at the end of the day. | vous / stranger-facing | ADD | Joins the refusal from L3 to the departure from L7 in one line. It is the most natural end-of-day sentence available from owned pieces, and L10 currently never uses non merci at all. |

**Recognition families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L02-01 | **Je suis ici.** | I am here. | Insight card: the three engines take turns across one day. | vous / neutral | KEEP | Keep. The clearest statement of what the first ten lessons actually built. Shown on the same insight card beside Je voudrais faire une pause. and Je vais à la maison. — the three engines as siblings, not as alternatives. |

**Ghost / exposure families**

| ID | French | English | Scene | Register | Status | Why |
|---|---|---|---|---|---|---|
| C-L10-07 | **Vous pouvez m'aider ?** | Can you help me? | Preview card: just listen. This one arrives next. | vous / stranger-facing | KEEP | The only intentional forward preview in the ten lessons, and it is correctly labelled as one on the card itself. Keep exactly. |

**Reuse into later lessons.** nothing from this lesson returns later — see §5 checks.

**Estimated production load.** 3 produced families across 3 distinct scenes; 0 active-new + 14 recycled chunks in play.

**Not padded.** L10 carries 3 core production families on purpose: it is an integration lesson with 0 active-new, and its job is to re-situate owned material, not to add. The one addition is the repair move, which is a missing function rather than extra volume.

---

## 3. Cross-lesson spiral

Every chunk the proposal puts on a learner-facing surface, in first-contact order.

| Chunk | French | First contact | First production | Appears in | Active-new in | Note |
|---|---|---|---|---|---|---|
| `chunk-bonjour` | Bonjour | L1 | L1 | L1 L2 L4 L6 L8 L10 | — | — |
| `chunk-je-voudrais` | je voudrais | L1 | L1 | L1 L2 L5 L9 L10 | — | — |
| `chunk-merci` | merci | L1 | L1 | L1 L2 L3 L6 L7 L10 | L1 | — |
| `chunk-sil-vous-plait` | s'il vous plaît | L1 | L1 | L1 L5 L9 | L1 | — |
| `chunk-un-cafe` | un café | L1 | L5 | L1 L5 L9 | L5 | — |
| `chunk-un-croissant` | (to be authored) | L1 | L5 | L1 L5 | — | **new registry entry required** |
| `grammar-ne-pas-sandwich` | ne ... pas wraps the action | L1 | L3 | L1 L3 L7 | — | — |
| `noun-cafe` | café | L1 | L1 | L1 L5 L9 | — | — |
| `chunk-en-retard` | (to be authored) | L2 | L2 | L2 | — | **new registry entry required**; appears in one lesson only |
| `chunk-excusez-moi` | excusez-moi | L2 | L2 | L2 L4 L6 L9 L10 | — | dormant registered item, reactivated |
| `chunk-fatigue` | (to be authored) | L2 | — | L2 L4 L10 | — | **new registry entry required**; never produced — recognition or ghost by design |
| `chunk-je-suis` | je suis | L2 | L2 | L2 L3 L4 L6 L10 | L2 | — |
| `chunk-je-vais` | je vais | L2 | L2 | L2 L7 L9 L10 | L7 | — |
| `chunk-tu-es-pret` | tu es prêt | L2 | — | L2 | — | never produced — recognition or ghost by design; appears in one lesson only |
| `chunk-vous-etes-pret` | vous êtes prêt | L2 | — | L2 | — | dormant registered item, reactivated; never produced — recognition or ghost by design; appears in one lesson only |
| `chunk-ce-n-est-pas` | ce n'est pas | L3 | L3 | L3 L8 | L3 | — |
| `chunk-je-ne-suis-pas` | je ne suis pas | L3 | L3 | L3 | L3 | appears in one lesson only |
| `chunk-non` | non | L3 | L3 | L3 L8 | L3 | — |
| `chunk-oui` | oui | L3 | — | L3 L8 | L3 | never produced — recognition or ghost by design |
| `chunk-j-ai` | j'ai | L4 | L4 | L4 L5 L6 L9 | L4 | — |
| `chunk-une-question` | une question | L4 | L4 | L4 L5 L6 | L5 | — |
| `noun-idee` | idée | L4 | L4 | L4 | — | dormant registered item, reactivated; appears in one lesson only |
| `noun-soif` | (to be authored) | L4 | L4 | L4 | — | **new registry entry required**; appears in one lesson only |
| `chunk-une-table` | (to be authored) | L5 | L5 | L5 | — | **new registry entry required**; appears in one lesson only |
| `chunk-au-revoir` | au revoir | L6 | L6 | L6 L7 L10 | L6 | — |
| `chunk-non-merci` | non merci | L6 | L6 | L6 L10 | — | — |
| `chunk-a-la-maison` | à la maison | L7 | L7 | L7 L10 | — | — |
| `chunk-au-cafe` | (to be authored) | L7 | L7 | L7 | — | **new registry entry required**; appears in one lesson only |
| `chunk-c-est` | c'est | L8 | L8 | L8 | — | appears in one lesson only |
| `chunk-c-est-ou` | c'est où ? | L8 | L8 | L8 L10 | L8 | — |
| `chunk-le-cafe` | (to be authored) | L8 | L8 | L8 | — | **new registry entry required**; appears in one lesson only |
| `chunk-faire-une-pause` | faire une pause | L9 | L9 | L9 L10 | L9 | — |
| `chunk-je-ne-comprends-pas` | je ne comprends pas | L9 | L10 | L9 L10 | — | dormant registered item, reactivated |
| `chunk-vous-pouvez-repeter` | vous pouvez répéter ? | L9 | L10 | L9 L10 | — | dormant registered item, reactivated |

### Integration points

| Lesson | What it integrates | Adds |
|---|---|---|
| L6 | bonjour (L1) + je suis (L2) + non merci (L3) + j'ai une question (L4/L5) + merci (L1) | `au revoir` only — see D-05 |
| L9 | je voudrais (L1) + je vais (L7) carrying the same action | nothing beyond `faire une pause` |
| L10 | all three engines, the repair pair, and the whole day | nothing (0 active-new) |

### Chunks introduced but never produced

| Chunk | French | Where seen | Intended? |
|---|---|---|---|
| `chunk-fatigue` | (to be authored) | L2 L4 L10 | Yes — held at recognition because of D-04 (gender). |
| `chunk-tu-es-pret` | tu es prêt | L2 | Yes — ghost exposure of a second person, no conjugation taught. |
| `chunk-vous-etes-pret` | vous êtes prêt | L2 | Yes — ghost exposure of a second person, no conjugation taught. |
| `chunk-oui` | oui | L3 L8 | Yes — Payload Economy §4.2 makes oui producible, but no L1–L10 scene needs a bare written yes. Recognition here; production belongs to a later lesson. |

### Production families with no later reuse

| ID | Lesson | French | Acceptable? |
|---|---|---|---|
| C-L01-11 | L1 | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L03-03 | L3 | Non, je ne suis pas ici. | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L04-04 | L4 | J'ai une idée. | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L05-03 | L5 | Je voudrais une table, s'il vous plaît. | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L06-03 | L6 | Non merci. J'ai une question. | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L06-08 | L6 | Bonjour. Je suis ici. J'ai une question. | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L08-03 | L8 | Le café, c'est où ? | **Review** — a produced sentence that never returns is practised once and then only reachable through Practice. |
| C-L09-02 | L9 | Je voudrais faire une pause, s'il vous plaît. | Yes — nothing after L10 exists yet to recycle it into. |
| C-L10-04 | L10 | Excusez-moi, je ne comprends pas. Vous pouvez répéter ? | Yes — nothing after L10 exists yet to recycle it into. |

### Lessons leaning on one sentence shape

| Lesson | Shape | Share of its produced families | Verdict |
|---|---|---:|---|
| L1 | `je voudrais` | 5/6 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L2 | `je suis` | 4/4 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L3 | `merci` | 1/5 | balanced |
| L4 | `j'ai` | 5/5 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L5 | `je voudrais` | 3/4 | balanced |
| L6 | `j'ai` | 4/5 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L7 | `je vais` | 4/4 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L8 | `c'est` | 4/5 | **leaning** — acceptable only because the lesson exists to teach that shape |
| L9 | `je voudrais` | 3/4 | balanced |
| L10 | `c'est` | 1/3 | balanced |

---

## 4. Founder decisions

Use **KEEP · REVISE · ADD · DROP/DEFER · OPEN DECISION**. Nothing below is pre-filled.

| ID | Decision | What is actually at stake | Options | Verdict |
|---|---|---|---|---|
| D-01 | `un café` vs `café` (and `une question` vs `question`) | The L1 screen piece says `un café` and binds it to `noun-cafe`, whose registry surface is `café`. Five surfaces disagree with their own registry entry. L5 then teaches the package as the unit. The learner is shown two different chunk boundaries for the same words. | (a) package is the chip everywhere, `noun-cafe` becomes linked-only; (b) bare noun is the chip and L5 teaches the article separately; (c) leave as is and accept the mismatch | |
| D-02 | Apostrophe-dropping accepted alternatives | 12 accepted alternatives across L3–L6 accept `J ai faim`, `Ce n est pas ici`, `J ai une question`. `normalizeAnswer.ts` states the apostrophe stays significant precisely so a missing one is *not* silently accepted — and L4's own insight card teaches the elision. Either the normalizer's policy or the alternatives is wrong. | (a) remove the alternatives, keep the policy; (b) change the policy and fold apostrophes; (c) keep both and accept the contradiction | |
| D-03 | One surface, two English glosses | Seven surfaces are glossed two different ways (`un café` = "coffee" in L1, "a coffee" in L5; `une question` = "question" in L4, "a question" in L5; `C'est ici.` = "It is here." / "It's here."). | (a) one canonical gloss per family, enforced from this CSV; (b) allow lesson-local glosses | |
| D-04 | `fatigué(e)` | Payload Economy §6 and the L10 spec both want "I'm tired". The app does not know the learner's gender, so producing it forces one form on everyone. This draft holds it at recognition. | (a) recognition only (this draft); (b) produce the masculine and show the feminine in the reveal; (c) ask the learner's gender; (d) defer the whole adjective-agreement family | |
| D-05 | L6 active-new | L6 introduces `au revoir` as active-new, but Content Bible §6.8 budgets integration lessons at 0. The bonjour→au revoir arc is the lesson's whole point. | (a) accept L6 as a light-teaching lesson with 1 active-new; (b) move `au revoir` to L7 (the leaving lesson); (c) re-label L6 as Standard rather than Integration | |
| D-06 | `C'est où` without the question mark | L8 accepts `C'est où` and `c'est où` (which normalize identically — one is dead weight) while the reveal teaches that the rising tone does the asking. Normalization keeps `?` meaning-bearing everywhere else. | (a) require the `?`; (b) keep accepting it and drop the duplicate; (c) leave as is | |
| D-09 | L1 production budget | The proposal gives L1 six produced families (C-L01-01 · 02 · 03 · 04 · 05 · 11) against Lesson Flow Canon §1.1's 3–5 production actions. Every one has a job, but the budget is a budget. | (a) drop C-L01-01 and let the softened order be the first production; (b) drop C-L01-05 and move `excusez-moi` to L2, where it also appears; (c) merge C-L01-01 into C-L01-02 as a single scaffolded screen; (d) accept 6 for L1 only | |
| D-08 | L1 active-new ledger | Counted over L1–L10 alone, L1 shows 5 active-new (`bonjour`, `je voudrais`, `noun-cafe`, `merci`, `s'il vous plaît`) — above the cap of 4. Counted with L0, it is 2. The lesson's design notes already say L0 owns the first three, but no ledger records it. | (a) record L0 as first contact and the L1 ledger as 2; (b) treat L1 as genuinely 5 and raise the cap; (c) re-mark the three L0 items as recycled in `learningItems` | |
| D-07 | `le café` in L8 | `Le café, c'est où ?` is already on screen twice as an example and is the lesson's real generalization, but it introduces the definite article, which nothing teaches. | (a) teach `le café` as a package and produce it; (b) keep it recognition-only; (c) replace it with a non-article version | |

### Decision queue by family

Every family carrying a status other than KEEP, for a fast pass:

| ID | L | French | Proposed | Ties to |
|---|---|---|---|---|
| C-L01-05 | L1 | Excusez-moi, je voudrais un café, s'il vous plaît. | ADD | — |
| C-L01-06 | L1 | Un café, s'il vous plaît. | REVISE/KEEP | — |
| C-L01-07 | L1 | Bonjour madame. | ADD | — |
| C-L02-02 | L2 | Bonjour, je suis ici. | REVISE | — |
| C-L02-03 | L2 | Je suis en retard. | ADD | — |
| C-L02-04 | L2 | Excusez-moi, je suis en retard. | ADD | — |
| C-L02-05 | L2 | Je suis fatigué. | ADD | D-04 |
| C-L02-07 | L2 | Je suis là. | ADD | — |
| C-L02-08 | L2 | Vous êtes prêt ? | ADD | — |
| C-L02-09 | L2 | Bonjour. Je suis ici. Merci. | ADD | — |
| C-L03-02 | L3 | Ce n'est pas ici. | REVISE/ADD | D-02 |
| C-L03-04 | L3 | Non merci. | REVISE | — |
| C-L03-05 | L3 | Je ne comprends pas. | ADD | — |
| C-L03-06 | L3 | Vous pouvez répéter ? | ADD | — |
| C-L03-08 | L3 | Oui, je suis ici. | ADD | — |
| C-L03-09 | L3 | Pas de problème. | ADD | — |
| C-L03-10 | L3 | Je ne suis pas en retard. | ADD | — |
| C-L04-01 | L4 | J'ai faim. | REVISE | D-02 |
| C-L04-02 | L4 | Bonjour, j'ai une question. | REVISE | D-03 |
| C-L04-03 | L4 | J'ai soif. | ADD | — |
| C-L04-04 | L4 | J'ai une idée. | ADD | — |
| C-L04-07 | L4 | J'ai froid. | ADD | — |
| C-L04-08 | L4 | Je suis fatigué, et j'ai faim. | ADD | D-04 |
| C-L05-02 | L5 | J'ai une question. | KEEP/REVISE | D-01, D-02 |
| C-L05-03 | L5 | Je voudrais une table, s'il vous plaît. | ADD | — |
| C-L05-04 | L5 | Je voudrais un croissant, s'il vous plaît. | ADD | — |
| C-L06-03 | L6 | Non merci. J'ai une question. | ADD | — |
| C-L06-04 | L6 | Excusez-moi, j'ai une question. | REPLACE | — |
| C-L06-06 | L6 | Bonjour. Excusez-moi, je suis en retard. | ADD | — |
| C-L07-02 | L7 | Je vais à la maison. Au revoir. | REVISE | — |
| C-L07-03 | L7 | Je vais au café. | ADD | — |
| C-L07-05 | L7 | Je ne vais pas à la maison. | ADD | — |
| C-L08-01 | L8 | C'est où ? | REVISE | D-06 |
| C-L08-03 | L8 | Le café, c'est où ? | ADD | D-07 |
| C-L08-06 | L8 | Oui, c'est ici. | ADD | — |
| C-L08-07 | L8 | C'est là. | ADD | — |
| C-L09-01 | L9 | Je voudrais faire une pause. | REVISE | — |
| C-L09-02 | L9 | Je voudrais faire une pause, s'il vous plaît. | REVISE | D-02 |
| C-L09-03 | L9 | Excusez-moi, je voudrais faire une pause. | ADD | — |
| C-L09-04 | L9 | Je vais faire une pause. | ADD | — |
| C-L09-05 | L9 | J'ai soif. Je voudrais un café, s'il vous plaît. | ADD | — |
| C-L09-06 | L9 | Je ne comprends pas. Vous pouvez répéter ? | ADD | — |
| C-L10-01 | L10 | Bonjour. C'est où ? | REVISE | D-06 |
| C-L10-03 | L10 | Merci. Je vais à la maison. Au revoir. | KEEP/REVISE | — |
| C-L10-04 | L10 | Excusez-moi, je ne comprends pas. Vous pouvez répéter ? | ADD | — |
| C-L10-06 | L10 | Je suis fatigué. Je voudrais faire une pause. | ADD | D-04 |
| C-L10-08 | L10 | Non merci, je vais à la maison. | ADD | — |

---

## 5. Required checks

| Check | Findings |
|---|---:|
| New chunks exceeding the active-new limit | 0 |
| Overused sentence frames | 0 |
| Lessons with fewer than 3 meaningful production families | 0 |
| Lessons with insufficient situational variation | 0 |
| Production overload | 1 |
| Duplicate sentence families | 0 |
| Chunks introduced but never produced | 3 |
| Production families with no later reuse | 7 |
| Apostrophe-policy conflicts (inherited from the current build) | 12 |
| Accepted alternatives that are not genuinely alternatives | 5 |
| Insight / interstitial overload | 0 |
| Gender-agreement risks | 5 |
| Register inconsistencies | 0 — every family is vous or unaddressed; no tu form is produced anywhere in L1–L10 |
| Unnatural literal translations | 0 flagged mechanically; this is exactly what the human reviewer must judge |
| Sentences appearing before their component chunks | 0 in the proposal |
| Sentences with no plausible beginner context | 0 — every family carries an authored scene |

**New chunks exceeding the active-new limit** — 0

None.

**Overused sentence frames** — 0

None.

**Lessons with fewer than 3 meaningful production families** — 0

None.

**Lessons with insufficient situational variation** — 0

None.

**Production overload** — 1

- L1 proposes 6 produced families (Lesson Flow Canon §1.1 target 3-5)

**Duplicate sentence families** — 0

None.

**Chunks introduced but never produced** — 3

- chunk-oui ("oui") is introduced but never produced in L1-L10
- chunk-tu-es-pret ("tu es prêt") is introduced but never produced in L1-L10
- chunk-vous-etes-pret ("vous êtes prêt") is introduced but never produced in L1-L10

**Production families with no later reuse** — 7

- C-L01-11 "Bonjour, je voudrais un café, s'il vous plaît. Merci !" (L1) is produced and never returns
- C-L03-03 "Non, je ne suis pas ici." (L3) is produced and never returns
- C-L04-04 "J'ai une idée." (L4) is produced and never returns
- C-L05-03 "Je voudrais une table, s'il vous plaît." (L5) is produced and never returns
- C-L06-03 "Non merci. J'ai une question." (L6) is produced and never returns
- C-L06-08 "Bonjour. Je suis ici. J'ai une question." (L6) is produced and never returns
- C-L08-03 "Le café, c'est où ?" (L8) is produced and never returns

**Apostrophe-policy conflicts (inherited from the current build)** — 12

- L3/s07-weave-ce-n-est-pas-ici: accepted alternative "Ce n est pas ici." drops the apostrophe of "Ce n'est pas ici."
- L3/s07-weave-ce-n-est-pas-ici: accepted alternative "Ce n est pas ici" drops the apostrophe of "Ce n'est pas ici."
- L4/s05-weave-j-ai-faim: accepted alternative "J ai faim." drops the apostrophe of "J'ai faim."
- L4/s05-weave-j-ai-faim: accepted alternative "J ai faim" drops the apostrophe of "J'ai faim."
- L4/s05-weave-j-ai-faim: accepted alternative "j ai faim" drops the apostrophe of "J'ai faim."
- L4/s06-weave-bonjour-j-ai-une-question: accepted alternative "Bonjour, j ai une question." drops the apostrophe of "Bonjour, j'ai une question."
- L4/s06-weave-bonjour-j-ai-une-question: accepted alternative "Bonjour j ai une question" drops the apostrophe of "Bonjour, j'ai une question."
- L5/s06-weave-j-ai-une-question: accepted alternative "J ai une question." drops the apostrophe of "J'ai une question."
- L5/s06-weave-j-ai-une-question: accepted alternative "J ai une question" drops the apostrophe of "J'ai une question."
- L5/s06-weave-j-ai-une-question: accepted alternative "j ai une question" drops the apostrophe of "J'ai une question."
- L6/s05-weave-j-ai-une-question: accepted alternative "J ai une question." drops the apostrophe of "J'ai une question."
- L6/s05-weave-j-ai-une-question: accepted alternative "J ai une question" drops the apostrophe of "J'ai une question."

**Accepted alternatives that are not genuinely alternatives** — 5

- L1/s10-weave-merci-thanks: accepted alternative "Merci" already normalizes to "Merci."
- L7/s05-weave-close-the-moment: accepted alternative "Je vais à la maison, au revoir." already normalizes to "Je vais à la maison. Au revoir."
- L9/s05-weave-break-politely: accepted alternative "Je voudrais faire une pause s'il vous plaît." already normalizes to "Je voudrais faire une pause, s'il vous plaît."
- L10/s02-weave-arrive-ask-where: accepted alternative "Bonjour, c'est où ?" already normalizes to "Bonjour. C'est où ?"
- L10/s05-weave-close-the-day: accepted alternative "Je vais à la maison, au revoir." already normalizes to "Je vais à la maison. Au revoir."

**Insight / interstitial overload** — 0

None.

**Gender-agreement risks** — 5

- C-L02-05 "Je suis fatigué." carries an adjective that agrees with the learner's gender — production would force one form
- C-L02-06 "Je suis prêt." carries an adjective that agrees with the learner's gender — production would force one form
- C-L02-08 "Vous êtes prêt ?" carries an adjective that agrees with the learner's gender — production would force one form
- C-L04-08 "Je suis fatigué, et j'ai faim." carries an adjective that agrees with the learner's gender — production would force one form
- C-L10-06 "Je suis fatigué. Je voudrais faire une pause." carries an adjective that agrees with the learner's gender — production would force one form

**On K9 and K10.** These are properties of the *current* build, not of the
proposal: the proposal's answer to both is D-02, and the accepted-alternative
sets in this document are already cleaned. They are listed here so the founder
sees the size of the change D-02 authorises.

**On K11.** No lesson currently exceeds the 3-insight ceiling, and this
proposal adds no insight card anywhere. Every addition rides an existing
screen: a weave gains an alternative, a meet card gains a second example, an
open task gains a scene. Interstitials are an inventory, not a checklist.

---

## 6. Implementation map

**Plan only. No runtime code, lesson file, registry or payload was edited in
this task.** This is what each approved candidate would cost, later.

### 6.1 Registry entries that must be authored

| Proposed ID | French | English | Layer | Needed by |
|---|---|---|---|---|
| `chunk-au-cafe` | au café | to the café | supported destination package for je vais | C-L07-03 |
| `chunk-en-retard` | en retard | late | supported cargo for je suis (invariable — no agreement) | C-L02-03, C-L02-04 |
| `chunk-fatigue` | fatigué | tired | recognition only — gated on D-04 | C-L02-05, C-L04-08, C-L10-06 |
| `chunk-le-cafe` | le café | the café | supported package — gated on D-07 | C-L08-03 |
| `chunk-un-croissant` | un croissant | a croissant | supported package (un side) | C-L05-04 |
| `chunk-une-table` | une table | a table | supported package (une side) | C-L05-03 |
| `noun-soif` | soif | thirst | supported cargo for j'ai (bare, like faim) | C-L04-03 |

### 6.2 Dormant registered items reactivated (no registry change)

| ID | French | Used by |
|---|---|---|
| `chunk-excusez-moi` | excusez-moi | C-L02-04, C-L06-04, C-L06-06, C-L09-03, C-L10-04 |
| `chunk-je-ne-comprends-pas` | je ne comprends pas | C-L09-06, C-L10-04 |
| `chunk-vous-pouvez-repeter` | vous pouvez répéter ? | C-L09-06, C-L10-04 |
| `noun-idee` | idée | C-L04-04 |
| `chunk-vous-etes-pret` | vous êtes prêt | C-L02-08 |

### 6.3 Per-lesson surface work

| Lesson | Replace | Add | Accepted-alternative update | Registry | Payload / evidence | No runtime change |
|---|---|---|---|---|---|---|
| L1 | — | C-L01-05, C-L01-07 | C-L01-06 | — | PM-009 / PM-011 payloads unchanged | 6 families |
| L2 | — | C-L02-03, C-L02-04, C-L02-09, C-L02-05, C-L02-07, C-L02-08 | — | `chunk-en-retard`, `chunk-fatigue` | no registered payload in this lesson | 2 families |
| L3 | — | C-L03-05, C-L03-10, C-L03-08, C-L03-06, C-L03-09 | C-L03-02, C-L03-04 | — | no registered payload in this lesson | 3 families |
| L4 | — | C-L04-03, C-L04-04, C-L04-08, C-L04-07 | C-L04-02, C-L04-01 | `noun-soif`, `chunk-fatigue` | no registered payload in this lesson | 0 families |
| L5 | — | C-L05-04, C-L05-03 | C-L05-02 | `chunk-un-croissant`, `chunk-une-table` | no registered payload in this lesson | 3 families |
| L6 | C-L06-04 | C-L06-03, C-L06-06 | — | — | no registered payload in this lesson | 4 families |
| L7 | — | C-L07-03, C-L07-05 | C-L07-02 | `chunk-au-cafe` | no registered payload in this lesson | 2 families |
| L8 | — | C-L08-03, C-L08-06, C-L08-07 | C-L08-01 | `chunk-le-cafe` | no registered payload in this lesson | 1 families |
| L9 | — | C-L09-03, C-L09-04, C-L09-05, C-L09-06 | C-L09-02, C-L09-01 | — | no registered payload in this lesson | 0 families |
| L10 | — | C-L10-04, C-L10-06, C-L10-08 | C-L10-01 | `chunk-fatigue` | no registered payload in this lesson | 1 families |

### 6.4 Identity work

- **Sentence registry.** This draft creates **no** sentence IDs. `candidate_id` values (`C-L##-##`) are documentation handles only and must never become `sentenceId`, `payloadId`, `evId` or `clientEventId`. Whether the 41 production families should be registered at all is a separate founder decision, already raised in the QA pack.
- **Payload registry.** The two registered pilot payloads (`v1-lesson-001/s10-weave-merci-thanks` → EV-030, `v1-lesson-001/s11-weave-the-order` → EV-040) are untouched by every proposal above. C-L01-03 and C-L01-04 are KEEP precisely so that identity does not move.
- **Evidence mapping.** Every ADD that is produced needs `targetItemIds`, and where a package is supplied on screen, `evidenceTargetItemIds` narrowing plus `supportRole: "constitutive"` — the same shape PM-011 already uses. No new evidence class, no new admission rule.
- **Protected chunks.** `PROTECTED_CHUNKS` stays frozen at `je ne suis pas` and `ce n'est pas`. The survival formulas (`je ne comprends pas`, `vous pouvez répéter ?`) belong to the separate `SURVIVAL_FORMULAS` class per Payload Economy §4.1 and must not widen the protected set.
- **Structural validator.** Every new recap chip in this proposal is atomic or an approved package; no proposal puts a sentence in `piecesUsed`.

### 6.5 What needs no runtime change at all

21 families are KEEP across every appearance: they ship today, unchanged, and need nothing but a French verdict.

---

## 7. What this draft did not do

- No lesson file, registry, evaluator, payload or test was edited.
- No sentence or item ID was created in production code.
- No French was marked approved, and no AI judgement is recorded as QA. Content Bible §18.3 requires a named human reviewer, and none has seen this.
- No lesson gained an insight card, and no interstitial type was added anywhere.
- Nothing was expanded beyond L10, and no grammar was added for completeness — `aller` conjugation, the `faire` system, `est-ce que`, `y`, definite articles beyond D-07 and adjective agreement beyond D-04 all stay out.
- No current production sentence was silently discarded; all 25 survive, and the two that changed role (L7→L10 leave-taking, L9→L10 break) are recorded as REVISE with the reason.

---

*Candidate content, authored against the shipped lessons at commit `b3bb0e6`. Founder review first, then named human French QA. Neither has happened.*
