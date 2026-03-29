export interface VerbExercise {
  sentence: string;
  hint: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface VerbCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  exercises: VerbExercise[];
}

export const VERB_CATEGORIES: VerbCategory[] = [
  {
    id: "present-tense",
    name: "Present Tense",
    emoji: "⏱️",
    description: "Conjugating imperfective verbs now",
    exercises: [
      { sentence: "Ja ___ książkę.", hint: "(czytać — to read)", options: ["czytam", "czytasz", "czyta", "czytają"], answer: "czytam", explanation: "Present: 'ja' (I) → -am/-em ending. Czytać → czytam." },
      { sentence: "Ty ___ po polsku.", hint: "(mówić — to speak)", options: ["mówisz", "mówię", "mówi", "mówią"], answer: "mówisz", explanation: "Present: 'ty' (you) → -sz ending. Mówić → mówisz." },
      { sentence: "On ___ w domu.", hint: "(pracować — to work)", options: ["pracuje", "pracuję", "pracujemy", "pracują"], answer: "pracuje", explanation: "Present: 'on' (he) → no special ending (base stem). Pracować → pracuje." },
      { sentence: "My ___ obiad.", hint: "(jeść — to eat)", options: ["jemy", "jem", "jesz", "jedzą"], answer: "jemy", explanation: "Present: 'my' (we) → -my ending. Jeść → jemy." },
      { sentence: "Wy ___ muzykę.", hint: "(słuchać — to listen)", options: ["słuchacie", "słucham", "słuchasz", "słuchają"], answer: "słuchacie", explanation: "Present: 'wy' (you pl.) → -cie ending. Słuchać → słuchacie." },
      { sentence: "Oni ___ w parku.", hint: "(biegać — to run)", options: ["biegają", "biegam", "biega", "biegamy"], answer: "biegają", explanation: "Present: 'oni' (they masc.) → -ją/-ą ending. Biegać → biegają." },
      { sentence: "Ja ___ kawę.", hint: "(pić — to drink)", options: ["piję", "pijesz", "pije", "pijemy"], answer: "piję", explanation: "Present: 'ja' → -ę ending. Pić → piję." },
      { sentence: "Ona ___ bardzo dobrze.", hint: "(gotować — to cook)", options: ["gotuje", "gotuję", "gotujemy", "gotują"], answer: "gotuje", explanation: "Present: 'ona' (she) = same as 'on'. Gotować → gotuje." },
      { sentence: "Ty ___ dobrze po angielsku.", hint: "(pisać — to write)", options: ["piszesz", "piszę", "pisze", "piszemy"], answer: "piszesz", explanation: "Present: 'ty' → -sz. Pisać → piszesz (note consonant change s→sz)." },
      { sentence: "My ___ do szkoły.", hint: "(chodzić — to go/walk)", options: ["chodzimy", "chodzę", "chodzisz", "chodzą"], answer: "chodzimy", explanation: "Present: 'my' → -my. Chodzić → chodzimy." },
      { sentence: "Ja ___ po polsku.", hint: "(rozumieć — to understand)", options: ["rozumiem", "rozumiesz", "rozumie", "rozumiemy"], answer: "rozumiem", explanation: "Present: 'ja' → -em (e-conjugation). Rozumieć → rozumiem." },
      { sentence: "Oni ___ w Warszawie.", hint: "(mieszkać — to live)", options: ["mieszkają", "mieszkam", "mieszka", "mieszkamy"], answer: "mieszkają", explanation: "Present: 'oni' → -ją. Mieszkać → mieszkają." },
    ],
  },
  {
    id: "past-tense",
    name: "Past Tense",
    emoji: "⏪",
    description: "Gender matters! -łem/-łam, -ł/-ła",
    exercises: [
      { sentence: "Ja (♂) ___ książkę.", hint: "(czytać — to read, masc.)", options: ["czytałem", "czytałam", "czytał", "czytali"], answer: "czytałem", explanation: "Past masculine 'ja': stem + -łem. Czytać → czytałem." },
      { sentence: "Ja (♀) ___ książkę.", hint: "(czytać — to read, fem.)", options: ["czytałam", "czytałem", "czytała", "czytały"], answer: "czytałam", explanation: "Past feminine 'ja': stem + -łam. Czytać → czytałam." },
      { sentence: "On ___ do sklepu.", hint: "(iść — to go)", options: ["szedł", "szła", "szli", "szłam"], answer: "szedł", explanation: "Past 'on': iść is irregular. On szedł (he went)." },
      { sentence: "Ona ___ do sklepu.", hint: "(iść — to go)", options: ["szła", "szedł", "szli", "szłam"], answer: "szła", explanation: "Past 'ona': iść irregular feminine. Ona szła (she went)." },
      { sentence: "My (♂♂) ___ film.", hint: "(oglądać — to watch, masc. pl.)", options: ["oglądaliśmy", "oglądałyśmy", "oglądałem", "oglądali"], answer: "oglądaliśmy", explanation: "Past masc. plural 'my': -liśmy. Oglądać → oglądaliśmy." },
      { sentence: "Ty (♂) ___ obiad?", hint: "(jeść — to eat, masc.)", options: ["jadłeś", "jadłaś", "jadł", "jedli"], answer: "jadłeś", explanation: "Past masc. 'ty': -łeś. Jeść (irregular) → jadłeś." },
      { sentence: "Ty (♀) ___ obiad?", hint: "(jeść — to eat, fem.)", options: ["jadłaś", "jadłeś", "jadła", "jadły"], answer: "jadłaś", explanation: "Past fem. 'ty': -łaś. Jeść → jadłaś." },
      { sentence: "Oni ___ na imprezie.", hint: "(być — to be, masc. pl.)", options: ["byli", "były", "był", "byliśmy"], answer: "byli", explanation: "Past 'oni' (masc. personal plural): być → byli." },
      { sentence: "One ___ na imprezie.", hint: "(być — to be, fem. pl.)", options: ["były", "byli", "była", "byłyśmy"], answer: "były", explanation: "Past 'one' (non-masc. personal plural): być → były." },
      { sentence: "Ja (♂) ___ dobrze.", hint: "(spać — to sleep, masc.)", options: ["spałem", "spałam", "spał", "spali"], answer: "spałem", explanation: "Past masc. 'ja': spać → spałem." },
      { sentence: "On ___ kawę.", hint: "(pić — to drink)", options: ["pił", "piła", "pili", "piłem"], answer: "pił", explanation: "Past 'on': pić → pił." },
      { sentence: "Ona ___ kawę.", hint: "(pić — to drink)", options: ["piła", "pił", "piły", "piłam"], answer: "piła", explanation: "Past 'ona': pić → piła." },
    ],
  },
  {
    id: "future-tense",
    name: "Future Tense",
    emoji: "⏩",
    description: "Imperfective (będę + inf) vs Perfective (conjugate)",
    exercises: [
      { sentence: "Ja ___ czytać.", hint: "(future imperfective: I will be reading)", options: ["będę", "będziesz", "będzie", "będą"], answer: "będę", explanation: "Future imperfective: będę + infinitive. 'Ja będę czytać' = I will be reading." },
      { sentence: "Ty ___ pracować.", hint: "(future imperfective: you will be working)", options: ["będziesz", "będę", "będzie", "będziemy"], answer: "będziesz", explanation: "Future imperfective: 'ty' → będziesz + infinitive." },
      { sentence: "On ___ to jutro.", hint: "(zrobić — perfective: he will do/finish)", options: ["zrobi", "zrobię", "zrobimy", "zrobią"], answer: "zrobi", explanation: "Future perfective: conjugate like present! Zrobić → zrobi. Looks present but means future." },
      { sentence: "Ja ___ to jutro.", hint: "(zrobić — perfective: I will do/finish)", options: ["zrobię", "zrobisz", "zrobi", "zrobimy"], answer: "zrobię", explanation: "Future perfective: 'ja' → zrobię. ⚠️ Perfective verbs have NO present tense — this IS future." },
      { sentence: "My ___ uczyć się.", hint: "(future imperfective: we will be studying)", options: ["będziemy", "będę", "będziesz", "będą"], answer: "będziemy", explanation: "Future imperfective: 'my' → będziemy + infinitive." },
      { sentence: "Oni ___ to ___.", hint: "(kupić — perfective: they will buy)", options: ["kupią", "kupię", "kupi", "kupimy"], answer: "kupią", explanation: "Future perfective: 'oni' → kupią. Conjugated like present but means future." },
      { sentence: "Ja ___ list.", hint: "(napisać — perfective: I will write)", options: ["napiszę", "napiszesz", "napisze", "napiszemy"], answer: "napiszę", explanation: "Future perfective: napisać → napiszę. The prefix 'na-' makes it perfective." },
      { sentence: "Ty ___ gotować.", hint: "(future imperfective: you will be cooking)", options: ["będziesz", "będę", "będzie", "będziemy"], answer: "będziesz", explanation: "Future imperfective: 'ty' → będziesz + infinitive." },
      { sentence: "Ona ___ to ___.", hint: "(przeczytać — perfective: she will read/finish reading)", options: ["przeczyta", "przeczytam", "przeczytasz", "przeczytają"], answer: "przeczyta", explanation: "Future perfective: przeczytać → przeczyta. 'Prze-' prefix = completion." },
      { sentence: "Wy ___ sprzątać.", hint: "(future imperfective: you all will be cleaning)", options: ["będziecie", "będę", "będziesz", "będziemy"], answer: "będziecie", explanation: "Future imperfective: 'wy' → będziecie + infinitive." },
      { sentence: "My ___ to.", hint: "(zjeść — perfective: we will eat up)", options: ["zjemy", "zjem", "zjesz", "zjedzą"], answer: "zjemy", explanation: "Future perfective: zjeść → zjemy. 'Z-' prefix = complete the eating." },
      { sentence: "Oni ___ oglądać film.", hint: "(future imperfective: they will be watching)", options: ["będą", "będę", "będzie", "będziemy"], answer: "będą", explanation: "Future imperfective: 'oni' → będą + infinitive." },
    ],
  },
  {
    id: "conditional",
    name: "Conditional (Would)",
    emoji: "💭",
    description: "Past 3rd person + by — robiłbym, gdybym...",
    exercises: [
      { sentence: "Ja (♂) ___ to.", hint: "(robić — I would do)", options: ["robiłbym", "robiłabym", "robiłbyś", "robiłby"], answer: "robiłbym", explanation: "Conditional: past 3rd person + by particle. Ja (masc.) → robiłbym." },
      { sentence: "Ja (♀) ___ to.", hint: "(robić — I would do)", options: ["robiłabym", "robiłbym", "robiłabyś", "robiłaby"], answer: "robiłabym", explanation: "Conditional: feminine 'ja' → robiłabym." },
      { sentence: "Ty (♂) ___ kawę?", hint: "(chcieć — would you like?)", options: ["chciałbyś", "chciałbym", "chciałby", "chcielibyście"], answer: "chciałbyś", explanation: "Conditional: 'ty' masc. → chciałbyś." },
      { sentence: "On ___ pojechać.", hint: "(móc — he could/would be able to)", options: ["mógłby", "mogłaby", "mógłbym", "mogliby"], answer: "mógłby", explanation: "Conditional: 'on' → mógłby (he could/would be able to)." },
      { sentence: "My (♂♂) ___ pomóc.", hint: "(chcieć — we would want to)", options: ["chcielibyśmy", "chciałbym", "chciałbyś", "chcieliby"], answer: "chcielibyśmy", explanation: "Conditional: 'my' masc. personal → chcielibyśmy." },
      { sentence: "Gdybym ___ więcej, kupiłbym dom.", hint: "(zarabiać — if I earned)", options: ["zarabiał", "zarabiałem", "zarabiam", "zarabiałbym"], answer: "zarabiał", explanation: "'Gdybym' already contains 'bym', so the verb is just past 3rd person form. Gdybym zarabiał = if I earned." },
      { sentence: "___ poszedł do kina.", hint: "(I would go — masc.)", options: ["Poszedłbym", "Poszedłbyś", "Poszedłby", "Poszlibyśmy"], answer: "Poszedłbym", explanation: "Conditional: 'ja' masc. → past 3rd person + bym. Poszedł + bym." },
      { sentence: "Gdyby miał czas, ___ na wakacje.", hint: "(pojechać — he would go)", options: ["pojechałby", "pojechałbym", "pojechaliby", "pojechałbyś"], answer: "pojechałby", explanation: "'Gdyby' (if he would) + conditional. On → pojechałby." },
      { sentence: "Co byś ___?", hint: "(robić — what would you do? masc.)", options: ["robił", "robił bym", "robili", "robiła"], answer: "robił", explanation: "'Byś' already has the 'by' particle. So just past 3rd person: robił. Co byś robił = What would you do?" },
      { sentence: "Ona ___ to inaczej.", hint: "(zrobić — she would do it differently)", options: ["zrobiłaby", "zrobiłbym", "zrobiłby", "zrobiłyby"], answer: "zrobiłaby", explanation: "Conditional: 'ona' → past fem. 3rd person + by. Zrobiła + by = zrobiłaby." },
      { sentence: "Oni ___ nam pomóc.", hint: "(móc — they could)", options: ["mogliby", "mogłaby", "mógłby", "mógłbym"], answer: "mogliby", explanation: "Conditional: 'oni' masc. personal → mogliby." },
      { sentence: "Gdybyś ___ czas, zadzwoń do mnie.", hint: "(mieć — if you had time)", options: ["miał", "miałem", "mam", "miałbym"], answer: "miał", explanation: "'Gdybyś' = gdyby + byś. Verb stays in past 3rd person form: miał." },
    ],
  },
];
