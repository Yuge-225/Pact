# PACT — Maker Day 2 Speaking Script
*5 minutes total. 3 speakers. 6 slides.*

---

## SLIDE 1 — THE PROBLEM (Radhika, 35 seconds)

> "How much did you spend on DoorDash last month? If you're like most 25-year-olds, it's over $300.
>
> Here's the thing — you already know you should cut back. You've probably even told your friends, 'We should all stop ordering delivery.' And then Thursday night comes, you're tired, and you open the app.
>
> The problem isn't awareness. Budgeting apps already tell you what you spent. The problem is that good intentions disappear at the moment of temptation — and nothing holds you accountable.
>
> Today, what most people do is text their friends. 'I'm trying to stop ordering DoorDash.' That group chat lasts about three days."

**[TRANSITION]**: "So we built something better. Let me show you."

---

## SLIDE 2 — PACT IN ACTION (Ketan, 90 seconds)

*Ketan walks through the live prototype on screen.*

> "This is PACT. Save together.
>
> *[Click: Home screen]* Radhika opens the app. She sees her 18-day streak, her savings progress toward a trip to Italy, and — this is important — trending consequences from other friend groups. This girl sang karaoke in the library after losing her Delivery Detox. That's the kind of content that makes people want to try this.
>
> *[Click: Active Pact]* Here's an active Pact. Radhika and two friends — Ketan and Yuge, our team — committed to no food delivery, Monday through Thursday, for one week. Everyone follows the same rules. Each person picks their own savings amount — $10 a day for Radhika, $8 for me, $5 for Yuge — and their own goal.
>
> *[Click: Check-in]* Every eligible day, you answer one question: Did you keep your Pact? That's it. Ten seconds.
>
> *[Click: Results — Everyone Succeeds]* At the end of the week, if everyone nails it, we celebrate. No consequence needed. But if someone finishes last...
>
> *[Click: Results — Unique Last]* ...they do the dare the group agreed on before the challenge started. In this case, Karaoke Confession. Ketan has to sing in the library.
>
> *[Click: Weekly Recap]* And then you see your recap — $40 saved this week, 19% of the way to Italy — and you start the next one.
>
> The loop is: commit, check in, celebrate or laugh, repeat."

**[TRANSITION]**: "So why would someone use this instead of just texting their friends?"

---

## SLIDE 3 — WHY CHOOSE PACT? (Yuge, 55 seconds)

> "Your next-best alternative isn't another app — it's a group chat. 'Hey, let's stop ordering DoorDash.' Free, familiar, zero setup.
>
> But group chats don't track anything. There's no streak to protect. There's no leaderboard making you competitive. There's no consequence keeping you honest. And there's no connection between avoiding DoorDash on Tuesday and making progress toward Italy.
>
> Pact adds four things:
> First, **structure** — same rules, clear duration, defined eligible days.
> Second, **gamification** — streaks, XP, daily check-ins that create a habit.
> Third, **stakes** — playful consequences that are fun, not punitive. No money is ever lost.
> Fourth, **savings connection** — every successful day moves money toward your personal goal.
>
> The trade-off is real: you have to download an app and check in every day. But the insight from behavioral science is that structured social commitment increases follow-through by 65% over solo intentions. We're betting that structure is worth the extra 10 seconds a day."

**[TRANSITION]**: "Now — can this become a real business?"

---

## SLIDE 4 — WHY USERS RETURN (Radhika, 35 seconds)

> "The repeat loop is built into the product.
>
> You finish a 7-day Delivery Detox. You see your savings grew. Your streak is alive. Your friends are ready for another round. The app suggests Coffee at Home or Shopping Reset — or you can renew the same one.
>
> Each cycle, your streak grows, your XP accumulates, and your savings goal gets closer. The consequence keeps things interesting — and the consequence content is shareable, which is our viral acquisition channel.
>
> One person downloads PACT, invites 3 friends, they all complete a challenge, the loser posts their consequence on Instagram, and their followers say, 'I want to try that.'"

---

## SLIDE 5 — CAN WE BUILD A BUSINESS? (Ketan, 55 seconds)

> "Three feasibility questions.
>
> **Technical**: The core loop — create a challenge, check in daily, calculate results, assign consequences — is standard mobile engineering. We built a fully working prototype in Next.js with 15 screens and 20 demo states. The hard parts are bank integration via Plaid and transaction verification, which have established APIs. App interception — actually blocking DoorDash — is not feasible on iOS, so that feature is simulated and would need an alternative approach.
>
> **Operational**: Circle management, onboarding, and consequence moderation are solvable at our starting scale. The main risk is Circle activation — getting 3 to 5 friends to download simultaneously.
>
> **Financial**: Freemium model. Free core experience, $5.99/month premium for multiple Circles and custom challenges. At 2,000 monthly active users with 7% premium conversion, we cover variable costs. Banking API costs from Plaid are our biggest variable expense at about 30 cents per user per month. We haven't validated willingness to pay — that's our next experiment."

---

## SLIDE 6 — CENTRAL BUSINESS LOGIC (Yuge, 30 seconds)

> "Two sentences.
>
> **People will buy PACT because** saving alone is boring and easy to quit — a structured challenge with friends, daily streaks, and playful social consequences creates the accountability and fun that turns good intentions into actual behavior change.
>
> **We can make PACT because** the core social loop is technically straightforward, banking APIs exist for account linking, and the gamification patterns that drive daily engagement are well-proven by Duolingo and Strava.
>
> **Starting wedge**: Cornell Tech friend groups doing a 7-day Delivery Detox. Three to five friends, one spending behavior, one week.
>
> **Riskiest assumption**: That friend groups will create a second pact after the first one. Trial is plausible. Repeat use is the entire business — and it's unvalidated.
>
> Thank you."

---

## Timing Summary

| Slide | Speaker | Time | Cumulative |
|-------|---------|------|-----------|
| 1. Problem | Radhika | 35s | 0:35 |
| 2. Demo | Ketan | 90s | 2:05 |
| 3. Why PACT | Yuge | 55s | 3:00 |
| 4. Retention | Radhika | 35s | 3:35 |
| 5. Feasibility | Ketan | 55s | 4:30 |
| 6. Business Logic | Yuge | 30s | 5:00 |

**Total: 5:00**
