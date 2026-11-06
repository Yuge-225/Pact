"""
Generate PPTX with animated GIFs that actually play in PowerPoint.

python-pptx converts GIFs to static PNG internally, so after generating
the base PPTX we post-process the ZIP: replace each PNG media file with
the original animated GIF and patch Content_Types.xml.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
import os, zipfile, shutil, re, tempfile

BASE = os.path.dirname(os.path.abspath(__file__))
GIFS = os.path.join(BASE, 'gifs')
OUTPUT = os.path.join(BASE, 'PACT_Maker_Day_2.pptx')
TEMP_PPTX = os.path.join(BASE, '_temp.pptx')

GREEN = RGBColor(0x1B, 0x43, 0x32)
GREEN_LIGHT = RGBColor(0x2D, 0x6A, 0x4F)
CHARCOAL = RGBColor(0x1A, 0x1A, 0x2E)
GOLD = RGBColor(0xF5, 0xA6, 0x23)
CORAL = RGBColor(0xE7, 0x6F, 0x51)
SUCCESS = RGBColor(0x22, 0xC5, 0x5E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
MID_GRAY = RGBColor(0x88, 0x88, 0x88)
LIGHT_BG = RGBColor(0x25, 0x25, 0x3E)

# Track which GIF file maps to which media slot
gif_mapping = {}  # media_name -> gif_source_path
gif_counter = [0]

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)


def add_bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def tb(slide, left, top, width, height, text, size=18, bold=False, color=WHITE, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = 'Calibri'
    p.alignment = align
    return tf


def para(tf, text, size=18, bold=False, color=WHITE, space=0):
    p = tf.add_paragraph()
    p.text = text
    p.font.size = Pt(size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = 'Calibri'
    if space:
        p.space_before = Pt(space)
    return p


def add_gif(slide, name, left, top, height=5.0):
    path = os.path.join(GIFS, f'{name}.gif')
    if not os.path.exists(path):
        return
    pic = slide.shapes.add_picture(path, Inches(left), Inches(top), height=Inches(height))
    # Track the relationship: the image part name in the PPTX
    gif_counter[0] += 1


def bar(slide, left, top, w=0.06, h=0.8, color=GOLD):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(w), Inches(h))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()


def rbox(slide, left, top, w, h, color=LIGHT_BG):
    s = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(w), Inches(h))
    s.fill.solid()
    s.fill.fore_color.rgb = color
    s.line.fill.background()


# ── SLIDE 1: TITLE ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
tb(slide, 4.5, 1.0, 4.5, 1.2, 'PACT', size=72, bold=True, align=PP_ALIGN.CENTER)
tb(slide, 4.5, 2.3, 4.5, 0.6, 'Save together.', size=28, color=GOLD, align=PP_ALIGN.CENTER)
tb(slide, 3.0, 3.3, 7.5, 0.5, 'Social savings through playful accountability', size=18, color=MID_GRAY, align=PP_ALIGN.CENTER)
add_gif(slide, 'welcome', 5.4, 3.9, height=3.2)
tb(slide, 3.0, 6.9, 7.5, 0.4, 'Cornell Tech Product Studio  |  Maker Day 2  |  October 2026', size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 2: THE PROBLEM ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 5, 0.8, 'THE PROBLEM', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Radhika  |  35 seconds', size=12, color=GOLD)
tf = tb(slide, 0.85, 2.0, 7, 4.5, '$300+/month on food delivery for the average 25-year-old', size=20, bold=True)
para(tf, '', size=8)
para(tf, "The problem isn't awareness. Budgeting apps already tell you what you spent.", size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space=8)
para(tf, '', size=8)
para(tf, 'Good intentions disappear at the moment of temptation.', size=18, bold=True, color=GOLD, space=8)
para(tf, '', size=8)
para(tf, 'Current solution: a group chat that lasts 3 days.', size=16, color=RGBColor(0xBB, 0xBB, 0xBB), space=8)
para(tf, '', size=8)
para(tf, '"So we built something better."', size=20, bold=True, space=12)
add_gif(slide, 'welcome', 9.0, 0.8, height=3.0)
add_gif(slide, 'home', 11.0, 0.8, height=3.0)
tb(slide, 8.8, 3.9, 2.2, 0.3, 'Welcome', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)
tb(slide, 10.8, 3.9, 2.2, 0.3, 'Home Dashboard', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 3: PACT IN ACTION ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6, color=GREEN_LIGHT)
tb(slide, 0.85, 0.7, 5, 0.8, 'PACT IN ACTION', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Ketan  |  90 seconds', size=12, color=GOLD)
tf = tb(slide, 0.85, 2.0, 3.2, 4.0, 'Demo Journey', size=16, bold=True, color=GOLD)
for s in ['1. Streak, savings, trending consequences', '2. Same rules, personal savings amounts', '3. One question, 10 seconds', '4. Celebrate or face consequences', '5. Savings recap, start next challenge']:
    para(tf, '', size=4)
    para(tf, s, size=13, color=RGBColor(0xCC, 0xCC, 0xCC), space=4)
para(tf, '', size=8)
para(tf, 'Commit > Check in > Celebrate > Repeat', size=13, bold=True, color=GOLD, space=10)
for i, (gname, label) in enumerate([('home', 'Home'), ('active_pact', 'Active Pact'), ('check_in', 'Check-in'), ('results_perfect', 'Results'), ('weekly_recap', 'Recap')]):
    x = 4.5 + i * 1.8
    add_gif(slide, gname, x, 1.5, height=4.8)
    tb(slide, x - 0.2, 6.4, 2.0, 0.3, label, size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 4: WHY CHOOSE PACT? ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 8, 0.8, 'WHY CHOOSE PACT?', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Yuge  |  55 seconds', size=12, color=GOLD)
tb(slide, 1.0, 2.1, 5, 0.4, 'Next-best alternative: a group chat', size=15, color=MID_GRAY)
for i, (title, desc, color) in enumerate([
    ('Structure', 'Same rules, clear duration,\ndefined eligible days', GREEN_LIGHT),
    ('Gamification', 'Streaks, XP, daily check-ins\nthat create a habit', GOLD),
    ('Stakes', 'Playful consequences that\nare fun, not punitive', CORAL),
    ('Savings', 'Every successful day moves\nmoney toward your goal', SUCCESS),
]):
    x = 1.0 + i * 2.4
    rbox(slide, x, 2.8, 2.1, 2.2)
    top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.3), Inches(2.8), Inches(1.5), Inches(0.05))
    top.fill.solid(); top.fill.fore_color.rgb = color; top.line.fill.background()
    tb(slide, x + 0.15, 3.0, 1.8, 0.4, title, size=17, bold=True, color=color, align=PP_ALIGN.CENTER)
    tb(slide, x + 0.1, 3.6, 1.9, 1.0, desc, size=12, color=RGBColor(0xBB, 0xBB, 0xBB), align=PP_ALIGN.CENTER)
tb(slide, 1.0, 5.3, 9, 0.5, 'Trade-off: download an app + 10 sec/day. Follow-through increases 65%.', size=13, color=MID_GRAY)
add_gif(slide, 'app_temptation', 10.5, 1.0, height=3.0)
add_gif(slide, 'results_last', 10.5, 4.2, height=3.0)
tb(slide, 10.2, 4.1, 2.5, 0.3, 'App Friction', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)
tb(slide, 10.2, 7.2, 2.5, 0.3, 'Consequences', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 5: WHY USERS RETURN ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6, color=GREEN_LIGHT)
tb(slide, 0.85, 0.7, 8, 0.8, 'WHY USERS RETURN', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Radhika  |  35 seconds', size=12, color=GOLD)
tf = tb(slide, 0.85, 2.1, 5.5, 4.0, 'The Repeat Loop', size=18, bold=True, color=GOLD)
for item in ['Finish a 7-day challenge → see savings grow', 'Streak is alive, friends ready for another round', 'App suggests next: Coffee at Home, Shopping Reset', 'Each cycle: streak grows, XP accumulates, goal closer', 'Consequence content is shareable → viral acquisition']:
    para(tf, '', size=4)
    para(tf, f'  {item}', size=14, color=RGBColor(0xCC, 0xCC, 0xCC), space=4)
para(tf, '', size=8)
para(tf, '1 download → invite 3 → loser posts → followers try', size=13, bold=True, color=GOLD, space=10)
for i, (gname, label) in enumerate([('weekly_recap', 'Weekly Recap'), ('renew_pact', 'Renew Pact'), ('savings_progress', 'Savings')]):
    x = 7.5 + i * 2.0
    add_gif(slide, gname, x, 1.3, height=4.8)
    tb(slide, x - 0.2, 6.2, 2.2, 0.3, label, size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 6: CAN WE BUILD A BUSINESS? ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
bar(slide, 0.6, 0.8, h=0.6)
tb(slide, 0.85, 0.7, 8, 0.8, 'CAN WE BUILD A BUSINESS?', size=36, bold=True)
tb(slide, 0.85, 1.4, 3, 0.3, 'Ketan  |  55 seconds', size=12, color=GOLD)
for i, (title, items, color) in enumerate([
    ('Technical', ['Core loop: standard mobile eng', '15 screens, 20 demo states', 'Bank integration via Plaid'], GREEN_LIGHT),
    ('Operational', ['Circle activation is main risk', 'Need 3-5 friends to join', 'Starting: Cornell student groups'], GOLD),
    ('Financial', ['Freemium + bank partnerships', '$2.40 ARPU/month', 'LTV/CAC: 3.2x base case'], SUCCESS),
]):
    x = 0.85 + i * 3.0
    rbox(slide, x, 2.1, 2.7, 3.2)
    top = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x + 0.3), Inches(2.1), Inches(2.1), Inches(0.05))
    top.fill.solid(); top.fill.fore_color.rgb = color; top.line.fill.background()
    tb(slide, x + 0.2, 2.3, 2.3, 0.4, title, size=18, bold=True, color=color)
    for j, item in enumerate(items):
        tb(slide, x + 0.2, 2.9 + j * 0.6, 2.3, 0.5, f'  {item}', size=12, color=RGBColor(0xBB, 0xBB, 0xBB))
rbox(slide, 0.85, 5.7, 8.5, 0.7, RGBColor(0x30, 0x30, 0x48))
tb(slide, 1.1, 5.8, 8.0, 0.5, 'Riskiest Assumption: Will 3-5 friends download and complete a 7-day challenge together?', size=15, bold=True, color=GOLD)
add_gif(slide, 'create_pact', 10.5, 1.3, height=5.0)
tb(slide, 10.2, 6.4, 2.8, 0.3, 'Create Pact Flow', size=10, color=MID_GRAY, align=PP_ALIGN.CENTER)

# ── SLIDE 7: THE ASK ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, GREEN)
tb(slide, 1.0, 0.8, 8, 0.8, 'THE ASK', size=36, bold=True)
tb(slide, 1.0, 1.5, 3, 0.3, 'Yuge  |  30 seconds', size=12, color=GOLD)
tf = tb(slide, 1.0, 2.2, 6.0, 4.0, 'What we need next:', size=18, bold=True, color=GOLD)
for ask in ['1.  5 concept-test interviews (20 min) to validate circle activation', '2.  1 live pilot: 3 friend groups using PACT for 2 weeks', '3.  Partner intros: campus orgs, financial wellness programs', '4.  Technical mentorship: Plaid integration, iOS development']:
    para(tf, '', size=6)
    para(tf, ask, size=16, space=6)
add_gif(slide, 'home', 8.5, 1.0, height=5.5)
add_gif(slide, 'results_perfect', 10.8, 1.0, height=5.5)

# ── SLIDE 8: FULL DEMO ──
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, CHARCOAL)
tb(slide, 0.3, 0.2, 12.7, 0.5, 'COMPLETE PRODUCT DEMO', size=28, bold=True, align=PP_ALIGN.CENTER)
tb(slide, 0.3, 0.7, 12.7, 0.3, '15 screens  |  20 interactive states  |  Animated walkthrough', size=12, color=MID_GRAY, align=PP_ALIGN.CENTER)
row1 = [('welcome','Welcome'),('onboarding','Onboarding'),('home','Home'),('create_pact','Create Pact'),('active_pact','Active Pact'),('app_temptation','App Friction'),('check_in','Check-in')]
row2 = [('results_perfect','All Perfect'),('results_last','Last Place'),('results_tied','All Tied'),('weekly_recap','Recap'),('savings_progress','Savings'),('renew_pact','Renew')]
for i, (gname, label) in enumerate(row1):
    x = 0.3 + i * 1.85
    add_gif(slide, gname, x, 1.1, height=2.8)
    tb(slide, x - 0.1, 3.95, 1.8, 0.3, label, size=9, color=MID_GRAY, align=PP_ALIGN.CENTER)
for i, (gname, label) in enumerate(row2):
    x = 1.2 + i * 1.85
    add_gif(slide, gname, x, 4.3, height=2.8)
    tb(slide, x - 0.1, 7.15, 1.8, 0.3, label, size=9, color=MID_GRAY, align=PP_ALIGN.CENTER)


# Save directly — python-pptx preserves GIF format and animation data
prs.save(OUTPUT)
print(f'PPTX saved with {gif_counter[0]} animated GIFs')
print(f'Output: {OUTPUT}')
print(f'Size: {os.path.getsize(OUTPUT) / 1024:.0f} KB')
print('\nIMPORTANT: GIFs animate in PowerPoint SLIDESHOW mode (F5 / Cmd+Shift+Enter).')
print('They appear static in edit mode — this is normal PowerPoint behavior.')
