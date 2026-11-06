# PACT Mobile

PACT Mobile is the iOS-first React Native implementation of the PACT social savings product. The first build is a local-first MVP designed for product testing on a physical iPhone.

## Included flows

- Local registration and sign-in
- Demo account and deterministic demo data
- Create or join a Circle
- Create a Pact with dates, eligible weekdays, a challenge, and a consequence
- Daily manual check-ins
- Circle progress and tie-aware leaderboard rankings
- Four end-of-Pact outcome rules
- Consequence evidence selection and Circle voting
- Daily local check-in reminders
- Weekly recap and one-tap renewal
- Local data deletion

## Current limitations

- Account, Circle, and Pact data are stored only on the device.
- Circle membership is not synchronized between devices.
- Photo evidence is stored as a local file URI and is not uploaded to a server.
- Reminders are local notifications, not remote push notifications.
- Savings are simulated. No bank connection or money movement occurs.
- App blocking and Screen Time integration are not included in this build.

## Requirements

- Node.js 22.11 or newer
- Xcode 26 or newer for local iOS builds
- An iPhone with Developer Mode enabled for direct device installation
- An Apple ID configured in Xcode for code signing

## Run the JavaScript development server

```bash
cd apps/mobile
npm install
npx expo start --dev-client
```

## Install directly on an iPhone with Xcode

1. Connect the iPhone to the Mac by USB and trust the computer.
2. Enable Developer Mode in **Settings → Privacy & Security → Developer Mode**.
3. From `apps/mobile`, run:

```bash
npx expo run:ios --device
```

4. Select the connected iPhone when prompted.
5. If signing is requested, open the generated Xcode workspace and select an Apple Development team for the `com.yuge225.pact` bundle identifier.
6. Keep the Mac and iPhone on the same network while the development server is running.

Native modules are used for secure storage, image selection, and notifications, so this SDK 58 project should be tested with a development build rather than relying on Expo Go.

## Demo mode

Select **Enter demo mode** on the authentication screen. The seeded demo includes:

- Circle: `Cornell Crew`
- Invite code: `PACT-225`
- Active challenge: `Delivery Detox`
- Three Circle members with varied progress

The **Demo & Settings** screen links directly to every major test flow.

## Validation

```bash
npm run typecheck
npx expo lint
npx expo-doctor
npx expo export --platform ios
```

## Production backend work

Before external beta testing, replace local persistence with authenticated backend services for users, Circle membership, Pact records, check-ins, evidence uploads, voting, and remote push notifications. Server-side code must calculate final results and enforce authorization.
