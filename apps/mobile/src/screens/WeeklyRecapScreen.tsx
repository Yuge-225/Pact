import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Heading, Progress, Row, Screen, sharedStyles } from '@/components/ui';
import { countUserSuccesses } from '@/domain/rules';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function WeeklyRecapScreen() {
  const { data, activeCircle, activePact, renewPact } = useApp();
  if (!data.user || !activePact) return <Screen><Heading>No recap yet</Heading><Button onPress={() => router.replace('/home')}>Return home</Button></Screen>;
  const successes = countUserSuccesses(activePact, data.user.id);
  const saved = successes * activePact.savingsPerDay;
  const rate = Math.round((successes / Math.max(activePact.totalEligibleDays, 1)) * 100);
  const leader = activeCircle ? [...activeCircle.members].sort((a, b) => b.successfulDays - a.successfulDays)[0] : null;

  function renew() {
    renewPact();
    router.replace('/pact');
  }

  return (
    <Screen>
      <View style={styles.hero}><Text style={styles.emoji}>🌱</Text><Heading subtitle="Progress is built from repeated decisions, not one perfect week.">Your week in PACT</Heading></View>
      <Card accent>
        <Text style={styles.saved}>${saved}</Text><Text style={sharedStyles.muted}>simulated savings from successful days</Text><Progress value={rate} /><Text style={sharedStyles.title}>{rate}% completion</Text>
      </Card>
      <View style={styles.stats}>
        <Card><Text style={styles.stat}>{successes}</Text><Text style={sharedStyles.muted}>successful days</Text></Card>
        <Card><Text style={styles.stat}>{activePact.totalEligibleDays - successes}</Text><Text style={sharedStyles.muted}>missed or pending</Text></Card>
      </View>
      {leader ? <Card><Row><Text style={styles.leaderAvatar}>{leader.avatar}</Text><View style={styles.flex}><Text style={sharedStyles.title}>Circle highlight</Text><Text style={sharedStyles.muted}>{leader.name} leads with {leader.successfulDays} successful days.</Text></View></Row></Card> : null}
      <Button onPress={renew}>Renew this Pact</Button>
      <Button variant="secondary" onPress={() => router.push('/create-pact')}>Try a different challenge</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'flex-start' },
  emoji: { fontSize: 50 },
  saved: { color: colors.green, fontSize: 44, fontWeight: '900' },
  stats: { flexDirection: 'row', gap: 10 },
  stat: { color: colors.ink, fontSize: 34, fontWeight: '900' },
  leaderAvatar: { fontSize: 40 },
  flex: { flex: 1 },
});
