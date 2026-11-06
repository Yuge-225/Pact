import puppeteer from 'puppeteer';
import { mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const BASE = '/Users/radhikasahani/Desktop/Build w Claude/pact/presentation';
const FRAMES_DIR = join(BASE, 'frames');
const GIFS_DIR = join(BASE, 'gifs');
mkdirSync(FRAMES_DIR, { recursive: true });
mkdirSync(GIFS_DIR, { recursive: true });

const RECORDINGS = [
  {
    name: 'welcome',
    states: ['welcome'],
    scrollDown: false,
    interactSteps: [
      { wait: 800 },
    ],
    totalFrames: 30,
    fps: 8,
  },
  {
    name: 'home',
    states: ['home'],
    scrollDown: true,
    scrollAmount: 400,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 40,
    fps: 8,
  },
  {
    name: 'active_pact',
    states: ['active_pact'],
    scrollDown: true,
    scrollAmount: 350,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 40,
    fps: 8,
  },
  {
    name: 'check_in',
    states: ['check_in'],
    scrollDown: false,
    interactSteps: [
      { wait: 1200 },
    ],
    totalFrames: 25,
    fps: 8,
  },
  {
    name: 'results_perfect',
    states: ['everyone_succeeds'],
    scrollDown: true,
    scrollAmount: 300,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 40,
    fps: 8,
  },
  {
    name: 'results_last',
    states: ['unique_last'],
    scrollDown: true,
    scrollAmount: 300,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 40,
    fps: 8,
  },
  {
    name: 'weekly_recap',
    states: ['weekly_recap'],
    scrollDown: true,
    scrollAmount: 300,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 40,
    fps: 8,
  },
  {
    name: 'app_temptation',
    states: ['app_temptation'],
    scrollDown: false,
    interactSteps: [
      { wait: 1000 },
    ],
    totalFrames: 30,
    fps: 8,
  },
  {
    name: 'create_pact',
    states: ['create_pact'],
    scrollDown: true,
    scrollAmount: 300,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 35,
    fps: 8,
  },
  {
    name: 'savings_progress',
    states: ['savings_progress'],
    scrollDown: true,
    scrollAmount: 200,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 35,
    fps: 8,
  },
  {
    name: 'renew_pact',
    states: ['renew_pact'],
    scrollDown: true,
    scrollAmount: 300,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 35,
    fps: 8,
  },
  {
    name: 'onboarding',
    states: ['onboarding'],
    scrollDown: false,
    interactSteps: [
      { wait: 800 },
    ],
    totalFrames: 25,
    fps: 8,
  },
  {
    name: 'results_tied',
    states: ['everyone_tied_below'],
    scrollDown: true,
    scrollAmount: 200,
    interactSteps: [
      { wait: 600 },
    ],
    totalFrames: 35,
    fps: 8,
  },
];

function clearDir(dir) {
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) unlinkSync(join(dir, f));
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 900 });

  for (const rec of RECORDINGS) {
    const frameDir = join(FRAMES_DIR, rec.name);
    mkdirSync(frameDir, { recursive: true });
    clearDir(frameDir);

    // Load with demo state param (hides demo panel automatically)
    await page.goto(`http://localhost:3001/?demo=${rec.states[0]}`, { waitUntil: 'networkidle2' });

    // Wait for animations to start
    await new Promise(r => setTimeout(r, 300));

    // Find the phone frame element for clipping
    const phoneEl = await page.$('.relative.mx-auto');
    const phoneBox = phoneEl ? await phoneEl.boundingBox() : null;
    const clip = phoneBox ? {
      x: Math.round(phoneBox.x),
      y: Math.round(phoneBox.y),
      width: Math.round(phoneBox.width),
      height: Math.round(phoneBox.height),
    } : { x: 60, y: 5, width: 380, height: 890 };

    let frameIdx = 0;
    const framesBeforeScroll = Math.floor(rec.totalFrames * 0.4);
    const scrollFrames = Math.floor(rec.totalFrames * 0.3);
    const framesAfterScroll = rec.totalFrames - framesBeforeScroll - scrollFrames;

    // Phase 1: Initial state frames
    for (let i = 0; i < framesBeforeScroll; i++) {
      await page.screenshot({
        path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`),
        clip,
      });
      await new Promise(r => setTimeout(r, 1000 / rec.fps));
    }

    // Phase 2: Scroll down (if applicable)
    if (rec.scrollDown && rec.scrollAmount) {
      const scrollPerFrame = rec.scrollAmount / scrollFrames;
      for (let i = 0; i < scrollFrames; i++) {
        await page.evaluate((amt) => {
          const container = document.querySelector('.h-full.overflow-y-auto') ||
                           document.querySelector('.overflow-y-auto') ||
                           document.querySelector('[class*="overflow-y"]');
          if (container) container.scrollTop += amt;
        }, scrollPerFrame);
        await new Promise(r => setTimeout(r, 80));
        await page.screenshot({
          path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`),
          clip,
        });
      }
    } else {
      // Just capture more static frames
      for (let i = 0; i < scrollFrames; i++) {
        await page.screenshot({
          path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`),
          clip,
        });
        await new Promise(r => setTimeout(r, 1000 / rec.fps));
      }
    }

    // Phase 3: Hold at scrolled position
    for (let i = 0; i < framesAfterScroll; i++) {
      await page.screenshot({
        path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`),
        clip,
      });
      await new Promise(r => setTimeout(r, 1000 / rec.fps));
    }

    // Convert to GIF using ffmpeg
    const gifPath = join(GIFS_DIR, `${rec.name}.gif`);
    try {
      execSync(
        `ffmpeg -y -framerate ${rec.fps} -i "${frameDir}/frame_%04d.png" -vf "scale=280:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" "${gifPath}"`,
        { stdio: 'pipe' }
      );
      console.log(`GIF created: ${rec.name}.gif`);
    } catch (e) {
      console.error(`Failed to create GIF for ${rec.name}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
})();
