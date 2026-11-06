# PACT — Current Product Audit
*Audited from running codebase, October 13, 2026*

---

## Current Product Positioning

**One-liner**: PACT is a social savings app where friend groups commit to the same spending challenge, hold each other accountable through daily check-ins, and connect each successful day to progress toward personal financial goals.

**Tagline**: "Save together." / "Budgeting explains yesterday. Pact changes the next decision."

**Core differentiator**: Social accountability through friend groups (Circles) with playful, non-financial consequences — not budgeting tools, not solo habit trackers, not punitive commitment devices.

---

## Current Target Customer

- Students and young professionals (24–35)
- Cornell Tech community as immediate wedge
- People with existing friend groups who share money-related self-improvement goals
- Starting wedge: groups of 3–5 friends trying to reduce food-delivery spending

---

## Current Product Experience

### Screen Inventory (15 unique screens, 31 sub-states)

| # | Screen | File | Sub-states |
|---|--------|------|------------|
| 1 | Welcome | WelcomeScreen.tsx | 1 |
| 2 | Onboarding | OnboardingScreen.tsx | 4 (intro×3, goal, account, bank-select, connecting, connected) |
| 3 | Home | HomeScreen.tsx | 1 (+ share sheet overlay) |
| 4 | Create Pact | CreatePactFlow.tsx | 6 (discover, duration, circle, consequence, savings, review) |
| 5 | Active Pact | ActivePactScreen.tsx | 1 |
| 6 | Check-in | CheckInScreen.tsx | 4 (prompt, confirm, success, miss) |
| 7 | Leaderboard | LeaderboardScreen.tsx | 2 (standard, all-perfect) |
| 8 | Results | ResultsScreen.tsx | 4 (all_perfect, all_tied_below, champion, default) + share sheet |
| 9 | Consequences | ConsequenceScreens.tsx | 4 (assign, submit, vote, unresolved) |
| 10 | App Temptation | AppTemptationScreen.tsx | 1 |
| 11 | Verification | VerificationScreen.tsx | 1 |
| 12 | Savings Progress | SavingsScreen.tsx | 1 |
| 13 | Circle Activity | CircleActivityScreen.tsx | 1 |
| 14 | Weekly Recap | WeeklyRecapScreen.tsx | 1 (+ share sheet overlay) |
| 15 | Renew | RenewScreen.tsx | 2 (selection, success) |

**Demo Panel**: 20 jumpable states organized in 6 groups (Onboarding, Core, Daily, Results, Consequence, Retention).

### Key User Journeys

**1. First-time user (onboarding)**
Welcome → 3-step intro → Goal selection (6 options) → Account connection → Bank selection (5 banks) → Connecting animation → Connected → Home

**2. Pact creation (6 steps)**
Discover challenge → Set duration & schedule → Pick Circle → Choose consequence → Set savings amount & goal → Review & launch

**3. Active pact daily loop**
Home → Active Pact dashboard → Check-in (yes/no) → Success celebration or miss acknowledgment → Back to dashboard

**4. App temptation intercept**
Active Pact → App Temptation overlay (simulated DoorDash) → "Keep My Pact" or "Break Pact"

**5. End-of-challenge results (4 variants)**
Active Pact → Results (variant depends on outcome) → Consequence flow if applicable → Weekly Recap → Renew or new pact

**6. Consequence lifecycle**
Results (loser identified) → Assign → Submit evidence → Circle votes → Verified/Unresolved

---

## Current Visual Design System

**Framework**: Tailwind CSS v4 with custom design tokens, Duolingo-inspired gamification

**Key design elements**:
- **Streak ring**: SVG circular progress with gradient (#FF9500→#FF6B00), animated fill
- **Streak badge**: Orange gradient pill with glow shadow on large variant
- **XP badges**: Purple (#8B5CF6) tinted pills
- **Card hierarchy**: flat → raised → elevated (3 shadow tiers)
- **Phone frame**: iPhone 15 Pro (390×844px), Dynamic Island, dark navy page background
- **Color palette**: 16 custom tokens (green #1B4332, coral #FF6B6B, gold #F59E0B, etc.)
- **Typography**: Inter, font-black for headings, 10 type sizes used
- **Animations**: 10 named animations, 5-step stagger system, press feedback (scale 97%)
- **Share sheets**: iOS-style bottom sheets with iMessage/WhatsApp/Instagram/Copy Link grid

---

## Implemented Functionality

| Feature | Status | Notes |
|---------|--------|-------|
| Onboarding flow (3 intro steps) | Functional | Animated, interactive |
| Goal selection (6 goals) | Functional | Persists through store, flows to all screens |
| Bank connection (5 banks) | Simulated | 2s delay animation, fake account number |
| Pact creation (6-step wizard) | Functional | Template, duration, schedule, circle, consequence, savings all configurable |
| Active pact dashboard | Functional | Day tracking, stats, calendar, standings, check-in prompt |
| Daily check-in (yes/no) | Functional | Updates store, shows success/miss states |
| Streak ring & XP system | Functional | SVG animation, badge display |
| Leaderboard with podium | Functional | Crown/celebration variants, rank ties |
| Results (4 outcome variants) | Functional | All 15 product rules enforced |
| Consequence lifecycle (4 screens) | Functional | Assign → submit → vote → verified/unresolved |
| Share sheets (3 locations) | Functional UI | No actual sharing — simulated URLs |
| Trending consequences feed | Functional UI | Hardcoded data, views/likes counts |
| Circle activity feed | Functional UI | Emoji reactions, heart toggle, message bar |
| Weekly recap | Functional | Dynamic from pact data, goal progress |
| Savings progress dashboard | Functional UI | Simulated account balances |
| Pact renewal | Functional | Same pact or new challenge, "All in" instant launch |
| App temptation intercept | Simulated | Visual overlay only — cannot actually intercept apps |
| Transaction verification | Simulated | 3-step checklist display only |
| Demo panel (20 states) | Functional | Jump to any state, reset |

---

## Simulated Functionality (Not Real)

1. **Bank connections** — No Plaid or real banking API. Fake account "****4829"
2. **Money movement** — No actual transfers. Savings amounts are display numbers
3. **Transaction verification** — No real bank transaction scanning. Status is hardcoded
4. **App blocking/interception** — Visual overlay simulates blocking DoorDash. Cannot actually intercept third-party apps on iOS/Android
5. **Share links** — URLs like `pact.app/invite/radhika-cornell-crew` are not real
6. **Trending consequences** — Hardcoded fake user data with static view/like counts
7. **Notifications** — No push notification system
8. **Circle invitations** — No real invite mechanism
9. **Authentication** — No user accounts or login

---

## Technical Limitations

1. **Single-page prototype** — All navigation is client-side screen switching via Zustand, not URL-based routing
2. **No backend** — No database, API, or server. All data is in-memory
3. **No persistence** — Refreshing the page resets everything to welcome screen
4. **Hardcoded demo data** — Circle "Cornell Crew" with Radhika/Ketan/Yuge. Challenge dates Oct 5–11, 2026
5. **No multi-user** — Single-player experience simulating a group
6. **Desktop-only rendering** — Fixed phone frame, not responsive mobile web
7. **App interception is technically infeasible** on iOS without MDM; limited on Android via accessibility services
8. **Transaction verification** would require bank API access (Plaid/MX), cannot guarantee real-time or complete detection of spending

---

## Differences from Original Concept

### Added (not in original spec)
1. **Bank connection onboarding flow** — Select bank, connecting animation, connected confirmation
2. **Goal persistence** — Selected goal flows from onboarding through home, results, recap, all demo scenarios
3. **Share sheets** — iOS-style sharing on home, results, and weekly recap
4. **Trending consequences feed** — Viral content section on home for growth/virality
5. **Invite friends CTA** — Purple-tinted card with share integration
6. **Duolingo-style gamification** — Streak rings (SVG animated), XP badges, Pacts count badges
7. **Stagger animation system** — Cascading entrance animations (5 tiers)

### Simplified from original
1. **Single challenge mode only** — "Together" and "Competition" modes were removed. Only one experience
2. **No allowed-miss thresholds** — Removed strictness settings
3. **No monetary forfeitures** — No money redistribution, no platform fees from failures
4. **Instant pact launch** — All members shown as "All in" immediately; no waiting for member acceptance

### Design changes
1. White backgrounds (not cream) for content screens
2. Dark navy (#0F172A) page background behind phone frame
3. Green headers with rounded bottom corners
4. Duolingo-inspired visual language throughout
5. 3-tier card elevation system
6. Orange streak gradient (not flat orange)
