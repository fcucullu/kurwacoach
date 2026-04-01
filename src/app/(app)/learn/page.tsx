"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Star } from "lucide-react";
import { CATEGORIES } from "@/lib/phrases";
import { InstallPrompt } from "@/components/install-prompt";
import { DECLENSION_CATEGORIES } from "@/lib/declensions";
import { VERB_CATEGORIES } from "@/lib/verbs";

interface Progress {
  category: string;
  stars: number;
  times_played: number;
}

export default function LearnPage() {
  const supabase = createClient();
  const [progress, setProgress] = useState<Record<string, Progress>>({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("kurwa_progress")
      .select("*")
      .eq("user_id", user.id);

    const map: Record<string, Progress> = {};
    data?.forEach((p) => { map[p.category] = p; });
    setProgress(map);
  };

  return (
    <div>
      <InstallPrompt />
      <div className="text-center mb-8 mt-4">
        <div className="text-5xl mb-2">🇵🇱</div>
        <h1 className="text-3xl font-bold red-shimmer mb-1">KurwaCoach</h1>
        <p className="text-sm text-muted">Pick a category to practice</p>
      </div>

      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const p = progress[cat.id];
          const stars = p?.stars || 0;
          const played = p?.times_played || 0;

          return (
            <Link
              key={cat.id}
              href={`/learn/${cat.id}`}
              className="block bg-surface rounded-xl p-4 border border-border hover:border-red/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.phrases.length} phrases{played > 0 ? ` · played ${played}x` : ""}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= stars ? "text-red fill-red" : "text-border"}`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Verb categories */}
      <h2 className="text-sm font-semibold text-muted mt-6 mb-2">🔧 Grammar — Verbs</h2>
      <div className="space-y-3">
        {VERB_CATEGORIES.map((cat) => {
          const p = progress[cat.id];
          const stars = p?.stars || 0;
          const played = p?.times_played || 0;
          return (
            <Link key={cat.id} href={`/learn/${cat.id}`}
              className="block bg-surface rounded-xl p-4 border border-border hover:border-red/30 transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.description}{played > 0 ? ` · played ${played}x` : ""}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center">
                  {[1, 2, 3].map((s) => (<Star key={s} className={`w-4 h-4 ${s <= stars ? "text-red fill-red" : "text-border"}`} />))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Declension categories */}
      <h2 className="text-sm font-semibold text-muted mt-6 mb-2">🔤 Grammar — Cases (Declensions)</h2>
      <div className="space-y-3">
        {DECLENSION_CATEGORIES.map((cat) => {
          const p = progress[cat.id];
          const stars = p?.stars || 0;
          const played = p?.times_played || 0;

          return (
            <Link key={cat.id} href={`/learn/${cat.id}`}
              className="block bg-surface rounded-xl p-4 border border-border hover:border-red/30 transition-all active:scale-[0.98]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.description}{played > 0 ? ` · played ${played}x` : ""}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center">
                  {[1, 2, 3].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= stars ? "text-red fill-red" : "text-border"}`} />
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Challenge mode */}
      <Link
        href="/learn/challenge"
        className="block mt-6 bg-red/10 border border-red/30 rounded-2xl p-4 text-center hover:bg-red/20 transition-colors"
      >
        <span className="text-2xl block mb-1">🎯</span>
        <span className="font-bold text-red">Challenge Mode</span>
        <p className="text-xs text-muted mt-1">Random phrases from all categories</p>
      </Link>
    </div>
  );
}
