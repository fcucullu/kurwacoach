export interface DeclensionExercise {
  sentence: string; // Polish sentence with ___
  hint: string; // base form, e.g. "(dom)"
  hintEn?: string; // English translation, e.g. "house"
  sentenceEn?: string; // Full sentence in English
  options: string[];
  optionCases?: Record<string, string>; // map option → case name
  answer: string;
  explanation: string;
}

export interface DeclensionCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  exercises: DeclensionExercise[];
}

export const DECLENSION_CATEGORIES: DeclensionCategory[] = [
  {
    id: "accusative",
    name: "Accusative (Biernik)",
    emoji: "🎯",
    description: "Direct objects — what you see, have, like",
    exercises: [
      { sentence: "Lubię ___.", hint: "(kawa)", options: ["kawę", "kawy", "kawą", "kawie"], answer: "kawę", explanation: "Accusative: 'lubię' (I like) takes the accusative. Feminine nouns ending in -a change to -ę." },
      { sentence: "Widzę ___.", hint: "(pies)", options: ["psa", "pies", "psem", "psie"], answer: "psa", explanation: "Accusative: masculine animate nouns take the genitive form. 'Pies' → 'psa'." },
      { sentence: "Mam ___.", hint: "(samochód)", options: ["samochód", "samochodu", "samochodem", "samochodzie"], answer: "samochód", explanation: "Accusative: masculine inanimate nouns stay the same as nominative. 'Samochód' doesn't change." },
      { sentence: "Jem ___.", hint: "(jabłko)", options: ["jabłko", "jabłka", "jabłkiem", "jabłku"], answer: "jabłko", explanation: "Accusative: neuter nouns stay the same as nominative. 'Jabłko' doesn't change." },
      { sentence: "Czytam ___.", hint: "(książka)", options: ["książkę", "książki", "książką", "książce"], answer: "książkę", explanation: "Accusative: feminine -a → -ę. 'Książka' → 'książkę'." },
      { sentence: "Znam ___.", hint: "(nauczyciel)", options: ["nauczyciela", "nauczyciel", "nauczycielem", "nauczycielu"], answer: "nauczyciela", explanation: "Accusative: masculine animate → genitive form. 'Nauczyciel' → 'nauczyciela'." },
      { sentence: "Piję ___.", hint: "(herbata)", options: ["herbatę", "herbaty", "herbatą", "herbacie"], answer: "herbatę", explanation: "Accusative: feminine -a → -ę. 'Herbata' → 'herbatę'." },
      { sentence: "Kupuję ___.", hint: "(chleb)", options: ["chleb", "chleba", "chlebem", "chlebie"], answer: "chleb", explanation: "Accusative: masculine inanimate = nominative. 'Chleb' stays 'chleb'." },
      { sentence: "Oglądam ___.", hint: "(film)", options: ["film", "filmu", "filmem", "filmie"], answer: "film", explanation: "Accusative: masculine inanimate = nominative. 'Film' stays 'film'." },
      { sentence: "Kocham ___.", hint: "(mama)", options: ["mamę", "mamy", "mamą", "mamie"], answer: "mamę", explanation: "Accusative: feminine -a → -ę. 'Mama' → 'mamę'." },
      { sentence: "Słucham ___.", hint: "(muzyka)", options: ["muzykę", "muzyki", "muzyką", "muzyce"], answer: "muzykę", explanation: "Accusative: feminine -a → -ę. Even though 'słuchać' often takes genitive, with music as a general activity, accusative is also used." },
      { sentence: "Widzę ___.", hint: "(kot)", options: ["kota", "kot", "kotem", "kocie"], answer: "kota", explanation: "Accusative: masculine animate → genitive form. 'Kot' → 'kota'." },
    ],
  },
  {
    id: "genitive",
    name: "Genitive (Dopełniacz)",
    emoji: "📦",
    description: "Possession, 'of', after 'nie ma', quantities",
    exercises: [
      { sentence: "Nie ma ___.", hint: "(czas)", options: ["czasu", "czas", "czasem", "czasie"], answer: "czasu", explanation: "Genitive: 'nie ma' (there isn't) always takes genitive. Masculine: -u or -a ending." },
      { sentence: "Szukam ___.", hint: "(praca)", options: ["pracy", "pracę", "pracą", "prace"], answer: "pracy", explanation: "Genitive: 'szukać' (to look for) takes genitive. Feminine -a → -y (after hard consonant)." },
      { sentence: "Potrzebuję ___.", hint: "(pomoc)", options: ["pomocy", "pomoc", "pomocą", "pomocu"], answer: "pomocy", explanation: "Genitive: 'potrzebować' (to need) takes genitive. Feminine consonant-ending → -y/-i." },
      { sentence: "Nie lubię ___.", hint: "(zima)", options: ["zimy", "zimę", "zimą", "zimie"], answer: "zimy", explanation: "Genitive: negated verbs take genitive instead of accusative. Feminine -a → -y." },
      { sentence: "To jest dom ___.", hint: "(sąsiad)", options: ["sąsiada", "sąsiad", "sąsiadem", "sąsiedzie"], answer: "sąsiada", explanation: "Genitive: possession ('dom sąsiada' = neighbor's house). Masculine animate → -a." },
      { sentence: "Dużo ___.", hint: "(ludzie)", options: ["ludzi", "ludzie", "ludziom", "ludźmi"], answer: "ludzi", explanation: "Genitive: after quantities (dużo, mało, wiele). 'Ludzie' → 'ludzi'." },
      { sentence: "Bez ___.", hint: "(cukier)", options: ["cukru", "cukier", "cukrem", "cukrze"], answer: "cukru", explanation: "Genitive: preposition 'bez' (without) takes genitive. Masculine → -u." },
      { sentence: "Blisko ___.", hint: "(szkoła)", options: ["szkoły", "szkołę", "szkołą", "szkole"], answer: "szkoły", explanation: "Genitive: preposition 'blisko' (near) takes genitive. Feminine -a → -y." },
      { sentence: "Pięć ___.", hint: "(dzień)", options: ["dni", "dzień", "dniom", "dniami"], answer: "dni", explanation: "Genitive plural: numbers 5+ take genitive plural. 'Dzień' → 'dni'." },
      { sentence: "Do ___.", hint: "(dom)", options: ["domu", "dom", "domem", "domie"], answer: "domu", explanation: "Genitive: preposition 'do' (to) takes genitive. 'Dom' → 'domu'." },
      { sentence: "Kilka ___.", hint: "(godzina)", options: ["godzin", "godziny", "godzinom", "godzinami"], answer: "godzin", explanation: "Genitive plural: 'kilka' (a few) takes genitive plural. Feminine -a drops the ending." },
      { sentence: "Nie mam ___.", hint: "(pieniądze)", options: ["pieniędzy", "pieniądze", "pieniędzmi", "pieniądzom"], answer: "pieniędzy", explanation: "Genitive: 'nie mam' (I don't have) takes genitive. Irregular plural form." },
    ],
  },
  {
    id: "instrumental",
    name: "Instrumental (Narzędnik)",
    emoji: "🤝",
    description: "With, by means of, after 'z' and 'być'",
    exercises: [
      { sentence: "Idę z ___.", hint: "(przyjaciel)", options: ["przyjacielem", "przyjaciela", "przyjaciel", "przyjacielu"], answer: "przyjacielem", explanation: "Instrumental: 'z' (with) takes instrumental. Masculine → -em." },
      { sentence: "Jem zupę ___.", hint: "(łyżka)", options: ["łyżką", "łyżkę", "łyżki", "łyżce"], answer: "łyżką", explanation: "Instrumental: 'by means of' (eating with a spoon). Feminine -a → -ą." },
      { sentence: "Jestem ___.", hint: "(student)", options: ["studentem", "studenta", "student", "studencie"], answer: "studentem", explanation: "Instrumental: after 'być' (to be) for professions/roles. Masculine → -em." },
      { sentence: "Jadę ___.", hint: "(autobus)", options: ["autobusem", "autobusu", "autobus", "autobusie"], answer: "autobusem", explanation: "Instrumental: means of transport. 'Jadę autobusem' = I travel by bus. Masculine → -em." },
      { sentence: "Piszę ___.", hint: "(długopis)", options: ["długopisem", "długopisu", "długopis", "długopisie"], answer: "długopisem", explanation: "Instrumental: writing with/by means of. Masculine → -em." },
      { sentence: "Ona jest ___.", hint: "(lekarka)", options: ["lekarką", "lekarkę", "lekarki", "lekarce"], answer: "lekarką", explanation: "Instrumental: after 'być' for feminine professions. Feminine -a → -ą." },
      { sentence: "Mieszkam z ___.", hint: "(rodzina)", options: ["rodziną", "rodzinę", "rodziny", "rodzinie"], answer: "rodziną", explanation: "Instrumental: 'z' (with) + feminine noun. -a → -ą." },
      { sentence: "Interesuję się ___.", hint: "(historia)", options: ["historią", "historię", "historii", "historie"], answer: "historią", explanation: "Instrumental: 'interesować się' (to be interested in) takes instrumental. Feminine -a → -ą." },
      { sentence: "Rozmawiam z ___.", hint: "(nauczyciel)", options: ["nauczycielem", "nauczyciela", "nauczyciel", "nauczycielu"], answer: "nauczycielem", explanation: "Instrumental: 'z' (with) + masculine noun → -em." },
      { sentence: "Cieszę się ___.", hint: "(pogoda)", options: ["pogodą", "pogodę", "pogody", "pogodzie"], answer: "pogodą", explanation: "Instrumental: 'cieszyć się' (to enjoy/be happy about) takes instrumental. Feminine -a → -ą." },
      { sentence: "Gram ___.", hint: "(piłka)", options: ["piłką", "piłkę", "piłki", "piłce"], answer: "piłką", explanation: "Instrumental: 'grać' + instrument/ball (playing with). Feminine -a → -ą." },
      { sentence: "Będę ___.", hint: "(inżynier)", options: ["inżynierem", "inżyniera", "inżynier", "inżynierze"], answer: "inżynierem", explanation: "Instrumental: after 'być' in future tense. Masculine → -em." },
    ],
  },
  {
    id: "locative",
    name: "Locative (Miejscownik)",
    emoji: "📍",
    description: "Location — 'w', 'na', 'o', about/at/in",
    exercises: [
      { sentence: "Mieszkam w ___.", hint: "(Warszawa)", options: ["Warszawie", "Warszawę", "Warszawy", "Warszawą"], answer: "Warszawie", explanation: "Locative: 'w' (in) + location takes locative. Feminine -a → -ie." },
      { sentence: "Jestem w ___.", hint: "(szkoła)", options: ["szkole", "szkołę", "szkoły", "szkołą"], answer: "szkole", explanation: "Locative: 'w' (in) + place. Feminine -a → -e (after hard consonant with softening)." },
      { sentence: "Myślę o ___.", hint: "(praca)", options: ["pracy", "pracę", "pracą", "praca"], answer: "pracy", explanation: "Locative: 'o' (about) takes locative. Feminine -a → -y after soft consonant." },
      { sentence: "Siedzę na ___.", hint: "(krzesło)", options: ["krześle", "krzesło", "krzesła", "krzesłem"], answer: "krześle", explanation: "Locative: 'na' (on) takes locative. Neuter -o → -e with consonant softening." },
      { sentence: "Rozmawiamy o ___.", hint: "(film)", options: ["filmie", "film", "filmu", "filmem"], answer: "filmie", explanation: "Locative: 'o' (about) takes locative. Masculine → -ie." },
      { sentence: "Jestem na ___.", hint: "(lotnisko)", options: ["lotnisku", "lotnisko", "lotniska", "lotniskiem"], answer: "lotnisku", explanation: "Locative: 'na' + neuter nouns ending in -ko → -ku." },
      { sentence: "Pracuję w ___.", hint: "(biuro)", options: ["biurze", "biuro", "biura", "biurem"], answer: "biurze", explanation: "Locative: 'w' + neuter -o → -e/-ze." },
      { sentence: "Gram na ___.", hint: "(gitara)", options: ["gitarze", "gitarę", "gitary", "gitarą"], answer: "gitarze", explanation: "Locative: 'na' (on) + instrument = locative. Feminine -a → -ze." },
      { sentence: "Mieszkam w ___.", hint: "(dom)", options: ["domu", "dom", "domem", "domie"], answer: "domu", explanation: "Locative: 'w' + 'dom' → 'domu'. Irregular but very common." },
      { sentence: "Czytam o ___.", hint: "(Polska)", options: ["Polsce", "Polskę", "Polski", "Polską"], answer: "Polsce", explanation: "Locative: 'o' (about) + Polska → Polsce. Feminine -a → -e with consonant change." },
    ],
  },
  {
    id: "dative",
    name: "Dative (Celownik)",
    emoji: "🎁",
    description: "To/for someone — giving, telling, helping",
    exercises: [
      { sentence: "Daję prezent ___.", hint: "(mama)", options: ["mamie", "mamę", "mamy", "mamą"], answer: "mamie", explanation: "Dative: indirect object (giving TO someone). Feminine -a → -ie." },
      { sentence: "Pomagam ___.", hint: "(przyjaciel)", options: ["przyjacielowi", "przyjaciela", "przyjacielem", "przyjacielu"], answer: "przyjacielowi", explanation: "Dative: 'pomagać' (to help) takes dative. Masculine → -owi." },
      { sentence: "Mówię ___.", hint: "(nauczyciel)", options: ["nauczycielowi", "nauczyciela", "nauczycielem", "nauczycielu"], answer: "nauczycielowi", explanation: "Dative: telling TO someone. Masculine → -owi." },
      { sentence: "Dziękuję ___.", hint: "(pan)", options: ["panu", "pana", "panem", "panie"], answer: "panu", explanation: "Dative: 'dziękować' (to thank) takes dative. 'Pan' → 'panu'." },
      { sentence: "Jest mi ___.", hint: "(zimno)", options: ["zimno", "zimna", "zimną", "zimnu"], answer: "zimno", explanation: "Dative of person + adjective: 'jest MI zimno' = I am cold. The adjective stays neuter." },
      { sentence: "Kupuję kwiaty ___.", hint: "(żona)", options: ["żonie", "żonę", "żony", "żoną"], answer: "żonie", explanation: "Dative: buying FOR someone. Feminine -a → -ie (with consonant change)." },
      { sentence: "Piszę list ___.", hint: "(brat)", options: ["bratu", "brata", "bratem", "bracie"], answer: "bratu", explanation: "Dative: writing TO someone. Masculine → -u (shorter form for some nouns)." },
      { sentence: "Opowiadam historię ___.", hint: "(dzieci)", options: ["dzieciom", "dzieci", "dziećmi", "dzieciach"], answer: "dzieciom", explanation: "Dative plural: telling a story TO children. Plural → -om." },
      { sentence: "Podoba mi się ta ___.", hint: "(idea)", options: ["idea", "idei", "ideą", "ideę"], answer: "idea", explanation: "'Podoba mi się' = I like. 'Mi' is dative of 'ja'. The subject (idea) stays nominative." },
      { sentence: "Wierzę ___.", hint: "(ty)", options: ["ci", "ciebie", "tobą", "tobie"], answer: "ci", explanation: "Dative: 'wierzyć' (to believe/trust) takes dative. 'Ty' → 'ci' (short form)." },
    ],
  },
  {
    id: "vocative",
    name: "Vocative (Wołacz)",
    emoji: "📣",
    description: "Calling someone — names, greetings, exclamations",
    exercises: [
      { sentence: "Cześć, ___!", hint: "(Marek)", options: ["Marku", "Marek", "Marka", "Markiem"], answer: "Marku", explanation: "Vocative: used when addressing someone directly. Masculine names → -u." },
      { sentence: "Kochanie, ___!", hint: "(mama)", options: ["mamo", "mamę", "mamy", "mamą"], answer: "mamo", explanation: "Vocative: feminine -a → -o. 'Mama' → 'mamo'." },
      { sentence: "Proszę, ___.", hint: "(pani)", options: ["pani", "panią", "panie", "pań"], answer: "pani", explanation: "Vocative: 'pani' stays 'pani' — it doesn't change in vocative." },
      { sentence: "Dzień dobry, ___.", hint: "(pan profesor)", options: ["panie profesorze", "pan profesor", "pana profesora", "panem profesorem"], answer: "panie profesorze", explanation: "Vocative: formal address. 'Pan' → 'panie', masculine → -e/-ze." },
      { sentence: "Hej, ___!", hint: "(Ania)", options: ["Aniu", "Anię", "Ani", "Anią"], answer: "Aniu", explanation: "Vocative: feminine names ending in -ia → -iu." },
      { sentence: "___, chodź tu!", hint: "(pies)", options: ["Psie", "Pies", "Psa", "Psem"], answer: "Psie", explanation: "Vocative: calling an animal. Masculine → -e/-ie." },
      { sentence: "Kochany ___!", hint: "(Boże / Bóg)", options: ["Boże", "Bóg", "Boga", "Bogiem"], answer: "Boże", explanation: "Vocative: 'Boże!' is the vocative of 'Bóg' (God). Very common exclamation." },
      { sentence: "Drogi ___!", hint: "(syn)", options: ["synu", "syn", "syna", "synem"], answer: "synu", explanation: "Vocative: masculine → -u. Used in letters and when calling someone." },
    ],
  },
  {
    id: "nominative",
    name: "Nominative (Mianownik)",
    emoji: "👤",
    description: "Subject — who/what does the action",
    exercises: [
      { sentence: "___ jest duży.", hint: "(dom)", options: ["Dom", "Domu", "Domem", "Domie"], answer: "Dom", explanation: "Nominative: the subject of the sentence. 'Dom' is masculine and doesn't change as subject." },
      { sentence: "___ jest piękna.", hint: "(kobieta)", options: ["Kobieta", "Kobietę", "Kobiety", "Kobietą"], answer: "Kobieta", explanation: "Nominative: subject. Feminine noun in base form. The adjective 'piękna' agrees (feminine)." },
      { sentence: "___ jest interesująca.", hint: "(książka)", options: ["Książka", "Książkę", "Książki", "Książką"], answer: "Książka", explanation: "Nominative: subject = base form. Adjective agrees: 'interesująca' (feminine)." },
      { sentence: "___ jest smaczne.", hint: "(jedzenie)", options: ["Jedzenie", "Jedzenia", "Jedzeniem", "Jedzeniu"], answer: "Jedzenie", explanation: "Nominative: neuter subject. 'Jedzenie' (food) + 'smaczne' (neuter adjective)." },
      { sentence: "To jest mój ___.", hint: "(brat)", options: ["brat", "brata", "bratem", "bracie"], answer: "brat", explanation: "Nominative: after 'to jest' (this is). Subject stays in base form." },
      { sentence: "___ są drodzy.", hint: "(przyjaciele)", options: ["Przyjaciele", "Przyjaciół", "Przyjaciołom", "Przyjaciółmi"], answer: "Przyjaciele", explanation: "Nominative plural: masculine personal plural of 'przyjaciel'. Subject form." },
      { sentence: "Ta ___ jest nowa.", hint: "(szkoła)", options: ["szkoła", "szkołę", "szkoły", "szkole"], answer: "szkoła", explanation: "Nominative: subject. 'Ta' (this, feminine) + noun in base form." },
      { sentence: "___ są drogie.", hint: "(bilety)", options: ["Bilety", "Biletów", "Biletom", "Biletami"], answer: "Bilety", explanation: "Nominative plural: 'bilety' is the plural subject form. Adjective 'drogie' agrees." },
    ],
  },
];

// Auto-add English hints and case labels
const WORD_EN: Record<string, string> = {
  "(kawa)": "coffee", "(pies)": "dog", "(samochód)": "car", "(jabłko)": "apple",
  "(książka)": "book", "(nauczyciel)": "teacher", "(herbata)": "tea", "(chleb)": "bread",
  "(film)": "film", "(mama)": "mom", "(muzyka)": "music", "(kot)": "cat",
  "(czas)": "time", "(praca)": "work", "(pomoc)": "help", "(zima)": "winter",
  "(sąsiad)": "neighbor", "(ludzie)": "people", "(cukier)": "sugar", "(szkoła)": "school",
  "(dzień)": "day", "(dom)": "house/home", "(godzina)": "hour", "(pieniądze)": "money",
  "(przyjaciel)": "friend", "(łyżka)": "spoon", "(student)": "student", "(autobus)": "bus",
  "(długopis)": "pen", "(lekarka)": "doctor (f)", "(rodzina)": "family", "(historia)": "history",
  "(piłka)": "ball", "(inżynier)": "engineer", "(Warszawa)": "Warsaw",
  "(krzesło)": "chair", "(lotnisko)": "airport", "(biuro)": "office", "(gitara)": "guitar",
  "(Polska)": "Poland", "(pan)": "sir/Mr", "(żona)": "wife", "(brat)": "brother",
  "(dzieci)": "children", "(ty)": "you", "(Marek)": "Marek", "(pani)": "madam",
  "(pan profesor)": "Mr. Professor", "(Ania)": "Ania",
  "(Boże / Bóg)": "God", "(syn)": "son", "(kobieta)": "woman",
  "(jedzenie)": "food", "(bilety)": "tickets", "(idea)": "idea",
};

const CASE_NAMES: Record<string, string> = {
  nominative: "Nom.", genitive: "Gen.", dative: "Dat.",
  accusative: "Acc.", instrumental: "Instr.", locative: "Loc.", vocative: "Voc.",
};

// Enrich exercises with English hints
DECLENSION_CATEGORIES.forEach(cat => {
  cat.exercises.forEach(ex => {
    if (!ex.hintEn && WORD_EN[ex.hint]) ex.hintEn = WORD_EN[ex.hint];
  });
});
