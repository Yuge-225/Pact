# PACT — Evidence Ledger

---

## Evidence Classification

### Supported by Demonstrated Prototype Functionality
- Core social challenge loop works: create pact → daily check-in → results → consequence → renew
- 4 outcome variants function correctly (all perfect, unique last, tied last, all tied below)
- 15 product rules are enforced in the prototype
- Goal persistence flows through all screens
- Share sheets and viral consequence feed are implemented
- 20 demo states are navigable and functional
- Duolingo-style gamification (streaks, XP, animations) is implemented

### Supported by Externally Verified Facts
- Americans 25–34 spend $300+/month on food delivery (Bureau of Labor Statistics, industry reports)
- Duolingo's streak mechanic drives 2.5x retention vs. non-streak users (Duolingo public filings)
- Social accountability increases goal follow-through by 65% vs. solo (American Society of Training & Development, widely cited)
- Plaid API exists and provides bank account linking and transaction data (public API documentation)
- StickK's monetary commitment model has ~30% goal completion rate (StickK published data)
- App blocking is not possible on iOS without MDM (Apple developer documentation)

### Product Hypotheses (Unvalidated)
- Friend groups will repeatedly create pacts after the first one
- Playful consequences are fun enough to sustain engagement without causing social harm
- The streak/XP gamification creates meaningful daily engagement
- Users will connect bank accounts despite privacy concerns
- The trending consequences feed will drive viral sharing
- Manual check-in (honor system) is sufficient for accountability
- 7-day challenges are the right default duration

### Financial Assumptions (Unvalidated)
- 5–10% of active users will convert to premium
- $5–8/month is an acceptable subscription price point
- Banking API costs ($0.30–1.50 per account link) are manageable at scale
- Viral coefficient > 1.0 is achievable through consequence sharing
- Banks will pay for engaged young savers (partnership revenue)

### Unvalidated Technical Assumptions
- Transaction verification via Plaid provides sufficient accuracy for challenge compliance
- Real-time or near-real-time spending detection is achievable (it is not — 24–48 hour delay)
- App-level spending friction can be implemented on mobile platforms (infeasible on iOS)
- ACH-based savings transfers can be built at acceptable cost and compliance burden

### Missing Evidence
- No customer interviews or surveys conducted
- No willingness-to-pay testing
- No retention data (no users have used the product)
- No viral coefficient measurement
- No advisor feedback documented in project files
- No competitive pricing research beyond public information
- No bank partnership conversations
- No regulatory or compliance review

---

## Concept Testing Plan (5 People, 1 Week)

### Participants
Recruit 5 people matching the target profile: age 24–30, urban, food delivery 3+ times/week, have a friend group of 3+.

### Interview Protocol (30 minutes each)

**Part 1 — Current Behavior (8 min)**
1. Walk me through the last time you ordered food delivery. What was the situation?
2. How much do you estimate you spend on food delivery per week?
3. Have you ever tried to cut back on delivery spending? What happened?
4. Have you used any apps or tools to help you save money? Which ones? What happened?

**Part 2 — Social Accountability (7 min)**
5. Have you and friends ever made a group commitment about spending? ("Let's stop ordering DoorDash") What happened?
6. What would make you more likely to follow through on a group commitment?
7. How would you feel about a daily check-in where you report whether you kept a spending commitment?

**Part 3 — Consequence Mechanism (7 min)**
8. If the person who did worst in a group challenge had to do a playful dare (sing karaoke, post a funny selfie), how would you feel about that?
9. Would the consequence make you more or less likely to participate?
10. What kind of consequence would feel fun vs. uncomfortable for your friend group?

**Part 4 — Prototype Reaction (5 min)**
11. *Show prototype.* Walk through the active pact and results screens. What stands out?
12. Would you use this with your friend group? Why or why not?
13. What would make you stop using it after the first challenge?

**Part 5 — Disconfirmation (3 min)**
14. What's the biggest reason you would NOT use this?
15. Is there anything your group chat already does that makes this unnecessary?

### What This Test Can Reveal
- Whether the consequence mechanism feels fun or uncomfortable
- Whether daily check-in feels manageable or tedious
- Whether the group chat is "good enough" for most people
- Whether privacy concerns about bank connection are a dealbreaker
- What failure modes would cause drop-off after the first pact

### What This Test Cannot Reveal
- Actual retention over multiple pact cycles
- Real willingness to pay
- Viral behavior
- Technical feasibility of verification
