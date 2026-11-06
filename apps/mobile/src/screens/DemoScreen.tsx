import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { Button, Card, Heading, Pill, Row, Screen, SectionTitle, sharedStyles } from '@/components/ui';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function DemoScreen() {
  const { data, loadDemo, clearAllData, signOut, setReminderEnabled } = useApp();
  const [busy, setBusy] = useState(false);

  async function toggleReminder(value: boolean) {
    setBusy(true);
    const success = await setReminderEnabled(value);
    setBusy(false);
    if (!success) Alert.alert('Notifications are off', 'Enable notifications in iOS Settings to receive the daily 8:00 PM reminder.');
  }

  async function resetDemo() {
    await loadDemo();
    Alert.alert('Demo restored', 'The seeded Circle and active Pact are ready.');
  }

  async function logout() {
    await signOut();
    router.replace('/');
  }

  function confirmClear() {
    Alert.alert('Delete local app data?', 'This removes the local account, Circles, Pacts, check-ins, evidence, and settings from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { await clearAllData(); router.replace('/'); } },
    ]);
  }

  return (
    <Screen>
      <Heading subtitle="This screen provides deterministic states for product testing and App Review.">Demo and settings</Heading>
      <Card accent><Row><Text style={styles.demoEmoji}>🧪</Text><View style={styles.flex}><Text style={sharedStyles.title}>Demo mode</Text><Text style={sharedStyles.muted}>Seeded Circle, active Pact, standings, and repeatable data.</Text></View>{data.demoMode ? <Pill>ON</Pill> : <Pill tone="neutral">OFF</Pill>}</Row><Button variant="secondary" onPress={resetDemo}>Load or reset demo</Button></Card>

      <SectionTitle>Test flows</SectionTitle>
      <Card>
        <Button variant="secondary" onPress={() => router.push('/circle')}>Circle creation and joining</Button>
        <Button variant="secondary" onPress={() => router.push('/create-pact')}>Pact creation</Button>
        <Button variant="secondary" onPress={() => router.push('/check-in')}>Daily check-in</Button>
        <Button variant="secondary" onPress={() => router.push('/leaderboard')}>Leaderboard and ties</Button>
        <Button variant="secondary" onPress={() => router.push('/results')}>Outcome calculation</Button>
        <Button variant="secondary" onPress={() => router.push('/consequence')}>Evidence upload and voting</Button>
        <Button variant="secondary" onPress={() => router.push('/weekly-recap')}>Weekly recap and renewal</Button>
      </Card>

      <SectionTitle>Reminders</SectionTitle>
      <Card><Row><View style={styles.flex}><Text style={sharedStyles.title}>Daily check-in reminder</Text><Text style={sharedStyles.muted}>Local notification every day at 8:00 PM.</Text></View><Switch value={data.reminderEnabled} onValueChange={toggleReminder} disabled={busy} trackColor={{ false: colors.border, true: colors.green }} /></Row></Card>

      <SectionTitle>Account</SectionTitle>
      <Card><Text style={sharedStyles.title}>{data.user?.name}</Text><Text style={sharedStyles.muted}>{data.user?.email}</Text><Button variant="secondary" onPress={logout}>Sign out</Button><Button variant="danger" onPress={confirmClear}>Delete local data</Button></Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  demoEmoji: { fontSize: 40 },
  flex: { flex: 1, gap: 4 },
});
