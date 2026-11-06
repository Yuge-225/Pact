'use client';

import { useAppStore } from '@/lib/store';
import { ArrowLeft, ShieldCheck, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export function VerificationScreen() {
  const { pact, setScreen } = useAppStore();
  if (!pact) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('active-pact')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Verification Status</h2>
        <p className="text-xs text-muted-foreground mt-1">How we confirm your Pact days</p>
      </div>

      <div className="flex-1 px-5 mt-5 space-y-3.5 overflow-y-auto pb-6">
        {/* Current status */}
        <div className="card-raised rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pact-gold/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-pact-gold" />
            </div>
            <div>
              <p className="font-bold text-sm text-pact-charcoal">Pending Verification</p>
              <p className="text-[11px] text-muted-foreground">Today&apos;s status is being checked</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-pact-success" />
              <div>
                <p className="text-xs font-bold text-pact-charcoal">Transaction scan</p>
                <p className="text-[10px] text-muted-foreground">No DoorDash or Uber Eats charges found</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <Clock className="w-4 h-4 text-pact-gold" />
              <div>
                <p className="text-xs font-bold text-pact-charcoal">Monitoring period</p>
                <p className="text-[10px] text-muted-foreground">Checking periodically until end of day</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-bold text-pact-charcoal">Manual check-in</p>
                <p className="text-[10px] text-muted-foreground">Available as end-of-day fallback</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="card-raised rounded-2xl p-5">
          <p className="text-xs font-bold text-pact-charcoal mb-3 uppercase tracking-wider">How verification works</p>
          <div className="space-y-3.5">
            {[
              { icon: RefreshCw, title: 'Periodic checks', desc: 'Simulated transaction monitoring throughout the day' },
              { icon: ShieldCheck, title: 'No match found', desc: 'No delivery app charges = likely success' },
              { icon: AlertCircle, title: 'Possible match', desc: 'A potential delivery charge is flagged' },
              { icon: CheckCircle2, title: 'Confirmed', desc: 'End-of-day manual check-in finalizes status' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold text-pact-charcoal">{title}</p>
                  <p className="text-[10px] text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-pact-success/5 rounded-xl border border-pact-success/10">
          <p className="text-[10px] text-muted-foreground">
            <span className="font-bold text-pact-charcoal">Note:</span> Absence of a matching transaction is not conclusive proof. Manual check-in serves as final confirmation.
          </p>
        </div>

        <button
          onClick={() => setScreen('check-in')}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] shadow-sm"
        >
          Go to Check-in
        </button>
      </div>
    </div>
  );
}
