import { create } from 'zustand';
import { DemoState, Pact, ActivityItem, ConsequenceAssignment, WeeklyRecap } from './types';
import { createDemoPact, createActivePactMembers, DEMO_ACTIVITY, DEMO_CIRCLE, CONSEQUENCE_CARDS } from './data';

type AppScreen =
  | 'welcome'
  | 'onboarding'
  | 'onboarding-goal'
  | 'onboarding-account'
  | 'onboarding-bank'
  | 'home'
  | 'discover'
  | 'create-template'
  | 'create-duration'
  | 'create-circle'
  | 'create-consequence'
  | 'create-savings'
  | 'create-goal'
  | 'create-review'
  | 'active-pact'
  | 'circle-activity'
  | 'leaderboard'
  | 'check-in'
  | 'app-temptation'
  | 'verification'
  | 'savings-progress'
  | 'results'
  | 'celebration'
  | 'champion'
  | 'consequence-assign'
  | 'consequence-submit'
  | 'consequence-vote'
  | 'consequence-unresolved'
  | 'weekly-recap'
  | 'renew';

interface AppStore {
  screen: AppScreen;
  demoState: DemoState;
  pact: Pact | null;
  activity: ActivityItem[];
  showDemoPanel: boolean;
  userName: string;
  consequenceAssignment: ConsequenceAssignment | null;
  userGoal: { name: string; emoji: string; target: number };

  // Create pact wizard state
  wizardStep: number;
  selectedTemplateId: string | null;
  selectedDuration: number;
  selectedEligibleDays: number[];
  selectedConsequenceId: string | null;
  selectedSavingsPerDay: number;
  selectedGoalName: string;
  selectedGoalEmoji: string;
  selectedGoalTarget: number;

  setScreen: (screen: AppScreen) => void;
  setDemoState: (state: DemoState) => void;
  setShowDemoPanel: (show: boolean) => void;
  setUserGoal: (goal: { name: string; emoji: string; target: number }) => void;
  resetDemo: () => void;
  applyDemoScenario: (scenario: DemoState) => void;

  // Wizard actions
  setWizardStep: (step: number) => void;
  setSelectedTemplateId: (id: string) => void;
  setSelectedDuration: (d: number) => void;
  toggleEligibleDay: (day: number) => void;
  setSelectedConsequenceId: (id: string) => void;
  setSelectedSavingsPerDay: (amount: number) => void;
  setSelectedGoalName: (name: string) => void;
  setSelectedGoalEmoji: (emoji: string) => void;
  setSelectedGoalTarget: (target: number) => void;

  // Check-in
  performCheckIn: (success: boolean) => void;

  // Consequence
  submitConsequence: (evidenceType: 'photo' | 'video' | 'text', note: string) => void;
  approveConsequence: (memberId: string, approved: boolean) => void;
  waiveConsequence: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  screen: 'welcome',
  demoState: 'welcome',
  pact: null,
  activity: [...DEMO_ACTIVITY],
  showDemoPanel: true,
  userName: 'Radhika',
  consequenceAssignment: null,
  userGoal: { name: 'Italy Trip', emoji: '✈️', target: 2000 },

  wizardStep: 0,
  selectedTemplateId: null,
  selectedDuration: 7,
  selectedEligibleDays: [1, 2, 3, 4],
  selectedConsequenceId: null,
  selectedSavingsPerDay: 10,
  selectedGoalName: '',
  selectedGoalEmoji: '🎯',
  selectedGoalTarget: 500,

  setScreen: (screen) => set({ screen }),
  setDemoState: (demoState) => set({ demoState }),
  setShowDemoPanel: (show) => set({ showDemoPanel: show }),
  setUserGoal: (goal) => set({ userGoal: goal }),

  resetDemo: () =>
    set({
      screen: 'welcome',
      demoState: 'welcome',
      pact: null,
      activity: [...DEMO_ACTIVITY],
      consequenceAssignment: null,
      wizardStep: 0,
      selectedTemplateId: null,
      selectedDuration: 7,
      selectedEligibleDays: [1, 2, 3, 4],
      selectedConsequenceId: null,
      selectedSavingsPerDay: 10,
      selectedGoalName: '',
      selectedGoalEmoji: '🎯',
      selectedGoalTarget: 500,
    }),

  applyDemoScenario: (scenario) => {
    const g = get().userGoal;

    switch (scenario) {
      case 'welcome':
        set({ screen: 'welcome', pact: null, demoState: 'welcome', consequenceAssignment: null });
        break;
      case 'onboarding':
        set({ screen: 'onboarding', pact: null, demoState: 'onboarding', consequenceAssignment: null });
        break;
      case 'home':
        set({ screen: 'home', pact: null, demoState: 'home', consequenceAssignment: null });
        break;
      case 'create_pact':
        set({ screen: 'discover', pact: null, demoState: 'create_pact', consequenceAssignment: null });
        break;
      case 'active_pact': {
        const activePact: Pact = {
          id: 'demo-pact-1',
          challengeTemplate: { id: 'delivery-detox', name: 'Delivery Detox', emoji: '🍕', description: 'No food delivery apps', category: 'Food & Dining', suggestedApps: ['DoorDash', 'Uber Eats'], defaultEligibleDays: [1, 2, 3, 4] },
          circleId: 'cornell-crew',
          duration: 7,
          startDate: '2026-10-05',
          endDate: '2026-10-11',
          eligibleDays: [1, 2, 3, 4],
          totalEligibleDays: 4,
          consequenceId: 'karaoke',
          status: 'active',
          outcome: null,
          members: createActivePactMembers(g),
        };
        set({ screen: 'active-pact', pact: activePact, demoState: 'active_pact', consequenceAssignment: null });
        break;
      }
      case 'app_temptation':
        set((s) => {
          if (!s.pact) {
            const activePact: Pact = {
              id: 'demo-pact-1',
              challengeTemplate: { id: 'delivery-detox', name: 'Delivery Detox', emoji: '🍕', description: 'No food delivery apps', category: 'Food & Dining', suggestedApps: ['DoorDash', 'Uber Eats'], defaultEligibleDays: [1, 2, 3, 4] },
              circleId: 'cornell-crew',
              duration: 7,
              startDate: '2026-10-05',
              endDate: '2026-10-11',
              eligibleDays: [1, 2, 3, 4],
              totalEligibleDays: 4,
              consequenceId: 'karaoke',
              status: 'active',
              outcome: null,
              members: createActivePactMembers(g),
            };
            return { screen: 'app-temptation', pact: activePact, demoState: 'app_temptation', consequenceAssignment: null };
          }
          return { screen: 'app-temptation', demoState: 'app_temptation' };
        });
        break;
      case 'check_in':
        set((s) => {
          if (!s.pact) {
            return { screen: 'check-in', pact: { ...createDemoPact(null, g), status: 'active', outcome: null, members: createActivePactMembers(g) }, demoState: 'check_in' };
          }
          return { screen: 'check-in', demoState: 'check_in' };
        });
        break;
      case 'verification_pending':
        set((s) => {
          if (!s.pact) {
            return { screen: 'verification', pact: { ...createDemoPact(null, g), status: 'active', outcome: null, members: createActivePactMembers(g) }, demoState: 'verification_pending' };
          }
          return { screen: 'verification', demoState: 'verification_pending' };
        });
        break;
      case 'successful_day':
      case 'missed_day':
        set((s) => {
          const pact = s.pact || { ...createDemoPact(null, g), status: 'active', outcome: null, members: createActivePactMembers(g) };
          return { screen: 'active-pact', pact, demoState: scenario };
        });
        break;
      case 'everyone_succeeds':
        set({ screen: 'results', pact: createDemoPact('all_perfect', g), demoState: 'everyone_succeeds', consequenceAssignment: null });
        break;
      case 'two_tied_last': {
        const pact = createDemoPact('tied_last', g);
        set({
          screen: 'results',
          pact,
          demoState: 'two_tied_last',
          consequenceAssignment: {
            memberId: 'ketan',
            consequenceId: 'karaoke',
            status: 'assigned',
            approvals: [],
            deadline: '2026-10-13T23:59:59Z',
          },
        });
        break;
      }
      case 'unique_last': {
        const pact = createDemoPact('unique_last', g);
        set({
          screen: 'results',
          pact,
          demoState: 'unique_last',
          consequenceAssignment: {
            memberId: 'ketan',
            consequenceId: 'karaoke',
            status: 'assigned',
            approvals: [],
            deadline: '2026-10-13T23:59:59Z',
          },
        });
        break;
      }
      case 'everyone_tied_below':
        set({ screen: 'results', pact: createDemoPact('all_tied_below', g), demoState: 'everyone_tied_below', consequenceAssignment: null });
        break;
      case 'consequence_submitted':
        set({
          screen: 'consequence-vote',
          pact: createDemoPact('unique_last', g),
          demoState: 'consequence_submitted',
          consequenceAssignment: {
            memberId: 'ketan',
            consequenceId: 'karaoke',
            status: 'submitted',
            submittedAt: '2026-10-12T15:00:00Z',
            evidenceType: 'video',
            evidenceNote: 'Sang "My Heart Will Go On" in the library 😅',
            approvals: [{ memberId: 'radhika', approved: true }],
            deadline: '2026-10-13T23:59:59Z',
          },
        });
        break;
      case 'consequence_verified':
        set({
          screen: 'consequence-vote',
          pact: createDemoPact('unique_last', g),
          demoState: 'consequence_verified',
          consequenceAssignment: {
            memberId: 'ketan',
            consequenceId: 'karaoke',
            status: 'verified',
            submittedAt: '2026-10-12T15:00:00Z',
            evidenceType: 'video',
            evidenceNote: 'Sang "My Heart Will Go On" in the library 😅',
            approvals: [
              { memberId: 'radhika', approved: true },
              { memberId: 'yuge', approved: true },
            ],
            deadline: '2026-10-13T23:59:59Z',
          },
        });
        break;
      case 'consequence_unresolved':
        set({
          screen: 'consequence-unresolved',
          pact: createDemoPact('unique_last', g),
          demoState: 'consequence_unresolved',
          consequenceAssignment: {
            memberId: 'ketan',
            consequenceId: 'karaoke',
            status: 'unresolved',
            approvals: [],
            deadline: '2026-10-13T23:59:59Z',
          },
        });
        break;
      case 'weekly_recap':
        set({ screen: 'weekly-recap', pact: createDemoPact('all_perfect', g), demoState: 'weekly_recap', consequenceAssignment: null });
        break;
      case 'renew_pact':
        set({ screen: 'renew', pact: createDemoPact('all_perfect', g), demoState: 'renew_pact', consequenceAssignment: null });
        break;
      case 'savings_progress':
        set({ screen: 'savings-progress', pact: createDemoPact('all_perfect', g), demoState: 'savings_progress', consequenceAssignment: null });
        break;
    }
  },

  setWizardStep: (step) => set({ wizardStep: step }),
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
  setSelectedDuration: (d) => set({ selectedDuration: d }),
  toggleEligibleDay: (day) =>
    set((s) => {
      const days = s.selectedEligibleDays.includes(day)
        ? s.selectedEligibleDays.filter((d) => d !== day)
        : [...s.selectedEligibleDays, day].sort();
      return { selectedEligibleDays: days };
    }),
  setSelectedConsequenceId: (id) => set({ selectedConsequenceId: id }),
  setSelectedSavingsPerDay: (amount) => set({ selectedSavingsPerDay: amount }),
  setSelectedGoalName: (name) => set({ selectedGoalName: name }),
  setSelectedGoalEmoji: (emoji) => set({ selectedGoalEmoji: emoji }),
  setSelectedGoalTarget: (target) => set({ selectedGoalTarget: target }),

  performCheckIn: (success) =>
    set((s) => {
      if (!s.pact) return {};
      const members = s.pact.members.map((m) => {
        if (m.id === 'radhika') {
          const updatedStatus = m.dailyStatus.map((ds) => {
            if (ds.status === 'pending') {
              return { ...ds, status: success ? 'success' as const : 'missed' as const, verificationStatus: success ? 'manual_confirmed' as const : undefined };
            }
            return ds;
          });
          return {
            ...m,
            successfulDays: success ? m.successfulDays + 1 : m.successfulDays,
            dailyStatus: updatedStatus,
          };
        }
        return m;
      });
      return { pact: { ...s.pact, members }, screen: 'active-pact' as AppScreen };
    }),

  submitConsequence: (evidenceType, note) =>
    set((s) => ({
      consequenceAssignment: s.consequenceAssignment
        ? { ...s.consequenceAssignment, status: 'submitted', evidenceType, evidenceNote: note, submittedAt: new Date().toISOString() }
        : null,
      screen: 'consequence-vote' as AppScreen,
    })),

  approveConsequence: (memberId, approved) =>
    set((s) => {
      if (!s.consequenceAssignment) return {};
      const approvals = [...s.consequenceAssignment.approvals, { memberId, approved }];
      const totalNeeded = (s.pact?.members.length || 3) - 1;
      const allApproved = approvals.filter((a) => a.approved).length >= totalNeeded;
      const needsRedo = approvals.some((a) => !a.approved);
      return {
        consequenceAssignment: {
          ...s.consequenceAssignment,
          approvals,
          status: allApproved ? 'verified' : needsRedo ? 'needs_redo' : 'submitted',
        },
      };
    }),

  waiveConsequence: () =>
    set((s) => ({
      consequenceAssignment: s.consequenceAssignment
        ? { ...s.consequenceAssignment, status: 'waived' }
        : null,
    })),
}));
