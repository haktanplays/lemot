import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Mountain, BookOpen, Layers, BarChart3, ChevronLeft, ChevronRight, Volume2, Check, X, Star, Compass, Pen, MessageCircle, Zap, RotateCcw, Lock, ArrowRight, Sparkles, Target, Languages, Lightbulb, Globe, BookMarked, Send, HelpCircle, Coffee, Stethoscope, Briefcase, MessageSquare, Headphones, FileText, Dumbbell, Type, RefreshCw, Heart, Clock, UtensilsCrossed, Users, Ban, MapPin, Sun, Map } from "lucide-react";

const say=(t)=>{
  if(!('speechSynthesis' in window))return;
  window.speechSynthesis.cancel();
  const c=t.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu,"").trim();
  const speak=()=>{
    const u=new SpeechSynthesisUtterance(c);
    u.lang='fr-FR';u.rate=0.85;
    const voices=window.speechSynthesis.getVoices();
    const fr=voices.find(v=>v.lang.startsWith('fr'));
    if(fr)u.voice=fr;
    window.speechSynthesis.speak(u);
  };
  if(window.speechSynthesis.getVoices().length>0){speak();}
  else{window.speechSynthesis.onvoiceschanged=speak;}
};
const norm=(s)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[?!.,;:'"«»\-]/g,"").replace(/\s+/g," ").trim();

// ── DICTIONARY ──
const DICT={
  "bonjour":"hello","bonsoir":"good evening","salut":"hi (casual)","merci":"thank you ≈ mercy",
  "beaucoup":"a lot","au":"to the","revoir":"seeing again ≈ review","s'il":"if",
  "vous":"you (formal)","plaît":"pleases","excusez":"excuse ≈ excuse","moi":"me",
  "où":"where","est":"is (être)","la":"the (f.)","le":"the (m.)","gare":"station",
  "je":"I","ne":"negation","comprends":"understand ≈ comprehend","pas":"not/step ≈ pace",
  "pouvez":"can (pouvoir)","répéter":"repeat ≈ repeat","un":"a (m.)","une":"a (f.)",
  "café":"coffee ≈ café","voudrais":"would like","suis":"am (être)","et":"and",
  "elle":"she","médecin":"doctor ≈ medicine","à":"at/to","nous":"we",
  "sommes":"are (nous)","fatigués":"tired ≈ fatigue","aujourd'hui":"today",
  "êtes":"are (vous)","prêts":"ready","ils":"they","sont":"are (ils)",
  "contents":"happy ≈ content","tu":"you (informal)","il":"he/it","y":"there",
  "a":"has (avoir)","bon":"good ≈ bon","restaurant":"restaurant ≈ restaurant",
  "ici":"here","faut":"must","partir":"leave ≈ depart","maintenant":"now",
  "en":"in","fait":"fact ≈ fact","préfère":"prefer ≈ prefer","thé":"tea ≈ tea",
  "ça":"that/it","marche":"works/walks ≈ march","dépend":"depends ≈ depend",
  "demain":"tomorrow","problème":"problem ≈ problem","d'accord":"okay ≈ accord",
  "bien":"well","sûr":"sure ≈ sure","étudiant":"student ≈ student",
  "française":"French (f.)","école":"school ≈ school","grand":"big ≈ grand",
  "petit":"small ≈ petite","maison":"house ≈ mansion","avec":"with",
  "sans":"without ≈ sans","pour":"for","mais":"but","toi":"you (emphatic)",
  "chat":"cat","fermé":"closed","très":"very","beau":"beautiful ≈ beauty",
  "pain":"bread","vin":"wine ≈ vine","rouge":"red ≈ rouge","blanc":"white ≈ blank",
  "monsieur":"sir/Mr.","madame":"madam/Mrs. ≈ madam","oui":"yes",
  "non":"no","ce":"this","soir":"evening ≈ soirée","viens":"come (venir)",
  "tutoie":"use tu (informal)","pouvez":"can (pouvoir) ≈ power",
  // L6: Avoir
  "ai":"have (avoir)","as":"have (tu)","avons":"have (nous)","avez":"have (vous)","ont":"have (ils)",
  "avoir":"to have","ans":"years ≈ annual","faim":"hunger ≈ famine","soif":"thirst",
  "peur":"fear","besoin":"need","raison":"right/reason ≈ reason","tort":"wrong ≈ tort",
  "chaud":"hot","froid":"cold ≈ frigid","mal":"pain/bad ≈ malady","de":"of/from",
  // L7: Articles & Gender
  "les":"the (pl.)","des":"some (pl.)","livre":"book ≈ library","voiture":"car",
  "téléphone":"phone ≈ telephone","musique":"music ≈ music","table":"table ≈ table",
  "nation":"nation ≈ nation","moment":"moment ≈ moment","famille":"family ≈ family",
  "sur":"on/sure ≈ sure/surface","hôtel":"hotel ≈ hotel","chaise":"chair",
  // L8: Numbers & Time
  "deux":"two ≈ dual","trois":"three ≈ trio","quatre":"four ≈ quarter","cinq":"five",
  "six":"six ≈ six","sept":"seven ≈ September","huit":"eight","neuf":"nine/new ≈ neuf",
  "dix":"ten ≈ decimal","vingt":"twenty","trente":"thirty","heure":"hour ≈ hour",
  "heures":"hours ≈ hours","midi":"noon ≈ midday","minuit":"midnight","combien":"how much/many",
  "coûte":"costs","cher":"expensive ≈ cherish","euro":"euro ≈ euro","demi":"half ≈ demi",
  "quelle":"which/what (f.)","minute":"minute ≈ minute","quart":"quarter ≈ quarter",
  // L9: Food & Ordering
  "manger":"to eat","boire":"to drink ≈ beverage","poulet":"chicken ≈ poultry",
  "poisson":"fish ≈ poisson","fromage":"cheese ≈ fromage","salade":"salad ≈ salad",
  "eau":"water ≈ eau (perfume)","addition":"check/bill ≈ addition","entrée":"starter ≈ entrée",
  "plat":"dish/course","dessert":"dessert ≈ dessert","prends":"take/have (prendre)",
  "du":"some (m.)","beurre":"butter ≈ butter","viande":"meat",
  // L10: Family & People
  "père":"father ≈ paternal","mère":"mother ≈ maternal","frère":"brother ≈ fraternal",
  "sœur":"sister ≈ sorority","enfant":"child ≈ infant","ami":"friend ≈ amicable",
  "mari":"husband ≈ marry","femme":"wife/woman ≈ feminine","fils":"son ≈ filial",
  "fille":"daughter/girl","jeune":"young ≈ juvenile","vieux":"old",
  "mon":"my (m.)","ma":"my (f.)","mes":"my (pl.)","ton":"your (m./informal)",
  "ta":"your (f./informal)","tes":"your (pl./informal)","son":"his/her (m.)",
  "sa":"his/her (f.)","ses":"his/her (pl.)",
  // L11: Negation
  "jamais":"never","plus":"no more/plus ≈ plus","rien":"nothing",
  "personne":"nobody/person ≈ person","encore":"still/again ≈ encore","déjà":"already",
  "toujours":"always","aussi":"also","seulement":"only","peut-être":"maybe ≈ perhaps",
  "mange":"eat (manger)","aime":"love/like ≈ amour","parle":"speak",
  // L13: Aller & Near Future
  "aller":"to go","vais":"go (je)","vas":"go (tu)","va":"goes (il)","allons":"go (nous)",
  "allez":"go (vous)","vont":"go (ils)","gauche":"left","droite":"right ≈ direct",
  "tout":"all/straight ≈ total","droit":"straight ≈ direct","loin":"far",
  "près":"near","devant":"in front ≈ avant","derrière":"behind","entre":"between ≈ enter",
  "ce soir":"tonight","demain":"tomorrow","matin":"morning ≈ matinée",
  // L14: Questions
  "qui":"who","que":"what","quand":"when","comment":"how ≈ comment",
  "pourquoi":"why","quel":"which/what","est-ce que":"(question marker)",
  "parce que":"because","parler":"to speak ≈ parley","apprends":"learn ≈ apprentice",
  "français":"French",
  // L15: Daily Routine
  "lever":"to get up ≈ lever","laver":"to wash ≈ lavatory","habiller":"to dress",
  "travailler":"to work ≈ travail","dormir":"to sleep ≈ dormant",
  "après-midi":"afternoon","nuit":"night ≈ nocturnal","tôt":"early",
  "tard":"late ≈ tardy","puis":"then","se":"oneself (reflexive)",
  "me":"myself","lève":"get up","couche":"go to bed ≈ couch",
  // L16: Places & Prepositions
  "pharmacie":"pharmacy ≈ pharmacy","boulangerie":"bakery","supermarché":"supermarket ≈ supermarket",
  "banque":"bank ≈ bank","parc":"park ≈ park","place":"square/place ≈ place",
  "dans":"in/inside","sous":"under ≈ sous (as in sous-chef)","côté":"side ≈ coast",
  "à côté de":"next to","en face de":"across from ≈ face",
};

const FrText=({text})=>{
  const [tip,setTip]=useState(null);
  const words=text.split(/(\s+|[.,!?;:«»])/);
  return(<span style={{position:"relative"}}>{words.map((w,i)=>{
    const cl=w.toLowerCase().replace(/[.,!?;:«»'"]/g,"").trim();const h=DICT[cl];
    if(!cl||!h)return <span key={i}>{w}</span>;
    return(<span key={i} onClick={e=>{e.stopPropagation();setTip(tip===i?null:i);}} style={{borderBottom:tip===i?"1.5px solid #C0392B":"1px dotted #D5D0CA",cursor:"pointer",color:tip===i?"#C0392B":"inherit"}}>
      {w}{tip===i&&<span style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",background:"#2C2825",color:"#FAF9F7",padding:"6px 12px",borderRadius:8,fontSize:12,fontFamily:"'Outfit',sans-serif",fontWeight:500,fontStyle:"normal",whiteSpace:"nowrap",zIndex:50,boxShadow:"0 4px 16px rgba(0,0,0,0.2)",pointerEvents:"none"}}>
        <span style={{fontWeight:700}}>{cl}</span><span style={{opacity:0.5,margin:"0 5px"}}>·</span>{h}
        {h.includes("≈")&&<span style={{display:"block",fontSize:10,opacity:0.6,marginTop:2}}>cognate</span>}
      </span>}
    </span>);
  })}</span>);
};

const FrMix=({text})=>{
  const parts=text.split(/(\*[^*]+\*)/g);
  return <span>{parts.map((p,i)=>
    p.startsWith("*")&&p.endsWith("*")?<span key={i} style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",color:"#C0392B",fontWeight:600,background:"#FBEAE8",padding:"1px 5px",borderRadius:3,borderBottom:"1.5px solid #F0C9C4"}}>{p.slice(1,-1)}</span>:<span key={i}>{p}</span>
  )}</span>;
};

// ══════════════════════════════════════════
// LESSON DATA — 10-section format
// ══════════════════════════════════════════
const LESSONS=[
{id:1,title:"Survival Kit",sub:"Phrases that work from day one",icon:Compass,level:"A1",
grammar:{title:"Survival Phrases",sections:[
  {type:"intro",text:"Before any grammar rules, let's start with phrases you'll need on your very first day in France. Never start talking to a French person without saying *bonjour* first — skipping it is considered *très impoli* (very rude)."},
  {type:"block",label:"Greetings",items:[
    {fr:"Bonjour",en:"Hello (daytime)",note:"Mandatory when entering a shop, meeting anyone, even in an elevator. Skip it and you're rude."},
    {fr:"Bonsoir",en:"Good evening",note:"Replaces Bonjour after ~6 PM."},
    {fr:"Salut",en:"Hi (casual)",note:"Friends only. Never to your boss."},
    {fr:"Au revoir",en:"Goodbye",note:"Literally: 'until seeing again.' Revoir = re + voir. Same root as English 'review.'"},
  ]},
  {type:"block",label:"Polite Requests",items:[
    {fr:"S'il vous plaît",en:"Please",note:"Word for word: 'if it pleases you.'"},
    {fr:"Merci beaucoup",en:"Thank you very much",note:"Merci shares a Latin root with English 'mercy.'"},
    {fr:"Je voudrais...",en:"I would like...",note:"Politer than 'je veux' (I want). Like 'I'd like' vs 'I want' in English."},
  ]},
  {type:"block",label:"When You're Stuck",items:[
    {fr:"Je ne comprends pas",en:"I don't understand",note:"'Comprendre' = cognate of 'comprehend.' Latin com + prehendere (to seize)."},
    {fr:"Pouvez-vous répéter ?",en:"Can you repeat?",note:"'Répéter' = cognate of 'repeat.' Same Latin root (repetere)."},
  ]},
  {type:"howToSay",words:[
    {fr:"Bonjour",phonetic:"bohn-ZHOOR",ipa:"/bɔ̃.ʒuʁ/",notes:"'zh' as in 'pleasure'. 'on' is nasal — don't say the 'n'."},
    {fr:"Je voudrais",phonetic:"zhuh voo-DREH",ipa:"/ʒə vu.dʁɛ/",notes:"'zh' as in 'vision'. French 'r' is throaty, like a soft gargle."},
    {fr:"S'il vous plaît",phonetic:"seel voo PLEH",ipa:"/sil vu plɛ/",notes:"'plaît' rhymes with 'met', not 'plate'."},
  ]},
  {type:"tip",text:"*Je voudrais...* works everywhere — cafés, restaurants, hotels, ticket counters. One pattern, a hundred situations."},
],quickRecall:{q:"'Répéter' is a cognate of which English word?",a:"Repeat",o:["Repeat","Repair","Report","Replace"]}},
examples:[
  {fr:"Bonjour, je voudrais un café, s'il vous plaît.",en:"Hello, I would like a coffee, please.",bridge:"Hello, je would like un café, please."},
  {fr:"Excusez-moi, où est la gare ?",en:"Excuse me, where is the station?",bridge:"Excuse me, où est la station?"},
  {fr:"Merci beaucoup, au revoir !",en:"Thank you very much, goodbye!",bridge:"Merci beaucoup, goodbye!"},
  {fr:"Je ne comprends pas. Pouvez-vous répéter ?",en:"I don't understand. Can you repeat?",bridge:"Je ne comprends pas. Can you répéter?"},
  {fr:"Bonjour, je voudrais une baguette, s'il vous plaît.",en:"Hello, I would like a baguette, please.",bridge:"Hello, je would like une baguette, please."},
  {fr:"Excusez-moi, je voudrais réserver une table.",en:"Excuse me, I would like to book a table.",bridge:"Excuse me, je would like réserver a table."},
  {fr:"Bonsoir ! Merci, au revoir.",en:"Good evening! Thanks, goodbye.",bridge:"Good evening! Merci, goodbye."},
],
fillFG:[
  {s:"I [___] a coffee, please.",a:"voudrais",o:["voudrais","comprends","suis","faut"],ctx:"You're ordering politely at a café."},
  {s:"[___] me, where is the station?",a:"Excusez",o:["Excusez","Merci","Bonjour","Salut"],ctx:"You need to get someone's attention on the street."},
  {s:"I don't [___].",a:"comprends",o:["comprends","voudrais","parle","suis"],ctx:"Someone is speaking too fast."},
  {s:"Thank you very much, [___]!",a:"au revoir",o:["au revoir","bonjour","merci","salut"],ctx:"You're leaving a shop."},
  {s:"Hello, I [___] like a croissant.",a:"voudrais",o:["voudrais","suis","faut","comprends"],ctx:"You're at a bakery counter, ordering politely."},
],
fillBlanks:[
  {s:"___, je voudrais un café.",a:"Bonjour",o:["Bonjour","Au revoir","Merci","Salut"],ctx:"It's 10 AM. Greet the waiter before ordering."},
  {s:"Excusez-moi, ___ est la gare ?",a:"où",o:["où","qui","quand","comment"],ctx:"You're lost. Ask where the station is."},
  {s:"Je ne ___ pas.",a:"comprends",o:["comprends","parle","voudrais","suis"],ctx:"Someone spoke too fast. Tell them."},
  {s:"Merci beaucoup, ___ !",a:"au revoir",o:["au revoir","bonjour","salut","merci"],ctx:"You're leaving after a nice interaction."},
  {s:"Je ___ un croissant, s'il vous plaît.",a:"voudrais",o:["voudrais","suis","comprends","faut"],ctx:"Order a croissant politely at the counter."},
],
buildSentences:[
  {c:["Je","voudrais","un","café"],en:"I would like a coffee",trap:["suis","pas"]},
  {c:["Où","est","la","gare"],en:"Where is the station?",trap:["un","je"]},
  {c:["Merci","beaucoup","au","revoir"],en:"Thank you, goodbye",trap:["bonjour","est"]},
  {c:["Je","ne","comprends","pas"],en:"I don't understand",trap:["suis","où"]},
],
quiz:[
  {q:"What should you say first when entering a shop?",a:"Bonjour",o:["Merci","Bonjour","Au revoir","Ça va"],ctx:"It's a Tuesday afternoon."},
  {q:"Which phrase is the polite way to order?",a:"Je voudrais...",o:["Je veux...","Je voudrais...","Je suis...","Je comprends..."]},
  {q:"It's 8 PM. How do you greet someone?",a:"Bonsoir",o:["Bonjour","Bonsoir","Salut","Merci"],ctx:"Evening event at a colleague's home."},
  {q:"'Comprendre' is a cognate of...?",a:"Comprehend",o:["Comprehend","Compress","Compare","Complete"]},
  {q:"You're talking to your boss. Which greeting should you NEVER use?",a:"Salut",o:["Bonjour","Bonsoir","Salut","Excusez-moi"],ctx:"Monday morning at the office.",negative:true},
  {q:"'Au revoir' literally means...",a:"Until seeing again",o:["Goodbye forever","Until seeing again","Good day","See you later"]},
],
combine:[
  {hint:"Greet + polite request + coffee → Order at a café",answer:"Bonjour, je voudrais un café, s'il vous plaît",accept:["bonjour je voudrais un cafe s'il vous plait","bonjour je voudrais un café s'il vous plaît","bonjour, je voudrais un café, s'il vous plaît"]},
  {hint:"Excuse me + where + station → Ask for directions",answer:"Excusez-moi, où est la gare",accept:["excusez-moi où est la gare","excusez-moi, où est la gare","excusez moi ou est la gare"]},
  {hint:"I don't understand + can you repeat → When you're stuck",answer:"Je ne comprends pas. Pouvez-vous répéter",accept:["je ne comprends pas pouvez-vous répéter","je ne comprends pas. pouvez-vous répéter","je ne comprends pas pouvez vous repeter"]},
],
weave:[
  {en:"I understand and I would still like a coffee, please.",known:["je","comprends","voudrais","café","s'il vous plaît"],sample:"Je comprends and je voudrais still a café, s'il vous plaît."},
  {en:"Hello, I don't understand. Where is the station?",known:["bonjour","je","ne","comprends","pas","où","est"],sample:"Bonjour, je ne comprends pas. Où est the station?"},
  {en:"Excuse me, I would like a croissant. Thank you, goodbye!",known:["excusez-moi","je","voudrais","merci","au revoir"],sample:"Excusez-moi, je voudrais a croissant. Merci, au revoir!"},
],
review:[
  {type:"listen",audio:"Bonjour, je voudrais un café, s'il vous plaît.",q:"What is the person doing?",a:"Ordering a coffee",o:["Ordering a coffee","Asking for directions","Saying goodbye","Introducing themselves"]},
  {type:"odd",q:"Which does NOT belong?",items:["Bonjour","Bonsoir","Salut","Merci"],a:"Merci",reason:"First three are greetings. Merci is 'thank you.'"},
  {type:"context",situation:"Someone spoke too fast and you didn't catch it.",a:"Pouvez-vous répéter ?",o:["Pouvez-vous répéter ?","Ça marche","Au revoir","Merci beaucoup"]},
],
sayIt:[
  {situation:"You walk into a bakery in Paris. Greet the baker and order something.",target:["bonjour","voudrais","s'il vous plaît"]},
  {situation:"You're lost and need to find the train station. Ask a stranger for help.",target:["excusez","où","gare","comprends"]},
],
miniConv:{topic:"Ordering at a café and asking for directions",starter:"Bonjour ! Bienvenue. Qu'est-ce que vous voulez ?"},
},
{id:5,title:"Être: Who Am I?",sub:"The #1 verb in French",icon:Star,level:"A1",
grammar:{title:"Être — To Be",sections:[
  {type:"intro",text:"*Être* comes from Latin *esse*. English *essence* belongs to the same family. So *être* isn't just 'to be' — it expresses the very *essence* of something. *C'est le verbe numéro un.*"},
  {type:"conjugation",verb:"être",rows:[
    {pr:"Je",conj:"suis",en:"I am",pron:"/ʒə sɥi/"},{pr:"Tu",conj:"es",en:"You are (informal)",pron:"/ty ɛ/"},
    {pr:"Il / Elle",conj:"est",en:"He/She is",pron:"/il ɛ/"},{pr:"Nous",conj:"sommes",en:"We are",pron:"/nu sɔm/"},
    {pr:"Vous",conj:"êtes",en:"You are (formal)",pron:"/vuz ɛt/"},{pr:"Ils / Elles",conj:"sont",en:"They are",pron:"/il sɔ̃/"},
  ]},
  {type:"culture",text:"French says *Je suis médecin* — NOT *Je suis UN médecin*. In French thinking, your profession is part of your identity. In English you MUST say 'I am a doctor,' but French drops the article entirely."},
  {type:"etymology",pairs:[
    {fr:"essence",en:"essence",root:"Latin esse → être. The 'essence' of something = its 'state of being.'"},
    {fr:"absent",en:"absent",root:"Ab (away) + esse (to be) → 'not being there.'"},
    {fr:"présent",en:"present",root:"Prae (before) + esse → 'being in front.'"},
  ]},
  {type:"howToSay",words:[
    {fr:"Je suis",phonetic:"zhuh SWEE",ipa:"/ʒə sɥi/",notes:"'zh' as in 'vision'. 'ui' like 'we' said quickly."},
    {fr:"Nous sommes",phonetic:"noo SUM",ipa:"/nu sɔm/",notes:"'sommes' rhymes with 'some', not 'homes'."},
    {fr:"Ils sont",phonetic:"eel SOHN",ipa:"/il sɔ̃/",notes:"'sont' is nasal — don't say the 'n' or 't'."},
  ]},
  {type:"tip",text:"*C'est* is one of the most frequent French patterns: C'est bon (it's good), C'est vrai (it's true), C'est pas grave (no big deal). A French person says *c'est* 50-100 times a day."},
],quickRecall:{q:"'Être' shares a root with which English word?",a:"Essence",o:["Essence","Estate","Establish","Essential"]}},
examples:[
  {fr:"Je suis américain. Et toi ?",en:"I'm American. And you?",bridge:"Je suis American. And toi?"},
  {fr:"Elle est médecin à Paris.",en:"She is a doctor in Paris.",bridge:"Elle est doctor à Paris."},
  {fr:"Nous sommes fatigués aujourd'hui.",en:"We're tired today.",bridge:"Nous sommes tired aujourd'hui."},
  {fr:"Vous êtes prêts ?",en:"Are you ready?",bridge:"Vous êtes ready?"},
  {fr:"C'est pas grave, ça arrive.",en:"No big deal, it happens.",bridge:"C'est pas grave, it happens."},
  {fr:"Tu es français ? Non, je suis anglais.",en:"Are you French? No, I'm English.",bridge:"Tu es French? Non, je suis English."},
  {fr:"Ils sont contents, nous sommes contents aussi.",en:"They're happy, we're happy too.",bridge:"Ils sont happy, nous sommes happy aussi."},
  {fr:"Il est étudiant, elle est professeur.",en:"He's a student, she's a teacher.",bridge:"Il est student, elle est teacher."},
],
fillFG:[
  {s:"I [___] American.",a:"suis",o:["suis","es","est","sommes"],ctx:"Introduce yourself at a dinner party."},
  {s:"She [___] a doctor in Paris.",a:"est",o:["est","suis","es","sont"],ctx:"Tell a friend about someone's job."},
  {s:"We [___] tired today.",a:"sommes",o:["sommes","sont","êtes","suis"],ctx:"After a long day of sightseeing."},
  {s:"Are you [___]?",a:"prêts",o:["prêts","fatigués","contents","médecin"],ctx:"Ask your group if they're ready to leave."},
  {s:"It's no big [___].",a:"grave",o:["grave","bon","vrai","fait"],ctx:"Comfort someone who made a small mistake."},
],
fillBlanks:[
  {s:"Je ___ étudiant.",a:"suis",o:["suis","es","est","sommes"],ctx:"You're introducing yourself at university."},
  {s:"Elle ___ française.",a:"est",o:["est","es","suis","sont"],ctx:"Describe your friend's nationality."},
  {s:"Nous ___ fatigués.",a:"sommes",o:["sommes","sont","êtes","suis"],ctx:"You and your friends after a long hike."},
  {s:"Vous ___ prêts ?",a:"êtes",o:["êtes","sommes","sont","es"],ctx:"Ask the whole group if they're ready."},
  {s:"Ils ___ à l'école.",a:"sont",o:["sont","sommes","est","suis"],ctx:"Explain where the kids are."},
],
buildSentences:[
  {c:["Je","suis","étudiant"],en:"I am a student",trap:["est","une"]},
  {c:["Elle","est","médecin","à","Paris"],en:"She is a doctor in Paris",trap:["suis","le"]},
  {c:["Nous","sommes","fatigués","aujourd'hui"],en:"We are tired today",trap:["sont","est"]},
  {c:["C'est","pas","grave"],en:"No big deal",trap:["suis","bon"]},
],
quiz:[
  {q:"'Être' shares a root with which English word?",a:"Essence",o:["Essential","Essence","Estate","Establish"]},
  {q:"Which is WRONG when stating your profession in French?",a:"Je suis un médecin",o:["Je suis médecin","Je suis un médecin","Elle est médecin","Il est étudiant"],ctx:"This is a common mistake English speakers make.",negative:true},
  {q:"You're at a party. Introduce yourself as a student.",a:"Je suis étudiant",o:["Je suis un étudiant","Je suis étudiant","Je es étudiant","J'ai étudiant"],ctx:"Casual party, talking to new people."},
  {q:"What does 'C'est pas grave' mean?",a:"No big deal",o:["It's serious","That's not true","No big deal","A grave"]},
  {q:"Fill: Elles ___ fatiguées.",a:"sont",o:["sont","sommes","est","êtes"],ctx:"Your sisters after a long trip."},
  {q:"'Absent' comes from 'ab + esse'. What does it literally mean?",a:"Not being there",o:["Being away","Not being there","Going far","Being absent-minded"]},
],
combine:[
  {hint:"I + être + nationality → Introduce yourself",answer:"Je suis américain",accept:["je suis americain","je suis américain","je suis anglais","je suis français"]},
  {hint:"She + être + profession + city → Introduce someone",answer:"Elle est médecin à Paris",accept:["elle est médecin à paris","elle est medecin a paris","elle est docteur à paris"]},
  {hint:"We + être + tired + today → Describe how you feel",answer:"Nous sommes fatigués aujourd'hui",accept:["nous sommes fatigués aujourd'hui","nous sommes fatigues aujourd'hui"]},
],
weave:[
  {en:"I am tired but she is happy and we are ready.",known:["je","suis","fatigué","elle","est","contente","nous","sommes","prêts"],sample:"Je suis fatigué but elle est contente and nous sommes prêts."},
  {en:"She is a doctor in Paris and he is a student.",known:["elle","est","médecin","à","il","étudiant"],sample:"Elle est médecin à Paris and il est étudiant."},
  {en:"Are you ready? It's no big deal.",known:["vous","êtes","prêts","c'est","pas","grave"],sample:"Vous êtes prêts? C'est pas grave."},
],
review:[
  {type:"listen",audio:"Elle est médecin à Paris.",q:"What did you hear?",a:"She is a doctor in Paris",o:["She is a doctor in Paris","We are tired","I am a student","He is ready"]},
  {type:"odd",q:"Which does NOT belong?",items:["suis","es","est","fait"],a:"fait",reason:"First three are être conjugations. 'fait' is from 'faire'."},
  {type:"context",situation:"You and your friends just climbed a mountain. You're exhausted.",a:"Nous sommes fatigués",o:["Nous sommes fatigués","Je suis content","Vous êtes prêts","Il est médecin"]},
  // Cross-lesson (from L1):
  {type:"fill_ctx",s:"___, je voudrais un café.",a:"Bonjour",o:["Bonjour","Bonsoir","Merci","Salut"],ctx:"Morning at a café. Greet first."},
],
sayIt:[
  {situation:"You meet someone at a party. Introduce yourself — say who you are and ask about them.",target:["je","suis","tu","es","et","toi"]},
  {situation:"Describe your group: you're tired, she's a doctor, and they're happy.",target:["suis","fatigué","est","médecin","sont","contents"]},
],
miniConv:{topic:"Introducing yourself and describing people using être",starter:"Salut ! Comment tu t'appelles ? Tu es d'où ?"},
},
{id:12,title:"Everyday Phrases",sub:"What everyone says but textbooks skip",icon:Sparkles,level:"A1",
grammar:{title:"Everyday Conversation Phrases",sections:[
  {type:"intro",text:"*Ces expressions* — these phrases — are usually taught at B1-B2 in textbooks. But *les Français les utilisent tous les jours.* Learning them early dramatically improves *la fluidité.*"},
  {type:"block",label:"Structure Phrases",items:[
    {fr:"Il y a...",en:"There is/are",note:"Word for word: 'It there has.' English equivalent: 'there is/are.'"},
    {fr:"Il faut...",en:"One must",note:"Impersonal — 'il' is structural (like English 'it' in 'it's raining')."},
    {fr:"En fait...",en:"Actually / In fact",note:"Identical to English 'in fact' — direct cognate."},
  ]},
  {type:"block",label:"Reaction Phrases",items:[
    {fr:"Ça marche",en:"Sounds good",note:"Literally: 'that walks/works.' Like English 'that works for me.'"},
    {fr:"Ça dépend",en:"It depends",note:"Identical to English 'it depends.'"},
    {fr:"D'accord",en:"Okay",note:"Root: Latin 'cor' (heart) — 'hearts in agreement.'"},
  ]},
  {type:"culture",text:"*Ça* is French's Swiss Army knife. Ça va (how are you), Ça marche (sounds good), Ça dépend (it depends), Ça suffit (that's enough), Ça m'énerve (that annoys me). Learning *ça* unlocks dozens of expressions."},
  {type:"howToSay",words:[
    {fr:"Il y a",phonetic:"eel ee AH",ipa:"/il j a/",notes:"Three tiny syllables blended together. The 'y' sounds like English 'ee'."},
    {fr:"Ça marche",phonetic:"sah MARSH",ipa:"/sa maʁʃ/",notes:"'ça' like 'sah'. 'marche' — the 'ch' is like English 'sh'."},
    {fr:"En fait",phonetic:"ahn FEH",ipa:"/ɑ̃ fɛ/",notes:"'en' is nasal 'ah' — don't say the 'n'. 'fait' rhymes with 'met'."},
  ]},
  {type:"tip",text:"*Ça va* is both question AND answer. *Ça va ?* (How are you?) → *Ça va.* (I'm fine.) Two French people in an elevator: *Ça va ? — Ça va.* The world's shortest conversation."},
],quickRecall:{q:"'En fait' is a cognate of which English phrase?",a:"In fact",o:["In fact","In case","In time","Indeed"]}},
examples:[
  {fr:"Il y a un bon restaurant ici.",en:"There's a good restaurant here.",bridge:"Il y a a good restaurant here."},
  {fr:"Il faut partir maintenant.",en:"We need to leave now.",bridge:"Il faut leave maintenant."},
  {fr:"En fait, je préfère le thé.",en:"Actually, I prefer tea.",bridge:"En fait, I préfère le tea."},
  {fr:"Ça marche, on se voit demain !",en:"Sounds good, see you tomorrow!",bridge:"Ça marche, see you demain!"},
  {fr:"Ça dépend.",en:"It depends.",bridge:"Ça dépend."},
  {fr:"D'accord, pas de problème.",en:"OK, no problem.",bridge:"D'accord, no problème."},
  {fr:"Bien sûr, il y a une pharmacie là-bas.",en:"Of course, there's a pharmacy over there.",bridge:"Bien sûr, il y a a pharmacy over there."},
  {fr:"Il faut manger, j'ai faim !",en:"We need to eat, I'm hungry!",bridge:"Il faut eat, I'm hungry!"},
],
fillFG:[
  {s:"There [___] a problem.",a:"y a",o:["y a","faut","est","va"],ctx:"Something went wrong at the hotel."},
  {s:"We [___] leave now.",a:"faut",o:["faut","y a","est","peut"],ctx:"Your train leaves in 5 minutes."},
  {s:"[___], I prefer tea.",a:"En fait",o:["En fait","Il faut","Ça va","D'accord"],ctx:"Someone offered you coffee but you want tea."},
  {s:"[___] good, see you tomorrow!",a:"Ça marche",o:["Ça marche","Ça va","D'accord","Merci"],ctx:"A friend just proposed dinner plans."},
  {s:"It [___].",a:"dépend",o:["dépend","marche","va","faut"],ctx:"Someone asked if you're coming tonight. You're not sure."},
],
fillBlanks:[
  {s:"Il ___ un problème.",a:"y a",o:["y a","faut","est","va"],ctx:"Report a problem at reception."},
  {s:"Il ___ faire attention.",a:"faut",o:["faut","y a","est","peut"],ctx:"Warn someone to be careful."},
  {s:"___ fait, je suis fatigué.",a:"En",o:["En","Il","Ça","De"],ctx:"Correct yourself — you said you were fine, but actually you're tired."},
  {s:"Ça ___ !",a:"marche",o:["marche","va","dépend","fait"],ctx:"Agree to a friend's plan."},
  {s:"___ de problème.",a:"Pas",o:["Pas","Il","Ça","En"],ctx:"Someone thanks you for helping. Reassure them."},
],
buildSentences:[
  {c:["Il","y","a","un","restaurant","ici"],en:"There is a restaurant here",trap:["est","faut"]},
  {c:["Il","faut","partir","maintenant"],en:"We must leave now",trap:["y","a","est"]},
  {c:["En","fait","je","préfère","le","thé"],en:"Actually, I prefer tea",trap:["un","suis"]},
  {c:["Ça","marche","on","se","voit","demain"],en:"Sounds good, see you tomorrow",trap:["est","fait"]},
],
quiz:[
  {q:"What does 'ça marche' literally mean?",a:"It walks/works",o:["It goes","It walks/works","It depends","It's good"]},
  {q:"What does 'il' represent in 'il y a'?",a:"A structure word (like 'it')",o:["He","A structure word (like 'it')","We","They"]},
  {q:"Your train leaves in 3 minutes. Express urgency.",a:"Il faut partir maintenant",o:["Il y a un train","Il faut partir maintenant","Ça marche","En fait, je préfère"],ctx:"You're at the platform."},
  {q:"'D'accord' comes from Latin 'cor'. What does 'cor' mean?",a:"Heart",o:["Agreement","Heart","Cord","Body"]},
  {q:"Someone offers coffee. You prefer tea. What do you say?",a:"En fait, je préfère le thé",o:["Ça marche","En fait, je préfère le thé","Il faut le thé","D'accord"],ctx:"Polite dinner situation."},
  {q:"'Il faut' is an impersonal structure. This means...",a:"It doesn't specify who must do it",o:["It's about 'he'","It doesn't specify who must do it","It's always negative","It's past tense"]},
  {q:"Which response should you NEVER use when agreeing to plans?",a:"Il faut",o:["Ça marche","D'accord","Il faut","Pas de problème"],ctx:"A friend suggests dinner tomorrow.",negative:true},
],
combine:[
  {hint:"'There is' + thing + place → Say something exists",answer:"Il y a un restaurant ici",accept:["il y a un restaurant ici","il y a un bon restaurant ici"]},
  {hint:"Actually + preference → Politely change your mind",answer:"En fait, je préfère le thé",accept:["en fait je préfère le thé","en fait, je préfère le thé","en fait je prefere le the"]},
  {hint:"Express urgency: must + leave + now",answer:"Il faut partir maintenant",accept:["il faut partir maintenant"]},
],
weave:[
  {en:"Actually, I am tired. There is a good restaurant here.",known:["en fait","je","suis","fatigué","il y a","bon","restaurant","ici"],sample:"En fait, je suis fatigué. Il y a a bon restaurant ici."},
  {en:"We must leave now. Sounds good, see you tomorrow!",known:["il faut","partir","maintenant","ça marche","demain"],sample:"Il faut partir maintenant. Ça marche, see you demain!"},
  {en:"It depends. Actually, I prefer tea please.",known:["ça dépend","en fait","je","préfère","thé","s'il vous plaît"],sample:"Ça dépend. En fait, je préfère le thé, s'il vous plaît."},
],
review:[
  {type:"listen",audio:"Il faut partir maintenant.",q:"What does this mean?",a:"We must leave now",o:["We must leave now","There's a restaurant here","I prefer tea","It depends"]},
  {type:"odd",q:"Which does NOT belong?",items:["Ça marche","Ça va","Ça dépend","Il faut"],a:"Il faut",reason:"First three use 'ça'. 'Il faut' uses 'il'."},
  {type:"context",situation:"A friend suggests going to the cinema. You agree.",a:"Ça marche",o:["Ça marche","Il faut","En fait","Il y a"]},
  // Cross-lesson:
  {type:"fill_ctx",s:"Je ___ fatigué.",a:"suis",o:["suis","est","faut","va"],ctx:"Tell someone you're tired. (être, Lesson 5)"},
  {type:"weave",en:"Actually, I prefer tea.",blanks:[{word:"Actually",answer:"En fait"},{word:"prefer",answer:"préfère"}],full:"En fait, je préfère le thé."},
],
sayIt:[
  {situation:"A friend proposes dinner tonight but you need to leave now. Respond naturally.",target:["il faut","partir","maintenant","ça marche","en fait"]},
  {situation:"Someone offers coffee. You'd rather have tea. Politely change your order.",target:["en fait","préfère","thé","d'accord"]},
],
miniConv:{topic:"Making plans and reacting to suggestions using everyday phrases",starter:"Salut ! Il y a un bon restaurant ici. On y va ?"},
},
// ══ LESSON 2: Pronunciation I ══
{id:2,title:"Pronunciation I",sub:"Silent letters, liaison, and sounds you already know",icon:Volume2,level:"A1",
grammar:{title:"French Sounds — Part 1",sections:[
  {type:"intro",text:"Good news: French pronunciation is more predictable than English. Once you learn the patterns, you can pronounce any word you read — even words you've never seen before. English can't say the same (think: cough, through, though)."},
  {type:"block",label:"Silent Letters — The Big Rule",items:[
    {fr:"Final consonants are usually silent",en:"The CaReFuL rule",note:"Most final consonants are silent: 'petit' = puh-TEE, 'grand' = GRAHN, 'français' = frahn-SEH. Exception: C, R, F, L are often pronounced. Remember: CaReFuL. 'Sac' (bag), 'pour' (for), 'chef', 'mal' (bad)."},
    {fr:"Final -e is silent",en:"But it activates the consonant before it",note:"'Petit' = puh-TEE (t is silent). 'Petite' = puh-TEET (e is silent but makes the t heard). This is how French marks feminine forms."},
    {fr:"The letter h is always silent",en:"As if it doesn't exist",note:"'Hôtel' = oh-TEL. 'Homme' (man) = UM. French h is purely decorative. But there are two types: 'h muet' (allows liaison) and 'h aspiré' (blocks it). More on this later."},
  ]},
  {type:"block",label:"Sounds You Already Know",items:[
    {fr:"a",en:"/a/ — like 'father'",note:"Always the same sound. Unlike English where 'a' can be 'cat', 'father', 'cake'."},
    {fr:"i",en:"/i/ — like 'see'",note:"Always 'ee'. Never like English 'sit'."},
    {fr:"ou",en:"/u/ — like 'food'",note:"Always 'oo'. 'Vous' = VOO, 'pour' = POOR."},
    {fr:"é",en:"/e/ — like 'day' (without the y glide)",note:"The accent mark tells you exactly how to pronounce it. 'Café' = ka-FEH."},
    {fr:"è / ê",en:"/ɛ/ — like 'bed'",note:"'Très' = TREH, 'être' = EH-truh. Open sound."},
  ]},
  {type:"howToSay",words:[
    {fr:"petit / petite",phonetic:"puh-TEE / puh-TEET",ipa:"/pəti/ /pətit/",notes:"Hear the difference? The 'e' at the end makes the 't' audible."},
    {fr:"français",phonetic:"frahn-SEH",ipa:"/fʁɑ̃sɛ/",notes:"The 's' at the end? Silent. The 'an'? Nasal (more in Lesson 3)."},
    {fr:"hôtel",phonetic:"oh-TEL",ipa:"/otɛl/",notes:"The 'h' is completely silent. Sounds exactly like English 'hotel' minus the 'h'."},
  ]},
  {type:"culture",text:"The silent letter system exists because French spelling fossilized around the 13th century while pronunciation kept evolving. The letters were once pronounced — 'petit' used to sound like 'puh-TEET'. The spelling stayed, the sounds moved on. It's like English 'knight' — the k was once spoken."},
  {type:"tip",text:"When in doubt about a final consonant, don't pronounce it. You'll be right 80% of the time. The CaReFuL exceptions (C, R, F, L) cover most of the rest."},
],quickRecall:{q:"In 'petit', which letter is silent?",a:"t",o:["p","t","i","e"]}},
examples:[
  {fr:"Le petit chat est ici.",en:"The little cat is here.",bridge:"Le petit cat est here."},
  {fr:"C'est un grand hôtel.",en:"It's a big hotel.",bridge:"C'est un grand hotel."},
  {fr:"Elle est française.",en:"She is French.",bridge:"Elle est French."},
  {fr:"Il est très fatigué.",en:"He is very tired.",bridge:"Il est très tired."},
  {fr:"Les amis sont contents.",en:"The friends are happy.",bridge:"Les amis sont happy."},
  {fr:"Un petit restaurant français.",en:"A small French restaurant.",bridge:"Un petit French restaurant."},
  {fr:"Merci beaucoup, c'est très beau.",en:"Thank you very much, it's very beautiful.",bridge:"Merci beaucoup, c'est très beautiful."},
],
fillFG:[
  {s:"The little [___] is here.",a:"chat",o:["chat","chien","homme","femme"],ctx:"You see a cute cat at a café. Say it in French."},
  {s:"It's a [___] hotel.",a:"grand",o:["grand","petit","bon","beau"],ctx:"Describing an impressive hotel to a friend."},
  {s:"She is [___].",a:"française",o:["française","français","anglaise","américaine"],ctx:"Telling someone about a woman's nationality."},
  {s:"He is [___] tired.",a:"très",o:["très","trop","un","bien"],ctx:"Your friend looks exhausted."},
  {s:"The [___] café is closed.",a:"petit",o:["petit","grand","bon","vieux"],ctx:"The small corner café isn't open today."},
],
fillBlanks:[
  {s:"Le ___ chat est ici.",a:"petit",o:["petit","grand","bon","gros"],ctx:"Describe the small cat sitting on the table."},
  {s:"C'est un ___ hôtel.",a:"grand",o:["grand","petit","bon","beau"],ctx:"You arrive at a huge hotel."},
  {s:"Elle est ___.",a:"française",o:["française","français","fatiguée","contente"],ctx:"Describe her nationality (she's from France)."},
  {s:"Il est ___ fatigué.",a:"très",o:["très","un","le","pas"],ctx:"He's VERY tired, emphasize it."},
  {s:"Le petit ___ est fermé.",a:"café",o:["café","restaurant","hôtel","chat"],ctx:"The little coffee shop is closed today."},
],
buildSentences:[
  {c:["Le","petit","chat","est","ici"],en:"The little cat is here",trap:["un","pas"]},
  {c:["C'est","un","grand","hôtel"],en:"It's a big hotel",trap:["le","petit"]},
  {c:["Elle","est","française"],en:"She is French",trap:["un","suis"]},
  {c:["Il","est","très","fatigué"],en:"He is very tired",trap:["suis","pas"]},
],
quiz:[
  {q:"In 'petit', which letter is silent at the end?",a:"t",o:["p","t","i","Both t and i"]},
  {q:"What does the CaReFuL rule tell you?",a:"C, R, F, L are often pronounced at the end",o:["All consonants are silent","C, R, F, L are often pronounced at the end","Only vowels are silent","Final e is always pronounced"]},
  {q:"'Petite' vs 'petit' — what's the difference in sound?",a:"The t is heard in petite",o:["No difference","The t is heard in petite","The p changes","The i is longer"]},
  {q:"Which word has a silent h?",a:"All of them",o:["Hôtel","Homme","Habiter","All of them"],ctx:"Think about French h in general.",negative:false},
  {q:"Which spelling does NOT match the 'eh' sound?",a:"é",o:["è","ê","é","ai"],negative:true},
  {q:"Why are French final letters often silent?",a:"Spelling froze while pronunciation evolved",o:["French people are lazy","Spelling froze while pronunciation evolved","To confuse foreigners","Letters were added later"]},
],
combine:[
  {hint:"The + small + cat + is + here → Describe what you see",answer:"Le petit chat est ici",accept:["le petit chat est ici"]},
  {hint:"She + is + French → State her nationality",answer:"Elle est française",accept:["elle est française","elle est francaise"]},
],
weave:[
  {en:"The small cat is here and the big hotel is there.",known:["le","petit","chat","est","ici","grand","hôtel"],sample:"Le petit chat est ici and le grand hôtel est there."},
  {en:"She is French and he is very tired.",known:["elle","est","française","il","très","fatigué"],sample:"Elle est française and il est très fatigué."},
  {en:"It's a big hotel. The small café is closed.",known:["c'est","un","grand","hôtel","le","petit","café"],sample:"C'est un grand hôtel. Le petit café est closed."},
],
review:[
  {type:"listen",audio:"Le petit chat est ici.",q:"What is being described?",a:"A small cat is here",o:["A small cat is here","A big hotel","She is French","He is tired"]},
  {type:"odd",q:"Which word's final letter IS pronounced?",items:["petit","grand","sac","français"],a:"sac",reason:"'Sac' ends in C — CaReFuL rule. The others have silent final consonants."},
  {type:"context",situation:"You want to say 'she is French' — which form?",a:"française",o:["français","française","france","françaises"]},
  {type:"fill_ctx",s:"___, je voudrais un café.",a:"Bonjour",o:["Bonjour","Bonsoir","Merci","Salut"],ctx:"It's morning. Greet first. (Lesson 1)"},
],
sayIt:[
  {situation:"Describe what you see: a small cat, a big hotel, and a French woman.",target:["petit","chat","grand","hôtel","française"]},
  {situation:"You're at a café. Describe the scene: the small café, the beautiful street.",target:["petit","café","rue","beau","très"]},
],
miniConv:{topic:"Describing things around you using pronunciation patterns",starter:"Regarde ! Il y a un petit chat ici. Tu le vois ?"},
},
// ══ LESSON 3: Pronunciation II ══
{id:3,title:"Pronunciation II",sub:"Nasal vowels, the French r, and sounds that don't exist in English",icon:Volume2,level:"A1",
grammar:{title:"French Sounds — Part 2",sections:[
  {type:"intro",text:"This lesson covers the sounds that make French sound *French*. The nasal vowels, the throaty *r*, and the *u* sound are what give the language its distinctive character. None of these exist in English — but they're all learnable."},
  {type:"block",label:"Nasal Vowels — The French Signature",items:[
    {fr:"on / om",en:"/ɔ̃/ — nasal 'oh'",note:"Say 'oh' but let air flow through your nose. Don't say the 'n'. 'Bon' = a nasal 'boh', NOT 'bonn'. 'Bonjour' starts with this sound."},
    {fr:"an / am / en / em",en:"/ɑ̃/ — nasal 'ah'",note:"Say 'ah' through your nose. 'Grand' = a nasal 'grah'. 'En fait' = nasal 'ah' + feh. 'Restaurant' ends with this sound."},
    {fr:"in / im / ain / ein",en:"/ɛ̃/ — nasal 'eh'",note:"Say 'eh' through your nose. 'Vin' (wine) = nasal 'veh'. 'Pain' (bread) = nasal 'peh'."},
  ]},
  {type:"block",label:"The French R",items:[
    {fr:"r",en:"/ʁ/ — throaty, like a soft gargle",note:"NOT like English 'r' at all. Say 'h' as in 'hello' but tighten your throat slightly. It's produced at the back of the throat, near where you gargle. Think of it as a gentle throat clearing. Practice: say 'hose' but gargle the 'h' slightly → that's close to French 'rose'."},
  ]},
  {type:"block",label:"The U Sound — Doesn't Exist in English",items:[
    {fr:"u",en:"/y/ — say 'ee' with rounded lips",note:"This is the hardest French sound for English speakers. Say 'ee' (as in 'see') but round your lips as if saying 'oo'. Keep your tongue in the 'ee' position but shape your lips for 'oo'. 'Rue' (street), 'tu' (you), 'du' (some)."},
    {fr:"u vs ou",en:"Two completely different sounds",note:"'Rue' (street) /ʁy/ vs 'roue' (wheel) /ʁu/. If you say 'ou' when you mean 'u', you'll say a different word. 'Tu' (you) vs 'tout' (all) — very different meanings."},
  ]},
  {type:"howToSay",words:[
    {fr:"bon / bonne",phonetic:"BOHN / BUN",ipa:"/bɔ̃/ /bɔn/",notes:"'Bon' is nasal (no 'n' sound). 'Bonne' the n IS pronounced because of the final e."},
    {fr:"restaurant",phonetic:"reh-stoh-RAHN",ipa:"/ʁɛs.to.ʁɑ̃/",notes:"Three nasal-free syllables then a nasal ending. The final 't' is silent."},
    {fr:"rue",phonetic:"RÜ",ipa:"/ʁy/",notes:"Throaty r + the u sound that doesn't exist in English."},
  ]},
  {type:"culture",text:"Nasal vowels are a distinctive feature of French among Romance languages. Italian, Spanish, and Portuguese (mostly) don't have them. They evolved in medieval French when the nasal consonants 'n' and 'm' were absorbed into the preceding vowel. The spelling kept the 'n/m' but the sound changed."},
  {type:"tip",text:"Quick test: pinch your nose while saying *bon*. If the sound changes, you're doing it right — the air was flowing through your nose. If it sounds the same, you're just saying 'bo' without nasalization."},
],quickRecall:{q:"What's the difference between 'bon' and 'bonne'?",a:"'Bon' is nasal (no n), 'bonne' the n is pronounced",o:["No difference","'Bon' is nasal (no n), 'bonne' the n is pronounced","'Bonne' is louder","'Bon' is longer"]}},
examples:[
  {fr:"C'est un bon restaurant.",en:"It's a good restaurant.",bridge:"C'est un bon restaurant."},
  {fr:"La rue est grande.",en:"The street is big.",bridge:"La rue est grande."},
  {fr:"Du pain et du vin.",en:"Some bread and some wine.",bridge:"Du pain and du vin."},
  {fr:"Il est content.",en:"He is happy.",bridge:"Il est content."},
  {fr:"Bonjour monsieur, du vin rouge, s'il vous plaît.",en:"Hello sir, some red wine, please.",bridge:"Bonjour monsieur, du vin rouge, please."},
  {fr:"C'est beau, la rue est très belle.",en:"It's beautiful, the street is very beautiful.",bridge:"C'est beau, la rue est très beautiful."},
  {fr:"Un blanc et un rouge, s'il vous plaît.",en:"A white and a red, please.",bridge:"Un blanc and un rouge, please."},
],
fillFG:[
  {s:"It's a [___] restaurant.",a:"bon",o:["bon","bonne","bien","mal"],ctx:"Recommend a restaurant to a friend."},
  {s:"The [___] is big.",a:"rue",o:["rue","roue","roux","riz"],ctx:"Describing a wide street in Paris."},
  {s:"Some [___] and some wine.",a:"pain",o:["pain","pan","panne","pin"],ctx:"Ordering at a French bistro."},
  {s:"He is [___].",a:"content",o:["content","contente","contents","contant"],ctx:"Your male friend looks cheerful."},
  {s:"It's a [___] day.",a:"bon",o:["bon","beau","bien","grand"],ctx:"Comment on the nice weather."},
],
fillBlanks:[
  {s:"C'est un ___ restaurant.",a:"bon",o:["bon","bonne","bien","mal"],ctx:"Recommend it — the food is great."},
  {s:"La ___ est grande.",a:"rue",o:["rue","roue","riz","roux"],ctx:"You're on a wide Parisian boulevard."},
  {s:"Du ___ et du vin.",a:"pain",o:["pain","pin","pan","pont"],ctx:"At the table — bread and wine."},
  {s:"Il est ___.",a:"content",o:["content","contente","fatigué","bon"],ctx:"He got good news. He's a man."},
  {s:"C'est ___ bon !",a:"très",o:["très","un","le","trop"],ctx:"The food is really delicious."},
],
buildSentences:[
  {c:["C'est","un","bon","restaurant"],en:"It's a good restaurant",trap:["bonne","le"]},
  {c:["La","rue","est","grande"],en:"The street is big",trap:["le","petit"]},
  {c:["Du","pain","et","du","vin"],en:"Some bread and some wine",trap:["un","le"]},
],
quiz:[
  {q:"How do you produce a nasal vowel?",a:"Let air flow through your nose",o:["Speak louder","Let air flow through your nose","Hold your tongue differently","Speak slower"]},
  {q:"What's the 'nose pinch' test for?",a:"Checking if you're nasalizing correctly",o:["Testing hearing","Checking if you're nasalizing correctly","A breathing exercise","Testing microphone"]},
  {q:"The French 'r' is produced where?",a:"Back of the throat",o:["Tip of the tongue","Back of the throat","The lips","The teeth"]},
  {q:"'Rue' (street) vs 'roue' (wheel) — what's different?",a:"The vowel: u /y/ vs ou /u/",o:["The r sound","The vowel: u /y/ vs ou /u/","Nothing","The stress"]},
  {q:"Which does NOT contain a nasal vowel?",a:"café",o:["bon","restaurant","pain","café"],negative:true},
  {q:"Why do French words have 'n' or 'm' that aren't pronounced?",a:"The n/m was absorbed into the vowel over centuries",o:["It's a typo","The n/m was absorbed into the vowel over centuries","To look more Latin","For grammatical reasons"]},
],
combine:[
  {hint:"It's + a + good + restaurant → Recommend a place",answer:"C'est un bon restaurant",accept:["c'est un bon restaurant"]},
  {hint:"Some + bread + and + some + wine → Order at a bistro",answer:"Du pain et du vin",accept:["du pain et du vin"]},
],
weave:[
  {en:"It's a good restaurant. The street is big and beautiful.",known:["c'est","un","bon","restaurant","la","rue","est","grande","et"],sample:"C'est un bon restaurant. La rue est grande et beautiful."},
  {en:"Some bread and some wine, please. He is happy.",known:["du","pain","et","vin","s'il vous plaît","il","est","content"],sample:"Du pain et du vin, s'il vous plaît. Il est content."},
],
review:[
  {type:"listen",audio:"C'est un bon restaurant.",q:"What did you hear?",a:"It's a good restaurant",o:["It's a good restaurant","The street is big","He is happy","Some bread please"]},
  {type:"odd",q:"Which word does NOT have a nasal vowel?",items:["bon","vin","pain","café"],a:"café",reason:"'Café' has no nasal. The others all contain nasal vowels."},
  {type:"context",situation:"You're at a bistro. Order bread and wine.",a:"Du pain et du vin",o:["Du pain et du vin","Un café s'il vous plaît","Je suis fatigué","Ça marche"]},
  {type:"fill_ctx",s:"Je ___ américain.",a:"suis",o:["suis","est","es","sommes"],ctx:"Introduce yourself. (Lesson 5 — être)"},
],
sayIt:[
  {situation:"You're at a bistro. Describe the food: a good restaurant, some bread and wine.",target:["bon","restaurant","pain","vin","rue"]},
  {situation:"Tell someone that he is happy and the street is beautiful.",target:["il","content","rue","beau","très"]},
],
miniConv:{topic:"Describing food, places, and things using nasal vowels and French sounds",starter:"Bonjour ! Tu connais un bon restaurant ici ?"},
},
// ══ LESSON 4: Tu vs Vous ══
{id:4,title:"Tu vs Vous",sub:"The art of French formality",icon:Globe,level:"A1",
grammar:{title:"Tu vs Vous — When Familiarity Matters",sections:[
  {type:"intro",text:"Every time you say 'you' in French, you make a social decision. *Tu* is informal, *vous* is formal (or plural). Getting this wrong won't cause a misunderstanding — but it will cause raised eyebrows. It's the difference between shaking hands and slapping someone's back."},
  {type:"block",label:"Tu — The Informal You",items:[
    {fr:"Tu",en:"You (one person, informal)",note:"Used with: friends, family, children, pets, people your age in casual settings, God (ironically). If someone says 'tu' to you, you can say 'tu' back."},
    {fr:"Tu es français ?",en:"Are you French?",note:"Note the verb form: 'tu es' (you are). Tu always takes its own conjugation."},
    {fr:"Toi",en:"You (emphatic/after preposition)",note:"'Et toi ?' (And you?), 'Avec toi' (With you). The emphatic form for tu."},
  ]},
  {type:"block",label:"Vous — The Formal You",items:[
    {fr:"Vous",en:"You (formal singular OR any plural)",note:"Used with: strangers, older people, your boss, shopkeepers, customer service, anyone you want to show respect to. Also used for ANY group of people, even friends: 'Vous êtes prêts ?' (Are you all ready?)"},
    {fr:"Vous êtes américain ?",en:"Are you American?",note:"'Vous êtes' — formal. Same verb form whether talking to one person formally or multiple people."},
  ]},
  {type:"block",label:"The Tutoiement Dance",items:[
    {fr:"On se tutoie ?",en:"Shall we use tu?",note:"When someone suggests switching from 'vous' to 'tu', it's a social milestone. It means 'I consider us close enough now.' Usually the older or higher-ranking person initiates."},
    {fr:"The wrong choice",en:"What happens if you get it wrong",note:"Using 'tu' with a stranger in France can come across as rude or presumptuous — like calling your professor by their first name without being invited to. Using 'vous' with a close friend is weird too — it creates awkward distance."},
  ]},
  {type:"howToSay",words:[
    {fr:"Tu es",phonetic:"tü EH",ipa:"/ty ɛ/",notes:"The 'u' in 'tu' is the French u sound — not 'too'. Lips rounded, tongue forward."},
    {fr:"Vous êtes",phonetic:"vooz EHT",ipa:"/vuz ɛt/",notes:"Liaison: the 's' of vous connects to êtes. Without liaison it would sound choppy."},
  ]},
  {type:"culture",text:"The tu/vous distinction reflects France's deep awareness of social hierarchy and relationships. In Scandinavian countries, the formal 'you' has largely disappeared. In French, it thrives. Even French teenagers use 'vous' with their friends' parents. President Macron and his wife publicly use 'vous' with each other — though this is unusual even for France."},
  {type:"tip",text:"When in doubt, use *vous*. Nobody is offended by excessive politeness. Being too formal is awkward; being too informal is rude. Always start with *vous* and wait to be invited to use *tu*."},
],quickRecall:{q:"'On se tutoie ?' means...",a:"Shall we use tu with each other?",o:["Shall we use tu with each other?","Are you French?","Do you speak English?","Where are you from?"]}},
examples:[
  {fr:"Tu es français ? — Oui, et toi ?",en:"Are you French? — Yes, and you?",bridge:"Tu es French? — Oui, et toi?"},
  {fr:"Vous êtes américain, monsieur ?",en:"Are you American, sir?",bridge:"Vous êtes American, monsieur?"},
  {fr:"On se tutoie ?",en:"Shall we use tu?",bridge:"On se tutoie?"},
  {fr:"Tu viens ce soir ?",en:"Are you coming tonight?",bridge:"Tu viens tonight?"},
  {fr:"Vous pouvez répéter, s'il vous plaît ?",en:"Can you repeat, please?",bridge:"Vous pouvez répéter, s'il vous plaît?"},
  {fr:"Comment tu t'appelles ?",en:"What's your name? (informal)",bridge:"Comment tu t'appelles?"},
  {fr:"Comment vous appelez-vous, madame ?",en:"What is your name, madam? (formal)",bridge:"Comment vous appelez-vous, madame?"},
  {fr:"Tu as quel âge ? — Et toi ?",en:"How old are you? — And you?",bridge:"Tu as how old? — Et toi?"},
],
fillFG:[
  {s:"[___] are French? (asking a friend)",a:"Tu es",o:["Tu es","Vous êtes","Il est","Je suis"],ctx:"Casual conversation with someone your age at a bar."},
  {s:"[___] American, sir? (asking formally)",a:"Vous êtes",o:["Vous êtes","Tu es","Il est","Nous sommes"],ctx:"A hotel receptionist asking a guest."},
  {s:"And [___]? (informal)",a:"toi",o:["toi","vous","lui","moi"],ctx:"Your friend asked you a question. Now ask back."},
  {s:"Can [___] repeat? (to a stranger)",a:"vous",o:["vous","tu","il","on"],ctx:"You didn't hear what the shopkeeper said."},
  {s:"Are [___] coming tonight? (to a friend)",a:"tu",o:["tu","vous","il","nous"],ctx:"Texting a close friend about evening plans."},
],
fillBlanks:[
  {s:"___ es français ?",a:"Tu",o:["Tu","Vous","Il","Je"],ctx:"At a party, talking to someone your age."},
  {s:"___ êtes américain ?",a:"Vous",o:["Vous","Tu","Ils","Nous"],ctx:"A formal first meeting with a business contact."},
  {s:"Et ___ ?",a:"toi",o:["toi","vous","moi","lui"],ctx:"Your friend just shared something. Ask them back casually."},
  {s:"___ viens ce soir ?",a:"Tu",o:["Tu","Vous","Il","On"],ctx:"Texting your best friend."},
  {s:"___ pouvez répéter ?",a:"Vous",o:["Vous","Tu","Il","Je"],ctx:"Speaking to a stranger at the train station."},
],
buildSentences:[
  {c:["Tu","es","français"],en:"You are French (informal)",trap:["Vous","êtes"]},
  {c:["Vous","êtes","américain"],en:"You are American (formal)",trap:["Tu","es"]},
  {c:["Tu","viens","ce","soir"],en:"You coming tonight? (informal)",trap:["Vous","êtes"]},
  {c:["On","se","tutoie"],en:"Shall we use tu?",trap:["vous","est"]},
],
quiz:[
  {q:"You meet your friend's mother for the first time. You say...",a:"Vous",o:["Tu","Vous","On","Toi"],ctx:"Dinner at a friend's house."},
  {q:"Which should you NEVER say to a stranger?",a:"Tu es fatigué ?",o:["Vous êtes fatigué ?","Excusez-moi","Tu es fatigué ?","Bonjour monsieur"],ctx:"At a formal reception.",negative:true},
  {q:"'On se tutoie ?' — who typically suggests this?",a:"The older or higher-ranking person",o:["The younger person","The older or higher-ranking person","Anyone can","Only women"]},
  {q:"When in doubt between tu and vous, always use...",a:"Vous",o:["Tu","Vous","Either is fine","On"]},
  {q:"Macron and his wife publicly use ___ with each other.",a:"Vous",o:["Tu","Vous","On","Both"]},
  {q:"'Vous' is ALSO used for...",a:"Any group of people, even friends",o:["Only formal situations","Any group of people, even friends","Written French only","Old people only"]},
],
combine:[
  {hint:"You (informal) + are + French → Ask a friend",answer:"Tu es français",accept:["tu es français","tu es francais"]},
  {hint:"You (formal) + are + American → Ask politely",answer:"Vous êtes américain",accept:["vous êtes américain","vous etes americain","vous êtes americain"]},
  {hint:"Shall + we + use tu → Suggest informality",answer:"On se tutoie",accept:["on se tutoie"]},
],
weave:[
  {en:"You are French, right? And you, are you American?",known:["tu","es","français","et","toi","vous","êtes","américain"],sample:"Tu es français, right? Et toi, vous êtes américain?"},
  {en:"Are you coming tonight? She is tired but I am ready.",known:["tu","viens","ce","soir","elle","est","fatigué","je","suis","prêts"],sample:"Tu viens ce soir? Elle est fatigué but je suis ready."},
  {en:"Excuse me, can you repeat please? I don't understand.",known:["excusez-moi","vous","pouvez","répéter","s'il vous plaît","je","ne","comprends","pas"],sample:"Excusez-moi, vous pouvez répéter s'il vous plaît? Je ne comprends pas."},
],
review:[
  {type:"listen",audio:"Vous êtes américain, monsieur ?",q:"Is this formal or informal?",a:"Formal — uses vous",o:["Formal — uses vous","Informal — uses tu","Can't tell","Neither"]},
  {type:"odd",q:"Which does NOT use 'tu'?",items:["Tu es français","Et toi ?","Vous êtes prêts","Tu viens ce soir"],a:"Vous êtes prêts",reason:"This uses 'vous' — either formal or plural."},
  {type:"context",situation:"First day at a new job. You meet your boss.",a:"Bonjour, vous",o:["Salut, tu","Bonjour, vous","Hey, tu","Coucou"]},
  {type:"fill_ctx",s:"Il ___ un bon restaurant ici.",a:"y a",o:["y a","faut","est","va"],ctx:"Tell someone there's a good restaurant. (Lesson 12)"},
],
sayIt:[
  {situation:"You meet your friend's mother for the first time. Greet her formally and ask how she is.",target:["bonjour","vous","madame","êtes"]},
  {situation:"A colleague suggests switching to 'tu'. Accept and then ask them a casual question.",target:["tu","toi","on se tutoie","viens"]},
],
miniConv:{topic:"Navigating formal and informal situations with tu and vous",starter:"Bonjour ! Vous êtes nouveau ici ? Comment vous appelez-vous ?"},
},
// ══ LESSON 6: Avoir ══
{id:6,title:"Avoir: What You Have",sub:"The verb of feelings, age & needs",icon:Heart,level:"A1",
grammar:{title:"Avoir — To Have",sections:[
  {type:"intro",text:"In English, you ARE hungry, you ARE 20 years old. In French, you HAVE hunger, you HAVE 20 years. *Avoir* is the verb of states, feelings, and possession."},
  {type:"conjugation",verb:"avoir — to have",rows:[
    {pr:"J'",conj:"ai",en:"I have",pron:"/ʒe/"},
    {pr:"Tu",conj:"as",en:"You have",pron:"/ty a/"},
    {pr:"Il/Elle",conj:"a",en:"He/She has",pron:"/il a/"},
    {pr:"Nous",conj:"avons",en:"We have",pron:"/nu.za.vɔ̃/"},
    {pr:"Vous",conj:"avez",en:"You have",pron:"/vu.za.ve/"},
    {pr:"Ils/Elles",conj:"ont",en:"They have",pron:"/il.zɔ̃/"},
  ]},
  {type:"block",label:"Avoir Expressions (states & feelings)",items:[
    {fr:"J'ai faim",en:"I'm hungry (I have hunger)",note:"French uses avoir for physical states, not être."},
    {fr:"J'ai soif",en:"I'm thirsty (I have thirst)",note:"Same pattern: avoir + noun."},
    {fr:"J'ai chaud / froid",en:"I'm hot / cold",note:"Never say 'je suis chaud' — that means something very different!"},
    {fr:"J'ai peur",en:"I'm afraid (I have fear)",note:"Fear ≈ peur. Add 'de' for what you fear: j'ai peur de l'eau."},
    {fr:"J'ai 20 ans",en:"I'm 20 years old",note:"Age uses avoir: 'J'ai vingt ans' = I have 20 years. Ans ≈ annual."},
    {fr:"J'ai besoin de",en:"I need (I have need of)",note:"Always followed by 'de': j'ai besoin de dormir."},
  ]},
  {type:"tip",text:"Quick way to remember: if it's a *feeling* or *state*, use *avoir*. If it's a *description* or *identity*, use *être*. You ARE a student (être), but you HAVE hunger (avoir)."},
  {type:"etymology",pairs:[
    {fr:"raison",en:"reason",root:"Latin 'ratio' → French raison. 'Tu as raison' = You have reason = You're right."},
    {fr:"tort",en:"tort/wrong",root:"Latin 'tortus' (twisted) → French tort. 'Il a tort' = He has wrong = He's wrong."},
    {fr:"mal",en:"malady/bad",root:"Latin 'malum' → French mal. 'J'ai mal' = I have pain. Cognate: malady, malice."},
  ]},
  {type:"culture",text:"In French, you don't *feel* emotions — you *have* them. This isn't just grammar, it reflects a different way of relating to feelings. You have fear, you have hunger, you have reason."},
],quickRecall:{q:"How do you say 'I'm hungry' in French?",a:"J'ai faim",o:["Je suis faim","J'ai faim","Je suis fatigué","J'ai mangé"]}},
examples:[
  {fr:"J'ai vingt ans.",en:"I'm twenty years old.",bridge:"J'ai twenty ans."},
  {fr:"Tu as faim ?",en:"Are you hungry?",bridge:"Tu as hungry?"},
  {fr:"Elle a trois enfants.",en:"She has three children.",bridge:"Elle a three children."},
  {fr:"Nous avons un problème.",en:"We have a problem.",bridge:"Nous avons un problème."},
  {fr:"Vous avez raison.",en:"You're right.",bridge:"Vous avez right."},
  {fr:"Ils ont soif.",en:"They're thirsty.",bridge:"Ils ont thirsty."},
  {fr:"J'ai besoin de partir.",en:"I need to leave.",bridge:"J'ai besoin de leave."},
],
fillFG:[
  {s:"I [___] twenty years old.",a:"ai",o:["ai","suis","est","as"],ctx:"Telling someone your age."},
  {s:"She [___] afraid of dogs.",a:"a peur",o:["a peur","est peur","a faim","est peur de"],ctx:"Expressing fear — avoir, not être."},
  {s:"We [___] a problem.",a:"avons",o:["avons","sommes","ont","êtes"],ctx:"Nous + avoir."},
  {s:"You (formal) [___] right.",a:"avez raison",o:["avez raison","êtes raison","avez tort","avez faim"],ctx:"Telling someone they're correct."},
  {s:"I [___] to leave now.",a:"ai besoin de",o:["ai besoin de","suis besoin","ai faim de","ai peur de"],ctx:"Expressing a need."},
],
fillBlanks:[
  {s:"J'___ vingt ans.",a:"ai",o:["ai","suis","est","as"],ctx:"Your age — avoir, not être."},
  {s:"Tu ___ faim ?",a:"as",o:["as","es","ai","a"],ctx:"Asking if someone is hungry."},
  {s:"Elle ___ trois enfants.",a:"a",o:["a","est","ai","ont"],ctx:"She has three children."},
  {s:"Nous ___ un problème.",a:"avons",o:["avons","sommes","ont","êtes"],ctx:"We have a problem."},
  {s:"Ils ___ soif.",a:"ont",o:["ont","sont","avons","avez"],ctx:"They are thirsty — avoir!"},
],
buildSentences:[
  {c:["J'","ai","vingt","ans"],en:"I'm twenty years old.",trap:["suis","est"]},
  {c:["Tu","as","faim","?"],en:"Are you hungry?",trap:["es","soif"]},
  {c:["Elle","a","besoin","de","partir"],en:"She needs to leave.",trap:["est","suis"]},
  {c:["Vous","avez","raison"],en:"You're right.",trap:["êtes","tort"]},
],
quiz:[
  {q:"How do you say 'I'm cold' in French?",a:"J'ai froid",o:["J'ai froid","Je suis froid","J'ai chaud","Je suis froid"],ctx:"Physical state = avoir"},
  {q:"What does 'Tu as tort' mean?",a:"You're wrong",o:["You're wrong","You're right","You're tired","You have a cake"],ctx:"Tort ≈ tort (wrong)"},
  {q:"Complete: 'J'ai ___ de dormir'",a:"besoin",o:["besoin","faim","peur","raison"],ctx:"I need to sleep"},
  {q:"Which uses ÊTRE, not avoir?",a:"Je suis fatigué",o:["Je suis fatigué","J'ai faim","J'ai peur","J'ai chaud"],negative:true,ctx:"Fatigue is a description (être), not a state (avoir)"},
  {q:"How old is someone who says 'J'ai trente ans'?",a:"30",o:["30","13","3","20"],ctx:"Trente = thirty"},
  {q:"'Nous avons' means...",a:"We have",o:["We have","We are","They have","You have"],ctx:"Nous = we, avons = have"},
],
combine:[
  {hint:"Hungry + need food → Express that you're hungry and need to eat",answer:"J'ai faim, j'ai besoin de manger.",accept:["j'ai faim j'ai besoin de manger","j'ai faim, j'ai besoin de manger"]},
  {hint:"Your age + right about something → Say your age and agree with someone",answer:"J'ai vingt ans et vous avez raison.",accept:["j'ai vingt ans et vous avez raison","j'ai 20 ans et vous avez raison"]},
  {hint:"Cold + need to leave → Say you're cold and need to leave",answer:"J'ai froid, j'ai besoin de partir.",accept:["j'ai froid j'ai besoin de partir","j'ai froid, j'ai besoin de partir"]},
],
weave:[
  {en:"I'm hungry and she's thirsty. We need water.",known:["j'ai","faim","elle","a","soif","nous","avons","besoin","eau"],sample:"J'ai faim and elle a soif. Nous avons besoin d'water."},
  {en:"You're right, I'm twenty years old and I'm afraid of dogs.",known:["tu","as","raison","j'ai","vingt","ans","peur"],sample:"Tu as raison, j'ai vingt ans and j'ai peur of dogs."},
  {en:"They have a problem. He's wrong and she's right.",known:["ils","ont","un","problème","il","a","tort","elle","raison"],sample:"Ils ont un problème. Il a tort and elle a raison."},
],
review:[
  {type:"listen",audio:"J'ai très faim aujourd'hui.",q:"What is the speaker feeling?",a:"Very hungry",o:["Very hungry","Very thirsty","Very cold","Very tired"]},
  {type:"odd",q:"Which does NOT use avoir?",items:["J'ai faim","J'ai peur","Je suis content","J'ai froid"],a:"Je suis content",reason:"Content/happy uses être (description), not avoir."},
  {type:"context",situation:"You're at a friend's house. It's freezing inside.",a:"J'ai froid",o:["J'ai froid","J'ai chaud","Je suis froid","J'ai faim"]},
  {type:"fill_ctx",s:"Elle ___ besoin de partir.",a:"a",o:["a","est","ai","ont"],ctx:"She needs to leave. (avoir)"},
  {type:"context",situation:"Someone asks your age. You're 25.",a:"J'ai vingt-cinq ans",o:["J'ai vingt-cinq ans","Je suis vingt-cinq","J'ai vingt-cinq","Je suis vingt-cinq ans"]},
  {type:"fill_ctx",s:"Je ___ content. (Lesson 5 — être)",a:"suis",o:["suis","ai","as","est"],ctx:"Happy = description = être, not avoir."},
  {type:"weave",en:"I'm hungry and I need coffee.",blanks:[{word:"hungry",answer:"faim"},{word:"need",answer:"besoin"}],full:"J'ai faim et j'ai besoin de café."},
],
sayIt:[
  {situation:"You arrive at a friend's place feeling hungry, thirsty, and cold. Tell them how you feel.",target:["j'ai","faim","soif","froid"]},
  {situation:"Introduce yourself: your age, that you're a student, and what you need.",target:["ai","ans","suis","étudiant","besoin"]},
],
miniConv:{topic:"Talking about how you feel and what you need using avoir",starter:"Salut ! Ça va ? Tu as faim ? On peut manger quelque chose."},
},
// ══ LESSON 7: Articles & Gender ══
{id:7,title:"Le, La, Les",sub:"Every French noun has a gender — let's crack the code",icon:BookOpen,level:"A1",
grammar:{title:"Articles & Gender",sections:[
  {type:"intro",text:"In French, every noun is either masculine (*le*) or feminine (*la*). There's no 'it' — a table is *she*, a book is *he*. This might seem random, but there are patterns."},
  {type:"block",label:"Definite Articles (the)",items:[
    {fr:"le",en:"the (masculine)",note:"Le livre (the book), le téléphone (the phone). Before vowels: l' (l'hôtel)."},
    {fr:"la",en:"the (feminine)",note:"La maison (the house), la table (the table). Before vowels: l' (l'école)."},
    {fr:"les",en:"the (plural)",note:"Les livres, les maisons. Same for both genders in plural!"},
  ]},
  {type:"block",label:"Indefinite Articles (a/some)",items:[
    {fr:"un",en:"a (masculine)",note:"Un livre (a book), un café (a coffee)."},
    {fr:"une",en:"a (feminine)",note:"Une maison (a house), une table (a table)."},
    {fr:"des",en:"some (plural)",note:"Des livres (some books). This has no English equivalent!"},
  ]},
  {type:"tip",text:"Gender shortcuts: words ending in *-tion* are feminine (la nation, la situation). Words ending in *-ment* are masculine (le moment, le document). Words ending in *-eur* are usually masculine (le docteur). These patterns cover ~80% of nouns!"},
  {type:"block",label:"Common Objects — Masculine",items:[
    {fr:"le livre",en:"the book",note:"Livre ≈ library (same Latin root 'liber')."},
    {fr:"le téléphone",en:"the phone",note:"Téléphone ≈ telephone. Almost all tech words are masculine."},
    {fr:"le moment",en:"the moment",note:"-ment ending = masculine."},
  ]},
  {type:"block",label:"Common Objects — Feminine",items:[
    {fr:"la maison",en:"the house",note:"Maison ≈ mansion. -son ending often feminine."},
    {fr:"la voiture",en:"the car",note:"La voiture = the car. -ure ending often feminine."},
    {fr:"la musique",en:"the music",note:"Musique ≈ music. -ique ending = feminine."},
    {fr:"la table",en:"the table",note:"Table ≈ table. Many -le words are feminine."},
    {fr:"la famille",en:"the family",note:"Famille ≈ family. -ille ending = feminine."},
  ]},
  {type:"culture",text:"Why does gender matter? Because adjectives change! Le petit chat (the small cat) but la petite maison (the small house). Get the article right and the rest follows."},
],quickRecall:{q:"Which article goes with 'maison'?",a:"la",o:["le","la","les","un"]}},
examples:[
  {fr:"Le livre est sur la table.",en:"The book is on the table.",bridge:"Le livre is sur la table."},
  {fr:"La voiture est rouge.",en:"The car is red.",bridge:"La voiture is rouge."},
  {fr:"Il y a un téléphone sur la chaise.",en:"There's a phone on the chair.",bridge:"Il y a un téléphone sur la chaise."},
  {fr:"La musique est belle.",en:"The music is beautiful.",bridge:"La musique is beautiful."},
  {fr:"Les maisons sont grandes.",en:"The houses are big.",bridge:"Les maisons sont big."},
  {fr:"J'ai un livre et une table.",en:"I have a book and a table.",bridge:"J'ai un livre et une table."},
  {fr:"La famille est à la maison.",en:"The family is at home.",bridge:"La famille is à la maison."},
],
fillFG:[
  {s:"[___] book is on the table.",a:"Le",o:["Le","La","Les","Un"],ctx:"Livre = masculine → le."},
  {s:"[___] car is red.",a:"La",o:["La","Le","Les","Une"],ctx:"Voiture = feminine → la."},
  {s:"I have [___] phone.",a:"un",o:["un","une","le","la"],ctx:"Téléphone = masculine → un."},
  {s:"[___] houses are big.",a:"Les",o:["Les","Le","La","Des"],ctx:"Plural = les, regardless of gender."},
  {s:"There are [___] books on the table.",a:"des",o:["des","les","un","la"],ctx:"Some (plural indefinite) = des."},
],
fillBlanks:[
  {s:"___ livre est sur la table.",a:"Le",o:["Le","La","Les","Un"],ctx:"Livre = masculine."},
  {s:"___ maison est grande.",a:"La",o:["La","Le","Les","Une"],ctx:"Maison = feminine."},
  {s:"Il y a ___ téléphone ici.",a:"un",o:["un","une","le","des"],ctx:"A phone — masculine indefinite."},
  {s:"___ musique est belle.",a:"La",o:["La","Le","Les","Un"],ctx:"Musique = feminine (-ique ending)."},
  {s:"J'ai ___ livres.",a:"des",o:["des","les","un","la"],ctx:"Some books — plural indefinite."},
],
buildSentences:[
  {c:["Le","livre","est","sur","la","table"],en:"The book is on the table.",trap:["un","les"]},
  {c:["La","voiture","est","rouge"],en:"The car is red.",trap:["Le","un"]},
  {c:["Il","y","a","un","téléphone"],en:"There is a phone.",trap:["une","la"]},
  {c:["Les","maisons","sont","grandes"],en:"The houses are big.",trap:["La","petit"]},
],
quiz:[
  {q:"What gender is 'musique'?",a:"Feminine (la musique)",o:["Feminine (la musique)","Masculine (le musique)","Both","Neither"]},
  {q:"Words ending in -tion are usually...",a:"Feminine",o:["Feminine","Masculine","Either","Plural"]},
  {q:"What is 'des'?",a:"Some (plural)",o:["Some (plural)","The (plural)","A (masculine)","The (feminine)"]},
  {q:"'L'hôtel' uses l' because...",a:"The noun starts with a vowel/h",o:["The noun starts with a vowel/h","It's feminine","It's plural","It's a special word"],ctx:"Le/la become l' before vowels."},
  {q:"Which is WRONG?",a:"Le maison",o:["Le maison","La voiture","Le livre","Les tables"],negative:true,ctx:"Maison is feminine → la maison."},
  {q:"'La famille est à la maison' means...",a:"The family is at home",o:["The family is at home","The family has a house","The house is familiar","A family is a house"]},
],
combine:[
  {hint:"Book + on table + red → Describe a red book on the table",answer:"Le livre rouge est sur la table.",accept:["le livre rouge est sur la table","le livre est rouge sur la table"]},
  {hint:"Car + big + here → Say there's a big car here",answer:"Il y a une grande voiture ici.",accept:["il y a une grande voiture ici","il y a une voiture grande ici"]},
  {hint:"Music + beautiful + house → The music in the house is beautiful",answer:"La musique est belle à la maison.",accept:["la musique est belle a la maison","la musique a la maison est belle"]},
],
weave:[
  {en:"The book is on the table and the chair is small.",known:["le","livre","est","sur","la","table","chaise","petit"],sample:"Le livre est sur la table and la chaise est petit."},
  {en:"I have a car and a phone. The car is red.",known:["j'ai","une","voiture","un","téléphone","la","est","rouge"],sample:"J'ai une voiture et un téléphone. La voiture est rouge."},
  {en:"The houses are big and the music is beautiful.",known:["les","maisons","sont","grandes","la","musique","est","belle"],sample:"Les maisons sont grandes and la musique est belle."},
],
review:[
  {type:"listen",audio:"Le livre est sur la table.",q:"Where is the book?",a:"On the table",o:["On the table","In the car","At school","Under the chair"]},
  {type:"odd",q:"Which noun is MASCULINE?",items:["la maison","le livre","la voiture","la musique"],a:"le livre",reason:"Livre is masculine (le livre). All others are feminine."},
  {type:"fill_ctx",s:"___ voiture est grande.",a:"La",o:["La","Le","Les","Un"],ctx:"Voiture = feminine."},
  {type:"context",situation:"You want to say 'there are some books'.",a:"Il y a des livres",o:["Il y a des livres","Il y a les livres","Il y a un livres","Il y a la livres"]},
  {type:"fill_ctx",s:"J'___ un problème. (Lesson 6 — avoir)",a:"ai",o:["ai","suis","est","a"],ctx:"Avoir = to have. Cross-reference L6."},
  {type:"weave",en:"The family is at home.",blanks:[{word:"family",answer:"famille"},{word:"home",answer:"maison"}],full:"La famille est à la maison."},
],
sayIt:[
  {situation:"Describe your room: what objects are there? Use articles correctly.",target:["le","la","un","une","sur","table","livre"]},
  {situation:"You see a beautiful red car. Describe it and say where it is.",target:["la","voiture","rouge","est","belle"]},
],
miniConv:{topic:"Describing objects and their locations using articles",starter:"Regarde ! Il y a un livre sur la table. C'est ton livre ?"},
},
// ══ LESSON 8: Numbers & Time ══
{id:8,title:"Numbers & Time",sub:"Count, tell time, and handle money",icon:Clock,level:"A1",
grammar:{title:"Numbers & Time",sections:[
  {type:"intro",text:"Numbers are the first thing you need at shops, restaurants, and train stations. French numbers are mostly logical... until you hit 70 and 80. We'll start with 1-20 and time."},
  {type:"block",label:"Numbers 1-10",items:[
    {fr:"1 un, 2 deux, 3 trois, 4 quatre, 5 cinq",en:"1, 2, 3, 4, 5",note:"Deux ≈ dual, trois ≈ trio, quatre ≈ quarter. Cognates help!"},
    {fr:"6 six, 7 sept, 8 huit, 9 neuf, 10 dix",en:"6, 7, 8, 9, 10",note:"Six ≈ six, sept ≈ September (7th month of Roman calendar), dix ≈ decimal."},
  ]},
  {type:"block",label:"Numbers 11-20",items:[
    {fr:"11 onze, 12 douze, 13 treize",en:"11, 12, 13",note:"Douze ≈ dozen!"},
    {fr:"14 quatorze, 15 quinze, 16 seize",en:"14, 15, 16",note:"Seize ≈ sixteen (old English)."},
    {fr:"17 dix-sept, 18 dix-huit, 19 dix-neuf, 20 vingt",en:"17, 18, 19, 20",note:"17-19 = 'ten-seven', 'ten-eight', 'ten-nine'. Logical!"},
  ]},
  {type:"block",label:"Tens",items:[
    {fr:"20 vingt, 30 trente, 40 quarante, 50 cinquante, 60 soixante",en:"20-60",note:"Pattern: base + -ante. Quarante ≈ quarantine (40 days)!"},
  ]},
  {type:"tip",text:"For 21-29: vingt et un (21), vingt-deux (22)... For 31-39: trente et un (31), trente-deux (32)... Always *et un* for X1, then hyphens."},
  {type:"block",label:"Telling Time",items:[
    {fr:"Il est trois heures.",en:"It's 3 o'clock.",note:"Heure ≈ hour. Always plural except 'une heure' (1 o'clock)."},
    {fr:"Il est midi / minuit.",en:"It's noon / midnight.",note:"Midi ≈ midday. Minuit = 'middle of night'."},
    {fr:"Il est huit heures et demie.",en:"It's 8:30.",note:"Et demie = and half. Demi ≈ demi/half."},
    {fr:"Il est neuf heures et quart.",en:"It's 9:15.",note:"Et quart = and quarter. Quart ≈ quarter."},
  ]},
  {type:"block",label:"Money & Prices",items:[
    {fr:"Ça coûte combien ?",en:"How much does it cost?",note:"Combien = how much/many. Coûter = to cost."},
    {fr:"Ça coûte dix euros.",en:"It costs ten euros.",note:"Euro ≈ euro. Same word in most languages!"},
    {fr:"C'est cher !",en:"That's expensive!",note:"Cher ≈ cherish (something precious costs more)."},
  ]},
  {type:"howToSay",words:[
    {fr:"cinq",phonetic:"sank",ipa:"/sɛ̃k/",notes:"The final -q is silent in isolation but pronounced before vowels."},
    {fr:"huit",phonetic:"weet",ipa:"/ɥit/",notes:"The 'h' is silent. Starts with a 'w' sound."},
    {fr:"vingt",phonetic:"van",ipa:"/vɛ̃/",notes:"The -gt is silent! Just 'van'. In vingt et un, the -t is pronounced."},
  ]},
],quickRecall:{q:"How do you say 'It's 3 o'clock'?",a:"Il est trois heures",o:["Il est trois heures","Il a trois heures","C'est trois","Il est trois"]}},
examples:[
  {fr:"Il est huit heures.",en:"It's eight o'clock.",bridge:"Il est eight heures."},
  {fr:"Ça coûte combien ?",en:"How much does it cost?",bridge:"Ça costs combien?"},
  {fr:"J'ai vingt-cinq ans.",en:"I'm twenty-five years old.",bridge:"J'ai twenty-five ans."},
  {fr:"Il est midi et demi.",en:"It's half past noon.",bridge:"Il est midi et half."},
  {fr:"Ça coûte quinze euros.",en:"It costs fifteen euros.",bridge:"Ça coûte fifteen euros."},
  {fr:"Il est neuf heures et quart.",en:"It's quarter past nine.",bridge:"Il est nine heures et quart."},
  {fr:"C'est trop cher !",en:"That's too expensive!",bridge:"C'est trop expensive!"},
],
fillFG:[
  {s:"It's [___] o'clock (3:00).",a:"trois heures",o:["trois heures","trois heure","trente heures","treize heures"],ctx:"3:00 — remember 'heures' is plural."},
  {s:"How [___] does it cost?",a:"combien",o:["combien","comment","quoi","cher"],ctx:"Asking the price."},
  {s:"It costs [___] euros (15).",a:"quinze",o:["quinze","cinq","cinquante","quatorze"],ctx:"Quinze = 15."},
  {s:"It's [___] (12:30 PM).",a:"midi et demi",o:["midi et demi","minuit et demi","douze heures","midi et quart"],ctx:"Noon + half."},
  {s:"That's too [___]!",a:"cher",o:["cher","bon","grand","petit"],ctx:"Expressing something is expensive."},
],
fillBlanks:[
  {s:"Il est ___ heures.",a:"trois",o:["trois","trente","treize","trios"],ctx:"Three o'clock."},
  {s:"Ça coûte ___ ?",a:"combien",o:["combien","comment","cher","quoi"],ctx:"How much?"},
  {s:"Il est midi et ___.",a:"demi",o:["demi","quart","midi","heure"],ctx:"Half past noon."},
  {s:"Ça coûte vingt ___.",a:"euros",o:["euros","heures","ans","francs"],ctx:"Twenty euros."},
  {s:"C'est trop ___ !",a:"cher",o:["cher","bon","grand","petit"],ctx:"Too expensive!"},
],
buildSentences:[
  {c:["Il","est","trois","heures"],en:"It's three o'clock.",trap:["a","midi"]},
  {c:["Ça","coûte","combien","?"],en:"How much does it cost?",trap:["comment","cher"]},
  {c:["Il","est","midi","et","demi"],en:"It's half past noon.",trap:["minuit","quart"]},
  {c:["C'est","trop","cher"],en:"That's too expensive.",trap:["très","bon"]},
],
quiz:[
  {q:"What is 'quinze'?",a:"15",o:["15","50","5","14"],ctx:"Quinze = 15. Not cinquante (50)."},
  {q:"How do you say 9:15?",a:"Neuf heures et quart",o:["Neuf heures et quart","Neuf heures et demi","Neuf et quart","Neuf quart heures"]},
  {q:"'Ça coûte combien ?' means...",a:"How much does it cost?",o:["How much does it cost?","What time is it?","Where is it?","How is it?"]},
  {q:"What does 'C'est cher' mean?",a:"It's expensive",o:["It's expensive","It's cheap","It's hot","It's far"],ctx:"Cher ≈ cherish = precious = expensive."},
  {q:"'Vingt' is pronounced like...",a:"van (silent -gt)",o:["van (silent -gt)","vingt (say everything)","ving-t","vint"]},
  {q:"Il est minuit means...",a:"It's midnight",o:["It's midnight","It's noon","It's late","It's early"],ctx:"Minuit = mi (middle) + nuit (night)."},
],
combine:[
  {hint:"Time (8:30) + expensive → Say it's 8:30 and it's too expensive",answer:"Il est huit heures et demie et c'est trop cher.",accept:["il est huit heures et demie et c'est trop cher","il est huit heures et demi et c'est trop cher"]},
  {hint:"Price (15 euros) + age (25) → Say something costs 15 euros and you're 25",answer:"Ça coûte quinze euros et j'ai vingt-cinq ans.",accept:["ca coute quinze euros et j'ai vingt-cinq ans","ça coûte quinze euros et j'ai vingt-cinq ans"]},
  {hint:"Noon + hungry → Say it's noon and you're hungry",answer:"Il est midi et j'ai faim.",accept:["il est midi et j'ai faim","il est midi, j'ai faim"]},
],
weave:[
  {en:"It's three o'clock and I'm hungry. How much does a coffee cost?",known:["il","est","trois","heures","j'ai","faim","combien","coûte","un","café"],sample:"Il est trois heures and j'ai faim. Combien coûte un café?"},
  {en:"It's half past noon. That's too expensive! I have fifteen euros.",known:["il","est","midi","et","demi","c'est","trop","cher","j'ai","quinze","euros"],sample:"Il est midi et demi. C'est trop cher! J'ai quinze euros."},
  {en:"She's twenty years old and he's thirty. It's nine fifteen.",known:["elle","a","vingt","ans","il","trente","est","neuf","heures","quart"],sample:"Elle a vingt ans and il a trente. Il est neuf heures et quart."},
],
review:[
  {type:"listen",audio:"Il est huit heures et quart.",q:"What time is it?",a:"8:15",o:["8:15","8:30","8:45","4:08"]},
  {type:"odd",q:"Which is NOT a number?",items:["quinze","vingt","cher","dix"],a:"cher",reason:"Cher means expensive. The others are numbers (15, 20, 10)."},
  {type:"context",situation:"You're at a market. You want to know the price of bread.",a:"Ça coûte combien ?",o:["Ça coûte combien ?","Il est quelle heure ?","Où est le pain ?","J'ai faim"]},
  {type:"fill_ctx",s:"J'___ trente ans. (Lesson 6 — avoir)",a:"ai",o:["ai","suis","est","as"],ctx:"Age uses avoir. Cross-reference L6."},
  {type:"fill_ctx",s:"Il est ___ et demi.",a:"midi",o:["midi","minuit","douze","heure"],ctx:"12:30 PM = midi et demi."},
  {type:"weave",en:"It costs ten euros.",blanks:[{word:"costs",answer:"coûte"},{word:"ten",answer:"dix"}],full:"Ça coûte dix euros."},
  {type:"context",situation:"A waiter tells you 'Ça fait vingt-deux euros.' How much is it?",a:"22 euros",o:["22 euros","20 euros","12 euros","32 euros"]},
],
sayIt:[
  {situation:"You're shopping. Ask the price of something, react to it being expensive, and say what time it is.",target:["combien","coûte","cher","heures","est"]},
  {situation:"Tell someone your age, what time you wake up, and that you're hungry at noon.",target:["ai","ans","heures","midi","faim"]},
],
miniConv:{topic:"Discussing prices and time in everyday situations",starter:"Bonjour ! Vous voulez acheter quelque chose ? Ça coûte dix euros."},
},
// ══ LESSON 9: Food & Ordering ══
{id:9,title:"At the Restaurant",sub:"Order food, ask for the check, eat well",icon:UtensilsCrossed,level:"A1",
grammar:{title:"Food & Ordering",sections:[
  {type:"intro",text:"French restaurants have a rhythm: *l'entrée* (starter), *le plat* (main), *le dessert*. And you need special words for 'some' — the partitive articles."},
  {type:"block",label:"Partitive Articles (some/any)",items:[
    {fr:"du",en:"some (m.)",note:"Du pain = some bread. Du = de + le (masculine)."},
    {fr:"de la",en:"some (f.)",note:"De la salade = some salad. Feminine form."},
    {fr:"de l'",en:"some (before vowel)",note:"De l'eau = some water. Before vowels/h."},
    {fr:"des",en:"some (plural)",note:"Des frites = some fries. Plural form."},
  ]},
  {type:"block",label:"Restaurant Essentials",items:[
    {fr:"Je prends...",en:"I'll have... (I take)",note:"Prendre = to take. At restaurants, 'je prends' = I'll have."},
    {fr:"L'addition, s'il vous plaît",en:"The check, please",note:"Addition ≈ addition (adding up the bill!)."},
    {fr:"L'entrée",en:"The starter/appetizer",note:"Entrée ≈ entry (the entry to the meal). In the US, 'entrée' means main course!"},
    {fr:"Le plat",en:"The main course",note:"Plat = dish/plate. Le plat du jour = dish of the day."},
    {fr:"Le dessert",en:"Dessert",note:"Dessert ≈ dessert. From 'desservir' = to clear the table."},
  ]},
  {type:"block",label:"Common Foods",items:[
    {fr:"le poulet",en:"chicken",note:"Poulet ≈ poultry. Same Latin root 'pullus'."},
    {fr:"le poisson",en:"fish",note:"Poisson ≈ poison? No! Poisson = fish, poison = poison. Classic false friend."},
    {fr:"le fromage",en:"cheese",note:"Fromage is uniquely French. 'Formage' from Latin 'forma' (mold/shape)."},
    {fr:"la viande",en:"meat",note:"From Latin 'vivenda' = things to live on."},
    {fr:"l'eau",en:"water",note:"Eau ≈ eau (as in 'eau de toilette'). Silent letters!"},
  ]},
  {type:"tip",text:"In France, water is free if you ask for *une carafe d'eau* (tap water). If you just say 'de l'eau', you might get expensive bottled water!"},
  {type:"culture",text:"French meals are an event. Lunch can last an hour. Never rush. Say *bon appétit* before eating. And the waiter won't bring the check until you ask — it's considered rude to hurry guests."},
],quickRecall:{q:"How do you say 'I'll have the chicken'?",a:"Je prends le poulet",o:["Je prends le poulet","J'ai le poulet","Je suis le poulet","Je voudrais poulet"]}},
examples:[
  {fr:"Je prends le poulet, s'il vous plaît.",en:"I'll have the chicken, please.",bridge:"Je prends le poulet, s'il vous plaît."},
  {fr:"Du pain et du fromage.",en:"Some bread and some cheese.",bridge:"Du pain et du fromage."},
  {fr:"De l'eau, s'il vous plaît.",en:"Some water, please.",bridge:"De l'eau, s'il vous plaît."},
  {fr:"L'addition, s'il vous plaît.",en:"The check, please.",bridge:"L'addition, s'il vous plaît."},
  {fr:"Comme entrée, une salade.",en:"For starter, a salad.",bridge:"As entrée, une salade."},
  {fr:"Le plat du jour, c'est le poisson.",en:"The dish of the day is the fish.",bridge:"Le plat du jour, c'est le poisson."},
  {fr:"Je voudrais un dessert.",en:"I'd like a dessert.",bridge:"Je voudrais un dessert."},
],
fillFG:[
  {s:"I'll have [___] chicken, please.",a:"le poulet",o:["le poulet","la poulet","du poulet","un poulet"],ctx:"Ordering a specific dish → definite article."},
  {s:"Some [___] and some cheese, please.",a:"du pain",o:["du pain","de la pain","le pain","un pain"],ctx:"Some bread — pain is masculine → du."},
  {s:"[___] water, please.",a:"De l'",o:["De l'","Du","La","Le"],ctx:"Eau starts with vowel → de l'."},
  {s:"The [___], please. (asking to pay)",a:"addition",o:["addition","entrée","plat","dessert"],ctx:"Asking for the bill."},
  {s:"For the main course, [___].",a:"le poisson",o:["le poisson","la poisson","du poisson","un poissons"],ctx:"The fish — ordering a specific dish."},
],
fillBlanks:[
  {s:"Je ___ le poulet.",a:"prends",o:["prends","ai","suis","mange"],ctx:"I'll have (take) the chicken."},
  {s:"___ pain, s'il vous plaît.",a:"Du",o:["Du","De la","Le","Un"],ctx:"Some bread — masculine partitive."},
  {s:"___ salade, s'il vous plaît.",a:"De la",o:["De la","Du","La","Une"],ctx:"Some salad — feminine partitive."},
  {s:"L'___, s'il vous plaît.",a:"addition",o:["addition","entrée","eau","table"],ctx:"The check, please."},
  {s:"Comme ___, le poisson.",a:"plat",o:["plat","entrée","dessert","addition"],ctx:"As main course, the fish."},
],
buildSentences:[
  {c:["Je","prends","le","poulet"],en:"I'll have the chicken.",trap:["du","suis"]},
  {c:["L'","addition","s'il","vous","plaît"],en:"The check, please.",trap:["entrée","le"]},
  {c:["Du","pain","et","du","fromage"],en:"Some bread and some cheese.",trap:["le","la"]},
  {c:["De","l'","eau","s'il","vous","plaît"],en:"Some water, please.",trap:["du","la"]},
],
quiz:[
  {q:"'Du pain' means...",a:"Some bread",o:["Some bread","The bread","A bread","My bread"],ctx:"Du = partitive = some."},
  {q:"What's a false friend here?",a:"Poisson (fish, not poison!)",o:["Poisson (fish, not poison!)","Poulet (chicken)","Entrée (starter, not entry!)","Dessert"],ctx:"Poisson sounds like 'poison' but means fish."},
  {q:"How do you ask for the check?",a:"L'addition, s'il vous plaît",o:["L'addition, s'il vous plaît","Le plat, s'il vous plaît","Le dessert, s'il vous plaît","L'entrée, s'il vous plaît"]},
  {q:"'De l'eau' uses 'de l'' because...",a:"Eau starts with a vowel",o:["Eau starts with a vowel","Water is special","It's plural","It's masculine"]},
  {q:"Which is the main course?",a:"Le plat",o:["Le plat","L'entrée","Le dessert","L'addition"],ctx:"Entrée = starter, plat = main, dessert = dessert."},
  {q:"'Comme entrée, une salade' means...",a:"For starter, a salad",o:["For starter, a salad","Like an entry, a salad","The main salad","A salad entrance"]},
],
combine:[
  {hint:"Starter (salad) + main (chicken) → Order a full meal",answer:"Comme entrée, une salade. Comme plat, le poulet.",accept:["comme entree une salade comme plat le poulet","comme entrée, une salade. comme plat, le poulet"]},
  {hint:"Water + bread + check → Ask for water, bread, then the check",answer:"De l'eau et du pain, s'il vous plaît. L'addition, s'il vous plaît.",accept:["de l'eau et du pain s'il vous plait l'addition s'il vous plait","de l'eau et du pain, s'il vous plaît. l'addition, s'il vous plaît"]},
  {hint:"Want + dessert + expensive → Say you'd like dessert but it's expensive",answer:"Je voudrais un dessert mais c'est cher.",accept:["je voudrais un dessert mais c'est cher","je voudrais un dessert, mais c'est cher"]},
],
weave:[
  {en:"I'll have the chicken and some water, please. The fish is too expensive.",known:["je","prends","le","poulet","de","l'","eau","s'il vous plaît","poisson","est","trop","cher"],sample:"Je prends le poulet and de l'eau, s'il vous plaît. Le poisson est trop cher."},
  {en:"For starter, a salad. For main course, the fish. And some bread, please.",known:["comme","entrée","une","salade","plat","le","poisson","du","pain","s'il vous plaît"],sample:"Comme entrée, une salade. Comme plat, le poisson. And du pain, s'il vous plaît."},
  {en:"The check please. It costs twenty euros. That's not expensive.",known:["l'","addition","s'il vous plaît","ça","coûte","vingt","euros","c'est","pas","cher"],sample:"L'addition, s'il vous plaît. Ça coûte vingt euros. C'est pas cher."},
],
review:[
  {type:"listen",audio:"Je prends le poulet et de la salade, s'il vous plaît.",q:"What is being ordered?",a:"Chicken and salad",o:["Chicken and salad","Fish and bread","Chicken and cheese","Salad and water"]},
  {type:"odd",q:"Which is NOT a food?",items:["poulet","fromage","addition","salade"],a:"addition",reason:"Addition means the check/bill, not a food."},
  {type:"context",situation:"You want tap water at a French restaurant.",a:"Une carafe d'eau, s'il vous plaît",o:["Une carafe d'eau, s'il vous plaît","De l'eau cher","Du eau","L'eau addition"]},
  {type:"fill_ctx",s:"Ça ___ combien ? (Lesson 8)",a:"coûte",o:["coûte","est","a","fait"],ctx:"How much does it cost? Cross-reference L8."},
  {type:"fill_ctx",s:"___ fromage, s'il vous plaît.",a:"Du",o:["Du","De la","Le","Des"],ctx:"Some cheese — masculine partitive."},
  {type:"weave",en:"I'll have the fish.",blanks:[{word:"I'll have",answer:"prends"},{word:"fish",answer:"poisson"}],full:"Je prends le poisson."},
],
sayIt:[
  {situation:"You're at a restaurant. Order a full meal: starter, main course, and a drink.",target:["prends","entrée","plat","salade","poulet","eau"]},
  {situation:"The meal is over. Ask for the check and say the food was good.",target:["addition","plaît","bon","c'est"]},
],
miniConv:{topic:"Ordering food at a French restaurant",starter:"Bonsoir ! Bienvenue au restaurant. Voici le menu. Vous avez choisi ?"},
},
// ══ LESSON 10: Family & People ══
{id:10,title:"My Family",sub:"Talk about people with possessives",icon:Users,level:"A1",
grammar:{title:"Family & Possessive Adjectives",sections:[
  {type:"intro",text:"In English, 'my' is always 'my'. In French, it changes based on the noun's gender: *mon* (m.), *ma* (f.), *mes* (pl.). The possessive matches the THING, not the owner."},
  {type:"block",label:"Possessive Adjectives",items:[
    {fr:"mon / ma / mes",en:"my",note:"Mon père (my father), ma mère (my mother), mes enfants (my children)."},
    {fr:"ton / ta / tes",en:"your (informal)",note:"Ton frère, ta sœur, tes amis. Same pattern as mon/ma/mes."},
    {fr:"son / sa / ses",en:"his/her",note:"Son père = his/her father. Sa mère = his/her mother. No gender distinction for the owner!"},
  ]},
  {type:"tip",text:"Tricky! *Son* can mean 'his' OR 'her'. *Son père* = his father OR her father. Context tells you which. The possessive agrees with the NOUN, not the person."},
  {type:"block",label:"Family Members",items:[
    {fr:"le père / la mère",en:"father / mother",note:"Père ≈ paternal, mère ≈ maternal. Easy cognates!"},
    {fr:"le frère / la sœur",en:"brother / sister",note:"Frère ≈ fraternal, sœur ≈ sorority (both from Latin)."},
    {fr:"le fils / la fille",en:"son / daughter",note:"Fils ≈ filial. Fille also means 'girl'."},
    {fr:"le mari / la femme",en:"husband / wife",note:"Mari ≈ marry/marriage. Femme also means 'woman' ≈ feminine."},
    {fr:"l'enfant",en:"child",note:"Enfant ≈ infant. Can be masculine or feminine!"},
    {fr:"l'ami / l'amie",en:"friend (m./f.)",note:"Ami ≈ amicable. Add -e for feminine: amie."},
  ]},
  {type:"block",label:"Describing People",items:[
    {fr:"jeune",en:"young",note:"Jeune ≈ juvenile. Same for m. and f."},
    {fr:"vieux / vieille",en:"old (m./f.)",note:"Masculine changes to feminine! Vieux → vieille."},
  ]},
  {type:"etymology",pairs:[
    {fr:"père",en:"paternal",root:"Latin 'pater' → French père. English: paternal, patriot, patrimony."},
    {fr:"mère",en:"maternal",root:"Latin 'mater' → French mère. English: maternal, maternity, alma mater."},
    {fr:"frère",en:"fraternal",root:"Latin 'frater' → French frère. English: fraternal, fraternity."},
  ]},
  {type:"culture",text:"In France, family dinners are sacred. Sunday lunch (*le déjeuner du dimanche*) often brings three generations together. 'C'est en famille' means it's intimate, close."},
],quickRecall:{q:"How do you say 'my mother'?",a:"ma mère",o:["ma mère","mon mère","me mère","sa mère"]}},
examples:[
  {fr:"Mon père est médecin.",en:"My father is a doctor.",bridge:"Mon père is médecin."},
  {fr:"Ma sœur a vingt ans.",en:"My sister is twenty.",bridge:"Ma sœur a vingt ans."},
  {fr:"Ses enfants sont jeunes.",en:"His/her children are young.",bridge:"Ses enfants sont jeunes."},
  {fr:"Ton frère est grand.",en:"Your brother is tall.",bridge:"Ton frère est grand."},
  {fr:"Ma femme est française.",en:"My wife is French.",bridge:"Ma femme est française."},
  {fr:"Son fils est petit.",en:"His/her son is small.",bridge:"Son fils est petit."},
  {fr:"Mes amis sont ici.",en:"My friends are here.",bridge:"Mes amis sont ici."},
],
fillFG:[
  {s:"[___] father is a doctor.",a:"Mon",o:["Mon","Ma","Mes","Son"],ctx:"Père = masculine → mon."},
  {s:"[___] sister is twenty years old.",a:"Ma",o:["Ma","Mon","Mes","Sa"],ctx:"Sœur = feminine → ma."},
  {s:"[___] children are young.",a:"Ses",o:["Ses","Son","Sa","Mes"],ctx:"Enfants = plural, his/her → ses."},
  {s:"Your (informal) [___] is tall.",a:"frère",o:["frère","sœur","père","fils"],ctx:"Brother — masculine noun."},
  {s:"[___] friends are here.",a:"Mes",o:["Mes","Mon","Ma","Tes"],ctx:"Amis = plural → mes."},
],
fillBlanks:[
  {s:"___ père est médecin.",a:"Mon",o:["Mon","Ma","Mes","Son"],ctx:"My father — père is masculine."},
  {s:"___ sœur a vingt ans.",a:"Ma",o:["Ma","Mon","Mes","Ta"],ctx:"My sister — sœur is feminine."},
  {s:"___ enfants sont jeunes.",a:"Ses",o:["Ses","Son","Sa","Mes"],ctx:"His/her children — plural."},
  {s:"Ton ___ est grand.",a:"frère",o:["frère","sœur","mère","fille"],ctx:"Your brother is tall."},
  {s:"Son ___ est petit.",a:"fils",o:["fils","fille","frère","ami"],ctx:"His/her son is small."},
],
buildSentences:[
  {c:["Mon","père","est","médecin"],en:"My father is a doctor.",trap:["Ma","suis"]},
  {c:["Ma","sœur","a","vingt","ans"],en:"My sister is twenty.",trap:["Mon","est"]},
  {c:["Ses","enfants","sont","jeunes"],en:"His/her children are young.",trap:["Son","vieux"]},
  {c:["Mes","amis","sont","ici"],en:"My friends are here.",trap:["Mon","ami"]},
],
quiz:[
  {q:"'Mon' is used with...",a:"Masculine nouns",o:["Masculine nouns","Feminine nouns","Plural nouns","All nouns"],ctx:"Mon père, mon frère, mon ami."},
  {q:"'Son père' can mean...",a:"Both his father and her father",o:["Both his father and her father","Only his father","Only her father","Their father"],ctx:"Son matches the noun (père = m.), not the owner."},
  {q:"How do you say 'my children'?",a:"Mes enfants",o:["Mes enfants","Mon enfants","Ma enfants","Mes enfant"]},
  {q:"What does 'frère' mean?",a:"Brother",o:["Brother","Sister","Father","Friend"],ctx:"Frère ≈ fraternal."},
  {q:"Which is WRONG?",a:"Mon sœur",o:["Mon sœur","Ma mère","Mon père","Mes amis"],negative:true,ctx:"Sœur is feminine → ma sœur, not mon sœur."},
  {q:"'La femme' can mean...",a:"The wife or the woman",o:["The wife or the woman","Only the wife","Only the woman","The family"],ctx:"Femme has both meanings in French."},
],
combine:[
  {hint:"Father (doctor) + mother (French) → Describe your parents",answer:"Mon père est médecin et ma mère est française.",accept:["mon pere est medecin et ma mere est francaise","mon père est médecin et ma mère est française"]},
  {hint:"Sister (20) + brother (tall) → Describe your siblings",answer:"Ma sœur a vingt ans et mon frère est grand.",accept:["ma soeur a vingt ans et mon frere est grand","ma sœur a vingt ans et mon frère est grand"]},
  {hint:"Friends (here) + children (young) → Say your friends are here and the kids are young",answer:"Mes amis sont ici et les enfants sont jeunes.",accept:["mes amis sont ici et les enfants sont jeunes"]},
],
weave:[
  {en:"My father is a doctor and my mother is French. They have three children.",known:["mon","père","est","médecin","ma","mère","française","ils","ont","trois","enfants"],sample:"Mon père est médecin and ma mère est française. Ils ont trois enfants."},
  {en:"Her brother is tall and young. His sister is twenty years old.",known:["son","frère","est","grand","jeune","sa","sœur","a","vingt","ans"],sample:"Son frère est grand and jeune. Sa sœur a vingt ans."},
  {en:"My friends are here. Your wife is beautiful and your children are small.",known:["mes","amis","sont","ici","ta","femme","est","belle","tes","enfants","petits"],sample:"Mes amis sont ici. Ta femme est belle and tes enfants sont petits."},
],
review:[
  {type:"listen",audio:"Mon frère a trente ans et ma sœur a vingt-cinq ans.",q:"Who is older?",a:"The brother (30 vs 25)",o:["The brother (30 vs 25)","The sister","They're the same age","Can't tell"]},
  {type:"odd",q:"Which is NOT a family member?",items:["père","mère","ami","frère"],a:"ami",reason:"Ami means friend. The others are family members."},
  {type:"context",situation:"Someone asks about your family. Your mom is a doctor.",a:"Ma mère est médecin",o:["Ma mère est médecin","Mon mère est médecin","Ma mère a médecin","Ma mère fait médecin"]},
  {type:"fill_ctx",s:"J'___ trois enfants. (Lesson 6 — avoir)",a:"ai",o:["ai","suis","est","as"],ctx:"I have three children — avoir."},
  {type:"fill_ctx",s:"___ père est grand.",a:"Mon",o:["Mon","Ma","Mes","Le"],ctx:"My father — père is masculine."},
  {type:"weave",en:"My sister is young.",blanks:[{word:"sister",answer:"sœur"},{word:"young",answer:"jeune"}],full:"Ma sœur est jeune."},
],
sayIt:[
  {situation:"Introduce your family: parents, siblings. Say their ages and what they do.",target:["mon","ma","père","mère","frère","sœur","ans","est"]},
  {situation:"Describe your best friend: their age, what they look like, and where they are.",target:["ami","a","ans","est","grand","ici"]},
],
miniConv:{topic:"Talking about your family and describing people",starter:"Salut ! Tu as des frères et sœurs ? Parle-moi de ta famille."},
},
// ══ LESSON 11: Negation ══
{id:11,title:"Saying No",sub:"Ne...pas, ne...jamais, ne...rien — master the negative",icon:Ban,level:"A1",
grammar:{title:"Negation",sections:[
  {type:"intro",text:"You already know *ne...pas* (not). Now meet the rest of the family: *ne...jamais* (never), *ne...plus* (no more), *ne...rien* (nothing). Same sandwich structure, different filling."},
  {type:"block",label:"The Negation Sandwich",items:[
    {fr:"ne...pas",en:"not",note:"Je NE mange PAS. The verb is sandwiched between ne and pas."},
    {fr:"ne...jamais",en:"never",note:"Je NE mange JAMAIS de viande. = I never eat meat."},
    {fr:"ne...plus",en:"no more / no longer",note:"Je NE mange PLUS. = I don't eat anymore. Plus ≈ plus (no more to add)."},
    {fr:"ne...rien",en:"nothing",note:"Je NE mange RIEN. = I eat nothing. Il n'y a rien = There's nothing."},
  ]},
  {type:"tip",text:"In spoken French, the *ne* often disappears! 'Je mange pas' instead of 'Je ne mange pas'. This is normal everyday French, but always write the *ne* in formal contexts."},
  {type:"block",label:"Other Useful Negatives",items:[
    {fr:"ne...personne",en:"nobody",note:"Je NE vois PERSONNE. = I see nobody. Personne ≈ person (nobody = no person)."},
  ]},
  {type:"block",label:"Useful Adverbs",items:[
    {fr:"toujours",en:"always",note:"Elle est toujours en retard. = She's always late."},
    {fr:"encore",en:"still/again",note:"Tu es encore ici ? = You're still here? Encore ≈ encore (again!)."},
    {fr:"déjà",en:"already",note:"J'ai déjà mangé. = I've already eaten. Déjà ≈ déjà vu!"},
    {fr:"peut-être",en:"maybe",note:"Peut-être demain. = Maybe tomorrow. Peut (can) + être (be) = could be."},
    {fr:"aussi",en:"also/too",note:"Moi aussi. = Me too."},
    {fr:"seulement",en:"only",note:"Seulement un café. = Only a coffee. Seul (alone) + -ment."},
  ]},
  {type:"culture",text:"French speakers love double negatives in casual speech. 'C'est pas rien!' (It's not nothing!) means 'It's really something!' — the opposite of what grammar would suggest."},
],quickRecall:{q:"How do you say 'I never eat meat'?",a:"Je ne mange jamais de viande",o:["Je ne mange jamais de viande","Je ne mange pas de viande","Je mange jamais viande","Je ne jamais mange viande"]}},
examples:[
  {fr:"Je ne mange jamais de viande.",en:"I never eat meat.",bridge:"Je ne mange never de viande."},
  {fr:"Il n'y a plus de pain.",en:"There's no more bread.",bridge:"Il n'y a no more de pain."},
  {fr:"Elle ne mange rien.",en:"She eats nothing.",bridge:"Elle ne mange nothing."},
  {fr:"Je n'ai pas encore mangé.",en:"I haven't eaten yet.",bridge:"Je n'ai pas yet eaten."},
  {fr:"Tu ne vois personne ?",en:"You see nobody?",bridge:"Tu ne vois nobody?"},
  {fr:"Peut-être demain.",en:"Maybe tomorrow.",bridge:"Maybe demain."},
  {fr:"Il est toujours en retard.",en:"He's always late.",bridge:"Il est always en retard."},
],
fillFG:[
  {s:"I [___] eat meat.",a:"ne mange jamais de",o:["ne mange jamais de","ne mange pas","mange jamais","ne mange rien"],ctx:"Never eat — ne...jamais."},
  {s:"There's [___] bread left.",a:"plus de",o:["plus de","pas de","jamais de","rien de"],ctx:"No more = ne...plus. (Il n'y a plus de pain.)"},
  {s:"She eats [___].",a:"rien",o:["rien","jamais","pas","personne"],ctx:"Nothing = rien."},
  {s:"He's [___] late.",a:"toujours",o:["toujours","jamais","rien","aussi"],ctx:"Always = toujours."},
  {s:"I've [___] eaten.",a:"déjà",o:["déjà","jamais","plus","encore"],ctx:"Already = déjà."},
],
fillBlanks:[
  {s:"Je ne mange ___ de viande.",a:"jamais",o:["jamais","pas","rien","plus"],ctx:"I never eat meat."},
  {s:"Il n'y a ___ de pain.",a:"plus",o:["plus","pas","jamais","rien"],ctx:"No more bread."},
  {s:"Elle ne mange ___.",a:"rien",o:["rien","jamais","pas","personne"],ctx:"She eats nothing."},
  {s:"Il est ___ en retard.",a:"toujours",o:["toujours","jamais","déjà","aussi"],ctx:"He's always late."},
  {s:"J'ai ___ mangé.",a:"déjà",o:["déjà","jamais","encore","aussi"],ctx:"I've already eaten."},
],
buildSentences:[
  {c:["Je","ne","mange","jamais","de","viande"],en:"I never eat meat.",trap:["pas","rien"]},
  {c:["Il","n'y","a","plus","de","pain"],en:"There's no more bread.",trap:["pas","jamais"]},
  {c:["Elle","ne","mange","rien"],en:"She eats nothing.",trap:["pas","jamais"]},
  {c:["Peut-être","demain"],en:"Maybe tomorrow.",trap:["toujours","aussi"]},
],
quiz:[
  {q:"'Ne...jamais' means...",a:"Never",o:["Never","Nothing","No more","Not"],ctx:"Jamais = never."},
  {q:"What's missing? 'Il n'y a ___ de pain.'",a:"plus",o:["plus","pas","rien","jamais"],ctx:"No more bread."},
  {q:"'Déjà' means...",a:"Already",o:["Already","Always","Never","Still"]},
  {q:"In spoken French, which part of negation is often dropped?",a:"ne",o:["ne","pas","jamais","rien"],ctx:"'Je mange pas' instead of 'Je ne mange pas'."},
  {q:"'Moi aussi' means...",a:"Me too",o:["Me too","Me neither","Only me","Maybe me"]},
  {q:"Which is WRONG word order?",a:"Je jamais ne mange",o:["Je jamais ne mange","Je ne mange jamais","Je ne mange pas","Il n'y a rien"],negative:true,ctx:"Ne always comes before the verb."},
],
combine:[
  {hint:"Never + meat + already + eaten → Say you never eat meat, you've already eaten",answer:"Je ne mange jamais de viande. J'ai déjà mangé.",accept:["je ne mange jamais de viande j'ai deja mange","je ne mange jamais de viande. j'ai déjà mangé"]},
  {hint:"No more + bread + maybe + tomorrow → No more bread, maybe tomorrow",answer:"Il n'y a plus de pain. Peut-être demain.",accept:["il n'y a plus de pain peut-etre demain","il n'y a plus de pain. peut-être demain"]},
  {hint:"Nobody + here + always + late → Nobody's here, he's always late",answer:"Il n'y a personne ici. Il est toujours en retard.",accept:["il n'y a personne ici il est toujours en retard","il n'y a personne ici. il est toujours en retard"]},
],
weave:[
  {en:"I never eat meat. She eats nothing. There's no more bread.",known:["je","ne","mange","jamais","de","viande","elle","rien","il","n'y","a","plus","pain"],sample:"Je ne mange jamais de viande. Elle ne mange rien. Il n'y a plus de pain."},
  {en:"Maybe tomorrow. I've already eaten and I'm not hungry anymore.",known:["peut-être","demain","j'ai","déjà","mangé","je","ne","ai","plus","faim"],sample:"Peut-être demain. J'ai déjà mangé and je n'ai plus faim."},
  {en:"He's always late. Nobody is here. Me too, I see nothing.",known:["il","est","toujours","en","retard","personne","ici","moi","aussi","je","ne","vois","rien"],sample:"Il est toujours en retard. Personne est ici. Moi aussi, je ne vois rien."},
],
review:[
  {type:"listen",audio:"Je ne mange jamais de fromage.",q:"What does the speaker never eat?",a:"Cheese",o:["Cheese","Meat","Bread","Fish"]},
  {type:"odd",q:"Which is NOT a negation word?",items:["jamais","rien","personne","toujours"],a:"toujours",reason:"Toujours means 'always' — it's the opposite of negation!"},
  {type:"context",situation:"Your friend offers bread but there's none left.",a:"Il n'y a plus de pain",o:["Il n'y a plus de pain","Il n'y a pas de pain","Il y a du pain","Je ne mange pas"]},
  {type:"fill_ctx",s:"___ fromage, s'il vous plaît. (Lesson 9)",a:"Du",o:["Du","De la","Le","Des"],ctx:"Some cheese — partitive. Cross-reference L9."},
  {type:"fill_ctx",s:"Je ne mange ___ de viande.",a:"jamais",o:["jamais","pas","rien","toujours"],ctx:"I never eat meat."},
  {type:"weave",en:"She eats nothing.",blanks:[{word:"eats",answer:"mange"},{word:"nothing",answer:"rien"}],full:"Elle ne mange rien."},
],
sayIt:[
  {situation:"You're at a restaurant. Explain your dietary restrictions: you never eat meat, and you don't want fish anymore.",target:["ne","mange","jamais","viande","plus","poisson"]},
  {situation:"Your friend asks if anyone is coming. Say nobody's coming, you've already called, maybe tomorrow.",target:["personne","déjà","peut-être","demain"]},
],
miniConv:{topic:"Expressing negation and talking about habits",starter:"Tu manges de la viande ? Moi, je suis végétarien. Et toi ?"},
},
// ══ LESSON 13: Aller & Near Future ══
{id:13,title:"Aller: Where & When",sub:"Go places and make plans",icon:MapPin,level:"A1",
grammar:{title:"Aller — To Go",sections:[
  {type:"intro",text:"*Aller* is the third essential verb (after être and avoir). It does double duty: getting you around AND making future plans. *Je vais manger* = I'm going to eat."},
  {type:"conjugation",verb:"aller — to go",rows:[
    {pr:"Je",conj:"vais",en:"I go/am going",pron:"/ʒə vɛ/"},
    {pr:"Tu",conj:"vas",en:"You go",pron:"/ty va/"},
    {pr:"Il/Elle",conj:"va",en:"He/She goes",pron:"/il va/"},
    {pr:"Nous",conj:"allons",en:"We go",pron:"/nu.za.lɔ̃/"},
    {pr:"Vous",conj:"allez",en:"You go",pron:"/vu.za.le/"},
    {pr:"Ils/Elles",conj:"vont",en:"They go",pron:"/il vɔ̃/"},
  ]},
  {type:"block",label:"Near Future: aller + infinitive",items:[
    {fr:"Je vais manger.",en:"I'm going to eat.",note:"Aller + infinitive = near future. Simple and very common!"},
    {fr:"Elle va partir.",en:"She's going to leave.",note:"Same pattern: conjugated aller + infinitive verb."},
    {fr:"Nous allons travailler.",en:"We're going to work.",note:"Works with any verb after aller."},
  ]},
  {type:"block",label:"Directions",items:[
    {fr:"à gauche",en:"to the left",note:"Gauche = left. Also means 'awkward' (being left-handed was considered clumsy)."},
    {fr:"à droite",en:"to the right",note:"Droite ≈ direct/straight."},
    {fr:"tout droit",en:"straight ahead",note:"Tout = all. Droit = straight. Keep going straight!"},
    {fr:"devant / derrière",en:"in front / behind",note:"Devant ≈ avant-garde (in front of the guard)."},
    {fr:"près / loin",en:"near / far",note:"Près d'ici = nearby. Loin d'ici = far from here."},
  ]},
  {type:"tip",text:"*Aller + à* contracts: à + le = *au* (au restaurant), à + les = *aux* (aux toilettes). But à + la stays *à la* (à la gare)."},
  {type:"culture",text:"The French love their future plans. 'On va prendre un café ?' (Shall we grab a coffee?) is the most common social invitation. *On* = informal 'we'."},
],quickRecall:{q:"How do you say 'I'm going to eat'?",a:"Je vais manger",o:["Je vais manger","Je mange","J'ai mangé","Je suis manger"]}},
examples:[
  {fr:"Je vais au restaurant.",en:"I'm going to the restaurant.",bridge:"Je vais au restaurant."},
  {fr:"Tu vas à gauche.",en:"You go left.",bridge:"Tu vas à left."},
  {fr:"Elle va manger ce soir.",en:"She's going to eat tonight.",bridge:"Elle va eat ce soir."},
  {fr:"Nous allons travailler demain.",en:"We're going to work tomorrow.",bridge:"Nous allons work demain."},
  {fr:"C'est tout droit, puis à droite.",en:"It's straight ahead, then right.",bridge:"C'est tout droit, puis à right."},
  {fr:"Le restaurant est devant la gare.",en:"The restaurant is in front of the station.",bridge:"Le restaurant est in front la gare."},
  {fr:"On va prendre un café ?",en:"Shall we grab a coffee?",bridge:"On va take un café?"},
],
fillFG:[
  {s:"I [___] to the restaurant.",a:"vais",o:["vais","suis","ai","vas"],ctx:"Going somewhere — aller."},
  {s:"She's [___] eat tonight.",a:"va",o:["va","vais","est","a"],ctx:"Near future: elle + va + infinitive."},
  {s:"Turn [___] (left).",a:"à gauche",o:["à gauche","à droite","tout droit","devant"],ctx:"Left = gauche."},
  {s:"It's [___] ahead.",a:"tout droit",o:["tout droit","à gauche","à droite","derrière"],ctx:"Straight = tout droit."},
  {s:"We're [___] work tomorrow.",a:"allons",o:["allons","sommes","avons","vont"],ctx:"Near future: nous + allons + infinitive."},
],
fillBlanks:[
  {s:"Je ___ au restaurant.",a:"vais",o:["vais","suis","ai","vas"],ctx:"I'm going to the restaurant."},
  {s:"Elle ___ manger ce soir.",a:"va",o:["va","vais","est","a"],ctx:"She's going to eat tonight."},
  {s:"C'est tout ___.",a:"droit",o:["droit","droite","gauche","loin"],ctx:"Straight ahead."},
  {s:"Le parc est ___ la maison.",a:"devant",o:["devant","derrière","dans","sur"],ctx:"In front of the house."},
  {s:"Nous ___ travailler demain.",a:"allons",o:["allons","sommes","avons","allez"],ctx:"We're going to work tomorrow."},
],
buildSentences:[
  {c:["Je","vais","au","restaurant"],en:"I'm going to the restaurant.",trap:["suis","le"]},
  {c:["Elle","va","manger","ce","soir"],en:"She's going to eat tonight.",trap:["est","a"]},
  {c:["C'est","tout","droit","puis","à","gauche"],en:"It's straight then left.",trap:["droite","devant"]},
  {c:["On","va","prendre","un","café"],en:"Shall we grab a coffee?",trap:["est","a"]},
],
quiz:[
  {q:"'Je vais manger' is...",a:"Near future (I'm going to eat)",o:["Near future (I'm going to eat)","Present (I eat)","Past (I ate)","Command (Eat!)"]},
  {q:"'À gauche' means...",a:"To the left",o:["To the left","To the right","Straight ahead","Behind"]},
  {q:"'Au restaurant' = ?",a:"à + le = au",o:["à + le = au","à + la = au","à + les = au","à + un = au"],ctx:"Contraction: à + le → au."},
  {q:"How do you say 'We're going to work'?",a:"Nous allons travailler",o:["Nous allons travailler","Nous sommes travailler","Nous avons travailler","Nous travaillons"]},
  {q:"'Devant' means...",a:"In front of",o:["In front of","Behind","Next to","Far from"],ctx:"Devant ≈ avant-garde."},
  {q:"What's the near future structure?",a:"aller + infinitive",o:["aller + infinitive","être + infinitive","avoir + infinitive","faire + infinitive"]},
],
combine:[
  {hint:"Going to restaurant + tonight → Say you're going to the restaurant tonight",answer:"Je vais au restaurant ce soir.",accept:["je vais au restaurant ce soir"]},
  {hint:"Straight + then left + station → Give directions to the station",answer:"C'est tout droit, puis à gauche. La gare est devant.",accept:["c'est tout droit puis a gauche la gare est devant","c'est tout droit, puis à gauche. la gare est devant"]},
  {hint:"Going to work + tomorrow morning → Say you're going to work tomorrow morning",answer:"Je vais travailler demain matin.",accept:["je vais travailler demain matin"]},
],
weave:[
  {en:"I'm going to the restaurant tonight. It's straight ahead then to the left.",known:["je","vais","au","restaurant","ce","soir","c'est","tout","droit","puis","à","gauche"],sample:"Je vais au restaurant ce soir. C'est tout droit, puis à gauche."},
  {en:"She's going to eat and he's going to work. We're going to take a coffee.",known:["elle","va","manger","il","travailler","nous","allons","prendre","un","café"],sample:"Elle va manger and il va travailler. Nous allons prendre un café."},
  {en:"The station is behind the park. Go right, it's not far.",known:["la","gare","est","derrière","le","parc","à","droite","c'est","pas","loin"],sample:"La gare est derrière le parc. Go à droite, c'est pas loin."},
],
review:[
  {type:"listen",audio:"Nous allons manger au restaurant ce soir.",q:"What's the plan?",a:"Eating at a restaurant tonight",o:["Eating at a restaurant tonight","Working tomorrow","Going to the park","Having coffee"]},
  {type:"odd",q:"Which is NOT a direction?",items:["gauche","droite","devant","demain"],a:"demain",reason:"Demain means 'tomorrow', not a direction."},
  {type:"context",situation:"Someone asks you where the station is. It's straight ahead.",a:"C'est tout droit",o:["C'est tout droit","C'est à gauche","C'est derrière","C'est loin"]},
  {type:"fill_ctx",s:"Je ne mange ___ de viande. (Lesson 11)",a:"jamais",o:["jamais","pas","rien","plus"],ctx:"I never eat meat. Cross-reference L11."},
  {type:"fill_ctx",s:"Elle ___ manger ce soir.",a:"va",o:["va","vais","est","a"],ctx:"She's going to eat — near future."},
  {type:"weave",en:"I'm going to the park.",blanks:[{word:"going",answer:"vais"},{word:"park",answer:"parc"}],full:"Je vais au parc."},
],
sayIt:[
  {situation:"Give someone directions to the restaurant: it's straight ahead, then left, in front of the station.",target:["tout","droit","gauche","devant","gare","restaurant"]},
  {situation:"Tell a friend your plans for tonight and tomorrow.",target:["vais","ce","soir","demain","manger","travailler"]},
],
miniConv:{topic:"Giving directions and making plans with aller",starter:"Pardon, excusez-moi. Où est la gare, s'il vous plaît ?"},
},
// ══ LESSON 14: Questions ══
{id:14,title:"Asking Questions",sub:"Who, what, where, when, why, how",icon:HelpCircle,level:"A1",
grammar:{title:"Questions in French",sections:[
  {type:"intro",text:"You already know *où* (where). Now meet the full question family: *qui* (who), *que/quoi* (what), *quand* (when), *comment* (how), *pourquoi* (why), *combien* (how much)."},
  {type:"block",label:"Question Words",items:[
    {fr:"Qui ?",en:"Who?",note:"Qui est-ce ? = Who is it? Qui = who."},
    {fr:"Que / Quoi ?",en:"What?",note:"Que before verb: Que fais-tu ? Quoi at end: Tu fais quoi ? Same meaning."},
    {fr:"Où ?",en:"Where?",note:"You learned this in L1! Où est la gare ?"},
    {fr:"Quand ?",en:"When?",note:"Quand est-ce que tu arrives ? = When do you arrive?"},
    {fr:"Comment ?",en:"How?",note:"Comment ≈ comment (a remark/observation). Comment tu t'appelles ?"},
    {fr:"Pourquoi ?",en:"Why?",note:"Pourquoi = pour (for) + quoi (what). Literally 'for what?'"},
    {fr:"Combien ?",en:"How much/many?",note:"You know this from L8! Ça coûte combien ?"},
  ]},
  {type:"block",label:"Three Ways to Ask Questions",items:[
    {fr:"Tu parles français ?",en:"You speak French? (intonation)",note:"Just raise your voice at the end. Most common in casual speech."},
    {fr:"Est-ce que tu parles français ?",en:"Do you speak French?",note:"'Est-ce que' = question marker. Works with everything. Safe choice!"},
    {fr:"Parles-tu français ?",en:"Do you speak French? (formal)",note:"Inversion: verb-subject. Very formal/written. Rare in everyday speech."},
  ]},
  {type:"tip",text:"*Est-ce que* is your Swiss Army knife. Put it before any statement to make a question: 'Tu es content' → 'Est-ce que tu es content ?' Works every time."},
  {type:"block",label:"Answering Why: Parce que",items:[
    {fr:"Parce que...",en:"Because...",note:"Pourquoi tu apprends le français ? — Parce que j'aime la France !"},
  ]},
  {type:"etymology",pairs:[
    {fr:"comment",en:"comment",root:"Latin 'quomodo' (in what way) → French comment. English 'comment' = a remark."},
    {fr:"parler",en:"parley",root:"Latin 'parabolare' → French parler. English: parley, parliament (place of speaking)."},
  ]},
],quickRecall:{q:"How do you say 'Why?'",a:"Pourquoi ?",o:["Pourquoi ?","Comment ?","Combien ?","Quand ?"]}},
examples:[
  {fr:"Comment tu t'appelles ?",en:"What's your name?",bridge:"How tu t'appelles?"},
  {fr:"Pourquoi tu apprends le français ?",en:"Why are you learning French?",bridge:"Why tu apprends le français?"},
  {fr:"Quand est-ce que tu arrives ?",en:"When do you arrive?",bridge:"When est-ce que tu arrives?"},
  {fr:"Qui est-ce ?",en:"Who is it?",bridge:"Who est-ce?"},
  {fr:"Est-ce que tu parles français ?",en:"Do you speak French?",bridge:"Est-ce que tu parles français?"},
  {fr:"Parce que j'aime la France.",en:"Because I love France.",bridge:"Because j'aime la France."},
  {fr:"Tu fais quoi ce soir ?",en:"What are you doing tonight?",bridge:"Tu fais what ce soir?"},
],
fillFG:[
  {s:"[___] is your name?",a:"Comment",o:["Comment","Pourquoi","Quand","Qui"],ctx:"Comment tu t'appelles ? = What's your name?"},
  {s:"[___] are you learning French?",a:"Pourquoi",o:["Pourquoi","Comment","Quand","Combien"],ctx:"Why = pourquoi."},
  {s:"[___] do you arrive?",a:"Quand",o:["Quand","Comment","Pourquoi","Où"],ctx:"When = quand."},
  {s:"[___] is it? (a person)",a:"Qui",o:["Qui","Que","Quand","Comment"],ctx:"Who = qui."},
  {s:"Do you speak French? (polite form)",a:"Est-ce que",o:["Est-ce que","Pourquoi","Comment","Quand"],ctx:"Est-ce que = question marker."},
],
fillBlanks:[
  {s:"___ tu t'appelles ?",a:"Comment",o:["Comment","Pourquoi","Quand","Qui"],ctx:"What's your name?"},
  {s:"___ tu apprends le français ?",a:"Pourquoi",o:["Pourquoi","Comment","Quand","Combien"],ctx:"Why are you learning French?"},
  {s:"___ est-ce que tu arrives ?",a:"Quand",o:["Quand","Comment","Où","Pourquoi"],ctx:"When do you arrive?"},
  {s:"___ est-ce ?",a:"Qui",o:["Qui","Que","Quand","Comment"],ctx:"Who is it?"},
  {s:"___ j'aime la France.",a:"Parce que",o:["Parce que","Pourquoi","Comment","Quand"],ctx:"Because I love France."},
],
buildSentences:[
  {c:["Comment","tu","t'appelles","?"],en:"What's your name?",trap:["Pourquoi","Qui"]},
  {c:["Pourquoi","tu","apprends","le","français","?"],en:"Why are you learning French?",trap:["Comment","Quand"]},
  {c:["Est-ce","que","tu","parles","français","?"],en:"Do you speak French?",trap:["Pourquoi","Comment"]},
  {c:["Parce","que","j'aime","la","France"],en:"Because I love France.",trap:["Comment","Pourquoi"]},
],
quiz:[
  {q:"'Pourquoi' literally means...",a:"For what (pour + quoi)",o:["For what (pour + quoi)","How what","When what","Who what"],ctx:"Pour = for, quoi = what."},
  {q:"The easiest way to ask a question is...",a:"Est-ce que + statement",o:["Est-ce que + statement","Inversion","Qu'est-ce que","Adding 'oui'"]},
  {q:"'Comment tu t'appelles ?' asks...",a:"Your name",o:["Your name","Your age","Where you're from","Why you're here"]},
  {q:"'Parce que' means...",a:"Because",o:["Because","Why","How","What for"]},
  {q:"Which question word asks about time?",a:"Quand",o:["Quand","Comment","Pourquoi","Qui"]},
  {q:"'Tu fais quoi ?' means...",a:"What are you doing?",o:["What are you doing?","Who are you?","How are you?","Where are you?"]},
],
combine:[
  {hint:"Name + French + why → Ask someone's name, if they speak French, and why they're learning",answer:"Comment tu t'appelles ? Tu parles français ? Pourquoi ?",accept:["comment tu t'appelles tu parles francais pourquoi","comment tu t'appelles ? tu parles français ? pourquoi ?"]},
  {hint:"When + arrive + because → Ask when they arrive and answer because you love France",answer:"Quand est-ce que tu arrives ? Parce que j'aime la France.",accept:["quand est-ce que tu arrives parce que j'aime la france","quand est-ce que tu arrives ? parce que j'aime la france"]},
  {hint:"What + tonight + go to restaurant → Ask what they're doing tonight, suggest the restaurant",answer:"Tu fais quoi ce soir ? On va au restaurant ?",accept:["tu fais quoi ce soir on va au restaurant","tu fais quoi ce soir ? on va au restaurant ?"]},
],
weave:[
  {en:"What's your name? Why are you learning French? Because I love France.",known:["comment","tu","t'appelles","pourquoi","apprends","le","français","parce","que","j'aime","la","France"],sample:"Comment tu t'appelles? Pourquoi tu apprends le français? Parce que j'aime la France."},
  {en:"When do you arrive? Who is it? Do you speak French?",known:["quand","est-ce que","tu","arrives","qui","est-ce","parles","français"],sample:"Quand est-ce que tu arrives? Qui est-ce? Est-ce que tu parles français?"},
  {en:"What are you doing tonight? I'm going to eat at the restaurant. How much does it cost?",known:["tu","fais","quoi","ce","soir","je","vais","manger","au","restaurant","combien","ça","coûte"],sample:"Tu fais quoi ce soir? Je vais manger au restaurant. Ça coûte combien?"},
],
review:[
  {type:"listen",audio:"Comment tu t'appelles ? Je m'appelle Marie.",q:"What is her name?",a:"Marie",o:["Marie","Marin","Marc","Martine"]},
  {type:"odd",q:"Which is NOT a question word?",items:["pourquoi","comment","parce que","quand"],a:"parce que",reason:"Parce que means 'because' — it's an answer, not a question."},
  {type:"context",situation:"You want to know someone's name.",a:"Comment tu t'appelles ?",o:["Comment tu t'appelles ?","Pourquoi tu t'appelles ?","Qui tu t'appelles ?","Quand tu t'appelles ?"]},
  {type:"fill_ctx",s:"Je ___ au restaurant ce soir. (Lesson 13 — aller)",a:"vais",o:["vais","suis","ai","vas"],ctx:"I'm going to the restaurant — aller."},
  {type:"fill_ctx",s:"___ tu apprends le français ?",a:"Pourquoi",o:["Pourquoi","Comment","Quand","Combien"],ctx:"Why are you learning French?"},
  {type:"weave",en:"Why? Because I love France.",blanks:[{word:"Why",answer:"Pourquoi"},{word:"Because",answer:"Parce que"}],full:"Pourquoi ? Parce que j'aime la France."},
],
sayIt:[
  {situation:"You meet someone new. Ask their name, where they're from, and if they speak French.",target:["comment","t'appelles","où","est-ce que","parles","français"]},
  {situation:"Ask your friend what they're doing tonight and why they can't come.",target:["quoi","ce","soir","pourquoi","parce que"]},
],
miniConv:{topic:"Getting to know someone by asking questions",starter:"Bonjour ! Comment tu t'appelles ? Tu es d'où ?"},
},
// ══ LESSON 15: Daily Routine ══
{id:15,title:"My Day",sub:"Wake up, work, eat, sleep — describe your routine",icon:Sun,level:"A1",
grammar:{title:"Daily Routine & Reflexive Verbs",sections:[
  {type:"intro",text:"When you do something to yourself — get UP, wash YOURSELF, dress YOURSELF — French uses reflexive verbs: *se lever* (to get up), *se laver* (to wash), *se coucher* (to go to bed)."},
  {type:"block",label:"Reflexive Verbs: The Pattern",items:[
    {fr:"Je me lève",en:"I get up (I raise myself)",note:"Me = myself. Lever ≈ lever (something that raises)."},
    {fr:"Tu te laves",en:"You wash (yourself)",note:"Te = yourself. Laver ≈ lavatory (place to wash)."},
    {fr:"Il/Elle se couche",en:"He/She goes to bed",note:"Se = himself/herself. Coucher ≈ couch (lie down)."},
    {fr:"Je m'habille",en:"I get dressed",note:"Me → m' before vowel. Habiller = to dress."},
  ]},
  {type:"block",label:"Time of Day",items:[
    {fr:"le matin",en:"in the morning",note:"Matin ≈ matinée (morning performance)."},
    {fr:"l'après-midi",en:"in the afternoon",note:"Après (after) + midi (noon) = afternoon."},
    {fr:"le soir",en:"in the evening",note:"Soir ≈ soirée (evening event)."},
    {fr:"la nuit",en:"at night",note:"Nuit ≈ nocturnal."},
  ]},
  {type:"block",label:"Daily Activities",items:[
    {fr:"travailler",en:"to work",note:"Travailler → travail. WARNING: False friend with 'travel'!"},
    {fr:"manger",en:"to eat",note:"You learned this in L9!"},
    {fr:"dormir",en:"to sleep",note:"Dormir ≈ dormant, dormitory."},
  ]},
  {type:"block",label:"Sequencing Words",items:[
    {fr:"puis",en:"then",note:"Je me lève, puis je me lave. = I get up, then I wash."},
    {fr:"tôt",en:"early",note:"Je me lève tôt. = I get up early."},
    {fr:"tard",en:"late",note:"Je me couche tard. ≈ tardy."},
  ]},
  {type:"tip",text:"Daily routine sentences follow a simple pattern: *time + reflexive verb*. 'Le matin, je me lève à sept heures.' Everything clicks once you learn the pattern."},
  {type:"culture",text:"The French workday often runs 9h-18h (9 AM-6 PM) with a real lunch break. Lunch is not eaten at the desk — it's a proper meal. 'La pause déjeuner' is sacred."},
],quickRecall:{q:"How do you say 'I get up'?",a:"Je me lève",o:["Je me lève","Je lève","Je suis levé","J'ai levé"]}},
examples:[
  {fr:"Le matin, je me lève à sept heures.",en:"In the morning, I get up at seven.",bridge:"Le matin, je me lève à seven heures."},
  {fr:"Puis je me lave et je m'habille.",en:"Then I wash and get dressed.",bridge:"Puis je me wash et je me dress."},
  {fr:"Je travaille l'après-midi.",en:"I work in the afternoon.",bridge:"Je work l'après-midi."},
  {fr:"Le soir, je mange avec ma famille.",en:"In the evening, I eat with my family.",bridge:"Le soir, je eat avec ma famille."},
  {fr:"Je me couche tard.",en:"I go to bed late.",bridge:"Je me couche late."},
  {fr:"Elle se lève tôt le matin.",en:"She gets up early in the morning.",bridge:"Elle se lève early le matin."},
  {fr:"Il dort bien la nuit.",en:"He sleeps well at night.",bridge:"Il sleeps bien la nuit."},
],
fillFG:[
  {s:"I [___] at seven o'clock.",a:"me lève",o:["me lève","lève","suis levé","ai levé"],ctx:"Reflexive: I get myself up."},
  {s:"She goes to [___] late.",a:"se couche",o:["se couche","couche","est couchée","a couché"],ctx:"Reflexive: she puts herself to bed."},
  {s:"I work in the [___].",a:"l'après-midi",o:["l'après-midi","matin","nuit","tard"],ctx:"Afternoon = après-midi."},
  {s:"[___] I wash and get dressed.",a:"Puis",o:["Puis","Mais","Et","Parce que"],ctx:"Then = puis (sequencing)."},
  {s:"He [___] well at night.",a:"dort",o:["dort","couche","lève","mange"],ctx:"Dormir = to sleep."},
],
fillBlanks:[
  {s:"Je ___ lève à sept heures.",a:"me",o:["me","se","te","le"],ctx:"I get up — je ME lève."},
  {s:"Elle ___ couche tard.",a:"se",o:["se","me","te","le"],ctx:"She goes to bed — elle SE couche."},
  {s:"Je travaille ___.",a:"l'après-midi",o:["l'après-midi","la nuit","tôt","bien"],ctx:"I work in the afternoon."},
  {s:"___, je me lave.",a:"Puis",o:["Puis","Mais","Parce que","Quand"],ctx:"Then, I wash."},
  {s:"Je me couche ___.",a:"tard",o:["tard","tôt","bien","ici"],ctx:"I go to bed late."},
],
buildSentences:[
  {c:["Je","me","lève","à","sept","heures"],en:"I get up at seven o'clock.",trap:["se","te"]},
  {c:["Elle","se","couche","tard"],en:"She goes to bed late.",trap:["me","tôt"]},
  {c:["Le","matin","je","travaille"],en:"In the morning, I work.",trap:["soir","nuit"]},
  {c:["Puis","je","me","lave"],en:"Then I wash.",trap:["se","te"]},
],
quiz:[
  {q:"What makes a verb 'reflexive'?",a:"The action is done to yourself",o:["The action is done to yourself","It's in the past","It's negative","It's a question"]},
  {q:"'Je me lève' — 'me' means...",a:"Myself",o:["Myself","Me","My","Mine"],ctx:"The reflexive pronoun."},
  {q:"'L'après-midi' means...",a:"The afternoon",o:["The afternoon","The morning","The evening","The night"]},
  {q:"'Tard' means...",a:"Late",o:["Late","Early","Well","Then"],ctx:"Tard ≈ tardy."},
  {q:"'Dormir' means...",a:"To sleep",o:["To sleep","To eat","To work","To wash"],ctx:"Dormir ≈ dormant, dormitory."},
  {q:"Which is the correct reflexive form?",a:"Il se lève",o:["Il se lève","Il me lève","Il te lève","Il lève"],ctx:"Il/elle uses 'se'."},
],
combine:[
  {hint:"Get up (7AM) + wash + dress → Describe your morning routine",answer:"Je me lève à sept heures, puis je me lave et je m'habille.",accept:["je me leve a sept heures puis je me lave et je m'habille","je me lève à sept heures, puis je me lave et je m'habille"]},
  {hint:"Work (afternoon) + eat (evening) + sleep (late) → Describe your day",answer:"Je travaille l'après-midi, je mange le soir et je me couche tard.",accept:["je travaille l'apres-midi je mange le soir et je me couche tard","je travaille l'après-midi, je mange le soir et je me couche tard"]},
  {hint:"She gets up (early) + he sleeps (well) → Compare two routines",answer:"Elle se lève tôt et il dort bien.",accept:["elle se leve tot et il dort bien","elle se lève tôt et il dort bien"]},
],
weave:[
  {en:"In the morning, I get up at seven. Then I wash and get dressed.",known:["le","matin","je","me","lève","à","sept","heures","puis","lave","m'habille"],sample:"Le matin, je me lève à sept heures. Puis je me lave and je m'habille."},
  {en:"I work in the afternoon and eat in the evening with my family.",known:["je","travaille","l'après-midi","mange","le","soir","avec","ma","famille"],sample:"Je travaille l'après-midi and je mange le soir avec ma famille."},
  {en:"She goes to bed late and he gets up early. I sleep well at night.",known:["elle","se","couche","tard","il","lève","tôt","je","dors","bien","la","nuit"],sample:"Elle se couche tard and il se lève tôt. Je dors bien la nuit."},
],
review:[
  {type:"listen",audio:"Le matin, je me lève à six heures et je me lave.",q:"What time does the speaker get up?",a:"6:00",o:["6:00","7:00","8:00","5:00"]},
  {type:"odd",q:"Which is NOT a time of day?",items:["le matin","le soir","le tard","la nuit"],a:"le tard",reason:"'Tard' means 'late', not a time of day. It should be just 'tard'."},
  {type:"context",situation:"It's morning. Describe what you do first.",a:"Je me lève et je me lave",o:["Je me lève et je me lave","Je me couche et je dors","Je mange et je travaille","Je pars et je vais"]},
  {type:"fill_ctx",s:"___ tu t'appelles ? (Lesson 14)",a:"Comment",o:["Comment","Pourquoi","Quand","Qui"],ctx:"What's your name? Cross-reference L14."},
  {type:"fill_ctx",s:"Je ___ lève à sept heures.",a:"me",o:["me","se","te","le"],ctx:"Reflexive pronoun — je ME lève."},
  {type:"weave",en:"I go to bed late.",blanks:[{word:"go to bed",answer:"couche"},{word:"late",answer:"tard"}],full:"Je me couche tard."},
],
sayIt:[
  {situation:"Describe your full day: when you get up, what you do during the day, when you go to bed.",target:["me","lève","heures","travaille","mange","couche"]},
  {situation:"Compare your routine with your family: who gets up early, who sleeps late.",target:["se","lève","tôt","couche","tard","matin","soir"]},
],
miniConv:{topic:"Describing daily routines and comparing schedules",starter:"Tu te lèves à quelle heure le matin ? Moi, je me lève à six heures."},
},
// ══ LESSON 16: Places & Prepositions ══
{id:16,title:"Around Town",sub:"Navigate the city with prepositions",icon:Map,level:"A1",
grammar:{title:"Places & Prepositions",sections:[
  {type:"intro",text:"You can already say where you're going (L13: aller). Now learn WHERE things are: *dans* (in), *sur* (on), *sous* (under), *devant* (in front), *à côté de* (next to). Time to navigate a French city!"},
  {type:"block",label:"Key Prepositions",items:[
    {fr:"dans",en:"in/inside",note:"Dans la maison = in the house. Dans le parc = in the park."},
    {fr:"sur",en:"on",note:"Sur la table = on the table. Sur ≈ surface."},
    {fr:"sous",en:"under",note:"Sous la table = under the table. Sous ≈ sous-chef (under the chef)."},
    {fr:"devant",en:"in front of",note:"Review from L13! Devant la gare = in front of the station."},
    {fr:"derrière",en:"behind",note:"Review from L13! Derrière la maison = behind the house."},
    {fr:"à côté de",en:"next to",note:"Côté ≈ coast (side). À côté de la banque = next to the bank."},
    {fr:"en face de",en:"across from",note:"Face ≈ face. En face de la pharmacie = across from the pharmacy."},
    {fr:"entre",en:"between",note:"Entre ≈ enter (going between). Entre la banque et la pharmacie."},
  ]},
  {type:"block",label:"City Places",items:[
    {fr:"la pharmacie",en:"the pharmacy",note:"Pharmacie ≈ pharmacy. Green cross sign outside!"},
    {fr:"la boulangerie",en:"the bakery",note:"From 'boulanger' (baker). Every neighborhood has one."},
    {fr:"le supermarché",en:"the supermarket",note:"Supermarché ≈ supermarket."},
    {fr:"la banque",en:"the bank",note:"Banque ≈ bank."},
    {fr:"le parc",en:"the park",note:"Parc ≈ park."},
  ]},
  {type:"tip",text:"Need to give directions? Combine L13 (aller/directions) with prepositions: 'Allez tout droit, la pharmacie est à côté de la banque.' You sound like a local!"},
  {type:"culture",text:"French pharmacies (marked with a green cross) are on every corner. Pharmacists can advise you on minor illnesses — no appointment needed. And boulangeries must bake bread on-premises to use the name!"},
],quickRecall:{q:"How do you say 'next to the bank'?",a:"à côté de la banque",o:["à côté de la banque","dans la banque","sur la banque","devant la banque"]}},
examples:[
  {fr:"La pharmacie est à côté de la banque.",en:"The pharmacy is next to the bank.",bridge:"La pharmacie est next to la banque."},
  {fr:"Le parc est en face du supermarché.",en:"The park is across from the supermarket.",bridge:"Le parc est across from le supermarché."},
  {fr:"Il y a une boulangerie dans la rue.",en:"There's a bakery on the street.",bridge:"Il y a une boulangerie in la rue."},
  {fr:"Le chat est sous la table.",en:"The cat is under the table.",bridge:"Le chat est under la table."},
  {fr:"La gare est entre le parc et la banque.",en:"The station is between the park and the bank.",bridge:"La gare est between le parc et la banque."},
  {fr:"Je suis dans le supermarché.",en:"I'm in the supermarket.",bridge:"Je suis in le supermarché."},
  {fr:"La boulangerie est devant le parc.",en:"The bakery is in front of the park.",bridge:"La boulangerie est in front le parc."},
],
fillFG:[
  {s:"The pharmacy is [___] the bank.",a:"à côté de",o:["à côté de","dans","sur","sous"],ctx:"Next to = à côté de."},
  {s:"The cat is [___] the table.",a:"sous",o:["sous","sur","dans","devant"],ctx:"Under = sous."},
  {s:"The park is [___] the supermarket.",a:"en face du",o:["en face du","à côté du","dans le","sous le"],ctx:"Across from = en face de."},
  {s:"The station is [___] the park and the bank.",a:"entre",o:["entre","dans","sur","devant"],ctx:"Between = entre."},
  {s:"I'm [___] the supermarket.",a:"dans",o:["dans","sur","sous","entre"],ctx:"In/inside = dans."},
],
fillBlanks:[
  {s:"La pharmacie est ___ la banque.",a:"à côté de",o:["à côté de","dans","sur","en face de"],ctx:"Next to the bank."},
  {s:"Le chat est ___ la table.",a:"sous",o:["sous","sur","dans","devant"],ctx:"Under the table."},
  {s:"Le parc est ___ du supermarché.",a:"en face",o:["en face","à côté","devant","derrière"],ctx:"Across from the supermarket."},
  {s:"La gare est ___ le parc et la banque.",a:"entre",o:["entre","dans","devant","sous"],ctx:"Between the park and the bank."},
  {s:"Il y a une boulangerie ___ la rue.",a:"dans",o:["dans","sur","sous","entre"],ctx:"In/on the street."},
],
buildSentences:[
  {c:["La","pharmacie","est","à","côté","de","la","banque"],en:"The pharmacy is next to the bank.",trap:["dans","sous"]},
  {c:["Le","chat","est","sous","la","table"],en:"The cat is under the table.",trap:["sur","dans"]},
  {c:["Je","suis","dans","le","parc"],en:"I'm in the park.",trap:["sur","sous"]},
  {c:["La","gare","est","entre","le","parc","et","la","banque"],en:"The station is between the park and the bank.",trap:["dans","sous"]},
],
quiz:[
  {q:"'Sous' means...",a:"Under",o:["Under","On","In","Next to"],ctx:"Sous ≈ sous-chef (under the chef)."},
  {q:"'En face de' means...",a:"Across from",o:["Across from","Next to","Behind","In front of"]},
  {q:"Where would you buy bread in France?",a:"La boulangerie",o:["La boulangerie","La pharmacie","La banque","Le supermarché"]},
  {q:"'À côté de la banque' means...",a:"Next to the bank",o:["Next to the bank","In the bank","Across from the bank","Behind the bank"]},
  {q:"What does a green cross indicate in France?",a:"A pharmacy",o:["A pharmacy","A hospital","A bank","A bakery"]},
  {q:"'Entre' means...",a:"Between",o:["Between","In","On","Under"],ctx:"Entre ≈ enter (going between)."},
],
combine:[
  {hint:"Pharmacy + next to + bank → Describe location of the pharmacy",answer:"La pharmacie est à côté de la banque.",accept:["la pharmacie est a cote de la banque","la pharmacie est à côté de la banque"]},
  {hint:"Go straight + bakery + across from park → Give directions to the bakery",answer:"Allez tout droit, la boulangerie est en face du parc.",accept:["allez tout droit la boulangerie est en face du parc","allez tout droit, la boulangerie est en face du parc"]},
  {hint:"Station + between + park + bank → Describe the station's location",answer:"La gare est entre le parc et la banque.",accept:["la gare est entre le parc et la banque"]},
],
weave:[
  {en:"The pharmacy is next to the bank and the bakery is across from the park.",known:["la","pharmacie","est","à","côté","de","banque","boulangerie","en","face","du","parc"],sample:"La pharmacie est à côté de la banque and la boulangerie est en face du parc."},
  {en:"The cat is under the table. I'm in the supermarket. The station is between the park and the bank.",known:["le","chat","est","sous","la","table","je","suis","dans","supermarché","gare","entre","parc","et","banque"],sample:"Le chat est sous la table. Je suis dans le supermarché. La gare est entre le parc et la banque."},
  {en:"Go straight. The bakery is in front of the park, next to the pharmacy.",known:["allez","tout","droit","la","boulangerie","est","devant","le","parc","à","côté","de","pharmacie"],sample:"Allez tout droit. La boulangerie est devant le parc, à côté de la pharmacie."},
],
review:[
  {type:"listen",audio:"La pharmacie est en face du supermarché, à côté de la banque.",q:"Where is the pharmacy?",a:"Across from the supermarket, next to the bank",o:["Across from the supermarket, next to the bank","In the supermarket","Behind the bank","Between the park and bank"]},
  {type:"odd",q:"Which is NOT a place?",items:["pharmacie","boulangerie","entre","supermarché"],a:"entre",reason:"Entre means 'between' — it's a preposition, not a place."},
  {type:"context",situation:"Someone asks where the bank is. It's next to the park.",a:"La banque est à côté du parc",o:["La banque est à côté du parc","La banque est dans le parc","La banque est sous le parc","La banque est le parc"]},
  {type:"fill_ctx",s:"Je me ___ à sept heures. (Lesson 15)",a:"lève",o:["lève","couche","lave","mange"],ctx:"I get up at seven. Cross-reference L15."},
  {type:"fill_ctx",s:"Le chat est ___ la table.",a:"sous",o:["sous","sur","dans","entre"],ctx:"Under the table."},
  {type:"weave",en:"The bakery is next to the bank.",blanks:[{word:"bakery",answer:"boulangerie"},{word:"next to",answer:"à côté de"}],full:"La boulangerie est à côté de la banque."},
  {type:"context",situation:"You need medicine. Where do you go?",a:"À la pharmacie",o:["À la pharmacie","À la boulangerie","Au supermarché","À la banque"]},
],
sayIt:[
  {situation:"You're giving directions to a tourist. Tell them where the pharmacy, bakery, and park are relative to each other.",target:["pharmacie","boulangerie","parc","à côté","en face","devant"]},
  {situation:"Describe your neighborhood: what places are there and where they are.",target:["il y a","dans","rue","banque","supermarché","entre"]},
],
miniConv:{topic:"Describing locations and navigating a city",starter:"Excusez-moi, je cherche la pharmacie. Vous savez où elle est ?"},
},
];

const FLASH=[
  {fr:"bonjour",en:"hello",cat:"phrase",ex:"Bonjour, comment allez-vous ?",cog:""},
  {fr:"merci",en:"thank you",cat:"phrase",ex:"Merci beaucoup !",cog:"≈ mercy"},
  {fr:"être",en:"to be",cat:"verb",ex:"Je suis content.",cog:"→ essence, absent, present"},
  {fr:"comprendre",en:"to understand",cat:"verb",ex:"Je comprends.",cog:"≈ comprehend"},
  {fr:"répéter",en:"to repeat",cat:"verb",ex:"Pouvez-vous répéter ?",cog:"≈ repeat"},
  {fr:"il y a",en:"there is/are",cat:"phrase",ex:"Il y a un problème.",cog:""},
  {fr:"il faut",en:"one must",cat:"phrase",ex:"Il faut partir.",cog:""},
  {fr:"en fait",en:"actually",cat:"phrase",ex:"En fait, je préfère le thé.",cog:"≈ in fact"},
  {fr:"ça marche",en:"sounds good",cat:"phrase",ex:"Ça marche, à demain !",cog:"≈ march"},
  {fr:"ça dépend",en:"it depends",cat:"phrase",ex:"Ça dépend.",cog:"≈ depend"},
  {fr:"d'accord",en:"okay",cat:"phrase",ex:"D'accord, on y va !",cog:"≈ accord"},
  {fr:"fatigué",en:"tired",cat:"adj",ex:"Je suis fatigué.",cog:"≈ fatigue"},
  {fr:"content",en:"happy",cat:"adj",ex:"Je suis content.",cog:"≈ content"},
  {fr:"restaurant",en:"restaurant",cat:"noun",ex:"Il y a un bon restaurant.",cog:"≈ restaurant"},
  {fr:"problème",en:"problem",cat:"noun",ex:"Pas de problème.",cog:"≈ problem"},
  {fr:"petit",en:"small",cat:"adj",ex:"Le petit chat.",cog:"≈ petite"},
  {fr:"grand",en:"big",cat:"adj",ex:"Un grand hôtel.",cog:"≈ grand"},
  {fr:"chat",en:"cat",cat:"noun",ex:"Le petit chat est ici.",cog:""},
  {fr:"rue",en:"street",cat:"noun",ex:"La rue est grande.",cog:""},
  {fr:"pain",en:"bread",cat:"noun",ex:"Du pain et du vin.",cog:""},
  {fr:"vin",en:"wine",cat:"noun",ex:"Du vin rouge.",cog:"≈ wine (from Latin vinum)"},
  {fr:"tu",en:"you (informal)",cat:"pronoun",ex:"Tu es français ?",cog:""},
  {fr:"vous",en:"you (formal/plural)",cat:"pronoun",ex:"Vous êtes américain ?",cog:""},
  {fr:"toi",en:"you (emphatic)",cat:"pronoun",ex:"Et toi ?",cog:""},
  // L6: Avoir
  {fr:"avoir",en:"to have",cat:"verb",ex:"J'ai faim.",cog:""},
  {fr:"faim",en:"hunger",cat:"noun",ex:"J'ai faim.",cog:"≈ famine"},
  {fr:"soif",en:"thirst",cat:"noun",ex:"J'ai soif.",cog:""},
  {fr:"peur",en:"fear",cat:"noun",ex:"J'ai peur.",cog:""},
  {fr:"besoin",en:"need",cat:"noun",ex:"J'ai besoin d'aide.",cog:""},
  {fr:"raison",en:"right/reason",cat:"noun",ex:"Tu as raison.",cog:"≈ reason"},
  {fr:"tort",en:"wrong",cat:"noun",ex:"Il a tort.",cog:"≈ tort"},
  {fr:"chaud",en:"hot",cat:"adj",ex:"J'ai chaud.",cog:""},
  {fr:"froid",en:"cold",cat:"adj",ex:"J'ai froid.",cog:"≈ frigid"},
  {fr:"mal",en:"pain/ache",cat:"noun",ex:"J'ai mal à la tête.",cog:"≈ malady"},
  // L7: Articles & Gender
  {fr:"livre",en:"book",cat:"noun",ex:"Le livre est sur la table.",cog:"≈ library"},
  {fr:"maison",en:"house",cat:"noun",ex:"La maison est grande.",cog:"≈ mansion"},
  {fr:"voiture",en:"car",cat:"noun",ex:"La voiture est rouge.",cog:""},
  {fr:"téléphone",en:"phone",cat:"noun",ex:"Le téléphone sonne.",cog:"≈ telephone"},
  {fr:"musique",en:"music",cat:"noun",ex:"La musique est belle.",cog:"≈ music"},
  {fr:"famille",en:"family",cat:"noun",ex:"Ma famille est grande.",cog:"≈ family"},
  {fr:"table",en:"table",cat:"noun",ex:"Sur la table.",cog:"≈ table"},
  {fr:"chaise",en:"chair",cat:"noun",ex:"La chaise est petite.",cog:""},
  // L8: Numbers & Time
  {fr:"heure",en:"hour/time",cat:"noun",ex:"Il est trois heures.",cog:"≈ hour"},
  {fr:"midi",en:"noon",cat:"noun",ex:"Il est midi.",cog:"≈ midday"},
  {fr:"combien",en:"how much",cat:"adv",ex:"Ça coûte combien ?",cog:""},
  {fr:"cher",en:"expensive",cat:"adj",ex:"C'est trop cher.",cog:"≈ cherish"},
  {fr:"euro",en:"euro",cat:"noun",ex:"Ça coûte dix euros.",cog:"≈ euro"},
  {fr:"demi",en:"half",cat:"adj",ex:"Il est midi et demi.",cog:"≈ demi"},
  // L9: Food
  {fr:"manger",en:"to eat",cat:"verb",ex:"Je vais manger.",cog:""},
  {fr:"boire",en:"to drink",cat:"verb",ex:"Je vais boire de l'eau.",cog:"≈ beverage"},
  {fr:"poulet",en:"chicken",cat:"noun",ex:"Je prends le poulet.",cog:"≈ poultry"},
  {fr:"fromage",en:"cheese",cat:"noun",ex:"Du fromage, s'il vous plaît.",cog:"≈ fromage"},
  {fr:"salade",en:"salad",cat:"noun",ex:"Une salade verte.",cog:"≈ salad"},
  {fr:"eau",en:"water",cat:"noun",ex:"De l'eau, s'il vous plaît.",cog:"≈ eau (perfume)"},
  {fr:"addition",en:"the check",cat:"noun",ex:"L'addition, s'il vous plaît.",cog:"≈ addition"},
  {fr:"dessert",en:"dessert",cat:"noun",ex:"Un dessert, s'il vous plaît.",cog:"≈ dessert"},
  // L10: Family
  {fr:"père",en:"father",cat:"noun",ex:"Mon père est grand.",cog:"≈ paternal"},
  {fr:"mère",en:"mother",cat:"noun",ex:"Ma mère est médecin.",cog:"≈ maternal"},
  {fr:"frère",en:"brother",cat:"noun",ex:"Mon frère a vingt ans.",cog:"≈ fraternal"},
  {fr:"sœur",en:"sister",cat:"noun",ex:"Ma sœur est étudiante.",cog:"≈ sorority"},
  {fr:"enfant",en:"child",cat:"noun",ex:"L'enfant est petit.",cog:"≈ infant"},
  {fr:"ami",en:"friend",cat:"noun",ex:"Mon ami est ici.",cog:"≈ amicable"},
  {fr:"jeune",en:"young",cat:"adj",ex:"Elle est jeune.",cog:"≈ juvenile"},
  {fr:"vieux",en:"old",cat:"adj",ex:"Il est vieux.",cog:""},
  // L11: Negation
  {fr:"jamais",en:"never",cat:"adv",ex:"Je ne mange jamais de viande.",cog:""},
  {fr:"rien",en:"nothing",cat:"pronoun",ex:"Il n'y a rien.",cog:""},
  {fr:"personne",en:"nobody",cat:"pronoun",ex:"Il n'y a personne.",cog:"≈ person"},
  {fr:"toujours",en:"always",cat:"adv",ex:"Il est toujours en retard.",cog:""},
  {fr:"encore",en:"still/again",cat:"adv",ex:"Tu es encore ici ?",cog:"≈ encore"},
  {fr:"déjà",en:"already",cat:"adv",ex:"J'ai déjà mangé.",cog:"≈ déjà vu"},
  // L13: Aller
  {fr:"aller",en:"to go",cat:"verb",ex:"Je vais au restaurant.",cog:""},
  {fr:"gauche",en:"left",cat:"noun",ex:"À gauche.",cog:""},
  {fr:"droite",en:"right (direction)",cat:"noun",ex:"À droite.",cog:"≈ direct"},
  {fr:"devant",en:"in front of",cat:"prep",ex:"Devant la gare.",cog:"≈ avant-garde"},
  {fr:"derrière",en:"behind",cat:"prep",ex:"Derrière la maison.",cog:""},
  // L14: Questions
  {fr:"pourquoi",en:"why",cat:"adv",ex:"Pourquoi tu apprends le français ?",cog:""},
  {fr:"comment",en:"how",cat:"adv",ex:"Comment tu t'appelles ?",cog:"≈ comment"},
  {fr:"quand",en:"when",cat:"adv",ex:"Quand est-ce que tu arrives ?",cog:""},
  {fr:"parce que",en:"because",cat:"phrase",ex:"Parce que j'aime le français.",cog:""},
  // L15: Daily Routine
  {fr:"se lever",en:"to get up",cat:"verb",ex:"Je me lève à sept heures.",cog:"≈ lever"},
  {fr:"travailler",en:"to work",cat:"verb",ex:"Je travaille le matin.",cog:"≈ travail"},
  {fr:"dormir",en:"to sleep",cat:"verb",ex:"Je dors bien.",cog:"≈ dormant"},
  {fr:"matin",en:"morning",cat:"noun",ex:"Le matin, je me lève.",cog:"≈ matinée"},
  {fr:"soir",en:"evening",cat:"noun",ex:"Le soir, je me couche.",cog:"≈ soirée"},
  // L16: Places
  {fr:"pharmacie",en:"pharmacy",cat:"noun",ex:"La pharmacie est à gauche.",cog:"≈ pharmacy"},
  {fr:"boulangerie",en:"bakery",cat:"noun",ex:"La boulangerie est ici.",cog:""},
  {fr:"supermarché",en:"supermarket",cat:"noun",ex:"Le supermarché est loin.",cog:"≈ supermarket"},
  {fr:"banque",en:"bank",cat:"noun",ex:"La banque est à droite.",cog:"≈ bank"},
  {fr:"parc",en:"park",cat:"noun",ex:"Le parc est grand.",cog:"≈ park"},
];

const MOTIV=["Every new word is a step. The summit is getting closer.","Made a mistake? Your brain just formed a new connection.","The easy path makes you a tourist. The hard path makes you a speaker.","When you reach the summit, the descent is effortless.","A French person said this exact sentence today."];

const SECS=["read_listen","patterns","fill_fg","fill_fr","build","fill_write","quiz","combine_fg","say_it","mini_conv","review"];
const SEC_N=["Read & Listen","Patterns","Weave Fill","French Fill","Build","Write","Quiz","Combine","Say It","Mini Chat","Review"];
const SEC_I=[Headphones,Lightbulb,Type,Pen,Pen,Layers,Target,Globe,Sparkles,MessageCircle,RefreshCw];

export default function App(){
  const [tab,setTab]=useState("home");const [lid,setLid]=useState(null);const [sec,setSec]=useState(0);
  const [prog,setProg]=useState({});const [xp,setXp]=useState(0);const [loaded,setLoaded]=useState(false);
  const [ci,setCi]=useState(0);const [flip,setFlip]=useState(false);const [cdir,setCdir]=useState(0);
  const [ans,setAns]=useState({});const [qI,setQI]=useState(0);
  const [fI,setFI]=useState(0);const [typeIn,setTypeIn]=useState("");const [typeRes,setTypeRes]=useState(null);
  const [bAns,setBAns]=useState([]);const [bP,setBP]=useState([]);const [bOk,setBOk]=useState(false);const [bI,setBI]=useState(0);
  const [cIn,setCIn]=useState("");const [cI2,setCI2]=useState(0);const [cR,setCR]=useState(null);const [cA,setCA]=useState(0);
  const [fgStep,setFgStep]=useState(0);const [fgI,setFgI]=useState(0);const [fgMode,setFgMode]=useState("a");
  const [fgBlanks,setFgBlanks]=useState({});
  const [rvI,setRvI]=useState(0);const [rvAns,setRvAns]=useState(null);
  const [trans,setTrans]=useState(null);
  const [score,setScore]=useState(0);const [total,setTotal]=useState(0);
  const [cfgPhase,setCfgPhase]=useState("combine");
  const [errors,setErrors]=useState([]);
  const [dailyRev,setDailyRev]=useState({date:"",count:0});
  const [streak,setStreak]=useState(0);
  const [showDR,setShowDR]=useState(false);
  const [drIdx,setDrIdx]=useState(0);
  const [drAns,setDrAns]=useState(null);
  const [drItems,setDrItems]=useState([]);
  // Say It Your Way state
  const [sayIn,setSayIn]=useState("");
  const [sayRes,setSayRes]=useState(null);
  const [sayLoading,setSayLoading]=useState(false);
  // Mini Conversation state
  const [miniMsgs,setMiniMsgs]=useState([]);
  const [miniIn,setMiniIn]=useState("");
  const [miniLoading,setMiniLoading]=useState(false);

  // Chat state
  const [chatMsgs,setChatMsgs]=useState([]);const [chatIn,setChatIn]=useState("");const [chatLoading,setChatLoading]=useState(false);
  const [chatMode,setChatMode]=useState("free");const [chatScenario,setChatScenario]=useState(null);
  const [chatMsgCount,setChatMsgCount]=useState(0);const [showHelp,setShowHelp]=useState(null);
  const chatRef=useRef(null);const MSG_LIMIT=15;
  const [pratikMode,setPratikMode]=useState("menu");
  const [trI,setTrI]=useState(0);const [trIn,setTrIn]=useState("");const [trR,setTrR]=useState(null);const [trHint,setTrHint]=useState(false);

  const SCENARIOS=[
    {id:"cafe",label:"At the Café",icon:Coffee,desc:"Order drinks",starter:"Bonjour ! Bienvenue au Café de la Montagne. Qu'est-ce que je vous sers ?"},
    {id:"doctor",label:"At the Doctor",icon:Stethoscope,desc:"Describe symptoms",starter:"Bonjour, je suis le docteur Martin. Qu'est-ce qui ne va pas ?"},
    {id:"job",label:"Job Interview",icon:Briefcase,desc:"Introduce yourself",starter:"Bonjour, merci d'être venu. Pouvez-vous vous présenter ?"},
  ];

  const chatSystem=(mode,sc)=>{
    const b=`You are a French conversation partner. User is an English speaker at A1-A2.\nRULES: Always respond in French, short simple sentences. NEVER directly correct errors — say "je n'ai pas bien compris" and force self-correction. After 2nd attempt: indirect hint. After 3rd: provide correct form. 1-3 sentences max. No emojis. If user writes English: "En français, s'il vous plaît !"`;
    if(mode==="scenario"&&sc){const s=SCENARIOS.find(x=>x.id===sc);return b+`\nROLE: ${s?.desc}. Stay in character.`;}
    return b;
  };
  const sendChat=async()=>{
    if(!chatIn.trim()||chatLoading||chatMsgCount>=MSG_LIMIT)return;
    const u={role:"user",content:chatIn.trim()};const nm=[...chatMsgs,u];
    setChatMsgs(nm);setChatIn("");setChatLoading(true);setChatMsgCount(c=>c+1);
    try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,system:chatSystem(chatMode,chatScenario),messages:nm.filter(m=>m.role!=="system")})});
    const d=await r.json();setChatMsgs(m=>[...m,{role:"assistant",content:d.content?.[0]?.text||"Désolé, réessayez."}]);
    }catch{setChatMsgs(m=>[...m,{role:"assistant",content:"Problème technique."}]);}
    setChatLoading(false);
  };
  const resetChat=()=>{setChatMsgs([]);setChatIn("");setChatScenario(null);setChatMsgCount(0);setShowHelp(null);};

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("lm7");if(r?.value){const d=JSON.parse(r.value);setProg(d.p||{});setXp(d.xp||0);setErrors(d.err||[]);
    const dr=d.dr||{date:"",count:0};let str=d.streak||0;
    const td=new Date().toISOString().slice(0,10);
    const yd=new Date(Date.now()-86400000).toISOString().slice(0,10);
    if(dr.date&&dr.date!==td&&dr.date!==yd)str=0;
    if(dr.date===yd&&dr.count<5)str=0;
    setDailyRev(dr);setStreak(str);
  }}catch{}setLoaded(true);})();},[]);
  useEffect(()=>{if(chatRef.current)chatRef.current.scrollTop=chatRef.current.scrollHeight;},[chatMsgs,chatLoading]);
  const sv=useCallback(async(p,x,err,dr,str)=>{try{await window.storage.set("lm7",JSON.stringify({p,xp:x,err:err||[],dr:dr||{date:"",count:0},streak:str||0}));}catch{}},[]);
  const gx=(n)=>{setXp(p=>{const v=p+n;sv(prog,v,errors,dailyRev,streak);return v;});};
  const mk=(l,s)=>{setProg(p=>{const n={...p,[`${l}-${s}`]:true};sv(n,xp,errors,dailyRev,streak);return n;});};
  const logErr=(word,sec,given,correct,lessonId)=>{setErrors(prev=>{const e=[...prev,{w:word,s:sec,g:given,c:correct,l:lessonId,t:Date.now()}];sv(prog,xp,e,dailyRev,streak);return e;});};
  const weakSpots=useMemo(()=>{const counts={};errors.forEach(e=>{const k=e.c;counts[k]=(counts[k]||0)+1;});return Object.entries(counts).filter(([_,c])=>c>=3).sort((a,b)=>b[1]-a[1]).map(([word,count])=>({word,count}));},[errors]);

  // ── DAILY REVIEW ──
  const today=()=>new Date().toISOString().slice(0,10);
  const drCount=dailyRev.date===today()?dailyRev.count:0;
  const todayDone=drCount>=5;
  const genReviewItems=(count)=>{
    const ws=weakSpots.map(w=>w.word);
    const pool=[...FLASH].sort(()=>Math.random()-0.5);
    const ordered=[...pool.filter(f=>ws.includes(f.fr)),...pool.filter(f=>!ws.includes(f.fr))];
    const items=[];
    for(let i=0;i<Math.min(count,ordered.length);i++){
      const w=ordered[i];
      const others=FLASH.filter(f=>f.fr!==w.fr).sort(()=>Math.random()-0.5).slice(0,3).map(f=>f.en);
      const opts=[w.en,...others].sort(()=>Math.random()-0.5);
      const isWeak=ws.includes(w.fr);
      items.push({q:`What does "${w.fr}" mean?`,a:w.en,o:opts,word:w.fr,weak:isWeak});
    }
    return items;
  };
  const startDailyReview=()=>{
    const remaining=5-drCount;
    if(remaining<=0)return;
    const items=genReviewItems(remaining);
    setDrItems(items);setDrIdx(0);setDrAns(null);setShowDR(true);
  };
  const handleDrNext=()=>{
    const newCount=drCount+drIdx+1;
    const newDr={date:today(),count:newCount};
    setDailyRev(newDr);
    if(drIdx>=drItems.length-1){
      let newStreak=streak;
      if(newCount>=5&&drCount<5)newStreak=streak+1;
      setStreak(newStreak);
      sv(prog,xp,errors,newDr,newStreak);
      setShowDR(false);setDrIdx(0);setDrAns(null);
    }else{
      setDrIdx(drIdx+1);setDrAns(null);
      sv(prog,xp,errors,newDr,streak);
    }
  };

  const lp=(l)=>{let d=0;SECS.forEach(s=>{if(prog[`${l}-${s}`])d++;});return d;};

  // ── CAN-DO MILESTONES ──
  const MILESTONES=[
    {ids:[1,2,3,4],title:"Foundation Complete",desc:"You can greet, pronounce basics, and navigate formal vs informal French.",icon:"🏔️"},
    {ids:[5,6,7],title:"Grammar Power",desc:"You can describe who you are, what you have, and use articles correctly.",icon:"⛰️"},
    {ids:[8,9,10],title:"Social Ready",desc:"You can handle numbers, order food, and talk about your family.",icon:"🗻"},
    {ids:[11,12,13],title:"Expression Master",desc:"You can negate, use everyday phrases, and make future plans.",icon:"🏕️"},
    {ids:[14,15,16],title:"Independence",desc:"You can ask questions, describe your day, and navigate a city.",icon:"🏁"},
  ];
  const getMilestones=()=>MILESTONES.filter(m=>m.ids.every(id=>lp(id)===SECS.length));
  const earnedMilestones=getMilestones();

  const lesson=LESSONS.find(l=>l.id===lid);
  const rs=()=>{setAns({});setQI(0);setFI(0);setTypeIn("");setTypeRes(null);setBAns([]);setBP([]);setBOk(false);setBI(0);setCIn("");setCI2(0);setCR(null);setCA(0);setFgStep(0);setFgI(0);setFgMode("a");setFgBlanks({});setRvI(0);setRvAns(null);setTrans(null);setScore(0);setTotal(0);setCfgPhase("combine");setSayIn("");setSayRes(null);setSayLoading(false);setMiniMsgs([]);setMiniIn("");setMiniLoading(false);};
  const go=(id)=>{setLid(id);setSec(0);rs();setTab("lesson");};
  const nextSec=(sc,tot,msg)=>{setTrans({score:sc,total:tot,next:sec+1,msg});};

  const P={bg:"#FAF9F7",paper:"#FFFFFF",ink:"#2C2825",ink2:"#6B6560",ink3:"#A39E99",red:"#C0392B",rl:"#FBEAE8",rb:"#F0C9C4",green:"#27AE60",gl:"#E8F5E9",amber:"#E67E22",al:"#FFF8E1",purple:"#7C3AED",pl:"#F3E5F5",border:"#E8E5E1",sh:"0 1px 4px rgba(44,40,37,0.06)"};
  const Btn=({onClick,children,color=P.red,disabled})=><button onClick={onClick} disabled={disabled} style={{width:"100%",padding:13,borderRadius:12,border:"none",cursor:disabled?"default":"pointer",background:color,color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12,opacity:disabled?0.5:1}}>{children}</button>;

  const renderGrammar=(sections)=>sections.map((s,i)=>{
    if(s.type==="intro")return <p key={i} style={{fontSize:14,lineHeight:1.85,color:P.ink2,margin:"0 0 16px"}}><FrMix text={s.text}/></p>;
    if(s.type==="tip")return <div key={i} style={{padding:"12px 14px",borderRadius:10,background:P.al,borderLeft:`3px solid ${P.amber}`,marginTop:14}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><Lightbulb size={16} color={P.amber} strokeWidth={1.5} style={{marginTop:2,flexShrink:0}}/><p style={{margin:0,fontSize:13,color:"#92400E",lineHeight:1.6}}><FrMix text={s.text}/></p></div></div>;
    if(s.type==="culture")return <div key={i} style={{padding:"12px 14px",borderRadius:10,background:"#FFF7ED",borderLeft:"3px solid #EA580C",margin:"14px 0"}}><div style={{display:"flex",gap:8,alignItems:"flex-start"}}><Globe size={16} color="#EA580C" strokeWidth={1.5} style={{marginTop:2,flexShrink:0}}/><p style={{margin:0,fontSize:13,color:"#9A3412",lineHeight:1.7}}><FrMix text={s.text}/></p></div></div>;
    if(s.type==="block")return(<div key={i} style={{margin:"14px 0"}}><div style={{fontSize:12,fontWeight:700,color:P.red,letterSpacing:0.5,marginBottom:8,textTransform:"uppercase"}}>{s.label}</div>
      {s.items.map((it,j)=>(<div key={j} style={{padding:"10px 14px",marginBottom:5,borderRadius:10,border:`1px solid ${P.border}`,background:P.paper}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}><span style={{fontFamily:"'Newsreader',serif",fontSize:15,fontWeight:600,color:P.ink,fontStyle:"italic"}}>{it.fr}</span><span style={{fontSize:12,color:P.ink3}}>{it.en}</span></div>
        {it.note&&<p style={{margin:"6px 0 0",fontSize:12,color:P.ink2,lineHeight:1.6}}>{it.note}</p>}
      </div>))}</div>);
    if(s.type==="conjugation")return(<div key={i} style={{margin:"14px 0",borderRadius:12,overflow:"hidden",border:`1px solid ${P.border}`}}>
      <div style={{background:P.rl,padding:"8px 14px",fontSize:12,fontWeight:700,color:P.red,letterSpacing:0.5,textTransform:"uppercase"}}>{s.verb}</div>
      {s.rows.map((r,j)=>(<div key={j} style={{display:"flex",padding:"9px 14px",borderBottom:j<s.rows.length-1?`1px solid ${P.border}`:"none",background:j%2===0?P.paper:"#FAFAF8",alignItems:"center",gap:6}}>
        <span style={{width:65,fontSize:12,color:P.ink3,fontWeight:500}}>{r.pr}</span>
        <span style={{flex:1,fontSize:14,fontFamily:"'Newsreader',serif",fontWeight:600,color:P.ink,fontStyle:"italic"}}>{r.conj}</span>
        <span style={{fontSize:11,color:P.ink3}}>{r.en}</span>
        <button onClick={()=>say(`${r.pr} ${r.conj}`)} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><Volume2 size={13} color={P.ink3} strokeWidth={1.5}/></button>
      </div>))}</div>);
    if(s.type==="etymology")return(<div key={i} style={{margin:"14px 0"}}>
      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}><BookMarked size={14} color={P.purple} strokeWidth={1.5}/><span style={{fontSize:12,fontWeight:700,color:P.purple,letterSpacing:0.5,textTransform:"uppercase"}}>Etymology — Cognates</span></div>
      {s.pairs.map((p,j)=>(<div key={j} style={{padding:"8px 12px",marginBottom:4,borderRadius:8,background:P.pl,border:"1px solid #E9D5F5"}}>
        <span style={{fontFamily:"'Newsreader',serif",fontWeight:600,color:P.purple,fontStyle:"italic"}}>{p.fr}</span><span style={{fontSize:12,color:P.ink3,margin:"0 6px"}}>≈</span><span style={{fontSize:13,fontWeight:600,color:P.ink2}}>{p.en}</span>
        <p style={{margin:"3px 0 0",fontSize:11,color:"#6B21A8",lineHeight:1.4}}>{p.root}</p>
      </div>))}</div>);
    if(s.type==="howToSay")return(<div key={i} style={{margin:"14px 0",padding:"14px",borderRadius:12,background:"#F0F9FF",border:"1px solid #BAE6FD"}}>
      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:10}}><Volume2 size={14} color="#0369A1" strokeWidth={1.5}/><span style={{fontSize:12,fontWeight:700,color:"#0369A1",letterSpacing:0.5,textTransform:"uppercase"}}>How to Say It</span></div>
      {s.words.map((w,j)=>(<div key={j} style={{marginBottom:j<s.words.length-1?10:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
          <span style={{fontFamily:"'Newsreader',serif",fontWeight:600,fontSize:14,color:P.ink,fontStyle:"italic"}}>{w.fr}</span>
          <button onClick={()=>say(w.fr)} style={{background:"none",border:"none",cursor:"pointer",padding:1}}><Volume2 size={12} color="#0369A1" strokeWidth={1.5}/></button>
        </div>
        <div style={{fontSize:12,color:"#0369A1",marginBottom:2}}>{w.phonetic} · <span style={{opacity:0.7}}>{w.ipa}</span></div>
        <div style={{fontSize:11,color:P.ink2}}>{w.notes}</div>
      </div>))}
    </div>);
    return null;
  });

  // ── MULTI-CHOICE RENDERER ──
  const MCQ=({options,answer,answered,onAnswer,onNext,nextLabel="Next"})=>(
    <div><div style={{display:"flex",flexDirection:"column",gap:7}}>
      {options.map(o=>{const ok=o===answer;const sel=answered===o;let bg=P.paper,bc=P.border,cl=P.ink;
        if(answered){if(ok){bg=P.gl;bc=P.green;cl=P.green;}else if(sel){bg=P.rl;bc=P.red;cl=P.red;}}
        return <button key={o} onClick={()=>{if(answered)return;onAnswer(o);}} style={{padding:"12px 15px",borderRadius:11,border:`1.5px solid ${bc}`,background:bg,color:cl,fontSize:14,fontWeight:500,cursor:answered?"default":"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>{o}{answered&&ok&&<Check size={15} color={P.green}/>}{answered&&sel&&!ok&&<X size={15} color={P.red}/>}</button>;
      })}
    </div>{answered&&<Btn onClick={onNext}>{nextLabel} <ArrowRight size={15}/></Btn>}</div>
  );

  if(!loaded)return <div style={{minHeight:"100vh",background:P.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><p style={{color:P.ink3,fontFamily:"'Newsreader',serif",fontStyle:"italic",fontSize:20}}>Le Mot</p></div>;

  return(
  <div style={{minHeight:"100vh",background:P.bg,fontFamily:"'Outfit',sans-serif",color:P.ink,maxWidth:480,margin:"0 auto",paddingBottom:85}}>
    <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600;6..72,700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <div style={{padding:"20px 24px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div><h1 style={{fontFamily:"'Newsreader',serif",fontSize:28,fontWeight:300,margin:0,fontStyle:"italic"}}>Le Mot</h1><p style={{margin:"1px 0 0",fontSize:10,color:P.ink3,letterSpacing:2.5,textTransform:"uppercase",fontWeight:500}}>la montagne du français</p></div>
      <div style={{display:"flex",alignItems:"center",gap:5,background:P.rl,borderRadius:20,padding:"5px 12px",border:`1px solid ${P.rb}`}}><Zap size={14} color={P.red} strokeWidth={1.5}/><span style={{fontSize:13,fontWeight:700,color:P.red}}>{xp}</span></div>
    </div>

    {/* ═══ HOME ═══ */}
    {tab==="home"&&(<div style={{padding:"0 24px"}}>
      {/* MOUNTAIN */}
      <div style={{marginBottom:18}}><svg viewBox="0 0 400 220" style={{width:"100%",display:"block"}}>
        {[...Array(50)].map((_,i)=><circle key={i} cx={Math.random()*400} cy={140+Math.random()*70} r={Math.random()*0.6+0.2} fill={P.ink3} opacity={Math.random()*0.12+0.05}/>)}
        <path d="M200,38 C190,50 175,62 164,70 C148,82 128,96 112,110 C94,128 74,146 56,162 C42,174 25,186 5,198" fill="none" stroke={P.ink2} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M200,38 C210,49 224,60 236,68 C252,78 270,92 284,106 C302,122 318,140 336,156 C350,168 368,182 392,196" fill="none" stroke={P.ink2} strokeWidth="1.2" strokeLinecap="round"/>
        {[...Array(24)].map((_,i)=>{const y=48+i*6;const sp=(y-38)*0.5;return <line key={i} x1={200-sp+4+Math.sin(i*1.5)*4} y1={y} x2={200-sp+16+Math.cos(i*2)*5} y2={y+1} stroke={P.ink3} strokeWidth="0.25" opacity={0.18}/>;})}
        {(()=>{const c=[
          {x:30,y:195,id:1},{x:75,y:188,id:2},{x:120,y:178,id:3},{x:155,y:168,id:4},
          {x:180,y:155,id:5},{x:210,y:145,id:6},{x:245,y:135,id:7},{x:275,y:122,id:8},
          {x:300,y:110,id:9},{x:325,y:98,id:10},{x:305,y:88,id:11},{x:275,y:78,id:12},
          {x:250,y:70,id:13},{x:228,y:62,id:14},{x:214,y:54,id:15},{x:202,y:46,id:16},
        ];const pk={x:200,y:34};return(<>
          {c.map((p,i)=>{if(i<c.length-1){const n=c[i+1];return <line key={`l${i}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={P.red} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.35"/>;}return null;})}
          <line x1={c[c.length-1].x} y1={c[c.length-1].y} x2={pk.x} y2={pk.y} stroke={P.red} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.25"/>
          {c.map((p,i)=>{const d=lp(p.id)===SECS.length;const s=lp(p.id)>0;const cl=d?P.green:s?P.amber:P.red;const alt=i%2===0;return(
            <g key={p.id} onClick={()=>go(p.id)} style={{cursor:"pointer"}}>
              <circle cx={p.x} cy={p.y} r={5.5} fill={d?cl:"none"} stroke={cl} strokeWidth={d?0:1.2}/>
              {d&&<path d={`M${p.x-2.5},${p.y} L${p.x-0.5},${p.y+2} L${p.x+3},${p.y-1.5}`} fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round"/>}
              {!d&&<circle cx={p.x} cy={p.y} r={s?2:1.5} fill={cl} opacity={s?1:0.4}/>}
              <text x={p.x} y={p.y+(alt?-9:14)} textAnchor="middle" fontSize="6.5" fill={P.ink2} fontFamily="Outfit" fontWeight="500">L{p.id}</text>
            </g>);})}
          <line x1={pk.x} y1={pk.y} x2={pk.x} y2={pk.y-14} stroke={P.red} strokeWidth="1.1"/><path d={`M${pk.x},${pk.y-14} L${pk.x+9},${pk.y-10.5} L${pk.x},${pk.y-7}`} fill={P.red} opacity="0.8"/>
          <text x={pk.x} y={pk.y-19} textAnchor="middle" fontSize="7" fill={P.ink3} fontFamily="Outfit" fontWeight="600" letterSpacing="1.5">SUMMIT</text>
          <text x={50} y={210} fontSize="7" fill={P.ink3} fontFamily="Outfit" opacity="0.4" letterSpacing="0.8">base camp</text>
          <text x={310} y={210} fontSize="7" fill={P.ink3} fontFamily="Outfit" opacity="0.4" letterSpacing="0.8">fluency</text>
        </>);})()}
      </svg></div>
      <div style={{padding:"12px 16px",marginBottom:20,borderLeft:`2px solid ${P.red}22`,background:P.rl,borderRadius:"0 10px 10px 0"}}><p style={{margin:0,fontSize:13.5,lineHeight:1.7,color:P.ink2,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>"{MOTIV[Math.floor(Date.now()/86400000)%MOTIV.length]}"</p></div>

      {/* DAILY REVIEW GOAL */}
      <div style={{background:P.paper,borderRadius:14,padding:"16px 18px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${todayDone?P.green+"35":P.red+"35"}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,background:todayDone?P.gl:P.rl,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {todayDone?<Check size={18} color={P.green} strokeWidth={2}/>:<Target size={18} color={P.red} strokeWidth={1.5}/>}
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700}}>Daily Review</div>
              <div style={{fontSize:11,color:P.ink3}}>{streak>0&&<span style={{color:P.amber,fontWeight:600}}>{streak}-day streak · </span>}{todayDone?"Goal reached!":drCount>0?`${drCount} of 5 done`:"5 words to review"}</div>
            </div>
          </div>
          {!todayDone&&<div style={{fontSize:24,fontWeight:700,color:P.red,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{drCount}<span style={{fontSize:14,color:P.ink3,fontWeight:400}}>/5</span></div>}
          {todayDone&&<div style={{fontSize:11,color:P.green,fontWeight:600,background:P.gl,padding:"4px 10px",borderRadius:6}}>Done!</div>}
        </div>
        {/* Progress bar */}
        <div style={{marginTop:12,background:P.border,borderRadius:4,height:4}}>
          <div style={{width:`${Math.min((drCount/5)*100,100)}%`,height:"100%",background:todayDone?P.green:P.red,borderRadius:4,transition:"width 0.5s"}}/>
        </div>
        {!todayDone&&<button onClick={startDailyReview} style={{width:"100%",padding:11,borderRadius:10,border:"none",cursor:"pointer",background:P.red,color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12}}>
          {drCount>0?"Continue Review":"Start Review"} <ArrowRight size={14}/>
        </button>}
      </div>

      {/* CAN-DO MILESTONES */}
      {earnedMilestones.length>0&&<div style={{marginBottom:14}}>
        {earnedMilestones.map((m,i)=>(
          <div key={i} style={{background:"linear-gradient(135deg,#E8F5E9,#F3E5F5)",borderRadius:14,padding:"14px 16px",marginBottom:8,border:`1px solid ${P.green}30`,display:"flex",gap:12,alignItems:"center"}}>
            <span style={{fontSize:24}}>{m.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:P.green}}>{m.title}</div>
              <div style={{fontSize:11,color:P.ink2,lineHeight:1.4,marginTop:2}}>{m.desc}</div>
            </div>
            <Star size={16} color={P.amber} strokeWidth={1.5} fill={P.amber}/>
          </div>
        ))}
      </div>}

      {[...LESSONS].sort((a,b)=>a.id-b.id).map(l=>{const d=lp(l.id);const pct=Math.round((d/SECS.length)*100);const LI=l.icon;return(
        <div key={l.id} onClick={()=>go(l.id)} style={{background:P.paper,borderRadius:14,padding:"16px 18px",marginBottom:10,cursor:"pointer",border:`1px solid ${pct===100?P.green+"35":P.border}`,boxShadow:P.sh,position:"relative"}}>
          {pct===100&&<div style={{position:"absolute",top:12,right:14}}><Check size={16} color={P.green} strokeWidth={2}/></div>}
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:38,height:38,borderRadius:10,background:pct===100?P.gl:P.rl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><LI size={18} color={pct===100?P.green:P.red} strokeWidth={1.5}/></div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}><span style={{fontSize:10,fontWeight:700,color:P.red}}>{l.level}</span><span style={{fontSize:10,color:P.ink3}}>·</span><span style={{fontSize:10,color:P.ink3}}>LESSON {l.id}</span></div>
              <div style={{fontSize:15,fontWeight:700}}>{l.title}</div>
              <div style={{fontSize:12,color:P.ink3,marginTop:1,marginBottom:8}}>{l.sub}</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,background:P.border,borderRadius:4,height:3}}><div style={{width:`${pct}%`,height:"100%",background:pct===100?P.green:P.red,borderRadius:4,transition:"width 0.5s"}}/></div><span style={{fontSize:11,color:pct===100?P.green:P.ink3,fontWeight:600}}>{d}/{SECS.length}</span></div>
            </div>
          </div>
        </div>);})}
      {[{n:"Avoir: What Do I Have?",i:BookMarked},{n:"Articles & Gender",i:Languages},{n:"Movement Verbs",i:Compass}].map((l,i)=>(
        <div key={i} style={{padding:"12px 18px",marginBottom:5,borderRadius:12,border:`1px dashed ${P.border}`,display:"flex",alignItems:"center",gap:12,opacity:0.4}}><l.i size={16} color={P.ink3} strokeWidth={1.5}/><span style={{flex:1,fontSize:13,color:P.ink3}}>{l.n}</span><Lock size={14} color={P.ink3} strokeWidth={1.5}/></div>
      ))}
    </div>)}

    {/* ═══ LESSON ═══ */}
    {tab==="lesson"&&lesson&&(<div style={{padding:"0 24px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <button onClick={()=>{setTab("home");setLid(null);}} style={{background:`${P.border}80`,border:"none",borderRadius:10,width:34,height:34,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={16} color={P.ink2} strokeWidth={1.5}/></button>
        <div><div style={{fontSize:10,fontWeight:600,color:P.red,letterSpacing:0.5}}>{lesson.level} · LESSON {lesson.id}</div><div style={{fontSize:16,fontWeight:700}}>{lesson.title}</div></div>
      </div>
      <div style={{display:"flex",gap:3,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
        {SEC_N.map((n,i)=>{const ok=prog[`${lesson.id}-${SECS[i]}`];const ac=sec===i;const SI=SEC_I[i];return(
          <button key={i} onClick={()=>{setSec(i);rs();}} style={{display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap",padding:"5px 8px",borderRadius:7,border:"none",cursor:"pointer",fontSize:10,fontWeight:600,background:ok?P.gl:ac?P.rl:"#F0EEEC",color:ok?P.green:ac?P.red:P.ink3}}>
            {ok?<Check size={10} color={P.green} strokeWidth={2}/>:<SI size={10} color={ac?P.red:P.ink3} strokeWidth={1.8}/>} {n}
          </button>);})}
      </div>

      {/* TRANSITION */}
      {trans&&(
        <div style={{background:P.paper,borderRadius:14,padding:26,boxShadow:P.sh,border:`1px solid ${P.border}`,textAlign:"center"}}>
          <div style={{width:50,height:50,borderRadius:14,background:trans.score>=trans.total*0.7||trans.total===0?P.gl:P.al,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}>
            {trans.score>=trans.total*0.7||trans.total===0?<Check size={24} color={P.green}/>:<Target size={24} color={P.amber}/>}
          </div>
          {trans.total>0&&<p style={{margin:"0 0 6px",fontSize:22,fontWeight:700,fontFamily:"'Newsreader',serif",color:trans.score>=trans.total*0.7?P.green:P.amber}}>{trans.score}/{trans.total}</p>}
          <p style={{margin:"0 0 4px",fontSize:14,fontWeight:600,color:P.ink}}>{trans.total===0?"Section Complete!":trans.score>=trans.total*0.7?"Well done!":"Keep practicing!"}</p>
          <p style={{margin:"0 0 18px",fontSize:12,color:P.ink3,lineHeight:1.5}}>{trans.msg}</p>
          <Btn onClick={()=>{setTrans(null);setSec(trans.next);rs();}}>Continue: {SEC_N[trans.next]} <ArrowRight size={15}/></Btn>
        </div>
      )}

      {/* SEC 1: PATTERNS */}
      {!trans&&sec===1&&(<div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
        <h3 style={{margin:"0 0 14px",fontSize:18,fontWeight:600,fontFamily:"'Newsreader',serif"}}>{lesson.grammar.title}</h3>
        {renderGrammar(lesson.grammar.sections)}
        {/* Quick Recall */}
        {lesson.grammar.quickRecall&&!ans.qr&&(<div style={{marginTop:16,padding:"14px",borderRadius:10,background:"#FAFAF8",border:`1px solid ${P.border}`}}>
          <p style={{margin:"0 0 8px",fontSize:12,fontWeight:600,color:P.ink3}}>Quick Recall</p>
          <p style={{margin:"0 0 10px",fontSize:14,color:P.ink,fontWeight:600}}>{lesson.grammar.quickRecall.q}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{lesson.grammar.quickRecall.o.map(o=>{
            const ok=o===lesson.grammar.quickRecall.a;const sel=ans.qr===o;
            let bg=P.paper,bc=P.border,cl=P.ink;
            if(ans.qr){if(ok){bg=P.gl;bc=P.green;cl=P.green;}else if(sel){bg=P.rl;bc=P.red;cl=P.red;}}
            return <button key={o} onClick={()=>{if(ans.qr)return;setAns(a=>({...a,qr:o}));if(ok)gx(5);}} style={{padding:"8px 14px",borderRadius:8,border:`1.5px solid ${bc}`,background:bg,color:cl,fontSize:13,fontWeight:500,cursor:ans.qr?"default":"pointer"}}>{o}</button>;
          })}</div>
        </div>)}
        <Btn onClick={()=>{mk(lesson.id,"patterns");nextSec(0,0,"Fill in French words inside English sentences — Weave time!");}}>{ans.qr?"Got it, next":"Continue"} <ArrowRight size={15}/></Btn>
      </div>)}

      {/* SEC 0: READ & LISTEN */}
      {!trans&&sec===0&&(<div>
        <p style={{fontSize:12,color:P.ink3,marginBottom:8}}>Tap any French word to see its meaning. Notice the Weave bridge below each sentence.</p>
        {lesson.examples.map((ex,i)=>(<div key={i} style={{background:P.paper,borderRadius:12,padding:"12px 14px",marginBottom:8,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontSize:15,fontFamily:"'Newsreader',serif",fontStyle:"italic",lineHeight:1.5,color:P.ink}}>«&nbsp;<FrText text={ex.fr}/>&nbsp;»</div>
              <p style={{margin:"4px 0 2px",fontSize:12,color:P.ink3}}>{ex.en}</p>
              {ex.bridge&&<p style={{margin:"4px 0 0",fontSize:11,color:P.purple,fontStyle:"italic",background:P.pl,padding:"3px 8px",borderRadius:5,display:"inline-block"}}>Bridge: {ex.bridge}</p>}
            </div>
            <button onClick={()=>say(ex.fr)} style={{background:P.rl,border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Volume2 size={14} color={P.red} strokeWidth={1.5}/></button>
          </div>
        </div>))}
        <Btn onClick={()=>{mk(lesson.id,"read_listen");nextSec(0,0,"Now discover the patterns behind what you just heard.");}}>Next <ArrowRight size={15}/></Btn>
      </div>)}

      {/* SEC 2: FRANGLAIS FILL */}
      {!trans&&sec===2&&(()=>{const fb=lesson.fillFG[fI];const a=ans[`fg${fI}`];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Weave Fill · {fI+1}/{lesson.fillFG.length}</p>
        <p style={{fontSize:12,color:P.purple,marginBottom:10,fontWeight:500}}>Replace the blank with the correct French word.</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          {fb.ctx&&<p style={{margin:"0 0 12px",fontSize:12,color:P.amber,fontStyle:"italic"}}>Situation: {fb.ctx}</p>}
          <p style={{margin:"0 0 16px",fontSize:17,color:P.ink,textAlign:"center",fontFamily:"'Newsreader',serif",fontWeight:500}}>{fb.s}</p>
          <MCQ options={fb.o} answer={fb.a} answered={a} onAnswer={v=>{setAns(x=>({...x,[`fg${fI}`]:v}));if(v===fb.a)gx(10);else logErr(fb.a,"fill_fg",v,fb.a,lesson.id);}}
            onNext={()=>{if(fI<lesson.fillFG.length-1){setFI(fI+1);setAns(x=>{const n={...x};delete n[`fg${fI}`];return n;});}
              else{mk(lesson.id,"fill_fg");setFI(0);setAns({});nextSec(0,0,"Same sentences, now fully in French. Can you still get them right?");}}}
            nextLabel={fI<lesson.fillFG.length-1?"Next":"Done"}/>
        </div>
      </div>);})()}

      {/* SEC 3: FRENCH FILL (situational) */}
      {!trans&&sec===3&&(()=>{const fb=lesson.fillBlanks[fI];const a=ans[`ff${fI}`];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>French Fill · {fI+1}/{lesson.fillBlanks.length}</p>
        <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>Now fully in French. Use the situation to guide your answer.</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          {fb.ctx&&<p style={{margin:"0 0 12px",fontSize:12,color:P.amber,fontStyle:"italic"}}>Situation: {fb.ctx}</p>}
          <p style={{margin:"0 0 16px",fontSize:17,color:P.ink,textAlign:"center",fontFamily:"'Newsreader',serif",fontWeight:500}}>{fb.s}</p>
          <MCQ options={fb.o} answer={fb.a} answered={a} onAnswer={v=>{setAns(x=>({...x,[`ff${fI}`]:v}));if(v===fb.a)gx(10);else logErr(fb.a,"fill_fr",v,fb.a,lesson.id);}}
            onNext={()=>{if(fI<lesson.fillBlanks.length-1){setFI(fI+1);setAns(x=>{const n={...x};delete n[`ff${fI}`];return n;});}
              else{mk(lesson.id,"fill_fr");setFI(0);setAns({});nextSec(0,0,"Now arrange words into full French sentences. Watch out for trap words!");}}}
            nextLabel={fI<lesson.fillBlanks.length-1?"Next":"Done"}/>
        </div>
      </div>);})()}

      {/* SEC 4: BUILD */}
      {!trans&&sec===4&&(()=>{const sb=lesson.buildSentences[bI];if(bP.length===0&&bAns.length===0){setBP([...sb.c,...(sb.trap||[])].sort(()=>Math.random()-0.5));}const ok=bAns.join(" ")===sb.c.join(" ");return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Build · {bI+1}/{lesson.buildSentences.length}</p>
        <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>Arrange words into a French sentence. Some words don't belong!</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <p style={{margin:"0 0 12px",fontSize:14,color:P.amber,textAlign:"center",fontWeight:600}}>{sb.en}</p>
          <div style={{minHeight:44,borderRadius:11,border:`2px dashed ${bOk?(ok?P.green+"60":P.red+"60"):P.border}`,padding:8,display:"flex",flexWrap:"wrap",gap:5,marginBottom:12,background:bOk?(ok?P.gl:P.rl):"transparent"}}>
            {bAns.length===0&&<span style={{color:P.ink3,fontSize:12}}>Tap the words</span>}
            {bAns.map((p,i)=><button key={i} onClick={()=>{if(bOk)return;setBP(x=>[...x,p]);setBAns(x=>x.filter((_,j)=>j!==i));}} style={{padding:"7px 12px",borderRadius:7,background:P.rl,border:`1px solid ${P.rb}`,color:P.red,cursor:bOk?"default":"pointer",fontSize:13,fontWeight:500}}>{p}</button>)}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14,justifyContent:"center"}}>
            {bP.map((p,i)=><button key={i} onClick={()=>{if(bOk)return;setBAns(x=>[...x,p]);setBP(x=>x.filter((_,j)=>j!==i));}} style={{padding:"7px 12px",borderRadius:7,background:"#F0EEEC",border:`1px solid ${P.border}`,color:P.ink,cursor:bOk?"default":"pointer",fontSize:13,fontWeight:500}}>{p}</button>)}
          </div>
          {!bOk&&bAns.length>0&&<Btn onClick={()=>{setBOk(true);if(ok)gx(15);else logErr(sb.c.join(" "),"build",bAns.join(" "),sb.c.join(" "),lesson.id);}}>Check</Btn>}
          {bOk&&<><p style={{textAlign:"center",fontSize:13,color:ok?P.green:P.red,fontWeight:600,margin:"8px 0 0"}}>{ok?"Correct!":"Answer: "+sb.c.join(" ")}</p>
            <Btn onClick={()=>{if(bI<lesson.buildSentences.length-1){setBI(bI+1);setBAns([]);setBP([]);setBOk(false);}
              else{mk(lesson.id,"build");setBI(0);nextSec(0,0,"Great building! Now write from memory...");}}}>{bI<lesson.buildSentences.length-1?"Next":"Done"}</Btn></>}
        </div>
      </div>);})()}

      {/* SEC 5: WRITE */}
      {!trans&&sec===5&&(()=>{const fb=lesson.fillBlanks[fI];const a=ans[`wt${fI}`];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Write · {fI+1}/{lesson.fillBlanks.length}</p>
        <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>Type the missing word from memory.</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          {fb.ctx&&<p style={{margin:"0 0 12px",fontSize:12,color:P.amber,fontStyle:"italic"}}>{fb.ctx}</p>}
          <p style={{margin:"0 0 16px",fontSize:17,color:P.ink,textAlign:"center",fontFamily:"'Newsreader',serif",fontWeight:500}}>{fb.s}</p>
          <input type="text" value={typeIn} onChange={e=>setTypeIn(e.target.value)} placeholder="Type the missing word..." disabled={typeRes!==null}
            style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${typeRes==="ok"?P.green:typeRes==="no"?P.red:P.border}`,background:typeRes==="ok"?P.gl:typeRes==="no"?P.rl:P.paper,fontFamily:"'Newsreader',serif",fontSize:15,fontStyle:"italic",color:P.ink,outline:"none",boxSizing:"border-box"}}/>
          {typeRes==="ok"&&<p style={{textAlign:"center",fontSize:13,color:P.green,fontWeight:600,margin:"8px 0 0"}}>Correct!</p>}
          {typeRes==="no"&&<p style={{textAlign:"center",fontSize:13,color:P.red,margin:"8px 0 0"}}>Answer: <strong>{fb.a}</strong></p>}
          {!typeRes&&<Btn onClick={()=>{if(norm(typeIn)===norm(fb.a)){setTypeRes("ok");gx(15);}else{setTypeRes("no");logErr(fb.a,"write",typeIn,fb.a,lesson.id);}}}>Check</Btn>}
          {typeRes&&<Btn onClick={()=>{if(fI<lesson.fillBlanks.length-1){setFI(fI+1);setTypeIn("");setTypeRes(null);}
            else{mk(lesson.id,"fill_write");setFI(0);nextSec(0,0,"Great writing! Quick quiz time...");}}}>{fI<lesson.fillBlanks.length-1?"Next":"Done"}</Btn>}
        </div>
      </div>);})()}

      {/* SEC 6: QUIZ */}
      {!trans&&sec===6&&(()=>{const q=lesson.quiz[qI];const a=ans[`q${qI}`];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:10}}>Quiz · {qI+1}/{lesson.quiz.length}</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${q.negative?P.red+"30":P.border}`}}>
          {q.negative&&<div style={{display:"flex",alignItems:"center",gap:5,marginBottom:10,padding:"5px 10px",borderRadius:6,background:P.rl}}><X size={13} color={P.red} strokeWidth={2}/><span style={{fontSize:11,fontWeight:700,color:P.red,letterSpacing:0.5}}>SPOT THE MISTAKE</span></div>}
          {q.ctx&&<p style={{margin:"0 0 10px",fontSize:12,color:P.amber,fontStyle:"italic"}}>{q.ctx}</p>}
          <p style={{margin:"0 0 14px",fontSize:15,color:P.ink,textAlign:"center",fontWeight:600,lineHeight:1.4}}>
            {q.q.split(/(NEVER|WRONG|NOT|DOES NOT)/).map((part,i)=>
              ["NEVER","WRONG","NOT","DOES NOT"].includes(part)?<span key={i} style={{color:P.red,fontWeight:800,textDecoration:"underline"}}>{part}</span>:<span key={i}>{part}</span>
            )}
          </p>
          <MCQ options={q.o} answer={q.a} answered={a} onAnswer={v=>{setAns(x=>({...x,[`q${qI}`]:v}));if(v===q.a)gx(10);else logErr(q.a,"quiz",v,q.a,lesson.id);}}
            onNext={()=>{if(qI<lesson.quiz.length-1){setQI(qI+1);setAns(x=>{const n={...x};delete n[`q${qI}`];return n;});}
              else{mk(lesson.id,"quiz");setQI(0);nextSec(0,0,"Write sentences + Weave — the final push!");}}}
            nextLabel={qI<lesson.quiz.length-1?"Next":"Done"}/>
        </div>
      </div>);})()}

      {/* SEC 7: COMBINE + FRANGLAIS */}
      {!trans&&sec===7&&(()=>{
        // Phase 1: Combine
        if(cfgPhase==="combine"){const cb=lesson.combine[cI2];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:10}}>Combine · {cI2+1}/{lesson.combine.length}</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <div style={{padding:"10px 12px",borderRadius:10,background:P.pl,borderLeft:`3px solid ${P.purple}`,marginBottom:14}}><p style={{margin:0,fontSize:13,color:"#6B21A8",lineHeight:1.5}}>{cb.hint}</p></div>
          <input type="text" value={cIn} onChange={e=>setCIn(e.target.value)} placeholder="Write the French sentence..." disabled={cR==="ok"}
            style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${cR==="ok"?P.green:cR==="no"?P.red:P.border}`,background:cR==="ok"?P.gl:cR==="no"?P.rl:P.paper,fontFamily:"'Newsreader',serif",fontSize:15,fontStyle:"italic",color:P.ink,outline:"none",boxSizing:"border-box"}}/>
          {cR==="no"&&cA<3&&<div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:P.al}}><p style={{margin:0,fontSize:12,color:"#92400E"}}>{cA===1?"Not quite — try again.":`Hint: "${cb.answer.split(" ").slice(0,3).join(" ")}..."`}</p></div>}
          {cR==="ok"&&<p style={{textAlign:"center",fontSize:13,color:P.green,fontWeight:600,margin:"8px 0 0"}}>Perfect!</p>}
          {cR==="fail"&&<p style={{textAlign:"center",fontSize:13,color:P.red,margin:"8px 0 0"}}>Answer: <strong style={{fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{cb.answer}</strong></p>}
          {cR!=="ok"&&cR!=="fail"&&<Btn onClick={()=>{
            if(cb.accept.some(a=>norm(cIn)===norm(a))){setCR("ok");gx(20);}
            else{const n=cA+1;setCA(n);if(n>=3){setCR("fail");gx(5);logErr(cb.answer,"combine",cIn,cb.answer,lesson.id);}else setCR("no");}
          }}>Check · {3-cA} tries</Btn>}
          {(cR==="ok"||cR==="fail")&&<Btn onClick={()=>{if(cI2<lesson.combine.length-1){setCI2(cI2+1);setCIn("");setCR(null);setCA(0);}
            else{setCI2(0);setCIn("");setCR(null);setCA(0);
                if(lesson.weave&&lesson.weave.length>0){setCfgPhase("weave");}
                else{mk(lesson.id,"combine_fg");nextSec(0,0,"Now express yourself freely in French — no hints, just you!");}
              }}}>{cI2<lesson.combine.length-1?"Next":"Done"}</Btn>}
        </div>
      </div>);}

        // Phase 2: Weave
        if(cfgPhase==="weave"&&lesson.weave){
        const fg=lesson.weave[fgI];if(!fg)return null;
        const checked=fgBlanks.checked;
        // Check: which known words did the user write in French?
        const checkWeave=()=>{
          const input=fgBlanks.text||"";
          const inputNorm=norm(input);
          const found=[];const missed=[];
          fg.known.forEach(w=>{
            if(inputNorm.includes(norm(w)))found.push(w);else missed.push(w);
          });
          setFgBlanks({text:input,checked:true,found,missed});
          gx(found.length*5);
        };
        return(<div>
          <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Weave · {fgI+1}/{lesson.weave.length}</p>
          <p style={{fontSize:12,color:P.purple,marginBottom:10,lineHeight:1.4}}>Translate this sentence. Write every word you know in French — leave the rest in English.</p>
          <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
            {/* English sentence */}
            <div style={{padding:"14px 16px",borderRadius:10,background:"#EFF6FF",border:"1px solid #BFDBFE",marginBottom:14,textAlign:"center"}}>
              <p style={{margin:0,fontSize:16,color:P.ink,fontWeight:600,lineHeight:1.5}}>{fg.en}</p>
            </div>
            {/* Input */}
            <textarea value={fgBlanks.text||""} onChange={e=>setFgBlanks({text:e.target.value})} placeholder="Write your Weave version..." disabled={checked}
              rows={3} style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${checked?(fgBlanks.missed?.length===0?P.green:P.amber):P.border}`,background:checked?(fgBlanks.missed?.length===0?P.gl:P.al):P.paper,fontFamily:"'Newsreader',serif",fontSize:15,fontStyle:"italic",color:P.ink,outline:"none",boxSizing:"border-box",resize:"none",lineHeight:1.6}}/>
            {/* Results */}
            {checked&&(<div style={{marginTop:12}}>
              {/* Sample answer */}
              <div style={{padding:"10px 12px",borderRadius:8,background:P.pl,marginBottom:10}}>
                <p style={{margin:"0 0 4px",fontSize:10,fontWeight:700,color:P.purple,letterSpacing:0.5,textTransform:"uppercase"}}>Sample answer</p>
                <p style={{margin:0,fontSize:14,fontFamily:"'Newsreader',serif",fontStyle:"italic",color:P.ink,lineHeight:1.5}}>{fg.sample}</p>
              </div>
              {/* Score */}
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                {fgBlanks.found?.length>0&&<div style={{flex:1,padding:"8px 10px",borderRadius:8,background:P.gl}}>
                  <p style={{margin:"0 0 3px",fontSize:10,fontWeight:700,color:P.green}}>You got these in French:</p>
                  <p style={{margin:0,fontSize:12,color:P.green,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{fgBlanks.found.join(", ")}</p>
                </div>}
                {fgBlanks.missed?.length>0&&<div style={{flex:1,padding:"8px 10px",borderRadius:8,background:P.rl}}>
                  <p style={{margin:"0 0 3px",fontSize:10,fontWeight:700,color:P.red}}>Next time, try:</p>
                  <p style={{margin:0,fontSize:12,color:P.red,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{fgBlanks.missed.join(", ")}</p>
                </div>}
              </div>
              <p style={{margin:0,fontSize:13,color:fgBlanks.missed?.length===0?P.green:P.amber,fontWeight:600,textAlign:"center"}}>
                {fgBlanks.found?.length}/{fg.known.length} French words used
              </p>
            </div>)}
            {!checked&&<Btn onClick={checkWeave}>Check My Weave</Btn>}
            {checked&&<Btn onClick={()=>{
              if(fgI<lesson.weave.length-1){setFgI(fgI+1);setFgBlanks({});}
              else{mk(lesson.id,"combine_fg");setFgI(0);setFgBlanks({});setCI2(0);nextSec(0,0,"Now express yourself freely in French — no hints, just you!");}
            }} color={fgBlanks.missed?.length===0?P.green:P.red}>{fgI<lesson.weave.length-1?"Next Sentence":"Done"}</Btn>}
          </div>
        </div>);}
        return null;
      })()}

      {/* SEC 8: SAY IT YOUR WAY */}
      {!trans&&sec===8&&lesson.sayIt&&(()=>{
        const sit=lesson.sayIt[cI2<lesson.sayIt.length?cI2:0];
        return(<div>
          <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Say It Your Way · {cI2+1}/{lesson.sayIt.length}</p>
          <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>No hints — express yourself freely in French!</p>
          <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
            <div style={{padding:"12px 14px",borderRadius:10,background:P.al,borderLeft:`3px solid ${P.amber}`,marginBottom:16}}>
              <p style={{margin:0,fontSize:13,color:"#92400E",lineHeight:1.6}}><strong>Situation:</strong> {sit.situation}</p>
            </div>
            <div style={{marginBottom:8}}>
              <p style={{margin:"0 0 4px",fontSize:11,color:P.ink3}}>Target words: <span style={{fontFamily:"'Newsreader',serif",fontStyle:"italic",color:P.purple}}>{sit.target.join(", ")}</span></p>
            </div>
            <textarea value={sayIn} onChange={e=>setSayIn(e.target.value)} placeholder="Write your response in French..." disabled={!!sayRes||sayLoading}
              style={{width:"100%",minHeight:80,padding:12,borderRadius:10,border:`1.5px solid ${sayRes?P.green:P.border}`,fontFamily:"'Newsreader',serif",fontSize:15,color:P.ink,resize:"vertical",boxSizing:"border-box",background:sayRes?"#FAFFF8":P.paper}}/>

            {sayRes&&(<div style={{marginTop:12}}>
              <div style={{padding:"12px 14px",borderRadius:10,background:P.gl,border:`1px solid ${P.green}`,marginBottom:8}}>
                <p style={{margin:"0 0 6px",fontSize:12,fontWeight:700,color:P.green}}>Words Used</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {sit.target.map(w=>{const used=norm(sayIn).includes(norm(w));return <span key={w} style={{padding:"2px 8px",borderRadius:6,fontSize:12,fontFamily:"'Newsreader',serif",fontStyle:"italic",background:used?P.green:P.rl,color:used?"#fff":P.red}}>{w}{used?" ✓":" ✗"}</span>;})}
                </div>
              </div>
              <div style={{padding:"12px 14px",borderRadius:10,background:"#F0F9FF",border:"1px solid #BAE6FD"}}>
                <p style={{margin:"0 0 4px",fontSize:12,fontWeight:700,color:"#0369A1"}}>Feedback</p>
                <p style={{margin:0,fontSize:13,color:P.ink2,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{sayRes}</p>
              </div>
            </div>)}

            {!sayRes&&!sayLoading&&sayIn.trim().length>2&&(
              <Btn onClick={async()=>{
                setSayLoading(true);
                const usedWords=sit.target.filter(w=>norm(sayIn).includes(norm(w)));
                try{
                  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:200,system:`You evaluate A1 French learners' writing. Be encouraging but honest. Check: 1) Did they use the target words? 2) Basic grammar correct? 3) Does it fit the situation? Reply in 2-3 short sentences. Mix English and simple French. If there's an error, show the correction gently. No emojis.`,messages:[{role:"user",content:`Situation: ${sit.situation}\nTarget words: ${sit.target.join(", ")}\nStudent wrote: "${sayIn}"\nWords used: ${usedWords.join(", ")||"none"}\nEvaluate briefly.`}]})});
                  const d=await r.json();
                  setSayRes(d.content?.[0]?.text||"Well done for trying! Keep writing in French.");
                  gx(usedWords.length>=sit.target.length/2?20:10);
                }catch{setSayRes("Well done for writing in French! Try to use the target words naturally in your sentences.");}
                setSayLoading(false);
              }}>Evaluate <Sparkles size={14}/></Btn>
            )}
            {sayLoading&&<p style={{textAlign:"center",color:P.ink3,fontSize:12,marginTop:12}}>Evaluating...</p>}
            {sayRes&&(
              <Btn onClick={()=>{
                if(cI2<lesson.sayIt.length-1){setCI2(cI2+1);setSayIn("");setSayRes(null);}
                else{mk(lesson.id,"say_it");setCI2(0);setSayIn("");setSayRes(null);nextSec(0,0,"Great writing! Now let's have a quick conversation...");}
              }} color={P.green}>{cI2<lesson.sayIt.length-1?"Next Situation":"Done"}</Btn>
            )}
          </div>
        </div>);
      })()}

      {/* SEC 9: MINI CONVERSATION */}
      {!trans&&sec===9&&lesson.miniConv&&(()=>{
        const mc=lesson.miniConv;
        const msgs=miniMsgs.length===0?[{role:"assistant",content:mc.starter}]:miniMsgs;
        const turnCount=msgs.filter(m=>m.role==="user").length;
        const canFinish=turnCount>=3;
        return(<div>
          <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Mini Conversation</p>
          <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>Chat in French — {canFinish?"you can finish anytime!":(`${3-turnCount} more turns to go`)}</p>
          <div style={{background:P.paper,borderRadius:14,padding:16,boxShadow:P.sh,border:`1px solid ${P.border}`,maxHeight:360,overflowY:"auto"}} ref={el=>{if(el)el.scrollTop=el.scrollHeight;}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:8}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?P.red:"#F0F9FF",color:m.role==="user"?"#fff":P.ink}}>
                  <p style={{margin:0,fontSize:14,fontFamily:"'Newsreader',serif",lineHeight:1.5}}>{m.content}</p>
                  {m.role==="assistant"&&<button onClick={()=>say(m.content)} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 0 0",display:"flex",alignItems:"center",gap:3}}><Volume2 size={12} color="#0369A1" strokeWidth={1.5}/><span style={{fontSize:10,color:"#0369A1"}}>Listen</span></button>}
                </div>
              </div>
            ))}
            {miniLoading&&<div style={{display:"flex",justifyContent:"flex-start",marginBottom:8}}><div style={{padding:"10px 14px",borderRadius:"14px 14px 14px 4px",background:"#F0F9FF"}}><p style={{margin:0,fontSize:13,color:P.ink3}}>...</p></div></div>}
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <input value={miniIn} onChange={e=>setMiniIn(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey&&miniIn.trim()&&!miniLoading){e.preventDefault();
              const doSend=async()=>{
                const u={role:"user",content:miniIn.trim()};
                const cur=msgs.length===0?[{role:"assistant",content:mc.starter}]:msgs;
                const nm=[...cur,u];setMiniMsgs(nm);setMiniIn("");setMiniLoading(true);
                try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:150,system:`You are a French conversation partner for an A1 learner. Topic: ${mc.topic}. Rules: Respond in simple French (1-2 sentences). If they make errors, DON'T correct directly — rephrase naturally so they hear the correct form. Ask a follow-up question to keep the conversation going. Stay on topic. No emojis. No English unless they're completely stuck.`,messages:nm.filter(m=>m.role!=="system")})});
                const d=await r.json();setMiniMsgs(m=>[...m,{role:"assistant",content:d.content?.[0]?.text||"Continuons..."}]);
                }catch{setMiniMsgs(m=>[...m,{role:"assistant",content:"Ah, un petit problème technique. Continuons !"}]);}
                setMiniLoading(false);
              };doSend();
            }}}
              placeholder="Write in French..." disabled={miniLoading}
              style={{flex:1,padding:"10px 14px",borderRadius:10,border:`1.5px solid ${P.border}`,fontFamily:"'Newsreader',serif",fontSize:14,color:P.ink}}/>
            <button onClick={()=>{
              if(!miniIn.trim()||miniLoading)return;
              const u={role:"user",content:miniIn.trim()};
              const cur=msgs.length===0?[{role:"assistant",content:mc.starter}]:msgs;
              const nm=[...cur,u];setMiniMsgs(nm);setMiniIn("");setMiniLoading(true);
              (async()=>{
                try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:150,system:`You are a French conversation partner for an A1 learner. Topic: ${mc.topic}. Rules: Respond in simple French (1-2 sentences). If they make errors, DON'T correct directly — rephrase naturally so they hear the correct form. Ask a follow-up question to keep the conversation going. Stay on topic. No emojis. No English unless they're completely stuck.`,messages:nm.filter(m=>m.role!=="system")})});
                const d=await r.json();setMiniMsgs(m=>[...m,{role:"assistant",content:d.content?.[0]?.text||"Continuons..."}]);
                }catch{setMiniMsgs(m=>[...m,{role:"assistant",content:"Ah, un petit problème technique. Continuons !"}]);}
                setMiniLoading(false);
              })();
            }} disabled={!miniIn.trim()||miniLoading} style={{width:44,height:44,borderRadius:10,border:"none",cursor:miniIn.trim()&&!miniLoading?"pointer":"default",background:miniIn.trim()&&!miniLoading?P.red:P.border,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Send size={16} color="#fff" strokeWidth={1.5}/>
            </button>
          </div>
          {canFinish&&(
            <Btn onClick={()=>{
              mk(lesson.id,"mini_conv");gx(25);
              setMiniMsgs([]);setMiniIn("");
              nextSec(0,0,"Conversation complete! Let's review what you've learned.");
            }} color={P.green}>Finish Conversation <Check size={14}/></Btn>
          )}
        </div>);
      })()}

      {/* SEC 10: REVIEW */}
      {!trans&&sec===10&&lesson.review&&(()=>{
        const rv=lesson.review[rvI];if(!rv)return null;
        return(<div>
          <p style={{fontSize:11,color:P.ink3,marginBottom:4}}>Review · {rvI+1}/{lesson.review.length}</p>
          <p style={{fontSize:12,color:P.ink2,marginBottom:10}}>Mixed questions — expect anything!</p>
          <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>

            {/* Listen type */}
            {rv.type==="listen"&&(<div>
              <div style={{textAlign:"center",marginBottom:14}}>
                <button onClick={()=>say(rv.audio)} style={{width:56,height:56,borderRadius:"50%",border:"none",cursor:"pointer",background:"linear-gradient(135deg,#0369A1,#0284C7)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:"0 3px 12px rgba(3,105,161,0.25)"}}><Headphones size={24} color="#fff" strokeWidth={1.5}/></button>
                <p style={{margin:"8px 0 0",fontSize:11,color:P.ink3}}>Tap to listen</p>
              </div>
              <p style={{margin:"0 0 12px",fontSize:14,color:P.ink,fontWeight:600,textAlign:"center"}}>{rv.q}</p>
              <MCQ options={rv.o} answer={rv.a} answered={rvAns} onAnswer={v=>{setRvAns(v);if(v===rv.a)gx(10);else logErr(rv.a,"review",v,rv.a,lesson.id);}}
                onNext={()=>{if(rvI<lesson.review.length-1){setRvI(rvI+1);setRvAns(null);}else mk(lesson.id,"review");}}
                nextLabel={rvI<lesson.review.length-1?"Next":"Complete!"}/>
            </div>)}

            {/* Odd one out */}
            {rv.type==="odd"&&(<div>
              <p style={{margin:"0 0 12px",fontSize:14,color:P.ink,fontWeight:600,textAlign:"center"}}>{rv.q}</p>
              <MCQ options={rv.items} answer={rv.a} answered={rvAns} onAnswer={v=>{setRvAns(v);if(v===rv.a)gx(10);else logErr(rv.a,"review",v,rv.a,lesson.id);}}
                onNext={()=>{if(rvI<lesson.review.length-1){setRvI(rvI+1);setRvAns(null);}else mk(lesson.id,"review");}}
                nextLabel={rvI<lesson.review.length-1?"Next":"Complete!"}/>
              {rvAns&&<p style={{margin:"8px 0 0",fontSize:12,color:P.ink3,fontStyle:"italic"}}>{rv.reason}</p>}
            </div>)}

            {/* Context match */}
            {rv.type==="context"&&(<div>
              <p style={{margin:"0 0 6px",fontSize:12,color:P.amber,fontStyle:"italic"}}>{rv.situation}</p>
              <p style={{margin:"0 0 12px",fontSize:14,color:P.ink,fontWeight:600}}>What would you say?</p>
              <MCQ options={rv.o} answer={rv.a} answered={rvAns} onAnswer={v=>{setRvAns(v);if(v===rv.a)gx(10);else logErr(rv.a,"review",v,rv.a,lesson.id);}}
                onNext={()=>{if(rvI<lesson.review.length-1){setRvI(rvI+1);setRvAns(null);}else mk(lesson.id,"review");}}
                nextLabel={rvI<lesson.review.length-1?"Next":"Complete!"}/>
            </div>)}

            {/* Fill with context (cross-lesson) */}
            {rv.type==="fill_ctx"&&(<div>
              {rv.ctx&&<p style={{margin:"0 0 8px",fontSize:12,color:P.amber,fontStyle:"italic"}}>{rv.ctx}</p>}
              <p style={{margin:"0 0 12px",fontSize:17,color:P.ink,textAlign:"center",fontFamily:"'Newsreader',serif",fontWeight:500}}>{rv.s}</p>
              <MCQ options={rv.o} answer={rv.a} answered={rvAns} onAnswer={v=>{setRvAns(v);if(v===rv.a)gx(10);else logErr(rv.a,"review",v,rv.a,lesson.id);}}
                onNext={()=>{if(rvI<lesson.review.length-1){setRvI(rvI+1);setRvAns(null);}else mk(lesson.id,"review");}}
                nextLabel={rvI<lesson.review.length-1?"Next":"Complete!"}/>
            </div>)}

            {/* Weave in review */}
            {rv.type==="weave"&&(()=>{
              const allDone=rv.blanks.every((_,i)=>fgBlanks[`rv${i}`]);
              return(<div>
                <p style={{margin:"0 0 10px",fontSize:14,color:P.ink,textAlign:"center"}}>{rv.en}</p>
                {rv.blanks.map((b,i)=>{const done=fgBlanks[`rv${i}`];return(
                  <div key={i} style={{marginBottom:6,padding:"8px 10px",borderRadius:8,background:done?P.gl:"#F5F5F4"}}>
                    <span style={{fontSize:12,color:P.ink3}}>{b.word} →</span>
                    {!done?<><input type="text" value={fgBlanks[`rvt${i}`]||""} onChange={e=>setFgBlanks(x=>({...x,[`rvt${i}`]:e.target.value}))}
                      placeholder="French..." style={{marginLeft:6,padding:"4px 8px",borderRadius:6,border:`1px solid ${P.border}`,fontSize:12,fontFamily:"'Newsreader',serif",fontStyle:"italic",outline:"none",width:100}}/>
                    <button onClick={()=>{if(norm(fgBlanks[`rvt${i}`]||"")===norm(b.answer)){setFgBlanks(x=>({...x,[`rv${i}`]:true}));gx(10);}else setFgBlanks(x=>({...x,[`rvt${i}`]:b.answer,[`rv${i}`]:true}));}} style={{marginLeft:4,padding:"3px 8px",borderRadius:5,background:P.red,color:"#fff",border:"none",cursor:"pointer",fontSize:10}}>Go</button></>
                    :<span style={{marginLeft:6,fontSize:13,fontWeight:600,color:P.green,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{b.answer}</span>}
                  </div>);})}
                {allDone&&<Btn onClick={()=>{if(rvI<lesson.review.length-1){setRvI(rvI+1);setRvAns(null);setFgBlanks({});}else mk(lesson.id,"review");}} color={P.green}>{rvI<lesson.review.length-1?"Next":"Complete!"}</Btn>}
              </div>);
            })()}

          </div>
        </div>);
      })()}

      {/* LESSON COMPLETE */}
      {lp(lesson.id)===SECS.length&&(()=>{
        const newMilestone=MILESTONES.find(m=>m.ids.includes(lesson.id)&&m.ids.every(id=>lp(id)===SECS.length));
        return(<div style={{background:P.gl,borderRadius:14,padding:24,marginTop:18,textAlign:"center",border:`1px solid ${P.green}30`}}>
          <Mountain size={30} color={P.green} strokeWidth={1.2}/><p style={{margin:"8px 0 0",fontSize:16,color:P.green,fontWeight:700,fontFamily:"'Newsreader',serif"}}>Lesson {lesson.id} complete</p><p style={{margin:"4px 0 0",fontSize:12,color:P.ink3}}>One step higher on the mountain.</p>
          {newMilestone&&<div style={{marginTop:14,padding:"12px 16px",borderRadius:12,background:"linear-gradient(135deg,#E8F5E9,#F3E5F5)",border:`1px solid ${P.green}40`}}>
            <span style={{fontSize:22}}>{newMilestone.icon}</span>
            <p style={{margin:"4px 0 2px",fontSize:14,fontWeight:700,color:P.green}}>Milestone: {newMilestone.title}</p>
            <p style={{margin:0,fontSize:12,color:P.ink2,lineHeight:1.4}}>{newMilestone.desc}</p>
          </div>}
          <Btn onClick={()=>{setTab("home");setLid(null);}} color={P.green}>Back to Map</Btn>
        </div>);
      })()}
    </div>)}

    {/* ═══ CHAT ═══ */}
    {tab==="chat"&&(<div style={{padding:"0 24px",display:"flex",flexDirection:"column",height:"calc(100vh - 160px)"}}>
      {chatMsgs.length===0&&(<div>
        <div style={{textAlign:"center",marginBottom:20}}><MessageSquare size={28} color={P.red} strokeWidth={1.2} style={{marginBottom:6}}/><h2 style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:700,fontStyle:"italic",margin:"0 0 4px"}}>Parle avec moi</h2><p style={{margin:0,fontSize:12,color:P.ink3}}>I won't correct you — I'll say "I didn't understand."</p></div>
        {[{m:"free",ic:MessageCircle,l:"Free Chat",d:"Talk about anything",s:"Salut ! On parle de quoi aujourd'hui ?"},{m:"lesson",ic:BookOpen,l:"Lesson Focus",d:"Practice learned grammar",s:"Bonjour ! Comment tu t'appelles ?"},{m:"correct",ic:Pen,l:"Error Correction",d:"Write French, find mistakes",s:"Écris en français. Dis-moi quelque chose sur ta journée."}].map(x=>{const I=x.ic;return(
          <div key={x.m} onClick={()=>{setChatMode(x.m);setChatMsgs([{role:"assistant",content:x.s}]);}} style={{background:P.paper,borderRadius:12,padding:"14px 16px",marginBottom:8,cursor:"pointer",border:`1px solid ${P.border}`,boxShadow:P.sh,display:"flex",gap:12,alignItems:"center"}}>
            <I size={20} color={P.red} strokeWidth={1.3}/><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{x.l}</div><div style={{fontSize:11,color:P.ink3}}>{x.d}</div></div><ArrowRight size={14} color={P.ink3}/>
          </div>);})}
        <div style={{fontSize:11,fontWeight:700,color:P.ink3,margin:"12px 0 8px",letterSpacing:1,textTransform:"uppercase"}}>Scenarios</div>
        {SCENARIOS.map(sc=>{const I=sc.icon;return(
          <div key={sc.id} onClick={()=>{setChatScenario(sc.id);setChatMode("scenario");setChatMsgs([{role:"assistant",content:sc.starter}]);}} style={{background:P.paper,borderRadius:10,padding:"12px 14px",marginBottom:6,cursor:"pointer",border:`1px solid ${P.border}`,display:"flex",gap:10,alignItems:"center"}}>
            <I size={18} color={P.red} strokeWidth={1.3}/><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>{sc.label}</div><div style={{fontSize:10,color:P.ink3}}>{sc.desc}</div></div><ArrowRight size={12} color={P.ink3}/>
          </div>);})}
      </div>)}
      {chatMsgs.length>0&&(<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,padding:"8px 12px",background:P.paper,borderRadius:10,border:`1px solid ${P.border}`}}>
          <button onClick={resetChat} style={{background:"#F0EEEC",border:"none",borderRadius:6,padding:"5px 8px",cursor:"pointer",fontSize:10,color:P.ink2,fontWeight:600,display:"flex",alignItems:"center",gap:3}}><ChevronLeft size={12}/> Back</button>
          <span style={{fontSize:10,color:P.ink3}}>{chatMsgCount}/{MSG_LIMIT}</span>
        </div>
        <div ref={chatRef} style={{flex:1,overflowY:"auto",marginBottom:8,display:"flex",flexDirection:"column",gap:10,borderLeft:`2px solid ${P.red}12`,paddingLeft:12}}>
          {chatMsgs.map((m,i)=>{const isU=m.role==="user";return(
            <div key={i} style={{display:"flex",gap:8,flexDirection:isU?"row-reverse":"row"}}>
              {!isU&&<div style={{width:28,height:28,borderRadius:7,background:P.rl,border:`1px solid ${P.rb}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}><Mountain size={12} color={P.red}/></div>}
              <div style={{maxWidth:"78%"}}>
                <div style={{padding:"10px 14px",borderRadius:isU?"12px 12px 3px 12px":"12px 12px 12px 3px",background:isU?"linear-gradient(135deg,#C0392B,#A93226)":P.paper,color:isU?"#fff":P.ink,border:isU?"none":`1px solid ${P.border}`,fontSize:13,lineHeight:1.6,fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{m.content}</div>
                {!isU&&<div style={{display:"flex",gap:2,marginTop:3}}>
                  <button onClick={()=>say(m.content)} style={{background:"#F0EEEC",border:"none",borderRadius:5,padding:"3px 6px",cursor:"pointer",fontSize:9,color:P.ink3,display:"flex",alignItems:"center",gap:2}}><Volume2 size={10}/> Listen</button>
                </div>}
              </div>
            </div>);})}
          {chatLoading&&<div style={{display:"flex",gap:8}}><div style={{width:28,height:28,borderRadius:7,background:P.rl,border:`1px solid ${P.rb}`,display:"flex",alignItems:"center",justifyContent:"center"}}><Mountain size={12} color={P.red}/></div><div style={{padding:"10px 14px",borderRadius:"12px 12px 12px 3px",background:P.paper,border:`1px solid ${P.border}`}}><div style={{display:"flex",gap:3}}>{[0,1,2].map(d=><div key={d} style={{width:5,height:5,borderRadius:"50%",background:P.ink3,opacity:0.4,animation:`bounce 1.2s ease-in-out ${d*0.15}s infinite`}}/>)}</div></div></div>}
        </div>
        <div style={{background:P.paper,borderRadius:14,border:`1.5px solid ${chatIn.trim()?P.red+"50":P.border}`,padding:"5px 5px 5px 14px",display:"flex",alignItems:"center",gap:5}}>
          <input type="text" value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendChat();}}
            placeholder="Écris en français..." disabled={chatMsgCount>=MSG_LIMIT}
            style={{flex:1,padding:"9px 0",border:"none",background:"transparent",fontFamily:"'Newsreader',serif",fontSize:14,fontStyle:"italic",color:P.ink,outline:"none"}}/>
          <button onClick={sendChat} disabled={chatLoading||!chatIn.trim()} style={{width:38,height:38,borderRadius:10,border:"none",cursor:"pointer",background:chatIn.trim()?"linear-gradient(135deg,#C0392B,#A93226)":"#F0EEEC",display:"flex",alignItems:"center",justifyContent:"center"}}><Send size={15} color={chatIn.trim()?"#fff":P.ink3}/></button>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      </>)}
    </div>)}

    {/* ═══ PRACTICE ═══ */}
    {tab==="pratik"&&(<div style={{padding:"0 24px"}}>
      {pratikMode==="menu"&&(<div>
        <h2 style={{fontFamily:"'Newsreader',serif",fontSize:20,fontWeight:600,fontStyle:"italic",margin:"0 0 14px"}}>Practice</h2>
        {[{id:"cards",ic:Layers,l:"Flashcards",d:"Review vocabulary",c:P.red,bg:P.rl,bc:P.rb},
          {id:"translate",ic:Type,l:"Free Translation",d:"English → French, write from scratch",c:P.purple,bg:P.pl,bc:"#DDD6FE"},
        ].map(m=>{const I=m.ic;return(
          <div key={m.id} onClick={()=>setPratikMode(m.id)} style={{background:P.paper,borderRadius:12,padding:"16px 18px",marginBottom:8,cursor:"pointer",border:`1px solid ${P.border}`,boxShadow:P.sh,display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:40,height:40,borderRadius:10,background:m.bg,border:`1px solid ${m.bc}`,display:"flex",alignItems:"center",justifyContent:"center"}}><I size={20} color={m.c} strokeWidth={1.3}/></div>
            <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{m.l}</div><div style={{fontSize:12,color:P.ink3}}>{m.d}</div></div><ArrowRight size={14} color={P.ink3}/>
          </div>);})}
      </div>)}
      {pratikMode!=="menu"&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <button onClick={()=>{setPratikMode("menu");setTrR(null);setTrHint(false);}} style={{background:`${P.border}80`,border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={16} color={P.ink2}/></button>
        <span style={{fontSize:15,fontWeight:700}}>{pratikMode==="cards"?"Flashcards":"Free Translation"}</span>
      </div>}
      {pratikMode==="cards"&&(<div>
        <p style={{fontSize:12,color:P.ink3,marginBottom:12,textAlign:"center"}}>{ci+1}/{FLASH.length}</p>
        <div onClick={()=>setFlip(!flip)} style={{cursor:"pointer",perspective:1000,marginBottom:14,userSelect:"none"}}>
          <div style={{position:"relative",width:"100%",minHeight:200,transformStyle:"preserve-3d",transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)",transform:flip?"rotateY(180deg)":"rotateY(0)"}}>
            <div style={{position:"absolute",width:"100%",minHeight:200,backfaceVisibility:"hidden",boxSizing:"border-box",background:P.paper,border:`1.5px solid ${P.border}`,borderRadius:16,padding:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:10,color:P.red,textTransform:"uppercase",letterSpacing:2,marginBottom:8,fontWeight:600}}>{FLASH[ci].cat}</div>
              <div style={{fontSize:28,fontWeight:700,fontFamily:"'Newsreader',serif",fontStyle:"italic",marginBottom:6}}>{cdir===0?FLASH[ci].fr:FLASH[ci].en}</div>
              {cdir===0&&FLASH[ci].cog&&<div style={{fontSize:11,color:P.purple,background:P.pl,padding:"2px 8px",borderRadius:5}}>{FLASH[ci].cog}</div>}
              <div style={{fontSize:11,color:P.ink3,marginTop:8}}>tap to flip</div>
              <button onClick={e=>{e.stopPropagation();say(FLASH[ci].fr);}} style={{position:"absolute",top:12,right:12,background:P.rl,border:"none",borderRadius:8,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Volume2 size={14} color={P.red}/></button>
            </div>
            <div style={{position:"absolute",width:"100%",minHeight:200,backfaceVisibility:"hidden",boxSizing:"border-box",transform:"rotateY(180deg)",background:P.gl,border:`1.5px solid ${P.green}30`,borderRadius:16,padding:24,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <div style={{fontSize:24,fontWeight:700,fontFamily:"'Newsreader',serif"}}>{cdir===0?FLASH[ci].en:FLASH[ci].fr}</div>
              <div style={{fontSize:12,color:P.ink2,fontStyle:"italic",marginTop:6}}>« {FLASH[ci].ex} »</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{setFlip(false);setCdir(Math.random()>0.5?1:0);setCi(i=>(i-1+FLASH.length)%FLASH.length);}} style={{width:40,height:40,borderRadius:10,border:`1px solid ${P.border}`,background:P.paper,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={16} color={P.ink3}/></button>
          <button onClick={()=>{setFlip(false);setCdir(Math.random()>0.5?1:0);setCi(i=>(i+1)%FLASH.length);gx(2);}} style={{flex:1,padding:12,borderRadius:10,border:"none",cursor:"pointer",background:P.red,color:"#fff",fontSize:14,fontWeight:600}}>Next</button>
          <button onClick={()=>say(FLASH[ci].fr)} style={{width:40,height:40,borderRadius:10,border:`1px solid ${P.border}`,background:P.paper,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Volume2 size={16} color={P.red}/></button>
        </div>
      </div>)}
      {pratikMode==="translate"&&(()=>{const TRANSLATE=[
        {en:"Hello, I would like a coffee please.",fr:"Bonjour, je voudrais un café, s'il vous plaît.",hint:"je voudrais = I would like"},
        {en:"I'm American. Are you French?",fr:"Je suis américain. Tu es français ?",hint:"être: je suis, tu es"},
        {en:"There's a good restaurant here.",fr:"Il y a un bon restaurant ici.",hint:"il y a = there is/are"},
        {en:"We need to leave now.",fr:"Il faut partir maintenant.",hint:"il faut = one must"},
      ];const t=TRANSLATE[trI%TRANSLATE.length];return(<div>
        <p style={{fontSize:11,color:P.ink3,marginBottom:8}}>{trI+1}/{TRANSLATE.length}</p>
        <div style={{background:P.paper,borderRadius:14,padding:20,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <div style={{padding:"12px",borderRadius:10,background:"#F5F5F4",marginBottom:14,textAlign:"center"}}><p style={{margin:0,fontSize:15,fontWeight:600}}>{t.en}</p></div>
          <input type="text" value={trIn} onChange={e=>setTrIn(e.target.value)} placeholder="Write French..." disabled={trR==="ok"}
            style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${trR==="ok"?P.green:trR==="no"?P.red:P.border}`,background:trR==="ok"?P.gl:trR==="no"?P.rl:P.paper,fontFamily:"'Newsreader',serif",fontSize:15,fontStyle:"italic",color:P.ink,outline:"none",boxSizing:"border-box"}}/>
          {trHint&&!trR&&<p style={{margin:"6px 0 0",fontSize:12,color:P.amber}}><Lightbulb size={11} style={{verticalAlign:"middle"}}/> {t.hint}</p>}
          {trR==="ok"&&<p style={{margin:"6px 0 0",fontSize:13,color:P.green,fontWeight:600}}>Correct!</p>}
          {trR==="no"&&<p style={{margin:"6px 0 0",fontSize:13,color:P.red}}>Answer: <strong style={{fontFamily:"'Newsreader',serif",fontStyle:"italic"}}>{t.fr}</strong></p>}
          <div style={{display:"flex",gap:6,marginTop:12}}>
            {!trR&&<button onClick={()=>setTrHint(true)} style={{flex:1,padding:11,borderRadius:10,border:`1px solid ${P.border}`,background:P.paper,cursor:"pointer",fontSize:12,color:P.amber,fontWeight:600}}>Hint</button>}
            {!trR&&<button onClick={()=>{if(norm(trIn)===norm(t.fr)){setTrR("ok");gx(20);}else setTrR("no");}} style={{flex:2,padding:11,borderRadius:10,border:"none",cursor:"pointer",background:P.red,color:"#fff",fontSize:13,fontWeight:600}}>Check</button>}
            {trR&&<Btn onClick={()=>{if(trI<TRANSLATE.length-1){setTrI(trI+1);setTrIn("");setTrR(null);setTrHint(false);}else{setTrI(0);setTrIn("");setTrR(null);setTrHint(false);}}}>{trI<TRANSLATE.length-1?"Next":"Start Over"}</Btn>}
          </div>
        </div>
      </div>);})()}
    </div>)}

    {/* ═══ STATS ═══ */}
    {tab==="stats"&&(()=>{
      const errWords=new Set(errors.map(e=>e.c));
      const hasProg=Object.keys(prog).length>0;
      const mastered=hasProg?FLASH.filter(f=>!errWords.has(f.fr)):[];
      const learning=FLASH.filter(f=>{const c=errors.filter(e=>e.c===f.fr).length;return c>0&&c<3;});
      return(<div style={{padding:"0 24px"}}>
      {/* XP + Streak */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <div style={{flex:2,background:P.paper,borderRadius:14,padding:"18px 20px",textAlign:"center",boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <Zap size={16} color={P.red}/><p style={{margin:"2px 0 0",fontFamily:"'Newsreader',serif",fontSize:32,fontWeight:300,fontStyle:"italic"}}>{xp}</p><p style={{margin:0,fontSize:9,color:P.ink3,letterSpacing:1,textTransform:"uppercase"}}>experience</p>
        </div>
        <div style={{flex:1,background:P.paper,borderRadius:14,padding:"18px 14px",textAlign:"center",boxShadow:P.sh,border:`1px solid ${streak>0?P.amber+"35":P.border}`}}>
          <Sparkles size={16} color={P.amber}/><p style={{margin:"2px 0 0",fontFamily:"'Newsreader',serif",fontSize:32,fontWeight:300,fontStyle:"italic",color:streak>0?P.amber:P.ink3}}>{streak}</p><p style={{margin:0,fontSize:9,color:P.ink3,letterSpacing:1,textTransform:"uppercase"}}>streak</p>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {[{n:mastered.length,l:"mastered",c:P.green},{n:learning.length,l:"learning",c:P.amber},{n:weakSpots.length,l:"weak",c:P.red},{n:Object.keys(prog).length,l:"sections",c:P.ink2}].map((s,i)=>(
          <div key={i} style={{flex:1,background:P.paper,borderRadius:10,padding:"10px 8px",textAlign:"center",boxShadow:P.sh,border:`1px solid ${P.border}`}}>
            <p style={{margin:0,fontSize:20,fontWeight:700,color:s.c}}>{s.n}</p>
            <p style={{margin:"1px 0 0",fontSize:9,color:P.ink3}}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Daily Review status */}
      <div style={{background:P.paper,borderRadius:12,padding:"12px 14px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${todayDone?P.green+"30":P.border}`,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:8,background:todayDone?P.gl:P.rl,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {todayDone?<Check size={14} color={P.green}/>:<Target size={14} color={P.red}/>}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:600}}>{todayDone?"Today's review complete":"Daily Review"}</div>
          <div style={{background:P.border,borderRadius:3,height:3,marginTop:4}}><div style={{width:`${(drCount/5)*100}%`,height:"100%",background:todayDone?P.green:P.red,borderRadius:3}}/></div>
        </div>
        <span style={{fontSize:12,fontWeight:600,color:todayDone?P.green:P.ink3}}>{drCount}/5</span>
      </div>

      {/* Mastered words */}
      {mastered.length>0&&(<div style={{background:P.paper,borderRadius:14,padding:"14px 16px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${P.green}25`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><Check size={14} color={P.green} strokeWidth={2}/><span style={{fontSize:12,fontWeight:700,color:P.green,letterSpacing:0.5}}>MASTERED</span><span style={{fontSize:10,color:P.ink3}}>({mastered.length} words)</span></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {mastered.slice(0,20).map((w,i)=><span key={i} style={{fontSize:12,padding:"3px 8px",borderRadius:6,background:P.gl,color:P.green,fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:500}}>{w.fr}</span>)}
          {mastered.length>20&&<span style={{fontSize:11,color:P.ink3,padding:"3px 4px"}}>+{mastered.length-20} more</span>}
        </div>
      </div>)}

      {/* Learning words */}
      {learning.length>0&&(<div style={{background:P.paper,borderRadius:14,padding:"14px 16px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${P.amber}25`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><RefreshCw size={14} color={P.amber} strokeWidth={1.5}/><span style={{fontSize:12,fontWeight:700,color:P.amber,letterSpacing:0.5}}>LEARNING</span><span style={{fontSize:10,color:P.ink3}}>({learning.length} words, 1-2 mistakes)</span></div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {learning.map((w,i)=><span key={i} style={{fontSize:12,padding:"3px 8px",borderRadius:6,background:P.al,color:"#92400E",fontFamily:"'Newsreader',serif",fontStyle:"italic",fontWeight:500}}>{w.fr}</span>)}
        </div>
      </div>)}

      {/* Weak spots */}
      {weakSpots.length>0&&(<div style={{background:P.paper,borderRadius:14,padding:"14px 16px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${P.red}25`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><Target size={14} color={P.red} strokeWidth={1.5}/><span style={{fontSize:12,fontWeight:700,color:P.red,letterSpacing:0.5}}>WEAK SPOTS</span><span style={{fontSize:10,color:P.ink3}}>(3+ mistakes)</span></div>
        {weakSpots.slice(0,8).map((ws,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<weakSpots.length-1&&i<7?`1px solid ${P.border}`:"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:13,fontFamily:"'Newsreader',serif",fontStyle:"italic",color:P.ink,fontWeight:600}}>{ws.word}</span>
            {DICT[ws.word.toLowerCase()]&&<span style={{fontSize:10,color:P.ink3}}>({DICT[ws.word.toLowerCase()]})</span>}
          </div>
          <span style={{fontSize:11,color:P.red,fontWeight:600,background:P.rl,padding:"2px 8px",borderRadius:5}}>{ws.count}x</span>
        </div>))}
      </div>)}

      {/* Milestones */}
      {earnedMilestones.length>0&&(<div style={{background:P.paper,borderRadius:14,padding:"14px 16px",marginBottom:14,boxShadow:P.sh,border:`1px solid ${P.green}25`}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><Star size={14} color={P.amber} strokeWidth={1.5}/><span style={{fontSize:12,fontWeight:700,color:P.amber,letterSpacing:0.5}}>MILESTONES</span></div>
        {earnedMilestones.map((m,i)=>(<div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"6px 0",borderBottom:i<earnedMilestones.length-1?`1px solid ${P.border}`:"none"}}>
          <span style={{fontSize:18}}>{m.icon}</span>
          <div><div style={{fontSize:12,fontWeight:600,color:P.green}}>{m.title}</div><div style={{fontSize:10,color:P.ink3}}>{m.desc}</div></div>
        </div>))}
      </div>)}

      {/* Lesson progress */}
      {[...LESSONS].sort((a,b)=>a.id-b.id).map(l=>{const d=lp(l.id);const LI=l.icon;return(
        <div key={l.id} style={{background:P.paper,borderRadius:10,padding:14,marginBottom:6,boxShadow:P.sh,border:`1px solid ${P.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><LI size={14} color={d===SECS.length?P.green:P.red} strokeWidth={1.5}/><span style={{fontWeight:700,fontSize:13,flex:1}}>L{l.id}: {l.title}</span><span style={{fontSize:11,fontWeight:600,color:d===SECS.length?P.green:P.ink3}}>{d}/{SECS.length}</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>{SEC_N.map((n,i)=>{const ok=prog[`${l.id}-${SECS[i]}`];return <span key={i} style={{fontSize:9,padding:"2px 5px",borderRadius:4,background:ok?P.gl:"#F0EEEC",color:ok?P.green:P.ink3,fontWeight:500}}>{ok?"✓ ":""}{n}</span>;})}</div>
        </div>);})}
      <button onClick={()=>{if(confirm("Reset all progress and error history?")){setProg({});setXp(0);setErrors([]);setDailyRev({date:"",count:0});setStreak(0);sv({},0,[],{date:"",count:0},0);}}} style={{width:"100%",padding:10,borderRadius:10,border:`1px solid ${P.rb}`,background:P.rl,color:P.red,fontSize:12,fontWeight:600,cursor:"pointer",marginTop:6,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><RotateCcw size={12}/> Reset</button>
    </div>);})()}

    {/* DAILY REVIEW OVERLAY */}
    {showDR&&drItems.length>0&&(()=>{
      const item=drItems[drIdx];if(!item)return null;
      return(<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(44,40,37,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowDR(false)}>
        <div style={{background:P.bg,borderRadius:18,padding:24,maxWidth:400,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.2)"}} onClick={e=>e.stopPropagation()}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <Target size={14} color={P.red} strokeWidth={1.5}/>
              <span style={{fontSize:12,fontWeight:600,color:P.ink3}}>Review {drIdx+1}/{drItems.length}</span>
            </div>
            <button onClick={()=>setShowDR(false)} style={{background:"#F0EEEC",border:"none",borderRadius:6,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={P.ink3}/></button>
          </div>
          {item.weak&&<div style={{display:"flex",alignItems:"center",gap:4,marginBottom:10,padding:"4px 8px",borderRadius:5,background:P.rl,width:"fit-content"}}><Zap size={10} color={P.red}/><span style={{fontSize:10,fontWeight:600,color:P.red}}>WEAK SPOT</span></div>}
          <p style={{margin:"0 0 4px",fontSize:18,fontWeight:600,textAlign:"center",fontFamily:"'Newsreader',serif",fontStyle:"italic",color:P.ink}}>{item.q}</p>
          <button onClick={()=>say(item.word)} style={{display:"flex",alignItems:"center",gap:4,margin:"6px auto 14px",background:P.rl,border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:11,color:P.red}}><Volume2 size={12}/> Listen</button>
          <MCQ options={item.o} answer={item.a} answered={drAns}
            onAnswer={v=>{setDrAns(v);if(v===item.a)gx(10);else logErr(item.word,"daily_review",v,item.a,0);}}
            onNext={handleDrNext}
            nextLabel={drIdx>=drItems.length-1?"Complete!":"Next"}/>
        </div>
      </div>);
    })()}

    {/* NAV */}
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:480,background:"rgba(250,249,247,0.92)",backdropFilter:"blur(16px)",borderTop:`1px solid ${P.border}`,display:"flex",padding:"7px 0 14px",zIndex:100}}>
      {[{id:"home",ic:Mountain,lb:"Journey"},{id:"chat",ic:MessageSquare,lb:"Chat"},{id:"pratik",ic:Dumbbell,lb:"Practice"},{id:"stats",ic:BarChart3,lb:"Progress"}].map(t=>(
        <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"3px 0",border:"none",cursor:"pointer",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <t.ic size={18} color={tab===t.id?P.red:P.ink3} strokeWidth={tab===t.id?1.8:1.3}/><span style={{fontSize:9,fontWeight:tab===t.id?700:500,color:tab===t.id?P.red:P.ink3}}>{t.lb}</span>
        </button>))}
    </div>
  </div>);
}
