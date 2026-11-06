import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Heading, Screen, sharedStyles } from '@/components/ui';
import { CheckInStatus } from '@/domain/models';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function CheckInScreen() {
  const { activePact, checkIn } = useApp();
  const [choice, setChoice] = useState<CheckInStatus | null>(null);
  if (!activePact) return <Screen><Heading>No active Pact</Heading><Button onPress={() => router.back()}>Close</Button></Screen>;

  function submit() {
    if (!choice) return;
    checkIn(choice);
    router.replace('/pact');
  }

  return (
    <Screen>
      <View style={styles.center}><Text style={styles.emoji}>{activePact.challenge.emoji}</Text><Heading subtitle="Your Circle sees participation status, not spending details.">Did you keep your Pact today?</Heading></View>
      <Card accent={choice === 'success'}>
        <Text style={styles.choiceEmoji}>✓</Text><Text style={styles.choiceTitle}>I kept my Pact</Text><Text style={sharedStyles.muted}>Count today as a successful eligible day.</Text><Button variant={choice === 'success' ? 'primary' : 'secondary'} onPress={() => setChoice('success')}>{choice === 'success' ? 'Selected' : 'Choose success'}</Button>
      </Card>
      <Card>
        <Text style={styles.choiceEmoji}>↻</Text><Text style={styles.choiceTitle}>I missed today</Text><Text style={sharedStyles.muted}>No savings allocation is added. You can continue tomorrow.</Text><Button variant={choice === 'missed' ? 'danger' : 'secondary'} onPress={() => setChoice('missed')}>{choice === 'missed' ? 'Selected' : 'Record a miss'}</Button>
      </Card>
      <Button onPress={submit} disabled={!choice}>Confirm check-in</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  emoji: { fontSize: 55 },
  choiceEmoji: { color: colors.green, fontSize: 34, fontWeight: '900' },
  choiceTitle: { color: colors.ink, fontSize: 21, fontWeight: '800' },
});
