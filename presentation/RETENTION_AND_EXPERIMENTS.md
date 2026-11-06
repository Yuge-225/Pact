# PACT — Retention Model & Experiments

---

## Current Product Repeat-Use Loop

```
Download → Onboarding → Select Goal → Connect Bank
  → Home Dashboard
    → Create Pact (or join via invite)
      → Daily Check-in (Mon–Thu for Delivery Detox)
        → See streak grow, XP accumulate
        → See Circle standings update
        → [Optional] App Temptation intercept
      → Challenge ends → Results screen
        → If losers: Consequence lifecycle (assign → submit → vote)
        → If all perfect: Group celebration
      → Weekly Recap (savings summary, goal progress)
      → Renew same pact OR try new challenge
    → Return to Home (updated streak, savings, XP)
```

**Cycle time**: 7–30 days per pact. Intended rhythm: weekly challenges that compound into monthly savings habits.

---

## Key Metrics (Definitions)

| Metric | Definition | Target (Hypothesis) |
|--------|-----------|-------------------|
| **Activation** | User completes onboarding + joins first pact | 60% of downloads |
| **First successful pact** | User completes all eligible days in first pact | 40% of activated |
| **Check-in rate** | % of eligible days where user checks in | >80% |
| **Savings allocated** | Cumulative $ allocated from successful days | Tracked per user |
| **Invitation acceptance** | % of invited friends who download + join | 30% of invites |
| **Circle participation** | % of Circle members who check in on a given day | >70% |
| **Repeat pact creation** | User starts a 2nd pact after completing 1st | 50% of completers |
| **Weekly active Circles** | Circles with at least 1 active pact in the week | Growth metric |
| **Week-1 retention** | % of activated users active 7 days later | 40% |
| **Week-4 retention** | % of activated users active 28 days later | 20% |
| **Verification completion** | % of check-ins confirmed by transaction data | N/A (simulated) |
| **Consequence completion** | % of assigned consequences submitted and verified | 70% |
| **Negative social experiences** | % of users who report consequence was uncomfortable | <10% |

**All targets above are hypothetical. No user data exists.**

---

## Retention Risks

1. **Check-in fatigue**: Daily check-in becomes a chore by week 2–3
2. **Consequence awkwardness**: First consequence experience may be fun; subsequent ones may feel forced
3. **Circle dropout**: If one member stops participating, the entire Circle dynamic breaks
4. **Challenge repetition**: Only 5 templates + custom. Novelty fades quickly
5. **Savings disconnect**: Allocated savings aren't real money movement — users may stop caring about display numbers
6. **Honor system gaming**: Manual check-in is easy to cheat, undermining group trust

---

## Proposed Experiments

### Experiment 1: Solo vs. Circle-Based Saving

**Hypothesis**: Users in Circles save more and check in more consistently than users tracking solo.

**Test design**: Recruit 20 participants. Random assign 10 to use Pact in a Circle of 3–5 friends. Assign 10 to use a solo version (same check-in, streak, savings tracking, but no Circle, no leaderboard, no consequence). Run for 2 weeks.

**Primary metric**: Check-in completion rate (% of eligible days with check-in)
**Guardrail metric**: User satisfaction (1–5 survey at end)
**Falsification criterion**: If solo users check in at ≥90% the rate of Circle users, the social component doesn't meaningfully drive engagement.

### Experiment 2: App Friction vs. No App Friction

**Hypothesis**: Adding a friction screen when users open delivery apps increases successful days.

**Test design**: Within active Circle pacts, A/B test whether the app temptation screen appears. Measure check-in success rate.

**Primary metric**: Successful day rate (% of eligible days marked success)
**Guardrail metric**: App uninstall rate
**Falsification criterion**: If success rate difference is <5 percentage points, the friction screen is not worth the implementation complexity.

**Technical note**: This experiment requires real app interception, which is not feasible on iOS. Could be tested on Android only, or simulated via a scheduled notification at typical ordering times.

### Experiment 3: Social Consequences vs. No Consequences

**Hypothesis**: The consequence mechanism increases engagement and repeat pact creation.

**Test design**: Run 10 Circles with consequences enabled, 10 without (losers acknowledged but no dare). 2 pact cycles each.

**Primary metric**: Repeat pact creation rate (% who start a 2nd pact)
**Guardrail metric**: Negative experience reports, Circle dissolution rate
**Falsification criterion**: If repeat pact rate is ≤10 percentage points higher with consequences, the consequence mechanism doesn't drive retention enough to justify the social risk.

### Experiment 4: Short (7-day) vs. Longer (14-day) Challenges

**Hypothesis**: Shorter challenges have higher completion rates and higher repeat creation rates.

**Test design**: Random assign Circles to 7-day or 14-day challenges. Same challenge type (Delivery Detox).

**Primary metric**: Pact completion rate (% of members who check in on all eligible days)
**Guardrail metric**: Total savings allocated (longer challenges should save more per cycle)
**Falsification criterion**: If 14-day challenges have ≥85% the completion rate of 7-day, longer challenges are viable and save more total.

### Experiment 5: Predefined vs. Custom Challenges

**Hypothesis**: Predefined challenges (Delivery Detox, Coffee at Home) have higher engagement than custom challenges.

**Test design**: Track engagement metrics by challenge type across all users. Compare check-in rate, completion rate, and repeat creation.

**Primary metric**: Check-in rate by challenge type
**Guardrail metric**: Custom challenge creation rate (indicates demand for flexibility)
**Falsification criterion**: If custom challenges have ≥90% the check-in rate of predefined, the curation isn't adding value.

---

## Why Retention Remains a Hypothesis

No users have used PACT beyond prototype demonstrations. The repeat-use loop is designed into the product (renew screen, weekly recap, streak continuity) but whether these mechanisms actually drive repeated engagement is unknown.

The strongest retention signal from comparable products:
- Duolingo retains ~9% of users at Day 30 (public data)
- Fitness challenge apps typically see 30–50% drop-off after the first challenge
- Social commitment devices (StickK) have ~30% goal completion rates

PACT's retention will likely fall somewhere in this range, but without real data, any specific number is speculation.
