# PACT — Save Together

A social savings prototype for Cornell Tech Product Studio Maker Day 2.

**Pact makes saving social.** Friends commit to changing the same spending behavior, hold each other accountable, and turn successful days into progress toward personal savings goals.

> "Budgeting explains yesterday. Pact changes the next decision."

## Quick Start

```bash
cd pact
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

## Demo Mode

A **Demo Controls** panel on the right side lets you jump to any state instantly:

- **Onboarding**: Welcome → Goal selection → Account connection
- **Core**: Home → Challenge discovery → Create Pact wizard
- **Daily**: Active Pact → App temptation → Check-in → Verification
- **Results**: Everyone succeeds / Tied last / Unique last / All tied below
- **Consequences**: Submitted → Verified → Unresolved
- **Retention**: Weekly recap → Savings progress → Renew pact

Click **Reset Demo** to return to the welcome screen.

## 90-Second Demo Path

1. **Welcome** → Get Started
2. **Home** → Show savings, circles
3. **Create Pact** → Pick Delivery Detox → Set duration → Choose Circle → Pick consequence → Set savings
4. **Active Pact** → Show daily calendar, stats, check-in
5. **App Temptation** → DoorDash interception → "Keep My Pact"
6. **Results: Everyone Succeeds** → Group celebration
7. **Results: Unique Last** → Consequence assignment
8. **Weekly Recap** → Savings progress
9. **Renew** → One-tap renewal

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Zustand state management
- Lucide icons
- No backend, no API keys, no real bank integration

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main app with screen router
│   ├── layout.tsx        # Root layout
│   └── globals.css       # PACT brand styles + animations
├── components/pact/
│   ├── PhoneFrame.tsx     # iPhone frame wrapper
│   ├── DemoPanel.tsx      # Demo state controller
│   ├── WelcomeScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── CreatePactFlow.tsx # 5-step creation wizard
│   ├── ActivePactScreen.tsx
│   ├── CheckInScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── ResultsScreen.tsx  # 4 outcome scenarios
│   ├── ConsequenceScreens.tsx
│   ├── AppTemptationScreen.tsx
│   ├── VerificationScreen.tsx
│   ├── SavingsScreen.tsx
│   ├── CircleActivityScreen.tsx
│   ├── WeeklyRecapScreen.tsx
│   └── RenewScreen.tsx
└── lib/
    ├── types.ts           # TypeScript data models
    ├── data.ts            # Seed data, challenge templates, consequence cards
    └── store.ts           # Zustand store with demo state management
```

## All Money Movement Is Simulated

No real bank accounts, credentials, or transfers. All savings allocations, account balances, and transaction monitoring are simulated for demonstration purposes.
