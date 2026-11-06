'use client';

import { useAppStore } from '@/lib/store';
import { CHALLENGE_TEMPLATES, CONSEQUENCE_CARDS, DAY_NAMES, calculateEligibleDaysInRange } from '@/lib/data';
import { ArrowLeft, ArrowRight, Check, Users, Minus, Plus, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i <= current ? 'w-6 bg-pact-green' : 'w-1.5 bg-border'
          }`}
        />
      ))}
    </div>
  );
}

export function DiscoverScreen() {
  const { setScreen, setSelectedTemplateId } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14 pb-4">
        <button onClick={() => setScreen('home')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-black text-pact-charcoal">Choose a Challenge</h1>
        <p className="text-xs text-muted-foreground mt-1">Pick a spending habit to tackle together.</p>
      </div>

      <div className="flex-1 px-5 space-y-2.5 pb-6 overflow-y-auto">
        {CHALLENGE_TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTemplateId(t.id);
              setScreen('create-duration');
            }}
            className="w-full flex items-start gap-3.5 p-4 card-raised rounded-2xl hover:shadow-lg transition-all text-left active:scale-[0.98]"
          >
            <div className="w-11 h-11 bg-pact-surface rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{t.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-pact-charcoal">{t.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.description}</p>
              {t.suggestedApps.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.suggestedApps.map((app) => (
                    <span key={app} className="px-2 py-0.5 bg-pact-surface rounded-md text-[10px] text-muted-foreground font-medium">
                      {app}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function DurationScreen() {
  const { setScreen, selectedDuration, setSelectedDuration, selectedEligibleDays, toggleEligibleDay, selectedTemplateId } = useAppStore();
  const template = CHALLENGE_TEMPLATES.find((t) => t.id === selectedTemplateId) || CHALLENGE_TEMPLATES[0];
  const durations = [7, 14, 30];

  const today = new Date().toISOString().split('T')[0];
  const eligibleCount = calculateEligibleDaysInRange(today, selectedDuration, selectedEligibleDays);
  const isValid = eligibleCount > 0;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('discover')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <StepIndicator current={0} total={5} />
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Set your schedule</h2>
        <p className="text-xs text-muted-foreground mt-1">{template.emoji} {template.name}</p>
      </div>

      <div className="flex-1 px-6 mt-6">
        <p className="text-xs font-bold text-pact-charcoal mb-3 uppercase tracking-wider">Duration</p>
        <div className="flex gap-2">
          {durations.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDuration(d)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.97] ${
                selectedDuration === d
                  ? 'bg-pact-green text-white shadow-sm'
                  : 'bg-pact-surface text-pact-charcoal hover:bg-border'
              }`}
            >
              {d} days
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-pact-charcoal mt-6 mb-2 uppercase tracking-wider">Active days</p>
        <p className="text-[11px] text-muted-foreground mb-3">Which days does the challenge apply?</p>
        <div className="flex gap-1.5">
          {DAY_NAMES.map((name, i) => (
            <button
              key={i}
              onClick={() => toggleEligibleDay(i)}
              className={`w-11 h-11 rounded-xl text-xs font-bold transition-all active:scale-[0.95] ${
                selectedEligibleDays.includes(i)
                  ? 'bg-pact-green text-white shadow-sm'
                  : 'bg-pact-surface text-muted-foreground hover:bg-border'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className={`mt-6 p-4 rounded-2xl ${isValid ? 'bg-pact-success/5 border border-pact-success/10' : 'bg-pact-missed/5 border border-pact-missed/15'}`}>
          {isValid ? (
            <p className="text-xs text-pact-charcoal">
              <span className="font-black">{eligibleCount} eligible days</span> in {selectedDuration} days
            </p>
          ) : (
            <div className="flex items-center gap-2 text-pact-missed">
              <AlertCircle className="w-4 h-4" />
              <p className="text-xs font-bold">Select at least one active day</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => setScreen('create-circle')}
          disabled={!isValid}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function CircleScreen() {
  const { setScreen } = useAppStore();
  const [selected, setSelected] = useState('cornell-crew');

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('create-duration')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <StepIndicator current={1} total={5} />
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Choose your Circle</h2>
        <p className="text-xs text-muted-foreground mt-1">Who are you doing this with?</p>
      </div>

      <div className="flex-1 px-5 mt-6 space-y-2.5">
        <button
          onClick={() => setSelected('cornell-crew')}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${
            selected === 'cornell-crew' ? 'border-pact-green bg-pact-green/5 shadow-md' : 'card-raised'
          }`}
        >
          <span className="text-2xl">🐻</span>
          <div className="text-left flex-1">
            <p className="font-bold text-sm text-pact-charcoal">Cornell Crew</p>
            <p className="text-[10px] text-muted-foreground">3 members</p>
          </div>
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👩🏽</div>
            <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👨🏽</div>
            <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👨🏻</div>
          </div>
          {selected === 'cornell-crew' && (
            <div className="w-6 h-6 bg-pact-green rounded-full flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border border-dashed border-border text-left bg-pact-surface/50">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-bold text-sm text-pact-charcoal">Create New Circle</p>
            <p className="text-[10px] text-muted-foreground">Invite friends by name or phone</p>
          </div>
          <Plus className="w-4 h-4 text-muted-foreground ml-auto" />
        </button>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => setScreen('create-consequence')}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ConsequenceScreen() {
  const { setScreen, selectedConsequenceId, setSelectedConsequenceId } = useAppStore();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('create-circle')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <StepIndicator current={2} total={5} />
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Pick a consequence</h2>
        <p className="text-xs text-muted-foreground mt-1">Last place does this. All playful, no money.</p>
      </div>

      <div className="flex-1 px-5 mt-4 space-y-2 overflow-y-auto pb-4">
        {CONSEQUENCE_CARDS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedConsequenceId(c.id)}
            className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border transition-all text-left active:scale-[0.98] ${
              selectedConsequenceId === c.id ? 'border-pact-green bg-pact-green/5 shadow-md' : 'card-raised'
            }`}
          >
            <div className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center text-xl flex-shrink-0">{c.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-pact-charcoal">{c.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{c.description}</p>
              <p className="text-[10px] text-pact-green/70 italic mt-1">e.g. {c.example}</p>
            </div>
            {selectedConsequenceId === c.id && (
              <div className="w-5 h-5 bg-pact-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => setScreen('create-savings')}
          disabled={!selectedConsequenceId}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function SavingsScreen() {
  const { setScreen, selectedSavingsPerDay, setSelectedSavingsPerDay, selectedDuration, selectedEligibleDays } = useAppStore();

  const today = new Date().toISOString().split('T')[0];
  const eligibleCount = calculateEligibleDaysInRange(today, selectedDuration, selectedEligibleDays);
  const totalPotential = selectedSavingsPerDay * eligibleCount;

  const GOALS = [
    { emoji: '✈️', name: 'Italy Trip', target: 2000 },
    { emoji: '💻', name: 'New Laptop', target: 1500 },
    { emoji: '🛡️', name: 'Emergency Fund', target: 1000 },
    { emoji: '🎓', name: 'Student Loans', target: 5000 },
    { emoji: '✨', name: 'Custom Goal', target: 500 },
  ];

  const [selectedGoal, setSelectedGoal] = useState(0);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('create-consequence')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <StepIndicator current={3} total={5} />
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Your savings</h2>
        <p className="text-xs text-muted-foreground mt-1">How much to save per successful day.</p>
      </div>

      <div className="flex-1 px-5 mt-5 overflow-y-auto pb-4">
        <div className="card-raised rounded-2xl p-5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Per successful day</p>
          <div className="flex items-center justify-center gap-5 mt-4">
            <button
              onClick={() => setSelectedSavingsPerDay(Math.max(1, selectedSavingsPerDay - 1))}
              className="w-10 h-10 rounded-xl bg-pact-surface flex items-center justify-center hover:bg-border transition-colors active:scale-[0.95]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-5xl font-black text-pact-green">${selectedSavingsPerDay}</span>
            <button
              onClick={() => setSelectedSavingsPerDay(selectedSavingsPerDay + 1)}
              className="w-10 h-10 rounded-xl bg-pact-surface flex items-center justify-center hover:bg-border transition-colors active:scale-[0.95]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            {[5, 10, 15, 20].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedSavingsPerDay(amount)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-[0.95] ${
                  selectedSavingsPerDay === amount
                    ? 'bg-pact-green text-white'
                    : 'bg-pact-surface text-pact-charcoal hover:bg-border'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-pact-success/5 rounded-xl border border-pact-success/10">
          <p className="text-xs text-pact-charcoal">
            Nail all <span className="font-black">{eligibleCount} days</span> = <span className="font-black text-pact-green">${totalPotential}</span> saved
          </p>
        </div>

        <p className="text-xs font-bold text-pact-charcoal mt-5 mb-3 uppercase tracking-wider">Saving toward</p>
        <div className="space-y-2">
          {GOALS.map((g, i) => (
            <button
              key={g.name}
              onClick={() => {
                setSelectedGoal(i);
                useAppStore.getState().setSelectedGoalName(g.name);
                useAppStore.getState().setSelectedGoalEmoji(g.emoji);
                useAppStore.getState().setSelectedGoalTarget(g.target);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] ${
                selectedGoal === i ? 'border-pact-green bg-pact-green/5' : 'card-flat'
              }`}
            >
              <span className="text-lg">{g.emoji}</span>
              <span className="text-xs font-bold text-pact-charcoal">{g.name}</span>
              {selectedGoal === i && (
                <Check className="w-4 h-4 text-pact-green ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 mt-2">
        <button
          onClick={() => setScreen('create-review')}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] flex items-center justify-center gap-2 shadow-sm"
        >
          Review Pact <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ReviewScreen() {
  const store = useAppStore();
  const template = CHALLENGE_TEMPLATES.find((t) => t.id === store.selectedTemplateId) || CHALLENGE_TEMPLATES[0];
  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === store.selectedConsequenceId) || CONSEQUENCE_CARDS[0];

  const today = new Date().toISOString().split('T')[0];
  const eligibleCount = calculateEligibleDaysInRange(today, store.selectedDuration, store.selectedEligibleDays);
  const activeDayNames = store.selectedEligibleDays.map((d) => DAY_NAMES[d]).join(', ');

  const handleStart = () => {
    store.applyDemoScenario('active_pact');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => store.setScreen('create-savings')} className="text-xs text-muted-foreground mb-3 flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <StepIndicator current={4} total={5} />
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Review your Pact</h2>
      </div>

      <div className="flex-1 px-5 mt-4 space-y-3 overflow-y-auto pb-4">
        <div className="card-raised rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center text-xl">{template.emoji}</div>
            <div>
              <p className="font-bold text-sm text-pact-charcoal">{template.name}</p>
              <p className="text-[10px] text-muted-foreground">{template.description}</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-bold text-pact-charcoal">{store.selectedDuration} days</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-muted-foreground">Active days</span>
              <span className="font-bold text-pact-charcoal">{activeDayNames}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-border/50">
              <span className="text-muted-foreground">Eligible days</span>
              <span className="font-black text-pact-green">{eligibleCount}</span>
            </div>
          </div>
        </div>

        <div className="card-raised rounded-2xl p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Circle</p>
          <div className="flex items-center gap-3">
            <span className="text-xl">🐻</span>
            <div>
              <p className="font-bold text-xs text-pact-charcoal">Cornell Crew</p>
              <div className="flex gap-1 mt-1">
                <div className="w-5 h-5 rounded-full bg-pact-surface flex items-center justify-center text-[10px]">👩🏽</div>
                <div className="w-5 h-5 rounded-full bg-pact-surface flex items-center justify-center text-[10px]">👨🏽</div>
                <div className="w-5 h-5 rounded-full bg-pact-surface flex items-center justify-center text-[10px]">👨🏻</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-raised rounded-2xl p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">If someone finishes last</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-pact-surface rounded-xl flex items-center justify-center text-lg">{consequence.emoji}</div>
            <div>
              <p className="font-bold text-xs text-pact-charcoal">{consequence.name}</p>
              <p className="text-[10px] text-muted-foreground">{consequence.description}</p>
            </div>
          </div>
        </div>

        <div className="card-raised rounded-2xl p-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Your savings</p>
          <p className="font-bold text-sm text-pact-charcoal">${store.selectedSavingsPerDay}/day → {store.selectedGoalEmoji} {store.selectedGoalName || 'Italy Trip'}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Up to ${store.selectedSavingsPerDay * eligibleCount} this Pact</p>
        </div>

        <div className="p-3 bg-pact-gold/10 rounded-xl border border-pact-gold/15">
          <p className="text-[11px] text-pact-charcoal">
            <span className="font-bold">Everyone follows the same rules.</span>{' '}
            Each member picks their own savings amount and goal.
          </p>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={handleStart}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] animate-pulse-glow shadow-sm"
        >
          🤝 Start Pact
        </button>
      </div>
    </div>
  );
}
