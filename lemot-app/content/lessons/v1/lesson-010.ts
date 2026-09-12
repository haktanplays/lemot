import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [



  {
    // L10 adds no new language. Its showcase is the whole first-ten repertoire
    // laid out as a day, so the learner can see that the summit ahead is built
    // entirely from things already on this page.
    id: "s20-showcase-a-small-day",
    type: "showcase",
    payload: {
      // "Everything here is yours already" was not true: m'aider arrives in
      // this lesson as recognition-only preview. The claim is now sized to the
      // truth, which costs the sentence nothing and keeps the lesson honest.
      intro:
        "Almost all of this is already yours. Read it as one day: you arrive somewhere new, you ask your way, something goes past you, you need a break, and you go home. One line near the end is a preview, and it is marked.",
      clusters: [
        {
          label: "Arriving and asking",
          sentences: [
            { fr: "Bonjour. C'est où ?", en: "Hello. Where is it?", role: "core", itemIds: ["chunk-c-est-ou"] },
            { fr: "Excusez-moi, c'est où ?", en: "Excuse me, where is it?", role: "core" },
            { fr: "Est-ce que c'est ici ?", en: "Is it here?", role: "core", itemIds: ["chunk-est-ce-que"] },
            { fr: "Je suis ici.", en: "I'm here.", role: "core", itemIds: ["chunk-je-suis-ici"] },
          ],
        },
        {
          label: "When it goes wrong",
          sentences: [
            { fr: "Je ne comprends pas.", en: "I don't understand.", role: "core", itemIds: ["chunk-je-ne-comprends-pas"], flat: "formula" },
            { fr: "Je ne comprends pas. C'est où ?", en: "I don't understand. Where is it?", role: "core", depth: { sound: "Two nasal vowels in comprends, then où held long. Listen to both halves before you try them.", structure: "Admit it, then ask again. Two short sentences do more than one long apology." } },
            {
              fr: "Je ne comprends pas. Vous pouvez répéter ?",
              en: "I don't understand. Can you say that again?",
              role: "core",
              itemIds: ["chunk-vous-pouvez-repeter"],
              pieces: ["Je ne comprends pas", "vous pouvez", "répéter"],
            },
            { fr: "Ce n'est pas ici.", en: "It's not here.", role: "core", itemIds: ["chunk-ce-n-est-pas"] },
          ],
        },
        {
          label: "Getting through the middle of the day",
          sentences: [
            {
              fr: "Je voudrais faire une pause.",
              en: "I would like to take a break.",
              role: "core",
              itemIds: ["chunk-faire-une-pause"],
            },
            { fr: "J'ai faim.", en: "I'm hungry.", role: "core", itemIds: ["chunk-j-ai-faim"] },
            { fr: "J'ai une question.", en: "I have a question.", role: "core", itemIds: ["chunk-j-ai-une-question"] },
            { fr: "Je voudrais un café, s'il vous plaît.", en: "I would like a coffee, please.", role: "core" },
            { fr: "Non merci.", en: "No thanks.", role: "core", itemIds: ["chunk-non-merci"] },
          ],
        },
        {
          label: "Going home",
          sentences: [
            { fr: "Je vais à la maison.", en: "I'm going home.", role: "core", itemIds: ["chunk-je-vais"] },
            { fr: "Je vais à la maison. Au revoir.", en: "I'm going home. Goodbye.", role: "core", depth: { sound: "Each half lands on its last syllable. That end-weight is what makes it sound French rather than translated.", notice: "Two closings or one is a real choice, and it is made with the voice rather than with punctuation. Stopping fully after maison sounds calm and finished. Running straight on into au revoir sounds warm and quick, the way people leave when they are already halfway out. Neither is more correct." } },
            { fr: "Merci. Je vais à la maison. Au revoir.", en: "Thanks. I'm going home. Goodbye.", role: "core", depth: { usage: "The merci is not padding. In French it is how you signal that the visit is ending, before you say where you are going." } },
            { fr: "Bonne soirée !", en: "Have a good evening!", role: "exposure", flat: "formula" },
          ],
        },
        {
          label: "The whole day",
          sentences: [
            {
              fr: "Bonjour. C'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
              en: "Hello. Where is it? I would like to take a break. I'm going home. Goodbye.",
              role: "core",
              depth: { structure: "A whole day in five sentences, and not one of them is new. The greeting came from your first lesson, the question from your eighth, the break from your ninth.", usage: "Nobody says all five in a row. They are the five moments a day actually has." },
            },
            { fr: "Vous pouvez m'aider ?", en: "Can you help me?", role: "exposure", itemIds: ["chunk-vous-pouvez", "chunk-m-aider"] },
          ],
        },
      ],
    },
  },



  {
    id: "s00-goal-integration",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "A full small day",
      // THE ARC, not a materials list, and not a claim that nothing is new.
      // L10 closes the L0-L10 stretch, so it is allowed to feel like an
      // occasion; it is not allowed to congratulate the learner before they
      // have done anything, or to celebrate at them.
      body:
        "Arrive. Ask. Pause. Leave.\n" +
        "Four moments, and you already own the French for each one.\n" +
        "Almost everything today is yours. One piece is new, and it is only there to be recognised.",
    },
  },


  activityChain({
    id: "s22-chain-the-morning",
    intro:
      "The day starts the way every day here starts, and you already have every piece of it.",
    steps: [
      {
        // The day-arc opens on French, not on a second explanation: owned pieces,
        // re-met inside the situation the whole lesson will run through. Nothing
        // here is new, so first production can follow immediately.
        id: "s09-meet-morning-arrival",
        type: "meet-card",
        targetItemIds: ["chunk-bonjour", "chunk-c-est-ou"],
        payload: {
          fr: "Bonjour. C'est où ?",
          en: "Hello. Where is it?",
          title: "The day starts at a door.",
          highlights: [
            { text: "Bonjour", itemId: "chunk-bonjour" },
            { text: "C'est", itemId: "chunk-c-est" },
            { text: "où", itemId: "adverb-ou-where" },
          ],
          tts: true,
        },
      },
      {
        id: "s02-weave-arrive-ask-where",
        type: "weave",
        targetItemIds: ["chunk-c-est-ou", "adverb-ou-where"],
        payload: {
          // Medium on the locked ladder: the prompt names the communicative job,
          // not the situation, so the tier says mid.
          // L8 already asked for "Bonjour. C'est où ?" at OPEN support, so this
          // would be the same act with a chip tray added. What L10 can ask for
          // that L8 could not is the register: the opener that cuts in without
          // cutting across, which the learner has owned since L1 and drops the
          // moment the sentence gets long.
          weaveType: "mid",
          prompt: "Open politely, reach them, then ask where it is.",
          context:
            "Morning. Your first time in this building, the room you need is not where you expected, and nobody is looking at you.",
          suggestedPieces: [
            { text: "bonjour", itemId: "chunk-bonjour", label: "hello" },
            { text: "excusez-moi", itemId: "chunk-excusez-moi", label: "reaching them" },
            { text: "c'est", itemId: "chunk-c-est", label: "it is" },
            { text: "où", itemId: "adverb-ou-where", label: "where" },
          ],
          hintCloze: "Bonjour. Excusez-moi, ___ ?",
          expectedAnswers: ["Bonjour. Excusez-moi, c'est où ?"],
          acceptedAlternatives: [
            "Bonjour, excusez-moi, c'est où ?",
            "Bonjour. Excusez-moi, c'est où",
          ],
          reveal: {
            modelAnswer: "Bonjour. Excusez-moi, c'est où ?",
            ifCorrect: "Greeted, reached them, then asked. Nobody had to guess you were talking to them.",
            ifCorrectButFlat: "Right. Bonjour opens the room; excusez-moi picks the person.",
            ifUnderstandableButWrong:
              "Your meaning lands. A native opens the moment first: Bonjour. C'est où ?",
            ifMissingTargetPiece: "Start with bonjour, then let c'est où do the asking.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),



  {
    id: "s03-fill-engine-chooser",
    type: "fill-with-traps",
    targetItemIds: ["chunk-je-vais"],
    payload: {
      // THE ENGINES, CHOSEN BY JOB. This asked "which word moves you?" with
      // the destination already printed after the blank, so the sentence
      // answered its own question. The three engines are only worth naming if
      // the learner picks between them on what they are FOR, so the scene now
      // states the intention and the sentence does not give the shape away.
      prompt:
        "It is the end of the day and you want to tell them where you are headed. Which engine does that job?",
      sentenceBefore: "",
      sentenceAfter: " à la maison.",
      blankCount: 1,
      options: [
        { id: "opt-vais", text: "Je vais", isCorrect: true },
        {
          id: "opt-suis",
          text: "Je suis",
          isCorrect: false,
          trapReason:
            "That is the engine for where you ARE. Je suis à la maison says you are already home, which is not what you are telling them.",
        },
        {
          id: "opt-voudrais",
          text: "Je voudrais",
          isCorrect: false,
          trapReason:
            "That is the engine for what you WANT. It would ask for home rather than say you are heading there.",
        },
      ],
      answer: ["opt-vais"],
      reveal: {
        short: "vais",
        explanation:
          "Three engines, one job each. Moving somewhere is je vais.",
        natural: "Je vais à la maison.",
      },
    },
  },



  {
    // Reflection, not preamble: the three engines are named only after the
    // learner has already used two of them today.
    id: "s01-insight-three-engines",
    type: "insight-card",
    targetItemIds: ["chunk-je-suis", "chunk-je-voudrais", "chunk-je-vais"],
    payload: {
      insightType: "grammar-nugget",
      title: "Three engines, three jobs.",
      body:
        "You now carry three small engines. Je suis says what or where you are. Je voudrais asks for things and actions. Je vais moves you. Today they take turns.",
      examples: [
        { fr: "Je suis ici.", en: "I'm here. (being)" },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break. (asking)" },
        { fr: "Je vais à la maison.", en: "I'm going home. (moving)" },
      ],
    },
  },



  {
    id: "s04-weave-midday-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      // Open: nothing here is new, so the directive stands alone and every
      // piece is opt-in.
      weaveType: "open",
      // L9 already asked for "Je voudrais faire une pause." on its own. Asking
      // again with a new backdrop would still be the same act. Someone has
      // asked how you are, so the answer carries its own reason: L4's j'ai
      // faim, then yesterday's request. Both pieces are already owned.
      prompt: "Say why you're flagging, then ask for the break.",
      context:
        "Midday. You've been on your feet since you arrived, and someone asks how you're doing.",
      suggestedPieces: [
        { text: "j'ai faim", itemId: "chunk-j-ai-faim", label: "I'm hungry" },
        {
          text: "je voudrais",
          itemId: "chunk-je-voudrais",
          label: "I would like",
        },
        {
          text: "faire une pause",
          itemId: "chunk-faire-une-pause",
          label: "to take a break",
        },
      ],
      hintCloze: "J'ai faim. Je voudrais ___.",
      expectedAnswers: ["J'ai faim. Je voudrais faire une pause."],
      acceptedAlternatives: [
        "J'ai faim, je voudrais faire une pause.",
        "J ai faim. Je voudrais faire une pause.",
      ],
      reveal: {
        modelAnswer: "J'ai faim. Je voudrais faire une pause.",
        ifCorrect: "Yesterday's sentence, back when you actually need it.",
        ifCorrectButFlat: "Right. The same ask, in a new moment.",
        ifUnderstandableButWrong:
          "Your meaning lands. The ask you already know still fits here.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },



  {
    // Reveal after the midday ask: the same request with and without the
    // softener, so the day's middle beat lands before the evening one.
    id: "s10-reveal-midday-break",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je voudrais faire une pause.",
      naturalAlternatives: ["Je voudrais faire une pause, s'il vous plaît."],
      explanation:
        "Both are natural. Among people you have been working with all morning, the short form is enough; s'il vous plaît adds a little distance when you want it.",
    },
  },


  activityChain({
    id: "s21-chain-the-repair",
    intro:
      "The day has run cleanly so far. This is the part where it stops, and where you keep it going anyway.",
    steps: [
        {
          // A real day does not run clean, and until now this one did. The learner
          // has owned je ne comprends pas since L3 and used it in L6 to reach someone
          // again; here it does the job it exists for, in the middle of a day that
          // was going well. Recognition first, production next.
          id: "s11-fill-lost-the-thread",
          type: "fill-with-traps",
          targetItemIds: ["chunk-je-ne-comprends-pas"],
          weakPointTags: ["negation", "natural-speech"],
          payload: {
            prompt:
              "They answer you warmly, at speed, with three details you did not catch. They are already turning away.",
            blankCount: 1,
            options: [
              { id: "opt-not-followed", text: "Je ne comprends pas.", isCorrect: true },
              {
                id: "opt-not-here",
                text: "Ce n'est pas ici.",
                isCorrect: false,
                trapReason:
                  "That corrects a place. Nobody was wrong about the place; you simply did not follow.",
              },
              {
                id: "opt-refuse",
                text: "Non merci.",
                isCorrect: false,
                trapReason:
                  "That turns something down. They were helping, and the day stops here instead of continuing.",
              },
            ],
            answer: ["opt-not-followed"],
            reveal: {
              short: "Je ne comprends pas.",
              explanation:
                "Saying it keeps the day going. The alternative is nodding, walking off, and still not knowing where to go.",
              natural: "Je ne comprends pas.",
            },
          },
        },
        {
          // The repair, produced. Deliberately NOT L6's repair line: there the
          // learner reached someone again and stopped. Here they say they did not
          // follow AND put the question back, which is the move that actually
          // rescues a day. Both halves are owned (L3 and L8) and have never been
          // joined before.
          id: "s12-weave-say-so-and-ask-again",
          type: "weave",
          targetItemIds: ["chunk-je-ne-comprends-pas", "chunk-c-est-ou"],
          weakPointTags: ["negation", "politeness"],
          payload: {
            weaveType: "open",
            prompt: "Say you did not follow, then put the question back.",
            context:
              "They have paused, willing to go again. You get one clean try at this.",
            suggestedPieces: [
              {
                text: "je ne comprends pas",
                itemId: "chunk-je-ne-comprends-pas",
                label: "I don't understand",
              },
              { text: "c'est", itemId: "chunk-c-est", label: "it is" },
              { text: "où", itemId: "adverb-ou-where", label: "where" },
            ],
            hintCloze: "Je ne comprends pas. ___ ?",
            expectedAnswers: ["Je ne comprends pas. C'est où ?"],
            acceptedAlternatives: [
              "Je ne comprends pas. C'est où",
              "Je ne comprends pas, c'est où ?",
              // Corpus-closure reconciliation (Pass D, light by design): by L10 the
              // learner also owns the repair pair completed in L6, so asking them to
              // go again instead of re-asking the question is an equally true repair
              // of the same moment. Accepted, not modelled -- the day's own model
              // still puts the question back.
              "Je ne comprends pas. Vous pouvez répéter ?",
              "Je ne comprends pas. Vous pouvez répéter",
            ],
            reveal: {
              modelAnswer: "Je ne comprends pas. C'est où ?",
              ifCorrect:
                "That is the whole repair: name the problem, then ask again. The day carries on.",
              ifCorrectButFlat:
                "Right. Saying it plainly is faster than pretending you followed.",
              ifUnderstandableButWrong:
                "Your meaning lands. Say you did not follow first, then ask the question again.",
              ifMissingTargetPiece:
                "Je ne comprends pas names the problem. C'est où ? asks again.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),
  {
    id: "s06-meet-preview-help",
    type: "meet-card",
    targetItemIds: ["chunk-vous-pouvez", "chunk-m-aider"],
    payload: {
      fr: "Vous pouvez m'aider ?",
      en: "Can you help me?",
      // Preview convention: "Just listen." opens every recognition-only card,
      // so the learner can tell at a glance that nothing is being asked of
      // them. This sentence is never produced, never a suggested piece, and
      // never a recap chip.
      title: "Just listen. This one arrives next.",
      // WHERE IT COMES FROM, in three lines and no further. The founder met
      // this sentence as an unfamiliar whole and had no way in, which wastes
      // the one thing a preview is for. aider is the verb; me + aider elides
      // to m'aider; vous pouvez is already theirs. That is the entire lesson
      // here: not object pronouns, not elision as a system, just enough to
      // recognise a sentence they are not being asked to say.
      note:
        "aider means to help. me + aider becomes m'aider. You already own vous pouvez, so most of this is language you have. You do not need to use it yet: notice how much of it you can already follow.",
      highlights: [
        { text: "vous pouvez", itemId: "chunk-vous-pouvez" },
        { text: "m'aider", itemId: "chunk-m-aider" },
      ],
      tts: true,
    },
  },


  {
    // CULTURE that changes what the learner does, not trivia about France.
    //
    // A beginner reads merci as politeness padding and drops it when they are
    // in a hurry. In a French exchange it is doing structural work: it is the
    // signal that the thing is ending. Saying where you are going without it
    // can read as breaking off rather than leaving.
    //
    // L10 is the right place because it is the only lesson where the learner
    // closes a whole day, and the note was collapsed on its own Showcase.
    id: "s26-insight-merci-closes",
    type: "insight-card",
    // NO TARGETS, on purpose. A curiosity card is input: the learner reads it
    // and nothing about what they own changes. Declaring a target here would
    // have the act of looking at a card count toward mastery of the item it
    // mentions, which is exactly the semantics this layer must not touch.
    // The guard caught the first version of this card doing it.
    // targetItemIds: ["chunk-merci"],
    payload: {
      insightType: "culture-bite",
      title: "Merci is not padding.",
      body:
        "It is how a French exchange signals that it is ending, before anyone says goodbye. " +
        "Drop it and saying where you are going can read as breaking off rather than leaving well.",
      examples: [
        {
          fr: "Merci. Je vais à la maison. Au revoir.",
          en: "Thanks. I'm going home. Goodbye.",
          note: "Three beats: close the exchange, say where you are going, then leave.",
        },
      ],
    },
  },

  activityChain({
    id: "s23-chain-closing-the-day",
    intro:
      "You have been here since the morning. Leaving well is the last thing the day asks of you.",
    steps: [
    {
      id: "s05-weave-close-the-day",
      type: "weave",
      targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
      payload: {
        // The day's summit: open production, no more scaffolded than L6's own
        // closing weave.
        weaveType: "open",
        // The day's summit: open production, no more scaffolded than L6's own
        // closing weave. L10 says the same closing again as an open say-it-your-
        // way further down, with merci added; making this rung produce that
        // longer form too would ask for one sentence twice and hand the
        // scaffolded rung the harder job.
        prompt: "Evening. Say you're going home, then say goodbye.",
        context:
          "The day at the new place is done. People are still talking, but you're finished.",
        suggestedPieces: [
          { text: "je vais", itemId: "chunk-je-vais", label: "I'm going" },
          {
            text: "à la maison",
            itemId: "chunk-a-la-maison",
            label: "home",
          },
          {
            text: "au revoir",
            itemId: "chunk-au-revoir",
            label: "goodbye",
          },
        ],
        hintCloze: "Je vais ___. Au revoir.",
        expectedAnswers: ["Je vais à la maison. Au revoir."],
        acceptedAlternatives: ["Je vais à la maison, au revoir."],
        reveal: {
          modelAnswer: "Je vais à la maison. Au revoir.",
          // THE ASSEMBLED REFLECTION, and it belongs HERE rather than in a
          // whole-day textbox: this is the last beat, so by the time the
          // learner reads it they have actually produced every beat it names.
          // A model that dumps the day in one box shows them five sentences
          // they never wrote; this shows them four they did.
          explanation:
            "That is the day closed. You greeted someone at a door you had never used, asked where to go, said so when the answer went past you, asked for a break when the afternoon ran long, and said where you were heading. Four different engines, one day.",
          ifCorrect: "You opened the day with bonjour. Now you can close it.",
          ifCorrectButFlat: "Right. The day closes the way it opened.",
          ifUnderstandableButWrong:
            "Your meaning lands. Where you are going comes first, then the goodbye.",
          ifMissingTargetPiece:
            "Lead with je vais à la maison, then let au revoir close the door.",
        },
        validationMode: "exact-or-alternative",
      },
    },
    {
      id: "s07-sayit-take-your-leave",
      type: "say-it-your-way",
      targetItemIds: ["chunk-je-vais", "chunk-a-la-maison"],
      weakPointTags: ["natural-speech"],
      payload: {
        situation:
          "The end of your first full day at the new place. Someone walks you to the door.",
        // L7's closing say-it already asked for "Merci. Je vais à la maison. Au
        // revoir." at the same open support. A whole day is worth more thanks
        // than a single errand, so the one difference is the one a French
        // speaker would actually make.
        communicativeGoal: "Take your leave warmly: thanks the size of the day, direction, goodbye.",
        suggestedPieces: [
          { text: "merci beaucoup", itemId: "chunk-merci-beaucoup" },
          { text: "je vais", itemId: "chunk-je-vais" },
          { text: "à la maison", itemId: "chunk-a-la-maison" },
          { text: "au revoir", itemId: "chunk-au-revoir" },
        ],
        modelAnswer: "Merci beaucoup. Je vais à la maison. Au revoir.",
        reveal: {
          modelAnswer: "Merci beaucoup. Je vais à la maison. Au revoir.",
          naturalAlternatives: ["Je vais à la maison. Au revoir."],
          explanation:
            "Both are natural. Merci thanks the day; je vais à la maison says where you're off to; au revoir closes it gently.",
        },
        validationMode: "model-answer-only",
      },
    },
    ],
  }),






  {
    id: "s08-recap-full-day",
    type: "recap",
    payload: {
      title: "A small day, put together.",
      // TONE. It read "You lived a day in French" over "Nothing was new.
      // Everything was yours already." The first is the product congratulating
      // itself and the second is false: m'aider was new. What is left is what
      // actually happened, in the order it happened.
      lines: [
        "You arrived, asked where, took a break, and left.",
        "It did not run clean, either. Something went past you, and you said so and asked again instead of nodding.",
        "One piece was new today, and you only had to recognise it.",
        "Next: a small new engine, for asking if you can.",
      ],
      piecesUsed: [
        "bonjour",
        "c'est",
        "où",
        "je voudrais",
        "faire une pause",
        "je vais",
        "à la maison",
        "au revoir",
        "je ne comprends pas",
      ],
      nextLabel: "Continue",
    },
  },
];

export const lesson010: Lesson = {
  id: "v1-lesson-010",
  version: "v1",
  number: 10,
  title: "Une petite journée",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "integration",
  acquisitionDemandItemIds: [],
  estimatedMinutes: 10,
  canDo: "Arrive, ask where, take a break, and leave.",
  whyItExists:
    "Per the L10 after-class integration spec, this lesson adds (almost) nothing new: it recombines L7-L9 with the L1-L6 base under a single day-arc narrative, so the learner feels the pieces working together rather than in isolation. The only genuinely new material is one recognition-only preview: Vous pouvez m'aider ?, planted as the doorway L11 will open. Retrieval in fresh contexts, not novelty, is the point.",
  prerequisites: ["v1-lesson-009"],
  learningItems: getItems([
    "chunk-c-est-ou",
    "adverb-ou-where",
    "chunk-c-est",
    "chunk-bonjour",
    "chunk-je-voudrais",
    "chunk-faire-une-pause",
    "chunk-je-vais",
    "chunk-a-la-maison",
    "chunk-au-revoir",
    "chunk-vous-pouvez",
    "chunk-m-aider",
    // Same defect class repaired in L3 and L4, and the last one left open:
    // s01-insight-three-engines targets chunk-je-suis while learningItems never
    // declared it, so resolveLessonTreatmentForItem had no treatment to state.
    // It stayed latent only because insight-card records no evidence today —
    // which is a property of the renderer, not a licence for the content. It is
    // a recycle owned by L2, named here as one of the day's three engines;
    // acquisitionDemandItemIds stays empty because L10 is an integration lesson.
    "chunk-je-suis",
    // Recycled from L3 for the founder-usable pass. L10 had no repair beat at
    // all: the day ran clean from arrival to goodbye, which is the one thing a
    // real day never does. s11 recognises the moment and s12 produces the fix,
    // so the item is a target on both and the lesson must state its treatment.
    // acquisitionDemandItemIds stays empty: this is integration, not a demand.
    "chunk-je-ne-comprends-pas",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L10-after-class-integration.lesson-spec.md: near-zero new lexis; the lesson is deliberate spaced retrieval of L7 (je vais + a la maison), L8 (c'est ou), and L9 (faire une pause) inside one day-arc.",
    "Integration repair: the lesson now opens Goal then a French re-meet of owned material inside the day-arc (s09), so first production follows real contact instead of two explanations. The three-engines insight moved to a reflective position after two engines have already been used today.",
    "Progression: context, open, open, open. The closing weave is still open, so the day's summit is no more scaffolded than L6's. No weave carries constitutive support, so evidence class is unchanged.",
    "Founder-usable expansion: L10 is the PAYOFF, so the pass added the two things an integration lesson was missing rather than more acquisition. s11/s12 give the day a repair beat (it previously ran clean from arrival to goodbye, which no real day does) and s13 asks for the whole day in one unsupplied production. Everything recycles L1-L9; acquisitionDemandItemIds stays empty.",
    "s13 answer bands are three DIFFERENT strings on purpose. The identical good/natural bands shipped in L6 were repaired in the same pass, and repeating that shape here would teach nothing: the natural rung lifts by rhythm (the comma joins L7 and L8 already ship as accepted forms), not by new vocabulary.",
    "Vous pouvez m'aider ? appears ONLY as a recognition meet-card (future hook for L11 per the spec): it is never a production target, never a suggested piece elsewhere, and never a recap chip. Its title opens with the reusable preview convention 'Just listen.'",
    "The help question is NOT a registry chunk (Haktan decision, PR #168 rework): it is a composed model sentence over the split pieces chunk-vous-pouvez + chunk-m-aider, which the preview highlights separately. Both pieces carry registry status supported (their steady-state L11 role); their L10 use is recognition-only by lesson design, since registry status is static.",
    "De-scope vs spec: the spec's fatigue combo (je suis fatigue) is dropped because fatigue is not in the shipped registry; the break weave carries that communicative moment instead.",
    "s03 fill anchors meaning first (you want to say you're going home) so je suis stays a fair trap: grammatical, but the wrong meaning.",
    "No learner-facing lesson numbers.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Learner-visible: Home lists L1-L24 under a linear unlock, so this lesson opens once L9 is finished. The older note claiming Home capped the path at L6 was stale and was corrected during native verification of this path.",
  ],
  qaChecks: [
    "TTS reads Vous pouvez m'aider ? cleanly on the preview card.",
    "s03 trap reasons fire on suis and voudrais.",
    "s02 accepts the comma and no-question-mark variants via acceptedAlternatives.",
    "Recap chips are atoms/packages only; no full sentence appears as a chip.",
    "vous pouvez m'aider never appears as a production target or recap chip.",
    "No streak/XP/mission language anywhere.",
  ],
};
