# PACT — Demo Run-of-Show

---

## Before the Presentation

### Setup (5 minutes before)
1. Open Chrome on the presentation laptop
2. Navigate to `http://localhost:3001`
3. Verify the app loads (you should see the Welcome screen with the Demo Panel on the right)
4. Test the Demo Panel: click "Home" and "Active Pact" to verify state switching works
5. Click "Reset" to return to Welcome
6. Connect to the projector — the app renders at ~800px wide (phone frame + dark background), which displays well on 16:9 projectors

### If the dev server is not running
```bash
cd ~/Desktop/"Build w Claude"/pact
npm run dev
```
The app starts on port 3001 (or 3000 if 3001 is unavailable). Check the terminal for the URL.

### Fallback Plan
If the prototype fails to load during the presentation:
1. Use the HTML slide deck (presentation/slides.html) which contains embedded screenshots
2. Walk through the screenshots while narrating the same demo script
3. Say: "We have a fully working prototype — let me walk you through the key screens"

---

## Demo Sequence (90 seconds, Ketan presenting)

### Pre-demo state
Before Ketan starts speaking, the screen should show the **Home** screen. Click "Home" in the Demo Panel right before the demo segment begins.

### Click-by-click

| # | Action | What Audience Sees | Speaking Cue |
|---|--------|-------------------|-------------|
| 1 | Demo Panel → **Home** | Home dashboard: streak ring (18-day), $370 saved, Italy Trip goal, trending consequences | "Radhika opens the app. She sees her streak..." |
| 2 | Scroll down on Home | Trending consequences section (karaoke, apology letter, macarena) | "...trending consequences from other groups. This girl sang karaoke in the library..." |
| 3 | Demo Panel → **Active Pact** | Green header, Delivery Detox Day 4/4, stats, calendar, standings | "Here's an active Pact. No food delivery, Monday through Thursday..." |
| 4 | Demo Panel → **Daily Check-in** | Check-in prompt: "Did you keep your Pact today?" | "Every eligible day, you answer one question..." |
| 5 | Demo Panel → **Everyone Succeeds** | Green celebration: "Everyone Crushed It!", all 4/4, no consequence | "If everyone nails it, we celebrate..." |
| 6 | Demo Panel → **Unique Last Place** | Charcoal hero: "Pact Complete", standings showing Ketan 2/4, consequence card | "But if someone finishes last... they do the dare" |
| 7 | Demo Panel → **Weekly Recap** | Green background: $40 saved, 4-day streak, goal progress, suggested next | "Your recap — $40 saved, 19% toward Italy — start the next one" |

### Timing
- Steps 1–2: ~20 seconds (Home + scroll)
- Step 3: ~15 seconds (Active Pact)
- Step 4: ~10 seconds (Check-in)
- Steps 5–6: ~25 seconds (Results variants)
- Step 7: ~20 seconds (Recap + wrap)
- Total: ~90 seconds

### Demo Panel Tips
- The Demo Panel is on the right side of the screen. Click the state name (e.g., "Active Pact") to jump directly to that state.
- States load instantly — no loading delays.
- If you accidentally close the Demo Panel, refresh the page (it defaults to open).
- Don't click buttons inside the phone frame during the demo — use only the Demo Panel for navigation. This avoids accidental state changes.

---

## Technical Notes

- **Port**: The app runs on localhost:3001 by default
- **Browser**: Chrome recommended. Safari and Firefox also work.
- **Screen resolution**: The phone frame is 390×844px centered on a dark background. At 1080p projector resolution, it's clearly visible.
- **No internet required**: The app is entirely client-side. It works offline once loaded.
- **Reset**: If anything goes wrong, click "Reset" in the Demo Panel to return to the Welcome screen. Then click "Home" to restart the demo sequence.
