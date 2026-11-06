'use client';

import { useAppStore } from '@/lib/store';
import { ArrowLeft, CheckCircle2, XCircle, ShieldCheck, Flame } from 'lucide-react';
import { useState } from 'react';

export function CheckInScreen() {
  const { pact, setScreen, performCheckIn } = useAppStore();
  const [confirming, setConfirming] = useState<'success' | 'miss' | null>(null);
  const [done, setDone] = useState(false);

  if (!pact) return null;
  const me = pact.members.find((m) => m.id === 'radhika')!;

  if (done) {
    const isSuccess = confirming === 'success';
    const newStreak = me.successfulDays + (isSuccess ? 1 : 0);
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 text-center bg-white">
        {isSuccess ? (
          <>
            <div className="relative animate-pop">
              <div className="w-24 h-24 streak-badge-lg rounded-3xl flex items-center justify-center">
                <Flame className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="mt-5 animate-count-up">
              <span className="text-5xl font-black text-pact-charcoal">{newStreak}</span>
              <p className="text-sm font-bold text-pact-streak mt-1">day streak!</p>
            </div>
            <p className="text-sm text-muted-foreground mt-3 animate-fade-in stagger-1">
              ${me.savingsPerDay} saved toward {me.savingsGoal.emoji} {me.savingsGoal.name}
            </p>
            <div className="mt-4 flex items-center gap-2 animate-fade-in stagger-2">
              <div className="flex -space-x-1.5">
                {pact.members.filter(m => m.id !== 'radhika').map(m => (
                  <div key={m.id} className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">{m.avatar}</div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Your crew is proud</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-pact-surface rounded-3xl flex items-center justify-center animate-pop">
              <XCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black text-pact-charcoal mt-5 animate-fade-in">It happens.</h2>
            <p className="text-sm text-muted-foreground mt-2 animate-fade-in stagger-1">
              Tomorrow is a fresh start. Your Circle is still with you.
            </p>
          </>
        )}
        <button
          onClick={() => setScreen('active-pact')}
          className="mt-8 px-8 py-3.5 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] animate-fade-in stagger-3 shadow-sm"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('active-pact')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-16 h-16 bg-pact-green rounded-2xl flex items-center justify-center mb-5 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-black text-pact-charcoal">Daily Check-in</h2>
        <p className="text-base text-muted-foreground mt-2 font-medium">Did you avoid food delivery today?</p>

        <div className="mt-3 p-3 bg-pact-success/5 rounded-xl border border-pact-success/10">
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 justify-center">
            <ShieldCheck className="w-3 h-3 text-pact-success" /> No matching transactions detected
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 w-full max-w-[280px]">
          {confirming === null ? (
            <>
              <button
                onClick={() => setConfirming('success')}
                className="w-full py-4 bg-pact-success text-white font-bold rounded-2xl hover:opacity-90 transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(34,197,94,0.3)]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Yes, I kept my Pact!
              </button>
              <button
                onClick={() => setConfirming('miss')}
                className="w-full py-4 bg-white border-2 border-pact-missed/30 text-pact-missed font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-[0.97] flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                No, I slipped today
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                {confirming === 'success'
                  ? 'Confirming your successful day...'
                  : 'Honesty is what makes Pact work.'}
              </p>
              <button
                onClick={() => {
                  performCheckIn(confirming === 'success');
                  setDone(true);
                }}
                className={`w-full py-4 font-bold rounded-2xl transition-all active:scale-[0.97] shadow-sm ${
                  confirming === 'success'
                    ? 'bg-pact-success text-white'
                    : 'bg-pact-missed text-white'
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirming(null)}
                className="text-xs text-muted-foreground font-medium"
              >
                Go back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
