import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Heading, Pill, Progress, Row, Screen, SectionTitle, sharedStyles } from '@/components/ui';
import { countUserSuccesses, formatShortDate } from '@/domain/rules';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function PactScreen() {
  const { data, activeCircle, activePact, completePact } = useApp();
  if (!data.user || !activePact || !activeCircle) {
    return <Screen><Heading>No active Pact</Heading><Button onPress={() => router.replace('/home')}>Return home</Button></Screen>;
  }
  const successes = countUserSuccesses(activePact, data.user.id);
  const progress = (successes / Math.max(activePact.totalEligibleDays, 1)) * 100;

  function finish() {
    Alert.alert('Complete this Pact?', 'This demo action closes the Pact and calculates final results.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Complete', onPress: () => { completePact(); router.push('/results'); } },
    ]);
  }

  return (
    <Screen>
      <View style={styles.hero}><Text style={styles.emoji}>{activePact.challenge.emoji}</Text><Pill>{activePact.status.toUpperCase()}</Pill></View>
      <Heading subtitle={`${formatShortDate(activePact.startDate)}–${formatShortDate(activePact.endDate)} · ${activeCircle.name}`}>{activePact.challenge.title}</Heading>
      <Card accent>
        <Row><View style={styles.flex}><Text style={styles.bigNumber}>{successes}/{activePact.totalEligibleDays}</Text><Text style={sharedStyles.muted}>successful eligible days</Text></View><View><Text style={styles.savings}>${successes * activePact.savingsPerDay}</Text><Text style={sharedStyles.muted}>simulated savings</Text></View></Row>
        <Progress value={progress} />
      </Card>
      <Button onPress={() => router.push('/check-in')}>Check in for today</Button>

      <SectionTitle>Shared rules</SectionTitle>
      <Card>
        <Row><Text style={styles.ruleIcon}>📅</Text><View style={styles.flex}><Text style={sharedStyles.title}>Pact days</Text><Text style={sharedStyles.muted}>{activePact.totalEligibleDays} eligible days in this Pact</Text></View></Row>
        <Row><Text style={styles.ruleIcon}>🎭</Text><View style={styles.flex}><Text style={sharedStyles.title}>Consequence</Text><Text style={sharedStyles.muted}>{activePact.consequence}</Text></View></Row>
        <Row><Text style={styles.ruleIcon}>👀</Text><View style={styles.flex}><Text style={sharedStyles.title}>Circle visibility</Text><Text style={sharedStyles.muted}>Friends see participation, not savings amounts.</Text></View></Row>
      </Card>

      <SectionTitle>Circle progress</SectionTitle>
      <Card>{activeCircle.members.map((member) => <Row key={member.id}><Text style={styles.member}>{member.avatar}</Text><View style={styles.flex}><Text style={sharedStyles.title}>{member.name}</Text><Progress value={(member.successfulDays / Math.max(activePact.totalEligibleDays, 1)) * 100} /></View><Text style={styles.score}>{member.successfulDays}/{activePact.totalEligibleDays}</Text></Row>)}</Card>
      <Button variant="secondary" onPress={() => router.push('/leaderboard')}>View leaderboard</Button>
      {data.demoMode ? <Button variant="ghost" onPress={finish}>Complete Pact for demo</Button> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  emoji: { fontSize: 52 },
  flex: { flex: 1, gap: 5 },
  bigNumber: { color: colors.ink, fontSize: 32, fontWeight: '900' },
  savings: { color: colors.green, fontSize: 24, fontWeight: '900', textAlign: 'right' },
  ruleIcon: { width: 38, fontSize: 25 },
  member: { width: 40, fontSize: 25 },
  score: { color: colors.ink, fontWeight: '800' },
});
