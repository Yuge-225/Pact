# PACT — Figma Handoff (Current Implementation)

> **Source of truth**: The running Next.js application at `src/`.
> **Last updated**: October 13, 2026
> **For**: Cornell Tech Product Studio — Maker Day 2

---

## 1. Product Positioning & UX Philosophy

**Tagline**: "Save together."

**Elevator pitch**: PACT is a social savings app where friend groups ("Circles") commit to the same spending challenge for a fixed period. Each person sets their own savings amount and personal financial goal. The person who finishes last faces a playful, pre-agreed social consequence — no money is ever forfeited.

**UX pillars (as built)**:
- **Duolingo-inspired gamification** — Streak rings, XP badges, animated celebrations, daily check-in ritual
- **Positive-sum accountability** — Consequences are playful dares, never monetary. If everyone is perfect, no consequence at all
- **Group identity** — Circles have names and emoji; the "Cornell Crew" is the demo unit
- **Shareability** — Share sheets on Home, Results, and Weekly Recap; trending consequences feed for virality
- **Simulated finance** — All bank connections, money movement, and transaction verification are simulated. Clearly labeled

**15 non-negotiable product rules** (enforced throughout):
1. One simple challenge experience — NO Together/Competition modes
2. NO allowed-miss thresholds or strictness settings
3. NO monetary forfeitures, financial penalties, or money redistribution
4. NO revenue from failed challenges
5. Everyone in a Circle follows same behavior, schedule, and duration
6. Each person selects own savings amount and personal financial goal
7. Performance measured by successful eligible days, not dollars
8. Circle has leaderboard; if everyone achieves perfect completion → group celebration (no manufactured loser)
9. If one person has lowest completion score and missed at least one day → they receive pre-agreed social consequence
10. If multiple people tie for last below perfect → all tied members receive same consequence
11. If everyone ties below perfect → group reset, no consequences assigned
12. Everyone receives personal achievement summary regardless of position
13. Social consequences must be playful, opt-in, non-financial, agreed before challenge starts
14. App blocking and bank transaction verification are simulated
15. All money movement is simulated — no real bank accounts, credentials, or transfers

---

## 2. User Journeys & Navigation

### Navigation Model
Single-page app with screen switching via Zustand store. No URL-based routing — all navigation is `setScreen('screen-name')`.

### Primary Flow (Happy Path)
```
Welcome → Onboarding (3 steps) → Goal Selection → Account Connection → Bank Selection → [Connecting...] → [Connected!] → Home
```

### Pact Creation Flow
```
Home → Discover (pick challenge) → Duration (days, schedule) → Circle (select/create) → Consequence (pick dare) → Savings (amount, goal) → Review → [Pact launched]
```

### Active Pact Daily Loop
```
Home → Active Pact → Check-in → [Success/Miss confirmation] → Active Pact
```

### Side Journeys
```
Active Pact → App Temptation (DoorDash intercept)
Active Pact → Verification Pending
Active Pact → Leaderboard
Active Pact → Circle Activity Feed
```

### End-of-Pact Flow
```
Active Pact → Results (4 variants) → Consequence Assign → Submit → Vote → [Completed]
                                    → Weekly Recap → Renew / New Pact
```

### Bottom Navigation Tabs
| Tab | Icon | Screen | Active indicator |
|-----|------|--------|-----------------|
| Home | `Home` (lucide) | home | Filled icon, bold label |
| New Pact / Pact | `Plus` / `Activity` | discover / active-pact | Context-dependent |
| Board | `Trophy` | leaderboard | Only during active pact |
| Savings | `TrendingUp` | savings-progress | Always available |
| Circle | `Users` | circle-activity | From home only |

---

## 3. Screen-by-Screen Inventory

### 3.1 WelcomeScreen
- **File**: `src/components/pact/WelcomeScreen.tsx`
- **Background**: Full `bg-pact-green` (#1B4332)
- **Decorative**: 3 large circles at `opacity-[0.04]`, white border, positioned absolute
- **Content (centered)**:
  - 🤝 emoji in `w-20 h-20 bg-white/90 rounded-3xl` container
  - "PACT" — `text-5xl font-black text-white tracking-tight`
  - "Save together." — `text-xl text-white/80 font-medium`
  - Subtext: "Budgeting explains yesterday. Pact changes the next decision." — `text-sm text-white/40`
- **CTAs**:
  - "Get Started →" — `bg-white text-pact-green font-bold rounded-2xl py-4`
  - "I already have an account" — `bg-white/10 text-white/70 rounded-2xl py-3.5`
- **Footer**: "CORNELL TECH PRODUCT STUDIO" — `text-[10px] text-white/20 tracking-[0.2em]`

### 3.2 OnboardingScreen (4 sub-screens)
- **File**: `src/components/pact/OnboardingScreen.tsx`

**Sub-screen A: Intro Steps (3 pages)**
- White background, centered layout
- Icon in colored rounded-2xl container (green/coral/gold)
- Step indicators: active = `w-8 bg-pact-green`, inactive = `w-1.5 bg-border`
- Steps: (1) Users icon / "Make a Pact with friends" (2) Target icon / "Every day counts" (3) Shield icon / "Playful accountability"
- CTA: "Next" → "Choose Your Goal"

**Sub-screen B: Goal Selection**
- White bg, "What are you saving for?" heading
- 6 goal cards in vertical list, each `card-raised rounded-2xl p-4`:
  - Travel ✈️ $2,000 | Tech 💻 $1,500 | Emergency Fund 🛡️ $3,000
  - Student Loans 🎓 $5,000 | Housing 🏠 $4,000 | Something Special 🎁 $500
- Each shows emoji in `bg-pact-surface rounded-xl`, name, examples
- Selection calls `setUserGoal()` and advances

**Sub-screen C: Account Connection**
- "Connect your savings" heading
- "Connect Bank" button (🏦 blue-50 bg) and "Connect Card" button (💳 green-50 bg)
- Green notice box: "Simulated in this demo" with Shield icon
- "Skip for now" link at bottom

**Sub-screen D: Bank Selection → Connecting → Connected**
- **Select**: 5 bank options (Chase 🏦, Bank of America 🔴, Wells Fargo 🟡, Capital One 💳, Citi 🔵)
- **Connecting**: Centered Loader2 spinner, progress checklist (✓ Identity verified, ✓ Account found, ⏳ Establishing secure link...), 2s simulated delay
- **Connected**: CheckCircle2 in green success container, bank name card with "Checking ****4829", simulated notice, "Continue" CTA

### 3.3 HomeScreen
- **File**: `src/components/pact/HomeScreen.tsx`
- **Header**: "GOOD EVENING" label + "Radhika" name + Share2 icon + Bell icon (red dot) + avatar
- **Streak Widget** (`card-elevated rounded-2xl`):
  - StreakRing SVG: 90×90px, circular progress with gradient stroke (#FF9500 → #FF6B00), Flame icon center, count inside
  - "18-day streak!" label, "Your longest yet"
  - XP badge (`bg-pact-xp/10 text-pact-xp`): "16 XP"
  - Pacts badge (`bg-pact-success/10 text-pact-success`): "4 Pacts"
- **Savings Card** (`bg-pact-green rounded-2xl`):
  - "TOTAL SAVED" label, "$370" large amount
  - Goal name + emoji from `userGoal` store (dynamic)
  - Progress bar (bg-pact-gold on bg-white/20)
  - Percentage calculated: `(370 / userGoal.target * 100)`
  - "View details >" link
- **Invite CTA** (`card-raised`): Share icon in `bg-pact-xp/10`, "Invite friends to PACT"
- **Active Pacts Section**: Empty state with 🤝, "No active Pacts yet", "+ Start a Pact" button
- **Your Circle**: "Cornell Crew" with 3 member avatars in `bg-pact-surface rounded-xl`
- **Trending Consequences** ("Top Consequences This Week"):
  - "VIRAL" badge: `text-pact-coral bg-pact-coral/10 rounded-full px-2`
  - 3 consequence cards with user avatar, consequence text, emoji, views (Eye icon), likes (Heart icon), Share button
  - Example: "Sarah M. had to sing karaoke in the library after losing Delivery Detox 🎤" — 2.1k views, 847 likes
- **Popular Challenges**: Horizontal scroll of challenge cards
- **Bottom Nav**: Home (active), New Pact, Savings, Circle

### 3.4 CreatePactFlow (6 sub-screens)
- **File**: `src/components/pact/CreatePactFlow.tsx`
- **StepIndicator**: 5 dots, active = `bg-pact-green w-6`, inactive = `bg-border w-2`

**Discover**: 5 challenge template cards with emoji, name, description, app tags
**Duration**: 7/14/30 day buttons, day-of-week toggles (S M T W T F S), eligible days count
**Circle**: Cornell Crew selection card, "Create New Circle" option
**Consequence**: 8 consequence cards in grid, selectable
**Savings**: Per-day amount stepper ($5/$10/$15/$20 presets + custom), goal selection
**Review**: Full summary card with all selections, "Start Pact 🤝" CTA

### 3.5 ActivePactScreen
- **File**: `src/components/pact/ActivePactScreen.tsx`
- **Green Header** (rounded-b-3xl): Back arrow, "Cornell Crew" with 🐻, Activity button
  - Challenge emoji + name + "Day X of Y"
  - Progress bar (`bg-pact-gold` fill)
  - "X/Y days" + "Z remaining"
- **Stats Row**: 3 cards — Streak (🔥 + count), Saved ($amount), Score (x/y)
- **Check-in Prompt** (`card-elevated`): Bouncing CheckCircle2 (text-pact-green), "Ready to check in?", challenge-specific question
- **Weekly Calendar**: 7-day row (S M T W T F S) with date numbers
  - Success: `bg-pact-success text-white` with CheckCircle2
  - Missed: `bg-pact-missed text-white` with X
  - Pending: `border-2 border-pact-green text-pact-green` with Clock
  - Off day: `bg-pact-surface text-muted-foreground`
- **Circle Standings**: Member rows with avatar, name, progress bar, score
- **Consequence Reminder**: Coral-tinted card with consequence emoji + name
- **Temptation Shield**: Button linking to app-temptation screen
- **Bottom Nav**: Home, Pact (active), Board, Savings

### 3.6 CheckInScreen
- **File**: `src/components/pact/CheckInScreen.tsx`
- **Initial**: Challenge emoji, question, "Yes, I kept my Pact!" (green) + "No, I slipped today" (red outline)
- **Confirm**: "Are you sure?" step
- **Success**: `streak-badge-lg` fire icon (large, glowing), streak count with animate-count-up, crew avatars "Your crew is proud 💪"
- **Miss**: Neutral hand icon, "It happens. Tomorrow is a fresh start."

### 3.7 LeaderboardScreen
- **File**: `src/components/pact/LeaderboardScreen.tsx`
- **Green Header**: Podium display — 1st center (tallest), 2nd left, 3rd right
  - Crown icon (or 🎉 if all perfect) on leader
  - Member avatars in rounded containers on podium blocks
- **List View**: Rank numbers (or "T" for ties), avatars, progress bars, streak badges on perfect scores
- **All Perfect**: "Everyone's crushing it!" celebration banner

### 3.8 ResultsScreen (4 outcome variants)
- **File**: `src/components/pact/ResultsScreen.tsx`
- **Hero section** (variant-colored):
  - `all_perfect`: bg-pact-success, 🎉, "Everyone Crushed It!", all avatars with scores
  - `all_tied_below`: bg-pact-gold, 🤝, "Group Reset", no consequences
  - `champion` (Radhika wins): bg-pact-green, Crown icon, "Circle Champion!"
  - Default: bg-pact-charcoal, 📊, "Pact Complete"
  - Decorative circles (opacity-10 white borders)
- **Your Achievement** (`card-elevated`): Avatar, X/Y days, $saved → goal emoji + name, progress bar, streak badge
- **Final Standings** (`card-raised`): Ranked members, "T" for ties, color-coded scores (green=perfect, red=last)
- **Consequence Card** (if losers exist): Coral-tinted, consequence emoji + name, loser avatars, "View Consequence" CTA
- **Share Achievement** button: `bg-pact-xp/10 text-pact-xp`
- **Action Buttons**: "New Pact" (green) + "Weekly Recap" (surface)
- **ShareSheet**: iOS-style bottom sheet (iMessage, WhatsApp, Instagram, Copy Link)

### 3.9 ConsequenceScreens (4 screens)
- **File**: `src/components/pact/ConsequenceScreens.tsx`

**Assign**: Consequence display, assigned member, countdown timer in streak-badge, "Submit Evidence" / "I'll do it later"
**Submit**: Evidence type selection (Photo 📸, Video 🎥, Written ✍️), upload area (simulated dashed border), note textarea, "Submit Proof" CTA
**Vote**: Submission card, approval progress bar, per-member approve/reject buttons, "Consequence Completed!" celebration state
**Unresolved**: Warning icon, member hasn't completed, "Send Reminder" / "Substitute Challenge" / "Waive It" options

### 3.10 AppTemptationScreen
- **File**: `src/components/pact/AppTemptationScreen.tsx`
- Dark gradient overlay simulating DoorDash app interception
- Shield icon, day count reminder, goal reminder from member data
- Savings-per-day stat
- "Keep My Pact" (green, prominent) / "Break Pact & Continue" (red, muted)

### 3.11 VerificationScreen
- **File**: `src/components/pact/VerificationScreen.tsx`
- Pending status with 3-step verification: Transaction scan ✓, Monitoring period ⏳, Manual check-in
- "How verification works" expandable explanation
- "Go to Check-in" CTA

### 3.12 SavingsProgressScreen
- **File**: `src/components/pact/SavingsScreen.tsx`
- Goal card (bg-pact-green): Amount saved, target, progress bar
- Stats grid: Total saved, Pacts completed, Success days
- Simulated accounts: "Checking ****4829" + "Pact Savings ****7712"
- Pact history list with emoji, name, amount saved, completion ratio

### 3.13 CircleActivityScreen
- **File**: `src/components/pact/CircleActivityScreen.tsx`
- Cornell Crew header with 3 member avatars
- Activity feed: timestamped entries with emoji and reaction buttons (🔥💪👏❤️)
- Heart toggle interaction (tap to like)
- Message input bar at bottom

### 3.14 WeeklyRecapScreen
- **File**: `src/components/pact/WeeklyRecapScreen.tsx`
- Full `bg-pact-green text-white` background
- Hero stat: "$40" (animate-count-up) "saved this week" + streak badge
- Highlights (3 rows in bg-white/10 cards):
  - Star icon: "4/4 days completed — Perfect score!"
  - TrendingUp icon: "✈️ 19.0% toward Italy Trip — $380 of $2000"
  - Users icon: "🎉 Cornell Crew went perfect! — Radhika 4/4 · Ketan 4/4 · Yuge 4/4"
- Suggested Next Challenges: 3 options (Delivery Detox Round 2, Coffee at Home, Shopping Reset)
- "Share Your Week" button (bg-white/15)
- "Start Next Pact" CTA (bg-white text-pact-green)

### 3.15 RenewScreen
- **File**: `src/components/pact/RenewScreen.tsx`
- "Renew Same Pact" / "Try Something New" toggle
- Challenge templates list (when "new" selected)
- "Invite More Friends" card with Share Invite Link / Add by Name
- Notification preview
- Success state: "Pact Launched!" with challenge details, all member avatars showing "All in" status

---

## 4. Design Token System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `pact-green` | `#1B4332` | Primary brand, headers, CTAs, savings cards |
| `pact-green-light` | `#2D6A4F` | Hover states, secondary green |
| `pact-coral` | `#FF6B6B` | Accent, destructive actions, VIRAL badge |
| `pact-coral-light` | `#FF8787` | Lighter coral variant |
| `pact-gold` | `#F59E0B` | Progress bars, highlights, warnings |
| `pact-gold-light` | `#FBBF24` | Streak ring gradient end, lighter gold |
| `pact-charcoal` | `#1A1A2E` | Text primary, phone frame border, dark headers |
| `pact-success` | `#22C55E` | Check-in success, perfect scores, connected state |
| `pact-warning` | `#F97316` | Warning states |
| `pact-missed` | `#EF4444` | Missed days, last-place scores, consequence CTAs |
| `pact-streak` | `#FF9500` | Streak badge gradient start |
| `pact-xp` | `#8B5CF6` | XP badges, share achievement, invite CTA |
| `pact-surface` | `#F8FAFC` | Card backgrounds, off-day cells, input areas |
| `background` | `#FFFFFF` | Page/card background |
| `border` | `#E2E8F0` | Card borders, dividers |
| `muted-foreground` | `#64748B` | Secondary text, labels |
| `secondary` | `#F1F5F9` | Secondary backgrounds |

### Streak Badge Gradient
```css
background: linear-gradient(135deg, #FF9500, #FF6B00);
/* Large variant adds: */
box-shadow: 0 4px 16px rgba(255, 149, 0, 0.35);
```

### Typography
- **Font**: Inter (via `--font-sans`)
- **Sizes used**: `text-5xl` (hero numbers), `text-2xl` (headings), `text-xl` (sub-headings), `text-lg` (emoji), `text-base` (scores), `text-sm` (body), `text-xs` (secondary), `text-[11px]` (captions), `text-[10px]` (labels/links)
- **Weights**: `font-black` (headings, scores), `font-bold` (CTAs, labels), `font-semibold` (emphasis), `font-medium` (nav, links)

### Spacing & Radius
- **Border radius**: `rounded-2xl` (cards, buttons), `rounded-3xl` (phone frame corners, sheets), `rounded-xl` (icons, small cards), `rounded-full` (badges, avatars)
- **Base radius**: `0.75rem`
- **Padding**: `p-4`/`p-5`/`p-6` (cards), `px-6`/`px-8` (screen padding), `pt-14` (top safe area)

### Card Elevation System
| Level | Class | Shadow | Border |
|-------|-------|--------|--------|
| Flat | `card-flat` | None | `border border-border` |
| Raised | `card-raised` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | `border border-border/50` |
| Elevated | `card-elevated` | `0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)` | `border border-border/30` |

---

## 5. Component Patterns & Reusable Elements

### PhoneFrame
- Container: `w-[390px] h-[844px]` (iPhone 15 Pro dimensions)
- Styling: `bg-white rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.3)] border-[6px] border-[#1A1A2E]`
- Page background: `bg-[#0F172A]` (dark navy)
- Dynamic Island: `w-[126px] h-[34px] bg-black rounded-full` centered at top
- Home Indicator: `w-[134px] h-[5px] bg-black/15 rounded-full` centered at bottom

### StreakRing (SVG Component)
- 90×90px SVG with `viewBox="0 0 90 90"`
- Background circle: `stroke="#E2E8F0"`, `strokeWidth={6}`
- Progress circle: gradient from `#FF9500` to `#FF6B00`, `strokeWidth={6}`, animated via `ring-fill`
- Center: Flame icon + streak count number

### ShareSheet (iOS-style Bottom Sheet)
- Overlay: `bg-black/40 backdrop-blur-sm`, full-screen absolute
- Sheet: `bg-white rounded-t-3xl p-6`
- Handle bar: `w-10 h-1 bg-border rounded-full mx-auto mb-5`
- 4-column grid: iMessage (💬 green-50), WhatsApp (📱 emerald-50), Instagram/IG Story (📸 pink-50), Copy Link (🔗 gray-50)
- Each: `w-14 h-14` icon container + `text-[10px]` label
- URL preview: `p-3 bg-pact-surface rounded-xl` with monospace link text
- Cancel button at bottom

### Demo Panel
- Position: `fixed top-4 right-4`, `w-[220px]`
- Header: `bg-pact-charcoal text-white`, collapsible with chevron
- 20 states in 6 groups: Onboarding (2), Core (3), Daily (5), Results (4), Consequence (4), Retention (2)
- Active state: green fill background
- Reset button in coral

### Button Patterns
- **Primary**: `bg-pact-green text-white font-bold rounded-2xl py-4 hover:bg-pact-green-light active:scale-[0.97]`
- **Secondary**: `bg-pact-surface text-pact-charcoal font-bold rounded-2xl py-3.5`
- **Destructive**: `bg-pact-missed text-white font-bold rounded-xl`
- **Ghost**: `text-muted-foreground text-xs hover:text-pact-charcoal`
- **Share**: `bg-pact-xp/10 text-pact-xp font-bold rounded-2xl`

### Transition Patterns
- All interactive elements: `transition-all` or `transition-colors`
- Press feedback: `active:scale-[0.97]` or `active:scale-[0.98]`
- Hover: opacity change or background shift

---

## 6. Animation System

### Entry Animations
| Name | Duration | Easing | Effect |
|------|----------|--------|--------|
| `fadeIn` | 0.35s | ease-out | Opacity 0→1, translateY 6px→0 |
| `slideUp` | 0.4s | ease-out | Opacity 0→1, translateY 16px→0 |
| `scaleIn` | 0.3s | cubic-bezier(0.34, 1.56, 0.64, 1) | Opacity 0→1, scale 0.85→1 |
| `pop` | 0.4s | cubic-bezier(0.34, 1.56, 0.64, 1) | Scale 0.5→1.15→1, overshooting |
| `count-up` | 0.5s | cubic-bezier(0.34, 1.56, 0.64, 1) | TranslateY 100%→0 |
| `celebrate` | 0.6s | ease-in-out | Scale+rotate wobble (1→1.2 rotate ±5°→1) |

### Looping Animations
| Name | Duration | Effect |
|------|----------|--------|
| `pulse-glow` | 2s | Green box-shadow pulses in/out |
| `bounce-subtle` | 1.2s | TranslateY 0→-3px→0 |
| `streak-fire` | 1.5s | Scale 1→1.1, brightness 1→1.2 |
| `ring-fill` | 1.2s | SVG stroke-dashoffset animation |

### Stagger System
- Classes: `stagger-1` through `stagger-5`
- Delay increment: 0.08s per step (0.08s, 0.16s, 0.24s, 0.32s, 0.40s)
- Initial state: `opacity: 0` (requires `animate-fade-in` or similar to resolve)

---

## 7. Demo Data & Challenge Configuration

### Demo Scenario
- **Circle**: Cornell Crew 🐻 (ID: `cornell-crew`)
- **Members**: Radhika 👩🏽 ($10/day), Ketan 👨🏽 ($8/day), Yuge 👨🏻 ($5/day)
- **Challenge**: Delivery Detox 🍕 (no food delivery Mon–Thu)
- **Duration**: 7 days (Oct 5–11, 2026), 4 eligible days
- **Consequence**: Karaoke Confession 🎤

### Challenge Templates (5)
1. Delivery Detox 🍕 — No food delivery (Mon–Thu)
2. Shopping Reset 🛍️ — No impulse online shopping (Mon–Fri)
3. Coffee at Home ☕ — No café coffee (Mon–Fri)
4. No Rideshare Weekend 🚶 — Walk/bike/transit (Sat–Sun)
5. Custom Challenge ✨ — User-defined

### Consequence Cards (8)
1. Karaoke Confession 🎤
2. Funny Selfie 🤳
3. Impression Challenge 🎭
4. Trivia Showdown 🧠
5. Dramatic Apology 💔
6. Dance Challenge 💃
7. Group Playlist Duty 🎵
8. Motivational Speech 📢

### Goal Options (6)
| Goal | Emoji | Default Target |
|------|-------|---------------|
| Travel | ✈️ | $2,000 |
| Tech | 💻 | $1,500 |
| Emergency Fund | 🛡️ | $3,000 |
| Student Loans | 🎓 | $5,000 |
| Housing | 🏠 | $4,000 |
| Something Special | 🎁 | $500 |

### 20 Demo States
| # | Group | State | Description |
|---|-------|-------|-------------|
| 1 | Onboarding | Welcome | Landing page |
| 2 | Onboarding | Onboarding | 3-step intro |
| 3 | Core | Home | Dashboard with streak, savings, trending |
| 4 | Core | Create Pact | 6-step creation flow |
| 5 | Core | Active Pact | Mid-challenge view (Day 4/4) |
| 6 | Daily | App Temptation | DoorDash intercept overlay |
| 7 | Daily | Daily Check-in | Yes/No check-in |
| 8 | Daily | Verification Pending | Transaction scan status |
| 9 | Daily | Successful Day | Success celebration |
| 10 | Daily | Missed Day | Miss acknowledgment |
| 11 | Results | Everyone Succeeds | All 4/4, celebration |
| 12 | Results | Two Tied Last | Yuge & Ketan tied |
| 13 | Results | Unique Last Place | Ketan at 2/4 |
| 14 | Results | All Tied Below | Everyone 2/4, group reset |
| 15 | Consequence | Consequence Submitted | Evidence uploaded |
| 16 | Consequence | Consequence Verified | Circle approved |
| 17 | Consequence | Consequence Unresolved | Overdue, needs action |
| 18 | Retention | Weekly Recap | Week summary with share |
| 19 | Retention | Renew Pact | Same/new pact launch |
| 20 | Retention | Savings Progress | Goal tracking dashboard |

---

## 8. UX Changes from Original Spec (What Was Added/Modified)

### Added in Recent Sessions
1. **Bank Connection Flow** — New `onboarding-bank` screen with bank selection, simulated connecting animation, and connected confirmation
2. **Goal Persistence** — User's goal selection (name, emoji, target) flows from onboarding through Home savings card, Results achievement, Weekly Recap highlights, and all demo scenarios
3. **Share Sheets** — iOS-style share bottom sheets on Home (invite), Results (share achievement), and Weekly Recap (share week)
4. **Trending Consequences Feed** — "Top Consequences This Week" section on Home with VIRAL badge, view/like counts, and share buttons for virality
5. **Invite Friends CTA** — Purple-tinted card on Home linking to share sheet

### Design Decisions (as-built)
- White/clean backgrounds for content screens (not cream)
- Green headers with rounded bottom corners on Active Pact
- Dark navy page background (`#0F172A`) behind phone frame
- Duolingo-style streak ring replaces simple streak counter
- XP and Pact count as gamification badges
- No dark mode (light only)

---

## 9. Suggested Figma Prototype Journey

For a demo walkthrough at Maker Day 2, connect these screens in order:

### Primary Demo Path (12 screens)
1. **Welcome** → tap "Get Started"
2. **Onboarding Step 1** → tap through steps 2, 3
3. **Goal Selection** → tap "Student Loans"
4. **Account Connection** → tap "Connect Bank"
5. **Bank Selection** → tap "Chase"
6. **Connected!** → tap "Continue"
7. **Home** → scroll to show savings card + trending consequences → tap "+ Start a Pact"
8. **Active Pact** → show check-in prompt → tap check-in
9. **Check-in Success** → show streak celebration
10. **Results: Everyone Succeeds** → show celebration, standings, share
11. **Weekly Recap** → show savings summary, next challenges
12. **Home** (return) → show updated state

### Alternate Paths (for Q&A)
- Results: Unique Last → Consequence Assign → Submit → Vote
- Results: All Tied Below → Group Reset
- App Temptation → Keep My Pact / Break Pact
- Renew → Try Something New → Launch

---

## 10. Responsive & Frame Behavior

### Phone Frame Specs
- **Device**: iPhone 15 Pro (390×844 logical pixels)
- **Frame border**: 6px solid `#1A1A2E`
- **Corner radius**: 3rem (48px)
- **Shadow**: `0 0 60px rgba(0,0,0,0.3)`
- **Dynamic Island**: 126×34px centered, 12px from top

### Content Scrolling
- All screens use `overflow-y-auto` inside the phone frame
- Horizontal scroll: Challenge cards on Home use `overflow-x-auto flex gap-3 scrollbar-none`
- Bottom nav is fixed within the phone frame (not fixed to viewport)

### Safe Areas
- Top: `pt-14` (56px) accounts for Dynamic Island
- Bottom: Home indicator bar `w-[134px] h-[5px]` + nav bar height

### Not Responsive
- This is a prototype rendered inside a fixed phone frame, not a responsive web app
- Desktop wrapper (`bg-[#0F172A]`) fills the page behind the phone
- Demo panel floats at `fixed top-4 right-4` outside the phone frame
