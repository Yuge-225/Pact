# PACT — Screen Inventory

## Implemented Screens

| # | Screen | Route/State | States | Interactive |
|---|--------|-------------|--------|-------------|
| 1 | Welcome | `welcome` | Default | Get Started, Sign In |
| 2 | Onboarding Step 1 | `onboarding` | 3 carousel steps | Next, progress dots |
| 3 | Onboarding Step 2 | `onboarding` | Step 2 | Next |
| 4 | Onboarding Step 3 | `onboarding` | Step 3 | Choose Your Goal |
| 5 | Goal Selection | `onboarding-goal` | 6 goal options | Tap to select |
| 6 | Account Connection | `onboarding-account` | Bank/Card options | Connect or skip |
| 7 | Home | `home` | Empty state, with data | Start Pact, View savings, Circle |
| 8 | Challenge Discovery | `discover` | 5 templates | Select template |
| 9 | Duration & Days | `create-duration` | Duration picker, day toggles | Duration buttons, day toggles, validation |
| 10 | Circle Selection | `create-circle` | Existing circle, create new | Select circle |
| 11 | Consequence Selection | `create-consequence` | 8 consequence cards | Select card |
| 12 | Savings Setup | `create-savings` | Amount picker, goal selector | Increment/decrement, quick amounts, goal cards |
| 13 | Review & Confirm | `create-review` | Full summary | Start Pact |
| 14 | Active Pact Dashboard | `active-pact` | Progress, stats, calendar, standings | Check-in, leaderboard, activity, temptation shield |
| 15 | Daily Check-in | `check-in` | Prompt, confirming, success result, miss result | Yes/No, confirm |
| 16 | Leaderboard | `leaderboard` | Podium + list, tie handling | Back |
| 17 | App Temptation | `app-temptation` | DoorDash interception | Keep My Pact, Break Pact |
| 18 | Verification Status | `verification` | Pending checks, how-it-works | Go to Check-in |
| 19 | Savings Progress | `savings-progress` | Goal card, stats, accounts, history | Back |
| 20 | Results: All Perfect | `results` (everyone_succeeds) | Celebration, standings, personal summary | New Pact, Weekly Recap |
| 21 | Results: Unique Last | `results` (unique_last) | Champion crown, consequence card | View Consequence, New Pact |
| 22 | Results: Tied Last | `results` (two_tied_last) | Shared consequence | View Consequence |
| 23 | Results: All Tied Below | `results` (everyone_tied_below) | Group reset | New Pact |
| 24 | Consequence Assignment | `consequence-assign` | Timer, description | Submit Evidence |
| 25 | Evidence Submission | `consequence-submit` | Photo/Video/Text picker, note | Submit for Review |
| 26 | Circle Voting | `consequence-vote` | Approval progress, per-member votes | Approve/Needs Redo |
| 27 | Consequence Unresolved | `consequence-unresolved` | Warning state, options | Remind, Substitute, Waive |
| 28 | Circle Activity Feed | `circle-activity` | Activity items, reactions | React, message input |
| 29 | Weekly Recap | `weekly-recap` | Stats, highlights, suggestions | Start Next Pact |
| 30 | Renew / New Pact | `renew` | Renew same or try new, invite | Renew Pact, Start New |
| 31 | Renewal Confirmation | `renew` (renewed state) | Waiting for members | Back to Home |

## Demo Panel States (20 total)
welcome, onboarding, home, create_pact, active_pact, app_temptation, check_in, verification_pending, successful_day, missed_day, everyone_succeeds, two_tied_last, unique_last, everyone_tied_below, consequence_submitted, consequence_verified, consequence_unresolved, weekly_recap, savings_progress, renew_pact
