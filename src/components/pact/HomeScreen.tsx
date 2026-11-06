'use client';

import { useAppStore } from '@/lib/store';
import { Plus, TrendingUp, Users, ChevronRight, Bell, Flame, Home, Zap, Target, Share2, Eye, Heart } from 'lucide-react';
import { CHALLENGE_TEMPLATES } from '@/lib/data';
import { useState } from 'react';

const TRENDING_CONSEQUENCES = [
  { id: '1', user: 'Marcus T.', avatar: '👨🏾', consequence: 'Sang "My Heart Will Go On" in the campus library', emoji: '🎤', views: '2.3k', likes: 847, timeAgo: '2h ago' },
  { id: '2', user: 'Priya S.', avatar: '👩🏽', consequence: 'Dramatic apology letter to her savings account', emoji: '💔', views: '1.8k', likes: 612, timeAgo: '5h ago' },
  { id: '3', user: 'Jake W.', avatar: '👨🏼', consequence: 'Did the macarena in a coffee shop', emoji: '💃', views: '1.2k', likes: 389, timeAgo: '1d ago' },
];

function StreakRing({ days, size = 80 }: { days: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const maxDays = 30;
  const progress = Math.min(days / maxDays, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#streakGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="animate-ring-fill"
          style={{ '--ring-circumference': circumference, '--ring-target': offset } as React.CSSProperties}
        />
        <defs>
          <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9500" />
            <stop offset="100%" stopColor="#FF6B00" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Flame className="w-5 h-5 text-pact-streak animate-streak-fire" />
        <span className="text-lg font-black text-pact-charcoal leading-none mt-0.5">{days}</span>
      </div>
    </div>
  );
}

function ShareSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full bg-white rounded-t-3xl p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
        <p className="text-sm font-bold text-pact-charcoal mb-4">Share PACT</p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[
            { icon: '💬', name: 'iMessage', color: 'bg-green-50' },
            { icon: '📱', name: 'WhatsApp', color: 'bg-emerald-50' },
            { icon: '📸', name: 'Instagram', color: 'bg-pink-50' },
            { icon: '🔗', name: 'Copy Link', color: 'bg-pact-surface' },
          ].map((opt) => (
            <button key={opt.name} className="flex flex-col items-center gap-2" onClick={onClose}>
              <div className={`w-14 h-14 ${opt.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>{opt.icon}</div>
              <span className="text-[10px] text-muted-foreground font-medium">{opt.name}</span>
            </button>
          ))}
        </div>
        <div className="p-3 bg-pact-surface rounded-xl mb-3">
          <p className="text-[10px] text-muted-foreground font-mono truncate">pact.app/invite/radhika-cornell-crew</p>
        </div>
        <button onClick={onClose} className="w-full py-3 text-sm font-bold text-muted-foreground">
          Cancel
        </button>
      </div>
    </div>
  );
}

export function HomeScreen() {
  const { setScreen, applyDemoScenario, userGoal } = useAppStore();
  const [showShare, setShowShare] = useState(false);

  const savedAmount = 370;
  const goalPct = ((savedAmount / userGoal.target) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-white relative">
      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}

      {/* Header */}
      <div className="px-6 pt-14 pb-1 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Good evening</p>
          <h1 className="text-2xl font-black text-pact-charcoal">Radhika</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setShowShare(true)} className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center hover:shadow-md transition-all">
            <Share2 className="w-[18px] h-[18px] text-pact-charcoal" />
          </button>
          <button className="relative w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center hover:shadow-md transition-all">
            <Bell className="w-[18px] h-[18px] text-pact-charcoal" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pact-coral rounded-full border-2 border-white" />
          </button>
          <div className="w-10 h-10 bg-pact-green rounded-xl flex items-center justify-center text-base shadow-sm">
            👩🏽
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Streak + Stats row */}
        <div className="px-6 mt-4 animate-fade-in">
          <div className="card-elevated rounded-2xl p-5 flex items-center gap-5">
            <StreakRing days={18} />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-pact-streak" />
                <span className="text-sm font-bold text-pact-charcoal">18-day streak!</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Your longest streak yet. Keep it going.</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-pact-success/10 rounded-lg px-2 py-1">
                  <Zap className="w-3 h-3 text-pact-success" />
                  <span className="text-[11px] font-semibold text-pact-success">16 XP</span>
                </div>
                <div className="flex items-center gap-1 bg-pact-xp/10 rounded-lg px-2 py-1">
                  <Target className="w-3 h-3 text-pact-xp" />
                  <span className="text-[11px] font-semibold text-pact-xp">4 Pacts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Savings card */}
        <div className="px-6 mt-4 animate-fade-in stagger-1">
          <div className="bg-pact-green rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Total Saved</p>
                <p className="text-3xl font-black mt-1">${savedAmount}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">{userGoal.emoji} {userGoal.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <TrendingUp className="w-3.5 h-3.5 text-pact-gold-light" />
                  <span className="text-sm font-bold text-pact-gold-light">{goalPct}%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
              <div className="h-full bg-pact-gold rounded-full" style={{ width: `${goalPct}%` }} />
            </div>
            <button
              onClick={() => setScreen('savings-progress')}
              className="mt-3 flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors font-medium"
            >
              View details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Invite friends CTA */}
        <div className="px-6 mt-4 animate-fade-in stagger-1">
          <button
            onClick={() => setShowShare(true)}
            className="w-full flex items-center gap-3 p-4 bg-pact-xp/5 border border-pact-xp/15 rounded-2xl hover:bg-pact-xp/10 transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 bg-pact-xp/10 rounded-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-pact-xp" />
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-sm text-pact-charcoal">Invite friends to PACT</p>
              <p className="text-[11px] text-muted-foreground">Saving is better together</p>
            </div>
            <ChevronRight className="w-4 h-4 text-pact-xp" />
          </button>
        </div>

        {/* Active Pacts */}
        <div className="px-6 mt-6 animate-fade-in stagger-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-pact-charcoal">Active Pacts</h2>
            <button onClick={() => setScreen('discover')} className="text-xs text-pact-green font-semibold">
              See all
            </button>
          </div>
          <div className="card-raised rounded-2xl p-5 text-center">
            <div className="w-12 h-12 bg-pact-green/8 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤝</span>
            </div>
            <p className="font-bold text-sm text-pact-charcoal">No active Pacts yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] mx-auto">
              Challenge friends and start saving together.
            </p>
            <button
              onClick={() => setScreen('discover')}
              className="mt-4 px-5 py-2.5 bg-pact-green text-white font-bold text-sm rounded-xl hover:bg-pact-green-light transition-all active:scale-[0.97] inline-flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Start a Pact
            </button>
          </div>
        </div>

        {/* Your Circle */}
        <div className="px-6 mt-6 animate-fade-in stagger-3">
          <h2 className="text-base font-bold text-pact-charcoal mb-3">Your Circle</h2>
          <button
            onClick={() => applyDemoScenario('active_pact')}
            className="w-full flex items-center gap-3 p-4 card-raised rounded-2xl hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <div className="w-11 h-11 bg-pact-green/10 rounded-xl flex items-center justify-center text-lg">
              🐻
            </div>
            <div className="text-left flex-1">
              <p className="font-bold text-sm text-pact-charcoal">Cornell Crew</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Radhika, Ketan, Yuge</p>
            </div>
            <div className="flex -space-x-1.5">
              <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👩🏽</div>
              <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👨🏽</div>
              <div className="w-7 h-7 rounded-full bg-pact-surface flex items-center justify-center text-sm border-2 border-white">👨🏻</div>
            </div>
          </button>
        </div>

        {/* Trending Consequences */}
        <div className="px-6 mt-6 animate-fade-in stagger-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-pact-charcoal">Top Consequences This Week</h2>
            <span className="text-[10px] font-bold text-pact-coral bg-pact-coral/10 px-2 py-0.5 rounded-full">VIRAL</span>
          </div>
          <div className="space-y-2.5">
            {TRENDING_CONSEQUENCES.map((item) => (
              <div key={item.id} className="card-raised rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-pact-surface rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    {item.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-pact-charcoal">{item.user}</p>
                      <span className="text-[9px] text-muted-foreground">{item.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      {item.emoji} {item.consequence}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-pact-coral">
                        <Heart className="w-3 h-3 fill-current" />
                        <span className="font-semibold">{item.likes}</span>
                      </div>
                      <button
                        onClick={() => setShowShare(true)}
                        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-pact-green transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Challenges */}
        <div className="px-6 mt-6 pb-4 animate-fade-in stagger-4">
          <h2 className="text-base font-bold text-pact-charcoal mb-3">Popular Challenges</h2>
          <div className="flex gap-3 overflow-x-auto -mx-6 px-6 scrollbar-none">
            {CHALLENGE_TEMPLATES.slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  useAppStore.getState().setSelectedTemplateId(t.id);
                  setScreen('discover');
                }}
                className="flex-shrink-0 w-[130px] p-3.5 card-raised rounded-2xl hover:shadow-lg transition-all text-left active:scale-[0.97]"
              >
                <span className="text-2xl">{t.emoji}</span>
                <p className="font-bold text-xs text-pact-charcoal mt-2 leading-tight">{t.name}</p>
                <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{t.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-around z-10">
        <button onClick={() => setScreen('home')} className="flex flex-col items-center gap-0.5 text-pact-green">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>
        <button onClick={() => setScreen('discover')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <Plus className="w-5 h-5" />
          <span className="text-[10px] font-medium">New Pact</span>
        </button>
        <button onClick={() => setScreen('savings-progress')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-medium">Savings</span>
        </button>
        <button onClick={() => setScreen('circle-activity')} className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-pact-green transition-colors">
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium">Circle</span>
        </button>
      </div>
    </div>
  );
}
