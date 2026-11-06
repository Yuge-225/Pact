'use client';

import { useAppStore } from '@/lib/store';
import { ArrowRight } from 'lucide-react';

export function WelcomeScreen() {
  const { setScreen } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-pact-green text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-20 -left-10 w-40 h-40 rounded-full border-[30px] border-white" />
        <div className="absolute top-60 -right-16 w-56 h-56 rounded-full border-[30px] border-white" />
        <div className="absolute bottom-40 -left-8 w-32 h-32 rounded-full border-[20px] border-white" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10">
        <div className="w-20 h-20 bg-white rounded-[1.25rem] flex items-center justify-center mb-8 animate-pop shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <span className="text-4xl">🤝</span>
        </div>

        <h1 className="text-5xl font-black tracking-tight mb-3 animate-fade-in">
          PACT
        </h1>
        <p className="text-xl text-white/90 font-semibold mb-2 animate-fade-in stagger-1">
          Save together.
        </p>
        <p className="text-sm text-white/50 leading-relaxed max-w-[260px] animate-fade-in stagger-2">
          Budgeting explains yesterday.<br />
          Pact changes the next decision.
        </p>

        <div className="mt-14 flex flex-col gap-3 w-full max-w-[300px] animate-fade-in stagger-3">
          <button
            onClick={() => setScreen('onboarding')}
            className="w-full py-4 bg-white text-pact-green font-bold rounded-2xl hover:bg-white/95 transition-all active:scale-[0.97] shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 text-[15px]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScreen('home')}
            className="w-full py-3.5 bg-white/10 text-white/90 font-semibold rounded-2xl hover:bg-white/15 transition-all active:scale-[0.97] text-[15px] backdrop-blur-sm"
          >
            I already have an account
          </button>
        </div>
      </div>

      <div className="pb-10 text-center relative z-10">
        <p className="text-[11px] text-white/30 tracking-wider uppercase">Cornell Tech Product Studio</p>
      </div>
    </div>
  );
}
