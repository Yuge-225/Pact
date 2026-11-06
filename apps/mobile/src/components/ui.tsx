import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const content = scroll
    ? <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    : <View style={styles.content}>{children}</View>;
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>{content}</KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Brand() {
  return <Text style={styles.brand}>PACT</Text>;
}

export function Heading({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <View style={styles.headingWrap}>
      <Text style={styles.heading}>{children}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function Card({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <View style={[styles.card, accent && styles.cardAccent]}>{children}</View>;
}

export function Button({ children, onPress, variant = 'primary', disabled = false }: { children: ReactNode; onPress: () => void; variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; disabled?: boolean }) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, styles[`button_${variant}`], pressed && styles.pressed, disabled && styles.disabled]}>
      <Text style={[styles.buttonText, variant === 'primary' && styles.buttonTextPrimary, variant === 'danger' && styles.buttonTextPrimary]}>{children}</Text>
    </Pressable>
  );
}

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="#8C948F" style={styles.input} autoCapitalize="none" {...props} />
    </View>
  );
}

export function Choice({ selected, title, detail, onPress }: { selected: boolean; title: string; detail?: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}>
      <View style={styles.choiceCopy}>
        <Text style={styles.choiceTitle}>{title}</Text>
        {detail ? <Text style={styles.choiceDetail}>{detail}</Text> : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.radioDot} /> : null}</View>
    </Pressable>
  );
}

export function Pill({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'orange' | 'neutral' }) {
  return <View style={[styles.pill, styles[`pill_${tone}`]]}><Text style={styles.pillText}>{children}</Text></View>;
}

export function Progress({ value }: { value: number }) {
  return <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${Math.max(0, Math.min(100, value))}%` }]} /></View>;
}

export function Row({ children }: { children: ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

export const sharedStyles = StyleSheet.create({
  body: { color: colors.ink, fontSize: 16, lineHeight: 23 },
  muted: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  title: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  heroEmoji: { fontSize: 44 },
  spacer: { height: 8 },
});

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: spacing.lg, paddingBottom: 48, gap: spacing.md },
  brand: { color: colors.green, fontSize: 18, fontWeight: '900', letterSpacing: 2.5 },
  headingWrap: { gap: spacing.xs, marginVertical: spacing.sm },
  heading: { color: colors.ink, fontSize: 32, lineHeight: 38, fontWeight: '800', letterSpacing: -0.7 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 23 },
  sectionTitle: { color: colors.ink, fontSize: 18, fontWeight: '800', marginTop: spacing.sm },
  card: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 20, padding: spacing.md, gap: spacing.sm },
  cardAccent: { backgroundColor: colors.greenSoft, borderColor: '#B7CEBB' },
  button: { minHeight: 52, borderRadius: 15, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  button_primary: { backgroundColor: colors.green, borderColor: colors.green },
  button_secondary: { backgroundColor: colors.card, borderColor: colors.border },
  button_danger: { backgroundColor: colors.red, borderColor: colors.red },
  button_ghost: { backgroundColor: 'transparent', borderColor: 'transparent' },
  buttonText: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  buttonTextPrimary: { color: colors.white },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.4 },
  fieldWrap: { gap: spacing.xs },
  label: { color: colors.ink, fontSize: 14, fontWeight: '700' },
  input: { minHeight: 50, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 14, color: colors.ink, fontSize: 16, paddingHorizontal: 14, paddingVertical: 12 },
  choice: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14 },
  choiceSelected: { borderColor: colors.green, backgroundColor: colors.greenSoft },
  choiceCopy: { flex: 1, gap: 2 },
  choiceTitle: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  choiceDetail: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  radio: { width: 22, height: 22, borderRadius: 11, borderColor: colors.border, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioSelected: { borderColor: colors.green },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.green },
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  pill_green: { backgroundColor: colors.greenSoft },
  pill_orange: { backgroundColor: colors.orangeSoft },
  pill_neutral: { backgroundColor: '#EAE7DF' },
  pillText: { color: colors.ink, fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 9, borderRadius: 99, backgroundColor: '#E4E0D7', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 99, backgroundColor: colors.green },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
