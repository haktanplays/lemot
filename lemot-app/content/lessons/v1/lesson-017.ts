/**
 * L17 - How are you? The first Factory-produced ACQUISITION lesson (L16 was
 * Integration, owning nothing new).
 *
 * Pre-flight cleared its contract against the real registry before a screen was
 * authored; the candidate then cleared every deterministic validator, and a
 * human semantic review produced seven content corrections folded in here.
 * Naturalness and communicative coherence were judged by review, not by a
 * validator - no validator claims them.
 *
 * FRENCH QA: the three new identities carry `founder_waived_provisional`. No
 * named human has read this French. It is internally reachable under the
 * founder's explicit risk acceptance for the tester APK, is NOT public /
 * content-complete ready, and the comprehensive human French QA pass remains
 * mandatory before any wider release.
 */
import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";

const screens: LessonScreen[] = [
  {
    id: "s00-goal-how-are-you",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "How are you?",
      body:
        "Today: three small things.\n" +
        "By the end: you'll ask someone how they are, and answer when they ask you.\n" +
        "Main pieces: ca va, fatigue, content.",
    },
  },
  {
    id: "s01-meet-ca-va-ask",
    type: "meet-card",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      fr: "Ça va ?",
      en: "How's it going?",
      title: "Two words. Almost everyone says this one.",
      highlights: [{ text: "Ça va", itemId: "chunk-ca-va" }],
      tts: true,
    },
  },
  {
    id: "s02-insight-voice-up-voice-down",
    type: "insight-card",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      insightType: "micro-contrast",
      title: "Same two words. Your voice does the work.",
      body:
        "Ça va goes up at the end when you're asking, and down when you're answering. Nothing else changes: not the words, not the spelling.\n" +
        "Take it whole. You don't have to know what the va is doing to use ça va.",
      examples: [
        { fr: "Ça va ?", en: "How's it going? (voice up)" },
        { fr: "Ça va.", en: "I'm okay. (voice down)" },
      ],
    },
  },
  {
    id: "s03-meet-the-two-answers",
    type: "meet-card",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      fr: "Ça va. Ça ne va pas.",
      en: "I'm okay. I'm not okay.",
      title: "The two answers. Learn each one whole.",
      highlights: [{ text: "Ça va", itemId: "chunk-ca-va" }],
      tts: true,
    },
  },
  {
    id: "s04-weave-answer-the-check-in",
    type: "weave",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      weaveType: "supported",
      prompt: "Someone asks how you are, and you're fine. Answer them.",
      context: "You pass a neighbour on the stairs. Ça va ?",
      suggestedPieces: [
        { text: "ça va", itemId: "chunk-ca-va", required: true, label: "I'm okay" },
        { text: "merci", itemId: "chunk-merci", label: "thanks" },
      ],
      expectedAnswers: ["Ça va."],
      acceptedAlternatives: ["Ça va", "Ça va, merci.", "Ça va, merci", "Ça va merci"],
      reveal: {
        modelAnswer: "Ça va.",
        ifCorrect: "Two words and you're in the conversation.",
        ifCorrectButFlat: "Right. Voice down, because you're answering.",
        ifMissingTargetPiece: "Just ça va, said downward.",
        naturalAlternatives: ["Ça va, merci."],
        explanation:
          "Adding merci is what a lot of people do. You're not just reporting, you're thanking them for asking.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s05-meet-tired-and-glad",
    type: "meet-card",
    targetItemIds: ["adj-fatigue", "adj-content", "chunk-je-suis"],
    payload: {
      fr: "Je suis fatigué. Je suis content.",
      en: "I'm tired. I'm happy.",
      title: "A man says fatigué and content. A woman says fatiguée and contente.",
      highlights: [
        { text: "fatigué", itemId: "adj-fatigue" },
        { text: "content", itemId: "adj-content" },
      ],
      tts: true,
    },
  },
  {
    id: "s06-weave-not-okay-and-why",
    type: "weave",
    targetItemIds: ["chunk-ca-va", "adj-fatigue"],
    evidenceTargetItemIds: ["adj-fatigue"],
    payload: {
      weaveType: "mid",
      prompt: "Say you're not okay, and say why.",
      context: "It's late, the day was long, and someone asks how you are.",
      suggestedPieces: [
        {
          text: "ça ne va pas",
          itemId: "chunk-ca-va",
          required: true,
          label: "I'm not okay (one piece)",
        },
      ],
      expectedAnswers: ["Ça ne va pas. Je suis fatigué."],
      acceptedAlternatives: [
        "Ça ne va pas. Je suis fatiguée.",
        "Ça ne va pas, je suis fatigué.",
        "Ça ne va pas, je suis fatiguée.",
        "Ça ne va pas. Je suis fatigué",
        "Ça ne va pas. Je suis fatiguée",
      ],
      reveal: {
        modelAnswer: "Ça ne va pas. Je suis fatigué.",
        ifCorrect: "An honest answer, and a reason. That's a real reply.",
        ifCorrectButFlat: "Fatiguée works just as well. Both are right here.",
        ifMissingTargetPiece:
          "Ça ne va pas comes first, whole. Then je suis and how you feel.",
        naturalAlternatives: ["Ça ne va pas. Je suis fatiguée."],
        explanation:
          "Ça ne va pas is the ne ... pas you already know, wrapped around ça va. Say the whole thing for now; you don't have to build it.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s07-weave-okay-and-glad",
    type: "weave",
    targetItemIds: ["chunk-ca-va", "adj-content"],
    evidenceTargetItemIds: ["adj-content"],
    payload: {
      weaveType: "mid",
      prompt: "Say you're okay, and that you're happy.",
      context: "Something went well today, and a friend asks how you are.",
      suggestedPieces: [
        { text: "je suis", itemId: "chunk-je-suis", required: true, label: "I am" },
      ],
      expectedAnswers: ["Ça va. Je suis content."],
      acceptedAlternatives: [
        "Ça va. Je suis contente.",
        "Ça va, je suis content.",
        "Ça va, je suis contente.",
        "Je suis content.",
        "Je suis contente.",
      ],
      reveal: {
        modelAnswer: "Ça va. Je suis content.",
        ifCorrect: "Ça va says things are fine. Je suis content says you're happy. Not the same.",
        ifCorrectButFlat: "Contente is the other half of the pair, and just as right.",
        ifMissingTargetPiece: "Start with ça va, then je suis and the feeling.",
        naturalAlternatives: ["Ça va. Je suis contente."],
        explanation:
          "You can stop at ça va. Adding je suis content(e) tells them something about you, not just about the day.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s08-fill-which-answer-fits",
    type: "fill-with-traps",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      prompt:
        "You skipped lunch and you're running on empty. Someone asks Ça va ? What fits?",
      sentenceBefore: "",
      sentenceAfter: " J'ai faim.",
      blankCount: 1,
      options: [
        { id: "opt-ne-va-pas", text: "Ça ne va pas.", isCorrect: true },
        {
          id: "opt-ca-va-bien",
          text: "Ça va bien.",
          isCorrect: false,
          trapReason:
            "Bien isn't yours yet, and it says the opposite of what's happening. Ça va on its own is enough when things are fine.",
        },
        {
          id: "opt-ca-va-aller",
          text: "Ça va aller.",
          isCorrect: false,
          trapReason:
            "That one talks about later, and later is a different lesson. Stay with how things are right now.",
        },
      ],
      answer: ["opt-ne-va-pas"],
      reveal: {
        short: "Ça ne va pas.",
        explanation:
          "Say it, then say why. J'ai faim has been yours since the avoir lesson.",
        natural: "Ça ne va pas. J'ai faim.",
      },
    },
  },
  {
    id: "s09-weave-ask-someone",
    type: "weave",
    targetItemIds: ["chunk-ca-va"],
    payload: {
      weaveType: "context",
      prompt: "Say hello, and ask.",
      context:
        "Someone you know is sitting alone and looks worn out. You'd rather say something than walk past.",
      expectedAnswers: ["Bonjour, ça va ?"],
      acceptedAlternatives: [
        "Bonjour, ça va",
        "Bonjour. Ça va ?",
        "Ça va ?",
        "Ça va",
      ],
      reveal: {
        modelAnswer: "Bonjour, ça va ?",
        ifCorrect: "Two words, and someone doesn't have to sit there alone.",
        ifCorrectButFlat: "Voice up at the end. That's what makes it a question.",
        ifWrongStructure: "Nothing complicated: bonjour, then ça va with your voice going up.",
        naturalAlternatives: ["Ça va ?"],
        explanation:
          "Same two words you answered with earlier. Only your voice changed.",
      },
      validationMode: "exact-or-alternative",
    },
  },
  {
    id: "s10-natural-reveal-frozen-and-kind",
    type: "natural-reveal",
    targetItemIds: ["chunk-ca-va", "adj-fatigue", "adj-content"],
    payload: {
      explanation:
        "Ça va is one small thing you own twice over: ask with it, answer with it. There is a verb hiding inside it, and you will meet it properly much later; the phrase means far more than its parts, so leave it whole. It will serve you for years.\n" +
        "Fatigué and fatiguée are the same word; so are content and contente. Say whichever one fits you. There is a rule behind it, and you will meet it later, without needing it today.\n" +
        "Nobody here tells anyone what to do. You say how things are, you hear how they are. That is already a conversation.",
      naturalAlternatives: [
        "Ça va ?",
        "Ça va, merci.",
        "Ça ne va pas. Je suis fatigué.",
        "Je suis contente.",
      ],
    },
  },
  {
    id: "s11-sayit-small-check-in",
    type: "say-it-your-way",
    targetItemIds: ["chunk-ca-va", "adj-fatigue", "adj-content"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "You arrive somewhere and someone you know is already there. You greet them and ask how they are. They answer Ça va, and ask you the same thing back. It has been a long day.",
      communicativeGoal: "Write both of your own lines: the greeting and the question first, then your answer when it comes back to you.",
      modelAnswer: "Bonjour, ça va ? Ça ne va pas. Je suis fatigué.",
      reveal: {
        modelAnswer: "Bonjour, ça va ? Ça ne va pas. Je suis fatigué.",
        naturalAlternatives: [
          "Bonjour, ça va ? Ça va, merci. Je suis contente.",
          "Ça va ? Ça ne va pas. J'ai faim.",
        ],
        explanation:
          "Asking first is the part that matters. Whatever you answer after that is honest, and short is fine.",
      },
      validationMode: "model-answer-only",
    },
  },
  {
    id: "s12-recap-how-are-you",
    type: "recap",
    payload: {
      title: "You can ask, and you can answer.",
      lines: [
        "Ça va asks and answers, depending on your voice.",
        "You said you were tired, and you said you were glad.",
        "You asked someone else first. That was the kind part.",
      ],
      piecesUsed: ["ça va", "je suis", "fatigué", "fatiguée", "content", "contente", "merci"],
      nextLabel: "Continue",
    },
  },
];

export const lesson017: Lesson = {
  id: "v1-lesson-017",
  version: "v1",
  number: 17,
  title: "How are you?",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "thematic-context",
  secondaryArchetype: "chunk-natural-speech",
  journeyRole: "standard",
  acquisitionDemandItemIds: ["chunk-ca-va", "adj-fatigue", "adj-content"],
  estimatedMinutes: 6,
  canDo:
    "Ask how someone is, say how you are (okay, not okay, tired, glad), and open a small human moment kindly, without giving advice.",
  whyItExists:
    "Before L17 the learner ships one way to say how they are (j'ai faim) and nothing positive at all, so they can order a coffee but cannot ask a person how they are. L17 adds the move that opens and repairs real conversations, ca va, plus the two state words that make it answerable. Everything rides the je suis + state frame the learner already owns; no new engine opens.",
  prerequisites: ["v1-lesson-016"],
  learningItems: getItems([
    "chunk-ca-va",
    "adj-fatigue",
    "adj-content",
    "chunk-je-suis",
    "grammar-ne-pas-sandwich",
    "chunk-j-ai-faim",
    "chunk-merci",
    "chunk-bonjour",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "ca va is ONE identity with two uses. s01 meets the ask, s02 names the difference as voice rather than grammar, s03 meets both answers whole, s04 produces the answer and s09 retrieves the ask with no pieces. chunk-ca-va-question was never created and is never simulated.",
    "Ca ne va pas is composed from the frozen chunk plus the owned ne...pas. It is met whole (s03), supplied as ONE labelled piece (s06), offered as a whole option (s08), and never appears as a recap chip. ca / va / ne / pas are never presented as rearrangeable tiles, and no fourth identity was minted.",
    "grammar-ne-pas-sandwich is a recycled dependency, not a screen target: the learner reuses the operation without being asked to analyse va inside the formula.",
    "adj-fatigue and adj-content are NEW here, not recycled from L2. Both gender surfaces are shown on s05 and accepted wherever both fit (s06, s07 acceptedAlternatives); no agreement rule is taught and no feminine id exists.",
    "Support falls 4/3/3/2/0 across five production actions. s09 is genuine retrieval of the other use of ca va, not a repeat of s04, and s11 opens the exchange rather than restating a previous answer.",
    "Il faut faire une pause is deliberately absent although it is owned: aimed at a tired person it reads as advice, which is the one register L17 forbids. Warmth comes from the learner doing the asking (s09, s11) and from merci (s04) instead.",
    "j'ai faim is the only recycled state, used once (s08) so the two new adjectives are not the only possible answer.",
    "No AI, no chat. Say It Your Way is deterministic model-answer-only.",
    "No XP / streak / mission / reward language.",
    "The canDo says OPEN a small human moment, not ANSWER one. The learner can ask first and can answer honestly about themselves, but owns no way to console someone else: c'est pas grave is unowned and advice is deferred. Neither was imported to fake it.",
    "adj-content has slightly thinner exit evidence than adj-fatigue: s11 model answer takes the tired branch (the situation is a long day) and content appears in the natural alternative. Reviewed and accepted; the lesson was not inflated to make the two symmetric.",
    "French QA is founder_waived_provisional on all three new identities - internally reachable, never named-human approved.",
    "Registered in V1_LESSONS but NOT learner-visible (Home caps at L6).",
  ],
  qaChecks: [
    "TTS reads Ca va ?, Ca va. Ca ne va pas., and Je suis fatigue. Je suis content. cleanly, French only.",
    "s02 explains the ask/answer difference as intonation and never as a verb form.",
    "s06 and s07 accept both gender surfaces; a learner is never marked wrong for using the other one.",
    "s08 trap reasons fire on Ca va bien and Ca va aller.",
    "Recap chips are atoms only; Ca ne va pas. never appears as a chip.",
    "No line opens an aller paradigm, futur proche, advice, se sentir, or a broader emotion list.",
  ],
};
