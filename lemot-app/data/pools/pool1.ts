/**
 * Exercise Pool — Lesson 1: Survival Kit
 *
 * DESIGN PRINCIPLES:
 * 1. Every sentence is UNIQUE — no repeated sentences across difficulties
 * 2. Every context forces REASONING, not memorization
 * 3. Multi-blank options are grouped per blank position (blankOpts)
 * 4. Weave contexts are situational — learner must THINK, not recall
 * 5. Difficulty: L1-L5 tier → 50% easy, 30% medium, 20% hard
 */
import type {
  FillItem,
  QuizItem,
  BuildItem,
  CombineItem,
  WeaveItem,
  ReviewItem,
  Example,
} from "@/lib/types";

// ═══════════════════════════════════════════════════════════════════
// EXAMPLES (20) — graduated difficulty, unique sentences
// ═══════════════════════════════════════════════════════════════════

export const examples1: Example[] = [
  // Easy — single phrase, direct meaning
  { fr: "Bonjour, monsieur.", en: "Hello, sir.", bridge: "Hello, monsieur.", diff: "easy" },
  { fr: "Merci, madame.", en: "Thank you, ma'am.", bridge: "Merci, ma'am.", diff: "easy" },
  { fr: "Au revoir !", en: "Goodbye!", bridge: "Au revoir!", diff: "easy" },
  { fr: "Oui, s'il vous plaît.", en: "Yes, please.", bridge: "Oui, s'il vous plaît.", diff: "easy" },
  { fr: "Non, merci.", en: "No, thank you.", bridge: "Non, merci.", diff: "easy" },
  { fr: "Pardon !", en: "Sorry!", bridge: "Pardon!", diff: "easy" },
  { fr: "Salut, ça va ?", en: "Hi, how are you?", bridge: "Hi, ça va?", diff: "easy" },
  { fr: "Bonsoir, comment allez-vous ?", en: "Good evening, how are you?", bridge: "Good evening, comment allez-vous?", diff: "easy" },
  // Medium — short exchanges, 1-2 clauses
  { fr: "Bonjour, je voudrais un thé, s'il vous plaît.", en: "Hello, I'd like a tea, please.", bridge: "Hello, je would like un thé, please.", diff: "medium" },
  { fr: "Excusez-moi, où est la pharmacie ?", en: "Excuse me, where is the pharmacy?", bridge: "Excuse me, où est la pharmacie?", diff: "medium" },
  { fr: "Je ne parle pas bien français.", en: "I don't speak French well.", bridge: "Je ne speak pas bien français.", diff: "medium" },
  { fr: "Pouvez-vous parler plus lentement ?", en: "Can you speak more slowly?", bridge: "Can you parler plus lentement?", diff: "medium" },
  { fr: "Je voudrais l'addition, s'il vous plaît.", en: "I'd like the bill, please.", bridge: "Je would like l'addition, please.", diff: "medium" },
  { fr: "C'est combien, le croissant ?", en: "How much is the croissant?", bridge: "How much, le croissant?", diff: "medium" },
  // Hard — multi-sentence, real interactions
  { fr: "Bonjour ! Je voudrais un café crème et un pain au chocolat. C'est combien ?", en: "Hello! I'd like a coffee with cream and a chocolate pastry. How much is it?", bridge: "Hello! Je voudrais un café crème et un pain au chocolat. How much?", diff: "hard" },
  { fr: "Excusez-moi, je cherche la gare. Je ne comprends pas cette carte.", en: "Excuse me, I'm looking for the station. I don't understand this map.", bridge: "Excuse me, je cherche la gare. Je ne comprends pas this carte.", diff: "hard" },
  { fr: "Bonsoir ! Merci pour cette soirée. Au revoir et à bientôt !", en: "Good evening! Thanks for this evening. Goodbye and see you soon!", bridge: "Bonsoir! Merci pour cette soirée. Au revoir et see you soon!", diff: "hard" },
  { fr: "Pardon, monsieur. Pouvez-vous m'aider ? Je suis perdu.", en: "Sorry, sir. Can you help me? I'm lost.", bridge: "Pardon, monsieur. Can you m'aider? Je suis lost.", diff: "hard" },
  { fr: "Je voudrais deux baguettes tradition et un éclair. Merci beaucoup !", en: "I'd like two traditional baguettes and an eclair. Thank you very much!", bridge: "Je voudrais deux baguettes tradition et an éclair. Merci beaucoup!", diff: "hard" },
  { fr: "Bonjour, je voudrais réserver une table pour ce soir. C'est possible ?", en: "Hello, I'd like to book a table for tonight. Is that possible?", bridge: "Hello, je voudrais réserver a table pour ce soir. Is that possible?", diff: "hard" },
];

// ═══════════════════════════════════════════════════════════════════
// WEAVE FILL (50) — every sentence unique, context forces reasoning
// ═══════════════════════════════════════════════════════════════════

export const fillFG1: FillItem[] = [
  // ── 1 blank — Easy (15) ──
  { s: "I [___] a coffee, please.", a: "voudrais", o: ["voudrais", "comprends", "suis", "parle"], ctx: "You just sat down at a terrace café. The waiter is waiting.", fr: "Je voudrais un café, s'il vous plaît.", diff: "easy" },
  { s: "[___], is there a metro nearby?", a: "Excusez-moi", o: ["Excusez-moi", "Merci", "Bonjour", "Voilà"], ctx: "You're lost in a neighborhood you've never visited.", fr: "Excusez-moi, y a-t-il un métro près d'ici ?", diff: "easy" },
  { s: "I don't [___] what you said.", a: "comprends", o: ["comprends", "voudrais", "parle", "suis"], ctx: "A shop owner just rattled off prices in rapid French.", fr: "Je ne comprends pas ce que vous avez dit.", diff: "easy" },
  { s: "Thank you, [___]!", a: "au revoir", o: ["au revoir", "bonjour", "pardon", "salut"], ctx: "The pharmacist hands you your medicine. You're about to leave.", fr: "Merci, au revoir !", diff: "easy" },
  { s: "[___], how are you today?", a: "Bonjour", o: ["Bonjour", "Merci", "Pardon", "Voilà"], ctx: "You walk into your office at 9 AM and see a colleague.", fr: "Bonjour, comment allez-vous aujourd'hui ?", diff: "easy" },
  { s: "[___], welcome to our restaurant.", a: "Bonsoir", o: ["Bonsoir", "Bonjour", "Salut", "Pardon"], ctx: "It's 8:30 PM. A hostess greets you at the door.", fr: "Bonsoir, bienvenue dans notre restaurant.", diff: "easy" },
  { s: "Can you [___] that, please?", a: "répéter", o: ["répéter", "manger", "dormir", "partir"], ctx: "The train announcer spoke too fast through the speakers.", fr: "Pouvez-vous répéter cela, s'il vous plaît ?", diff: "easy" },
  { s: "[___] very much for your help!", a: "Merci", o: ["Merci", "Bonjour", "Salut", "Pardon"], ctx: "A stranger walked you three blocks to find the museum.", fr: "Merci beaucoup pour votre aide !", diff: "easy" },
  { s: "I [___] a baguette, please.", a: "voudrais", o: ["voudrais", "comprends", "suis", "parle"], ctx: "Morning rush at the bakery. There's a line behind you.", fr: "Je voudrais une baguette, s'il vous plaît.", diff: "easy" },
  { s: "[___]! I didn't see you there.", a: "Pardon", o: ["Pardon", "Bonjour", "Merci", "Voilà"], ctx: "You accidentally knocked someone's bag off a bus seat.", fr: "Pardon, je ne vous avais pas vu.", diff: "easy" },
  { s: "Yes, [___].", a: "s'il vous plaît", o: ["s'il vous plaît", "au revoir", "merci", "pardon"], ctx: "The waiter asks if you want water. You do.", fr: "Oui, s'il vous plaît.", diff: "easy" },
  { s: "[___], see you next week!", a: "Au revoir", o: ["Au revoir", "Bonjour", "Merci", "Salut"], ctx: "Leaving your French class on Friday afternoon.", fr: "Au revoir, à la semaine prochaine !", diff: "easy" },
  { s: "I don't [___]. Please speak English.", a: "comprends", o: ["comprends", "voudrais", "Bonjour", "Merci"], ctx: "A taxi driver asks you something and you have no idea.", fr: "Je ne comprends pas. Parlez anglais, s'il vous plaît.", diff: "easy" },
  { s: "[___], is this seat taken?", a: "Excusez-moi", o: ["Excusez-moi", "Au revoir", "Merci", "Voilà"], ctx: "Crowded train. You spot an empty seat next to someone.", fr: "Excusez-moi, cette place est-elle prise ?", diff: "easy" },
  { s: "[___] ! Here's your change.", a: "Voilà", o: ["Voilà", "Merci", "Bonjour", "Pardon"], ctx: "A cashier hands you your change. French equivalent of 'there you go'.", fr: "Voilà, voici votre monnaie.", diff: "easy" },

  // ── 2 blanks — Medium (15) ──
  { s: "[___], I [___] a table for tonight.", a: "Bonsoir", blanks: ["Bonsoir", "voudrais"], blankOpts: [["Bonsoir", "Merci", "Pardon"], ["voudrais", "comprends", "suis"]], ctx: "You walk into a restaurant at 7 PM without a reservation.", fr: "Bonsoir, je voudrais une table pour ce soir.", diff: "medium" },
  { s: "I [___] two croissants and a [___], please.", a: "voudrais", blanks: ["voudrais", "café"], blankOpts: [["voudrais", "comprends", "parle"], ["café", "gare", "revoir"]], ctx: "Sunday morning at a patisserie. You're ordering breakfast for two.", fr: "Je voudrais deux croissants et un café, s'il vous plaît.", diff: "medium" },
  { s: "[___], I don't [___] this menu.", a: "Excusez-moi", blanks: ["Excusez-moi", "comprends"], blankOpts: [["Excusez-moi", "Merci", "Bonjour"], ["comprends", "voudrais", "parle"]], ctx: "At a countryside restaurant. The menu is entirely in French with no pictures.", fr: "Excusez-moi, je ne comprends pas ce menu.", diff: "medium" },
  { s: "[___] for helping me, [___]!", a: "Merci", blanks: ["Merci", "au revoir"], blankOpts: [["Merci", "Pardon", "Bonjour"], ["au revoir", "bonjour", "salut"]], ctx: "Your Airbnb host helped with luggage, directions, and tips. Time to go.", fr: "Merci de m'avoir aidé, au revoir !", diff: "medium" },
  { s: "[___], can you [___] more slowly?", a: "Pardon", blanks: ["Pardon", "parler"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["parler", "manger", "dormir"]], ctx: "A museum guide is explaining a painting but you can't keep up.", fr: "Pardon, pouvez-vous parler plus lentement ?", diff: "medium" },
  { s: "I [___] the bill, [___].", a: "voudrais", blanks: ["voudrais", "s'il vous plaît"], blankOpts: [["voudrais", "comprends", "suis"], ["s'il vous plaît", "au revoir", "pardon"]], ctx: "You've been waiting 20 minutes after finishing your meal.", fr: "Je voudrais l'addition, s'il vous plaît.", diff: "medium" },
  { s: "[___], I don't [___]. Pouvez-vous parler plus lentement ?", a: "Pardon", blanks: ["Pardon", "comprends"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["comprends", "voudrais", "Merci"]], ctx: "A local asks you for directions. You want to help but your French is limited.", fr: "Pardon, je ne comprends pas. Pouvez-vous parler plus lentement ?", diff: "medium" },
  { s: "[___]! I [___] a taxi, please.", a: "Excusez-moi", blanks: ["Excusez-moi", "voudrais"], blankOpts: [["Excusez-moi", "Merci", "Salut"], ["voudrais", "comprends", "parle"]], ctx: "It's raining. You need a cab to the airport.", fr: "Excusez-moi, je voudrais un taxi, s'il vous plaît.", diff: "medium" },
  { s: "[___], I [___] a room for tonight.", a: "Bonsoir", blanks: ["Bonsoir", "voudrais"], blankOpts: [["Bonsoir", "Bonjour", "Salut"], ["voudrais", "comprends", "suis"]], ctx: "Checking into a hotel after a late arrival.", fr: "Bonsoir, je voudrais une chambre pour ce soir.", diff: "medium" },
  { s: "[___] beaucoup ! [___] !", a: "Merci", blanks: ["Merci", "Au revoir"], blankOpts: [["Merci", "Pardon", "Bonjour"], ["Au revoir", "Bonsoir", "Salut"]], ctx: "A stranger carried your suitcase up three flights of stairs. You thank them and leave.", fr: "Merci beaucoup ! Au revoir !", diff: "medium" },
  { s: "[___], I [___] to check in, please.", a: "Bonsoir", blanks: ["Bonsoir", "voudrais"], blankOpts: [["Bonsoir", "Bonjour", "Salut"], ["voudrais", "comprends", "suis"]], ctx: "You arrive at a small hotel after dark. The receptionist looks up.", fr: "Bonsoir, je voudrais m'enregistrer, s'il vous plaît.", diff: "medium" },
  { s: "I don't [___]. Can you [___], please?", a: "comprends", blanks: ["comprends", "répéter"], blankOpts: [["comprends", "voudrais", "parle"], ["répéter", "manger", "partir"]], ctx: "Someone gave you an address verbally but you kept mishearing it.", fr: "Je ne comprends pas. Pouvez-vous répéter, s'il vous plaît ?", diff: "medium" },
  { s: "[___], [___] est la pharmacie ?", a: "Excusez-moi", blanks: ["Excusez-moi", "où"], blankOpts: [["Excusez-moi", "Au revoir", "Voilà"], ["où", "qui", "quand"]], ctx: "It's 7 PM and you urgently need medicine. Most shops close early.", fr: "Excusez-moi, où est la pharmacie ?", diff: "medium" },
  { s: "[___], I [___] to change my reservation.", a: "Bonjour", blanks: ["Bonjour", "voudrais"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "suis"]], ctx: "Calling a restaurant to move your dinner from 7 to 8 PM.", fr: "Bonjour, je voudrais changer ma réservation.", diff: "medium" },
  { s: "Non [___], je [___] juste regarder.", a: "merci", blanks: ["merci", "voudrais"], blankOpts: [["merci", "pardon", "bonjour"], ["voudrais", "comprends", "suis"]], ctx: "A shopkeeper approaches. You want to browse without pressure.", fr: "Non merci, je voudrais juste regarder.", diff: "medium" },

  // ── 3 blanks — Hard (10) ──
  { s: "[___], I [___] a [___] crème, please.", a: "Bonjour", blanks: ["Bonjour", "voudrais", "café"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "suis"], ["café", "salut", "pardon"]], ctx: "First time at a Parisian café. You want a café crème (coffee with milk).", fr: "Bonjour, je voudrais un café crème, s'il vous plaît.", diff: "hard" },
  { s: "[___], I ne [___] pas. Pouvez-vous [___] ?", a: "Excusez-moi", blanks: ["Excusez-moi", "comprends", "répéter"], blankOpts: [["Excusez-moi", "Merci", "Bonjour"], ["comprends", "voudrais", "parle"], ["répéter", "manger", "partir"]], ctx: "Directions involved 4 turns and you're lost.", fr: "Excusez-moi, je ne comprends pas. Pouvez-vous répéter ?", diff: "hard" },
  { s: "[___] ! [___] ! I [___] a table for four people.", a: "Bonsoir", blanks: ["Bonsoir", "Excusez-moi", "voudrais"], blankOpts: [["Bonsoir", "Salut", "Merci"], ["Excusez-moi", "Au revoir", "Voilà"], ["voudrais", "comprends", "Bonjour"]], ctx: "Your family just arrived. The restaurant looks busy.", fr: "Bonsoir ! Excusez-moi ! Je voudrais une table pour quatre personnes.", diff: "hard" },
  { s: "Je ne [___] [___] bien. Pouvez-vous [___] ?", a: "comprends", blanks: ["comprends", "pas", "répéter"], blankOpts: [["comprends", "voudrais", "parle"], ["pas", "bien", "mal"], ["répéter", "manger", "partir"]], ctx: "A police officer is asking questions. You need them to slow down.", fr: "Je ne comprends pas bien. Pouvez-vous répéter ?", diff: "hard" },
  { s: "[___] ! [___] beaucoup ! [___] !", a: "Bonjour", blanks: ["Bonjour", "Merci", "Au revoir"], blankOpts: [["Bonjour", "Pardon", "Bonsoir"], ["Merci", "Voilà", "Salut"], ["Au revoir", "Bonjour", "Salut"]], ctx: "A local walked with you for 10 minutes. You greet, thank, and part ways.", fr: "Bonjour ! Merci beaucoup ! Au revoir !", diff: "hard" },
  { s: "[___] ! Je ne [___] [___] l'annonce.", a: "Pardon", blanks: ["Pardon", "comprends", "pas"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["comprends", "voudrais", "parle"], ["pas", "bien", "mal"]], ctx: "Gare du Nord. Platform change announced only in French.", fr: "Pardon, je ne comprends pas l'annonce.", diff: "hard" },
  { s: "[___]! I [___] a pain au chocolat and a [___].", a: "Bonjour", blanks: ["Bonjour", "voudrais", "baguette"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "parle"], ["baguette", "gare", "hôtel"]], ctx: "You're grabbing breakfast at a boulangerie before catching a train.", fr: "Bonjour, je voudrais un pain au chocolat et une baguette.", diff: "hard" },
  { s: "Je ne [___] [___]. [___], pouvez-vous répéter ?", a: "comprends", blanks: ["comprends", "pas", "Pardon"], blankOpts: [["comprends", "voudrais", "suis"], ["pas", "bien", "mal"], ["Pardon", "Bonjour", "Voilà"]], ctx: "At a doctor's office trying to explain your symptoms.", fr: "Je ne comprends pas. Pardon, pouvez-vous répéter ?", diff: "hard" },
  { s: "[___], [___] est la banque ? [___] !", a: "Excusez-moi", blanks: ["Excusez-moi", "où", "Merci"], blankOpts: [["Excusez-moi", "Au revoir", "Salut"], ["où", "qui", "quand"], ["Merci", "Pardon", "Voilà"]], ctx: "You ran out of cash and need to find a bank.", fr: "Excusez-moi, où est la banque ? Merci !", diff: "hard" },
  { s: "[___] ! Je [___] changer mon vol, [___] vous plaît.", a: "Pardon", blanks: ["Pardon", "voudrais", "s'il"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["voudrais", "comprends", "parle"], ["s'il", "au", "en"]], ctx: "At the airline counter. Your connecting flight was cancelled.", fr: "Pardon, je voudrais changer mon vol, s'il vous plaît.", diff: "hard" },

  // ── 4 blanks — Expert (5) ──
  { s: "[___], I [___] a [___] and a [___], please.", a: "Bonjour", blanks: ["Bonjour", "voudrais", "café", "croissant"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "suis"], ["café", "taxi", "ticket"], ["croissant", "baguette", "carte"]], ctx: "Early morning. You're the first customer and the baker is still arranging pastries.", fr: "Bonjour, je voudrais un café et un croissant, s'il vous plaît.", diff: "hard" },
  { s: "[___] ! Je ne [___] [___]. Pouvez-vous [___] ?", a: "Pardon", blanks: ["Pardon", "comprends", "pas", "répéter"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["comprends", "voudrais", "suis"], ["pas", "bien", "mal"], ["répéter", "manger", "partir"]], ctx: "First day in France. Signs, menus, conversations — everything is in French.", fr: "Pardon, je ne comprends pas. Pouvez-vous répéter ?", diff: "hard" },
  { s: "[___] ! [___] ! I [___] a room for two nights, [___] vous plaît.", a: "Bonsoir", blanks: ["Bonsoir", "Excusez-moi", "voudrais", "s'il"], blankOpts: [["Bonsoir", "Salut", "Merci"], ["Excusez-moi", "Au revoir", "Voilà"], ["voudrais", "comprends", "parle"], ["s'il", "au", "en"]], ctx: "You arrive at a countryside inn exhausted after a long drive.", fr: "Bonsoir ! Excusez-moi, je voudrais une chambre pour deux nuits, s'il vous plaît.", diff: "hard" },
  { s: "[___], je [___] l'addition, [___] vous plaît. [___] !", a: "Excusez-moi", blanks: ["Excusez-moi", "voudrais", "s'il", "Merci"], blankOpts: [["Excusez-moi", "Merci", "Bonjour"], ["voudrais", "comprends", "suis"], ["s'il", "au", "en"], ["Merci", "Pardon", "Voilà"]], ctx: "Dinner was great but the waiter disappeared. You wave him over.", fr: "Excusez-moi, je voudrais l'addition, s'il vous plaît. Merci !", diff: "hard" },
  { s: "[___] ! [___], je ne [___] [___]. Pouvez-vous répéter ?", a: "Excusez-moi", blanks: ["Excusez-moi", "Pardon", "comprends", "pas"], blankOpts: [["Excusez-moi", "Merci", "Salut"], ["Pardon", "Bonjour", "Voilà"], ["comprends", "voudrais", "parle"], ["pas", "bien", "mal"]], ctx: "At a busy market. The vendor is explaining prices but you're overwhelmed.", fr: "Excusez-moi ! Pardon, je ne comprends pas. Pouvez-vous répéter ?", diff: "hard" },

  // ── Full French — sentence is all French (5) ──
  { s: "Bonjour, je [___] un thé vert.", a: "voudrais", o: ["voudrais", "comprends", "suis", "parle"], ctx: "You want green tea, not black. Pick the right verb.", fr: "Bonjour, je voudrais un thé vert.", diff: "hard" },
  { s: "Je ne [___] pas cette question.", a: "comprends", o: ["comprends", "voudrais", "parle", "suis"], ctx: "A customs officer asked you something complex.", fr: "Je ne comprends pas cette question.", diff: "hard" },
  { s: "[___] est l'arrêt de bus ?", a: "Où", o: ["Où", "Qui", "Quand", "Comment"], ctx: "You need the bus stop, not the station.", fr: "Où est l'arrêt de bus ?", diff: "medium" },
  { s: "Je [___] une baguette, s'il vous plaît.", a: "voudrais", o: ["voudrais", "comprends", "Merci", "Pardon"], ctx: "Ordering bread — the classic L1 pattern.", fr: "Je voudrais une baguette, s'il vous plaît.", diff: "medium" },
  { s: "Pouvez-vous [___] plus lentement ?", a: "parler", o: ["parler", "manger", "dormir", "partir"], ctx: "The guide talks at lightning speed. You need them to slow down.", fr: "Pouvez-vous parler plus lentement ?", diff: "medium" },
];

// ═══════════════════════════════════════════════════════════════════
// FRENCH FILL (50) — all-French sentences, unique contexts
// ═══════════════════════════════════════════════════════════════════

export const fillBlanks1: FillItem[] = [
  // ── 1 blank — Easy (15) ──
  { s: "___, je voudrais un café.", a: "Bonjour", o: ["Bonjour", "Au revoir", "Merci", "Pardon"], ctx: "10 AM at a sidewalk café. Always greet before ordering.", diff: "easy" },
  { s: "Excusez-moi, ___ est la gare ?", a: "où", o: ["où", "qui", "quand", "comment"], ctx: "You missed your bus and need the train station instead.", diff: "easy" },
  { s: "Je ne ___ pas.", a: "comprends", o: ["comprends", "parle", "voudrais", "suis"], ctx: "A ticket machine shows instructions only in French.", diff: "easy" },
  { s: "Merci beaucoup, ___ !", a: "au revoir", o: ["au revoir", "bonjour", "salut", "pardon"], ctx: "The florist wrapped your bouquet beautifully. Time to leave.", diff: "easy" },
  { s: "Je ___ un croissant, s'il vous plaît.", a: "voudrais", o: ["voudrais", "suis", "comprends", "parle"], ctx: "You point at the last croissant in the display case.", diff: "easy" },
  { s: "___, comment allez-vous ?", a: "Bonjour", o: ["Bonjour", "Merci", "Pardon", "Voilà"], ctx: "You enter the dentist's waiting room. The receptionist smiles.", diff: "easy" },
  { s: "S'il vous ___.", a: "plaît", o: ["plaît", "merci", "bien", "soir"], ctx: "Completing the magic word — 'please.'", diff: "easy" },
  { s: "___, excusez-moi.", a: "Pardon", o: ["Pardon", "Bonjour", "Merci", "Salut"], ctx: "Your elbow hit a wine glass at the next table.", diff: "easy" },
  { s: "Je voudrais un ___, s'il vous plaît.", a: "thé", o: ["thé", "gare", "revoir", "bonjour"], ctx: "Ordering your afternoon drink. You prefer tea over coffee.", diff: "easy" },
  { s: "___, madame.", a: "Bonsoir", o: ["Bonsoir", "Salut", "Merci", "Pardon"], ctx: "Arriving at a dinner party at 8 PM. The hostess opens the door.", diff: "easy" },
  { s: "Pouvez-vous ___ ?", a: "répéter", o: ["répéter", "manger", "dormir", "partir"], ctx: "The pharmacist just explained dosage but you missed it.", diff: "easy" },
  { s: "___ revoir !", a: "Au", o: ["Au", "Le", "Un", "Du"], ctx: "The article that goes with 'revoir' to form goodbye.", diff: "easy" },
  { s: "Merci ___ !", a: "beaucoup", o: ["beaucoup", "bonjour", "revoir", "plaît"], ctx: "A stranger found and returned your lost phone.", diff: "easy" },
  { s: "___, ça va ?", a: "Salut", o: ["Salut", "Merci", "Pardon", "Voilà"], ctx: "You run into your French classmate at the supermarket.", diff: "easy" },
  { s: "Je ___ un pain au chocolat.", a: "voudrais", o: ["voudrais", "comprends", "suis", "parle"], ctx: "You see the last pain au chocolat. Better order fast.", diff: "easy" },

  // ── 2 blanks — Medium (15) ──
  { s: "___, je ___ réserver une chambre.", a: "Bonjour", blanks: ["Bonjour", "voudrais"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "suis"]], ctx: "Calling a small hotel. You need a room for the weekend.", diff: "medium" },
  { s: "Je ne ___ ___.", a: "comprends", blanks: ["comprends", "pas"], blankOpts: [["comprends", "voudrais", "parle"], ["pas", "bien", "mal"]], ctx: "The train conductor explains a delay. You catch zero words.", diff: "medium" },
  { s: "___ beaucoup, ___ !", a: "Merci", blanks: ["Merci", "monsieur"], blankOpts: [["Merci", "Bonjour", "Pardon"], ["monsieur", "madame", "mademoiselle"]], ctx: "An elderly man helped you carry groceries up the stairs.", diff: "medium" },
  { s: "Excusez-moi, ___ est la pharmacie ? ___ !", a: "où", blanks: ["où", "Merci"], blankOpts: [["où", "qui", "quand"], ["Merci", "Pardon", "Voilà"]], ctx: "Your child has a fever. You desperately need a pharmacy.", diff: "medium" },
  { s: "Je ___ un café ___, s'il vous plaît.", a: "voudrais", blanks: ["voudrais", "crème"], blankOpts: [["voudrais", "comprends", "suis"], ["crème", "noir", "vert"]], ctx: "You want coffee with milk, not black. Specify the type.", diff: "medium" },
  { s: "___, je ___ l'addition.", a: "Excusez-moi", blanks: ["Excusez-moi", "voudrais"], blankOpts: [["Excusez-moi", "Merci", "Salut"], ["voudrais", "comprends", "suis"]], ctx: "The waiter hasn't noticed you're finished. Get his attention.", diff: "medium" },
  { s: "Pouvez-___ parler plus ___ ?", a: "vous", blanks: ["vous", "lentement"], blankOpts: [["vous", "nous", "tu"], ["lentement", "vite", "bien"]], ctx: "Your Airbnb host is giving you the WiFi password way too fast.", diff: "medium" },
  { s: "Je ne ___ pas. ___, pouvez-vous répéter ?", a: "comprends", blanks: ["comprends", "Pardon"], blankOpts: [["comprends", "voudrais", "parle"], ["Pardon", "Bonjour", "Voilà"]], ctx: "A taxi driver starts chatting. You need to set expectations.", diff: "medium" },
  { s: "___, je ___ une baguette, s'il vous plaît.", a: "Bonjour", blanks: ["Bonjour", "voudrais"], blankOpts: [["Bonjour", "Merci", "Salut"], ["voudrais", "comprends", "parle"]], ctx: "Buying bread for a picnic by the Seine.", diff: "medium" },
  { s: "___, merci ___ !", a: "Bonjour", blanks: ["Bonjour", "beaucoup"], blankOpts: [["Bonjour", "Pardon", "Salut"], ["beaucoup", "bien", "peu"]], ctx: "The hotel receptionist upgraded your room. Greet warmly and thank.", diff: "medium" },
  { s: "___, ___ est l'hôtel Lumière ?", a: "Pardon", blanks: ["Pardon", "où"], blankOpts: [["Pardon", "Bonjour", "Merci"], ["où", "qui", "quand"]], ctx: "Dragging your suitcase down a cobblestone street, looking for your hotel.", diff: "medium" },
  { s: "Je ___ un café, s'il vous ___.", a: "voudrais", blanks: ["voudrais", "plaît"], blankOpts: [["voudrais", "comprends", "parle"], ["plaît", "merci", "bien"]], ctx: "Lunch was lovely. Time for coffee before catching your train.", diff: "medium" },
  { s: "___, ___ est la tour Eiffel ?", a: "Excusez-moi", blanks: ["Excusez-moi", "où"], blankOpts: [["Excusez-moi", "Merci", "Salut"], ["où", "qui", "quand"]], ctx: "First time in Paris. You can see the tower but don't know how to walk there.", diff: "medium" },
  { s: "Je ___ un éclair au ___, s'il vous plaît.", a: "voudrais", blanks: ["voudrais", "chocolat"], blankOpts: [["voudrais", "comprends", "suis"], ["chocolat", "fromage", "vin"]], ctx: "At a fancy patisserie. The chocolate eclairs look incredible.", diff: "medium" },
  { s: "___, à ___ !", a: "Au revoir", blanks: ["Au revoir", "bientôt"], blankOpts: [["Au revoir", "Bonjour", "Merci"], ["bientôt", "demain", "soir"]], ctx: "Leaving your new French friend's apartment. You'll see them soon.", diff: "medium" },

  // ── 3 blanks — Hard (10) ──
  { s: "___, je ___ un café et un ___, s'il vous plaît.", a: "Bonjour", blanks: ["Bonjour", "voudrais", "croissant"], blankOpts: [["Bonjour", "Merci", "Pardon"], ["voudrais", "comprends", "suis"], ["croissant", "baguette", "ticket"]], ctx: "First morning in Lyon. The café smells amazing. You want the full French breakfast.", diff: "hard" },
  { s: "Je ___ ___ ___.", a: "ne", blanks: ["ne", "comprends", "pas"], blankOpts: [["ne", "je", "le"], ["comprends", "voudrais", "parle"], ["pas", "bien", "mal"]], ctx: "Immigration officer at the border asks something. Full negation needed.", diff: "hard" },
  { s: "___, ___ est la pharmacie ? ___ !", a: "Excusez-moi", blanks: ["Excusez-moi", "où", "Merci"], blankOpts: [["Excusez-moi", "Bonjour", "Salut"], ["où", "qui", "quand"], ["Merci", "Pardon", "Voilà"]], ctx: "Sunday afternoon. Everything looks closed. You need allergy medicine.", diff: "hard" },
  { s: "___, je ___ une baguette, ___ !", a: "Bonjour", blanks: ["Bonjour", "voudrais", "Merci"], blankOpts: [["Bonjour", "Merci", "Salut"], ["voudrais", "comprends", "suis"], ["Merci", "Pardon", "Voilà"]], ctx: "You're hosting dinner and buying fresh bread from the boulangerie.", diff: "hard" },
  { s: "Pouvez-___ ___, s'il ___ plaît ?", a: "vous", blanks: ["vous", "répéter", "vous"], blankOpts: [["vous", "nous", "tu"], ["répéter", "manger", "partir"], ["vous", "nous", "me"]], ctx: "The hotel concierge gave you a restaurant name but you didn't catch it.", diff: "hard" },
  { s: "___ ___ ! ___ !", a: "Merci", blanks: ["Merci", "beaucoup", "Au revoir"], blankOpts: [["Merci", "Bonjour", "Pardon"], ["beaucoup", "bien", "mal"], ["Au revoir", "Bonsoir", "Salut"]], ctx: "Your neighbor brought you homemade soup. You thank warmly and say goodbye.", diff: "hard" },
  { s: "___, je ne ___ ___. Pouvez-vous répéter ?", a: "Pardon", blanks: ["Pardon", "comprends", "pas"], blankOpts: [["Pardon", "Bonjour", "Voilà"], ["comprends", "voudrais", "parle"], ["pas", "bien", "mal"]], ctx: "You're trying to file a police report but struggling with the language.", diff: "hard" },
  { s: "___, je ___ réserver ___ table pour ce soir.", a: "Bonsoir", blanks: ["Bonsoir", "voudrais", "une"], blankOpts: [["Bonsoir", "Bonjour", "Merci"], ["voudrais", "comprends", "suis"], ["une", "la", "un"]], ctx: "Calling a Michelin-starred restaurant. You're nervous.", diff: "hard" },
  { s: "___, je voudrais un café, ___ vous ___.", a: "Bonjour", blanks: ["Bonjour", "s'il", "plaît"], blankOpts: [["Bonjour", "Bonsoir", "Salut"], ["s'il", "où", "je"], ["plaît", "comprends", "suis"]], ctx: "Ordering coffee politely. Greet, then build the magic word piece by piece.", diff: "hard" },
  { s: "___ ! ___ ___ !", a: "Merci", blanks: ["Merci", "Au", "revoir"], blankOpts: [["Merci", "Bonjour", "Pardon"], ["Au", "Le", "Un"], ["revoir", "soir", "voir"]], ctx: "Quick exit from a shop. Three words, all gratitude.", diff: "hard" },

  // ── Faux amis trap (5) ──
  { s: "Harry Potter a une ___ magique.", a: "baguette", o: ["baguette", "café", "gare", "carte"], ctx: "The French word for 'wand' is the same as bread! Context matters.", diff: "hard" },
  { s: "Le chef d'orchestre lève sa ___.", a: "baguette", o: ["baguette", "café", "merci", "bonjour"], ctx: "The conductor lifts his... stick. Not bread this time.", diff: "hard" },
  { s: "Mettez les ___ sur la table.", a: "baguettes", o: ["baguettes", "cafés", "gares", "mercis"], ctx: "Setting chopsticks for Asian dinner — baguettes = sticks!", diff: "hard" },
  { s: "Je mange une ___ avec du fromage.", a: "baguette", o: ["baguette", "café", "croissant", "gare"], ctx: "Classic French lunch — bread with cheese.", diff: "easy" },
  { s: "Cette ___ est très croustillante.", a: "baguette", o: ["baguette", "gare", "carte", "voilà"], ctx: "Complimenting the bakery's crusty bread.", diff: "medium" },
];

// ═══════════════════════════════════════════════════════════════════
// QUIZ (50) — varied formats, unique questions
// ═══════════════════════════════════════════════════════════════════

export const quiz1: QuizItem[] = [
  // ── Standard MCQ — Easy (15) ──
  { q: "You walk into a boulangerie. What's the first thing you should say?", a: "Bonjour", o: ["Merci", "Bonjour", "Au revoir", "Je voudrais"], ctx: "In France, greeting comes before everything.", diff: "easy" },
  { q: "You want to order politely. Which verb form should you use?", a: "Je voudrais", o: ["Je veux", "Je voudrais", "Donne-moi", "Je prends"], diff: "easy" },
  { q: "The clock shows 20:30. Which greeting fits?", a: "Bonsoir", o: ["Bonjour", "Bonsoir", "Salut", "Bonne nuit"], ctx: "20:30 = 8:30 PM.", diff: "easy" },
  { q: "What does 'merci beaucoup' mean?", a: "Thank you very much", o: ["Thank you very much", "Good morning", "Goodbye", "I'm sorry"], diff: "easy" },
  { q: "Your friend texts you. Which greeting is appropriate?", a: "Salut", o: ["Excusez-moi", "Bonsoir", "Salut", "S'il vous plaît"], ctx: "Texting = casual.", diff: "easy" },
  { q: "What does 'je ne comprends pas' mean?", a: "I don't understand", o: ["I don't understand", "I would like", "I'm sorry", "I don't know"], diff: "easy" },
  { q: "'Au revoir' literally translates to...", a: "Until seeing again", o: ["Goodbye forever", "Until seeing again", "Good day", "Have a nice trip"], diff: "easy" },
  { q: "Someone hands you your order. They say...", a: "Voilà", o: ["Voilà", "Au revoir", "Pardon", "Salut"], diff: "easy" },
  { q: "You step on someone's foot on the metro. You say...", a: "Pardon !", o: ["Bonjour !", "Pardon !", "Merci !", "Salut !"], diff: "easy" },
  { q: "What does 's'il vous plaît' literally mean?", a: "If it pleases you", o: ["If it pleases you", "Thank you very much", "I'm sorry", "Good morning"], diff: "easy" },
  { q: "'Comme ci, comme ça' — how is the person feeling?", a: "So-so", o: ["Great", "So-so", "Terrible", "Excited"], diff: "easy" },
  { q: "Which word completes: 'Pouvez-vous ___ ?'", a: "répéter", o: ["répéter", "manger", "dormir", "chanter"], ctx: "You need someone to say it again.", diff: "easy" },
  { q: "Which is more formal: 'tu' or 'vous'?", a: "Vous", o: ["Tu", "Vous", "Both equal", "Neither"], diff: "easy" },
  { q: "'Excusez-moi' is used to...", a: "Get someone's attention politely", o: ["Say goodbye", "Get someone's attention politely", "Order food", "Apologize for being late"], diff: "easy" },
  { q: "What do you say when leaving a shop?", a: "Au revoir", o: ["Bonjour", "Au revoir", "Je voudrais", "Pardon"], diff: "easy" },

  // ── Negative (5) ──
  { q: "Which greeting should you NEVER use with your professor?", a: "Salut", o: ["Bonjour", "Bonsoir", "Salut", "Bonjour, monsieur"], negative: true, diff: "medium" },
  { q: "Which is NOT a polite way to order?", a: "Donne-moi un café", o: ["Je voudrais un café", "Un café, s'il vous plaît", "Donne-moi un café", "Excusez-moi, je voudrais..."], negative: true, diff: "medium" },
  { q: "Which is NOT a French goodbye?", a: "Merci", o: ["Au revoir", "À bientôt", "À demain", "Merci"], negative: true, diff: "easy" },
  { q: "Which consonant is NOT in the CaReFuL rule?", a: "S", o: ["C", "R", "S", "L"], negative: true, diff: "hard" },
  { q: "Which does NOT express confusion or misunderstanding?", a: "Voilà", o: ["Je ne comprends pas", "Pouvez-vous répéter", "Pardon ?", "Voilà"], negative: true, diff: "medium" },

  // ── Context-heavy (10) ──
  { q: "You need allergy medicine at 7 PM. Most pharmacies close at 7. What do you say rushing in?", a: "Bonsoir ! Je voudrais...", o: ["Bonsoir ! Je voudrais...", "Salut ! Donne-moi...", "Au revoir, merci", "Bonjour, ça va ?"], ctx: "Evening + urgent + polite.", diff: "medium" },
  { q: "A tourist asks YOU for directions in French. You can barely help. What do you say first?", a: "Pardon, je ne parle pas bien français", o: ["Pardon, je ne parle pas bien français", "Au revoir", "Je voudrais une baguette", "Bonjour, ça va ?"], ctx: "Roles reversed — you're being asked.", diff: "hard" },
  { q: "The waiter brings soup instead of salad. You need to politely correct him.", a: "Excusez-moi, je voudrais la salade", o: ["Excusez-moi, je voudrais la salade", "Non ! Pas ça !", "Au revoir", "Merci beaucoup"], ctx: "Wrong order, stay polite.", diff: "hard" },
  { q: "Your French host asks 'Ça va ?' You had a rough day but don't want to complain.", a: "Comme ci, comme ça", o: ["Comme ci, comme ça", "C'est horrible", "Merci beaucoup", "Au revoir"], ctx: "Honest but diplomatic.", diff: "medium" },
  { q: "You hear 'Voilà, monsieur' — what just happened?", a: "Something was handed to you", o: ["Something was handed to you", "Someone said goodbye", "Someone apologized", "Someone asked a question"], diff: "medium" },
  { q: "At a museum ticket counter, you want 2 adult tickets. You start with...", a: "Bonjour, je voudrais deux billets", o: ["Bonjour, je voudrais deux billets", "Salut, donne-moi deux", "Au revoir, merci", "Pardon, où est"], ctx: "Public setting, formal, specific request.", diff: "hard" },
  { q: "Your AirBnb host left you a note: 'Les clés sont sur la table.' What are you looking for?", a: "The keys", o: ["The keys", "The bread", "The bill", "The station"], ctx: "'Clés' = keys. Table = table (cognate!).", diff: "medium" },
  { q: "A French person says 'Bonne journée !' as you leave. This means...", a: "Have a nice day!", o: ["Have a nice day!", "Goodbye forever", "I'm sorry", "Please repeat"], ctx: "Journée = day (journey of the day).", diff: "medium" },
  { q: "You're at a dinner party. The host pours wine and says 'Santé !' You should...", a: "Raise your glass and repeat 'Santé !'", o: ["Raise your glass and repeat 'Santé !'", "Leave immediately", "Say 'Au revoir'", "Say 'Je ne comprends pas'"], ctx: "Santé = health. It's a toast!", diff: "hard" },
  { q: "Why is 'je voudrais' more polite than 'je veux'?", a: "It uses the conditional form (would like vs want)", o: ["It uses the conditional form (would like vs want)", "It's longer", "It has more vowels", "It's louder"], diff: "hard" },

  // ── True/False (5) ──
  { q: "You can use 'salut' with your boss.", a: "False", o: ["True", "False"], variant: "truefalse", ctx: "Salut is strictly casual.", diff: "easy" },
  { q: "In France, saying 'bonjour' before a request is mandatory, not optional.", a: "True", o: ["True", "False"], variant: "truefalse", diff: "easy" },
  { q: "The word 'baguette' ONLY means a type of bread.", a: "False", o: ["True", "False"], variant: "truefalse", ctx: "Wand, chopsticks, baton...", diff: "medium" },
  { q: "The final 't' in 'est' is pronounced.", a: "False", o: ["True", "False"], variant: "truefalse", ctx: "T is not in CaReFuL.", diff: "hard" },
  { q: "'Ne...pas' goes around the verb like a sandwich.", a: "True", o: ["True", "False"], variant: "truefalse", diff: "easy" },

  // ── CaReFuL & pronunciation (5) ──
  { q: "The mnemonic 'CaReFuL' tells you which final consonants are...", a: "Pronounced", o: ["Pronounced", "Silent", "Doubled", "Removed"], diff: "medium" },
  { q: "The 'r' in 'bonjour' is pronounced because...", a: "R is one of the CaReFuL consonants", o: ["R is one of the CaReFuL consonants", "All final letters are pronounced", "It's the first letter", "R is always silent"], diff: "medium" },
  { q: "Which word has a SILENT final consonant?", a: "beaucoup", o: ["parc", "actif", "beaucoup", "hôtel"], ctx: "P is not in C, R, F, L.", diff: "hard" },
  { q: "The French 'r' sounds like...", a: "A soft gargle in the throat", o: ["A soft gargle in the throat", "An English R", "A Spanish rolled R", "A click"], diff: "medium" },
  { q: "'Comprendre' comes from the same Latin root as...", a: "Comprehend", o: ["Comprehend", "Compress", "Compare", "Compute"], diff: "easy" },

  // ── Order/rank (5) ──
  { q: "Correct order for entering a café and ordering:", a: "Bonjour → Je voudrais... → Merci → Au revoir", o: ["Bonjour → Je voudrais... → Merci → Au revoir", "Je voudrais → Bonjour → Au revoir → Merci", "Au revoir → Bonjour → Merci → Je voudrais", "Merci → Au revoir → Je voudrais → Bonjour"], variant: "order", diff: "hard" },
  { q: "Most formal to least formal greeting:", a: "Bonjour monsieur → Bonjour → Salut", o: ["Bonjour monsieur → Bonjour → Salut", "Salut → Bonjour → Bonjour monsieur", "Bonjour → Salut → Bonjour monsieur", "Salut → Bonjour monsieur → Bonjour"], variant: "order", diff: "hard" },
  { q: "Most polite to least polite request:", a: "Je voudrais → S'il vous plaît → Je veux", o: ["Je voudrais → S'il vous plaît → Je veux", "Je veux → Je voudrais → S'il vous plaît", "S'il vous plaît → Je veux → Je voudrais", "Je veux → S'il vous plaît → Je voudrais"], variant: "order", diff: "hard" },
  { q: "Where does 'ne' go in negation?", a: "Before the verb", o: ["Before the verb", "After the verb", "At the end", "At the start of sentence"], diff: "medium" },
  { q: "Where does 'pas' go in negation?", a: "After the verb", o: ["Before the verb", "After the verb", "At the end", "Before 'ne'"], diff: "medium" },
];

// ═══════════════════════════════════════════════════════════════════
// BUILD (20) — tile arrangement, graduated
// ═══════════════════════════════════════════════════════════════════

export const build1: BuildItem[] = [
  // Easy — 3-4 tiles
  { c: ["Je", "voudrais", "un", "café"], en: "I would like a coffee", trap: ["suis", "pas"], diff: "easy" },
  { c: ["Où", "est", "la", "gare"], en: "Where is the station?", trap: ["un", "je"], diff: "easy" },
  { c: ["Merci", "beaucoup"], en: "Thank you very much", trap: ["bonjour", "est", "un"], diff: "easy" },
  { c: ["Je", "ne", "comprends", "pas"], en: "I don't understand", trap: ["suis", "où"], diff: "easy" },
  { c: ["S'il", "vous", "plaît"], en: "Please", trap: ["merci", "je", "un"], diff: "easy" },
  { c: ["Bonjour", "madame"], en: "Hello, ma'am", trap: ["merci", "au", "gare"], diff: "easy" },
  // Medium — 5-6 tiles
  { c: ["Bonjour", "je", "voudrais", "un", "thé"], en: "Hello, I would like a tea", trap: ["merci", "pas", "suis"], diff: "medium" },
  { c: ["Excusez", "moi", "où", "est", "l'hôtel"], en: "Excuse me, where is the hotel?", trap: ["je", "un", "au"], diff: "medium" },
  { c: ["Je", "ne", "parle", "pas", "français"], en: "I don't speak French", trap: ["suis", "comprends", "bien"], diff: "medium" },
  { c: ["Pouvez", "vous", "répéter"], en: "Can you repeat?", trap: ["je", "merci", "un", "suis"], diff: "medium" },
  { c: ["C'est", "très", "gentil", "merci"], en: "That's very kind, thanks", trap: ["bonjour", "mal", "pas"], diff: "medium" },
  // Hard — 7+ tiles
  { c: ["Bonjour", "je", "voudrais", "un", "café", "s'il", "vous", "plaît"], en: "Hello, I would like a coffee please", trap: ["merci", "pas", "au", "revoir"], diff: "hard" },
  { c: ["Excusez", "moi", "je", "ne", "comprends", "pas"], en: "Excuse me, I don't understand", trap: ["voudrais", "un", "café", "bonjour"], diff: "hard" },
  { c: ["Bonsoir", "je", "voudrais", "réserver", "une", "table"], en: "Good evening, I'd like to book a table", trap: ["bonjour", "café", "pas", "merci"], diff: "hard" },
  { c: ["Je", "voudrais", "deux", "baguettes", "et", "un", "croissant"], en: "I would like two baguettes and a croissant", trap: ["café", "pas", "ne", "gare"], diff: "hard" },
  { c: ["Pardon", "je", "ne", "parle", "pas", "bien", "français"], en: "Sorry, I don't speak French well", trap: ["voudrais", "merci", "bonjour", "où"], diff: "hard" },
  // Expert — long
  { c: ["Bonjour", "je", "voudrais", "un", "café", "et", "un", "croissant"], en: "Hello, I would like a coffee and a croissant", trap: ["au", "revoir", "pas", "ne", "gare"], diff: "hard" },
  { c: ["Je", "ne", "comprends", "pas", "pouvez", "vous", "répéter"], en: "I don't understand, can you repeat?", trap: ["bonjour", "voudrais", "café", "merci"], diff: "hard" },
  { c: ["Excusez", "moi", "où", "est", "la", "pharmacie", "s'il", "vous", "plaît"], en: "Excuse me, where is the pharmacy please?", trap: ["je", "un", "café", "merci"], diff: "hard" },
  { c: ["Merci", "beaucoup", "au", "revoir", "à", "bientôt"], en: "Thank you, goodbye, see you soon", trap: ["bonjour", "café", "je", "voudrais"], diff: "hard" },
];

// ═══════════════════════════════════════════════════════════════════
// COMBINE + WEAVE (30)
// ═══════════════════════════════════════════════════════════════════

export const combine1: CombineItem[] = [
  // Easy — 2-part
  { hint: "Greet + order coffee politely → At a morning café", answer: "Bonjour, je voudrais un café, s'il vous plaît", accept: ["bonjour je voudrais un cafe s'il vous plait", "bonjour je voudrais un café s'il vous plaît"] },
  { hint: "Get attention + ask where station is → You're lost near Gare de Lyon", answer: "Excusez-moi, où est la gare", accept: ["excusez-moi où est la gare", "excusez-moi, où est la gare", "excusez moi ou est la gare"] },
  { hint: "Say you don't understand + ask to repeat → At a ticket counter", answer: "Je ne comprends pas. Pouvez-vous répéter ?", accept: ["je ne comprends pas pouvez-vous répéter", "je ne comprends pas. pouvez-vous repeter"] },
  { hint: "Thank + say goodbye → Leaving the cheese shop", answer: "Merci, au revoir !", accept: ["merci au revoir", "merci, au revoir"] },
  { hint: "Evening greeting + ask how they are → Arriving at a dinner party", answer: "Bonsoir, comment allez-vous ?", accept: ["bonsoir comment allez-vous", "bonsoir, comment allez-vous"] },
  { hint: "Say yes + politely → Waiter offers bread", answer: "Oui, s'il vous plaît", accept: ["oui s'il vous plait", "oui, s'il vous plaît"] },
  { hint: "Apologize + excuse yourself → You spilled someone's wine", answer: "Pardon, excusez-moi !", accept: ["pardon excusez-moi", "pardon, excusez-moi"] },
  { hint: "Say goodbye + see you tomorrow → Leaving language class", answer: "Au revoir, à demain !", accept: ["au revoir a demain", "au revoir, à demain"] },
  // Medium — 3-part
  { hint: "Evening + book table + for two → Restaurant without reservation", answer: "Bonsoir, je voudrais réserver une table pour deux", accept: ["bonsoir je voudrais reserver une table pour deux", "bonsoir, je voudrais réserver une table pour deux"] },
  { hint: "Greet + order two baguettes + say please → Sunday bakery run for family", answer: "Bonjour, je voudrais deux baguettes, s'il vous plaît", accept: ["bonjour je voudrais deux baguettes s'il vous plait", "bonjour, je voudrais deux baguettes, s'il vous plaît"] },
  { hint: "Admit you don't understand + ask to repeat → To a police officer helping you", answer: "Je ne comprends pas. Pouvez-vous répéter ?", accept: ["je ne comprends pas pouvez-vous répéter", "je ne comprends pas. pouvez-vous repeter"] },
  { hint: "Get attention + don't understand + ask to repeat → Three-step rescue when totally lost", answer: "Excusez-moi, je ne comprends pas. Pouvez-vous répéter ?", accept: ["excusez-moi je ne comprends pas pouvez-vous répéter", "excusez-moi, je ne comprends pas. pouvez-vous repeter"] },
  { hint: "Thank warmly + say goodbye + see you soon → After someone walked you to your hotel", answer: "Merci beaucoup ! Au revoir, à bientôt !", accept: ["merci beaucoup au revoir a bientot", "merci beaucoup ! au revoir, à bientôt"] },
  { hint: "Apologize + where is station + please → Lost with luggage", answer: "Pardon, où est la gare, s'il vous plaît ?", accept: ["pardon ou est la gare s'il vous plait", "pardon, où est la gare, s'il vous plaît"] },
  // Hard — multi-sentence
  { hint: "Greet + order coffee and croissant + ask price → Full morning bakery interaction", answer: "Bonjour ! Je voudrais un café et un croissant, s'il vous plaît. C'est combien ?", accept: ["bonjour je voudrais un cafe et un croissant s'il vous plait c'est combien", "bonjour, je voudrais un café et un croissant. c'est combien"] },
  { hint: "Apologize + don't understand + speak slower → Complete confusion rescue kit", answer: "Pardon, je ne comprends pas. Pouvez-vous parler plus lentement ?", accept: ["pardon je ne comprends pas pouvez-vous parler plus lentement"] },
  { hint: "Evening + book table + tonight + please → Dinner reservation call", answer: "Bonsoir, je voudrais réserver une table, s'il vous plaît", accept: ["bonsoir je voudrais reserver une table s'il vous plait", "bonsoir, je voudrais réserver une table, s'il vous plaît"] },
  { hint: "Excuse me + thank + goodbye + see you soon → Complete polite exit", answer: "Excusez-moi ! Merci beaucoup, au revoir, à bientôt !", accept: ["excusez-moi merci beaucoup au revoir a bientot", "excusez-moi ! merci beaucoup, au revoir, à bientôt"] },
];

export const weave1: WeaveItem[] = [
  // Short — 1 sentence, 3-5 known words
  { en: "Hello, I would like a tea with milk, please.", known: ["bonjour", "je", "voudrais", "s'il vous plaît"], sample: "Bonjour, je voudrais a tea with milk, s'il vous plaît." },
  { en: "Sorry, I don't understand this sign.", known: ["pardon", "je", "ne", "comprends", "pas"], sample: "Pardon, je ne comprends pas this sign." },
  { en: "Excuse me, where is the nearest pharmacy?", known: ["excusez-moi", "où", "est", "la"], sample: "Excusez-moi, où est la nearest pharmacy?" },
  { en: "Thank you very much! Goodbye!", known: ["merci", "beaucoup", "au revoir"], sample: "Merci beaucoup! Au revoir!" },
  { en: "Good evening, I would like to book a room.", known: ["bonsoir", "je", "voudrais", "réserver"], sample: "Bonsoir, je voudrais réserver a room." },
  { en: "I don't understand. Can you help?", known: ["je", "ne", "comprends", "pas"], sample: "Je ne comprends pas. Can you help?" },
  { en: "No thank you. Goodbye, see you soon!", known: ["non", "merci", "au revoir", "à bientôt"], sample: "Non, merci. Au revoir, à bientôt!" },
  { en: "Please, can you speak more slowly?", known: ["s'il vous plaît", "pouvez-vous", "parler"], sample: "S'il vous plaît, pouvez-vous parler more slowly?" },
  // Long — 2-3 sentences, 7+ known words
  { en: "Hello! I would like a coffee and a croissant, please. Where is the bathroom?", known: ["bonjour", "je", "voudrais", "café", "croissant", "s'il vous plaît", "où", "est"], sample: "Bonjour! Je voudrais un café et un croissant, s'il vous plaît. Où est the bathroom?" },
  { en: "Excuse me, I don't understand the announcement. Can you repeat, please?", known: ["excusez-moi", "je", "ne", "comprends", "pas", "pouvez-vous", "répéter", "s'il vous plaît"], sample: "Excusez-moi, je ne comprends pas the announcement. Pouvez-vous répéter, s'il vous plaît?" },
  { en: "Good evening! I would like to book a table for two people. Is that possible? Thank you!", known: ["bonsoir", "je", "voudrais", "réserver", "table", "deux", "merci"], sample: "Bonsoir! Je voudrais réserver a table pour deux people. Is that possible? Merci!" },
  { en: "Hello, I would like three baguettes and a pain au chocolat. How much is it? Thank you, goodbye!", known: ["bonjour", "je", "voudrais", "trois", "baguettes", "pain au chocolat", "merci", "au revoir"], sample: "Bonjour, je voudrais trois baguettes et a pain au chocolat. How much is it? Merci, au revoir!" },
];

// ═══════════════════════════════════════════════════════════════════
// REVIEW (50)
// ═══════════════════════════════════════════════════════════════════

export const review1: ReviewItem[] = [
  // Listen (10)
  { type: "listen", audio: "Bonjour, je voudrais un café, s'il vous plaît.", q: "What is this person doing?", a: "Ordering a coffee politely", o: ["Ordering a coffee politely", "Asking for the bathroom", "Saying goodbye", "Complaining about the weather"] },
  { type: "listen", audio: "Excusez-moi, où est la gare ?", q: "What does this person need?", a: "Directions to the train station", o: ["Directions to the train station", "A cup of coffee", "A hotel room", "An apology"] },
  { type: "listen", audio: "Je ne comprends pas. Pouvez-vous répéter ?", q: "This person is asking you to...", a: "Say it again because they're confused", o: ["Say it again because they're confused", "Leave them alone", "Bring them food", "Show them the exit"] },
  { type: "listen", audio: "Bonsoir, je voudrais réserver une table.", q: "When is this interaction happening?", a: "In the evening", o: ["In the morning", "At noon", "In the evening", "At midnight"] },
  { type: "listen", audio: "Merci beaucoup, c'est très gentil !", q: "How does this person feel?", a: "Grateful and appreciative", o: ["Grateful and appreciative", "Angry", "Confused", "Bored"] },
  { type: "listen", audio: "Salut, ça va ?", q: "Is this greeting formal or casual?", a: "Casual — between friends", o: ["Casual — between friends", "Extremely formal", "For business only", "For emergencies"] },
  { type: "listen", audio: "Pardon ! Excusez-moi !", q: "What probably just happened?", a: "An accidental bump or mistake", o: ["An accidental bump or mistake", "A happy reunion", "A food order", "A phone call"] },
  { type: "listen", audio: "Je voudrais deux baguettes et un pain au chocolat.", q: "How many items total?", a: "Three", o: ["One", "Two", "Three", "Four"] },
  { type: "listen", audio: "Pouvez-vous parler plus lentement, s'il vous plaît ?", q: "The speaker needs you to...", a: "Slow down", o: ["Slow down", "Speak louder", "Stop talking", "Write it down"] },
  { type: "listen", audio: "Au revoir, à bientôt ! Merci pour tout !", q: "The speaker is...", a: "Leaving gratefully", o: ["Leaving gratefully", "Arriving excitedly", "Ordering nervously", "Complaining angrily"] },

  // Odd one out (8)
  { type: "odd", q: "Which does NOT belong?", items: ["Bonjour", "Bonsoir", "Salut", "Merci"], a: "Merci", reason: "First three are greetings. Merci = thank you." },
  { type: "odd", q: "Which does NOT belong?", items: ["café", "croissant", "baguette", "gare"], a: "gare", reason: "First three are food/drink. Gare = station." },
  { type: "odd", q: "Which is NOT polite?", items: ["Je voudrais", "S'il vous plaît", "Merci", "Donne-moi"], a: "Donne-moi", reason: "'Donne-moi' (give me) is demanding. Others are polite." },
  { type: "odd", q: "Which is NOT about leaving?", items: ["Au revoir", "À demain", "À bientôt", "Bonjour"], a: "Bonjour", reason: "First three are farewells. Bonjour = hello." },
  { type: "odd", q: "Which final consonant IS pronounced? (CaReFuL)", items: ["S", "T", "F", "X"], a: "F", reason: "F is in CaReFuL — it's pronounced. S, T, X are silent." },
  { type: "odd", q: "Which does NOT express an apology?", items: ["Pardon", "Excusez-moi", "Désolé", "Voilà"], a: "Voilà", reason: "Voilà = 'there you go.' Others express regret." },
  { type: "odd", q: "Which is NOT a valid French sentence?", items: ["Je comprends", "Je voudrais", "Je parle", "Je café"], a: "Je café", reason: "'Café' is a noun, not a verb. Can't say 'je café.'" },
  { type: "odd", q: "Which word does NOT have a silent final consonant?", items: ["beaucoup", "est", "français", "hôtel"], a: "hôtel", reason: "L is in CaReFuL — it's pronounced. Others have silent endings." },

  // Context (10)
  { type: "context", situation: "A vendor at a market says a price but you didn't hear it clearly.", a: "Pouvez-vous répéter ?", o: ["Pouvez-vous répéter ?", "Au revoir", "Merci beaucoup", "Je voudrais"] },
  { type: "context", situation: "You accidentally cut in line at the post office.", a: "Pardon, excusez-moi !", o: ["Pardon, excusez-moi !", "Bonjour, ça va ?", "Je voudrais un timbre", "Merci, au revoir"] },
  { type: "context", situation: "You want to order a pastry at a patisserie.", a: "Je voudrais un éclair, s'il vous plaît", o: ["Je voudrais un éclair, s'il vous plaît", "Où est la gare ?", "Au revoir", "Je ne comprends pas"] },
  { type: "context", situation: "It's 9 PM and you arrive at a hotel.", a: "Bonsoir !", o: ["Bonsoir !", "Bonjour !", "Salut !", "Au revoir !"] },
  { type: "context", situation: "You're leaving your Airbnb host who was wonderful.", a: "Merci beaucoup pour tout ! Au revoir !", o: ["Merci beaucoup pour tout ! Au revoir !", "Salut, ça va ?", "Je ne comprends pas", "Pardon !"] },
  { type: "context", situation: "The pharmacist hands you your medicine.", a: "Merci !", o: ["Merci !", "Pardon !", "Excusez-moi !", "Je ne comprends pas"] },
  { type: "context", situation: "You need to find a specific metro station.", a: "Excusez-moi, où est la station Bastille ?", o: ["Excusez-moi, où est la station Bastille ?", "Merci, la station", "Au revoir, Bastille", "Je voudrais Bastille"] },
  { type: "context", situation: "Someone asks if you want dessert. You do.", a: "Oui, s'il vous plaît !", o: ["Oui, s'il vous plaît !", "Non, au revoir", "Pardon ?", "Je ne comprends pas"] },
  { type: "context", situation: "You want to explain your French is limited.", a: "Je ne parle pas bien français", o: ["Je ne parle pas bien français", "Je voudrais français", "Bonjour, français", "Au revoir, français"] },
  { type: "context", situation: "Declining a street vendor politely.", a: "Non merci, au revoir", o: ["Non merci, au revoir", "Oui, bonjour", "Je comprends", "Pardon, voudrais"] },

  // Fill in context (8)
  { type: "fill_ctx", s: "___, je voudrais un thé vert.", a: "Bonjour", o: ["Bonjour", "Merci", "Au revoir", "Pardon"], ctx: "Ordering green tea at a Japanese-French fusion café." },
  { type: "fill_ctx", s: "Je ne ___ pas cette carte.", a: "comprends", o: ["comprends", "voudrais", "parle", "suis"], ctx: "A hand-drawn map that makes no sense to you." },
  { type: "fill_ctx", s: "___, où est la sortie ?", a: "Excusez-moi", o: ["Excusez-moi", "Merci", "Voilà", "Au revoir"], ctx: "Lost inside a huge department store." },
  { type: "fill_ctx", s: "___ beaucoup !", a: "Merci", o: ["Merci", "Pardon", "Bonjour", "Voilà"], ctx: "A colleague brought you coffee without asking. Thank them warmly." },
  { type: "fill_ctx", s: "Je ___ deux places pour le concert.", a: "voudrais", o: ["voudrais", "suis", "comprends", "parle"], ctx: "Buying concert tickets at the box office." },
  { type: "fill_ctx", s: "___, à la semaine prochaine !", a: "Au revoir", o: ["Au revoir", "Bonjour", "Merci", "Pardon"], ctx: "Leaving your weekly French tutoring session." },
  { type: "fill_ctx", s: "Je ne ___ pas. Pouvez-vous écrire ?", a: "comprends", o: ["comprends", "voudrais", "parle", "suis"], ctx: "You can't catch the spoken price. Ask them to write it down." },
  { type: "fill_ctx", s: "Je voudrais ___ croque-monsieur.", a: "un", o: ["un", "le", "la", "des"], ctx: "Ordering the classic French grilled sandwich." },

  // Match (4)
  { type: "match", pairs: [{ fr: "Bonjour", en: "Hello" }, { fr: "Merci", en: "Thank you" }, { fr: "Au revoir", en: "Goodbye" }, { fr: "Pardon", en: "Sorry" }] },
  { type: "match", pairs: [{ fr: "Je voudrais", en: "I would like" }, { fr: "S'il vous plaît", en: "Please" }, { fr: "Où est", en: "Where is" }, { fr: "Je ne comprends pas", en: "I don't understand" }] },
  { type: "match", pairs: [{ fr: "Bonsoir", en: "Good evening" }, { fr: "Salut", en: "Hi (casual)" }, { fr: "Voilà", en: "There you go" }, { fr: "Comme ci, comme ça", en: "So-so" }] },
  { type: "match", pairs: [{ fr: "café", en: "coffee" }, { fr: "gare", en: "station" }, { fr: "pharmacie", en: "pharmacy" }, { fr: "baguette", en: "baguette/stick" }] },

  // Scramble (4)
  { type: "scramble", word: "bonjour", hint: "The word that opens every French interaction" },
  { type: "scramble", word: "merci", hint: "You say this when someone helps you" },
  { type: "scramble", word: "pardon", hint: "For accidental bumps and interruptions" },
  { type: "scramble", word: "voudrais", hint: "The polite way to say 'I would like'" },

  // Weave review (6)
  { type: "weave", en: "Hello, I would like a coffee with cream.", known: ["bonjour", "je", "voudrais", "café"], sample: "Bonjour, je voudrais a café with cream." },
  { type: "weave", en: "Excuse me, where is the nearest hotel?", known: ["excusez-moi", "où", "est"], sample: "Excusez-moi, où est the nearest hotel?" },
  { type: "weave", en: "I don't understand the menu.", known: ["je", "ne", "comprends", "pas"], sample: "Je ne comprends pas the menu." },
  { type: "weave", en: "Thank you for everything, see you next time!", known: ["merci", "pour", "tout", "à"], sample: "Merci pour tout, see you next time!" },
  { type: "weave", en: "Sorry, can you write that down for me?", known: ["pardon", "pouvez-vous"], sample: "Pardon, pouvez-vous write that down for me?" },
  { type: "weave", en: "Good evening, I would like the bill please.", known: ["bonsoir", "je", "voudrais", "s'il vous plaît"], sample: "Bonsoir, je voudrais the bill, s'il vous plaît." },
];
