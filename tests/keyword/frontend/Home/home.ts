import { Page } from '@playwright/test';

async function goto_homepage(page: Page) {
  await page.goto('https://www.muze.co.th/?lang=th');
  await page.waitForLoadState('networkidle');
}

async function check_hompage_title(page: Page, expectedTitle: string) {
  const title = await page.title();
  if (title !== expectedTitle) {
    throw new Error(`Title mismatch: expected "${expectedTitle}", but got "${title}"`);
  }
}

export default {
  goto_homepage,
  check_hompage_title,
};

