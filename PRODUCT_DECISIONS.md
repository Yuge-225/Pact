# PACT — Product Decisions

## Problem Statement
How might we improve how people save?

People intend to save, but goals fade when everyday spending decisions arise. The gap is not knowledge—it's follow-through at the moment of temptation.

## Target User (CIRCLES)
**Primary**: Young professionals 24–35, socially connected, earning enough to save but struggling with discretionary spending (food delivery, rideshare, impulse shopping).

**Initial wedge**: Friend groups of 3–5 already talking about money casually. They've tried budgets; budgets explain yesterday but don't change the next decision.

**Why this wedge works**: Pre-existing social trust means lower activation energy. Food delivery is the #1 discretionary category for this demo—frequent, visible, emotionally driven.

## Jobs-to-be-Done
| Job Type | Statement |
|----------|-----------|
| **Functional** | Help me avoid unnecessary spending on days I've committed to saving |
| **Emotional** | Make me feel proud of restraint instead of deprived |
| **Social** | Let me prove to friends I can follow through—and hold them to the same |

## Customer Value Proposition
**Next-best alternative**: Group chat + bank auto-transfer + willpower.

| Dimension | Group Chat + Bank | PACT |
|-----------|-------------------|------|
| Commitment device | Honor system | Structured challenge with social accountability |
| Visibility | Manual updates | Automatic progress tracking |
| Consequence | Social awkwardness | Pre-agreed playful consequences |
| Savings linkage | Separate setup | Integrated per-day allocation |
| Repeat behavior | Restarts from scratch | One-tap renewal with history |

**Unique value**: PACT makes the commitment visible at the moment it matters, turns follow-through into shared progress, and converts successful days directly into savings allocations.

## Key Scoping Decisions
1. **One mode only** — no competition vs. collaboration toggle. Everyone follows the same rules. Simplicity > customization.
2. **Days, not dollars** — performance measured by successful eligible days. Avoids income comparison and gaming.
3. **No financial penalties** — consequences are social, playful, opt-in. Revenue never comes from user failure.
4. **Simulated verification** — prototype demonstrates the UX of transaction monitoring without real bank feeds.
5. **Circle-first, not solo** — no solo challenge mode. The social contract IS the product.

## Business Assumptions & Risks (Cornell Value Creation)
| Assumption | Risk | Mitigation |
|------------|------|------------|
| Friends will commit together | Coordination cost kills activation | Pre-built challenge templates, one-tap invite |
| Playful consequences motivate | Users ignore or resent them | Opt-in deck, group pre-agreement, no escalation |
| Daily check-in sustains engagement | Check-in fatigue after week 1 | App friction intervention at moment of temptation |
| Savings allocation creates value perception | Small daily amounts feel insignificant | Cumulative progress visualization, milestone celebrations |

## MVP Scope (P0)
- Challenge creation with templates
- Circle management (invite, accept)
- Daily check-in + simulated verification
- Leaderboard with tie-handling
- Personal savings progress
- End-of-challenge results (4 outcome scenarios)
- Social consequence assignment + completion flow
- One-tap renewal
- Full demo mode with state switching

## What We're NOT Building
- Real bank integration
- Real app blocking (iOS/Android)
- Backend/API server
- Authentication
- Push notifications (previews only)
- Multiple simultaneous challenges
