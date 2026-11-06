'use client';

import { useAppStore } from '@/lib/store';
import { Shield, X } from 'lucide-react';

export function AppTemptationScreen() {
  const { pact, setScreen } = useAppStore();
  if (!pact) return null;

  const me = pact.members.find((m) => m.id === 'radhika')!;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1A] text-white">
      {/* Fake app header */}
      <div className="px-6 pt-14 flex items-center justify-between opacity-20">
        <span className="text-lg font-bold text-orange-500">DoorDash</span>
        <X className="w-5 h-5" />
      </div>

      {/* Overlay */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 text-center w-full animate-scale-in border border-white/10 shadow-[0_16px_64px_rgba(0,0,0,0.4)]">
          <div className="w-14 h-14 bg-pact-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Shield className="w-7 h-7 text-white" />
          </div>

          <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">Wednesday, 6:45 PM</p>

          <h2 className="text-2xl font-black mt-3 animate-fade-in">
            You&apos;re {me.successfulDays} of {me.totalEligibleDays} days in.
          </h2>

          <p className="text-white/60 mt-3 text-sm animate-fade-in stagger-1">
            🐻 Cornell Crew is doing this with you.
          </p>

          <p className="text-base mt-2 font-semibold animate-fade-in stagger-2">
            Remember {me.savingsGoal.emoji} {me.savingsGoal.name}?
          </p>

          <div className="mt-3 p-3 bg-white/5 rounded-xl animate-fade-in stagger-3 border border-white/5">
            <p className="text-xs text-white/50">
              ${me.savingsPerDay} saved if you keep your Pact today
            </p>
          </div>

          <div className="mt-6 space-y-3 animate-fade-in stagger-4">
            <button
              onClick={() => setScreen('active-pact')}
              className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] shadow-[0_4px_16px_rgba(27,67,50,0.4)]"
            >
              🤝 Keep My Pact
            </button>
            <button
              onClick={() => setScreen('active-pact')}
              className="w-full py-3 text-white/30 text-xs hover:text-white/50 transition-colors font-medium"
            >
              Break Pact & Continue
            </button>
          </div>

          <p className="text-[9px] text-white/20 mt-4 uppercase tracking-wider">
            In-app simulation, not real app interception
          </p>
        </div>
      </div>
    </div>
  );
}
