import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Brand, Button, Card, Heading, Pill, Progress, Row, Screen, SectionTitle, sharedStyles } from '@/components/ui';
import { countUserSuccesses, formatShortDate } from '@/domain/rules';
import { useApp } from '@/state/AppProvider';
import { colors, spacing } from '@/theme';

export function HomeScreen() {
  const { data, hydrated, activeCircle, activePact } = useApp();

  useEffect(() => {
    if (hydrated && !data.user) router.replace('/');
  }, [data.user, hydrated]);

  if (!data.user) return null;
  const successes = activePact ? countUserSuccesses(activePact, data.user.id) : 0;
  const progress = activePact ? (successes / Math.max(activePact.totalEligibleDays, 1)) * 100 : 0;

  return (
    <Screen>
      <View style={styles.topbar}>
        <Brand />
        <Pressable onPress={() => router.push('/demo')} style={styles.avatar}><Text style={styles.avatarText}>{data.user.avatar}</Text></Pressable>
      </View>
      <Heading subtitle="Small choices add up when your Circle can see the commitment.">Hi, {data.user.name}.</Heading>

      {activePact ? (
        <Pressable onPress={() => router.push('/pact')}>
          <Card accent>
            <Row>
              <Text style={styles.challengeEmoji}>{activePact.challenge.emoji}</Text>
              <View style={styles.flex}>
                <Pill>ACTIVE PACT</Pill>
                <Text style={styles.cardTitle}>{activePact.challenge.title}</Text>
              </View>
            </Row>
            <Text style={sharedStyles.muted}>{formatShortDate(activePact.startDate)}–{formatShortDate(activePact.endDate)} · {activeCircle?.members.length ?? 0} members</Text>
            <Progress value={progress} />
            <Row><Text style={styles.stat}>{successes}/{activePact.totalEligibleDays} successful days</Text><Text style={styles.savings}>${successes * activePact.savingsPerDay} saved</Text></Row>
          </Card>
        </Pressable>
      ) : (
        <Card accent>
          <Text style={sharedStyles.title}>Start your first Pact</Text>
          <Text style={sharedStyles.muted}>Choose a behavior, invite your Circle, and agree on a playful consequence.</Text>
          <Button onPress={() => activeCircle ? router.push('/create-pact') : router.push('/circle')}>{activeCircle ? 'Create a Pact' : 'Create or join a Circle'}</Button>
        </Card>
      )}

      <SectionTitle>Your Circle</SectionTitle>
      {activeCircle ? (
        <Pressable onPress={() => router.push('/circle')}>
          <Card>
            <Row><Text style={styles.challengeEmoji}>{activeCircle.emoji}</Text><View style={styles.flex}><Text style={styles.cardTitle}>{activeCircle.name}</Text><Text style={sharedStyles.muted}>{activeCircle.members.map((member) => member.name).join(', ')}</Text></View><Text style={styles.chevron}>›</Text></Row>
          </Card>
        </Pressable>
      ) : (
        <Card><Text style={sharedStyles.muted}>You have not joined a Circle yet.</Text><Button variant="secondary" onPress={() => router.push('/circle')}>Set up a Circle</Button></Card>
      )}

      <SectionTitle>Quick actions</SectionTitle>
      <View style={styles.grid}>
        <Pressable style={styles.action} onPress={() => activePact ? router.push('/check-in') : router.push('/create-pact')}><Text style={styles.actionEmoji}>✓</Text><Text style={styles.actionTitle}>Check in</Text></Pressable>
        <Pressable style={styles.action} onPress={() => router.push('/leaderboard')}><Text style={styles.actionEmoji}>🏅</Text><Text style={styles.actionTitle}>Standings</Text></Pressable>
        <Pressable style={styles.action} onPress={() => router.push('/weekly-recap')}><Text style={styles.actionEmoji}>↗</Text><Text style={styles.actionTitle}>Recap</Text></Pressable>
        <Pressable style={styles.action} onPress={() => router.push('/demo')}><Text style={styles.actionEmoji}>⚙️</Text><Text style={styles.actionTitle}>Settings</Text></Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22 },
  challengeEmoji: { fontSize: 34 },
  flex: { flex: 1, gap: 4 },
  cardTitle: { color: colors.ink, fontSize: 21, fontWeight: '800' },
  stat: { flex: 1, color: colors.ink, fontWeight: '700' },
  savings: { color: colors.green, fontWeight: '800' },
  chevron: { color: colors.muted, fontSize: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  action: { width: '48%', minHeight: 108, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 16, justifyContent: 'space-between' },
  actionEmoji: { color: colors.green, fontSize: 25, fontWeight: '800' },
  actionTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
});
