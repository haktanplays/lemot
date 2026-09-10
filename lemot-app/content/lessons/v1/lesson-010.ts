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
      intro:
        "Everything here is yours already. Read it as one day: you arrive somewhere new, you ask your way, something goes past you, you need a break, and you go home.",
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
            { fr: "Je ne comprends pas. C'est où ?", en: "I don't understand. Where is it?", role: "core", depth: { sound: "zhuh nuh kom-PRAHN pah. say-OO", structure: "Admit it, then ask again. Two short sentences do more than one long apology." } },
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
            { fr: "Je vais à la maison. Au revoir.", en: "I'm going home. Goodbye.", role: "core", depth: { sound: "zhuh vay a la may-ZON. oh ruh-VWAR", notice: "Two closings or one is a real choice, and it is made with the voice rather than with punctuation. Stopping fully after maison sounds calm and finished. Running straight on into au revoir sounds warm and quick, the way people leave when they are already halfway out. Neither is more correct." } },
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
      body:
        "Today: nothing new.\n" +
        "By the end: you'll have lived a whole small day in French, from pieces you already own.\n" +
        "Main pieces: c'est où, faire une pause, je vais.",
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
          weaveType: "mid",
          prompt: "Open politely, then ask where it is.",
          context:
            "Morning. Your first time in this building, and the room you need is not where you expected.",
          suggestedPieces: [
            { text: "bonjour", itemId: "chunk-bonjour", label: "hello" },
            { text: "c'est", itemId: "chunk-c-est", label: "it is" },
            { text: "où", itemId: "adverb-ou-where", label: "where" },
          ],
          hintCloze: "Bonjour. ___ ?",
          expectedAnswers: ["Bonjour. C'est où ?"],
          acceptedAlternatives: ["Bonjour, c'est où ?", "Bonjour, c'est où"],
          reveal: {
            modelAnswer: "Bonjour. C'est où ?",
            ifCorrect: "The opener and the question, working as one move.",
            ifCorrectButFlat: "Right. Bonjour first buys you the answer.",
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
      prompt: "You want to say you're going home. Which word moves you?",
      sentenceBefore: "Je ",
      sentenceAfter: " à la maison.",
      blankCount: 1,
      options: [
        { id: "opt-vais", text: "vais", isCorrect: true },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason:
            "Je suis à la maison says you are already there. You want the moving engine: je vais.",
        },
        {
          id: "opt-voudrais",
          text: "voudrais",
          isCorrect: false,
          trapReason:
            "Je voudrais wishes for something. It cannot take you home by itself.",
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
      highlights: [
        { text: "vous pouvez", itemId: "chunk-vous-pouvez" },
        { text: "m'aider", itemId: "chunk-m-aider" },
      ],
      tts: true,
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
        communicativeGoal: "Take your leave warmly: thanks, direction, goodbye.",
        suggestedPieces: [
          { text: "merci", itemId: "chunk-merci" },
          { text: "je vais", itemId: "chunk-je-vais" },
          { text: "à la maison", itemId: "chunk-a-la-maison" },
          { text: "au revoir", itemId: "chunk-au-revoir" },
        ],
        modelAnswer: "Merci. Je vais à la maison. Au revoir.",
        reveal: {
          modelAnswer: "Merci. Je vais à la maison. Au revoir.",
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
    // The payoff. Every screen before this one produced a piece of the day;
    // this one asks for the day. Nothing is supplied, nothing is prompted line
    // by line, and the bands say plainly that a shorter day still counts.
    // The three bands are deliberately DIFFERENT strings: a ladder whose rungs
    // read identically teaches nothing, which is the defect this pass repaired
    // in L6.
    id: "s13-sayit-the-whole-day",
    type: "say-it-your-way",
    targetItemIds: [
      "chunk-bonjour",
      "chunk-c-est-ou",
      "chunk-faire-une-pause",
      "chunk-je-vais",
      "chunk-au-revoir",
    ],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "Run the day again, start to finish. You arrive somewhere new and greet them, you ask where to go, you ask for a break when the afternoon runs long, and you head home at the end.",
      communicativeGoal: "Carry a whole day in French, from bonjour to au revoir.",
      answerBands: {
        minimalAcceptable: ["Bonjour. C'est où ? Merci. Au revoir."],
        good: [
          "Bonjour. C'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
        ],
        // Moving two full stops to commas is not a tier. What separates a
        // correct day from a natural one is the politeness the learner has been
        // carrying since L1 and tends to drop the moment the sentence gets
        // long: the opener on the question, the softener on the request, the
        // thanks before the goodbye. Nothing new, and it is the difference a
        // French speaker would actually hear.
        natural: [
          "Bonjour. Excusez-moi, c'est où ? Je voudrais faire une pause, s'il vous plaît. Merci. Je vais à la maison. Au revoir.",
        ],
      },
      modelAnswer:
        "Bonjour. C'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
      reveal: {
        modelAnswer:
          "Bonjour. C'est où ? Je voudrais faire une pause. Je vais à la maison. Au revoir.",
        ifCorrect:
          "That is a whole day, carried in French, with nothing in it you were taught today.",
        ifBetterThanExpected:
          "You went past the minimum. What you just wrote is a day someone could actually have.",
        naturalAlternatives: [
          "Bonjour. Excusez-moi, c'est où ? Je voudrais faire une pause, s'il vous plaît. Merci. Je vais à la maison. Au revoir.",
          "Bonjour. C'est où ? Je voudrais faire une pause. Merci. Au revoir.",
        ],
        explanation:
          "Ten lessons, and every piece of this came from one of them. The only thing that is new is how many of them you held at once.",
      },
      validationMode: "model-answer-only",
    },
  },



  {
    id: "s08-recap-full-day",
    type: "recap",
    payload: {
      title: "You lived a day in French.",
      lines: [
        "You arrived, asked where, took a break, and left well.",
        "It did not run clean, either. Something went past you, and you said so and asked again instead of nodding.",
        "Nothing was new. Everything was yours already.",
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
