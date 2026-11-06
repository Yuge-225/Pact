import { ChallengeTemplate, ConsequenceCard, Member, Circle, Pact, ActivityItem, DayStatus } from './types';

export const CHALLENGE_TEMPLATES: ChallengeTemplate[] = [
  {
    id: 'delivery-detox',
    name: 'Delivery Detox',
    emoji: '🍕',
    description: 'No food delivery apps. Cook, meal prep, or eat out in person.',
    category: 'Food & Dining',
    suggestedApps: ['DoorDash', 'Uber Eats', 'Grubhub', 'Postmates'],
    defaultEligibleDays: [1, 2, 3, 4],
  },
  {
    id: 'shopping-reset',
    name: 'Shopping Reset',
    emoji: '🛍️',
    description: 'No impulse online shopping. Only pre-planned essentials.',
    category: 'Shopping',
    suggestedApps: ['Amazon', 'Zara', 'Shein', 'Target'],
    defaultEligibleDays: [1, 2, 3, 4, 5],
  },
  {
    id: 'coffee-at-home',
    name: 'Coffee at Home',
    emoji: '☕',
    description: 'Brew your own. No café or drive-through coffee.',
    category: 'Food & Dining',
    suggestedApps: ['Starbucks', 'Dunkin'],
    defaultEligibleDays: [1, 2, 3, 4, 5],
  },
  {
    id: 'no-rideshare-weekend',
    name: 'No Rideshare Weekend',
    emoji: '🚶',
    description: 'Walk, bike, or take transit on weekends.',
    category: 'Transport',
    suggestedApps: ['Uber', 'Lyft'],
    defaultEligibleDays: [0, 6],
  },
  {
    id: 'custom',
    name: 'Custom Challenge',
    emoji: '✨',
    description: 'Create your own spending challenge.',
    category: 'Custom',
    suggestedApps: [],
    defaultEligibleDays: [1, 2, 3, 4, 5],
  },
];

export const CONSEQUENCE_CARDS: ConsequenceCard[] = [
  {
    id: 'karaoke',
    name: 'Karaoke Confession',
    emoji: '🎤',
    description: 'Sing a song chosen by the Circle and share the recording.',
    example: '"My Heart Will Go On" in the library',
  },
  {
    id: 'selfie',
    name: 'Funny Selfie',
    emoji: '🤳',
    description: 'Take a creative, embarrassing selfie and share it with the Circle.',
    example: 'Wearing a makeshift hat at the grocery store',
  },
  {
    id: 'impression',
    name: 'Impression Challenge',
    emoji: '🎭',
    description: 'Do your best impression of someone the Circle picks.',
    example: 'Your best Gordon Ramsay impression reviewing dining hall food',
  },
  {
    id: 'trivia',
    name: 'Trivia Showdown',
    emoji: '🧠',
    description: 'Answer rapid-fire trivia chosen by the Circle. Wrong answers mean silly dares.',
    example: '10 questions about the group\'s inside jokes',
  },
  {
    id: 'apology',
    name: 'Dramatic Apology',
    emoji: '💔',
    description: 'Record a dramatic, heartfelt apology to your savings goal.',
    example: '"Dear Italy Fund, I\'m sorry I let you down..."',
  },
  {
    id: 'dance',
    name: 'Dance Challenge',
    emoji: '💃',
    description: 'Learn and perform a dance chosen by the Circle.',
    example: 'The full choreography to a TikTok trend',
  },
  {
    id: 'playlist',
    name: 'Group Playlist Duty',
    emoji: '🎵',
    description: 'You\'re in charge of the group playlist for a week — but it\'s only songs the Circle picks.',
    example: 'A week of nothing but 2000s one-hit wonders',
  },
  {
    id: 'speech',
    name: 'Motivational Speech',
    emoji: '📢',
    description: 'Give a one-minute motivational speech about saving money, recorded for the Circle.',
    example: '"Friends, we gather here today to defeat DoorDash..."',
  },
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function generateDailyStatuses(
  startDate: string,
  duration: number,
  eligibleDays: number[],
  successfulDays: number,
  totalEligibleDays: number
): DayStatus[] {
  const statuses: DayStatus[] = [];
  const start = new Date(startDate);
  let eligibleCount = 0;

  for (let i = 0; i < duration; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const dayOfWeek = date.getDay();
    const eligible = eligibleDays.includes(dayOfWeek);

    if (eligible) {
      eligibleCount++;
      const isSuccess = eligibleCount <= successfulDays;
      statuses.push({
        date: date.toISOString().split('T')[0],
        eligible: true,
        status: isSuccess ? 'success' : 'missed',
        verificationStatus: isSuccess ? 'verified' : undefined,
      });
    } else {
      statuses.push({
        date: date.toISOString().split('T')[0],
        eligible: false,
        status: 'not_eligible',
      });
    }
  }

  return statuses;
}

export function createDemoMembers(scenario: 'all_perfect' | 'unique_last' | 'tied_last' | 'all_tied_below', goalOverride?: { name: string; emoji: string; target: number }): Member[] {
  const configs = {
    all_perfect: { radhika: 4, ketan: 4, yuge: 4 },
    unique_last: { radhika: 4, yuge: 3, ketan: 2 },
    tied_last: { radhika: 3, yuge: 1, ketan: 1 },
    all_tied_below: { radhika: 2, yuge: 2, ketan: 2 },
  };

  const c = configs[scenario];

  return [
    {
      id: 'radhika',
      name: 'Radhika',
      avatar: '👩🏽',
      savingsPerDay: 10,
      savingsGoal: { id: 'user-goal', name: goalOverride?.name || 'Italy Trip', emoji: goalOverride?.emoji || '✈️', targetAmount: goalOverride?.target || 2000, currentAmount: 340 + c.radhika * 10 },
      successfulDays: c.radhika,
      totalEligibleDays: 4,
      dailyStatus: generateDailyStatuses('2026-10-05', 7, [1, 2, 3, 4], c.radhika, 4),
    },
    {
      id: 'ketan',
      name: 'Ketan',
      avatar: '👨🏽',
      savingsPerDay: 8,
      savingsGoal: { id: 'laptop', name: 'New Laptop', emoji: '💻', targetAmount: 1500, currentAmount: 280 + c.ketan * 8 },
      successfulDays: c.ketan,
      totalEligibleDays: 4,
      dailyStatus: generateDailyStatuses('2026-10-05', 7, [1, 2, 3, 4], c.ketan, 4),
    },
    {
      id: 'yuge',
      name: 'Yuge',
      avatar: '👨🏻',
      savingsPerDay: 5,
      savingsGoal: { id: 'emergency', name: 'Emergency Fund', emoji: '🛡️', targetAmount: 1000, currentAmount: 150 + c.yuge * 5 },
      successfulDays: c.yuge,
      totalEligibleDays: 4,
      dailyStatus: generateDailyStatuses('2026-10-05', 7, [1, 2, 3, 4], c.yuge, 4),
    },
  ];
}

export const DEMO_CIRCLE: Circle = {
  id: 'cornell-crew',
  name: 'Cornell Crew',
  emoji: '🐻',
  memberIds: ['radhika', 'ketan', 'yuge'],
};

export function createDemoPact(scenario: 'all_perfect' | 'unique_last' | 'tied_last' | 'all_tied_below' | null, goalOverride?: { name: string; emoji: string; target: number }): Pact {
  return {
    id: 'demo-pact-1',
    challengeTemplate: CHALLENGE_TEMPLATES[0],
    circleId: 'cornell-crew',
    duration: 7,
    startDate: '2026-10-05',
    endDate: '2026-10-11',
    eligibleDays: [1, 2, 3, 4],
    totalEligibleDays: 4,
    consequenceId: 'karaoke',
    status: scenario ? 'completed' : 'active',
    outcome: scenario,
    members: createDemoMembers(scenario || 'all_perfect', goalOverride),
    consequenceAssignment: scenario === 'unique_last'
      ? {
          memberId: 'ketan',
          consequenceId: 'karaoke',
          status: 'assigned',
          approvals: [],
          deadline: '2026-10-13T23:59:59Z',
        }
      : scenario === 'tied_last'
      ? {
          memberId: 'ketan',
          consequenceId: 'karaoke',
          status: 'assigned',
          approvals: [],
          deadline: '2026-10-13T23:59:59Z',
        }
      : undefined,
  };
}

export function createActivePactMembers(goalOverride?: { name: string; emoji: string; target: number }): Member[] {
  return [
    {
      id: 'radhika',
      name: 'Radhika',
      avatar: '👩🏽',
      savingsPerDay: 10,
      savingsGoal: { id: 'user-goal', name: goalOverride?.name || 'Italy Trip', emoji: goalOverride?.emoji || '✈️', targetAmount: goalOverride?.target || 2000, currentAmount: 370 },
      successfulDays: 3,
      totalEligibleDays: 4,
      dailyStatus: [
        { date: '2026-10-05', eligible: false, status: 'not_eligible' },
        { date: '2026-10-06', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-07', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-08', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-09', eligible: true, status: 'pending' },
        { date: '2026-10-10', eligible: false, status: 'not_eligible' },
        { date: '2026-10-11', eligible: false, status: 'not_eligible' },
      ],
    },
    {
      id: 'ketan',
      name: 'Ketan',
      avatar: '👨🏽',
      savingsPerDay: 8,
      savingsGoal: { id: 'laptop', name: 'New Laptop', emoji: '💻', targetAmount: 1500, currentAmount: 296 },
      successfulDays: 2,
      totalEligibleDays: 4,
      dailyStatus: [
        { date: '2026-10-05', eligible: false, status: 'not_eligible' },
        { date: '2026-10-06', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-07', eligible: true, status: 'missed' },
        { date: '2026-10-08', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-09', eligible: true, status: 'pending' },
        { date: '2026-10-10', eligible: false, status: 'not_eligible' },
        { date: '2026-10-11', eligible: false, status: 'not_eligible' },
      ],
    },
    {
      id: 'yuge',
      name: 'Yuge',
      avatar: '👨🏻',
      savingsPerDay: 5,
      savingsGoal: { id: 'emergency', name: 'Emergency Fund', emoji: '🛡️', targetAmount: 1000, currentAmount: 165 },
      successfulDays: 3,
      totalEligibleDays: 4,
      dailyStatus: [
        { date: '2026-10-05', eligible: false, status: 'not_eligible' },
        { date: '2026-10-06', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-07', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-08', eligible: true, status: 'success', verificationStatus: 'verified' },
        { date: '2026-10-09', eligible: true, status: 'pending' },
        { date: '2026-10-10', eligible: false, status: 'not_eligible' },
        { date: '2026-10-11', eligible: false, status: 'not_eligible' },
      ],
    },
  ];
}

export const DEMO_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'joined', memberId: 'ketan', message: 'Ketan joined Cornell Crew', emoji: '🎉', timestamp: '2026-10-04T14:00:00Z' },
  { id: '2', type: 'joined', memberId: 'yuge', message: 'Yuge joined Cornell Crew', emoji: '🎉', timestamp: '2026-10-04T14:05:00Z' },
  { id: '3', type: 'check_in', memberId: 'radhika', message: 'Radhika checked in — Day 1 ✅', emoji: '💪', timestamp: '2026-10-06T21:00:00Z' },
  { id: '4', type: 'check_in', memberId: 'yuge', message: 'Yuge checked in — Day 1 ✅', emoji: '🔥', timestamp: '2026-10-06T21:30:00Z' },
  { id: '5', type: 'check_in', memberId: 'ketan', message: 'Ketan checked in — Day 1 ✅', emoji: '✨', timestamp: '2026-10-06T22:00:00Z' },
  { id: '6', type: 'streak', memberId: 'radhika', message: 'Radhika is on a 2-day streak!', emoji: '🔥', timestamp: '2026-10-07T21:00:00Z' },
  { id: '7', type: 'check_in', memberId: 'yuge', message: 'Yuge checked in — Day 2 ✅', emoji: '💪', timestamp: '2026-10-07T21:30:00Z' },
  { id: '8', type: 'streak', memberId: 'radhika', message: 'Radhika hit a 3-day streak! 🔥🔥🔥', emoji: '🔥', timestamp: '2026-10-08T21:00:00Z' },
  { id: '9', type: 'check_in', memberId: 'ketan', message: 'Ketan checked in — Day 3 ✅', emoji: '💪', timestamp: '2026-10-08T22:00:00Z' },
  { id: '10', type: 'milestone', memberId: 'radhika', message: 'Radhika allocated $30 toward Italy Trip!', emoji: '✈️', timestamp: '2026-10-08T21:05:00Z' },
];

export function calculateEligibleDaysInRange(startDate: string, duration: number, eligibleDays: number[]): number {
  let count = 0;
  const start = new Date(startDate);
  for (let i = 0; i < duration; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (eligibleDays.includes(d.getDay())) count++;
  }
  return count;
}
