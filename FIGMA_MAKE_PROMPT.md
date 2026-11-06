# FIGMA_MAKE_PROMPT.md
## Ready-to-Paste Prompt for Figma Make

Copy everything below the line and paste it into Figma Make.

---

Create a complete mobile app prototype for **PACT**, a social savings app where friend groups commit to spending challenges together. The prototype should be an iPhone 15 Pro frame (390×844px) with a Dynamic Island notch. Build exactly these screens with the exact design tokens, layouts, and content specified below.

### Design System

**Font**: Inter
**Base radius**: 12px (0.75rem). Cards and buttons use 16px radius. Bottom sheets use 24px top radius.

**Color palette**:
- Primary green: #1B4332 (brand, headers, CTAs, savings cards)
- Green light: #2D6A4F (hover states)
- Coral: #FF6B6B (accent, destructive, VIRAL badge)
- Gold: #F59E0B (progress bars, highlights)
- Gold light: #FBBF24
- Charcoal: #1A1A2E (text primary, dark UI)
- Success green: #22C55E (check-ins, perfect scores, connected state)
- Missed red: #EF4444 (missed days, last-place)
- Streak orange: #FF9500 (streak badge gradient start)
- XP purple: #8B5CF6 (XP badges, share buttons, invite CTA)
- Surface: #F8FAFC (card backgrounds, off-day cells)
- Background: #FFFFFF
- Border: #E2E8F0
- Muted text: #64748B
- Secondary bg: #F1F5F9

**Streak badge**: linear-gradient(135deg, #FF9500, #FF6B00) with white bold text. Large variant adds box-shadow 0 4px 16px rgba(255,149,0,0.35).

**Card elevation system** (3 tiers):
- Flat: white bg, 1px border #E2E8F0
- Raised: white bg, shadow 0 1px 3px rgba(0,0,0,0.08), border at 50% opacity
- Elevated: white bg, shadow 0 4px 12px rgba(0,0,0,0.08), border at 30% opacity

**Button style**: Rounded-2xl (16px), font-bold, press feedback scales to 97%. Primary = #1B4332 bg white text. Secondary = #F8FAFC bg, charcoal text. Destructive = #EF4444 bg white text.

### Screens to Build

**Screen 1 — Welcome**
Full #1B4332 green background. Three large decorative circles (white, 4% opacity) positioned behind content. Center: 🤝 emoji inside a white rounded-3xl 80×80px container. Below: "PACT" in 48px black weight, "Save together." in 20px medium weight white/80. Subtext: "Budgeting explains yesterday. Pact changes the next decision." in 14px white/40. Two buttons stacked: "Get Started →" (white bg, green text, full width, 16px tall) and "I already have an account" (white/10 bg, white/70 text). Bottom: "CORNELL TECH PRODUCT STUDIO" in 10px white/20, letter-spacing 0.2em.

**Screen 2 — Onboarding Step 1**
White background. Centered: green (#1B4332) 64×64px rounded-2xl container with Users icon (white). Title: "Make a Pact with friends" in 24px black weight. Description: "Choose a spending behavior to change together. Same challenge, same rules, same timeline." in 14px muted text. Bottom: 3 step dots — active one is 32px wide #1B4332, inactive are 6px wide #E2E8F0. "Next →" button full width, green primary style.

**Screen 3 — Goal Selection**
White bg. Back arrow + "What are you saving for?" in 20px black weight. "Pick a goal to get motivated. You can change this anytime." in 12px muted. 6 vertical cards (raised elevation): each has emoji in 48×48 #F8FAFC rounded-xl container, goal name in 14px bold, examples in 11px muted, right arrow. Goals: Travel ✈️ ($2,000), Tech 💻 ($1,500), Emergency Fund 🛡️ ($3,000), Student Loans 🎓 ($5,000), Housing 🏠 ($4,000), Something Special 🎁 ($500).

**Screen 4 — Bank Selection**
White bg. Back arrow + "Select your bank" heading. 5 bank cards (raised): Chase 🏦 (blue-50 icon bg), Bank of America 🔴 (red-50), Wells Fargo 🟡 (yellow-50), Capital One 💳 (orange-50), Citi 🔵 (sky-50). Each has name in 14px bold, right arrow. Below: "🔒 256-bit encryption" notice in 10px muted, centered.

**Screen 5 — Bank Connected**
White bg, centered layout. 80×80px #22C55E rounded-2xl container with white CheckCircle2 icon, subtle green glow shadow. "Connected!" in 24px black weight. "{Bank name} is linked. Your savings will be tracked here." in 14px muted. Raised card showing bank icon + name + "Checking ****4829" in green. Below: "Simulated connection" notice in #F8FAFC rounded-xl. "Continue" button in green primary style.

**Screen 6 — Home**
White bg. Header: "GOOD EVENING" in 11px muted uppercase tracking-wider, "Radhika" in 28px black weight. Right side: Share2 icon (20px), Bell icon (20px, small red 8px dot), 40×40 avatar circle with 👩🏽.

Streak widget (elevated card): Left — 90×90 SVG circle ring with #E2E8F0 bg stroke and gradient (#FF9500→#FF6B00) progress stroke (80% fill), Flame icon and "18" number in center. Right — "18-day streak!" bold, "Your longest yet" muted. Below: two pill badges — "⚡ 16 XP" (purple/10 bg, purple text) and "◎ 4 Pacts" (green/10 bg, green text).

Savings card (#1B4332 bg, rounded-2xl): "TOTAL SAVED" in 11px white/50 uppercase, "$370" in 40px white black weight. Right side: "✈️ Italy Trip" and "↗ 18.5%" in gold-light. Progress bar: gold fill on white/20 bg. "View details >" link.

Invite CTA (raised card): Purple/10 share icon container, "Invite friends to PACT" bold, "Saving is better together" muted, right chevron.

Active Pacts: "Active Pacts" heading with "See all". Empty state: 🤝 in gray circle, "No active Pacts yet", green "+ Start a Pact" button.

Your Circle: "Your Circle" heading, "Cornell Crew" with 🐻 emoji, 3 avatars (👩🏽 👨🏽 👨🏻) in surface-colored containers.

Top Consequences This Week: Header with "VIRAL" badge (coral text, coral/10 bg, rounded-full). 3 consequence cards: each has user initial circle, consequence story text, emoji, view count (Eye icon + "2.1k"), like count (Heart + "847"), Share button. Content examples: "Sarah M. had to sing karaoke in the library 🎤", "Mike R. did an impression of his professor 🎭", "Lisa K. gave a motivational speech about lattes ☕".

Bottom nav: 4 tabs — Home (filled, bold, active), New Pact (+), Savings (trend icon), Circle (users icon).

**Screen 7 — Active Pact**
Green header (#1B4332) with rounded-b-3xl (24px bottom radius). Back arrow left, "🐻 Cornell Crew" center, Activity icon right. Below: 🍕 emoji + "Delivery Detox" in 20px bold white + "Day 4 of 4" in 14px white/60. Progress bar: #F59E0B fill (75%) on white/20 bg. "3/4 days" left, "1 remaining" right.

Stats row: 3 flat cards — "🔥 3 / Streak", "$30 / Saved", "3/4 / Score".

Check-in prompt (elevated card): Bouncing green CheckCircle2 icon (40×40, green/10 bg), "Ready to check in?" bold, "Did you avoid food delivery today?" muted, right chevron.

Weekly calendar: "THIS WEEK" heading. 7 columns (S M T W T F S) with date numbers. Mon/Tue/Wed (5/6/7) = green circles with white checkmarks. Thu (8) = outlined green circle with clock icon (pending). Sun (4), Fri (9), Sat (10) = surface-colored (off days). Below each: "off" label for non-eligible days.

Circle standings: "CIRCLE STANDINGS" heading + "Full board →" link. 3 rows: each has avatar, name, green progress bar, score. Radhika 3/4, Yuge 3/4, Ketan 2/4.

Consequence reminder: Coral/5 bg card, "🎤 Karaoke Confession" with coral/15 border.

Bottom nav: Home, Pact (active), Board (trophy), Savings.

**Screen 8 — Results: Everyone Succeeds**
Hero section: Full #22C55E (success green) bg. 🎉 emoji large (48px) centered. "Everyone Crushed It!" in 24px white black weight. "Perfect scores all around. No consequence needed." in 14px white/70. 3 avatars in row: each in white/20 rounded-xl containers (48×48) showing 👩🏽 👨🏽 👨🏻 with "4/4" scores below.

Your Achievement (elevated card): "YOUR ACHIEVEMENT" label. Avatar 👩🏽 (56×56 surface bg), "4/4 successful days" bold, "$40" green + "→ ✈️ Italy Trip" muted. Progress bar: thin green fill showing 19% of $2,000 ($380). "$380 of $2000" caption. Streak badge: "🔥 4-day streak" in orange gradient pill.

Final Standings (raised card): "FINAL STANDINGS" label. 3 rows with "T" rank badge (green/10 bg for perfect), avatar, name, "$X → emoji" savings detail, "4/4" score in green. Radhika $40→✈️, Ketan $32→💻, Yuge $20→🛡️.

"Share Achievement" button: purple/10 bg, purple text, Share2 icon.
Two action buttons side by side: "↻ New Pact" (green primary) + "Weekly Recap" (surface secondary).

**Screen 9 — Weekly Recap**
Full #1B4332 green background, white text throughout. "WEEKLY RECAP" in 11px white/50 uppercase. "Your Week in Review" in 24px black weight. "Oct 5 – Oct 11, 2026" in 12px white/40.

Hero stat (white/10 bg, rounded-2xl): "$40" in 48px white black weight, "saved this week" in 14px white/60. Orange gradient streak badge: "🔥 4-day streak".

3 highlight cards (white/10 bg, rounded-2xl): Star icon (gold) + "4/4 days completed / Perfect score!". TrendingUp icon (gold) + "✈️ 19.0% toward Italy Trip / $380 of $2000". Users icon (gold) + "🎉 Cornell Crew went perfect! / Radhika 4/4 · Ketan 4/4 · Yuge 4/4".

Suggested Next Challenges (white/10 bg card): "SUGGESTED NEXT CHALLENGES" label. 3 rows: 🍕 Delivery Detox: Round 2 / Keep the momentum going, ☕ Coffee at Home / Try a new challenge, 🛍️ Shopping Reset / Tackle a different category. Each with right chevron.

"Share Your Week" button: white/15 bg, white text, Share2 icon.
"Start Next Pact →" button: white bg, #1B4332 text, prominent shadow.
"Back to Home" link: white/40 text.

### Prototype Connections

Connect screens in this order for the primary demo flow:
1. Welcome → "Get Started" → Onboarding Step 1
2. Onboarding Step 1 → "Next" (tap through 2 more) → Goal Selection
3. Goal Selection → tap any goal → Bank Selection (skip Account Connection screen for brevity)
4. Bank Selection → tap any bank → Bank Connected
5. Bank Connected → "Continue" → Home
6. Home → "+ Start a Pact" → Active Pact
7. Active Pact → "Ready to check in?" → (show check-in success state, then back)
8. Active Pact → (navigate to) Results: Everyone Succeeds
9. Results → "Weekly Recap" → Weekly Recap
10. Weekly Recap → "Start Next Pact" or "Back to Home" → Home

### Important Notes
- This is a prototype — all financial data is simulated
- No dark mode — light theme only
- iPhone 15 Pro frame with Dynamic Island (126×34px black rounded-full, centered at top)
- All emoji are used as icons throughout (not image assets)
- The app uses Lucide React icons: Home, Plus, TrendingUp, Users, ArrowRight, ArrowLeft, Flame, Share2, Bell, CheckCircle2, Trophy, Activity, Star, Shield, Target, ChevronRight, Crown, RotateCcw, Eye, Heart, Clock, Loader2, Building2, X
