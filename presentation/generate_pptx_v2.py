from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
import os

GIFS = os.path.join(os.path.dirname(__file__), 'gifs')
OUTPUT = os.path.join(os.path.dirname(__file__), 'PACT_Maker_Day_2.pptx')

GREEN = RGBColor(0x1B, 0x43, 0x32)
GREEN_LIGHT = RGBColor(0x2D, 0x6A, 0x4F)
CHARCOAL = RGBColor(0x1A, 0x1A, 0x2E)
GOLD = RGBColor(0xF5, 0xA6, 0x23)
CORAL = RGBColor(0xE7, 0x6F, 0x51)
SUCCESS = RGBColor(0x22, 0xC5, 0x5E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GRAY = RGBColor(0xF0, 0xF0, 0xF0)
MID_GRAY = RGBColor(0x88, 0x88, 0x88)
LIGHT_BG = RGBColor(0x25, 0x25, 0x3E)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)


def add_bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def tb(slide, left, top, width, height, text, size=18, bold=False, color=WHITE, align=PP_ALIGN.LEFT, name='Calibri'):
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = name
    p.alignment = align
    return tf


def para(tf, text, size=18, bold=False, color=WHITE, align=PP_ALIGN.LEFT, space=0):
    p = tf.add_paragraph()
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = 'Calibri'
    p.alignment = align
    if space:
        p.space_before = Pt(space)
    return p


def gif(slide, name, left, top, height=5.0):
    path = os.path.join(GIFS, f'{name}.gif')
    if os.path.exists(path):
        slide.shapes.add_picture(path, Inches(left), Inches(top), height=Inches(height))


def bar(slide, left, top, w=0.06, h=0.8, color=GOLD):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(w), Inches(h))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()


def rounded_box(slide, left, top, w, h, color=LIGHT_BG):
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(w), Inches(h))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()
    return s


# ── SLIDE 1: TITLE ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
tb(slide, 4.5, 1.0, 4.5, 1.2, 'PACT', size=72, bold=True, align=PP_ALIGN.CENTER)
tb(slide, 4.5, 2.3, 4.5, 0.6, 'Save together.', size=28, color=GOLD, align=PP_ALIGN.CENTER)
tb(slide, 3.0, 3.3, 7.5, 0.5, 'Social savings through playful accountability', size=18, color=MID_GRAY, align=PP_ALIGN.CENTER)
gif(slide, 'welcome', 5.4, 3.9, height=3.2)
tb(slide, 3.0, 6.9, 7.5, 0.4, 'Cornell Tech Product Studio  |  Maker Day 2  |  October 2026', size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 2: THE PROBLEM (Radhika, 35s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 5, 0.8, 'THE PROBLEM', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Radhika  |  35 seconds', size=12, color=GOLD)

tf = tb(slide, 0.85, 2.0, 7, 4.5, '')
p = tf.paragraphs[0]
p.text = '$300+/month on food delivery for the average 25-year-old'
p.font.size = Pt(20); p.font.bold = True; p.font.color.rgb = WHITE; p.font.name = 'Calibri'
para(tf, '', size=8)
para(tf, "The problem isn't awareness. Budgeting apps already tell you what you spent.", size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space=8)
para(tf, '', size=8)
para(tf, 'Good intentions disappear at the moment of temptation.', size=18, bold=True, color=GOLD, space=8)
para(tf, '', size=8)
para(tf, 'Current solution: a group chat that lasts 3 days.', size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space=8)
para(tf, '', size=8)
para(tf, '"So we built something better."', size=20, bold=True, space=12)

gif(slide, 'welcome', 9.0, 0.8, height=3.0)
gif(slide, 'home', 11.0, 0.8, height=3.0)
tb(slide, 8.8, 3.9, 2.2, 0.3, 'Welcome', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)
tb(slide, 10.8, 3.9, 2.2, 0.3, 'Home Dashboard', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 3: PACT IN ACTION (Ketan, 90s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6, color=GREEN_LIGHT)
tb(slide, 0.85, 0.7, 5, 0.8, 'PACT IN ACTION', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Ketan  |  90 seconds', size=12, color=GOLD)

tf = tb(slide, 0.85, 2.0, 3.2, 4.0, '')
p = tf.paragraphs[0]
p.text = 'Demo Journey'
p.font.size = Pt(16); p.font.bold = True; p.font.color.rgb = GOLD; p.font.name = 'Calibri'

steps = [
    '1. Streak, savings, trending consequences',
    '2. Same rules, personal savings amounts',
    '3. One question, 10 seconds',
    '4. Celebrate or face consequences',
    '5. Savings recap, start next challenge',
]
for s in steps:
    para(tf, '', size=4)
    para(tf, s, size=13, color=RGBColor(0xCC, 0xCC, 0xCC), space=4)

para(tf, '', size=8)
para(tf, 'Commit > Check in > Celebrate > Repeat', size=13, bold=True, color=GOLD, space=10)

demo_gifs = [('home', 'Home'), ('active_pact', 'Active Pact'), ('check_in', 'Check-in'), ('results_perfect', 'Results'), ('weekly_recap', 'Recap')]
for i, (gname, label) in enumerate(demo_gifs):
    x = 4.5 + i * 1.8
    gif(slide, gname, x, 1.5, height=4.8)
    tb(slide, x - 0.2, 6.4, 2.0, 0.3, label, size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 4: WHY CHOOSE PACT? (Yuge, 55s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 8, 0.8, 'WHY CHOOSE PACT?', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Yuge  |  55 seconds', size=12, color=GOLD)
tb(slide, 1.0, 2.1, 5, 0.4, 'Next-best alternative: a group chat', size=15, color=MID_GRAY)

pillars = [
    ('Structure', 'Same rules, clear duration,\ndefined eligible days', GREEN_LIGHT),
    ('Gamification', 'Streaks, XP, daily check-ins\nthat create a habit', GOLD),
    ('Stakes', 'Playful consequences that\nare fun, not punitive', CORAL),
    ('Savings', 'Every successful day moves\nmoney toward your goal', SUCCESS),
]
for i, (title, desc, color) in enumerate(pillars):
    x = 1.0 + i * 2.4
    rounded_box(slide, x, 2.8, 2.1, 2.2)
    top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.3), Inches(2.8), Inches(1.5), Inches(0.05))
    top.fill.solid(); top.fill.fore_color.rgb = color; top.line.fill.background()
    tb(slide, x + 0.15, 3.0, 1.8, 0.4, title, size=17, bold=True, color=color, align=PP_ALIGN.CENTER)
    tb(slide, x + 0.1, 3.6, 1.9, 1.0, desc, size=12, color=RGBColor(0xBB, 0xBB, 0xBB), align=PP_ALIGN.CENTER)

tb(slide, 1.0, 5.3, 9, 0.5, 'Trade-off: download an app + 10 sec/day. Structured social commitment increases follow-through by 65%.', size=13, color=MID_GRAY)

gif(slide, 'app_temptation', 10.5, 1.0, height=3.0)
gif(slide, 'results_last', 10.5, 4.2, height=3.0)
tb(slide, 10.2, 4.1, 2.5, 0.3, 'App Friction', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)
tb(slide, 10.2, 7.2, 2.5, 0.3, 'Consequences', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 5: WHY USERS RETURN (Radhika, 35s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6, color=GREEN_LIGHT)
tb(slide, 0.85, 0.7, 8, 0.8, 'WHY USERS RETURN', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Radhika  |  35 seconds', size=12, color=GOLD)

tf = tb(slide, 0.85, 2.1, 5.5, 4.0, '')
p = tf.paragraphs[0]
p.text = 'The Repeat Loop'
p.font.size = Pt(18); p.font.bold = True; p.font.color.rgb = GOLD; p.font.name = 'Calibri'

items = [
    'Finish a 7-day challenge → see savings grow',
    'Streak is alive, friends ready for another round',
    'App suggests next: Coffee at Home, Shopping Reset',
    'Each cycle: streak grows, XP accumulates, goal gets closer',
    'Consequence content is shareable → viral acquisition',
]
for item in items:
    para(tf, '', size=4)
    para(tf, f'  {item}', size=14, color=RGBColor(0xCC, 0xCC, 0xCC), space=4)

para(tf, '', size=8)
para(tf, '1 download → invite 3 friends → loser posts consequence → followers want to try', size=13, bold=True, color=GOLD, space=10)

ret_gifs = [('weekly_recap', 'Weekly Recap'), ('renew_pact', 'Renew Pact'), ('savings_progress', 'Savings')]
for i, (gname, label) in enumerate(ret_gifs):
    x = 7.5 + i * 2.0
    gif(slide, gname, x, 1.3, height=4.8)
    tb(slide, x - 0.2, 6.2, 2.2, 0.3, label, size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 6: CAN WE BUILD A BUSINESS? (Ketan, 55s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 8, 0.8, 'CAN WE BUILD A BUSINESS?', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Ketan  |  55 seconds', size=12, color=GOLD)

feasibility = [
    ('Technical', ['Core loop: standard mobile eng', '15 screens, 20 demo states', 'Bank integration via Plaid'], GREEN_LIGHT),
    ('Operational', ['Circle activation is main risk', 'Need 3-5 friends to join', 'Starting: Cornell student groups'], GOLD),
    ('Financial', ['Freemium + bank partnerships', '$2.40 ARPU/month', 'LTV/CAC: 3.2x base case'], SUCCESS),
]
for i, (title, items, color) in enumerate(feasibility):
    x = 0.85 + i * 3.0
    rounded_box(slide, x, 2.1, 2.7, 3.2)
    top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.3), Inches(2.1), Inches(2.1), Inches(0.05))
    top.fill.solid(); top.fill.fore_color.rgb = color; top.line.fill.background()
    tb(slide, x + 0.2, 2.3, 2.3, 0.4, title, size=18, bold=True, color=color)
    for j, item in enumerate(items):
        tb(slide, x + 0.2, 2.9 + j * 0.6, 2.3, 0.5, f'  {item}', size=12, color=RGBColor(0xBB, 0xBB, 0xBB))

rounded_box(slide, 0.85, 5.7, 8.5, 0.7, RGBColor(0x30, 0x30, 0x48))
tb(slide, 1.1, 5.8, 8.0, 0.5, 'Riskiest Assumption: Will 3-5 friends download and complete a 7-day challenge together?', size=15, bold=True, color=GOLD)

gif(slide, 'create_pact', 10.5, 1.3, height=5.0)
tb(slide, 10.2, 6.4, 2.8, 0.3, 'Create Pact Flow', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)


# ── SLIDE 7: THE ASK (Yuge, 30s) ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, GREEN)
tb(slide, 1.0, 0.8, 8, 0.8, 'THE ASK', size=36, bold=True)
tb(slide, 1.0, 1.5, 3, 0.3, 'Yuge  |  30 seconds', size=12, color=GOLD)

tf = tb(slide, 1.0, 2.2, 6.0, 4.0, '')
p = tf.paragraphs[0]
p.text = 'What we need next:'
p.font.size = Pt(18); p.font.bold = True; p.font.color.rgb = GOLD; p.font.name = 'Calibri'

asks = [
    '1.  5 concept-test interviews (20 min each) to validate circle activation',
    '2.  1 live pilot: 3 friend groups using PACT for 2 weeks',
    '3.  Partner introductions: campus orgs, financial wellness programs',
    '4.  Technical mentorship: Plaid integration, iOS development',
]
for ask in asks:
    para(tf, '', size=6)
    para(tf, ask, size=16, space=6)

gif(slide, 'home', 8.5, 1.0, height=5.5)
gif(slide, 'results_perfect', 10.8, 1.0, height=5.5)


# ── SLIDE 8: FULL DEMO — ALL SCREENS ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
tb(slide, 0.3, 0.2, 12.7, 0.5, 'COMPLETE PRODUCT DEMO', size=28, bold=True, align=PP_ALIGN.CENTER)
tb(slide, 0.3, 0.7, 12.7, 0.3, '15 screens  |  20 interactive states  |  Animated walkthrough', size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)

all_gifs = [
    ('welcome', 'Welcome'), ('onboarding', 'Onboarding'), ('home', 'Home'),
    ('create_pact', 'Create Pact'), ('active_pact', 'Active Pact'),
    ('app_temptation', 'App Friction'), ('check_in', 'Check-in'),
    ('results_perfect', 'All Perfect'), ('results_last', 'Last Place'),
    ('results_tied', 'All Tied'), ('weekly_recap', 'Recap'),
    ('savings_progress', 'Savings'), ('renew_pact', 'Renew'),
]

row1 = all_gifs[:7]
row2 = all_gifs[7:]

for i, (gname, label) in enumerate(row1):
    x = 0.3 + i * 1.85
    gif(slide, gname, x, 1.1, height=2.8)
    tb(slide, x - 0.1, 3.95, 1.8, 0.3, label, size=9, color=MID_GRAY, align=PP_ALIGN.CENTER)

for i, (gname, label) in enumerate(row2):
    x = 1.2 + i * 1.85
    gif(slide, gname, x, 4.3, height=2.8)
    tb(slide, x - 0.1, 7.15, 1.8, 0.3, label, size=9, color=MID_GRAY, align=PP_ALIGN.CENTER)


prs.save(OUTPUT)
print(f'PPTX saved: {OUTPUT}')
print(f'Size: {os.path.getsize(OUTPUT) / 1024:.0f} KB')
