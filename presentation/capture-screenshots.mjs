import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { join } from 'path';

const DIR = '/Users/radhikasahani/Desktop/Build w Claude/pact/presentation/screenshots';
mkdirSync(DIR, { recursive: true });

const SCREENS = [
  { name: '01_welcome', state: 'welcome' },
  { name: '02_onboarding', state: 'onboarding' },
  { name: '03_home', state: 'home' },
  { name: '04_create_pact', state: 'create_pact' },
  { name: '05_active_pact', state: 'active_pact' },
  { name: '06_app_temptation', state: 'app_temptation' },
  { name: '07_check_in', state: 'check_in' },
  { name: '08_results_all_perfect', state: 'everyone_succeeds' },
  { name: '09_results_unique_last', state: 'unique_last' },
  { name: '10_results_tied_below', state: 'everyone_tied_below' },
  { name: '11_weekly_recap', state: 'weekly_recap' },
  { name: '12_savings_progress', state: 'savings_progress' },
  { name: '13_renew_pact', state: 'renew_pact' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 900 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.fixed.top-4.right-4', { timeout: 5000 });

  // Hide demo panel
  await page.evaluate(() => {
    const panel = document.querySelector('.fixed.top-4.right-4');
    if (panel) panel.style.display = 'none';
  });

  for (const screen of SCREENS) {
    // Apply demo scenario via store
    await page.evaluate((state) => {
      // Access the Zustand store
      const store = window.__NEXT_DATA__?.props?.pageProps;
      // Try direct store access via devtools or module scope
      // The store uses useAppStore.getState() / useAppStore.setState()
      // We need to trigger applyDemoScenario
      const event = new CustomEvent('demo-state', { detail: state });
      window.dispatchEvent(event);
    }, screen.state);

    // Actually, let's click the demo panel buttons instead
    // First show the panel, find the right button, click it, then hide panel
    await page.evaluate((stateName) => {
      const panel = document.querySelector('.fixed.top-4.right-4');
      if (panel) panel.style.display = '';
    });
    
    await new Promise(r => setTimeout(r, 200));

    // Find and click the button for this state
    const clicked = await page.evaluate((stateValue) => {
      const panel = document.querySelector('.fixed.top-4.right-4');
      if (!panel) return false;
      const buttons = panel.querySelectorAll('button');
      // Map state values to label text
      const stateToLabel = {
        'welcome': 'Welcome',
        'onboarding': 'Onboarding',
        'home': 'Home',
        'create_pact': 'Create Pact',
        'active_pact': 'Active Pact',
        'app_temptation': 'App Temptation',
        'check_in': 'Daily Check-in',
        'everyone_succeeds': 'Everyone Succeeds',
        'unique_last': 'Unique Last Place',
        'everyone_tied_below': 'All Tied Below',
        'weekly_recap': 'Weekly Recap',
        'savings_progress': 'Savings Progress',
        'renew_pact': 'Renew Pact',
      };
      const label = stateToLabel[stateValue];
      for (const btn of buttons) {
        if (btn.textContent.trim() === label) {
          btn.click();
          return true;
        }
      }
      return false;
    }, screen.state);

    if (!clicked) {
      console.log(`WARNING: Could not find button for ${screen.state}`);
    }

    // Hide panel again  
    await page.evaluate(() => {
      const panel = document.querySelector('.fixed.top-4.right-4');
      if (panel) panel.style.display = 'none';
    });

    await new Promise(r => setTimeout(r, 800));

    // Capture just the phone frame area
    const phoneFrame = await page.$('.relative.mx-auto');
    if (phoneFrame) {
      await phoneFrame.screenshot({ path: join(DIR, `${screen.name}.png`) });
      console.log(`Captured: ${screen.name}`);
    } else {
      // Fallback: full page
      await page.screenshot({ path: join(DIR, `${screen.name}.png`), clip: { x: 130, y: 10, width: 540, height: 880 } });
      console.log(`Captured (fallback): ${screen.name}`);
    }
  }

  await browser.close();
  console.log('Done! All screenshots captured.');
})();
