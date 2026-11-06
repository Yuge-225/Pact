'use client';

import { useAppStore } from '@/lib/store';
import { ArrowLeft, Crown, Flame } from 'lucide-react';

export function LeaderboardScreen() {
  const { pact, setScreen } = useAppStore();
  if (!pact) return null;

  const sorted = [...pact.members].sort((a, b) => b.successfulDays - a.successfulDays);
  const allPerfect = sorted.every((m) => m.successfulDays === m.totalEligibleDays);
  const maxScore = sorted[0]?.successfulDays || 0;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-pact-green text-white px-6 pt-14 pb-8 rounded-b-[1.75rem]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setScreen('active-pact')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <p className="font-bold text-sm">Leaderboard</p>
          <div className="w-8" />
        </div>

        <div className="flex items-end justify-center gap-4 mt-2">
          {sorted.length >= 2 && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">{sorted[1].avatar}</div>
              <div className="w-14 h-14 bg-white/10 rounded-xl flex flex-col items-center justify-center mt-2">
                <span className="text-sm font-black">{sorted[1].successfulDays}/{sorted[1].totalEligibleDays}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1.5 font-medium">{sorted[1].name}</p>
            </div>
          )}
          <div className="flex flex-col items-center -mb-2">
            {allPerfect ? (
              <span className="text-base mb-1">🎉</span>
            ) : (
              <Crown className="w-5 h-5 text-pact-gold-light mb-1" />
            )}
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm border border-white/20">{sorted[0].avatar}</div>
            <div className="w-18 h-18 bg-pact-gold/30 border-2 border-pact-gold-light rounded-xl flex flex-col items-center justify-center mt-2 px-4 py-3">
              <span className="text-lg font-black">{sorted[0].successfulDays}/{sorted[0].totalEligibleDays}</span>
            </div>
            <p className="text-[11px] text-white/60 mt-1.5 font-medium">{sorted[0].name}</p>
          </div>
          {sorted.length >= 3 && (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">{sorted[2].avatar}</div>
              <div className="w-14 h-14 bg-white/10 rounded-xl flex flex-col items-center justify-center mt-2">
                <span className="text-sm font-black">{sorted[2].successfulDays}/{sorted[2].totalEligibleDays}</span>
              </div>
              <p className="text-[11px] text-white/60 mt-1.5 font-medium">{sorted[2].name}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-5 mt-5 space-y-2.5 overflow-y-auto pb-6">
        {sorted.map((m, i) => {
          const pct = m.totalEligibleDays > 0 ? (m.successfulDays / m.totalEligibleDays) * 100 : 0;
          const isFirst = m.successfulDays === maxScore;
          const isTied = sorted.filter((s) => s.successfulDays === m.successfulDays).length > 1;

          return (
            <div key={m.id} className="card-raised rounded-2xl p-4 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                  isFirst ? 'bg-pact-gold/15 text-pact-gold' : 'bg-pact-surface text-muted-foreground'
                }`}>
                  {isTied ? 'T' : i + 1}
                </div>
                <div className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center text-xl">{m.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-sm text-pact-charcoal">{m.name}</p>
                    {isFirst && !allPerfect && <Crown className="w-3.5 h-3.5 text-pact-gold" />}
                    {pct === 100 && (
                      <div className="streak-badge rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" />
                        <span className="text-[9px]">{m.successfulDays}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 bg-pact-surface rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          pct === 100 ? 'bg-pact-success' : pct > 0 ? 'bg-pact-green' : 'bg-pact-missed'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-pact-charcoal">{m.successfulDays}/{m.totalEligibleDays}</p>
                  <p className="text-[9px] text-muted-foreground font-medium">days</p>
                </div>
              </div>
            </div>
          );
        })}

        {allPerfect && (
          <div className="text-center p-5 bg-pact-success/5 rounded-2xl border border-pact-success/15 animate-slide-up">
            <p className="text-3xl mb-2 animate-celebrate">🎉</p>
            <p className="font-black text-pact-charcoal">Everyone&apos;s crushing it!</p>
            <p className="text-xs text-muted-foreground mt-1">Keep the streak alive.</p>
          </div>
        )}
      </div>
    </div>
  );
}
