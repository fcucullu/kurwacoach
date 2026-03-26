"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/phrases";

interface Progress { category: string; stars: number; best_streak: number; times_played: number; }

const TROPHIES = [
  { id: "first", emoji: "🌟", name: "First Steps", desc: "Complete your first category", check: (p: Progress[]) => p.length >= 1 },
  { id: "half", emoji: "🏅", name: "Halfway There", desc: `Complete ${Math.ceil(CATEGORIES.length / 2)} categories`, check: (p: Progress[]) => p.length >= Math.ceil(CATEGORIES.length / 2) },
  { id: "all", emoji: "🏆", name: "Polish Master", desc: "Complete all categories", check: (p: Progress[]) => p.length >= CATEGORIES.length },
  { id: "perfect1", emoji: "💎", name: "Perfection", desc: "3 stars in one category", check: (p: Progress[]) => p.some((x) => x.stars === 3) },
  { id: "perfectAll", emoji: "👑", name: "Kurwa King", desc: "3 stars in ALL categories", check: (p: Progress[]) => p.filter((x) => x.stars === 3).length >= CATEGORIES.length },
  { id: "streak5", emoji: "🔥", name: "On Fire", desc: "5 correct answers in a row", check: (p: Progress[]) => p.some((x) => x.best_streak >= 5) },
  { id: "streak10", emoji: "⚡", name: "Unstoppable", desc: "10 correct answers in a row", check: (p: Progress[]) => p.some((x) => x.best_streak >= 10) },
  { id: "practice10", emoji: "📚", name: "Student", desc: "Play 10 times total", check: (p: Progress[]) => p.reduce((s, x) => s + (x.times_played || 0), 0) >= 10 },
  { id: "practice50", emoji: "🎓", name: "Graduate", desc: "Play 50 times total", check: (p: Progress[]) => p.reduce((s, x) => s + (x.times_played || 0), 0) >= 50 },
  { id: "polyglot", emoji: "🌍", name: "Polyglot", desc: "Play 100 times total", check: (p: Progress[]) => p.reduce((s, x) => s + (x.times_played || 0), 0) >= 100 },
];

export default function TrofeosPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProgress(); }, []);

  const loadProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase.from("kurwa_progress").select("*").eq("user_id", user.id);
    setProgress(data ?? []);
    setLoading(false);
  };

  const totalStars = progress.reduce((s, p) => s + p.stars, 0);
  const maxStars = CATEGORIES.length * 3;
  const unlocked = TROPHIES.filter((t) => t.check(progress)).length;

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold red-shimmer mb-1">Trophies</h1>
        <p className="text-sm text-muted">{unlocked}/{TROPHIES.length} unlocked · ⭐ {totalStars}/{maxStars}</p>
      </div>

      {loading ? <p className="text-center text-muted text-sm py-8">Loading...</p> : (
        <div className="space-y-3">
          {TROPHIES.map((trophy) => {
            const isUnlocked = trophy.check(progress);
            return (
              <div key={trophy.id} className={`bg-surface rounded-xl p-4 border flex items-center gap-4 ${isUnlocked ? "border-red/30" : "border-border opacity-40"}`}>
                <span className={`text-3xl ${isUnlocked ? "" : "grayscale"}`}>{trophy.emoji}</span>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{trophy.name}</h3>
                  <p className="text-xs text-muted">{trophy.desc}</p>
                </div>
                {isUnlocked && <span className="ml-auto text-red text-sm">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
