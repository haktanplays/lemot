import re, pathlib

INSIGHTS = {
 "content/lessons/v1/lesson-001.ts": {
  "s04-weave-cafe-order":
    "Bonjour is not optional in a French shop. Walking up and starting with what you want reads as rude in a way English speakers rarely intend.",
  "s06-weave-cafe-order-please":
    "S'il vous plaît lands at the end, after the thing you asked for, rather than in front of it.",
  "s10-weave-merci-thanks":
    "Merci and mercy come from one Latin word for a favour. English kept the pity in it; French kept the thanks.",
  "s15-weave-excusez-moi-cafe":
    "Croissant drops its final t, and the r is made at the back of the throat: krwa-SON.",
  "s11-weave-the-order":
    "Thé is one syllable. The é is the closed one, short and flat, with none of the glide English puts on the end of tay.",
  "s19-weave-excuse-and-repeat":
    "Répéter and repeat are the same word wearing different endings. Most French verbs ending in -er have an English relative like this.",
 },
 "content/lessons/v1/lesson-002.ts": {
  "s04-weave-je-suis-ici":
    "French hangs states on je suis, but hunger and thirst on j'ai. That split is the most useful thing to notice early.",
  "s05-weave-call-and-respond":
    "Excusez-moi buys attention you do not have yet. Bonjour greets attention you already have.",
  "s06b-weave-arrive-and-order":
    "Two short sentences rather than one long one. Arriving and ordering are separate moments, and French is content to let them stay separate.",
  "s10c-weave-answer-the-call":
    "Ici carries its weight at the end: ee-SEE. French leans on the end of a group rather than on a chosen syllable inside it.",
 },
 "content/lessons/v1/lesson-003.ts": {
  "s06-weave-je-ne-suis-pas-ici":
    "Ne and pas never touch. Whatever the sentence is doing goes between them.",
  "s07-weave-ce-n-est-pas-ici":
    "Before a vowel, ne drops its e and leans on the verb: ce n'est, not ce ne est. French avoids letting two vowels meet.",
  "s12-weave-je-ne-comprends-pas":
    "Comprends and comprehend come from the same Latin verb for grasping. English saves comprehend for formal writing; French uses this one all day.",
  "s08-weave-non-je-ne-suis-pas-ici":
    "Non on its own can land hard. Putting the reason straight after it keeps the refusal from sounding like a door closing.",
  "s15-weave-answer-yes":
    "Oui answers the question that was asked. Je suis ici answers what they actually wanted to know.",
  "s16-weave-not-that-place":
    "The same two halves as je ne suis pas, around a different verb. The move does not change when the subject does.",
 },
}

for path, byScreen in INSIGHTS.items():
    p = pathlib.Path(path); s = p.read_text()
    for sid, note in byScreen.items():
        i = s.index(f'id: "{sid}"')
        # find the reveal block that follows, and its closing brace
        r = s.index("reveal: {", i)
        # walk to the matching close of the reveal object
        depth = 0; j = s.index("{", r)
        k = j
        while True:
            if s[k] == "{": depth += 1
            elif s[k] == "}": 
                depth -= 1
                if depth == 0: break
            k += 1
        block = s[j:k]
        assert "explanation:" not in block, (sid, "already has one")
        indent = " " * (len(s[:k].split("\n")[-1]))
        esc = note.replace('"', '\\"')
        ins = f'\n{indent}  explanation:\n{indent}    "{esc}",\n{indent}'
        s = s[:k] + ins + s[k:]
    p.write_text(s)
    print("ok", path)
