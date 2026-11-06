import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Field, Heading, Pill, Row, Screen, SectionTitle, sharedStyles } from '@/components/ui';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

export function CircleScreen() {
  const { activeCircle, createCircle, joinCircle } = useApp();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  function create() {
    createCircle(name);
    setName('');
    Alert.alert('Circle created', 'Share the invite code with people you trust.');
  }

  function join() {
    if (!joinCircle(code)) {
      Alert.alert('Invite not found', 'For this local build, use demo invite code PACT-225.');
      return;
    }
    setCode('');
    Alert.alert('Circle joined', 'You are now part of Cornell Crew.');
  }

  return (
    <Screen>
      <Heading subtitle="A Circle is the trusted group that shares your Pact rules and progress.">{activeCircle ? activeCircle.name : 'Find your people.'}</Heading>
      {activeCircle ? (
        <Card accent>
          <Row><Text style={styles.emoji}>{activeCircle.emoji}</Text><View style={styles.flex}><Text style={styles.title}>{activeCircle.name}</Text><Pill>{activeCircle.members.length} MEMBERS</Pill></View></Row>
          {activeCircle.members.map((member) => (
            <Row key={member.id}><Text style={styles.memberAvatar}>{member.avatar}</Text><View style={styles.flex}><Text style={sharedStyles.title}>{member.name}</Text><Text style={sharedStyles.muted}>{member.successfulDays}/{member.eligibleDays || '—'} successful days</Text></View></Row>
          ))}
          <View style={styles.code}><Text style={sharedStyles.muted}>Invite code</Text><Text style={styles.codeText}>{activeCircle.inviteCode}</Text></View>
          <Button onPress={() => router.push('/create-pact')}>Create a Pact</Button>
        </Card>
      ) : null}

      <SectionTitle>Create a Circle</SectionTitle>
      <Card>
        <Field label="Circle name" value={name} onChangeText={setName} placeholder="Weekend Crew" autoCapitalize="words" />
        <Button variant="secondary" onPress={create} disabled={!name.trim()}>Create Circle</Button>
      </Card>

      <SectionTitle>Join with an invite</SectionTitle>
      <Card>
        <Field label="Invite code" value={code} onChangeText={setCode} placeholder="PACT-225" autoCapitalize="characters" />
        <Button variant="secondary" onPress={join} disabled={!code.trim()}>Join Circle</Button>
        <Text style={sharedStyles.muted}>Use PACT-225 to join the seeded demo Circle in this local build.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emoji: { fontSize: 44 },
  memberAvatar: { width: 42, textAlign: 'center', fontSize: 27 },
  flex: { flex: 1, gap: 4 },
  title: { color: colors.ink, fontSize: 24, fontWeight: '800' },
  code: { backgroundColor: colors.card, borderRadius: 14, padding: 14, alignItems: 'center' },
  codeText: { color: colors.green, fontSize: 24, fontWeight: '900', letterSpacing: 2 },
});
