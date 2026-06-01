/**
 * L1 item registry fixture (v0.1).
 *
 * A small, representative slice of L1 items — not every L1 item. Each item
 * carries a preset (default behaviors), light text, and source-hygiene
 * metadata. Ids are colon-namespaced: "<type>:<slug>".
 *
 * The point is to prove the contract pattern on one real lesson, not to model
 * the full registry.
 */
import type { RawItem, SourceHygiene } from "./types";

/** Shared clean-original hygiene for this fixture (never mutated). */
const CLEAN_ORIGINAL: SourceHygiene = {
  origin: "original",
  thirdPartySourceDerived: false,
  disallowedDerivative: false,
  sourceRisk: "none",
  reviewStatus: "passed",
};

export const L1_ITEMS: Record<string, RawItem> = {
  "chunk:bonjour": {
    id: "chunk:bonjour",
    preset: "early_active_chunk",
    text: { fr: "Bonjour", en: "Hello / good morning" },
    firstIntroducedIn: "L1",
    tags: ["greeting", "social_ritual", "first_contact"],
    pronunciationProfile: {
      respelling: "bohn-ZHOOR",
      ipa: "/bɔ̃.ʒuʁ/",
      audioText: "Bonjour",
      soundNotes: ["'on' is nasal — don't pronounce the n."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-voudrais": {
    id: "chunk:je-voudrais",
    preset: "early_active_chunk",
    text: { fr: "je voudrais", en: "I would like" },
    firstIntroducedIn: "L1",
    tags: ["polite_request", "register_polite"],
    pronunciationProfile: {
      respelling: "zhuh voo-DREH",
      ipa: "/ʒə vu.dʁɛ/",
      audioText: "je voudrais",
      soundNotes: ["Soft, polite request frame — more natural than 'I want'."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:s-il-vous-plait": {
    id: "chunk:s-il-vous-plait",
    preset: "early_active_chunk",
    text: { fr: "s'il vous plaît", en: "please (formal)" },
    firstIntroducedIn: "L1",
    tags: ["politeness", "register_polite", "elision"],
    pronunciationProfile: {
      respelling: "seel voo PLEH",
      ipa: "/sil vu plɛ/",
      audioText: "s'il vous plaît",
      soundNotes: ["Travels as one chunk — never split across tiles."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "noun_phrase:un-cafe": {
    id: "noun_phrase:un-cafe",
    preset: "contextual_noun_phrase",
    text: { fr: "un café", en: "a coffee" },
    firstIntroducedIn: "L1",
    tags: ["food_drink", "ordering", "article_indefinite"],
    pronunciationProfile: {
      respelling: "uhn ka-FAY",
      ipa: "/œ̃ ka.fe/",
      audioText: "un café",
      soundNotes: ["'un' is nasal; final é is a clear 'ay'."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-veux": {
    id: "chunk:je-veux",
    preset: "early_active_chunk",
    text: { fr: "je veux", en: "I want" },
    firstIntroducedIn: "L1",
    tags: ["request", "register_direct"],
    pronunciationProfile: {
      respelling: "zhuh VUH",
      ipa: "/ʒə vø/",
      audioText: "je veux",
      soundNotes: ["Direct register — the form learners soften into 'je voudrais'."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "culture_piece:bonjour-first": {
    id: "culture_piece:bonjour-first",
    preset: "culture_social_ritual",
    text: {
      fr: "Bonjour d'abord.",
      en: "Say 'bonjour' before anything else — entering a shop without it reads as rude.",
    },
    firstIntroducedIn: "L1",
    tags: ["culture", "politeness", "social_ritual"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:merci": {
    id: "chunk:merci",
    preset: "early_active_chunk",
    text: { fr: "merci", en: "thank you" },
    firstIntroducedIn: "L1",
    tags: ["politeness", "social_ritual"],
    pronunciationProfile: {
      respelling: "mehr-SEE",
      ipa: "/mɛʁ.si/",
      audioText: "merci",
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:au-revoir": {
    id: "chunk:au-revoir",
    preset: "early_active_chunk",
    text: { fr: "au revoir", en: "goodbye" },
    firstIntroducedIn: "L1",
    tags: ["greeting", "social_ritual", "closing"],
    pronunciationProfile: {
      respelling: "oh ruh-VWAHR",
      ipa: "/o ʁə.vwaʁ/",
      audioText: "au revoir",
      soundNotes: ["Travels as one chunk — never split across tiles."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "sound_pattern:nasal-on": {
    id: "sound_pattern:nasal-on",
    preset: "sound_pattern",
    text: { fr: "on → /ɔ̃/", en: "the 'on' vowel is nasal" },
    firstIntroducedIn: "L1",
    tags: ["sound", "nasal_vowel", "pronunciation"],
    pronunciationProfile: {
      respelling: "ohn (through the nose)",
      ipa: "/ɔ̃/",
      audioText: "bonjour, bon, non",
      soundNotes: ["Air through the nose; the n is not pronounced as a consonant."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
};

/**
 * L14 item registry fixture (v0.1) — y-light / place-pronoun doorway.
 *
 * A narrow, chunk-first slice: two active doorway chunks, a couple of aller
 * carry-in chunks (supported), and recognition-only grammar hooks / future
 * systems that L14 must never ask the learner to produce.
 */
export const L14_ITEMS: Record<string, RawItem> = {
  // ── Active: the y-light doorway ──
  "chunk:j-y-vais": {
    id: "chunk:j-y-vais",
    preset: "early_active_chunk",
    text: { fr: "j'y vais", en: "I'm going (there) / I'm off" },
    firstIntroducedIn: "L14",
    tags: ["movement", "place_pronoun", "y_light", "doorway"],
    pronunciationProfile: {
      respelling: "zhee VEH",
      ipa: "/ʒi vɛ/",
      audioText: "j'y vais",
      soundNotes: ["Said as one chunk — the 'y' is not unpacked yet."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:on-y-va": {
    id: "chunk:on-y-va",
    preset: "early_active_chunk",
    text: { fr: "on y va", en: "let's go / we're going (there)" },
    firstIntroducedIn: "L14",
    tags: ["movement", "place_pronoun", "y_light", "doorway"],
    pronunciationProfile: {
      respelling: "oh-nee VAH",
      ipa: "/ɔ̃ ni va/",
      audioText: "on y va",
      soundNotes: ["Frozen chunk for 'let's go'."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // ── Supported carry-in (aller, taught earlier; scaffolding in L14) ──
  "chunk:je-vais": {
    id: "chunk:je-vais",
    preset: "early_active_chunk",
    text: { fr: "je vais", en: "I go / I'm going" },
    firstIntroducedIn: "L07",
    tags: ["movement", "aller", "carry_in"],
    pronunciationProfile: {
      respelling: "zhuh VEH",
      ipa: "/ʒə vɛ/",
      audioText: "je vais",
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:on-va": {
    id: "chunk:on-va",
    preset: "early_active_chunk",
    text: { fr: "on va", en: "we go / we're going" },
    firstIntroducedIn: "L07",
    tags: ["movement", "aller", "carry_in"],
    pronunciationProfile: {
      respelling: "oh VAH",
      ipa: "/ɔ̃ va/",
      audioText: "on va",
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // ── Recognition-only hooks / future systems (never produced in L14) ──
  "grammar_piece:y-place-light": {
    id: "grammar_piece:y-place-light",
    preset: "recognition_only_hook",
    text: {
      fr: "y = « là / à cet endroit »",
      en: "'y' stands in for 'there / to that place' — recognized as a whole, not yet a grammar system.",
    },
    firstIntroducedIn: "L14",
    tags: ["grammar_hook", "place_pronoun", "y_light", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "grammar_piece:full-y-en-contrast": {
    id: "grammar_piece:full-y-en-contrast",
    preset: "recognition_only_hook",
    text: {
      fr: "y vs en (système complet)",
      en: "the full y/en pronoun contrast — a later system, not opened in L14.",
    },
    firstIntroducedIn: "L14",
    tags: ["grammar_hook", "future_system", "y_en", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-peux-y-aller": {
    id: "chunk:je-peux-y-aller",
    preset: "recognition_only_hook",
    text: {
      fr: "je peux y aller",
      en: "I can go (there) — modal + y + infinitive; recognized only, not produced in L14.",
    },
    firstIntroducedIn: "L14",
    tags: ["grammar_hook", "modal_pronoun_chain", "boundary", "recognition_only"],
    pronunciationProfile: {
      respelling: "zhuh puh zee a-LAY",
      ipa: "/ʒə pø zi a.le/",
      audioText: "je peux y aller",
      soundNotes: ["Shown for recognition only; production belongs to a later lesson."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // Not a usable chunk — an error-pattern / boundary marker for y/en confusion.
  // The "error_pattern:" namespace tells Mon Lexique, Word Graph, pronunciation,
  // and any renderer that this must never be produced or spoken. No audioText.
  "error_pattern:j-en-vais": {
    id: "error_pattern:j-en-vais",
    preset: "recognition_only_hook",
    text: {
      fr: "le pronom « en »",
      en: "the 'en' pronoun system — a separate future hook, never a target in L14.",
    },
    firstIntroducedIn: "L14",
    tags: [
      "boundary_trap",
      "y_en_confusion",
      "blocked_production",
      "recognition_only",
      "en_pronoun",
    ],
    sourceHygiene: CLEAN_ORIGINAL,
  },
};

/**
 * L15 item registry fixture (v0.1) — devoir/falloir-light Obligation Doorway.
 *
 * A narrow, chunk-first obligation slice: the impersonal «il faut + infinitive»
 * doorway (active), a personal «je dois + infinitive» doorway (supported), and
 * recognition-only hooks for everything L15 must NOT open yet — «il faut que» +
 * subjunctive, the full devoir paradigm, conditional advice ("je devrais"), and
 * softened obligation ("il faudrait que"). Deliberately avoids «il faut y aller»
 * so it does not re-open the L14 'y' pronoun.
 */
export const L15_ITEMS: Record<string, RawItem> = {
  // ── Active: the «il faut + infinitive» obligation doorway ──
  "chunk:il-faut-faire-ca": {
    id: "chunk:il-faut-faire-ca",
    preset: "early_active_chunk",
    text: { fr: "il faut faire ça", en: "you have to do that / it needs doing" },
    firstIntroducedIn: "L15",
    tags: ["obligation", "il_faut", "infinitive", "doorway"],
    pronunciationProfile: {
      respelling: "eel foh fehr SAH",
      ipa: "/il fo fɛʁ sa/",
      audioText: "il faut faire ça",
      soundNotes: ["«il faut» is a frozen impersonal — said as one obligation chunk."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:il-faut-faire-une-pause": {
    id: "chunk:il-faut-faire-une-pause",
    preset: "early_active_chunk",
    text: {
      fr: "il faut faire une pause",
      en: "you need to take a break",
    },
    firstIntroducedIn: "L15",
    tags: ["obligation", "il_faut", "infinitive", "faire_carry_in", "doorway"],
    pronunciationProfile: {
      respelling: "eel foh fehr ün POHZ",
      ipa: "/il fo fɛʁ yn poz/",
      audioText: "il faut faire une pause",
      soundNotes: ["Reuses the known «faire une pause» behind the «il faut» doorway."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // ── Supported: the personal «je dois + infinitive» doorway (devoir-light) ──
  // early_active_chunk by default; carried in the supported bucket on purpose —
  // a narrow devoir doorway, NOT the full paradigm.
  "chunk:je-dois": {
    id: "chunk:je-dois",
    preset: "early_active_chunk",
    text: { fr: "je dois", en: "I have to / I must" },
    firstIntroducedIn: "L15",
    tags: ["obligation", "devoir_light", "personal", "doorway"],
    pronunciationProfile: {
      respelling: "zhuh DWAH",
      ipa: "/ʒə dwa/",
      audioText: "je dois",
      soundNotes: ["The personal obligation opener — one devoir form, not the paradigm."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-dois-faire-ca": {
    id: "chunk:je-dois-faire-ca",
    preset: "early_active_chunk",
    text: { fr: "je dois faire ça", en: "I have to do that" },
    firstIntroducedIn: "L15",
    tags: ["obligation", "devoir_light", "infinitive", "personal", "doorway"],
    pronunciationProfile: {
      respelling: "zhuh dwah fehr SAH",
      ipa: "/ʒə dwa fɛʁ sa/",
      audioText: "je dois faire ça",
      soundNotes: ["«je dois» + known infinitive — the supported personal doorway."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // ── Recognition-only hooks / future systems (never produced in L15) ──
  "grammar_piece:il-faut-que-subjunctive": {
    id: "grammar_piece:il-faut-que-subjunctive",
    preset: "recognition_only_hook",
    text: {
      fr: "il faut que + subjonctif",
      en: "after «il faut que» the verb shifts to the subjunctive — a later system, not opened in L15.",
    },
    firstIntroducedIn: "L15",
    tags: ["grammar_hook", "subjunctive", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:il-faut-que-j-aille": {
    id: "chunk:il-faut-que-j-aille",
    preset: "recognition_only_hook",
    text: {
      fr: "il faut que j'aille",
      en: "I have to go (subjunctive «aille») — recognized only in L15, not produced.",
    },
    firstIntroducedIn: "L15",
    tags: [
      "grammar_hook",
      "subjunctive",
      "boundary",
      "il_faut_que",
      "recognition_only",
    ],
    pronunciationProfile: {
      respelling: "eel foh kuh ZHAH-yuh",
      ipa: "/il fo kə ʒaj/",
      audioText: "il faut que j'aille",
      soundNotes: ["Shown for recognition only; the subjunctive «aille» opens in a later lesson."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "grammar_piece:devoir-full-paradigm": {
    id: "grammar_piece:devoir-full-paradigm",
    preset: "recognition_only_hook",
    text: {
      fr: "devoir (conjugaison complète)",
      en: "the full devoir paradigm (je dois, tu dois, il doit, nous devons…) — a later system, not opened in L15.",
    },
    firstIntroducedIn: "L15",
    tags: ["grammar_hook", "devoir", "full_paradigm", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-devrais": {
    id: "chunk:je-devrais",
    preset: "recognition_only_hook",
    text: {
      fr: "je devrais",
      en: "I should / I ought to (conditional advice) — a later, softer modal; recognized only, not produced in L15.",
    },
    firstIntroducedIn: "L15",
    tags: ["grammar_hook", "conditional", "advice", "boundary", "recognition_only"],
    pronunciationProfile: {
      respelling: "zhuh duh-VREH",
      ipa: "/ʒə də.vʁɛ/",
      audioText: "je devrais",
      soundNotes: ["Conditional advice; recognized here, produced in a later lesson."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "grammar_piece:il-faudrait-que": {
    id: "grammar_piece:il-faudrait-que",
    preset: "recognition_only_hook",
    text: {
      fr: "il faudrait que…",
      en: "«il faudrait que» + subjunctive (softened obligation) — a later system, not opened in L15.",
    },
    firstIntroducedIn: "L15",
    tags: ["grammar_hook", "conditional", "subjunctive", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // Not a usable chunk — a boundary marker for the classic «il faut que» error
  // (plain present instead of the subjunctive). No audioText: never spoken.
  "error_pattern:il-faut-que-indicative": {
    id: "error_pattern:il-faut-que-indicative",
    preset: "recognition_only_hook",
    text: {
      fr: "il faut que + indicatif (erreur)",
      en: "the common mistake of using the plain present after «il faut que» instead of the subjunctive — a boundary marker, never produced or spoken.",
    },
    firstIntroducedIn: "L15",
    tags: [
      "boundary_trap",
      "subjunctive_error",
      "blocked_production",
      "recognition_only",
    ],
    sourceHygiene: CLEAN_ORIGINAL,
  },
};

/**
 * L18 item registry fixture (v0.1) — futur-proche doorway / strong preview.
 *
 * A narrow, chunk-first near-future slice: the «aller + known chunk» doorway
 * ("je vais faire ça" / "on va faire ça", active) and recognition-only hooks for
 * everything L18 must NOT open yet — the full futur simple ("je ferai", "j'irai"),
 * the near-future↔simple-future contrast, complex time expressions, and the
 * y + future pronoun chain ("je vais y aller").
 *
 * NOTE ON CARRY-IN: the aller carry-in items «chunk:je-vais» / «chunk:on-va»
 * already live in L14_ITEMS and are NOT redefined here — re-authoring them would
 * create a silent duplicate-id collision in the aggregate spread. L18's standalone
 * fixture pulls them by reference from L14_ITEMS (see index.ts). This fixture
 * holds only items first introduced in L18.
 */
export const L18_ITEMS: Record<string, RawItem> = {
  // ── Active: the «aller + known chunk» near-future doorway ──
  "chunk:je-vais-faire-ca": {
    id: "chunk:je-vais-faire-ca",
    preset: "early_active_chunk",
    text: { fr: "je vais faire ça", en: "I'm going to do that (near future)" },
    firstIntroducedIn: "L18",
    tags: ["near_future", "futur_proche", "aller_doorway", "doorway"],
    pronunciationProfile: {
      respelling: "zhuh vah fehr SAH",
      ipa: "/ʒə va fɛʁ sa/",
      audioText: "je vais faire ça",
      soundNotes: ["«je vais» + known infinitive — said as one near-future chunk."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:on-va-faire-ca": {
    id: "chunk:on-va-faire-ca",
    preset: "early_active_chunk",
    text: { fr: "on va faire ça", en: "we're going to do that (near future)" },
    firstIntroducedIn: "L18",
    tags: ["near_future", "futur_proche", "aller_doorway", "doorway"],
    pronunciationProfile: {
      respelling: "oh vah fehr SAH",
      ipa: "/ɔ̃ va fɛʁ sa/",
      audioText: "on va faire ça",
      soundNotes: ["Plural/collective near-future doorway, same «aller + chunk» shape."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // ── Recognition-only hooks / future systems (never produced in L18) ──
  "grammar_piece:futur-simple-system": {
    id: "grammar_piece:futur-simple-system",
    preset: "recognition_only_hook",
    text: {
      fr: "le futur simple (système complet)",
      en: "the full simple-future tense (je ferai, tu feras, il fera…) — a later system, not opened in L18.",
    },
    firstIntroducedIn: "L18",
    tags: ["grammar_hook", "futur_simple", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-ferai": {
    id: "chunk:je-ferai",
    preset: "recognition_only_hook",
    text: {
      fr: "je ferai",
      en: "I will do (simple future) — recognized only in L18, not produced.",
    },
    firstIntroducedIn: "L18",
    tags: ["grammar_hook", "futur_simple", "boundary", "recognition_only"],
    pronunciationProfile: {
      respelling: "zhuh fuh-REH",
      ipa: "/ʒə fə.ʁe/",
      audioText: "je ferai",
      soundNotes: ["Shown for recognition only; the simple future opens in a later lesson."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:j-irai": {
    id: "chunk:j-irai",
    preset: "recognition_only_hook",
    text: {
      fr: "j'irai",
      en: "I will go (simple future of aller) — recognized only in L18, not produced.",
    },
    firstIntroducedIn: "L18",
    tags: ["grammar_hook", "futur_simple", "aller", "boundary", "recognition_only"],
    pronunciationProfile: {
      respelling: "zhee-REH",
      ipa: "/ʒi.ʁe/",
      audioText: "j'irai",
      soundNotes: ["Irregular simple future of aller; recognized here, produced later."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "grammar_piece:vais-faire-vs-ferai": {
    id: "grammar_piece:vais-faire-vs-ferai",
    preset: "recognition_only_hook",
    text: {
      fr: "« je vais faire » vs « je ferai »",
      en: "near-future vs simple-future contrast — shown for awareness; the contrast system is not opened in L18.",
    },
    firstIntroducedIn: "L18",
    tags: ["grammar_hook", "future_contrast", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "grammar_piece:complex-time-expressions": {
    id: "grammar_piece:complex-time-expressions",
    preset: "recognition_only_hook",
    text: {
      fr: "expressions de temps complexes",
      en: "complex time markers (dans deux semaines, l'année prochaine…) — a later system, not opened in L18.",
    },
    firstIntroducedIn: "L18",
    tags: ["grammar_hook", "time_expressions", "future_system", "recognition_only"],
    sourceHygiene: CLEAN_ORIGINAL,
  },
  "chunk:je-vais-y-aller": {
    id: "chunk:je-vais-y-aller",
    preset: "recognition_only_hook",
    text: {
      fr: "je vais y aller",
      en: "I'm going to go (there) — near-future chained with the 'y' pronoun; recognized only, not produced in L18.",
    },
    firstIntroducedIn: "L18",
    tags: [
      "grammar_hook",
      "near_future",
      "pronoun_chain",
      "y_future",
      "boundary",
      "recognition_only",
    ],
    pronunciationProfile: {
      respelling: "zhuh vah zee a-LAY",
      ipa: "/ʒə va zi a.le/",
      audioText: "je vais y aller",
      soundNotes: ["Chains near-future with the L14 'y' pronoun; recognition only, not built in L18."],
    },
    sourceHygiene: CLEAN_ORIGINAL,
  },
  // Not a usable chunk — a boundary marker for swapping near-future and simple
  // future. No audioText: never spoken.
  "error_pattern:futur-proche-vs-simple-confusion": {
    id: "error_pattern:futur-proche-vs-simple-confusion",
    preset: "recognition_only_hook",
    text: {
      fr: "futur proche confondu avec futur simple (erreur)",
      en: "the mistake of swapping near-future «je vais faire» for simple-future «je ferai» — a boundary marker, never produced or spoken.",
    },
    firstIntroducedIn: "L18",
    tags: [
      "boundary_trap",
      "future_confusion",
      "blocked_production",
      "recognition_only",
    ],
    sourceHygiene: CLEAN_ORIGINAL,
  },
};
