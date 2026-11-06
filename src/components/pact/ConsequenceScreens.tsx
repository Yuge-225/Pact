'use client';

import { useAppStore } from '@/lib/store';
import { CONSEQUENCE_CARDS } from '@/lib/data';
import { ArrowLeft, Clock, Check, X, Camera, Video, FileText, AlertTriangle, Send, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function ConsequenceAssignScreen() {
  const { pact, consequenceAssignment, setScreen } = useAppStore();
  if (!pact || !consequenceAssignment) return null;

  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === consequenceAssignment.consequenceId)!;
  const member = pact.members.find((m) => m.id === consequenceAssignment.memberId)!;
  const deadline = new Date(consequenceAssignment.deadline);
  const hoursLeft = Math.max(0, Math.round((deadline.getTime() - Date.now()) / (1000 * 60 * 60)));

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('results')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Results
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-16 h-16 bg-pact-surface rounded-2xl flex items-center justify-center text-4xl animate-pop">{consequence.emoji}</div>
        <h2 className="text-2xl font-black text-pact-charcoal mt-4 animate-fade-in">{consequence.name}</h2>

        <div className="mt-4 flex items-center gap-2 animate-fade-in stagger-1">
          <div className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center text-xl">{member.avatar}</div>
          <span className="font-bold text-pact-charcoal">{member.name}</span>
        </div>

        <p className="text-xs text-muted-foreground mt-4 max-w-[260px] animate-fade-in stagger-2">
          {consequence.description}
        </p>

        <div className="mt-4 streak-badge rounded-full px-4 py-1.5 flex items-center gap-1.5 animate-fade-in stagger-3">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{hoursLeft}h remaining</span>
        </div>

        <div className="mt-8 w-full max-w-[280px] space-y-3 animate-fade-in stagger-4">
          <button
            onClick={() => setScreen('consequence-submit')}
            className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all active:scale-[0.97] shadow-sm"
          >
            Submit Evidence
          </button>
          <button
            onClick={() => setScreen('results')}
            className="w-full py-3 text-xs text-muted-foreground hover:text-pact-charcoal transition-colors font-medium"
          >
            I&apos;ll do it later
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsequenceSubmitScreen() {
  const { pact, consequenceAssignment, submitConsequence, setScreen } = useAppStore();
  const [evidenceType, setEvidenceType] = useState<'photo' | 'video' | 'text'>('video');
  const [note, setNote] = useState('');

  if (!pact || !consequenceAssignment) return null;
  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === consequenceAssignment.consequenceId)!;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('consequence-assign')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-xl font-black text-pact-charcoal mt-4">Submit Evidence</h2>
        <p className="text-xs text-muted-foreground mt-1">{consequence.emoji} {consequence.name}</p>
      </div>

      <div className="flex-1 px-5 mt-5">
        <p className="text-xs font-bold text-pact-charcoal mb-3 uppercase tracking-wider">Evidence type</p>
        <div className="flex gap-2">
          {[
            { type: 'photo' as const, icon: Camera, label: 'Photo' },
            { type: 'video' as const, icon: Video, label: 'Video' },
            { type: 'text' as const, icon: FileText, label: 'Written' },
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setEvidenceType(type)}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all active:scale-[0.97] ${
                evidenceType === type ? 'border-pact-green bg-pact-green/5 shadow-sm' : 'card-flat'
              }`}
            >
              <Icon className={`w-5 h-5 ${evidenceType === type ? 'text-pact-green' : 'text-muted-foreground'}`} />
              <span className="text-[11px] font-bold">{label}</span>
            </button>
          ))}
        </div>

        {evidenceType !== 'text' && (
          <div className="mt-4 p-8 card-flat rounded-2xl border-dashed text-center">
            <div className="w-12 h-12 bg-pact-surface rounded-xl flex items-center justify-center mx-auto mb-2">
              {evidenceType === 'photo' ? <Camera className="w-5 h-5 text-muted-foreground" /> : <Video className="w-5 h-5 text-muted-foreground" />}
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {evidenceType === 'photo' ? 'Upload a photo' : 'Upload a video'}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">(Simulated in demo)</p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-bold text-pact-charcoal mb-2 uppercase tracking-wider">Add a note</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='e.g., "Sang My Heart Will Go On in the library"'
            className="w-full p-3 bg-pact-surface rounded-xl text-xs resize-none h-24 focus:outline-none focus:ring-2 focus:ring-pact-green/20 font-medium"
          />
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={() => submitConsequence(evidenceType, note || `Completed ${consequence.name}!`)}
          className="w-full py-4 bg-pact-green text-white font-bold rounded-2xl hover:bg-pact-green-light transition-all flex items-center justify-center gap-2 active:scale-[0.97] shadow-sm"
        >
          <Send className="w-4 h-4" />
          Submit for Review
        </button>
      </div>
    </div>
  );
}

export function ConsequenceVoteScreen() {
  const { pact, consequenceAssignment, approveConsequence, setScreen } = useAppStore();
  if (!pact || !consequenceAssignment) return null;

  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === consequenceAssignment.consequenceId)!;
  const member = pact.members.find((m) => m.id === consequenceAssignment.memberId)!;
  const otherMembers = pact.members.filter((m) => m.id !== consequenceAssignment.memberId);
  const isVerified = consequenceAssignment.status === 'verified';
  const totalNeeded = otherMembers.length;
  const approvedCount = consequenceAssignment.approvals.filter((a) => a.approved).length;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('results')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Results
        </button>
        <h2 className="text-xl font-black text-pact-charcoal mt-4">
          {isVerified ? 'Consequence Verified!' : 'Review Evidence'}
        </h2>
      </div>

      <div className="flex-1 px-5 mt-4 space-y-3.5 overflow-y-auto pb-4">
        {/* Submission card */}
        <div className="card-raised rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-pact-surface rounded-xl flex items-center justify-center text-xl">{member.avatar}</div>
            <div>
              <p className="font-bold text-sm text-pact-charcoal">{member.name}</p>
              <p className="text-[11px] text-muted-foreground">{consequence.emoji} {consequence.name}</p>
            </div>
          </div>

          {consequenceAssignment.evidenceType && (
            <div className="bg-pact-surface rounded-xl p-3.5 mt-3">
              <div className="flex items-center gap-2 mb-1.5">
                {consequenceAssignment.evidenceType === 'video' && <Video className="w-3.5 h-3.5 text-muted-foreground" />}
                {consequenceAssignment.evidenceType === 'photo' && <Camera className="w-3.5 h-3.5 text-muted-foreground" />}
                {consequenceAssignment.evidenceType === 'text' && <FileText className="w-3.5 h-3.5 text-muted-foreground" />}
                <span className="text-[10px] text-muted-foreground font-medium capitalize">{consequenceAssignment.evidenceType} evidence</span>
              </div>
              <p className="text-xs text-pact-charcoal font-medium">{consequenceAssignment.evidenceNote}</p>
            </div>
          )}
        </div>

        {/* Approval progress */}
        <div className="card-raised rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-pact-charcoal uppercase tracking-wider">Approvals</p>
            <span className={`text-xs font-black ${isVerified ? 'text-pact-success' : 'text-pact-gold'}`}>
              {approvedCount}/{totalNeeded}
            </span>
          </div>

          <div className="bg-pact-surface rounded-full h-2 overflow-hidden mb-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isVerified ? 'bg-pact-success' : 'bg-pact-gold'}`}
              style={{ width: `${(approvedCount / totalNeeded) * 100}%` }}
            />
          </div>

          {otherMembers.map((m) => {
            const approval = consequenceAssignment.approvals.find((a) => a.memberId === m.id);
            return (
              <div key={m.id} className="flex items-center gap-3 py-3 border-t border-border/50 first:border-t-0">
                <div className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center text-lg">{m.avatar}</div>
                <p className="text-xs font-bold text-pact-charcoal flex-1">{m.name}</p>
                {approval ? (
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold ${
                    approval.approved ? 'bg-pact-success/10 text-pact-success' : 'bg-pact-missed/10 text-pact-missed'
                  }`}>
                    {approval.approved ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {approval.approved ? 'Approved' : 'Needs Redo'}
                  </div>
                ) : (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => approveConsequence(m.id, true)}
                      className="w-8 h-8 bg-pact-success/10 text-pact-success rounded-lg flex items-center justify-center hover:bg-pact-success/20 transition-colors active:scale-[0.95]"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => approveConsequence(m.id, false)}
                      className="w-8 h-8 bg-pact-missed/10 text-pact-missed rounded-lg flex items-center justify-center hover:bg-pact-missed/20 transition-colors active:scale-[0.95]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isVerified && (
          <div className="text-center p-5 bg-pact-success/5 rounded-2xl border border-pact-success/15 animate-pop">
            <p className="text-3xl mb-2">✅</p>
            <p className="font-black text-pact-charcoal">Consequence Completed!</p>
            <p className="text-xs text-muted-foreground mt-1">Everyone approved. Great sport, {member.name}!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ConsequenceUnresolvedScreen() {
  const { pact, consequenceAssignment, setScreen, waiveConsequence } = useAppStore();
  if (!pact || !consequenceAssignment) return null;

  const consequence = CONSEQUENCE_CARDS.find((c) => c.id === consequenceAssignment.consequenceId)!;
  const member = pact.members.find((m) => m.id === consequenceAssignment.memberId)!;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-14">
        <button onClick={() => setScreen('results')} className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-16 h-16 bg-pact-warning/10 rounded-2xl flex items-center justify-center mb-4 animate-pop">
          <AlertTriangle className="w-8 h-8 text-pact-warning" />
        </div>

        <h2 className="text-xl font-black text-pact-charcoal animate-fade-in">Consequence Unresolved</h2>
        <p className="text-xs text-muted-foreground mt-2 animate-fade-in stagger-1">
          {member.name} hasn&apos;t completed the {consequence.name} yet.
        </p>

        <div className="mt-6 w-full card-raised rounded-2xl p-4 text-left animate-fade-in stagger-2">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-3">Circle Options</p>
          <div className="space-y-1.5">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pact-surface transition-colors active:scale-[0.98]">
              <div className="w-8 h-8 bg-pact-gold/10 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-pact-gold" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-pact-charcoal">Send Reminder</p>
                <p className="text-[10px] text-muted-foreground">Nudge them to complete it</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pact-surface transition-colors active:scale-[0.98]">
              <div className="w-8 h-8 bg-pact-green/10 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-pact-green" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-pact-charcoal">Substitute Challenge</p>
                <p className="text-[10px] text-muted-foreground">Pick a different consequence</p>
              </div>
            </button>
            <button
              onClick={waiveConsequence}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pact-surface transition-colors active:scale-[0.98]"
            >
              <div className="w-8 h-8 bg-pact-surface rounded-lg flex items-center justify-center">
                <Check className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-pact-charcoal">Waive It</p>
                <p className="text-[10px] text-muted-foreground">Let it go — no hard feelings</p>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-3 p-3 bg-pact-success/5 rounded-xl animate-fade-in stagger-3">
          <p className="text-[10px] text-muted-foreground">
            This doesn&apos;t block future Pacts or remove earned savings.
          </p>
        </div>
      </div>
    </div>
  );
}
