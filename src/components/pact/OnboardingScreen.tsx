'use client';

import { useAppStore } from '@/lib/store';
import { ArrowRight, Users, Target, Shield, ArrowLeft, CheckCircle2, Building2, Loader2 } from 'lucide-react';
import { useState } from 'react';

const STEPS = [
  {
    icon: Users,
    title: 'Make a Pact with friends',
    description: 'Choose a spending behavior to change together. Same challenge, same rules, same timeline.',
    color: 'bg-pact-green',
  },
  {
    icon: Target,
    title: 'Every day counts',
    description: 'Each successful day allocates money toward your personal savings goal. Your progress is yours.',
    color: 'bg-pact-coral',
  },
  {
    icon: Shield,
    title: 'Playful accountability',
    description: 'Finish last? Complete a fun, pre-agreed dare. No money lost, no shame — just laughs.',
    color: 'bg-pact-gold',
  },
];

const GOALS = [
  { emoji: '✈️', name: 'Travel', examples: 'Italy, Japan, road trip', target: 2000 },
  { emoji: '💻', name: 'Tech', examples: 'Laptop, headphones, tablet', target: 1500 },
  { emoji: '🛡️', name: 'Emergency Fund', examples: 'Rainy day, safety net', target: 3000 },
  { emoji: '🎓', name: 'Student Loans', examples: 'Extra payment, freedom', target: 5000 },
  { emoji: '🏠', name: 'Housing', examples: 'Deposit, furniture, move', target: 4000 },
  { emoji: '🎁', name: 'Something Special', examples: 'Gift, experience, treat', target: 500 },
];

const BANKS = [
  { name: 'Chase', icon: '🏦', color: 'bg-blue-50' },
  { name: 'Bank of America', icon: '🔴', color: 'bg-red-50' },
  { name: 'Wells Fargo', icon: '🟡', color: 'bg-yellow-50' },
  { name: 'Capital One', icon: '💳', color: 'bg-orange-50' },
  { name: 'Citi', icon: '🔵', color: 'bg-sky-50' },
];

export function OnboardingScreen() {
  const { screen, setScreen, setUserGoal } = useAppStore();
  const [step, setStep] = useState(0);
  const [bankState, setBankState] = useState<'select' | 'connecting' | 'connected'>('select');
  const [selectedBank, setSelectedBank] = useState('');

  if (screen === 'onboarding-goal') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="px-6 pt-14 pb-4">
          <button onClick={() => setScreen('onboarding')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-xl font-black text-pact-charcoal mt-4">What are you saving for?</h2>
          <p className="text-xs text-muted-foreground mt-1">Pick a goal to get motivated. You can change this anytime.</p>
        </div>
        <div className="flex-1 px-6 space-y-2.5 overflow-y-auto pb-6">
          {GOALS.map((goal) => (
            <button
              key={goal.name}
              onClick={() => {
                setUserGoal({ name: goal.name, emoji: goal.emoji, target: goal.target });
                setScreen('onboarding-account');
              }}
              className="w-full flex items-center gap-4 p-4 card-raised rounded-2xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-pact-surface rounded-xl flex items-center justify-center text-2xl">{goal.emoji}</div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm text-pact-charcoal">{goal.name}</p>
                <p className="text-[11px] text-muted-foreground">{goal.examples}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'onboarding-account') {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="px-6 pt-14 pb-4">
          <button onClick={() => setScreen('onboarding-goal')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-xl font-black text-pact-charcoal mt-4">Connect your savings</h2>
          <p className="text-xs text-muted-foreground mt-1">Link an account where your savings will go.</p>
        </div>
        <div className="flex-1 px-6">
          <div className="space-y-2.5 mt-2">
            <button
              onClick={() => setScreen('onboarding-bank')}
              className="w-full flex items-center gap-4 p-4 card-raised rounded-2xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg">🏦</div>
              <div className="text-left">
                <p className="font-bold text-sm text-pact-charcoal">Connect Bank</p>
                <p className="text-[11px] text-muted-foreground">Checking & savings accounts</p>
              </div>
            </button>
            <button
              onClick={() => setScreen('onboarding-bank')}
              className="w-full flex items-center gap-4 p-4 card-raised rounded-2xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-lg">💳</div>
              <div className="text-left">
                <p className="font-bold text-sm text-pact-charcoal">Connect Card</p>
                <p className="text-[11px] text-muted-foreground">Track spending categories</p>
              </div>
            </button>
          </div>

          <div className="mt-6 p-4 bg-pact-success/5 rounded-2xl border border-pact-success/10">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-pact-success mt-0.5" />
              <div>
                <p className="text-xs font-bold text-pact-charcoal">Simulated in this demo</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  No real bank connections. All money movement is simulated to show how Pact would work.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen('home')}
            className="w-full mt-6 py-3 text-xs text-muted-foreground hover:text-pact-charcoal transition-colors font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'onboarding-bank') {
    if (bankState === 'connecting') {
      return (
        <div className="h-full flex flex-col bg-white items-center justify-center px-8 text-center">
          <div className="w-16 h-16 bg-pact-surface rounded-2xl flex items-center justify-center mb-6 animate-pulse">
            <Loader2 className="w-8 h-8 text-pact-green animate-spin" />
          </div>
          <h2 className="text-xl font-black text-pact-charcoal">Connecting to {selectedBank}...</h2>
          <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">Securely linking your account. This usually takes a few seconds.</p>
          <div className="mt-8 space-y-3 w-full max-w-[260px]">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-pact-success" />
              <p className="text-xs text-pact-charcoal font-medium">Identity verified</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-pact-success" />
              <p className="text-xs text-pact-charcoal font-medium">Account found</p>
            </div>
            <div className="flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-pact-gold animate-spin" />
              <p className="text-xs text-muted-foreground font-medium">Establishing secure link...</p>
            </div>
          </div>
        </div>
      );
    }

    if (bankState === 'connected') {
      return (
        <div className="h-full flex flex-col bg-white items-center justify-center px-8 text-center">
          <div className="w-20 h-20 bg-pact-success rounded-2xl flex items-center justify-center mb-5 animate-pop shadow-[0_8px_24px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-pact-charcoal animate-fade-in">Connected!</h2>
          <p className="text-sm text-muted-foreground mt-2 animate-fade-in stagger-1 max-w-[240px]">
            {selectedBank} is linked. Your savings will be tracked here.
          </p>

          <div className="mt-6 w-full max-w-[280px] animate-fade-in stagger-2">
            <div className="card-raised rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pact-success/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-pact-success" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-pact-charcoal">{selectedBank}</p>
                  <p className="text-[11px] text-pact-success font-semibold">Checking ****4829</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-pact-success ml-auto" />
              </div>
            </div>
          </div>

          <div className="mt-3 w-full max-w-[280px] animate-fade-in stagger-2">
            <div className="p-3 bg-pact-surface rounded-xl">
              <p className="text-[10px] text-muted-foreground text-center">
                Simulated connection. No real bank data is accessed.
              </p>
            </div>
          </div>

          <button
            onClick={() => setScreen('home')}
            className="mt-6 px-8 py-3.5 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] animate-fade-in stagger-3 shadow-sm"
          >
            Continue
          </button>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="px-6 pt-14 pb-4">
          <button onClick={() => { setBankState('select'); setScreen('onboarding-account'); }} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h2 className="text-xl font-black text-pact-charcoal mt-4">Select your bank</h2>
          <p className="text-xs text-muted-foreground mt-1">Choose where to track your savings.</p>
        </div>
        <div className="flex-1 px-6 space-y-2 overflow-y-auto pb-6">
          {BANKS.map((bank) => (
            <button
              key={bank.name}
              onClick={() => {
                setSelectedBank(bank.name);
                setBankState('connecting');
                setTimeout(() => setBankState('connected'), 2000);
              }}
              className="w-full flex items-center gap-4 p-4 card-raised rounded-2xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <div className={`w-10 h-10 ${bank.color} rounded-xl flex items-center justify-center text-lg`}>
                {bank.icon}
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-sm text-pact-charcoal">{bank.name}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}

          <div className="mt-4 p-3 bg-pact-surface rounded-xl">
            <p className="text-[10px] text-muted-foreground text-center">
              🔒 256-bit encryption. Pact never stores your credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className={`w-16 h-16 ${STEPS[step].color} rounded-2xl flex items-center justify-center mb-8 animate-pop shadow-sm`}>
          {(() => {
            const Icon = STEPS[step].icon;
            return <Icon className="w-8 h-8 text-white" />;
          })()}
        </div>

        <h2 className="text-2xl font-black text-pact-charcoal text-center mb-3 animate-fade-in">
          {STEPS[step].title}
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-[260px] animate-fade-in stagger-1">
          {STEPS[step].description}
        </p>
      </div>

      <div className="px-8 pb-10">
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-pact-green' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (step < STEPS.length - 1) setStep(step + 1);
            else setScreen('onboarding-goal');
          }}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm"
        >
          {step < STEPS.length - 1 ? 'Next' : 'Choose Your Goal'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
