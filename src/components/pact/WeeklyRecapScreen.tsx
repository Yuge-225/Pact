'use client';

import { useAppStore } from '@/lib/store';
import { ArrowRight, Flame, TrendingUp, Users, Star, ChevronRight, Share2 } from 'lucide-react';
import { useState } from 'react';

export function WeeklyRecapScreen() {
  const { pact, setScreen } = useAppStore();
  const [showShare, setShowShare] = useState(false);
  if (!pact) return null;

  const me = pact.members.find((m) => m.id === 'radhika')!;
  const saved = me.successfulDays * me.savingsPerDay;
  const allPerfect = pact.members.every((m) => m.successfulDays === m.totalEligibleDays);
  const goalPct = ((me.savingsGoal.currentAmount / me.savingsGoal.targetAmount) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-pact-green text-white overflow-y-auto relative">
      {showShare && (
        <div className="absolute inset-0 z-30 flex items-end" onClick={() => setShowShare(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full bg-white rounded-t-3xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <p className="text-sm font-bold text-pact-charcoal mb-4">Share your week</p>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[
                { icon: '💬', name: 'iMessage', color: 'bg-green-50' },
                { icon: '📱', name: 'WhatsApp', color: 'bg-emerald-50' },
                { icon: '📸', name: 'IG Story', color: 'bg-pink-50' },
                { icon: '🔗', name: 'Copy Link', color: 'bg-gray-50' },
              ].map((opt) => (
                <button key={opt.name} className="flex flex-col items-center gap-2" onClick={() => setShowShare(false)}>
                  <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>{opt.icon}</div>
                  <span className="text-[10px] text-muted-foreground font-medium">{opt.name}</span>
                </button>
              ))}
            </div>
            <div className="p-3 bg-pact-surface rounded-xl mb-3">
              <p className="text-[10px] text-muted-foreground font-mono truncate">pact.app/recap/radhika-week-oct5</p>
            </div>
            <button onClick={() => setShowShare(false)} className="w-full py-3 text-sm font-bold text-muted-foreground">Cancel</button>
          </div>
        </div>
      )}
      <div className="px-6 pt-14 pb-4">
        <p className="text-[11px] text-white/50 font-semibold uppercase tracking-wider">Weekly Recap</p>
        <h1 className="text-2xl font-black mt-1">Your Week in Review</h1>
        <p className="text-xs text-white/40 mt-1">Oct 5 – Oct 11, 2026</p>
      </div>

      <div className="px-6 space-y-3.5 pb-8">
        {/* Hero stat */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center animate-fade-in">
          <p className="text-5xl font-black animate-count-up">${saved}</p>
          <p className="text-sm text-white/60 mt-1 font-medium">saved this week</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="streak-badge rounded-full px-3 py-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{me.successfulDays}-day streak</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2.5 animate-fade-in stagger-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-pact-gold-light" />
            </div>
            <div>
              <p className="font-bold text-sm">
                {me.successfulDays}/{me.totalEligibleDays} days completed
              </p>
              <p className="text-[11px] text-white/50">{me.successfulDays === me.totalEligibleDays ? 'Perfect score!' : 'Great effort this week'}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-pact-gold-light" />
            </div>
            <div>
              <p className="font-bold text-sm">
                {me.savingsGoal.emoji} {goalPct}% toward {me.savingsGoal.name}
              </p>
              <p className="text-[11px] text-white/50">${me.savingsGoal.currentAmount} of ${me.savingsGoal.targetAmount}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-pact-gold-light" />
            </div>
            <div>
              <p className="font-bold text-sm">
                {allPerfect ? '🎉 Cornell Crew went perfect!' : '🐻 Cornell Crew stayed strong'}
              </p>
              <p className="text-[11px] text-white/50">
                {pact.members.map((m) => `${m.name} ${m.successfulDays}/${m.totalEligibleDays}`).join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Suggested next */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 animate-fade-in stagger-2">
          <p className="text-xs font-bold mb-3 uppercase tracking-wider text-white/70">Suggested Next Challenges</p>
          <div className="space-y-2">
            {[
              { emoji: '🍕', name: 'Delivery Detox: Round 2', desc: 'Keep the momentum going' },
              { emoji: '☕', name: 'Coffee at Home', desc: 'Try a new challenge' },
              { emoji: '🛍️', name: 'Shopping Reset', desc: 'Tackle a different category' },
            ].map((c) => (
              <button
                key={c.name}
                onClick={() => setScreen('renew')}
                className="w-full flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors active:scale-[0.98]"
              >
                <span className="text-lg">{c.emoji}</span>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-[11px] text-white/40">{c.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30" />
              </button>
            ))}
          </div>
        </div>

        {/* Share */}
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3.5 bg-white/15 text-white font-bold text-sm rounded-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 active:scale-[0.97] animate-fade-in stagger-3"
        >
          <Share2 className="w-4 h-4" />
          Share Your Week
        </button>

        {/* CTA */}
        <button
          onClick={() => setScreen('renew')}
          className="w-full py-4 bg-white text-pact-green font-bold rounded-2xl hover:bg-white/95 transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
        >
          Start Next Pact <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setScreen('home')}
          className="w-full py-3 text-white/40 text-xs hover:text-white/60 transition-colors font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
