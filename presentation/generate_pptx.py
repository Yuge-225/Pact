from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

SCREENSHOTS = os.path.join(os.path.dirname(__file__), 'screenshots')
OUTPUT = os.path.join(os.path.dirname(__file__), 'PACT_Maker_Day_2.pptx')

# PACT brand colors
GREEN = RGBColor(0x1B, 0x43, 0x32)
GREEN_LIGHT = RGBColor(0x2D, 0x6A, 0x4F)
CHARCOAL = RGBColor(0x1A, 0x1A, 0x2E)
GOLD = RGBColor(0xF5, 0xA6, 0x23)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GRAY = RGBColor(0xF0, 0xF0, 0xF0)
MID_GRAY = RGBColor(0x88, 0x88, 0x88)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

def add_bg(slide, color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_textbox(slide, left, top, width, height, text, font_size=18, bold=False, color=WHITE, align=PP_ALIGN.LEFT, font_name='Calibri'):
    txBox = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = font_name
    p.alignment = align
    return txBox

def add_para(tf, text, font_size=18, bold=False, color=WHITE, align=PP_ALIGN.LEFT, font_name='Calibri', space_before=0):
    p = tf.add_paragraph()
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = font_name
    p.alignment = align
    if space_before:
        p.space_before = Pt(space_before)
    return p

def add_screenshot(slide, img_path, left, top, height=5.0):
    if os.path.exists(img_path):
        pic = slide.shapes.add_picture(img_path, Inches(left), Inches(top), height=Inches(height))
        return pic
    return None

def add_accent_bar(slide, left, top, width=0.08, height=1.0, color=GOLD):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape

# ── SLIDE 1: TITLE ──
slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
add_bg(slide, CHARCOAL)

# PACT title
add_textbox(slide, 4.5, 1.2, 4.5, 1.2, 'PACT', font_size=72, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
add_textbox(slide, 4.5, 2.5, 4.5, 0.6, 'Save together.', font_size=28, bold=False, color=GOLD, align=PP_ALIGN.CENTER)
add_textbox(slide, 3.0, 3.5, 7.5, 0.8, 'Social savings through playful accountability', font_size=18, color=MID_GRAY, align=PP_ALIGN.CENTER)

# Welcome screen screenshot
add_screenshot(slide, os.path.join(SCREENSHOTS, '01_welcome.png'), 5.2, 4.0, height=3.2)

# Bottom info
add_textbox(slide, 3.0, 6.8, 7.5, 0.5, 'Cornell Tech Product Studio  |  Maker Day 2  |  October 2026', font_size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 2: THE PROBLEM (Radhika, 35s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_accent_bar(slide, 0.6, 0.8, height=0.6, color=GOLD)
add_textbox(slide, 0.85, 0.7, 5, 0.8, 'THE PROBLEM', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 0.85, 1.4, 3, 0.4, 'Radhika  |  35 seconds', font_size=12, color=GOLD)

# Problem bullets
txBox = add_textbox(slide, 0.85, 2.0, 6.5, 4.5, '', font_size=20, color=WHITE)
tf = txBox.text_frame
tf.word_wrap = True
p = tf.paragraphs[0]
p.text = '25-year-olds spend $300+/month on food delivery'
p.font.size = Pt(20)
p.font.bold = True
p.font.color.rgb = WHITE
p.font.name = 'Calibri'

add_para(tf, '', font_size=10)
add_para(tf, 'The problem isn\'t awareness — budgeting apps already tell you what you spent.', font_size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space_before=8)
add_para(tf, '', font_size=10)
add_para(tf, 'The problem is that good intentions disappear at the moment of temptation.', font_size=18, bold=True, color=GOLD, space_before=8)
add_para(tf, '', font_size=10)
add_para(tf, 'Current solution: a group chat that lasts 3 days.', font_size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space_before=8)
add_para(tf, '', font_size=10)
add_para(tf, '"So we built something better."', font_size=20, bold=True, color=WHITE, space_before=12)

# Screenshots: Welcome + Home
add_screenshot(slide, os.path.join(SCREENSHOTS, '01_welcome.png'), 8.5, 1.0, height=2.8)
add_screenshot(slide, os.path.join(SCREENSHOTS, '03_home.png'), 10.5, 1.0, height=2.8)

# Labels
add_textbox(slide, 8.3, 3.9, 2.5, 0.4, 'Welcome', font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)
add_textbox(slide, 10.3, 3.9, 2.5, 0.4, 'Home Dashboard', font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 3: PACT IN ACTION / PRODUCT DEMO (Ketan, 90s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_accent_bar(slide, 0.6, 0.8, height=0.6, color=GREEN_LIGHT)
add_textbox(slide, 0.85, 0.7, 5, 0.8, 'PACT IN ACTION', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 0.85, 1.4, 3, 0.4, 'Ketan  |  90 seconds', font_size=12, color=GOLD)

# Key talking points
txBox = add_textbox(slide, 0.85, 2.0, 3.5, 4.5, '', font_size=16, color=WHITE)
tf = txBox.text_frame
tf.word_wrap = True
p = tf.paragraphs[0]
p.text = 'The Demo Journey'
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = GOLD
p.font.name = 'Calibri'

points = [
    ('1.', 'Home — streak, savings, trending consequences'),
    ('2.', 'Active Pact — same rules, personal savings'),
    ('3.', 'Daily Check-in — one question, 10 seconds'),
    ('4.', 'Results — celebrate or face consequences'),
    ('5.', 'Weekly Recap — savings growth, next challenge'),
]
for num, text in points:
    add_para(tf, '', font_size=6)
    add_para(tf, f'{num} {text}', font_size=14, color=RGBColor(0xCC, 0xCC, 0xCC), space_before=6)

add_para(tf, '', font_size=10)
add_para(tf, 'Loop: commit → check in → celebrate → repeat', font_size=14, bold=True, color=GOLD, space_before=12)

# 5 screenshots across the right side
demo_screens = [
    ('03_home.png', 'Home'),
    ('05_active_pact.png', 'Active Pact'),
    ('07_check_in.png', 'Check-in'),
    ('08_results_all_perfect.png', 'Results'),
    ('11_weekly_recap.png', 'Recap'),
]
x_start = 4.8
for i, (fname, label) in enumerate(demo_screens):
    x = x_start + i * 1.7
    add_screenshot(slide, os.path.join(SCREENSHOTS, fname), x, 1.8, height=4.2)
    add_textbox(slide, x - 0.2, 6.1, 2.0, 0.4, label, font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 4: WHY CHOOSE PACT? (Yuge, 55s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_accent_bar(slide, 0.6, 0.8, height=0.6, color=GOLD)
add_textbox(slide, 0.85, 0.7, 8, 0.8, 'WHY CHOOSE PACT?', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 0.85, 1.4, 3, 0.4, 'Yuge  |  55 seconds', font_size=12, color=GOLD)

# Comparison: Group Chat vs PACT
add_textbox(slide, 1.0, 2.2, 4, 0.5, 'Next-best alternative: a group chat', font_size=16, color=MID_GRAY)

# 4 pillars
pillars = [
    ('Structure', 'Same rules, clear duration,\ndefined eligible days', GREEN_LIGHT),
    ('Gamification', 'Streaks, XP, daily check-ins\nthat create a habit', GOLD),
    ('Stakes', 'Playful consequences that\nare fun, not punitive', RGBColor(0xE7, 0x6F, 0x51)),
    ('Savings', 'Every successful day moves\nmoney toward your goal', RGBColor(0x2E, 0xCC, 0x71)),
]

for i, (title, desc, color) in enumerate(pillars):
    x = 1.0 + i * 2.5
    # Pillar box
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(3.0), Inches(2.2), Inches(2.0))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor(0x25, 0x25, 0x3E)
    shape.line.fill.background()

    # Accent line at top of pillar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.3), Inches(3.0), Inches(1.6), Inches(0.06))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = color
    top_bar.line.fill.background()

    add_textbox(slide, x + 0.2, 3.2, 1.8, 0.5, title, font_size=18, bold=True, color=color, align=PP_ALIGN.CENTER)
    add_textbox(slide, x + 0.15, 3.8, 1.9, 1.0, desc, font_size=12, color=RGBColor(0xBB, 0xBB, 0xBB), align=PP_ALIGN.CENTER)

# Trade-off note
add_textbox(slide, 1.0, 5.3, 9.5, 0.6, 'Trade-off: download an app + 10 seconds/day.  Structured social commitment increases follow-through by 65%.', font_size=14, color=MID_GRAY)

# Screenshots: Active Pact + Results showing the features
add_screenshot(slide, os.path.join(SCREENSHOTS, '06_app_temptation.png'), 10.5, 1.5, height=3.0)
add_screenshot(slide, os.path.join(SCREENSHOTS, '09_results_unique_last.png'), 10.5, 4.5, height=2.8)
add_textbox(slide, 10.2, 4.5, 2.8, 0.3, 'App Friction', font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 5: WHY USERS RETURN (Radhika, 35s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_accent_bar(slide, 0.6, 0.8, height=0.6, color=GREEN_LIGHT)
add_textbox(slide, 0.85, 0.7, 8, 0.8, 'WHY USERS RETURN', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 0.85, 1.4, 3, 0.4, 'Radhika  |  35 seconds', font_size=12, color=GOLD)

# Retention loop
txBox = add_textbox(slide, 0.85, 2.2, 5.5, 4.0, '', font_size=16, color=WHITE)
tf = txBox.text_frame
tf.word_wrap = True
p = tf.paragraphs[0]
p.text = 'The Repeat Loop'
p.font.size = Pt(20)
p.font.bold = True
p.font.color.rgb = GOLD
p.font.name = 'Calibri'

loop_items = [
    'Finish a 7-day challenge → see savings grow',
    'Streak is alive → friends ready for another round',
    'App suggests next challenge (Coffee at Home, Shopping Reset)',
    'Each cycle: streak grows, XP accumulates, goal gets closer',
    'Consequence content is shareable → viral acquisition',
]
for item in loop_items:
    add_para(tf, '', font_size=6)
    add_para(tf, f'  {item}', font_size=14, color=RGBColor(0xCC, 0xCC, 0xCC), space_before=4)

add_para(tf, '', font_size=10)
add_para(tf, 'Viral loop: 1 download → invite 3 friends → loser posts consequence → followers want to try', font_size=13, bold=True, color=GOLD, space_before=10)

# Screenshots: Weekly Recap, Renew, Savings
retention_screens = [
    ('11_weekly_recap.png', 'Weekly Recap'),
    ('13_renew_pact.png', 'Renew Pact'),
    ('12_savings_progress.png', 'Savings'),
]
for i, (fname, label) in enumerate(retention_screens):
    x = 7.2 + i * 2.1
    add_screenshot(slide, os.path.join(SCREENSHOTS, fname), x, 1.5, height=4.5)
    add_textbox(slide, x - 0.3, 6.1, 2.5, 0.4, label, font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 6: CAN WE BUILD A BUSINESS? (Ketan, 55s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_accent_bar(slide, 0.6, 0.8, height=0.6, color=GOLD)
add_textbox(slide, 0.85, 0.7, 8, 0.8, 'CAN WE BUILD A BUSINESS?', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 0.85, 1.4, 3, 0.4, 'Ketan  |  55 seconds', font_size=12, color=GOLD)

# 3 feasibility columns
feasibility = [
    ('Technical', [
        'Core loop is standard mobile eng',
        'Working prototype: 15 screens, 20 states',
        'Bank integration via Plaid (established API)',
        'App interception simulated (iOS limitation)',
    ], GREEN_LIGHT),
    ('Operational', [
        'Circle activation is main risk',
        'Need 3-5 friends to download simultaneously',
        'Consequence moderation at scale',
        'Starting wedge: Cornell student groups',
    ], GOLD),
    ('Financial', [
        'Freemium + bank partnerships',
        '$2.40 blended ARPU/month',
        'LTV/CAC ratio: 3.2x at base case',
        'Break-even at ~15K MAU',
    ], RGBColor(0x2E, 0xCC, 0x71)),
]

for i, (title, items, color) in enumerate(feasibility):
    x = 0.85 + i * 3.2
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(2.2), Inches(2.9), Inches(3.5))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor(0x25, 0x25, 0x3E)
    shape.line.fill.background()

    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.4), Inches(2.2), Inches(2.1), Inches(0.06))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = color
    top_bar.line.fill.background()

    add_textbox(slide, x + 0.2, 2.4, 2.5, 0.5, title, font_size=20, bold=True, color=color)

    for j, item in enumerate(items):
        add_textbox(slide, x + 0.2, 3.1 + j * 0.55, 2.5, 0.5, f'  {item}', font_size=12, color=RGBColor(0xBB, 0xBB, 0xBB))

# Riskiest assumption callout
shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.85), Inches(6.0), Inches(9.0), Inches(0.8))
shape.fill.solid()
shape.fill.fore_color.rgb = RGBColor(0x30, 0x30, 0x48)
shape.line.fill.background()
add_textbox(slide, 1.1, 6.1, 8.5, 0.6, 'Riskiest Assumption: Will 3-5 friends download and complete a 7-day challenge together?', font_size=16, bold=True, color=GOLD)

# Screenshot on right
add_screenshot(slide, os.path.join(SCREENSHOTS, '04_create_pact.png'), 10.8, 1.5, height=4.5)
add_textbox(slide, 10.5, 6.1, 2.8, 0.4, 'Create Pact Flow', font_size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 7: THE ASK (Yuge, 30s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, GREEN)

add_textbox(slide, 1.0, 1.0, 8, 0.8, 'THE ASK', font_size=36, bold=True, color=WHITE)
add_textbox(slide, 1.0, 1.7, 3, 0.4, 'Yuge  |  30 seconds', font_size=12, color=GOLD)

# Ask items
txBox = add_textbox(slide, 1.0, 2.5, 6.0, 3.5, '', font_size=16, color=WHITE)
tf = txBox.text_frame
tf.word_wrap = True
p = tf.paragraphs[0]
p.text = 'What we need next:'
p.font.size = Pt(20)
p.font.bold = True
p.font.color.rgb = GOLD
p.font.name = 'Calibri'

asks = [
    '1.  5 concept-test interviews (20 min each) to validate circle activation',
    '2.  1 live pilot: 3 friend groups using PACT for 2 weeks',
    '3.  Partner introductions: campus organizations, financial wellness programs',
    '4.  Technical mentorship: Plaid integration, iOS app development',
]
for ask in asks:
    add_para(tf, '', font_size=8)
    add_para(tf, ask, font_size=16, color=WHITE, space_before=6)

add_para(tf, '', font_size=12)
add_para(tf, 'Try the live prototype: localhost:3001', font_size=14, color=GOLD, space_before=10)

# Screenshots on right
add_screenshot(slide, os.path.join(SCREENSHOTS, '03_home.png'), 8.5, 1.5, height=5.0)
add_screenshot(slide, os.path.join(SCREENSHOTS, '08_results_all_perfect.png'), 10.8, 1.5, height=5.0)


# ── SLIDE 8: FULL DEMO — ALL SCREENS ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)

add_textbox(slide, 0.3, 0.3, 12, 0.6, 'COMPLETE PRODUCT DEMO', font_size=28, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
add_textbox(slide, 0.3, 0.85, 12, 0.4, '15 screens  |  20 interactive states  |  Full user journey', font_size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)

# All 13 screenshots in a grid layout
all_screens = [
    ('01_welcome.png', 'Welcome'),
    ('02_onboarding.png', 'Onboarding'),
    ('03_home.png', 'Home'),
    ('04_create_pact.png', 'Create Pact'),
    ('05_active_pact.png', 'Active Pact'),
    ('06_app_temptation.png', 'App Friction'),
    ('07_check_in.png', 'Check-in'),
    ('08_results_all_perfect.png', 'All Perfect'),
    ('09_results_unique_last.png', 'Last Place'),
    ('10_results_tied_below.png', 'All Tied'),
    ('11_weekly_recap.png', 'Weekly Recap'),
    ('12_savings_progress.png', 'Savings'),
    ('13_renew_pact.png', 'Renew Pact'),
]

# 2 rows: 7 on top, 6 on bottom
row1 = all_screens[:7]
row2 = all_screens[7:]

for i, (fname, label) in enumerate(row1):
    x = 0.4 + i * 1.82
    add_screenshot(slide, os.path.join(SCREENSHOTS, fname), x, 1.3, height=2.7)
    add_textbox(slide, x - 0.15, 4.05, 1.9, 0.3, label, font_size=8, color=MID_GRAY, align=PP_ALIGN.CENTER)

for i, (fname, label) in enumerate(row2):
    x = 1.3 + i * 1.82
    add_screenshot(slide, os.path.join(SCREENSHOTS, fname), x, 4.4, height=2.7)
    add_textbox(slide, x - 0.15, 7.1, 1.9, 0.3, label, font_size=8, color=MID_GRAY, align=PP_ALIGN.CENTER)


# Save
prs.save(OUTPUT)
print(f'PPTX saved to: {OUTPUT}')
print(f'File size: {os.path.getsize(OUTPUT) / 1024:.0f} KB')
