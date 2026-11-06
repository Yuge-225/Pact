import { Circle, LeaderboardRow, Pact, PactOutcome } from './models';

export function buildLeaderboard(circle: Circle): LeaderboardRow[] {
  const sorted = [...circle.members].sort((a, b) => b.successfulDays - a.successfulDays || a.name.localeCompare(b.name));
  const minimum = Math.min(...sorted.map((member) => member.successfulDays));
  let previousScore: number | null = null;
  let rank = 0;

  return sorted.map((member, index) => {
    if (member.successfulDays !== previousScore) rank = index + 1;
    previousScore = member.successfulDays;
    return { ...member, rank, isLast: member.successfulDays === minimum };
  });
}

export function calculateOutcome(circle: Circle, pact: Pact): PactOutcome {
  const scores = circle.members.map((member) => member.successfulDays);
  const minimum = Math.min(...scores);
  const maximum = Math.max(...scores);
  const lastMembers = circle.members.filter((member) => member.successfulDays === minimum);

  if (minimum === pact.totalEligibleDays) {
    return {
      kind: 'all-perfect',
      title: 'Everyone kept the pact',
      description: 'The whole Circle completed every eligible day. No consequence is assigned.',
      consequenceMemberIds: [],
    };
  }

  if (minimum === maximum) {
    return {
      kind: 'all-tied-below',
      title: 'The Circle resets together',
      description: 'Everyone finished with the same score below perfect. No consequence is assigned.',
      consequenceMemberIds: [],
    };
  }

  if (lastMembers.length === 1) {
    return {
      kind: 'unique-last',
      title: `${lastMembers[0].name} finished last`,
      description: `${lastMembers[0].name} receives the pre-agreed consequence.`,
      consequenceMemberIds: [lastMembers[0].id],
    };
  }

  return {
    kind: 'tied-last',
    title: `${lastMembers.length} members tied for last`,
    description: 'Every member tied for last receives the same pre-agreed consequence.',
    consequenceMemberIds: lastMembers.map((member) => member.id),
  };
}

export function countUserSuccesses(pact: Pact, userId: string): number {
  return pact.checkIns.filter((checkIn) => checkIn.userId === userId && checkIn.status === 'success').length;
}

export function formatShortDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`));
}
