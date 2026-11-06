export type CheckInStatus = 'success' | 'missed';
export type PactStatus = 'active' | 'completed';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type CircleMember = User & {
  successfulDays: number;
  eligibleDays: number;
};

export type Circle = {
  id: string;
  name: string;
  emoji: string;
  inviteCode: string;
  members: CircleMember[];
};

export type Challenge = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: string;
};

export type CheckIn = {
  id: string;
  userId: string;
  date: string;
  status: CheckInStatus;
};

export type Vote = {
  userId: string;
  approved: boolean;
};

export type ConsequenceSubmission = {
  memberId: string;
  note: string;
  imageUri?: string;
  submittedAt: string;
  votes: Vote[];
};

export type Pact = {
  id: string;
  circleId: string;
  challenge: Challenge;
  startDate: string;
  endDate: string;
  eligibleWeekdays: number[];
  totalEligibleDays: number;
  consequence: string;
  savingsPerDay: number;
  status: PactStatus;
  checkIns: CheckIn[];
  submission?: ConsequenceSubmission;
};

export type AppData = {
  user: User | null;
  circles: Circle[];
  pacts: Pact[];
  activeCircleId: string | null;
  activePactId: string | null;
  demoMode: boolean;
  reminderEnabled: boolean;
};

export type LeaderboardRow = CircleMember & {
  rank: number;
  isLast: boolean;
};

export type PactOutcome = {
  kind: 'all-perfect' | 'unique-last' | 'tied-last' | 'all-tied-below';
  title: string;
  description: string;
  consequenceMemberIds: string[];
};
