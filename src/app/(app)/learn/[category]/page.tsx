"use client";

import { useState, useRef, useEffect, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Volume2 } from "lucide-react";
import { ConfettiBurst } from "@/components/confetti";
import { CATEGORIES } from "@/lib/phrases";

interface Question {
  en: string;
  correctPl: string;
  pronunciation: string;
  options: string[];
}

interface ConfettiState { key: number; x: number; y: number }

function generateQuestions(categoryId: string): Question[] {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];

  const phrases = [...cat.phrases].sort(() => Math.random() - 0.5);
  const allPhrases = cat.phrases;

  return phrases.map((phrase) => {
    const options = new Set<string>([phrase.pl]);
    while (options.size < 4) {
      const random = allPhrases[Math.floor(Math.random() * allPhrases.length)].pl;
      if (random !== phrase.pl) options.add(random);
    }
    return {
      en: phrase.en,
      correctPl: phrase.pl,
      pronunciation: phrase.pronunciation,
      options: [...options].sort(() => Math.random() - 0.5),
    };
  });
}

function generateChallengeQuestions(): Question[] {
  const all = CATEGORIES.flatMap((c) => c.phrases);
  const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 20);

  return shuffled.map((phrase) => {
    const options = new Set<string>([phrase.pl]);
    while (options.size < 4) {
      const random = all[Math.floor(Math.random() * all.length)].pl;
      if (random !== phrase.pl) options.add(random);
    }
    return {
      en: phrase.en,
      correctPl: phrase.pl,
      pronunciation: phrase.pronunciation,
      options: [...options].sort(() => Math.random() - 0.5),
    };
  });
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pl-PL";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

const FACES = { correct: "😄", wrong: "😅", streak: "🤩", thinking: "🤔", perfect: "🎉" };

export default function QuizPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const isChallenge = category === "challenge";
  const router = useRouter();
  const supabase = createClient();

  const cat = CATEGORIES.find((c) => c.id === category);
  const categoryName = isChallenge ? "Challenge" : (cat?.name || category);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [face, setFace] = useState(FACES.thinking);
  const [confetti, setConfetti] = useState<ConfettiState | null>(null);
  const [bonusConfetti, setBonusConfetti] = useState<ConfettiState[]>([]);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const confettiKey = useRef(0);

  useEffect(() => {
    setQuestions(isChallenge ? generateChallengeQuestions() : generateQuestions(category));
  }, [category, isChallenge]);

  const handleAnswer = (option: string, e: React.MouseEvent) => {
    if (selected !== null) return;
    setSelected(option);
    const correct = option === questions[current].correctPl;
    setIsCorrect(correct);

    // Speak the correct answer
    speak(questions[current].correctPl);

    if (correct) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFace(newStreak >= 3 ? FACES.streak : FACES.correct);

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      confettiKey.current++;
      setConfetti({ key: confettiKey.current, x: rect.left + rect.width / 2, y: rect.top });

      if (newStreak === 3 || newStreak === 5 || newStreak === 7) {
        setTimeout(() => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const bursts = [
            { x: w * 0.3, y: h * 0.3 },
            { x: w * 0.7, y: h * 0.3 },
          ].map((pos) => { confettiKey.current++; return { key: confettiKey.current, ...pos }; });
          setBonusConfetti(bursts);
        }, 300);
      }
    } else {
      setFace(FACES.wrong);
      setStreak(0);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    const newScore = score;
    setConfetti(null);
    setBonusConfetti([]);
    if (current + 1 >= questions.length) {
      saveProgress(newScore);
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setIsCorrect(null);
      setShowExplanation(false);
      setFace(FACES.thinking);
    }
  };

  const saveProgress = async (finalScore: number) => {
    if (isChallenge) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const errors = questions.length - finalScore;
    const stars = errors === 0 ? 3 : errors <= 2 ? 2 : 1;

    const { data: existing } = await supabase
      .from("kurwa_progress")
      .select("stars, times_played")
      .eq("user_id", user.id)
      .eq("category", category)
      .single();

    await supabase.from("kurwa_progress").upsert(
      {
        user_id: user.id,
        category,
        stars: Math.max(stars, existing?.stars || 0),
        best_streak: bestStreak,
        last_score: finalScore,
        times_played: (existing?.times_played || 0) + 1,
      },
      { onConflict: "user_id,category" }
    );

    if (errors === 0) {
      setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const positions = [
          { x: w * 0.5, y: h * 0.2 },
          { x: w * 0.2, y: h * 0.4 },
          { x: w * 0.8, y: h * 0.4 },
        ];
        const makeBursts = () => positions.map((pos) => { confettiKey.current++; return { key: confettiKey.current, ...pos }; });
        setBonusConfetti(makeBursts());
        setTimeout(() => setBonusConfetti(makeBursts()), 800);
        setTimeout(() => setBonusConfetti(makeBursts()), 1600);
      }, 300);
    }
  };

  if (questions.length === 0) return null;

  const q = questions[current];
  const finalScore = score;
  const errors = questions.length - finalScore;
  const stars = errors === 0 ? 3 : errors <= 2 ? 2 : 1;

  if (finished) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4 animate-bounce-in">
          {stars === 3 ? "🏆" : stars === 2 ? "⭐" : "👏"}
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {isChallenge ? "Challenge complete!" : `${categoryName} complete!`}
        </h1>
        <p className="text-4xl font-bold red-shimmer mb-4">{finalScore}/{questions.length}</p>

        {!isChallenge && (
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`text-3xl ${s <= stars ? "" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
        )}

        {bestStreak > 0 && <p className="text-sm text-muted mb-6">🔥 Best streak: {bestStreak}</p>}

        <div className="space-y-3 max-w-xs mx-auto">
          <button
            onClick={() => {
              setQuestions(isChallenge ? generateChallengeQuestions() : generateQuestions(category));
              setCurrent(0); setScore(0); setStreak(0); setBestStreak(0);
              setSelected(null); setIsCorrect(null); setShowExplanation(false); setFace(FACES.thinking); setFinished(false);
            }}
            className="w-full bg-red text-white font-bold py-3 rounded-xl text-lg"
          >
            Play again!
          </button>
          <button
            onClick={() => router.push("/learn")}
            className="w-full bg-surface border border-border text-foreground font-medium py-3 rounded-xl"
          >
            Back to categories
          </button>
        </div>

        {confetti && <ConfettiBurst key={confetti.key} x={confetti.x} y={confetti.y} onDone={() => setConfetti(null)} />}
        {bonusConfetti.map((c) => <ConfettiBurst key={c.key} x={c.x} y={c.y} onDone={() => setBonusConfetti((prev) => prev.filter((b) => b.key !== c.key))} />)}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-2 mb-6">
        <div className="bg-red h-2 rounded-full transition-all duration-300" style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>

      {streak > 0 && (
        <div className="text-sm font-medium text-red mb-2 animate-bounce-in">🔥 Streak: {streak}</div>
      )}

      <div className={`text-6xl mb-4 ${isCorrect === true ? "animate-jump" : isCorrect === false ? "animate-shake" : ""}`}>
        {face}
      </div>

      {/* Question: English phrase */}
      <div className="text-center mb-6">
        <p className="text-xs text-muted mb-1">How do you say...</p>
        <p className="text-2xl font-bold text-foreground">"{q.en}"</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
        {q.options.map((option) => {
          let bg = "bg-surface border-border hover:border-red/50";
          if (selected !== null) {
            if (option === q.correctPl) bg = "bg-green-500/20 border-green-500";
            else if (option === selected) bg = "bg-red-500/20 border-red-500";
          }

          return (
            <button
              key={option}
              onClick={(e) => handleAnswer(option, e)}
              disabled={selected !== null}
              className={`${bg} border rounded-xl py-4 px-4 text-left transition-all active:scale-95 disabled:cursor-default`}
            >
              <p className="font-medium text-foreground">{option}</p>
            </button>
          );
        })}
      </div>

      {/* Explanation + pronunciation + next button */}
      {showExplanation && (
        <div className="w-full max-w-sm mt-4 animate-bounce-in">
          <div className={`p-4 rounded-xl border ${isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
            <p className="text-sm font-medium mb-2">{isCorrect ? "✅ Correct!" : "❌ Incorrect"}</p>
            {isCorrect === false && (
              <p className="text-sm text-foreground mb-2">Answer: <strong>{q.correctPl}</strong></p>
            )}
            <div className="flex items-center gap-2 mb-1">
              <button onClick={() => speak(q.correctPl)}
                className="inline-flex items-center gap-2 text-sm text-red hover:text-foreground bg-red/10 px-3 py-1.5 rounded-lg">
                <Volume2 className="w-4 h-4" /> Listen again
              </button>
            </div>
            <p className="text-xs text-muted mt-1">Pronunciation: {q.pronunciation}</p>
          </div>
          <button onClick={handleNext}
            className="w-full mt-3 bg-red text-white font-bold py-3 rounded-xl text-lg">
            Next →
          </button>
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Question {current + 1} of {questions.length} · {score} correct
      </p>

      {confetti && <ConfettiBurst key={confetti.key} x={confetti.x} y={confetti.y} onDone={() => setConfetti(null)} />}
      {bonusConfetti.map((c) => <ConfettiBurst key={c.key} x={c.x} y={c.y} onDone={() => setBonusConfetti((prev) => prev.filter((b) => b.key !== c.key))} />)}
    </div>
  );
}
