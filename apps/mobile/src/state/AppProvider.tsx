import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CHALLENGES, CONSEQUENCES, createDemoData, EMPTY_DATA } from '@/domain/data';
import { AppData, CheckInStatus, Circle, Pact, User, Vote } from '@/domain/models';

const DATA_KEY = 'pact.mobile.data.v1';
const SESSION_KEY = 'pact.mobile.session';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type CreatePactInput = {
  challengeId: string;
  startDate: string;
  endDate: string;
  eligibleWeekdays: number[];
  consequence: string;
  savingsPerDay: number;
};

type AppContextValue = {
  data: AppData;
  hydrated: boolean;
  activeCircle: Circle | null;
  activePact: Pact | null;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadDemo: () => Promise<void>;
  clearAllData: () => Promise<void>;
  createCircle: (name: string) => void;
  joinCircle: (inviteCode: string) => boolean;
  createPact: (input: CreatePactInput) => void;
  checkIn: (status: CheckInStatus) => void;
  completePact: () => void;
  submitConsequence: (note: string, imageUri?: string) => void;
  voteOnConsequence: (approved: boolean) => void;
  setReminderEnabled: (enabled: boolean) => Promise<boolean>;
  renewPact: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function localDateString(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function countEligibleDays(startDate: string, endDate: string, weekdays: number[]): number {
  const current = new Date(`${startDate}T12:00:00`);
  const end = new Date(`${endDate}T12:00:00`);
  let count = 0;
  while (current <= end) {
    if (weekdays.includes(current.getDay())) count += 1;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(EMPTY_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const stored = await AsyncStorage.getItem(DATA_KEY);
      if (stored) setData(JSON.parse(stored) as AppData);
      setHydrated(true);
    }
    hydrate().catch(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(DATA_KEY, JSON.stringify(data)).catch(() => undefined);
  }, [data, hydrated]);

  const activeCircle = useMemo(
    () => data.circles.find((circle) => circle.id === data.activeCircleId) ?? null,
    [data.activeCircleId, data.circles],
  );
  const activePact = useMemo(
    () => data.pacts.find((pact) => pact.id === data.activePactId) ?? null,
    [data.activePactId, data.pacts],
  );

  async function establishSession(user: User) {
    await SecureStore.setItemAsync(SESSION_KEY, user.id);
    setData((current) => ({ ...current, user }));
  }

  async function signIn(email: string, password: string) {
    if (!email.trim() || password.length < 4) throw new Error('Enter a valid email and a password with at least four characters.');
    if (email.trim().toLowerCase() === 'demo@pact.app') {
      await loadDemo();
      return;
    }
    const name = email.split('@')[0].replace(/[._-]/g, ' ');
    await establishSession({ id: createId('user'), name: name.replace(/\b\w/g, (letter) => letter.toUpperCase()), email: email.trim(), avatar: '🌱' });
  }

  async function register(name: string, email: string, password: string) {
    if (name.trim().length < 2) throw new Error('Enter your name.');
    if (!email.includes('@')) throw new Error('Enter a valid email address.');
    if (password.length < 6) throw new Error('Use at least six characters for your password.');
    await establishSession({ id: createId('user'), name: name.trim(), email: email.trim().toLowerCase(), avatar: '🌱' });
  }

  async function signOut() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
    setData((current) => ({ ...current, user: null }));
  }

  async function loadDemo() {
    const demo = createDemoData();
    await SecureStore.setItemAsync(SESSION_KEY, demo.user!.id);
    setData(demo);
  }

  async function clearAllData() {
    await Promise.all([AsyncStorage.removeItem(DATA_KEY), SecureStore.deleteItemAsync(SESSION_KEY)]);
    setData(EMPTY_DATA);
  }

  function createCircle(name: string) {
    if (!data.user) return;
    const circle: Circle = {
      id: createId('circle'),
      name: name.trim() || 'My Circle',
      emoji: '🤝',
      inviteCode: `PACT-${Math.floor(1000 + Math.random() * 9000)}`,
      members: [{ ...data.user, successfulDays: 0, eligibleDays: 0 }],
    };
    setData((current) => ({ ...current, circles: [...current.circles, circle], activeCircleId: circle.id }));
  }

  function joinCircle(inviteCode: string): boolean {
    if (!data.user) return false;
    const normalized = inviteCode.trim().toUpperCase();
    if (normalized === 'PACT-225') {
      const demo = createDemoData();
      const circle = { ...demo.circles[0], members: [...demo.circles[0].members.filter((member) => member.id !== data.user!.id), { ...data.user, successfulDays: 0, eligibleDays: 4 }] };
      setData((current) => ({ ...current, circles: [...current.circles.filter((item) => item.id !== circle.id), circle], activeCircleId: circle.id }));
      return true;
    }
    return false;
  }

  function createPact(input: CreatePactInput) {
    if (!data.activeCircleId) return;
    const totalEligibleDays = countEligibleDays(input.startDate, input.endDate, input.eligibleWeekdays);
    const pact: Pact = {
      id: createId('pact'),
      circleId: data.activeCircleId,
      challenge: CHALLENGES.find((challenge) => challenge.id === input.challengeId) ?? CHALLENGES[0],
      startDate: input.startDate,
      endDate: input.endDate,
      eligibleWeekdays: input.eligibleWeekdays,
      totalEligibleDays,
      consequence: input.consequence || CONSEQUENCES[0],
      savingsPerDay: input.savingsPerDay,
      status: 'active',
      checkIns: [],
    };
    setData((current) => ({
      ...current,
      pacts: [...current.pacts, pact],
      activePactId: pact.id,
      circles: current.circles.map((circle) => circle.id === pact.circleId
        ? { ...circle, members: circle.members.map((member) => ({ ...member, successfulDays: 0, eligibleDays: totalEligibleDays })) }
        : circle),
    }));
  }

  function checkIn(status: CheckInStatus) {
    if (!data.user || !activePact) return;
    const today = localDateString();
    const previous = activePact.checkIns.find((item) => item.userId === data.user!.id && item.date === today);
    setData((current) => ({
      ...current,
      pacts: current.pacts.map((pact) => pact.id === activePact.id
        ? { ...pact, checkIns: [...pact.checkIns.filter((item) => !(item.userId === data.user!.id && item.date === today)), { id: previous?.id ?? createId('check'), userId: data.user!.id, date: today, status }] }
        : pact),
      circles: current.circles.map((circle) => circle.id === activePact.circleId
        ? { ...circle, members: circle.members.map((member) => member.id === data.user!.id
          ? { ...member, successfulDays: Math.max(0, member.successfulDays + (status === 'success' ? 1 : 0) - (previous?.status === 'success' ? 1 : 0)) }
          : member) }
        : circle),
    }));
  }

  function completePact() {
    if (!activePact) return;
    setData((current) => ({ ...current, pacts: current.pacts.map((pact) => pact.id === activePact.id ? { ...pact, status: 'completed' } : pact) }));
  }

  function submitConsequence(note: string, imageUri?: string) {
    if (!activePact || !data.user) return;
    setData((current) => ({ ...current, pacts: current.pacts.map((pact) => pact.id === activePact.id ? {
      ...pact,
      submission: { memberId: data.user!.id, note: note.trim(), imageUri, submittedAt: new Date().toISOString(), votes: [] },
    } : pact) }));
  }

  function voteOnConsequence(approved: boolean) {
    if (!activePact?.submission || !data.user) return;
    const vote: Vote = { userId: data.user.id, approved };
    setData((current) => ({ ...current, pacts: current.pacts.map((pact) => pact.id === activePact.id && pact.submission ? {
      ...pact,
      submission: { ...pact.submission, votes: [...pact.submission.votes.filter((item) => item.userId !== data.user!.id), vote] },
    } : pact) }));
  }

  async function setReminderEnabled(enabled: boolean): Promise<boolean> {
    if (!enabled) {
      await Notifications.cancelAllScheduledNotificationsAsync();
      setData((current) => ({ ...current, reminderEnabled: false }));
      return true;
    }
    const permission = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowBadge: true, allowSound: true } });
    if (permission.status !== 'granted') return false;
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: { title: 'PACT check-in', body: 'Did you keep your pact today?' },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: 20, minute: 0 },
    });
    setData((current) => ({ ...current, reminderEnabled: true }));
    return true;
  }

  function renewPact() {
    if (!activePact) return;
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    createPact({
      challengeId: activePact.challenge.id,
      startDate: localDateString(start),
      endDate: localDateString(end),
      eligibleWeekdays: activePact.eligibleWeekdays,
      consequence: activePact.consequence,
      savingsPerDay: activePact.savingsPerDay,
    });
  }

  const value: AppContextValue = {
    data,
    hydrated,
    activeCircle,
    activePact,
    signIn,
    register,
    signOut,
    loadDemo,
    clearAllData,
    createCircle,
    joinCircle,
    createPact,
    checkIn,
    completePact,
    submitConsequence,
    voteOnConsequence,
    setReminderEnabled,
    renewPact,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider.');
  return value;
}
