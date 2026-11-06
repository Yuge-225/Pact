import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Heading, Pill, Progress, Row, Screen, sharedStyles } from '@/components/ui';
import { buildLeaderboard } from '@/domain/rules';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function LeaderboardScreen() {
  const { activeCircle, activePact } = useApp();
  if (!activeCircle || !activePact) return <Screen><Heading>No standings yet</Heading><Button onPress={() => router.replace('/home')}>Return home</Button></Screen>;
  const rows = buildLeaderboard(activeCircle);
  return (
    <Screen>
      <Heading subtitle="Rankings use successful eligible days, never dollars saved. Equal scores remain tied.">{activeCircle.name}</Heading>
      <Card>
        {rows.map((member) => (
          <Row key={member.id}>
            <Text style={styles.rank}>{member.rank}</Text><Text style={styles.avatar}>{member.avatar}</Text>
            <View style={styles.flex}><Text style={sharedStyles.title}>{member.name}</Text><Progress value={(member.successfulDays / Math.max(activePact.totalEligibleDays, 1)) * 100} /></View>
            <Text style={styles.score}>{member.successfulDays}/{activePact.totalEligibleDays}</Text>
          </Row>
        ))}
      </Card>
      {activePact.status === 'active' ? <Pill tone="neutral">NO LOSER IS DECLARED BEFORE THE PACT ENDS</Pill> : null}
      <Button variant="secondary" onPress={() => router.push('/results')}>Preview results</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rank: { width: 24, color: colors.green, fontSize: 18, fontWeight: '900', textAlign: 'center' },
  avatar: { width: 37, fontSize: 24 },
  flex: { flex: 1, gap: 6 },
  score: { color: colors.ink, fontSize: 16, fontWeight: '800' },
});
