'use client';

import { useAppStore } from '@/lib/store';
import { CONSEQUENCE_CARDS } from '@/lib/data';
import { RotateCcw, ChevronRight, Crown, Flame, Share2 } from 'lucide-react';
import { useState } from 'react';

function ShareSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full bg-white rounded-t-3xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
        <p className="text-sm font-bold text-pact-charcoal mb-4">Share your achievement</p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { icon: '💬', name: 'iMessage', color: 'bg-green-50' },
            { icon: '📱', name: 'WhatsApp', color: 'bg-emerald-50' },
            { icon: '📸', name: 'Instagram', color: 'bg-pink-50' },
            { icon: '🔗', name: 'Copy Link', color: 'bg-pact-surface' },
          ].map((opt) => (
            <button key={opt.name} className="flex flex-col items-center gap-2" onClick={onClose}>
              <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>{opt.icon}</div>
              <span className="text-[10px] text-muted-foreground font-medium">{opt.name}</span>
            </button>
          ))}
        </div>
        <div className="p-3 bg-pact-surface rounded-xl mb-3">
          <p className="text-[10px] text-muted-foreground font-mono truncate">pact.app/share/result-cornell-crew-oct</p>
        </div>
        <button onClick={onClose} className="w-full py-3 text-sm font-bold text-muted-foreground">Cancel</button>
      </div>
    </div>
  );
}

export function ResultsScreen() {
  const { pact, setScreen, consequenceAssignment } = useAppStore();
  const [showShare, setShowShare] = useState(false);
  if (!pact) return null;

  const sorted = [...pact.members].sort((a, b) => b.successfulDays - a.successfulDays);
  const allPerfect = sorted.every((m) => m.successfulDays === m.totalEligibleDays);
  const lowestScore = sorted[sorted.length - 1].successfulDays;
  const losers = sorted.filter((m) => m.successfulDays === lowestScore && m.successfulDays < m.totalEligibleDays);
  const allTiedBelow = losers.length === sorted.length && !allPerfect;
  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === pact.consequenceId);
  const me = pact.members.find((m) => m.id === 'radhika')!;
  const mySaved = me.successfulDays * me.savingsPerDay;
  const champion = sorted[0];
  const isChampion = champion.id === 'radhika' && !allPerfect && !allTiedBelow;

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto relative">
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
      {/* Hero */}
      <div className={`px-6 pt-16 pb-8 text-center relative overflow-hidden ${
        allPerfect ? 'bg-pact-success' : allTiedBelow ? 'bg-pact-gold' : isChampion ? 'bg-pact-green' : 'bg-pact-charcoal'
      } text-white`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-[10px] border-white" />
          <div className="absolute bottom-5 right-5 w-16 h-16 rounded-full border-[8px] border-white" />
        </div>
        <div className="relative z-10">
          {allPerfect ? (
            <>
              <div className="text-5xl mb-3 animate-celebrate">🎉</div>
              <h1 className="text-2xl font-black animate-fade-in">Everyone Crushed It!</h1>
              <p className="text-sm text-white/70 mt-2 animate-fade-in stagger-1">
                Perfect scores all around. No consequence needed.
              </p>
              <div className="flex justify-center gap-3 mt-4 animate-fade-in stagger-2">
                {sorted.map((m) => (
                  <div key={m.id} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">{m.avatar}</div>
                    <span className="text-[11px] font-bold mt-1.5">{m.successfulDays}/{m.totalEligibleDays}</span>
                  </div>
                ))}
              </div>
            </>
          ) : allTiedBelow ? (
            <>
              <div className="text-5xl mb-3 animate-pop">🤝</div>
              <h1 className="text-2xl font-black animate-fade-in">Group Reset</h1>
              <p className="text-sm text-white/70 mt-2 animate-fade-in stagger-1">
                Everyone tied at {lowestScore}/{sorted[0].totalEligibleDays}. No consequences.
              </p>
              <div className="flex justify-center gap-3 mt-4 animate-fade-in stagger-2">
                {sorted.map((m) => (
                  <div key={m.id} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">{m.avatar}</div>
                    <span className="text-[11px] font-bold mt-1.5">{m.successfulDays}/{m.totalEligibleDays}</span>
                  </div>
                ))}
              </div>
            </>
          ) : isChampion ? (
            <>
              <div className="relative inline-block animate-pop">
                <Crown className="w-7 h-7 text-pact-gold-light absolute -top-5 left-1/2 -translate-x-1/2" />
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">{me.avatar}</div>
              </div>
              <h1 className="text-2xl font-black mt-3 animate-fade-in">Circle Champion!</h1>
              <p className="text-sm text-white/70 mt-2 animate-fade-in stagger-1">
                You led with a perfect {me.successfulDays}/{me.totalEligibleDays}.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3 animate-pop">📊</div>
              <h1 className="text-2xl font-black animate-fade-in">Pact Complete</h1>
              <p className="text-sm text-white/70 mt-2 animate-fade-in stagger-1">
                {pact.challengeTemplate.name} is done. Here&apos;s how everyone did.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="px-5 space-y-3.5 pb-8 -mt-4 relative z-10">
        {/* Personal summary */}
        <div className="card-elevated rounded-2xl p-5 animate-fade-in stagger-2">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-3">Your Achievement</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-pact-surface rounded-xl flex items-center justify-center text-2xl">{me.avatar}</div>
            <div className="flex-1">
              <p className="font-black text-pact-charcoal">{me.successfulDays}/{me.totalEligibleDays} successful days</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-pact-green font-bold">${mySaved}</span>
                <span className="text-[11px] text-muted-foreground">→ {me.savingsGoal.emoji} {me.savingsGoal.name}</span>
              </div>
              <div className="bg-pact-surface rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="h-full bg-pact-green rounded-full transition-all duration-700"
                  style={{ width: `${(me.savingsGoal.currentAmount / me.savingsGoal.targetAmount) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                ${me.savingsGoal.currentAmount} of ${me.savingsGoal.targetAmount}
              </p>
            </div>
          </div>
          {me.successfulDays > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
              <div className="streak-badge rounded-lg px-2.5 py-1 flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span className="text-[11px]">{me.successfulDays}-day streak</span>
              </div>
            </div>
          )}
        </div>

        {/* Final standings */}
        <div className="card-raised rounded-2xl p-5 animate-fade-in stagger-3">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-3">Final Standings</p>
          {sorted.map((m, i) => {
            const isLoser = losers.some((l) => l.id === m.id);
            const isTied = sorted.filter((s) => s.successfulDays === m.successfulDays).length > 1;
            const isPerfect = m.successfulDays === m.totalEligibleDays;
            return (
              <div key={m.id} className="flex items-center gap-3 py-3 border-t border-border/50 first:border-t-0">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                  isPerfect && !allTiedBelow
                    ? 'bg-pact-success/10 text-pact-success'
                    : isLoser
                    ? 'bg-pact-missed/10 text-pact-missed'
                    : 'bg-pact-surface text-muted-foreground'
                }`}>
                  {isTied ? 'T' : i + 1}
                </div>
                <div className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center text-lg">{m.avatar}</div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-pact-charcoal">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground">${m.successfulDays * m.savingsPerDay} → {m.savingsGoal.emoji}</p>
                </div>
                <span className={`text-base font-black ${
                  isPerfect ? 'text-pact-success' : isLoser ? 'text-pact-missed' : 'text-pact-charcoal'
                }`}>
                  {m.successfulDays}/{m.totalEligibleDays}
                </span>
              </div>
            );
          })}
        </div>

        {/* Consequence card */}
        {losers.length > 0 && !allTiedBelow && consequence && (
          <div className="bg-pact-missed/5 rounded-2xl p-5 border border-pact-missed/15 animate-fade-in stagger-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{consequence.emoji}</span>
              <p className="font-bold text-sm text-pact-charcoal">{consequence.name}</p>
            </div>
            <div className="space-y-2">
              {losers.map((l) => (
                <div key={l.id} className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-pact-surface rounded-lg flex items-center justify-center text-sm">{l.avatar}</div>
                  <span className="text-xs font-bold text-pact-charcoal">{l.name}</span>
                  <span className="text-[11px] text-pact-missed font-bold ml-auto">{l.successfulDays}/{l.totalEligibleDays}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              {losers.length > 1
                ? `Both ${losers.map((l) => l.name).join(' and ')} tied for last.`
                : `${losers[0].name} finished last.`}
            </p>
            <button
              onClick={() => setScreen('consequence-assign')}
              className="mt-3 w-full py-3 bg-pact-missed text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.97]"
            >
              View Consequence <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Share achievement */}
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3.5 bg-pact-xp/10 text-pact-xp font-bold text-sm rounded-2xl hover:bg-pact-xp/15 transition-all flex items-center justify-center gap-2 active:scale-[0.97] animate-fade-in stagger-4"
        >
          <Share2 className="w-4 h-4" />
          Share Achievement
        </button>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setScreen('renew')}
            className="flex-1 py-3.5 bg-pact-green text-white font-bold text-sm rounded-2xl hover:bg-pact-green-light transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.97]"
          >
            <RotateCcw className="w-4 h-4" />
            New Pact
          </button>
          <button
            onClick={() => setScreen('weekly-recap')}
            className="flex-1 py-3.5 bg-pact-surface text-pact-charcoal font-bold text-sm rounded-2xl hover:bg-border/70 transition-all active:scale-[0.97]"
          >
            Weekly Recap
          </button>
        </div>
      </div>
    </div>
  );
}
