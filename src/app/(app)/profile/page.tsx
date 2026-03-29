"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { CATEGORIES } from "@/lib/phrases";

interface Progress { category: string; stars: number; best_streak: number; times_played: number; last_score: number; }

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const { data: { user: u } } = await supabase.auth.getUser();
    setUser(u);
    if (!u) { setLoading(false); return; }
    const { data } = await supabase.from("kurwa_progress").select("*").eq("user_id", u.id);
    setProgress(data ?? []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const totalPlayed = progress.reduce((s, p) => s + p.times_played, 0);
  const totalStars = progress.reduce((s, p) => s + p.stars, 0);
  const maxStars = CATEGORIES.length * 3;
  const categoriesCompleted = progress.length;
  const bestStreak = progress.reduce((max, p) => Math.max(max, p.best_streak), 0);

  const sortedStats = CATEGORIES.map(cat => {
    const p = progress.find(pr => pr.category === cat.id);
    if (!p) return { ...cat, accuracy: null, played: 0, stars: 0 };
    const accuracy = p.last_score ? Math.min(100, Math.round((p.last_score / 10) * 100)) : null;
    return { ...cat, accuracy, played: p.times_played, stars: p.stars };
  }).sort((a, b) => {
    if (a.accuracy === null && b.accuracy === null) return 0;
    if (a.accuracy === null) return 1;
    if (b.accuracy === null) return -1;
    return a.accuracy - b.accuracy;
  });

  const weakest = sortedStats.filter(c => c.accuracy !== null);
  const displayName = user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "User";

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">👤</div>
        <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
        <p className="text-xs text-muted">{user?.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-surface rounded-xl p-3 border border-border text-center">
          <p className="text-2xl font-bold text-red">{totalPlayed}</p>
          <p className="text-xs text-muted">Games played</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-border text-center">
          <p className="text-2xl font-bold text-red">{totalStars}/{maxStars}</p>
          <p className="text-xs text-muted">Stars</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-border text-center">
          <p className="text-2xl font-bold text-red">{categoriesCompleted}/{CATEGORIES.length}</p>
          <p className="text-xs text-muted">Categories</p>
        </div>
        <div className="bg-surface rounded-xl p-3 border border-border text-center">
          <p className="text-2xl font-bold text-red">🔥 {bestStreak}</p>
          <p className="text-xs text-muted">Best streak</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border p-4 mb-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Accuracy per category</h2>
        {loading ? <p className="text-xs text-muted">Loading...</p> : (
          <div className="space-y-2">
            {sortedStats.map(cat => (
              <div key={cat.id} className="flex items-center gap-3">
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-xs text-foreground flex-1">{cat.name}</span>
                {cat.accuracy !== null ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${cat.accuracy}%`,
                        backgroundColor: cat.accuracy >= 80 ? '#10B981' : cat.accuracy >= 50 ? '#F59E0B' : '#EF4444'
                      }} />
                    </div>
                    <span className={`text-xs font-medium w-8 text-right ${
                      cat.accuracy >= 80 ? 'text-green-400' : cat.accuracy >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{cat.accuracy}%</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted">No data</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {weakest.length > 0 && weakest[0].accuracy !== null && weakest[0].accuracy < 80 && (
        <div className="bg-red/10 border border-red/30 rounded-xl p-3 mb-4">
          <p className="text-sm text-foreground">💡 <strong>Tip:</strong> Practice more <strong>{weakest[0].name}</strong> — your weakest category ({weakest[0].accuracy}%).</p>
        </div>
      )}

      <button onClick={handleSignOut}
        className="w-full bg-surface rounded-xl border border-border p-4 flex items-center gap-3 text-red-400">
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Sign out</span>
      </button>
    </div>
  );
}
