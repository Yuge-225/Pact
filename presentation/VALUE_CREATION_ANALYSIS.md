# PACT — Value Creation Analysis (Cornell Framework)

---

## Step 1 — Business Model Summary

PACT proposes a freemium social savings app where friend groups commit to shared spending challenges. Revenue comes from premium subscriptions ($5–8/month for advanced features) and potentially from financial institution partnerships.

**Most important assumptions**:
1. Friend groups will repeatedly create and complete pacts (retention, not just trial)
2. Social accountability creates meaningfully more savings behavior than solo alternatives
3. The consequence mechanism is fun enough to drive engagement without causing social harm
4. Users will pay for premium features after experiencing the free tier
5. Banking APIs can provide sufficient transaction data for verification at acceptable cost

---

## Step 2 — Points of Comparison

### Customer's Next-Best Option
A group chat where friends say "let's stop ordering DoorDash this week" — free, zero setup, familiar, but lacks structure, tracking, and follow-through.

### Comparable Operational Systems
- **Duolingo**: Daily streak gamification for language learning → PACT borrows streak/XP mechanics for savings behavior
- **Strava**: Social fitness challenges with friends → PACT applies friend-group accountability to spending
- **StickK**: Commitment contracts with monetary penalties → PACT replaces financial punishment with playful dares
- **Qapital**: Rule-based savings automation → PACT adds behavioral change and social dimensions

### Adjacent Industry References
- **Fitness challenges** (Peloton, Nike Run Club): Prove that social competition drives habit consistency
- **Savings gamification** (Long Game, now defunct): Proved gamification can engage savers; failed on retention
- **Social betting** (WagerLab, among friends): Proves friends will create stakes; Pact uses non-monetary stakes

---

## Step 3 — What's New and What's Old?

### Existing (not invented by PACT)
- **Automated savings** — Acorns, Digit, Qapital have done round-ups and rule-based transfers for years
- **Social accountability** — Fitness apps, study groups, AA sponsors all use social pressure
- **Streak gamification** — Duolingo, Snapchat, and dozens of apps use streak mechanics
- **App friction/blocking** — One Sec, Opal, Screen Time all add friction to app launches
- **Commitment devices** — StickK, Beeminder use commitment contracts (academic concept since 2000s)

### PACT's Proposed Combination (new)
The specific combination of:
1. **Friend groups** (not strangers or solo) as the accountability unit
2. **Shared behavioral challenge** (same rules for everyone) — not individual budgets
3. **Non-monetary social consequences** (playful dares) — not financial penalties
4. **Daily savings allocation** (each successful day = $X toward a personal goal)
5. **Recurring challenge cycles** (7–30 days, then renew)

### Potential Differentiation
The consequence mechanism — where the last-place finisher does a fun dare chosen by the group — is uncommon in fintech. Most savings/spending products are either solo (budgeting apps) or punitive (commitment contracts). PACT proposes that fun social stakes are more sustainable than monetary penalties.

### Unproven Claims
- That the combination creates more behavior change than its parts
- That playful consequences sustain engagement across multiple pact cycles
- That users will form Circles and repeatedly create pacts (network activation)
- That viral consequence content will drive organic acquisition

---

## Step 4 — Will People Buy It?

### Net Benefit Analysis

**Value derived** (relative to group chat):
| Benefit | Magnitude | Evidence |
|---------|-----------|---------|
| Sustained motivation (streaks, XP) | Medium | Duolingo shows streaks drive 2.5x retention (public data) |
| Structured accountability | Medium | Informal commitments have ~15% follow-through (behavioral economics literature) |
| Savings visualization | Low-Medium | Seeing progress is motivating but Pact doesn't move real money yet |
| Fun consequences | Medium | Hypothesis — untested with real users |
| Social content/sharing | Low | Hypothesis — no viral coefficient measured |

**Total cost of ownership** (relative to group chat):
| Cost | Magnitude | Mitigation |
|------|-----------|-----------|
| Setup effort | Medium | 6-step creation flow (~3 min); friends must all download |
| Daily check-in | Low | ~10 seconds per day |
| Privacy | Medium | Bank connection concern; mitigated by simulation disclosure |
| Social discomfort | Variable | Consequence opt-in before start; no financial penalties |
| Subscription cost | Low | Free tier covers core; premium $5–8/month |

### Three Distinct Questions

**1. Will customers try PACT?**
LIKELY YES — if one friend in a group is an enthusiast. The invitation mechanic leverages existing social obligation. First-pact trial requires minimal commitment (7 days). The consequence mechanic is intriguing enough to try once.

**Key risk**: Getting 3+ friends to download an app simultaneously. This is the hardest activation step.

**Evidence**: Prototype reactions (informal). No formal user testing conducted.

**2. Will customers repeatedly use PACT?**
UNCERTAIN — this is the critical unknown. The renewal loop (results → recap → renew) is designed but untested. Possible failure modes:
- Consequence novelty wears off after 2–3 cycles
- Check-in fatigue after initial excitement
- Circle participation drops if one member disengages
- Challenge variety is limited (5 templates)

**Evidence**: None. Retention is entirely hypothetical.

**3. Will customers or partners pay for PACT?**
UNKNOWN — no willingness-to-pay testing has been done. The freemium model assumes 5–10% premium conversion, but:
- Free tier may be sufficient for most users
- Premium features (multiple Circles, custom challenges) may not have enough perceived value
- Banking partner revenue requires proven engagement data that doesn't exist yet

**Evidence**: None. Financial viability is speculative.

---

## Step 5 — Can We Make It?

### Technical Feasibility

| Component | Feasibility | Risk |
|-----------|-------------|------|
| Core social loop (create, check-in, results) | HIGH — standard mobile app | Low |
| Circle management & invitations | HIGH — standard social features | Low |
| Leaderboard & outcome calculation | HIGH — demonstrated in prototype | Low |
| Savings tracking & goal progress | HIGH — UI math, no real money | Low |
| Bank linking (Plaid/MX) | MEDIUM — established APIs, cost concern | Medium |
| Transaction verification | MEDIUM — delayed data, incomplete coverage | High |
| App interception/blocking | LOW — infeasible on iOS, limited Android | Very High |
| Real savings transfers | MEDIUM — requires payment rails (ACH), regulatory | High |
| Push notifications | HIGH — FCM/APNS standard | Low |

### Operational Feasibility

| Operation | Feasibility | Risk |
|-----------|-------------|------|
| User onboarding | HIGH — 3-min flow demonstrated | Low |
| Circle invitation & activation | MEDIUM — requires simultaneous friend adoption | Medium |
| Consequence moderation | MEDIUM — user-generated content needs review | Medium |
| Consequence disputes | LOW — no dispute resolution designed yet | High |
| Customer support | MEDIUM — standard at small scale | Low |
| Banking partnerships | LOW — banks are slow; no relationships exist | High |
| Fraud/misuse | MEDIUM — honor-system check-ins are gameable | Medium |

### Financial Feasibility

| Metric | Conservative | Base | Optimistic | Basis |
|--------|-------------|------|-----------|-------|
| MAU at Month 12 | 500 | 2,000 | 8,000 | Hypothesis — no acquisition data |
| Premium conversion | 3% | 7% | 12% | Industry: 2–10% for social apps |
| Subscription price | $4.99/mo | $5.99/mo | $7.99/mo | Comparable: Duolingo $7, Strava $5 |
| Monthly subscription revenue | $75 | $838 | $7,670 | MAU × conversion × price |
| Monthly Plaid costs | $150 | $600 | $2,400 | ~$0.30/user/month for basic |
| Monthly hosting | $50 | $200 | $500 | Vercel/AWS |
| **Net margin** | **-$125** | **+$38** | **+$4,770** | Revenue - variable costs only |

**All numbers above are hypothetical assumptions. No revenue has been generated.**

### Important Technical Limitations

1. **App interception is not feasible on iOS** — Apple does not allow apps to intercept or block other apps. The "Temptation Shield" screen in the prototype is a visual simulation. On Android, limited interception is possible via accessibility services, but users can disable it.

2. **Transaction verification is incomplete** — Bank APIs (Plaid) provide transaction data with 24–48 hour delays. Absence of a matching transaction does not prove the user avoided a purchase (cash, different card, different merchant name). Real-time verification is not possible.

3. **Bank connections don't authorize transfers** — Linking a bank account via Plaid provides read access to transactions. Moving money requires separate ACH authorization, compliance review, and payment rail integration.

4. **Simulated savings are not actual money movement** — The prototype shows "$370 saved toward Italy Trip" but no real money has been moved. A real product would need to either (a) integrate with a savings account for actual transfers or (b) clearly frame savings as "allocated" not "deposited."

---

## Central Business Logic

**"People will buy PACT because** saving alone is boring and easy to quit — a structured challenge with friends, daily streaks, and playful social consequences creates the accountability and fun that turns good intentions into actual behavior change.**"**

**"We can make PACT because** the core social challenge loop is technically straightforward (create, check-in, leaderboard, results, renew), banking APIs exist for account linking and transaction data, and the Duolingo-style gamification patterns that drive daily engagement are well-understood.**"**

### Starting Wedge
Cornell Tech friend groups of 3–5 people doing a 7-day "Delivery Detox" — no food delivery Monday through Thursday. This is narrower than the vision (any friend group, any spending behavior, any duration) and testable with 5–10 groups.

### Riskiest Assumption
**That friend groups will repeatedly create and complete pacts beyond the first one.** Trial is plausible (novelty + social obligation). But sustained repeat use — the entire business model depends on it — is unvalidated. If pacts feel like a chore by cycle 3, the product fails regardless of acquisition.

### Most Important Next Validation
Run a 4-week concept test with 5 real friend groups using a simplified version (group chat + manual tracking + consequence enforcement) to measure: (a) completion rate of a second pact after the first, and (b) whether the consequence mechanism feels fun or uncomfortable after experiencing it.
