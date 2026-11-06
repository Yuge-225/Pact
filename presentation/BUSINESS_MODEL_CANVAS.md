# PACT — Business Model Canvas

---

## 1. Value Proposition

**For the initial wedge (university friend groups)**:
A structured social savings challenge that turns "we should all stop ordering DoorDash" into a trackable, fun, recurring game with real savings progress and playful stakes.

**Longer-term vision**:
A social savings platform where any friend group can commit to behavioral spending changes, track progress toward personal financial goals, and build saving habits through community accountability.

**What we are NOT**:
- Not a budgeting tool (we don't analyze past spending)
- Not a savings automation tool (we don't auto-transfer money)
- Not a punishment platform (no monetary penalties)
- Not a financial advisor

---

## 2. Customer Segments

### Initial Wedge
**University students and recent graduates (22–28)** in existing friend groups of 3–5 people, in urban areas with high food-delivery spending. They have smartphones, bank accounts, and identifiable shared spending habits.

**Why this segment first**:
- Dense social networks (easy Circle formation)
- Shared environment (similar spending temptations)
- Price-sensitive (motivated to save)
- Social-media-native (consequence content sharing)
- Low switching cost (not deeply locked into financial tools)

### Expansion Segments (hypothetical)
- Young professionals at the same company (workplace Circles)
- Couples or roommates with shared financial goals
- Online communities with shared interests (fitness + saving)

---

## 3. Channels

### Acquisition
1. **Viral sharing** — Consequence content shared on Instagram/TikTok (built into product)
2. **Circle invitations** — Each pact creator invites 2–4 friends (built-in network effect)
3. **University partnerships** — Financial wellness programs, student organizations
4. **Word of mouth** — "We did a Delivery Detox and I saved $80"

### Distribution
- iOS and Android mobile apps (primary)
- Web prototype for demos and landing pages
- Share links for invitation flow

**Note**: Viral coefficient is a hypothesis. The trending consequences feed and share sheets are designed to enable this, but no viral growth has been measured.

---

## 4. Customer Relationships

### Engagement Model
- **Daily**: Check-in ritual (~10 seconds), activity feed updates
- **Weekly**: Weekly recap with savings summary and suggested next challenges
- **Per-challenge**: 7–30 day challenge cycles with clear start/end
- **Social**: Circle reactions, consequence participation, leaderboard competition

### Retention Mechanisms
- Streak continuity across pacts
- XP accumulation
- Savings goal progress
- Circle social pressure
- New challenge variety (5 templates + custom)
- Consequence culture (fun content generation)

---

## 5. Key Activities

| Activity | Status | Priority |
|----------|--------|----------|
| Core product development (mobile app) | Prototype built | P0 |
| Banking integration (Plaid) | Not started | P1 |
| User acquisition & growth | Not started | P1 |
| Transaction verification system | Not started | P2 |
| Real savings transfers | Not started | P2 |
| Content moderation (consequence submissions) | Not started | P2 |
| Financial partner development | Not started | P3 |

---

## 6. Key Resources

| Resource | Current State |
|----------|--------------|
| Product team | 3 people (Radhika, Ketan, Yuge) |
| Prototype | Fully functional interactive demo (Next.js) |
| Design system | Complete (Tailwind + custom tokens) |
| User research | Hypothesis stage — no formal validation |
| Banking API access | None (simulated) |
| Server infrastructure | None (client-side only) |

---

## 7. Key Partners

| Partner Type | Role | Status |
|-------------|------|--------|
| **Plaid or MX** | Bank account linking, transaction data | Required for real product; not connected |
| **Payment processor** (Stripe) | Subscription billing if premium tier | Not needed for MVP |
| **Banks / credit unions** | Potential distribution partner, savings accounts | Hypothetical |
| **App stores** (Apple/Google) | Distribution | Standard |
| **Cloud infrastructure** (AWS/Vercel) | Hosting | Not yet needed |

---

## 8. Revenue Streams

### A. Freemium Model (most plausible to test first)
- **Free**: Core challenge loop, basic savings tracking, one Circle
- **Premium ($4.99–7.99/month)**: Multiple Circles, custom challenges, advanced analytics, extended streaks, priority bank syncing
- **Assumption**: 5–10% of active users convert to premium (industry benchmark for social apps)
- **Why test first**: Lowest complexity, direct value exchange, no partner dependencies

### B. Financial Institution Partnerships (longer-term)
- Banks offer co-branded savings challenges to their customers
- Revenue: Per-enrolled-user licensing or savings-account referral fees
- **Assumption**: Banks would pay for engaged young savers. This is unvalidated — banks are slow to partner with startups, and referral economics are uncertain.
- **Dependency**: Proven user engagement and savings behavior data

### C. Savings-Adjacent Services (speculative)
- Earned financial product recommendations (high-yield savings, round-up investing)
- Revenue: Affiliate or referral fees from financial products
- **Assumption**: Users trust Pact enough to act on financial recommendations
- **Dependency**: Regulatory compliance (not a financial advisor), user trust

### Revenue Model Constraints (from product rules)
- NO revenue from failed challenges
- NO monetary forfeitures or redistribution
- NO platform fees on user penalties
- Revenue must come from value delivered, not punishment

---

## 9. Cost Structure

### Fixed Costs
| Cost | Estimate | Basis |
|------|----------|-------|
| Engineering team (3 people) | $0 (student project) → $300K+ (real startup) | Hypothetical |
| Cloud hosting (Vercel/AWS) | $50–500/month | Usage-based |
| Design tools | $50/month | Standard |

### Variable Costs (scale with users)
| Cost | Estimate | Basis |
|------|----------|-------|
| Plaid API | $0.30–1.50 per bank link + $0.05–0.25 per transaction pull | Plaid pricing tiers |
| Payment processing | 2.9% + $0.30 per subscription | Stripe standard |
| Push notifications | $0.01–0.05 per notification | FCM/APNS + backend |
| Customer support | $1–3 per active user/month | Industry benchmark |
| Content moderation | $0.10–0.50 per consequence review | If manual review needed |

### Key Financial Observation
**Banking API costs are the largest variable cost** and can be significant at scale. A user who links one bank account and has transactions checked weekly costs ~$15–25/year in API fees alone. This must be offset by subscription revenue or partnership economics.
