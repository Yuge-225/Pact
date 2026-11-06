# PACT — Design System

## Brand Personality
Warm, social, playful, modern, motivating, trustworthy.

## Colors

### Primary
| Name | Hex | Usage |
|------|-----|-------|
| Forest Green | `#1B4332` | Primary brand, headers, CTAs, active states |
| Forest Green Light | `#2D6A4F` | Hover states, secondary green |
| Coral | `#FF6B6B` | Accents, missed days, destructive actions |
| Coral Light | `#FF8787` | Hover states on coral |
| Gold | `#D4A574` | Progress bars, achievements, highlights |
| Gold Light | `#E8C9A0` | Subtle gold accents |

### Neutral
| Name | Hex | Usage |
|------|-----|-------|
| Cream | `#FDF8F0` | Page background |
| Charcoal | `#2D3436` | Primary text |
| Card White | `#FFFFFF` | Card backgrounds |
| Border | `#E5DDD0` | Card borders, dividers |
| Secondary | `#F1EDE6` | Secondary backgrounds, tags |
| Muted Text | `#6B7280` | Secondary text, labels |

### Semantic
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#40C057` | Successful days, check-ins, verified |
| Warning | `#FD7E14` | Pending, deadlines |
| Missed | `#FF6B6B` | Missed days, last place |

## Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

| Element | Size | Weight |
|---------|------|--------|
| Page title | text-2xl (24px) | Bold |
| Section header | text-lg (18px) | Semibold |
| Card title | text-sm (14px) | Semibold |
| Body text | text-sm (14px) | Regular |
| Caption | text-xs (12px) | Regular |
| Micro | text-[10px] | Medium |
| Label | text-[10px] uppercase tracking-wider | Semibold |

## Spacing
- **Base unit**: 4px
- **Card padding**: 16-20px (p-4 to p-5)
- **Section gap**: 16px (space-y-4)
- **Page horizontal**: 24px (px-6)
- **Safe area top**: 56px (pt-14) for dynamic island

## Border Radius
| Element | Radius |
|---------|--------|
| Phone frame | 3rem (48px) |
| Cards | rounded-2xl (16px) |
| Buttons | rounded-2xl (16px) |
| Tags/Badges | rounded-full |
| Progress bars | rounded-full |
| Small elements | rounded-xl (12px) |

## Components

### Cards
- White background, 1px border (`border-border`), `rounded-2xl`, `p-4` to `p-5`
- Hover: `hover:border-pact-green hover:shadow-md`
- Selected: `border-pact-green bg-pact-green/5 shadow-md`

### Buttons
- **Primary**: `bg-pact-green text-white rounded-2xl py-4 font-semibold`
- **Secondary**: `bg-white border border-border text-pact-charcoal rounded-2xl`
- **Accent**: `bg-pact-coral text-white rounded-xl`
- **Ghost**: `text-muted-foreground hover:text-pact-charcoal`
- All: `active:scale-[0.98] transition-all`

### Avatars
- Emoji-based: 👩🏽 👨🏽 👨🏻
- Sizes: text-lg (small), text-2xl (medium), text-3xl (large), text-4xl (hero)

### Progress Bars
- Container: `bg-secondary rounded-full h-2`
- Fill: `bg-pact-green rounded-full transition-all`
- Variant colors: `bg-pact-success`, `bg-pact-gold`, `bg-pact-coral`

## Animations
| Name | Duration | Usage |
|------|----------|-------|
| `animate-fade-in` | 0.4s ease-out | Content entrance |
| `animate-slide-up` | 0.5s ease-out | Modal/card entrance |
| `animate-scale-in` | 0.3s ease-out | Icon/badge entrance |
| `animate-pulse-glow` | 2s infinite | CTA emphasis |
| `animate-bounce-subtle` | 1s infinite | Check-in prompt |
| `stagger-1` through `stagger-5` | 0.1s–0.5s delay | Sequential reveal |

## Phone Frame
- Width: 390px, Height: 844px (iPhone 15 Pro)
- Border: 8px `border-pact-charcoal`
- Dynamic Island: 120×32px black pill, centered, z-30
- Home indicator: 134×5px, centered bottom, `bg-black/20`
- Background: `#E8E0D4` (warm taupe)
