import type { Lesson, LessonScreen } from "../../lessonTypes";
import { getItems } from "../../itemRegistry";
import { activityChain } from "../activityChain";

const screens: LessonScreen[] = [


  {
    // L9's world is asking for an action rather than a thing, and the social
    // shapes that make such a request land: quietly to people already with you,
    // or by opening a room that is not listening.
    id: "s20-showcase-asking-for-a-break",
    type: "showcase",
    payload: {
      intro:
        "The same polite engine that ordered you a coffee can ask for something to happen. Today it asks for time.",
      clusters: [
        {
          label: "Asking for a pause",
          sentences: [
            {
              fr: "Je voudrais faire une pause.",
              en: "I would like to take a break.",
              role: "core",
              itemIds: ["chunk-faire-une-pause"],
            },
            {
              fr: "Je voudrais faire une pause, s'il vous plaît.",
              en: "I would like to take a break, please.",
              role: "core",
            },
            { fr: "On fait une pause ?", en: "Shall we take a break?", role: "exposure" },
            { fr: "Cinq minutes, s'il vous plaît.", en: "Five minutes, please.", role: "exposure" },
          ],
        },
        {
          label: "Opening a room that is not listening",
          sentences: [
            {
              fr: "Excusez-moi, je voudrais faire une pause.",
              en: "Excuse me, I would like to take a break.",
              role: "core",
              itemIds: ["chunk-excusez-moi"],
            },
            { fr: "Excusez-moi, une question.", en: "Excuse me, one question.", role: "supported" },
            { fr: "Je peux vous demander quelque chose ?", en: "Can I ask you something?", role: "exposure" },
          ],
        },
        {
          label: "Saying why",
          sentences: [
            {
              fr: "Je voudrais faire une pause. J'ai faim.",
              en: "I would like to take a break. I'm hungry.",
              role: "core",
              itemIds: ["chunk-j-ai-faim"],
            },
            { fr: "Je suis fatigué.", en: "I'm tired.", role: "exposure" },
            { fr: "J'ai besoin de cinq minutes.", en: "I need five minutes.", role: "exposure" },
          ],
        },
        {
          label: "Other things you can ask for",
          sentences: [
            { fr: "Je voudrais un café.", en: "I would like a coffee.", role: "core" },
            { fr: "Je voudrais un verre d'eau.", en: "I would like a glass of water.", role: "exposure" },
            { fr: "Je voudrais rentrer.", en: "I would like to go home.", role: "exposure" },
          ],
        },
        {
          label: "Being answered",
          sentences: [
            { fr: "Oui, bien sûr.", en: "Yes, of course.", role: "exposure" },
            { fr: "Pas maintenant, désolé.", en: "Not now, sorry.", role: "exposure" },
          ],
        },
      ],
    },
  },


  {
    id: "s00-goal-pause",
    type: "insight-card",
    payload: {
      insightType: "lesson-goal",
      title: "Taking a pause",
      body:
        "Today: one small action, faire une pause.\n" +
        "By the end: you can ask for a break, politely.\n" +
        "Main pieces: faire une pause, une pause, je voudrais.",
    },
  },


  {
    id: "s01-meet-faire-une-pause",
    type: "meet-card",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      fr: "Je voudrais faire une pause.",
      en: "I'd like to take a break.",
      title: "Rest, said politely.",
      highlights: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
      ],
      tts: true,
    },
  },


  {
    id: "s03-fill-faire-blank",
    type: "fill-with-traps",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      prompt: "You want to ask for a break. Which word carries the action?",
      sentenceBefore: "Je voudrais ",
      sentenceAfter: " une pause.",
      blankCount: 1,
      options: [
        { id: "opt-faire", text: "faire", isCorrect: true },
        {
          id: "opt-vais",
          text: "vais",
          isCorrect: false,
          trapReason:
            "Je vais moves you somewhere. After je voudrais, the action keeps its dictionary shape: faire.",
        },
        {
          id: "opt-suis",
          text: "suis",
          isCorrect: false,
          trapReason:
            "Suis says what you are. It cannot take a pause for you.",
        },
      ],
      answer: ["opt-faire"],
      reveal: {
        short: "faire",
        explanation:
          "Faire une pause = take a break. One package, carried by je voudrais.",
        natural: "Je voudrais faire une pause.",
      },
    },
  },


  {
    // Reflection after the learner has already picked the action word out of
    // the frame, not a preamble before it.
    id: "s02-insight-voudrais-carries-actions",
    type: "insight-card",
    targetItemIds: ["chunk-faire-une-pause"],
    payload: {
      insightType: "grammar-nugget",
      title: "Same engine, a new job.",
      body:
        "Until now, je voudrais asked for a thing. It can also carry a small action: faire une pause. Take faire une pause as one piece. The wider faire universe waits.",
      examples: [
        { fr: "Je voudrais une pause.", en: "I'd like a break. (a thing)" },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break. (an action)" },
      ],
    },
  },


  {
    id: "s04-weave-ask-for-a-break",
    type: "weave",
    targetItemIds: ["chunk-faire-une-pause", "chunk-je-voudrais"],
    payload: {
      // Medium on the locked ladder: the prompt names the communicative job,
      // not the situation, so the tier says mid. Pieces stay behind the hint.
      weaveType: "mid",
      prompt: "Say you'd like to take a break.",
      context: "The afternoon has been long, and your head is getting heavy.",
      suggestedPieces: [
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
      hintCloze: "Je voudrais ___.",
      expectedAnswers: ["Je voudrais faire une pause."],
      reveal: {
        modelAnswer: "Je voudrais faire une pause.",
        ifCorrect: "The same engine, carrying its first action.",
        ifCorrectButFlat: "Right. Rest, asked for calmly.",
        ifUnderstandableButWrong:
          "Your meaning lands. The action stays whole: faire une pause.",
        ifMissingTargetPiece:
          "Start with je voudrais. Then hand it the action: faire une pause.",
      },
      validationMode: "exact-or-alternative",
    },
  },


  {
    // Reveal straight after the first real ask: the same request, and the
    // shorter thing-shaped version beside it.
    id: "s09-reveal-first-ask",
    type: "natural-reveal",
    payload: {
      modelAnswer: "Je voudrais faire une pause.",
      naturalAlternatives: ["Je voudrais une pause."],
      explanation:
        "Both are natural. Faire une pause names the act of taking a break; une pause names the break itself. The engine in front does not change.",
    },
  },

  activityChain({
    id: "s22-chain-asking-properly",
    intro:
      "The ask is already yours. What is missing is the half-second of politeness that makes it land.",
    steps: [
      {
        // One small contrast before the polite ask: which owned piece softens a
        // request, and which ones close a moment instead.
        id: "s08-fill-softener",
        type: "fill-with-traps",
        targetItemIds: ["chunk-sil-vous-plait"],
        payload: {
          prompt: "You are asking for something, not thanking anyone. Which piece softens the ask?",
          sentenceBefore: "Je voudrais faire une pause, ",
          sentenceAfter: ".",
          blankCount: 1,
          options: [
            { id: "opt-svp", text: "s'il vous plaît", isCorrect: true },
            {
              id: "opt-merci-soft",
              text: "merci",
              isCorrect: false,
              trapReason:
                "Merci thanks someone after they help. It cannot soften the asking itself.",
            },
            {
              id: "opt-au-revoir-soft",
              text: "au revoir",
              isCorrect: false,
              trapReason:
                "Au revoir closes the moment. Here you are still in it, asking.",
            },
          ],
          answer: ["opt-svp"],
          reveal: {
            short: "s'il vous plaît",
            explanation:
              "S'il vous plaît softens a request. It costs nothing and changes the tone.",
            natural: "Je voudrais faire une pause, s'il vous plaît.",
          },
        },
      },
      {
        id: "s05-weave-break-politely",
        type: "weave",
        targetItemIds: ["chunk-faire-une-pause"],
        payload: {
          // Open: the directive prompt stands alone, no target line is shown, and
          // every piece is opt-in. This is the lesson's independence summit.
          weaveType: "open",
          prompt: "Ask for a break, politely.",
          context:
            "You're working through something together. They pause: « Oui ? » It's a good moment to ask.",
          suggestedPieces: [
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
            {
              text: "s'il vous plaît",
              itemId: "chunk-sil-vous-plait",
              label: "please",
            },
          ],
          hintCloze: "Je voudrais ___, s'il vous plaît.",
          expectedAnswers: ["Je voudrais faire une pause, s'il vous plaît."],
          acceptedAlternatives: ["Je voudrais faire une pause s'il vous plaît."],
          reveal: {
            modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
            ifCorrect: "Old politeness, new rest. The pieces keep working.",
            ifCorrectButFlat: "Right. The comma gives it breathing room.",
            ifUnderstandableButWrong:
              "Your meaning lands. The please comes last, after the ask.",
            ifMissingTargetPiece:
              "Keep the sentence you had and let s'il vous plaît soften it.",
          },
          validationMode: "exact-or-alternative",
        },
      },
    ],
  }),


  {
    // Reflection: names the reach the learner just gained, adds nothing new.
    id: "s10-insight-what-you-can-ask",
    type: "insight-card",
    targetItemIds: ["chunk-je-voudrais"],
    payload: {
      insightType: "culture-bite",
      title: "One engine, plenty to ask for.",
      body:
        "Je voudrais now carries a thing or an action, and s'il vous plaît softens either one. That is enough to ask for most small things politely, without knowing a single rule.",
      examples: [
        { fr: "Je voudrais un café.", en: "I'd like a coffee." },
        { fr: "Je voudrais faire une pause.", en: "I'd like to take a break." },
      ],
    },
  },

  activityChain({
    id: "s23-chain-the-whole-request",
    intro:
      "A real request has three parts: reaching them, saying what you need, and saying why.",
    steps: [
      {
        // L9's job is CHOOSING WHAT YOU MEAN. Every earlier fill in this lesson
        // picks a word inside a frame the lesson already handed over; this one
        // picks between three whole intentions the learner owns, and only the
        // situation says which is true. All three are correct French. Only one is
        // the right thing to want.
        id: "s11-fill-which-need",
        type: "fill-with-traps",
        targetItemIds: ["chunk-faire-une-pause"],
        weakPointTags: ["natural-speech"],
        payload: {
          prompt:
            "Two hours in. You are flagging, but you do not want the day to end. Someone asks how you are doing.",
          blankCount: 1,
          options: [
            { id: "opt-pause", text: "Je voudrais faire une pause.", isCorrect: true },
            {
              id: "opt-home",
              text: "Je vais à la maison.",
              isCorrect: false,
              trapReason:
                "That ends the day instead of pausing it. Correct French, wrong thing to want here.",
            },
            {
              id: "opt-hungry",
              text: "J'ai faim.",
              isCorrect: false,
              trapReason:
                "True, maybe, but it names a different need. Nobody offers you a break for it.",
            },
          ],
          answer: ["opt-pause"],
          reveal: {
            short: "Je voudrais faire une pause.",
            explanation:
              "All three sentences are good French. Choosing between them is the whole skill: a pause stops the day for a moment, going home stops it for good.",
            natural: "Je voudrais faire une pause.",
          },
        },
      },
      {
        // Multi-part reconstruction at the lesson's lowest support: the ask alone
        // was already produced at s05, so repeating it would be the same demand
        // twice. This one adds the REASON, which the learner has owned since L4 and
        // has never once had to volunteer. Two sentences, no target line, opt-in
        // pieces.
        id: "s12-weave-ask-and-say-why",
        type: "weave",
        targetItemIds: ["chunk-faire-une-pause", "chunk-j-ai-faim"],
        weakPointTags: ["avoir-vs-etre", "natural-speech"],
        payload: {
          weaveType: "open",
          prompt: "Ask for the break, then say what is behind it.",
          context:
            "They will say yes if you tell them why. You have not eaten since morning.",
          suggestedPieces: [
            { text: "je voudrais", itemId: "chunk-je-voudrais", label: "I would like" },
            {
              text: "faire une pause",
              itemId: "chunk-faire-une-pause",
              label: "to take a break",
            },
            { text: "j'ai faim", itemId: "chunk-j-ai-faim", label: "I'm hungry" },
          ],
          hintCloze: "Je voudrais ___. J'ai ___.",
          expectedAnswers: ["Je voudrais faire une pause. J'ai faim."],
          acceptedAlternatives: [
            "Je voudrais faire une pause, j'ai faim.",
            "Je voudrais faire une pause. J'ai faim",
          ],
          reveal: {
            modelAnswer: "Je voudrais faire une pause. J'ai faim.",
            ifCorrect:
              "A request and its reason. That is longer than anything the day has asked of you so far.",
            ifCorrectButFlat:
              "Right. The ask goes first; the reason makes it easy to say yes to.",
            ifUnderstandableButWrong:
              "Your meaning lands. Ask first, then give the reason: j'ai faim.",
            ifMissingTargetPiece:
              "The ask is je voudrais faire une pause. The reason is the feeling you own already: j'ai faim.",
          },
          validationMode: "exact-or-alternative",
        },
      },
        {
          // Corpus closure. L9 asked for the break in one social shape: quietly, to
          // people already working with you. This is the other shape -- interrupting
          // a room that is not waiting for you -- using the opener the learner has
          // owned since L1 but has never put in front of this request.
          id: "s13-fill-how-to-open-the-ask",
          type: "fill-with-traps",
          targetItemIds: ["chunk-excusez-moi", "chunk-faire-une-pause"],
          evidenceTargetItemIds: ["chunk-excusez-moi"],
          weakPointTags: ["politeness"],
          payload: {
            prompt:
              "The meeting is running and nobody is looking at you. You need to stop it for ten minutes.",
            blankCount: 1,
            options: [
              {
                id: "opt-excusez",
                text: "Excusez-moi, je voudrais faire une pause.",
                isCorrect: true,
              },
              {
                id: "opt-bare",
                text: "Je voudrais faire une pause.",
                isCorrect: false,
                trapReason:
                  "Correct French, and it works when someone is already listening. Nobody here is, so it lands in the middle of somebody else's sentence.",
              },
              {
                id: "opt-non-merci",
                text: "Non merci.",
                isCorrect: false,
                trapReason:
                  "That refuses something. You are asking for something instead.",
              },
            ],
            answer: ["opt-excusez"],
            reveal: {
              short: "Excusez-moi, je voudrais faire une pause.",
              explanation:
                "The request did not change. What changed is that you had to buy the room's attention before making it.",
              natural: "Excusez-moi, je voudrais faire une pause.",
            },
          },
        },
        {
          // FRENCH-CONTEXT production, and the lesson's hardest: the room's line is
          // in French, the helper states only the learner's intention, and nothing in
          // the scene contains the answer.
          id: "s14-weave-break-in-french",
          type: "weave",
          targetItemIds: ["chunk-excusez-moi", "chunk-faire-une-pause"],
          weakPointTags: ["politeness", "natural-speech"],
          payload: {
            weaveType: "open",
            prompt: "Cut in, and ask for what you need.",
            context:
              "The room is mid-sentence and someone says: « Bonjour ? » You have been at this for three hours.",
            suggestedPieces: [
              { text: "excusez-moi", itemId: "chunk-excusez-moi", label: "cutting in" },
              { text: "je voudrais", itemId: "chunk-je-voudrais", label: "I would like" },
              {
                text: "faire une pause",
                itemId: "chunk-faire-une-pause",
                label: "to take a break",
              },
            ],
            hintCloze: "Excusez-moi, je voudrais ___.",
            expectedAnswers: ["Excusez-moi, je voudrais faire une pause."],
            acceptedAlternatives: [
              "Excusez-moi. Je voudrais faire une pause.",
              "Excusez-moi, je voudrais faire une pause, s'il vous plaît.",
            ],
            reveal: {
              modelAnswer: "Excusez-moi, je voudrais faire une pause.",
              ifCorrect:
                "Opened a room that was not open, then asked. That is the whole social move.",
              ifCorrectButFlat: "Right. Excusez-moi first, then the request.",
              ifUnderstandableButWrong:
                "Your meaning lands. Reach them first; the ask you already own does the rest.",
              ifMissingTargetPiece:
                "Excusez-moi buys the pause in the room. Je voudrais faire une pause is the one you want.",
            },
            validationMode: "exact-or-alternative",
          },
        },
    ],
  }),


  {
    id: "s06-sayit-long-afternoon",
    type: "say-it-your-way",
    targetItemIds: ["chunk-faire-une-pause"],
    weakPointTags: ["natural-speech"],
    payload: {
      situation:
        "The afternoon session has run long. Someone asks if you want to keep going.",
      communicativeGoal: "Ask for a break, politely.",
      suggestedPieces: [
        { text: "je voudrais", itemId: "chunk-je-voudrais" },
        { text: "faire une pause", itemId: "chunk-faire-une-pause" },
        { text: "s'il vous plaît", itemId: "chunk-sil-vous-plait" },
      ],
      modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
      reveal: {
        modelAnswer: "Je voudrais faire une pause, s'il vous plaît.",
        naturalAlternatives: ["Je voudrais faire une pause."],
        explanation:
          "Both are natural. S'il vous plaît softens the ask; the shorter form works when the moment is already gentle.",
      },
      validationMode: "model-answer-only",
    },
  },


  {
    id: "s07-recap-pause",
    type: "recap",
    payload: {
      title: "You can ask for rest.",
      lines: [
        "You asked for a break, politely.",
        "Je voudrais carried an action for the first time, not just a thing.",
        "Faire une pause stayed one piece. The rest of faire can wait.",
      ],
      piecesUsed: ["je voudrais", "faire une pause", "une pause", "s'il vous plaît"],
      nextLabel: "Continue",
    },
  },
];

export const lesson009: Lesson = {
  id: "v1-lesson-009",
  version: "v1",
  number: 9,
  title: "Faire une pause",
  phase: "first-ascent",
  monolingualMode: "english-guided",
  primaryArchetype: "chunk-natural-speech",
  journeyRole: "doorway",
  acquisitionDemandItemIds: ["chunk-faire-une-pause"],
  estimatedMinutes: 9,
  canDo: "Ask for a break, politely, in French.",
  whyItExists:
    "After movement (L7) and orientation (L8), the learner needs a way to talk about doing, and the L09 syllabus deliberately opens faire on ONE narrow, human sense: taking a pause. This compact pilot keeps that slice and nothing else: faire une pause as one active package, carried by the L1 je voudrais engine, softened by s'il vous plaît. The wider faire universe (weather, sport, idioms, the paradigm, je fais production) stays unopened, per the split-sense guardrail.",
  prerequisites: ["v1-lesson-008"],
  learningItems: getItems([
    "chunk-faire-une-pause",
    "noun-pause",
    "chunk-je-voudrais",
    "chunk-sil-vous-plait",
    // Recycled from L4 for the founder-usable pass, never re-taught: s12 asks
    // the learner to supply the REASON behind the request, and j'ai faim is the
    // feeling they have owned since L4 and have never had to volunteer. It is a
    // target there, so the lesson must be able to state its treatment.
    // acquisitionDemandItemIds stays exactly ["chunk-faire-une-pause"].
    "chunk-j-ai-faim",
    // Corpus closure: L1's opener, recycled so the request has a second social
    // shape -- interrupting a room rather than asking people already listening.
    // Never re-taught, never a demand.
    "chunk-excusez-moi",
  ]),
  screens,
  offlineBehavior: { canRunOffline: true, fallbackMode: "model-answer-only" },
  designNotes: [
    "Aligned with docs/syllabus/L09-faire-small-actions-pause.lesson-spec.md pause slice: chunk-faire-une-pause active + noun-pause supported; the scene is rest after a long stretch, per the spec (cafe deliberately absent).",
    "Progression: context, open, then open again. The lesson reaches genuine open production and the founder-usable pass added a SECOND open action (s12) that is strictly harder than the first: two sentences instead of one, and the second is volunteered rather than prompted. No weave carries constitutive support, so evidence class is unchanged.",
    "Founder-usable expansion: L9's job is CHOOSING WHAT YOU MEAN. s11 is the first fill in the lesson where every option is correct French and only the situation decides, and s12 makes the learner supply a reason nobody asked for. Both recycle owned material (je vais from L7, j'ai faim from L4); no new acquisition.",
    "Rhythm deliberately differs from L7 and L8: fill before the insight, the reveal sits immediately after the first ask, and the contrast fill lands between the two weaves.",
    "Added screens carry one role each: s09 reveals the thing-versus-action pair after the first real ask, s08 contrasts which owned piece softens a request, s10 names the reach gained without adding material.",
    "je fais is NOT active-produced and does not appear: the spec holds je fais at supported (for je ne fais pas ca), which this compact pilot defers together with ca and on fait to a later pass.",
    "je voudrais + faire une pause is deliberate recombination of the owned L1 engine with the new action package: the spec's central production target (Je voudrais faire une pause).",
    "No faire paradigm, no weather/sport/idiom faire, no qu'est-ce que, no grammar table.",
    "Recycled load: chunk-je-voudrais and chunk-sil-vous-plait (L1); the new package stays the headline of every screen.",
    "No learner-facing lesson numbers, and the one-off cargo metaphor is retired.",
    "No XP / streak / level-up / mission copy. SayIt is deterministic model-answer-only.",
    "Learner-visible: Home lists L1-L24 under a linear unlock, so this lesson opens once L8 is finished. The older note claiming Home capped the path at L6 was stale and was corrected during native verification of this path.",
  ],
  qaChecks: [
    "TTS reads Je voudrais faire une pause, s'il vous plait cleanly.",
    "s03 trap reasons fire on vais and suis.",
    "s08 trap reasons fire on merci and au revoir.",
    "s05 accepts the no-comma variant via acceptedAlternatives.",
    "Recap chips are packages/atoms only; the full sentence never appears as a chip.",
    "No cafe appears anywhere in L9.",
    "No streak/XP/mission language anywhere.",
  ],
};
