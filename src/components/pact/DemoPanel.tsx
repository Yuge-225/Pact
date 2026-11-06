'use client';

import { useAppStore } from '@/lib/store';
import { DemoState } from '@/lib/types';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const DEMO_STATES: { label: string; value: DemoState; group: string }[] = [
  { label: 'Welcome', value: 'welcome', group: 'Onboarding' },
  { label: 'Onboarding', value: 'onboarding', group: 'Onboarding' },
  { label: 'Home', value: 'home', group: 'Core' },
  { label: 'Create Pact', value: 'create_pact', group: 'Core' },
  { label: 'Active Pact', value: 'active_pact', group: 'Core' },
  { label: 'App Temptation', value: 'app_temptation', group: 'Daily' },
  { label: 'Daily Check-in', value: 'check_in', group: 'Daily' },
  { label: 'Verification Pending', value: 'verification_pending', group: 'Daily' },
  { label: 'Successful Day', value: 'successful_day', group: 'Daily' },
  { label: 'Missed Day', value: 'missed_day', group: 'Daily' },
  { label: 'Everyone Succeeds', value: 'everyone_succeeds', group: 'Results' },
  { label: 'Two Tied Last', value: 'two_tied_last', group: 'Results' },
  { label: 'Unique Last Place', value: 'unique_last', group: 'Results' },
  { label: 'All Tied Below', value: 'everyone_tied_below', group: 'Results' },
  { label: 'Consequence Submitted', value: 'consequence_submitted', group: 'Consequence' },
  { label: 'Consequence Verified', value: 'consequence_verified', group: 'Consequence' },
  { label: 'Consequence Unresolved', value: 'consequence_unresolved', group: 'Consequence' },
  { label: 'Weekly Recap', value: 'weekly_recap', group: 'Retention' },
  { label: 'Savings Progress', value: 'savings_progress', group: 'Retention' },
  { label: 'Renew Pact', value: 'renew_pact', group: 'Retention' },
];

export function DemoPanel() {
  const { demoState, applyDemoScenario, resetDemo, showDemoPanel } = useAppStore();
  const [collapsed, setCollapsed] = useState(false);

  if (!showDemoPanel) return null;

  const groups = [...new Set(DEMO_STATES.map((s) => s.group))];

  return (
    <div className="fixed top-4 right-4 z-50 w-[220px]">
      <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-pact-charcoal text-white hover:bg-pact-charcoal/90 transition-colors"
        >
          <span className="text-xs font-bold tracking-wide">DEMO</span>
          {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {!collapsed && (
          <div className="max-h-[70vh] overflow-y-auto p-1.5">
            <button
              onClick={resetDemo}
              className="w-full flex items-center gap-1.5 px-3 py-1.5 mb-1 text-[11px] font-bold text-pact-missed hover:bg-pact-missed/5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>

            {groups.map((group) => (
              <div key={group} className="mb-1">
                <div className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {group}
                </div>
                {DEMO_STATES.filter((s) => s.group === group).map((state) => (
                  <button
                    key={state.value}
                    onClick={() => applyDemoScenario(state.value)}
                    className={`w-full text-left px-3 py-1.5 text-[11px] rounded-lg transition-colors ${
                      demoState === state.value
                        ? 'bg-pact-green text-white font-bold'
                        : 'text-pact-charcoal hover:bg-pact-surface font-medium'
                    }`}
                  >
                    {state.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
