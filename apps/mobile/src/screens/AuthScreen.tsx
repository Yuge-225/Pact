import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Brand, Button, Card, Field, Heading, Screen, sharedStyles } from '@/components/ui';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function AuthScreen() {
  const { data, hydrated, signIn, register, loadDemo } = useApp();
  const [mode, setMode] = useState<'sign-in' | 'register'>('sign-in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (hydrated && data.user) router.replace('/home');
  }, [data.user, hydrated]);

  async function submit() {
    setBusy(true);
    try {
      if (mode === 'register') await register(name, email, password);
      else await signIn(email, password);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Unable to continue', error instanceof Error ? error.message : 'Try again.');
    } finally {
      setBusy(false);
    }
  }

  async function enterDemo() {
    setBusy(true);
    await loadDemo();
    router.replace('/home');
  }

  if (!hydrated) {
    return <Screen scroll={false}><View style={styles.loader}><ActivityIndicator color={colors.green} size="large" /></View></Screen>;
  }

  return (
    <Screen>
      <Brand />
      <View style={styles.hero}>
        <Text style={styles.emoji}>🤝</Text>
        <Heading subtitle="Make saving social. Build better spending habits with people you trust.">Save together.</Heading>
      </View>
      <Card>
        <View style={styles.tabs}>
          <Button variant={mode === 'sign-in' ? 'primary' : 'ghost'} onPress={() => setMode('sign-in')}>Sign in</Button>
          <Button variant={mode === 'register' ? 'primary' : 'ghost'} onPress={() => setMode('register')}>Create account</Button>
        </View>
        {mode === 'register' ? <Field label="Name" value={name} onChangeText={setName} autoCapitalize="words" /> : null}
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" />
        <Field label="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete={mode === 'register' ? 'new-password' : 'current-password'} />
        <Button onPress={submit} disabled={busy}>{busy ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Sign in'}</Button>
      </Card>
      <Card accent>
        <Text style={sharedStyles.title}>Explore without setup</Text>
        <Text style={sharedStyles.muted}>Demo mode includes a Circle, an active Pact, standings, results, and consequence voting.</Text>
        <Button variant="secondary" onPress={enterDemo} disabled={busy}>Enter demo mode</Button>
      </Card>
      <Text style={styles.disclaimer}>This first mobile build stores account and Pact data on this device. Cloud accounts and multi-device sync will be added with the production backend.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { paddingVertical: 16 },
  emoji: { fontSize: 56 },
  tabs: { flexDirection: 'row', gap: 8 },
  disclaimer: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
