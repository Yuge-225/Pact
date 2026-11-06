# PACT — Implementation Notes

## What Is Functional
- Complete challenge creation wizard (template → duration → circle → consequence → savings → review)
- Active Pact dashboard with real-time progress tracking
- Daily check-in with success/miss confirmation flow
- Leaderboard with correct tie handling for all 4 outcome scenarios
- End-of-Pact results with scenario-appropriate celebrations and consequence assignment
- Consequence submission (evidence type + note) and circle voting (approve/needs redo)
- Unresolved consequence handling (remind, substitute, waive)
- App temptation interstitial simulation
- Verification status display
- Personal savings progress with goal tracking
- Circle activity feed with reactions
- Weekly recap with stats and next challenge suggestions
- One-tap Pact renewal and new Pact creation
- Full demo mode with 20 jumpable states and reset

## What Is Simulated
- **Bank connections**: No real Plaid or bank API integration. Account balances are hardcoded.
- **Money movement**: Savings allocations are tracked in state only. No real transfers occur.
- **Transaction monitoring**: Verification displays are visual mockups. No real bank feed scanning.
- **App blocking**: The temptation screen simulates what would be an OS-level app interception (requires iOS/Android native development).
- **Push notifications**: Notification previews are visual mockups within the app.
- **Evidence uploads**: Photo/video submission shows placeholder UI. No actual file upload.
- **User authentication**: No login/signup. The app always loads as "Radhika".
- **Circle invitations**: Invite flow shows waiting state. No real messaging.
- **Multiple concurrent Pacts**: The prototype supports one Pact at a time.

## What Is Technically Unverified
- **Eligible day calculation**: Uses JavaScript Date arithmetic. Edge cases around timezone boundaries and DST transitions are not tested.
- **Large Circle sizes**: Tested with 3 members. UI may need adjustment for 5+ members.
- **Long challenge durations**: Calendar view optimized for 7-day challenges. 30-day challenges would need a different calendar layout.

## Architecture Decisions
- **Single-page app with screen switching** (not Next.js routing): Faster transitions for demo, simpler state management, no URL-based navigation needed for a prototype.
- **Zustand for state management**: Lightweight, no boilerplate, easy demo state injection.
- **Emoji avatars**: Faster than generating/sourcing profile images. Readable at all sizes.
- **Phone frame wrapper**: Provides realistic mobile context when presented on a desktop projector.
- **Demo panel always visible**: Enables fluid presenter-driven navigation without memorizing click paths.

## Future Work (Not In Scope for Maker Day)
- Real bank integration via Plaid
- iOS/Android native app with actual app blocking
- Backend API with user authentication
- Real-time multiplayer state via WebSockets
- Push notification delivery
- Challenge analytics and spending insights
- Multiple simultaneous Pacts
- Custom challenge creation with approval flow
- Social graph for Circle recommendations
