# PACT — Product Strategy

---

## 1. CIRCLES Framework

### Target Customer
Students and young professionals (24–35) who spend impulsively on convenience services (food delivery, rideshare, coffee chains) and want to save but struggle to follow through alone.

**Starting wedge**: Existing friend groups of 3–5 people at universities or workplaces where food delivery is a known shared habit. Cornell Tech students are the prototype user — they talk about saving, they order DoorDash together, and they already hold each other accountable informally.

### Customer Needs
- **Functional**: A mechanism to actually reduce impulsive spending and grow savings
- **Emotional**: Feeling in control of money; pride from following through; not feeling alone in the struggle
- **Social**: Shared experience with friends; fun accountability; bragging rights; belonging

### Core Problem
Individual savings intentions fade when spending decisions arise in the moment. Budgeting tools explain what happened after the fact but don't change the next decision. People know they should save more; they fail at the point of temptation, not the point of planning.

### Customer Alternatives
1. **Group chat + willpower** (primary alternative — free, familiar, zero setup)
2. **Budgeting apps** (Mint, YNAB, Copilot) — backward-looking, solo
3. **Savings automation** (Qapital, Digit, Acorns) — set-and-forget, no behavioral change
4. **Habit trackers** (Streaks, Habitica) — solo, no financial connection
5. **Commitment contracts** (StickK, Beeminder) — punitive, monetary penalties, solo
6. **App blockers** (One Sec, Opal) — friction only, no social or financial dimension

### Prioritization
P0: Social challenge loop (create pact → daily check-in → results → consequence → renew)
P1: Savings goal tracking, app temptation friction, share/virality
P2: Real bank connections, transaction verification, notifications
P3: Real money movement, app interception

### MVP Scope (as built)
Fully interactive prototype demonstrating the core social savings loop with 15 screens, 20 demo states, and 4 result outcomes. All financial operations simulated. Sufficient to validate the concept and user experience before building a backend.

### Product Tradeoffs Made
| Decision | Chosen | Rejected | Rationale |
|----------|--------|----------|-----------|
| Challenge modes | Single simple mode | Together + Competition | Complexity without validated demand |
| Consequences | Playful dares only | Monetary penalties | Trust, legality, social toxicity risk |
| Failure handling | Group reset if all tie | Punish everyone | Preserve group cohesion |
| Verification | Simulated (manual check-in) | Real transaction scanning | Technical feasibility for MVP |
| Member acceptance | Instant "All in" | Wait for each member | Demo simplicity; real product would need async |

---

## 2. Jobs-to-be-Done

### Functional Job
"Help me actually reduce my impulse spending and put that money toward a goal I care about."

### Emotional Job
"Make me feel like I'm making progress and in control of my finances, not just tracking failures."

### Social Job
"Give me and my friends a shared challenge that's fun, competitive, and brings us closer — not awkward or judgmental about money."

### Triggering Circumstances
- End of month, realizing how much went to DoorDash
- Friend group conversation: "We should all stop ordering delivery"
- Seeing a goal (trip, laptop, loan payment) feel unreachable
- Getting a credit card statement that's higher than expected
- New Year's / semester start motivation

### Desired Outcome
A recurring weekly rhythm where the user and their friends commit to a spending behavior, hold each other accountable daily, connect successful days to savings progress, and either celebrate together or laugh through a playful consequence — then do it again.

---

## 3. Customer Value Proposition

### What PACT Offers
A structured way for friend groups to commit to a shared spending behavior change, track daily progress together, connect each successful day to a personal savings goal, and hold the last-place finisher to a pre-agreed playful consequence.

### Why It Matters
Saving money alone is boring and easy to quit. Social pressure and shared commitment create the daily motivation that solo tools lack. The consequence mechanism adds stakes without financial risk. The savings connection makes each day feel productive.

### Why Customers Might Choose It
- Their existing alternative (group chat + willpower) lacks structure, tracking, and follow-through
- Pact makes the abstract ("I should save more") into a concrete daily question ("Did you avoid delivery today?")
- The social consequence is fun enough to be a feature, not a punishment
- Seeing savings grow from successful days is more motivating than tracking what you spent

### What Makes It Different
The combination of (1) friend groups, not strangers; (2) shared behavioral commitment, not solo budgeting; (3) playful social consequences, not monetary penalties; and (4) savings goals tied to daily success, not just spending reduction.

---

## 4. Cornell Value Creation Analysis (Summary)

**Will people buy it?**
The hypothesis is that the social accountability and fun consequences create enough additional motivation over a group chat to justify the setup effort. This remains unvalidated. The strongest signal is that informal group commitments already happen — Pact structures what people already try to do.

**Can we make it?**
The core social loop (create → check-in → results → consequence → renew) is technically straightforward. The hardest parts are bank integration (Plaid, $250+/mo), real app interception (infeasible on iOS, limited on Android), and transaction verification (incomplete, delayed). The prototype demonstrates the UX is buildable; the backend is standard.

**Starting wedge**: Cornell Tech friend groups doing "Delivery Detox" — a narrow, testable behavior with a clear spending category and existing informal accountability.

---

## 5. Business Model Canvas (Summary)

| Block | Content |
|-------|---------|
| **Value Prop** | Social savings through friend-group challenges with playful accountability |
| **Customer Segments** | Young professionals 24–35, starting with university students |
| **Channels** | Viral share links, word-of-mouth, university partnerships |
| **Customer Relationships** | Daily check-in habit, weekly recaps, Circle social dynamics |
| **Key Activities** | Product development, user acquisition, banking partnerships |
| **Key Resources** | Mobile app, banking integration (Plaid), user data |
| **Key Partners** | Banking API providers (Plaid/MX), eventually banks/credit unions |
| **Revenue Streams** | Freemium (free core, premium features), potential bank partnerships |
| **Cost Structure** | Engineering, banking API costs, hosting, customer support |

Full BMC in BUSINESS_MODEL_CANVAS.md.
