import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/state/AppProvider';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerShadowVisible: false, headerTintColor: colors.ink, headerTitleStyle: { fontWeight: '700' }, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="circle" options={{ title: 'Circle' }} />
        <Stack.Screen name="create-pact" options={{ title: 'Create Pact' }} />
        <Stack.Screen name="pact" options={{ title: 'Active Pact' }} />
        <Stack.Screen name="check-in" options={{ title: 'Daily Check-in', presentation: 'modal' }} />
        <Stack.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
        <Stack.Screen name="results" options={{ title: 'Pact Results' }} />
        <Stack.Screen name="consequence" options={{ title: 'Consequence' }} />
        <Stack.Screen name="weekly-recap" options={{ title: 'Weekly Recap' }} />
        <Stack.Screen name="demo" options={{ title: 'Demo & Settings' }} />
      </Stack>
    </AppProvider>
  );
}
