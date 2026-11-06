'use client';

import { useAppStore } from '@/lib/store';
import { PhoneFrame } from '@/components/pact/PhoneFrame';
import { DemoPanel } from '@/components/pact/DemoPanel';
import { useEffect } from 'react';
import { DemoState } from '@/lib/types';
import { WelcomeScreen } from '@/components/pact/WelcomeScreen';
import { OnboardingScreen } from '@/components/pact/OnboardingScreen';
import { HomeScreen } from '@/components/pact/HomeScreen';
import { DiscoverScreen, DurationScreen, CircleScreen, ConsequenceScreen, SavingsScreen, ReviewScreen } from '@/components/pact/CreatePactFlow';
import { ActivePactScreen } from '@/components/pact/ActivePactScreen';
import { CheckInScreen } from '@/components/pact/CheckInScreen';
import { LeaderboardScreen } from '@/components/pact/LeaderboardScreen';
import { ResultsScreen } from '@/components/pact/ResultsScreen';
import { ConsequenceAssignScreen, ConsequenceSubmitScreen, ConsequenceVoteScreen, ConsequenceUnresolvedScreen } from '@/components/pact/ConsequenceScreens';
import { AppTemptationScreen } from '@/components/pact/AppTemptationScreen';
import { VerificationScreen } from '@/components/pact/VerificationScreen';
import { SavingsProgressScreen } from '@/components/pact/SavingsScreen';
import { CircleActivityScreen } from '@/components/pact/CircleActivityScreen';
import { WeeklyRecapScreen } from '@/components/pact/WeeklyRecapScreen';
import { RenewScreen } from '@/components/pact/RenewScreen';

function ScreenRouter() {
  const { screen } = useAppStore();

  switch (screen) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'onboarding':
    case 'onboarding-goal':
    case 'onboarding-account':
    case 'onboarding-bank':
      return <OnboardingScreen />;
    case 'home':
      return <HomeScreen />;
    case 'discover':
      return <DiscoverScreen />;
    case 'create-duration':
      return <DurationScreen />;
    case 'create-circle':
      return <CircleScreen />;
    case 'create-consequence':
      return <ConsequenceScreen />;
    case 'create-savings':
      return <SavingsScreen />;
    case 'create-review':
      return <ReviewScreen />;
    case 'active-pact':
      return <ActivePactScreen />;
    case 'check-in':
      return <CheckInScreen />;
    case 'leaderboard':
      return <LeaderboardScreen />;
    case 'results':
      return <ResultsScreen />;
    case 'celebration':
    case 'champion':
      return <ResultsScreen />;
    case 'consequence-assign':
      return <ConsequenceAssignScreen />;
    case 'consequence-submit':
      return <ConsequenceSubmitScreen />;
    case 'consequence-vote':
      return <ConsequenceVoteScreen />;
    case 'consequence-unresolved':
      return <ConsequenceUnresolvedScreen />;
    case 'app-temptation':
      return <AppTemptationScreen />;
    case 'verification':
      return <VerificationScreen />;
    case 'savings-progress':
      return <SavingsProgressScreen />;
    case 'circle-activity':
      return <CircleActivityScreen />;
    case 'weekly-recap':
      return <WeeklyRecapScreen />;
    case 'renew':
      return <RenewScreen />;
    default:
      return <WelcomeScreen />;
  }
}

const VALID_DEMO_STATES: Set<string> = new Set([
  'welcome','onboarding','home','create_pact','active_pact','app_temptation',
  'check_in','verification_pending','successful_day','missed_day',
  'everyone_succeeds','two_tied_last','unique_last','everyone_tied_below',
  'consequence_submitted','consequence_verified','consequence_unresolved',
  'weekly_recap','renew_pact','savings_progress',
]);

export default function PactApp() {
  const { applyDemoScenario, setShowDemoPanel } = useAppStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get('demo');
    if (demo && VALID_DEMO_STATES.has(demo)) {
      applyDemoScenario(demo as DemoState);
      setShowDemoPanel(false);
    }
  }, []);

  return (
    <>
      <PhoneFrame>
        <ScreenRouter />
      </PhoneFrame>
      <DemoPanel />
    </>
  );
}
