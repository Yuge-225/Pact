'use client';

import { useAppStore } from '@/lib/store';
import { ArrowLeft, Heart, Send } from 'lucide-react';
import { useState } from 'react';

const REACTIONS = ['🔥', '💪', '👏', '❤️', '🎉', '😤'];

export function CircleActivityScreen() {
  const { pact, setScreen, activity } = useAppStore();
  const [reactedTo, setReactedTo] = useState<Set<string>>(new Set());

  const toggleReaction = (id: string) => {
    setReactedTo((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14 pb-3 border-b border-border/50 bg-white">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen(pact ? 'active-pact' : 'home')} className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center hover:bg-border transition-colors">
            <ArrowLeft className="w-4 h-4 text-pact-charcoal" />
          </button>
          <div className="flex-1">
            <h2 className="text-base font-black text-pact-charcoal">🐻 Cornell Crew</h2>
            <p className="text-[10px] text-muted-foreground">3 members</p>
          </div>
          <div className="flex -space-x-1.5">
            <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👩🏽</div>
            <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👨🏽</div>
            <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👨🏻</div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-2.5 overflow-y-auto">
        {[...activity].reverse().map((item, i) => {
          const isReacted = reactedTo.has(item.id);

          return (
            <div
              key={item.id}
              className="card-raised rounded-2xl p-4 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center text-base flex-shrink-0">
                  {item.memberId === 'radhika' ? '👩🏽' : item.memberId === 'ketan' ? '👨🏽' : '👨🏻'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-pact-charcoal leading-relaxed">{item.message}</p>
                  <p className="text-[9px] text-muted-foreground mt-1 font-medium">
                    {new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                {item.emoji && <span className="text-base flex-shrink-0">{item.emoji}</span>}
              </div>

              <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-border/30">
                <button
                  onClick={() => toggleReaction(item.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] transition-all ${
                    isReacted ? 'bg-pact-coral/10 text-pact-coral font-bold' : 'bg-pact-surface text-muted-foreground hover:bg-pact-coral/5'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${isReacted ? 'fill-current' : ''}`} />
                  {isReacted ? '1' : ''}
                </button>
                {REACTIONS.slice(0, 4).map((r) => (
                  <button
                    key={r}
                    onClick={() => toggleReaction(item.id + r)}
                    className={`px-1.5 py-0.5 rounded-full text-sm transition-all hover:scale-110 ${
                      reactedTo.has(item.id + r) ? 'bg-pact-surface' : ''
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="px-5 py-3 border-t border-border/50 bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Send a message..."
          className="flex-1 px-4 py-2.5 bg-pact-surface rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pact-green/20 font-medium"
        />
        <button className="w-10 h-10 bg-pact-green rounded-xl flex items-center justify-center hover:bg-pact-green-light transition-colors shadow-sm active:scale-[0.95]">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
