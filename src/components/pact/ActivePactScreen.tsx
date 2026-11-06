'use client';

import { useAppStore } from '@/lib/store';
import { CONSEQUENCE_CARDS } from '@/lib/data';
import { ArrowLeft, Trophy, Activity, CheckCircle2, XCircle, Clock, ChevronRight, Flame, Home, TrendingUp, Users } from 'lucide-react';

export function ActivePactScreen() {
  const { pact, setScreen, demoState } = useAppStore();
  if (!pact) return null;

  const me = pact.members.find((m) => m.id === 'radhika')!;
  const daysElapsed = me.dailyStatus.filter((d) => d.eligible && d.status !== 'pending').length;
  const daysRemaining = me.totalEligibleDays - daysElapsed;
  const streak = me.dailyStatus.filter((d) => d.status === 'success').length;
  const saved = me.successfulDays * me.savingsPerDay;
  const hasPendingCheckIn = me.dailyStatus.some((d) => d.status === 'pending' && d.eligible);
  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === pact.consequenceId);
  const progressPct = (me.successfulDays / me.totalEligibleDays) * 100;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-pact-green text-white px-6 pt-14 pb-5 rounded-b-[1.75rem]">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setScreen('home')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <p className="font-bold text-sm">🐻 Cornell Crew</p>
          <button onClick={() => setScreen('circle-activity')} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
            <Activity className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{pact.challengeTemplate.emoji}</span>
          <div>
            <h2 className="text-lg font-black">{pact.challengeTemplate.name}</h2>
            <p className="text-xs text-white/60">Day {daysElapsed + (hasPendingCheckIn ? 1 : 0)} of {pact.totalEligibleDays}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full bg-pact-gold rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[11px] text-white/50">
          <span>{me.successfulDays}/{me.totalEligibleDays} days</span>
          <span>{daysRemaining} remaining</span>
        </div>
      </div>

      <div className="flex-1 px-5 mt-4 space-y-3.5 overflow-y-auto pb-20">
        {/* Stats row */}
        <div className="flex gap-2.5 animate-fade-in">
          <div className="flex-1 card-raised rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Flame className="w-4 h-4 text-pact-streak" />
              <span className="text-xl font-black text-pact-charcoal">{streak}</span>
            </div>
            <p className="text-[10px] font-medium text-muted-foreground">Streak</p>
          </div>
          <div className="flex-1 card-raised rounded-xl p-3 text-center">
            <p className="text-xl font-black text-pact-green">${saved}</p>
            <p className="text-[10px] font-medium text-muted-foreground">Saved</p>
          </div>
          <div className="flex-1 card-raised rounded-xl p-3 text-center">
            <p className="text-xl font-black text-pact-charcoal">{me.successfulDays}/{me.totalEligibleDays}</p>
            <p className="text-[10px] font-medium text-muted-foreground">Score</p>
          </div>
        </div>

        {/* Check-in prompt */}
        {hasPendingCheckIn && (
          <button
            onClick={() => setScreen('check-in')}
            className="w-full p-4 bg-pact-green/5 border-2 border-pact-green/20 rounded-2xl flex items-center gap-3 hover:bg-pact-green/8 transition-all animate-slide-up active:scale-[0.98]"
          >
            <div className="w-11 h-11 bg-pact-green rounded-xl flex items-center justify-center animate-bounce-subtle shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-sm text-pact-charcoal">Ready to check in?</p>
              <p className="text-[11px] text-muted-foreground">Did you avoid food delivery today?</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        )}

        {/* Daily calendar */}
        <div className="card-raised rounded-2xl p-4 animate-fade-in stagger-1">
          <p className="text-xs font-bold text-pact-charcoal mb-3 uppercase tracking-wider">This week</p>
          <div className="flex gap-1.5 justify-between">
            {me.dailyStatus.map((day, i) => {
              const date = new Date(day.date);
              const dayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()];
              const dayNum = date.getDate();
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground font-semibold">{dayName}</span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      day.status === 'success'
                        ? 'bg-pact-success text-white shadow-sm'
                        : day.status === 'missed'
                        ? 'bg-pact-missed text-white shadow-sm'
                        : day.status === 'pending'
                        ? 'bg-pact-green/10 text-pact-green border-2 border-pact-green/30'
                        : 'bg-pact-surface text-muted-foreground'
                    }`}
                  >
                    {day.status === 'success' ? (
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    ) : day.status === 'missed' ? (
                      <XCircle className="w-4.5 h-4.5" />
                    ) : day.status === 'pending' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      dayNum
                    )}
                  </div>
                  {!day.eligible && <span className="text-[8px] text-muted-foreground font-medium">off</span>}
                  {day.eligible && <span className="text-[8px] text-muted-foreground font-medium">{dayNum}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Circle standings */}
        <div className="card-raised rounded-2xl p-4 animate-fade-in stagger-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-pact-charcoal uppercase tracking-wider">Circle standings</p>
            <button onClick={() => setScreen('leaderboard')} className="text-[11px] text-pact-green font-bold">
              Full board →
            </button>
          </div>
          {pact.members
            .sort((a, b) => b.successfulDays - a.successfulDays)
            .map((m) => {
              const pct = m.totalEligibleDays > 0 ? (m.successfulDays / m.totalEligibleDays) * 100 : 0;
              return (
                <div key={m.id} className="flex items-center gap-3 py-2.5 border-t border-border/50 first:border-t-0">
                  <span className="text-lg">{m.avatar}</span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-pact-charcoal">{m.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-pact-surface rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-pact-success' : 'bg-pact-green'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-muted-foreground">{m.successfulDays}/{m.totalEligibleDays}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Consequence reminder */}
        {consequence && (
          <div className="card-raised rounded-2xl p-4 animate-fade-in stagger-3">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">On the line</p>
            <div className="flex items-center gap-3">
              <span className="text-xl">{consequence.emoji}</span>
              <div>
                <p className="text-xs font-bold text-pact-charcoal">{consequence.name}</p>
                <p className="text-[11px] text-muted-foreground">{consequence.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Temptation shield */}
        <button
          onClick={() => setScreen('app-temptation')}
          className="w-full p-3.5 bg-pact-coral/5 border border-pact-coral/15 rounded-2xl text-left hover:bg-pact-coral/8 transition-all active:scale-[0.98]"
        >
          <p className="text-xs font-bold text-pact-charcoal flex items-center gap-1.5">🛡️ Temptation Shield Active</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Monitoring DoorDash, Uber Eats
          </p>
        </button>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-around z-10">
        <button onClick={() => setScreen('home')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setScreen('active-pact')} className="flex flex-col items-center gap-0.5 text-pact-green">
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Pact</span>
        </button>
        <button onClick={() => setScreen('leaderboard')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-medium">Board</span>
        </button>
        <button onClick={() => setScreen('savings-progress')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-medium">Savings</span>
        </button>
      </div>
    </div>
  );
}
