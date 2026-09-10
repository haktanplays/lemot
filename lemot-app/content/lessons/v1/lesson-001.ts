import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // The language world L1 opens. Breadth, not a syllabus: the learner sees
    // that French service interaction is greeting + softened request + thanks,
    // with two repair moves and a handful of things people actually say back.
    id: "s20-showcase-first-contact",
    type: "showcase",
    payload: {
      intro:
        "This is the French of a first counter, a first door, a first small exchange. You will learn to say some of it today. The rest is here so you recognise it when it comes back at you.",
      clusters: [
        {
          label: "Opening a moment",
          sentences: [
            { fr: "Bonjour.", en: "Hello.", role: "core", itemIds: ["chunk-bonjour"], depth: { sound: "bon-ZHOOR", usage: "Not optional. Walking into a French shop without it reads as rude in a way English speakers rarely intend." }, flat: "formula" },
            { fr: "Excusez-moi.", en: "Excuse me.", role: "core", itemIds: ["chunk-excusez-moi"], flat: "formula" },
            { fr: "Bonjour, madame.", en: "Hello, madam.", role: "exposure", pieces: ["Bonjour", "madame"] },
            { fr: "Bonjour, monsieur.", en: "Hello, sir.", role: "exposure", pieces: ["Bonjour", "monsieur"] },
          ],
        },
        {
          label: "Asking for something",
          sentences: [
            {
              fr: "Je voudrais un café, s'il vous plaît.",
              en: "I would like a coffee, please.",
              role: "core",
              itemIds: ["chunk-je-voudrais", "noun-cafe", "chunk-sil-vous-plait"],
              depth: { sound: "zhuh voo-DREH un ka-FAY, seel voo PLEH", structure: "Three pieces, each reusable: the polite ask, the thing, the softener. Swap the middle piece and you have ordered something else.", usage: "The safe register with anyone you do not know. Je veux (I want) is what a child says, and lands badly at a counter." },
            },
            {
              fr: "Je voudrais un thé.",
              en: "I would like a tea.",
              role: "core",
              itemIds: ["chunk-je-voudrais", "chunk-un-the", "noun-the"],
            },
            { fr: "Un café, s'il vous plaît.", en: "A coffee, please.", role: "supported", itemIds: ["noun-cafe", "chunk-sil-vous-plait"] },
            { fr: "Un croissant, s'il vous plaît.", en: "A croissant, please.", role: "exposure", pieces: ["Un croissant", "s'il vous plaît"] },
          ],
        },
        {
          label: "When it goes past you",
          sentences: [
            {
              fr: "Vous pouvez répéter ?",
              en: "Can you say that again?",
              role: "core",
              itemIds: ["chunk-vous-pouvez-repeter"],
              pieces: ["Vous pouvez", "répéter"],
            },
            {
              fr: "Excusez-moi, vous pouvez répéter ?",
              en: "Excuse me, can you say that again?",
              role: "supported",
              itemIds: ["chunk-excusez-moi", "chunk-vous-pouvez-repeter"],
            },
            { fr: "Pardon ?", en: "Sorry?", role: "exposure", flat: "formula" },
            { fr: "Je ne parle pas très bien français.", en: "I don't speak French very well.", role: "exposure", flat: "exposure" },
          ],
        },
        {
          label: "Closing it well",
          sentences: [
            { fr: "Merci.", en: "Thank you.", role: "core", itemIds: ["chunk-merci"], flat: "formula" },
            { fr: "Merci beaucoup.", en: "Thank you very much.", role: "supported", itemIds: ["chunk-merci-beaucoup"], depth: { sound: "mair-SEE bo-KOO", compare: "Merci closes an ordinary exchange. Merci beaucoup says they went out of their way." }, pieces: ["Merci", "beaucoup"] },
            { fr: "Voilà.", en: "There you go.", role: "exposure", flat: "formula" },
            { fr: "Bonne journée !", en: "Have a good day!", role: "exposure", flat: "formula" },
            { fr: "Au revoir.", en: "Goodbye.", role: "exposure", itemIds: ["chunk-au-revoir"], flat: "formula" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-survival-kit",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Your survival kit",
      body:
        "Today: add the polite close, thank, and swap the drink.\n" +
        "By the end: you can carry a whole small exchange in French.\n" +
        "Main pieces: s'il vous plaît, merci.",
    },
  },


  {
    id: "s03-fill-polite-verb",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-voudrais"],
    weakPointTags: ["politeness"],
    payload: {
      prompt: "Which word keeps the request polite?",
      sentenceBefore: "Bonjour, je",
      sentenceAfter: "un café.",
      blankCount: 1,
      options: [
        { id: "opt-voudrais", text: "voudrais", isCorrect: true },
        {
          id: "opt-veux",
          text: "veux",
          isCorrect: false,
          trapReason:
            "It works, but it sounds blunt with someone you don't know. Je voudrais stays polite.",
          // Machine tag (never learner-facing): `je veux` is real, comprehensible
          // French in the wrong register — not a grammar failure, not a blocked
          // form, not a content defect. The miss stays learner-attributed and
          // admitted, and one of them is well below the weakness threshold.
          learningErrorTag: "wrong_register",
        },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason: "Je suis means I am. It cannot ask for a coffee.",
        },
      ],
      answer: ["opt-voudrais"],
      reveal: {
        short: "voudrais",
        explanation:
          "Je voudrais softens any request. It is the polite way to ask a stranger for a coffee, or for anything else.",
        natural: "Bonjour, je voudrais un café.",
      },
    },
  },


  {
    id: "s04-weave-cafe-order",
    type: "weave",
    targetItemIds: ["chunk-bonjour", "chunk-je-voudrais", "noun-cafe"],
    weakPointTags: ["politeness"],
    payload: {
      weaveType: "supported",
      prompt: "Write it in French: Hello, I would like a coffee.",
      context: "You step up to the counter and order simply.",
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
        { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
        { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
      ],
      hintCloze: "Bonjour, je voudrais ___.",
      expectedAnswers: ["Bonjour, je voudrais un café."],
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café.",
        ifCorrect: "That is exactly how a calm order begins.",
        ifCorrectButFlat:
          "Right. The comma marks a small natural pause.",
        ifUnderstandableButWrong:
          "Your meaning lands. The greeting and the order run as one line.",
        ifMissingTargetPiece:
          "Start with bonjour, then the request.",
      },
      validationMode: "exact-or-alternative",
    },
  },


  {
    // Reflection, not preamble: it lands AFTER the learner has re-produced the
    // café order, so it names what they just did instead of front-loading a
    // second explanation screen behind the goal card.
    id: "s01-insight-survival-kit",
    type: "insight-card",
    targetItemIds: ["chunk-bonjour", "chunk-merci"],
    payload: {
      insightType: "culture-bite",
      title: "A small kit goes a long way.",
      body:
        "A handful of polite words carries a whole exchange in French. " +
        "Greet, ask softly, and thank. That kit is enough to handle a real first moment.",
      examples: [
        { fr: "Bonjour.", en: "Hello." },
        { fr: "Merci.", en: "Thank you." },
      ],
    },
  },

  activityChain({
    id: "s22-chain-the-polite-counter",
    intro:
      "Two small words do most of the work at a counter. One goes at the end of what you want, the other after you get it.",
    steps: [
      {
        id: "s05-meet-sil-vous-plait",
        type: "meet-card",
        targetItemIds: ["chunk-sil-vous-plait"],
        weakPointTags: ["politeness", "elision"],
        payload: {
          fr: "S'il vous plaît.",
          en: "Please.",
          title: "The polite tail of a request.",
          highlights: [
            { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
          ],
          tts: true,
        },
      },
      {
        id: "s06-weave-cafe-order-please",
        type: "weave",
        targetItemIds: [
          "chunk-bonjour",
          "chunk-je-voudrais",
          "noun-cafe",
          "chunk-sil-vous-plait",
        ],
        weakPointTags: ["politeness"],
        payload: {
          weaveType: "supported",
          prompt: "Write it in French: Hello, I would like a coffee, please.",
          context: "Add the soft close to your order.",
          suggestedPieces: [
            { text: "Bonjour", itemId: "chunk-bonjour", required: true, label: "greeting" },
            { text: "je voudrais", itemId: "chunk-je-voudrais", required: true, label: "polite request" },
            { text: "un café", itemId: "noun-cafe", required: true, label: "noun package" },
            { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "softener" },
          ],
          hintCloze: "Bonjour, je voudrais ___, s'il vous plaît.",
          expectedAnswers: ["Bonjour, je voudrais un café, s'il vous plaît."],
          reveal: {
            modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît.",
            ifCorrect: "That is a full, polite café order.",
            ifCorrectButFlat:
              "Right. The commas mark small natural pauses.",
            ifUnderstandableButWrong:
              "Your meaning lands. The please sits at the end, after the order.",
            ifMissingTargetPiece:
              "Add s'il vous plaît to soften the close. It costs nothing and changes the tone.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        id: "s07-meet-merci",
        type: "meet-card",
        targetItemIds: ["chunk-merci"],
        payload: {
          fr: "Merci.",
          en: "Thank you.",
          title: "Close with thanks.",
          highlights: [{ text: "Merci", itemId: "chunk-merci" }],
          tts: true,
        },
      },
      // ── PR-07 registered pilot payloads (screen ids are NEW and stable; the
      // existing s00–s09 ids keep their meaning and were not renumbered) ────────
      {
        // PM-009 · EV-030 · sent:l01-merci — A-new typed recall, unscaffolded.
        id: "s10-weave-merci-thanks",
        type: "weave",
        targetItemIds: ["chunk-merci"],
        weakPointTags: ["politeness"],
        payload: {
          // Medium, not easy: the prompt names the job, not the sentence.
          weaveType: "mid",
          prompt: "The coffee arrives. Thank them.",
          // Scene only: it gives the moment a person to react to, so the screen
          // reads as a reaction rather than a translation task. It adds no pieces,
          // no model and no instruction, so the attempt stays unscaffolded and the
          // registered identity (payload id, EV-030, sentence id, evidence target)
          // is untouched.
          context: "The server sets it down and waits a moment.",
          // No pieces, no cloze, no prior model: a clean unscaffolded first
          // production of the form the learner just met. The hint ladder simply
          // does not render.
          expectedAnswers: ["Merci."],
          acceptedAlternatives: ["Merci", "Merci !"],
          reveal: {
            modelAnswer: "Merci.",
            ifCorrect: "That closes the exchange.",
            ifCorrectButFlat: "Right. One word is the whole reply here.",
            ifUnderstandableButWrong: "One word does it here: merci.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),

  activityChain({
    id: "s21-chain-second-opener",
    intro:
      "Greeting works when someone is already looking at you. This is the other case.",
    steps: [
        {
          // Second opener, and the first thing in L1 that is not a café mechanic.
          // bonjour greets a room you are already part of; excusez-moi buys attention
          // you do not yet have. Registered and frozen since the L1 ledger, activated
          // here for the first time so the polite kit stops being a counter script.
          id: "s13-meet-excusez-moi",
          type: "meet-card",
          targetItemIds: ["chunk-excusez-moi"],
          weakPointTags: ["politeness"],
          payload: {
            fr: "Excusez-moi.",
            en: "Excuse me.",
            title: "When you need their attention first.",
            highlights: [{ text: "Excusez-moi", itemId: "chunk-excusez-moi" }],
            tts: true,
          },
        },
        {
          // New pedagogical operation for L1: not assembly and not recall, but a
          // choice between two polite moves the learner now owns. The trap is not a
          // wrong word — it is the right word in the wrong moment, which is why both
          // distractors stay fully correct French.
          id: "s14-fill-opener-choice",
          type: "fill-with-traps",
          targetItemIds: ["chunk-excusez-moi", "chunk-bonjour"],
          weakPointTags: ["politeness"],
          payload: {
            prompt:
              "The server has their back to you and has not seen you yet. Which opener reaches them?",
            sentenceAfter: ", je voudrais un café.",
            blankCount: 1,
            options: [
              { id: "opt-excusez-moi", text: "Excusez-moi", isCorrect: true },
              {
                id: "opt-bonjour-opener",
                text: "Bonjour",
                isCorrect: false,
                trapReason:
                  "Bonjour is right when they are already looking at you. Here you have to reach them first.",
              },
              {
                id: "opt-merci-opener",
                text: "Merci",
                isCorrect: false,
                trapReason: "Merci closes a moment. It cannot open one.",
              },
            ],
            answer: ["opt-excusez-moi"],
            reveal: {
              short: "Excusez-moi",
              explanation:
                "Excusez-moi asks for attention. Bonjour greets someone who already gave it to you. Both are polite; they do different work.",
              natural: "Excusez-moi, je voudrais un café.",
            },
          },
        },
        {
          // L1's first OPEN weave: no piece tray, no cloze, no model in front of the
          // learner. Every word in the answer is already owned — the only genuinely
          // new decision is which opener the moment needs, which s14 just taught. The
          // prompt is a directive, so the "Say this:" label is correctly suppressed.
          id: "s15-weave-excusez-moi-cafe",
          type: "weave",
          targetItemIds: [
            "chunk-excusez-moi",
            "chunk-je-voudrais",
            "noun-cafe",
            "chunk-sil-vous-plait",
          ],
          evidenceTargetItemIds: ["chunk-excusez-moi"],
          weakPointTags: ["politeness"],
          payload: {
            weaveType: "open",
            prompt: "Get their attention, then order a coffee politely.",
            context:
              "The server is turned away, wiping down the machine. Nobody has looked up yet.",
            expectedAnswers: ["Excusez-moi, je voudrais un café, s'il vous plaît."],
            acceptedAlternatives: [
              "Excusez-moi, je voudrais un café s'il vous plaît.",
              "Excusez-moi, un café s'il vous plaît.",
              "Excusez-moi, je voudrais un café.",
            ],
            reveal: {
              modelAnswer: "Excusez-moi, je voudrais un café, s'il vous plaît.",
              ifCorrect: "You reached them first, then asked. That is the whole move.",
              ifCorrectButFlat:
                "Right. The opener does its work before the request arrives.",
              ifUnderstandableButWrong:
                "Your meaning lands. Excusez-moi goes first here, because it is what makes them turn around.",
              ifMissingTargetPiece:
                "Open with excusez-moi. Bonjour greets; excusez-moi interrupts, politely.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),

  activityChain({
    id: "s23-chain-ordering-and-losing-it",
    intro:
      "Ordering is the easy half. The hard half is the sentence that comes back at you.",
    steps: [
      {
        // Truthful first contact with the tea package, placed immediately before
        // PM-011 asks for it. `un thé` arrives as ONE package inside the request
        // shape the learner already carried for coffee (un café -> same frame ->
        // un thé), so the Supported weave no longer asks for a piece the lesson
        // never showed. Exposure only: nothing is produced here, so the Supported
        // production evidence for `chunk-un-the` still comes from PM-011 alone, and
        // no independent claim is created. `noun-the` stays the linked
        // sub-identity and is never named by this screen.
        id: "s12-meet-un-the",
        type: "meet-card",
        targetItemIds: ["chunk-un-the"],
        payload: {
          fr: "Je voudrais un thé.",
          en: "I would like a tea.",
          title: "Same request, a different drink.",
          highlights: [{ text: "un thé", itemId: "chunk-un-the" }],
          tts: true,
        },
      },
      {
        // PM-011 · EV-040 · sent:l01-je-voudrais-un-the-sil-vous-plait —
        // Supported tea order. `un thé` is a CONSTITUTIVE package: visible from
        // first render, never split into un + thé, never behind the hint ladder.
        // Evidence flows to the primary tea identity only; the recycled frame
        // stays recallable with optional hint support.
        id: "s11-weave-the-order",
        type: "weave",
        targetItemIds: ["chunk-je-voudrais", "chunk-un-the", "chunk-sil-vous-plait"],
        evidenceTargetItemIds: ["chunk-un-the"],
        weakPointTags: ["politeness"],
        payload: {
          weaveType: "supported",
          prompt: "Order a tea politely.",
          context: "The server looks over. This time it's a tea.",
          suggestedPieces: [
            {
              text: "un thé",
              itemId: "chunk-un-the",
              required: true,
              label: "your drink",
              supportRole: "constitutive",
            },
            { text: "je voudrais", itemId: "chunk-je-voudrais", label: "polite request" },
            { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait", label: "polite close" },
          ],
          hintCloze: "Je voudrais ___, s'il vous plaît.",
          expectedAnswers: ["Je voudrais un thé, s'il vous plaît."],
          reveal: {
            modelAnswer: "Je voudrais un thé, s'il vous plaît.",
            ifCorrect: "Same calm frame, new drink.",
            ifCorrectButFlat: "Right. The comma settles the order before the please.",
            ifUnderstandableButWrong:
              "Your meaning lands. The drink keeps its little word: un thé.",
            ifMissingTargetPiece: "The drink piece is right there: un thé.",
          },
          validationMode: "exact-or-alternative",
        },
      },
      {
        // Payload Economy v0 §4.1/§6: the second survival formula, activated here
        // for the first time. It was registered and frozen with the original L1
        // ledger and its own registry meaning already names L1 as its home, but no
        // payload had ever reached it. Learned WHOLE, in the locked non-inverted
        // shape: nothing about vous, pouvez or inversion is taught, and the lesson
        // never decomposes it.
        id: "s17-meet-vous-pouvez-repeter",
        type: "meet-card",
        targetItemIds: ["chunk-vous-pouvez-repeter"],
        weakPointTags: ["politeness"],
        payload: {
          fr: "Vous pouvez répéter ?",
          en: "Can you say that again?",
          title: "When it goes past you.",
          highlights: [
            { text: "Vous pouvez répéter", itemId: "chunk-vous-pouvez-repeter" },
          ],
          tts: true,
        },
      },
      {
        // Second use of the formula, as the Payload Economy surface ceiling
        // requires: a supported item appears at least twice, meet plus one real
        // use. Here it joins the opener L1 already owns, a combination no screen
        // has asked for before.
        id: "s19-weave-excuse-and-repeat",
        type: "weave",
        targetItemIds: ["chunk-excusez-moi", "chunk-vous-pouvez-repeter"],
        weakPointTags: ["politeness"],
        payload: {
          weaveType: "context",
          prompt: "Cut in politely, then ask for it again.",
          context:
            "They have already turned to the next customer, and you still do not have your answer.",
          suggestedPieces: [
            { text: "excusez-moi", itemId: "chunk-excusez-moi", label: "cutting in" },
            {
              text: "vous pouvez répéter",
              itemId: "chunk-vous-pouvez-repeter",
              label: "asking again",
            },
          ],
          hintCloze: "Excusez-moi, ___ ?",
          expectedAnswers: ["Excusez-moi, vous pouvez répéter ?"],
          acceptedAlternatives: [
            "Excusez-moi, vous pouvez répéter",
            "Excusez-moi. Vous pouvez répéter ?",
          ],
          reveal: {
            modelAnswer: "Excusez-moi, vous pouvez répéter ?",
            ifCorrect:
              "Two survival moves in one breath. That is most of what a first day needs.",
            ifCorrectButFlat: "Right. Open first, then ask.",
            ifUnderstandableButWrong:
              "Your meaning lands. Excusez-moi reaches them; the second half asks.",
            ifMissingTargetPiece:
              "Excusez-moi gets their attention. Vous pouvez répéter ? asks for the line again.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // New screen family for L1. It teaches no word: it makes the kit portable
    // by showing the same request under two different openers and two different
    // drinks, so the learner leaves L1 holding a choice instead of a script.
    // Recognition only — every piece shown is already owned.
    id: "s16-natural-reveal-two-openers",
    type: "natural-reveal",
    targetItemIds: ["chunk-excusez-moi", "chunk-bonjour", "chunk-je-voudrais"],
    payload: {
      explanation:
        "The request never changed. Only the way you opened it did.\n" +
        "Bonjour when they can already see you. Excusez-moi when you have to reach them first. Everything after the opener stays exactly where you left it, which is why swapping the drink costs you nothing.",
      naturalAlternatives: [
        "Bonjour, je voudrais un café, s'il vous plaît.",
        "Excusez-moi, je voudrais un thé, s'il vous plaît.",
      ],
    },
  },


  {
    id: "s08-sayit-cafe-order",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-je-voudrais",
      "noun-cafe",
      "chunk-sil-vous-plait",
      "chunk-merci",
    ],
    weakPointTags: ["politeness", "natural-speech"],
    payload: {
      situation:
        "The counter is quiet. You have been waiting a moment, and the person behind it turns to you.",
      communicativeGoal: "Order politely, then close the exchange.",
      // Both openers are on the tray now. The learner picks the one the
      // situation earns — the person has already turned, so bonjour is the
      // truthful choice here, but excusez-moi is not marked wrong.
      suggestedPieces: [
        { text: "Bonjour", itemId: "chunk-bonjour" },
        { text: "Excusez-moi", itemId: "chunk-excusez-moi" },
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "un café", itemId: "noun-cafe" },
        { text: "un thé", itemId: "chunk-un-the" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
        { text: "merci", itemId: "chunk-merci" },
      ],
      modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
      reveal: {
        modelAnswer: "Bonjour, je voudrais un café, s'il vous plaît. Merci !",
        naturalAlternatives: [
          "Bonjour, un café s'il vous plaît. Merci !",
          "Excusez-moi, je voudrais un thé, s'il vous plaît. Merci !",
        ],
        explanation:
          "All three are natural. The longer form leans formal, the shorter leans casual, and the third opens with excusez-moi because you had to reach them first. The drink is yours to choose.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s09-recap-survival-kit",
    type: "recap",
    payload: {
      title: "You can hold a first exchange.",
      // Recycled first, then extended: line 1 names what the learner already
      // carried, lines 2 and 3 name what this lesson actually added. The tea
      // line stays honest about support and never claims the piece is owned.
      lines: [
        "You carried the café order you already had.",
        "You softened it with s'il vous plaît, and closed with merci.",
        "You ordered un thé too, with the piece in front of you.",
        "And you learned to reach someone who wasn't looking: excusez-moi.",
      ],
      piecesUsed: [
        "Bonjour",
        "Excusez-moi",
        "je voudrais",
        "un café",
        "s'il vous plaît",
        "merci",
        "un thé",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson001: Lesson = {
  id: "v1-lesson-001",
  version: "v1",
  number: 1,
  title: "Survival Kit",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "standard",
  acquisitionDemandItemIds: ["chunk-merci", "chunk-excusez-moi"],
  estimatedMinutes: 8,
  canDo: "Open a moment two ways, ask politely, and close it.",
  whyItExists:
    "L0 gave one polite café line as a first taste. L1 does not teach that line again: bonjour, je voudrais and un café are recycled straight into production, and the genuinely new ground is the polite close, merci, and the Supported tea variation. These polite chunks carry a whole first exchange before any verb system arrives in L2.",
  prerequisites: [],
  learningItems: getItems([
    "chunk-bonjour",
    "chunk-merci",
    "chunk-sil-vous-plait",
    "chunk-je-voudrais",
    "noun-cafe",
    // PR-07: the Supported tea package (primary identity only — `noun-the` is
    // its linked sub-identity and is never a lesson learning target).
    "chunk-un-the",
    // Activated in this pass: registered and frozen with the original L1
    // ledger, but never reached by a payload until now. It is the second
    // opener, and the reason L1 is no longer a single café script.
    "chunk-excusez-moi",
    // Activated in the corpus-closure pass. Payload Economy v0 §4.1 makes it a
    // SURVIVAL FORMULA -- learned whole, chip-legal despite sentence shape --
    // and §6 places it in L1. It was registered and frozen with the original L1
    // ledger and never reached by a payload until now. Supported, not a demand:
    // acquisitionDemandItemIds stays ["chunk-merci", "chunk-excusez-moi"].
    "chunk-vous-pouvez-repeter",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "L0 owns first contact with bonjour, je voudrais and un café. L1 recycles them through production only: the duplicate meet cards that restated them were removed, so the learner extends one café moment instead of meeting it twice.",
    "L1's new ground is s'il vous plaît, merci, the Supported un thé variation, and excusez-moi as a second opener.",
    "excusez-moi was registered and frozen with the original L1 ledger but no payload ever reached it. This pass activates it rather than inventing a new item, so the frozen manifest is untouched.",
    "The opener pair is taught as a choice, not a synonym: s14 makes the learner pick by situation, s15 makes them produce the choice unsupported, s16 shows both side by side. That is the anti-script move for L1.",
    "s15 is L1's first open weave: no tray, no cloze. It is only fair because every word in the answer was already produced with support earlier in the same lesson; the sole new decision is the opener.",
    "s12-meet-un-the introduces the tea package before PM-011 asks for it. It is exposure only, so the Supported production evidence still comes from PM-011 alone and no independent tea claim exists.",
    "The survival-kit insight sits after the first weave as a reflection, so the lesson never opens with two explanation screens.",
    "Compact survival kit: bonjour, je voudrais, un café, s'il vous plaît, merci. No phrasebook list of greetings.",
    "Politeness lives in the verb: je voudrais vs je veux is taught as register, never as an error.",
    "Vous register throughout. Informal tu is L3 territory.",
    "SayIt is deterministic and model-answer-only, consistent with L0.",
    "No XP / streak / level-up / mission copy.",
    "c'est, au revoir, and the wider rescue/location kit from the L1 syllabus spec are intentionally out of this compact slice.",
  ],
  qaChecks: [
    "TTS reads Bonjour, Je voudrais un café, S'il vous plaît, and Merci cleanly.",
    "Apostrophe normalization handles curly quotes in s'il vous plaît.",
    "Unaccented cafe and plait variants pass Weave via accepted alternatives.",
    "s03 trap reasons fire on veux and suis selections.",
    "TTS reads Excusez-moi cleanly; the hyphen does not split the utterance.",
    "s14 trap reasons fire on Bonjour and Merci selections, and neither is described as wrong French.",
    "s15 renders with no piece tray and no hint link, and accepts the unaccented cafe and plait variants.",
    "s16 renders as a natural-reveal screen with two alternatives and no grading affordance.",
    "No theatrical positivity tokens appear.",
    "No mention of streak, XP, level, or mission.",
  ],
};
