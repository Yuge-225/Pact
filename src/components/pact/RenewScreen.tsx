'use client';

import { useAppStore } from '@/lib/store';
import { CHALLENGE_TEMPLATES } from '@/lib/data';
import { ArrowLeft, RotateCcw, Sparkles, ArrowRight, Users, Clock, Flame } from 'lucide-react';
import { useState } from 'react';

export function RenewScreen() {
  const { pact, setScreen } = useAppStore();
  const [mode, setMode] = useState<'renew' | 'new'>('renew');
  const [renewed, setRenewed] = useState(false);

  if (renewed) {
    return (
      <div className="h-full flex flex-col bg-white items-center justify-center px-8 text-center">
        <div className="relative animate-pop">
          <div className="w-20 h-20 bg-pact-success rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(34,197,94,0.3)]">
            <span className="text-4xl">🤝</span>
          </div>
        </div>
        <h2 className="text-2xl font-black text-pact-charcoal mt-5 animate-fade-in">Pact Launched!</h2>
        <p className="text-sm text-muted-foreground mt-2 animate-fade-in stagger-1 max-w-[240px]">
          Cornell Crew is ready. The challenge starts now.
        </p>

        <div className="mt-6 w-full max-w-[280px] animate-fade-in stagger-2">
          <div className="card-raised rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{pact?.challengeTemplate.emoji || '🍕'}</span>
              <div className="text-left">
                <p className="text-sm font-bold text-pact-charcoal">{pact?.challengeTemplate.name || 'Delivery Detox'}</p>
                <p className="text-[11px] text-muted-foreground">{pact?.duration || 7} days with Cornell Crew</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
              <div className="flex -space-x-1.5">
                <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👩🏽</div>
                <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👨🏽</div>
                <div className="w-6 h-6 rounded-full bg-pact-surface flex items-center justify-center text-xs border-2 border-white">👨🏻</div>
              </div>
              <span className="text-[11px] text-pact-success font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" /> All in
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setScreen('home')}
          className="mt-6 px-8 py-3.5 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] animate-fade-in stagger-3 shadow-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen(pact ? 'results' : 'home')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Start Another Pact</h2>
        <p className="text-xs text-muted-foreground mt-1">Keep the momentum going.</p>
      </div>

      <div className="flex-1 px-6 mt-5 space-y-3 overflow-y-auto pb-6">
        {/* Renew same */}
        <button
          onClick={() => setMode('renew')}
          className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
            mode === 'renew' ? 'border-pact-green bg-pact-green/5 shadow-md' : 'card-raised'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mode === 'renew' ? 'bg-pact-green text-white' : 'bg-pact-surface text-pact-green'}`}>
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-pact-charcoal">Renew Same Pact</p>
              <p className="text-[11px] text-muted-foreground">Same challenge, same Circle</p>
            </div>
          </div>
          {pact && (
            <div className="ml-[52px] space-y-1 mt-1">
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span>{pact.challengeTemplate.emoji}</span> {pact.challengeTemplate.name}
              </p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Cornell Crew
              </p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {pact.duration} days
              </p>
            </div>
          )}
        </button>

        {/* New */}
        <button
          onClick={() => setMode('new')}
          className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
            mode === 'new' ? 'border-pact-coral bg-pact-coral/5 shadow-md' : 'card-raised'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mode === 'new' ? 'bg-pact-coral text-white' : 'bg-pact-surface text-pact-coral'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-pact-charcoal">Try Something New</p>
              <p className="text-[11px] text-muted-foreground">New challenge, different duration</p>
            </div>
          </div>
        </button>

        {mode === 'new' && (
          <div className="space-y-2 animate-fade-in">
            {CHALLENGE_TEMPLATES.slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  useAppStore.getState().setSelectedTemplateId(t.id);
                  setScreen('discover');
                }}
                className="w-full flex items-center gap-3 p-3 card-raised rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span className="text-lg">{t.emoji}</span>
                <div className="text-left flex-1">
                  <p className="text-xs font-bold text-pact-charcoal">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.category}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            ))}
          </div>
        )}

        {/* Invite friends */}
        <div className="card-raised rounded-2xl p-4">
          <p className="text-xs font-bold text-pact-charcoal mb-1.5">Invite More Friends</p>
          <p className="text-[11px] text-muted-foreground mb-3">Saving is better together.</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-pact-green text-white text-xs font-bold rounded-xl hover:bg-pact-green-light transition-all active:scale-[0.97] shadow-sm">
              Share Invite Link
            </button>
            <button className="flex-1 py-2.5 bg-pact-surface text-pact-charcoal text-xs font-bold rounded-xl hover:bg-border transition-all active:scale-[0.97]">
              Add by Name
            </button>
          </div>
        </div>

        {/* Notification preview */}
        <div className="card-raised rounded-2xl p-4">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-2">Notification Preview</p>
          <div className="bg-pact-surface rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pact-green rounded-lg flex items-center justify-center text-xs">🤝</div>
              <div>
                <p className="text-[11px] font-bold text-pact-charcoal">PACT</p>
                <p className="text-[10px] text-muted-foreground">Radhika started a new Delivery Detox with Cornell Crew! Tap to join.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => setRenewed(true)}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] animate-pulse-glow flex items-center justify-center gap-2 shadow-sm"
        >
          {mode === 'renew' ? '🤝 Renew Pact' : '🤝 Start New Pact'}
        </button>
      </div>
    </div>
  );
}
