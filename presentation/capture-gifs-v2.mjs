import puppeteer from 'puppeteer';
import { mkdirSync, existsSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const BASE = '/Users/radhikasahani/Desktop/Build w Claude/pact/presentation';
const FRAMES_DIR = join(BASE, 'frames');
const GIFS_DIR = join(BASE, 'gifs');
mkdirSync(FRAMES_DIR, { recursive: true });
mkdirSync(GIFS_DIR, { recursive: true });

// The scrollable content area inside each screen (NOT the PhoneFrame wrapper)
const SCROLL_SELECTOR = '.flex-1.overflow-y-auto';

const SCREENS = [
  { name: 'welcome',          state: 'welcome',            scroll: 0   },
  { name: 'onboarding',       state: 'onboarding',         scroll: 0   },
  { name: 'home',             state: 'home',               scroll: 600 },
  { name: 'create_pact',      state: 'create_pact',        scroll: 500 },
  { name: 'active_pact',      state: 'active_pact',        scroll: 500 },
  { name: 'app_temptation',   state: 'app_temptation',     scroll: 300 },
  { name: 'check_in',         state: 'check_in',           scroll: 0   },
  { name: 'results_perfect',  state: 'everyone_succeeds',  scroll: 500 },
  { name: 'results_last',     state: 'unique_last',        scroll: 500 },
  { name: 'results_tied',     state: 'everyone_tied_below', scroll: 400 },
  { name: 'weekly_recap',     state: 'weekly_recap',       scroll: 500 },
  { name: 'savings_progress', state: 'savings_progress',   scroll: 300 },
  { name: 'renew_pact',       state: 'renew_pact',         scroll: 500 },
];

function clearDir(dir) {
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.png')) unlinkSync(join(dir, f));
    }
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 900 });

  for (const screen of SCREENS) {
    const frameDir = join(FRAMES_DIR, screen.name);
    mkdirSync(frameDir, { recursive: true });
    clearDir(frameDir);

    await page.goto(`http://localhost:3001/?demo=${screen.state}`, { waitUntil: 'networkidle2' });
    // Let CSS animations start
    await new Promise(r => setTimeout(r, 500));

    // Reset scroll to top and measure actual scroll range
    const scrollInfo = await page.evaluate((sel) => {
      const el = document.querySelector(sel) || document.querySelector('.overflow-y-auto');
      if (el) {
        el.scrollTop = 0;
        return { maxScroll: el.scrollHeight - el.clientHeight, found: true };
      }
      return { maxScroll: 0, found: false };
    }, SCROLL_SELECTOR);
    await new Promise(r => setTimeout(r, 200));
    // Cap scroll to what's actually available
    const actualScroll = Math.min(screen.scroll, scrollInfo.maxScroll);

    // Get clip region (the phone border area)
    const clip = await page.evaluate(() => {
      // The phone body: the rounded container with border
      const phone = document.querySelector('.relative.w-\\[390px\\]');
      if (phone) {
        const r = phone.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) };
      }
      return { x: 49, y: 10, width: 402, height: 856 };
    });

    let frameIdx = 0;
    const FPS = 10;

    console.log(`  ${screen.name}: maxScroll=${scrollInfo.maxScroll}, using=${actualScroll}`);

    if (actualScroll === 0) {
      // Static screen — just capture ~3 seconds of CSS animations
      for (let i = 0; i < 30; i++) {
        await page.screenshot({ path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`), clip });
        await new Promise(r => setTimeout(r, 100));
      }
    } else {
      // Animated scroll: hold 1s → scroll down 2s → hold 1s → scroll back up 1s
      const holdFrames = 10;
      const scrollDownFrames = 20;
      const holdBottomFrames = 10;
      const scrollUpFrames = 15;

      // Phase 1: Hold at top
      for (let i = 0; i < holdFrames; i++) {
        await page.screenshot({ path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`), clip });
        await new Promise(r => setTimeout(r, 100));
      }

      // Phase 2: Smooth scroll down
      const downStep = actualScroll / scrollDownFrames;
      for (let i = 0; i < scrollDownFrames; i++) {
        await page.evaluate((sel, step) => {
          const el = document.querySelector(sel) || document.querySelector('.overflow-y-auto');
          if (el) el.scrollTop += step;
        }, SCROLL_SELECTOR, downStep);
        await new Promise(r => setTimeout(r, 50));
        await page.screenshot({ path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`), clip });
      }

      // Phase 3: Hold at bottom
      for (let i = 0; i < holdBottomFrames; i++) {
        await page.screenshot({ path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`), clip });
        await new Promise(r => setTimeout(r, 100));
      }

      // Phase 4: Scroll back up
      const upStep = actualScroll / scrollUpFrames;
      for (let i = 0; i < scrollUpFrames; i++) {
        await page.evaluate((sel, step) => {
          const el = document.querySelector(sel) || document.querySelector('.overflow-y-auto');
          if (el) el.scrollTop -= step;
        }, SCROLL_SELECTOR, upStep);
        await new Promise(r => setTimeout(r, 50));
        await page.screenshot({ path: join(frameDir, `frame_${String(frameIdx++).padStart(4, '0')}.png`), clip });
      }
    }

    // Convert to looping GIF
    const gifPath = join(GIFS_DIR, `${screen.name}.gif`);
    try {
      execSync(
        `ffmpeg -y -framerate ${FPS} -i "${frameDir}/frame_%04d.png" ` +
        `-vf "scale=300:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" ` +
        `-loop 0 "${gifPath}"`,
        { stdio: 'pipe' }
      );
      console.log(`OK: ${screen.name}.gif (${frameIdx} frames)`);
    } catch (e) {
      console.error(`FAIL: ${screen.name}: ${e.stderr?.toString().slice(-200)}`);
    }
  }

  await browser.close();
  console.log('\nAll GIFs captured!');
})();
