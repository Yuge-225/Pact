# PACT — Appendix

---

## A. Business Model Canvas (Visual Summary)

| | |
|---|---|
| **Key Partners** | Plaid/MX (banking APIs), App stores, Cloud infra |
| **Key Activities** | Product dev, user acquisition, banking partnerships |
| **Key Resources** | Mobile app, banking integration, user data, design system |
| **Value Proposition** | Social savings through friend-group challenges with playful accountability |
| **Customer Relationships** | Daily check-in habit, weekly recaps, Circle social dynamics |
| **Channels** | Viral shares, Circle invitations, university partnerships, word of mouth |
| **Customer Segments** | Young professionals 24–35, starting with university students |
| **Cost Structure** | Engineering, Plaid API ($0.30/user/mo), hosting, support, app store fees (30%) |
| **Revenue Streams** | Freemium ($5.99/mo premium), potential bank partnerships |

---

## B. Competitive Landscape

| Product | Category | Social? | Savings? | Consequences? | Status |
|---------|----------|---------|----------|--------------|--------|
| **PACT** | Social savings | Friend groups | Goal-linked | Playful dares | Prototype |
| Qapital | Savings automation | No | Rule-based transfers | No | Active (pivoted) |
| StickK | Commitment contracts | Optional referee | No | Monetary penalties | Active |
| Beeminder | Commitment + tracking | No | No | Monetary penalties | Active |
| Digit | Auto-savings | No | AI-based transfers | No | Acquired by Oportun |
| Acorns | Micro-investing | No | Round-ups | No | Public company |
| One Sec | App friction | No | No | No | Active |
| Opal | Screen time | No | No | No | Active |
| Duolingo | Language learning | Leaderboards | No | Streak loss | Public company |
| Strava | Fitness social | Clubs/challenges | No | No | Active |

**PACT's unique position**: Only product combining friend-group accountability + spending behavior change + non-monetary consequences + savings goal progress.

---

## C. Financial Assumptions Detail

### Plaid API Costs (2024 pricing, publicly available)
- Account linking: $0.30–1.50 per link (one-time)
- Transaction pulls: $0.05–0.25 per pull (ongoing)
- Identity verification: $1.50–3.00 per verification (one-time)
- At weekly transaction pulls: ~$0.30/user/month ongoing

### Comparable Subscription Pricing
| App | Free Tier | Premium Price | Conversion Rate |
|-----|-----------|--------------|-----------------|
| Duolingo | Core lessons | $6.99/month | ~8% (public filing) |
| Strava | Activity tracking | $5.00/month | ~5% (estimated) |
| Headspace | Limited content | $12.99/month | ~3–5% (estimated) |
| Calm | Limited content | $14.99/month | ~3–5% (estimated) |

### User Acquisition Benchmarks
| Channel | Estimated CAC | Basis |
|---------|--------------|-------|
| Organic/viral (consequence shares) | $0–2 | Hypothesis |
| University partnerships | $3–5 | Campus event sponsorship |
| Instagram/TikTok ads | $15–30 | Fintech industry average |
| Referral program | $5–10 | User incentive cost |

---

## D. Architecture (Current Prototype)

```
Next.js 16 (App Router)
├── src/app/
│   ├── page.tsx          (ScreenRouter + PhoneFrame + DemoPanel)
│   ├── layout.tsx         (HTML wrapper, Inter font)
│   └── globals.css        (Design tokens, animations, card system)
├── src/lib/
│   ├── store.ts           (Zustand store, 30 screen types, 20 demo states)
│   ├── types.ts           (TypeScript interfaces for all data models)
│   ├── data.ts            (Demo data factories, challenge templates, consequences)
│   └── utils.ts           (Tailwind merge utility)
├── src/components/pact/   (15 screen components, ~3000 lines)
│   ├── WelcomeScreen.tsx
│   ├── OnboardingScreen.tsx (4 sub-screens)
│   ├── HomeScreen.tsx
│   ├── CreatePactFlow.tsx  (6 sub-screens)
│   ├── ActivePactScreen.tsx
│   ├── CheckInScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── ResultsScreen.tsx   (4 outcome variants)
│   ├── ConsequenceScreens.tsx (4 sub-screens)
│   ├── AppTemptationScreen.tsx
│   ├── VerificationScreen.tsx
│   ├── SavingsScreen.tsx
│   ├── CircleActivityScreen.tsx
│   ├── WeeklyRecapScreen.tsx
│   ├── RenewScreen.tsx
│   ├── PhoneFrame.tsx
│   └── DemoPanel.tsx      (20-state demo controller)
└── src/components/ui/     (shadcn/ui primitives)
```

---

## E. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Users don't create a 2nd pact | Fatal — no retention | Medium-High | Test with manual pilot before building backend |
| Consequence causes social harm | Reputation, user loss | Low-Medium | Pre-agreed consequences, opt-in, non-monetary |
| iOS blocks app interception | Feature gap vs. positioning | High (confirmed) | Position as Android-first feature, or notification-based friction |
| Plaid costs exceed revenue | Financial unsustainability | Medium | Premium-only bank linking, or batch transaction pulls |
| Circle activation fails (friends don't download) | No network effect | Medium-High | Deep-link invitations, web-based onboarding |
| Honor-system check-in enables cheating | Trust erosion in Circles | Medium | Social pressure, eventual transaction verification |
| Challenge novelty wears off | Engagement drop | Medium | User-generated challenges, seasonal/themed challenges |
