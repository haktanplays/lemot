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
