import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Button, Card, Choice, Field, Heading, Row, Screen, SectionTitle, sharedStyles } from '@/components/ui';
import { CHALLENGES, CONSEQUENCES } from '@/domain/data';
import { useApp } from '@/state/AppProvider';
import { colors } from '@/theme';

const DAYS = [
  { value: 0, label: 'S' }, { value: 1, label: 'M' }, { value: 2, label: 'T' }, { value: 3, label: 'W' },
  { value: 4, label: 'T' }, { value: 5, label: 'F' }, { value: 6, label: 'S' },
];

function dateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function CreatePactScreen() {
  const { activeCircle, createPact } = useApp();
  const today = useMemo(() => new Date(), []);
  const weekLater = useMemo(() => { const value = new Date(today); value.setDate(value.getDate() + 6); return value; }, [today]);
  const [challengeId, setChallengeId] = useState(CHALLENGES[0].id);
  const [startDate, setStartDate] = useState(dateString(today));
  const [endDate, setEndDate] = useState(dateString(weekLater));
  const [eligibleWeekdays, setEligibleWeekdays] = useState([1, 2, 3, 4]);
  const [consequence, setConsequence] = useState(CONSEQUENCES[0]);
  const [savings, setSavings] = useState('10');

  function toggleDay(day: number) {
    setEligibleWeekdays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day].sort());
  }

  function submit() {
    if (!activeCircle) {
      Alert.alert('Circle required', 'Create or join a Circle before starting a Pact.');
      router.replace('/circle');
      return;
    }
    if (eligibleWeekdays.length === 0) {
      Alert.alert('Choose pact days', 'Select at least one eligible weekday.');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate) || endDate < startDate) {
      Alert.alert('Check the dates', 'Use YYYY-MM-DD and make sure the end date is not before the start date.');
      return;
    }
    createPact({ challengeId, startDate, endDate, eligibleWeekdays, consequence, savingsPerDay: Math.max(0, Number(savings) || 0) });
    router.replace('/pact');
  }

  return (
    <Screen>
      <Heading subtitle={`Shared rules for ${activeCircle?.name ?? 'your Circle'}. Each person can choose a private savings amount.`}>Build the commitment.</Heading>
      <SectionTitle>1. Challenge</SectionTitle>
      {CHALLENGES.map((challenge) => <Choice key={challenge.id} selected={challengeId === challenge.id} title={`${challenge.emoji}  ${challenge.title}`} detail={challenge.description} onPress={() => setChallengeId(challenge.id)} />)}

      <SectionTitle>2. Schedule</SectionTitle>
      <Card>
        <Field label="Start date" value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" />
        <Field label="End date" value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" />
        <Text style={sharedStyles.muted}>Eligible weekdays</Text>
        <Row>{DAYS.map((day, index) => <Pressable key={`${day.value}-${index}`} onPress={() => toggleDay(day.value)} style={[styles.day, eligibleWeekdays.includes(day.value) && styles.daySelected]}><Text style={[styles.dayText, eligibleWeekdays.includes(day.value) && styles.dayTextSelected]}>{day.label}</Text></Pressable>)}</Row>
      </Card>

      <SectionTitle>3. Consequence</SectionTitle>
      {CONSEQUENCES.map((item) => <Choice key={item} selected={consequence === item} title={item} onPress={() => setConsequence(item)} />)}

      <SectionTitle>4. Personal savings</SectionTitle>
      <Card><Field label="Amount allocated per successful day" value={savings} onChangeText={setSavings} keyboardType="decimal-pad" placeholder="10" /><Text style={sharedStyles.muted}>Savings are simulated in this build. No money moves.</Text></Card>

      <Button onPress={submit}>Start Pact</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  day: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: colors.green },
  dayText: { color: colors.ink, fontWeight: '700' },
  dayTextSelected: { color: colors.white },
});
