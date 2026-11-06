import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Heading, Pill, Row, Screen, sharedStyles } from '@/components/ui';
import { buildLeaderboard, calculateOutcome } from '@/domain/rules';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function ResultsScreen() {
  const { activeCircle, activePact, data } = useApp();
  if (!activeCircle || !activePact) return <Screen><Heading>No results yet</Heading><Button onPress={() => router.replace('/home')}>Return home</Button></Screen>;
  const outcome = calculateOutcome(activeCircle, activePact);
  const rows = buildLeaderboard(activeCircle);
  const currentUserHasConsequence = data.user ? outcome.consequenceMemberIds.includes(data.user.id) : false;

  return (
    <Screen>
      <View style={styles.hero}><Text style={styles.emoji}>{outcome.consequenceMemberIds.length ? '🎭' : '🎉'}</Text><Pill tone={outcome.consequenceMemberIds.length ? 'orange' : 'green'}>{outcome.kind.replaceAll('-', ' ').toUpperCase()}</Pill></View>
      <Heading subtitle={outcome.description}>{outcome.title}</Heading>
      <Card>{rows.map((member) => <Row key={member.id}><Text style={styles.rank}>#{member.rank}</Text><Text style={styles.avatar}>{member.avatar}</Text><View style={styles.flex}><Text style={sharedStyles.title}>{member.name}</Text><Text style={sharedStyles.muted}>{member.successfulDays} successful days</Text></View>{outcome.consequenceMemberIds.includes(member.id) ? <Pill tone="orange">CONSEQUENCE</Pill> : null}</Row>)}</Card>
      {outcome.consequenceMemberIds.length ? <Card accent><Text style={sharedStyles.title}>{activePact.consequence}</Text><Text style={sharedStyles.muted}>Assigned to {activeCircle.members.filter((member) => outcome.consequenceMemberIds.includes(member.id)).map((member) => member.name).join(', ')}.</Text></Card> : null}
      {currentUserHasConsequence || activePact.submission ? <Button onPress={() => router.push('/consequence')}>{activePact.submission ? 'Review consequence evidence' : 'Submit consequence evidence'}</Button> : null}
      <Button variant="secondary" onPress={() => router.push('/weekly-recap')}>View weekly recap</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emoji: { fontSize: 54 },
  rank: { width: 30, color: colors.green, fontWeight: '900' },
  avatar: { fontSize: 25 },
  flex: { flex: 1 },
});
