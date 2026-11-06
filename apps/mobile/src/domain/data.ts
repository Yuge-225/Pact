import { AppData, Challenge, Circle, Pact, User } from './models';

export const DEMO_USER: User = {
  id: 'user-radhika',
  name: 'Radhika',
  email: 'demo@pact.app',
  avatar: '🌻',
};

export const CHALLENGES: Challenge[] = [
  { id: 'delivery', title: 'Delivery Detox', emoji: '🍕', description: 'Skip food delivery on pact days.', category: 'Food & Dining' },
  { id: 'shopping', title: 'Shopping Reset', emoji: '🛍️', description: 'Avoid non-essential online shopping.', category: 'Shopping' },
  { id: 'coffee', title: 'Coffee at Home', emoji: '☕️', description: 'Make coffee at home before work.', category: 'Food & Dining' },
  { id: 'rideshare', title: 'No Rideshare Weekend', emoji: '🚕', description: 'Walk, bike, or take transit this weekend.', category: 'Transport' },
];

export const CONSEQUENCES = [
  'Karaoke confession',
  'Funny selfie',
  'One-minute motivational speech',
  'Dance challenge',
  'Dramatic apology to your savings goal',
];

const demoCircle: Circle = {
  id: 'circle-cornell',
  name: 'Cornell Crew',
  emoji: '🌽',
  inviteCode: 'PACT-225',
  members: [
    { ...DEMO_USER, successfulDays: 3, eligibleDays: 4 },
    { id: 'user-ketan', name: 'Ketan', email: 'ketan@example.com', avatar: '🚀', successfulDays: 2, eligibleDays: 4 },
    { id: 'user-yuge', name: 'Yuge', email: 'yuge@example.com', avatar: '🧭', successfulDays: 3, eligibleDays: 4 },
  ],
};

const demoPact: Pact = {
  id: 'pact-delivery',
  circleId: demoCircle.id,
  challenge: CHALLENGES[0],
  startDate: '2026-11-02',
  endDate: '2026-11-08',
  eligibleWeekdays: [1, 2, 3, 4],
  totalEligibleDays: 4,
  consequence: CONSEQUENCES[0],
  savingsPerDay: 10,
  status: 'active',
  checkIns: [
    { id: 'check-1', userId: DEMO_USER.id, date: '2026-11-02', status: 'success' },
    { id: 'check-2', userId: DEMO_USER.id, date: '2026-11-03', status: 'success' },
    { id: 'check-3', userId: DEMO_USER.id, date: '2026-11-04', status: 'success' },
  ],
};

export function createDemoData(): AppData {
  return {
    user: DEMO_USER,
    circles: [demoCircle],
    pacts: [demoPact],
    activeCircleId: demoCircle.id,
    activePactId: demoPact.id,
    demoMode: true,
    reminderEnabled: false,
  };
}

export const EMPTY_DATA: AppData = {
  user: null,
  circles: [],
  pacts: [],
  activeCircleId: null,
  activePactId: null,
  demoMode: false,
  reminderEnabled: false,
};
