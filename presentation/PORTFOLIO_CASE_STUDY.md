# PACT — PM Portfolio Case Study
*Cornell Tech Product Studio, Fall 2026*

---

## The Problem

People intend to save money but fail at the point of spending. Budgeting apps explain what happened after the fact. Savings automation moves money without changing behavior. Neither addresses the moment when someone opens DoorDash instead of cooking.

The core insight: **spending decisions happen in a convenience-seeking state, not a planning state.** Tools that operate at the planning level (budgets, auto-transfers) don't intervene where the behavior actually occurs.

---

## Customer and Market

**Target**: Young professionals 24–35, urban, spending $300+/month on food delivery, with close friend groups who share similar habits.

**Market context**: Consumer fintech is saturated with budgeting and savings tools. Most compete on features (better categorization, smarter automation). PACT competes on a different dimension: **social accountability for spending behavior**, which none of the major players offer.

**Starting wedge**: Cornell Tech friend groups of 3–5 people doing weekly "Delivery Detox" challenges.

---

## Why Social Savings

The academic evidence for social accountability is strong: structured group commitment increases goal follow-through by ~65% vs. solo intentions (ASTD research). But existing implementations are either:
- **Punitive** (StickK, Beeminder): monetary penalties feel like punishment, not fun
- **Generic** (habit trackers): no financial connection, no friend groups
- **Solo** (budgeting apps): no accountability mechanism

PACT's bet: **playful social stakes with friends are more sustainable than monetary penalties with strangers.**

---

## Alternatives Considered

| Alternative | Why We Positioned Differently |
|-------------|------------------------------|
| Solo budgeting app | Backward-looking, no behavior change mechanism |
| Savings automation | Moves money but doesn't change spending decisions |
| Monetary commitment contracts | Punitive; creates anxiety, not fun; legal concerns |
| App blockers alone | No social dimension, no savings connection, easy to disable |
| Together + Competition modes | Tested in early concept; added complexity without validated demand |

---

## Product Differentiation

PACT combines four elements that don't exist together in any current product:
1. **Friend groups** (not strangers or solo) as the accountability unit
2. **Shared behavioral challenge** (same rules for all) vs. individual budgets
3. **Non-monetary social consequences** (playful dares) vs. financial penalties
4. **Daily savings allocation** (each successful day = $X toward a personal goal)

---

## Prioritization Decisions

### What we built (P0–P1)
- Complete social challenge loop (create → check-in → results → consequence → renew)
- 4 outcome variants enforcing 15 product rules
- Duolingo-style gamification (streak rings, XP, animations)
- Goal persistence (selected goal flows through all screens)
- Share sheets and trending consequences (viral acquisition design)
- Bank connection flow (simulated)
- App temptation intercept (simulated)

### What we deliberately excluded
- **Multiple challenge modes** — "Together" and "Competition" modes were in the original spec. We removed them because one simple experience was more important than optionality that hadn't been validated.
- **Strictness settings** — "Allow 1 miss per week" was considered. Removed because it undermined the simplicity of "did you keep your Pact?"
- **Monetary forfeitures** — Early concepts included money redistribution. Removed because (a) it made consequences feel punitive, (b) legal complexity of handling user funds, (c) social toxicity risk in friendships.

### Why we simplified challenge rules
The original spec had complex scoring with partial credit, adjusted weights, and missed-day penalties. We reduced it to: **successful eligible days out of total eligible days, measured identically for every member.** This made leaderboard logic transparent and consequence assignment fair.

---

## How the Prototype Works

**Tech stack**: Next.js 16, TypeScript, Tailwind CSS v4, Zustand (state management), Lucide React (icons). Single-page app with 15 screen components and 20 demo states.

**Interaction model**: Screen switching via Zustand store. No URL routing, no backend, no database. All data is in-memory with hardcoded demo scenarios.

**Demo panel**: Right-side panel with 20 clickable states organized in 6 groups. Allows jumping to any point in the user journey instantly. Essential for presentations.

**Design system**: Custom Tailwind tokens (16 colors, 3-tier card elevation, 10 animations, 5-step stagger system). Duolingo-inspired visual language with streak rings, XP badges, and celebration animations.

---

## Verification and Technical Tradeoffs

### The verification problem
PACT asks "Did you avoid food delivery today?" and relies on manual check-in (honor system). Real verification would require:
1. Bank transaction scanning via Plaid (24–48 hour delay, incomplete merchant matching)
2. App usage tracking (not feasible on iOS, limited on Android)
3. Purchase receipt scanning (user friction, incomplete coverage)

**Decision**: Ship with manual check-in for MVP. The social pressure of visible leaderboard standings provides sufficient honesty incentive for friend groups. If users consistently lie to friends, the product has a larger trust problem that verification can't solve.

### The app interception problem
The prototype shows a "Temptation Shield" screen that simulates blocking DoorDash. In reality:
- iOS does not allow apps to intercept or block other apps (Apple policy)
- Android allows limited interception via accessibility services (users can disable)
- The feature is a UI concept, not a technical commitment

**Decision**: Position app friction as a future differentiator on Android. Don't promise it as a core feature.

---

## Business Model Hypotheses

1. **Freemium** with $5.99/month premium (multiple Circles, custom challenges, advanced analytics)
2. **Viral acquisition** through consequence content sharing (Instagram, TikTok)
3. **Banking partnerships** longer-term (co-branded challenges with credit unions)

None of these have been validated. Revenue is entirely hypothetical.

---

## What We Did Not Test

- No customer interviews conducted
- No willingness-to-pay research
- No retention data (no real users)
- No viral coefficient measurement
- No banking partner conversations
- No regulatory review

---

## What We Would Test Next

1. **Manual concept test** (2 weeks): 5 friend groups do Delivery Detox via group chat + spreadsheet + manual consequence tracking. Measure: does anyone do a second round?
2. **Consequence comfort test**: Show consequence examples to 20 target users. Ask: "Would this feel fun or uncomfortable in your friend group?" Measure the percentage who say uncomfortable.
3. **Willingness to pay**: After the manual test, offer a "premium version" at $5.99/month. Measure intent.

---

## What We Learned

1. **Simplicity wins**: One challenge experience with clear rules is more compelling than multiple modes with complex settings
2. **Consequences must feel like features, not punishments**: Removing monetary penalties and making consequences playful/shareable transforms the social dynamic from anxiety to entertainment
3. **The product loop needs a social content layer**: Trending consequences and share sheets aren't just features — they're the viral acquisition channel
4. **The hardest activation step is getting 3+ friends to download simultaneously**: This is the real cold-start problem, not the app experience itself
5. **Verification is a luxury, not a necessity for MVP**: Social pressure from visible scores provides sufficient honesty incentive in friend groups

---

## What This Case Demonstrates

- **Customer understanding**: Identified that the next-best alternative is a group chat (not another app) and designed against it
- **Product strategy**: Made difficult tradeoff decisions (removed monetary penalties, simplified modes, accepted simulated verification)
- **Prioritization**: Built a complete interactive prototype focusing on the core social loop, not infrastructure
- **Technical judgment**: Identified infeasible features (iOS app interception) and designed alternatives
- **Business reasoning**: Built revenue model with explicit assumptions and acknowledged what's unvalidated
- **Experimentation thinking**: Proposed falsifiable tests with specific metrics and guard rails
- **Design sense**: Duolingo-inspired gamification applied to fintech with a coherent design system
