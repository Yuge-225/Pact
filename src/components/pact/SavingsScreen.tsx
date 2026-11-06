'use client';

import { useAppStore } from '@/lib/store';
import { ArrowLeft, TrendingUp, Target, Calendar, Flame } from 'lucide-react';

export function SavingsProgressScreen() {
  const { pact, setScreen } = useAppStore();

  const me = pact?.members.find((m) => m.id === 'radhika');
  const goal = me?.savingsGoal || { name: 'Italy Trip', emoji: '✈️', targetAmount: 2000, currentAmount: 370, id: 'italy' };
  const allTimeSaved = goal.currentAmount;
  const pct = (allTimeSaved / goal.targetAmount) * 100;

  const history = [
    { label: 'Delivery Detox #3', days: '4/4', saved: 40, date: 'Oct 5–11' },
    { label: 'Delivery Detox #2', days: '3/4', saved: 30, date: 'Sep 28–Oct 4' },
    { label: 'Coffee at Home', days: '5/5', saved: 50, date: 'Sep 15–21' },
    { label: 'Delivery Detox #1', days: '4/4', saved: 40, date: 'Sep 1–7' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen(pact ? 'active-pact' : 'home')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Savings Progress</h2>
      </div>

      <div className="flex-1 px-5 mt-4 space-y-3.5 overflow-y-auto pb-6">
        {/* Main goal card */}
        <div className="bg-pact-green rounded-2xl p-5 text-white animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm">{goal.emoji}</div>
              <div>
                <p className="font-bold text-sm">{goal.name}</p>
                <p className="text-[11px] text-white/50">Personal savings goal</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-black">${allTimeSaved}</span>
              <span className="text-white/40 text-sm">/ ${goal.targetAmount}</span>
            </div>

            <div className="bg-white/10 rounded-full h-2.5 mt-4 overflow-hidden">
              <div
                className="h-full bg-pact-gold rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-white/50 mt-1.5">{pct.toFixed(1)}% complete</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 animate-fade-in stagger-1">
          <div className="card-raised rounded-xl p-3 text-center">
            <TrendingUp className="w-4 h-4 text-pact-green mx-auto mb-1" />
            <p className="text-base font-black text-pact-charcoal">${allTimeSaved}</p>
            <p className="text-[9px] font-medium text-muted-foreground">Total saved</p>
          </div>
          <div className="card-raised rounded-xl p-3 text-center">
            <Target className="w-4 h-4 text-pact-coral mx-auto mb-1" />
            <p className="text-base font-black text-pact-charcoal">4</p>
            <p className="text-[9px] font-medium text-muted-foreground">Pacts done</p>
          </div>
          <div className="card-raised rounded-xl p-3 text-center">
            <Flame className="w-4 h-4 text-pact-streak mx-auto mb-1" />
            <p className="text-base font-black text-pact-charcoal">16</p>
            <p className="text-[9px] font-medium text-muted-foreground">Success days</p>
          </div>
        </div>

        {/* Simulated account */}
        <div className="card-raised rounded-2xl p-4 animate-fade-in stagger-2">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-3">Simulated Accounts</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 py-2">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-base">🏦</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-pact-charcoal">Checking ••4523</p>
                <p className="text-[10px] text-muted-foreground">Source account</p>
              </div>
              <p className="text-xs text-muted-foreground font-medium">$2,340</p>
            </div>
            <div className="flex items-center gap-3 py-2 border-t border-border/50">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-base">💰</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-pact-charcoal">Pact Savings ••7891</p>
                <p className="text-[10px] text-muted-foreground">Destination account</p>
              </div>
              <p className="text-xs font-bold text-pact-green">${allTimeSaved}</p>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground mt-3 italic">
            All balances and transfers are simulated. No real money moved.
          </p>
        </div>

        {/* History */}
        <div className="card-raised rounded-2xl p-4 animate-fade-in stagger-3">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-3">Pact History</p>
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-t border-border/50 first:border-t-0">
              <div className="flex-1">
                <p className="text-xs font-bold text-pact-charcoal">{h.label}</p>
                <p className="text-[10px] text-muted-foreground">{h.date} · {h.days} days</p>
              </div>
              <span className="text-xs font-black text-pact-green">+${h.saved}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
