# PACT — Revenue & Unit Economics

*All figures in this document are hypothetical assumptions unless explicitly marked as externally sourced.*

---

## Revenue Model Options

### Model A: Freemium (Recommended First Test)
**Free tier**: Core challenge loop, 1 Circle, basic savings tracking, 5 challenge templates
**Premium tier** ($5.99/month or $49.99/year):
- Unlimited Circles
- Custom challenge creation
- Advanced savings analytics
- Extended streak rewards
- Priority bank syncing
- Exclusive consequence templates

**Why test first**: Direct value exchange, no partner dependencies, industry-proven model.

### Model B: Financial Institution Partnerships
Banks pay per engaged user for co-branded savings challenges or savings account referrals.
- Revenue: $2–10 per referred account, or $0.50–2/user/month licensing
- **Dependency**: Proven engagement data, bank relationship development (6–18 months)
- **Risk**: Banks are slow to partner; referral economics unclear for a pre-revenue startup

### Model C: Savings-Adjacent Services
Affiliate revenue from financial product recommendations (high-yield savings, round-up investing).
- Revenue: $5–50 per conversion (industry affiliate rates)
- **Dependency**: User trust, regulatory compliance, product-market fit for recommendations
- **Risk**: Low conversion rates on financial products; potential trust erosion

---

## Unit Economics Model

### Assumptions

| Parameter | Conservative | Base | Optimistic | Source |
|-----------|-------------|------|-----------|--------|
| MAU Month 6 | 200 | 800 | 3,000 | Hypothesis |
| MAU Month 12 | 500 | 2,000 | 8,000 | Hypothesis |
| Premium conversion | 3% | 7% | 12% | Industry: Duolingo ~8%, Strava ~5% |
| Monthly subscription | $4.99 | $5.99 | $7.99 | Comparable apps |
| Annual plan discount | 30% | 30% | 30% | Standard |
| % on annual | 20% | 30% | 40% | Hypothesis |
| Churn (monthly) | 15% | 10% | 6% | Industry: subscription apps 5–15% |

### Revenue Formula

```
Monthly Revenue = (MAU × Conversion%) × Blended ARPU

Blended ARPU = (Monthly_subs × Monthly_price) + (Annual_subs × Annual_price / 12)
             = ((1 - Annual%) × Price) + (Annual% × Price × 0.70 / 1)
```

### Month 12 Projections

| Metric | Conservative | Base | Optimistic |
|--------|-------------|------|-----------|
| MAU | 500 | 2,000 | 8,000 |
| Premium users | 15 | 140 | 960 |
| Monthly subscription revenue | $65 | $725 | $6,605 |
| Annual subscription revenue | $10 | $175 | $1,920 |
| **Total monthly revenue** | **$75** | **$900** | **$8,525** |

### Cost Structure (Month 12)

| Cost | Conservative | Base | Optimistic | Notes |
|------|-------------|------|-----------|-------|
| Plaid API (per linked user) | $60 | $240 | $960 | ~$0.30/user/month × 40% linking rate |
| Hosting (Vercel/AWS) | $50 | $150 | $400 | Usage-based |
| Push notifications | $5 | $20 | $80 | FCM/APNS |
| Customer support | $50 | $200 | $800 | Estimated |
| Content moderation | $0 | $50 | $200 | Consequence review |
| App store fees (30%) | $23 | $270 | $2,558 | On subscription revenue |
| **Total variable costs** | **$188** | **$930** | **$4,998** |

### Contribution Margin

| | Conservative | Base | Optimistic |
|---|-------------|------|-----------|
| Revenue | $75 | $900 | $8,525 |
| Variable costs | $188 | $930 | $4,998 |
| **Contribution margin** | **-$113** | **-$30** | **+$3,527** |
| **Margin %** | -151% | -3% | 41% |

### Fixed Costs (not included above)
- Engineering team: $0 (student project) → $25K–40K/month (3 engineers, post-funding)
- Design: $0 → $8K–15K/month
- Marketing: $0 → $5K–20K/month

**Observation**: At the base case, PACT breaks even on variable costs at ~2,000 MAU with 7% premium conversion. Fixed costs (team salaries) require either funding or >50,000 MAU at base conversion rates.

---

## Key Sensitivity Drivers

1. **Premium conversion rate** is the #1 driver. Moving from 7% → 12% nearly doubles revenue.
2. **Banking API costs** are the largest variable cost. If every user links a bank account (not just premium), costs increase 3x.
3. **App store fees** (30%) are a significant tax on subscription revenue. Could be reduced via web-based subscription (but harder to convert).
4. **Churn** determines LTV. At 10% monthly churn, average subscriber lifetime is 10 months. At 6%, it's ~17 months.

### Customer LTV Calculation

```
LTV = ARPU × (1 / Churn)

Base case: $5.99 × (1 / 0.10) = $59.90
Optimistic: $7.99 × (1 / 0.06) = $133.17
Conservative: $4.99 × (1 / 0.15) = $33.27
```

### Implied CAC Ceiling

For LTV/CAC > 3 (healthy SaaS benchmark):
- Base: CAC must be < $19.97
- Optimistic: CAC must be < $44.39
- Conservative: CAC must be < $11.09

**Organic/viral acquisition is critical** — paid acquisition at $20+ per install is likely unsustainable at base conversion rates.

---

## Most Plausible First Test

**Freemium with $5.99/month premium**, tested with 50–100 users over 8 weeks:
1. Launch free product with 1 Circle limit
2. After 2nd completed pact, prompt premium upgrade
3. Measure: trial-to-paid conversion, time-to-conversion, stated reasons for upgrading/declining
4. Track: whether premium users have higher retention than free users

This requires a functional backend (not just a prototype) but no banking partnerships.
