export type ChallengeTemplate = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  suggestedApps: string[];
  defaultEligibleDays: number[];
};

export type SavingsGoal = {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
};

export type Member = {
  id: string;
  name: string;
  avatar: string;
  savingsPerDay: number;
  savingsGoal: SavingsGoal;
  successfulDays: number;
  totalEligibleDays: number;
  dailyStatus: DayStatus[];
};

export type DayStatus = {
  date: string;
  eligible: boolean;
  status: 'pending' | 'success' | 'missed' | 'not_eligible';
  verificationStatus?: 'verified' | 'pending_verification' | 'manual_confirmed' | 'disputed';
};

export type ConsequenceCard = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  example: string;
};

export type ConsequenceAssignment = {
  memberId: string;
  consequenceId: string;
  status: 'assigned' | 'submitted' | 'verified' | 'needs_redo' | 'unresolved' | 'waived';
  submittedAt?: string;
  evidenceType?: 'photo' | 'video' | 'text';
  evidenceNote?: string;
  approvals: { memberId: string; approved: boolean }[];
  deadline: string;
};

export type Circle = {
  id: string;
  name: string;
  emoji: string;
  memberIds: string[];
};

export type PactStatus = 'pending' | 'active' | 'completed';

export type PactOutcome = 'all_perfect' | 'unique_last' | 'tied_last' | 'all_tied_below' | null;

export type Pact = {
  id: string;
  challengeTemplate: ChallengeTemplate;
  circleId: string;
  duration: number;
  startDate: string;
  endDate: string;
  eligibleDays: number[];
  totalEligibleDays: number;
  consequenceId: string;
  status: PactStatus;
  outcome: PactOutcome;
  members: Member[];
  consequenceAssignment?: ConsequenceAssignment;
};

export type ActivityItem = {
  id: string;
  type: 'check_in' | 'streak' | 'milestone' | 'reaction' | 'joined' | 'consequence' | 'celebration';
  memberId: string;
  message: string;
  emoji?: string;
  timestamp: string;
};

export type DemoState =
  | 'welcome'
  | 'onboarding'
  | 'home'
  | 'create_pact'
  | 'active_pact'
  | 'app_temptation'
  | 'check_in'
  | 'verification_pending'
  | 'successful_day'
  | 'missed_day'
  | 'everyone_succeeds'
  | 'two_tied_last'
  | 'unique_last'
  | 'everyone_tied_below'
  | 'consequence_submitted'
  | 'consequence_verified'
  | 'consequence_unresolved'
  | 'weekly_recap'
  | 'renew_pact'
  | 'savings_progress';

export type WeeklyRecap = {
  totalSaved: number;
  successfulDays: number;
  totalEligibleDays: number;
  streakDays: number;
  circleHighlight: string;
  personalMilestone?: string;
};
