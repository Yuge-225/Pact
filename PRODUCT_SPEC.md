# PACT — Product Specification

## Overview
Pact is a social savings app where friends commit to changing the same spending behavior, hold each other accountable with playful consequences, and turn successful days into personal savings progress.

## User Journeys

### 1. New User Onboarding
Welcome → Value prop (3 steps) → Choose savings goal → Connect bank (simulated) → Home

### 2. Creating a Pact
Home → Discover challenges → Select template → Set duration + eligible days → Choose Circle → Pick consequence → Set personal savings amount and goal → Review → Start

### 3. Daily Participation
Active Pact dashboard → View progress → Check-in (confirm success or miss) → See verification status → View Circle standings

### 4. At-the-Moment Intervention
User opens delivery app → Pact intercepts → Shows progress, Circle, and savings goal → "Keep My Pact" or "Break Pact & Continue"

### 5. End-of-Pact Results
Four outcomes:
- **All perfect**: Group celebration, no consequence
- **Unique last place**: Last-place member receives pre-agreed consequence
- **Multiple tied for last**: All tied members receive same consequence
- **All tied below perfect**: Group reset, no consequence for anyone

### 6. Consequence Completion
Assigned → 48-hour window → Submit evidence (photo/video/text) → Circle members vote → Verified or Needs Redo → If unresolved: reminder, substitute, or waiver

### 7. Retention Loop
Results → Weekly recap → Suggested next challenges → One-tap renewal or new challenge → Invite friends

## Features

### Challenge Templates
| Template | Category | Default Days | Suggested Apps |
|----------|----------|-------------|----------------|
| Delivery Detox | Food & Dining | Mon-Thu | DoorDash, Uber Eats, Grubhub, Postmates |
| Shopping Reset | Shopping | Mon-Fri | Amazon, Zara, Shein, Target |
| Coffee at Home | Food & Dining | Mon-Fri | Starbucks, Dunkin |
| No Rideshare Weekend | Transport | Sat-Sun | Uber, Lyft |
| Custom Challenge | Custom | Mon-Fri | User-defined |

### Consequence Deck
All consequences are playful, non-financial, opt-in, and agreed before the challenge starts:
- Karaoke Confession, Funny Selfie, Impression Challenge, Trivia Showdown
- Dramatic Apology to Your Savings Goal, Dance Challenge
- Group Playlist Duty, One-Minute Motivational Speech

### Leaderboard Rules
- Ranked by successful eligible days, not dollars saved
- Ties displayed as ties — no arbitrary tie-breakers
- During active Pact: show progress without premature loser declaration
- At end: apply the four outcome scenarios above

### Personal Savings
- Each successful day creates a simulated savings allocation
- Missed days create no allocation
- Friends see participation status, not bank balances or savings amounts
- Simulated checking → savings transfer visualization
- Progress toward personal goal with percentage and progress bar

### Verification Model
1. Simulated transaction monitoring (periodic checks)
2. Pending verification status during the day
3. Manual end-of-day check-in as fallback
4. Absence of matching transaction ≠ conclusive proof
5. Disputed status available for edge cases

## Edge Cases

### Schedule Validation
- Cannot create a Pact with zero eligible days
- Eligible days calculated from duration + selected weekdays
- Displayed clearly before confirmation

### Consequence Handling
- Unresolved consequences: reminder → extension → substitute → waiver
- Never blocks future Pacts
- Never removes earned savings progress
- Missing votes from reviewers: explicit Circle decision required, never silent auto-approval

### Circle Management
- Creator sets shared rules (schedule, duration, consequence)
- Each member picks their own savings amount and goal
- Members accept shared rules before joining
