import { test, expect } from '@playwright/test';
import pom_homepage from '../../keyword/frontend/Home/home';
const lang = 'th'; // wait environment variable or config file to set language
const expected_result = require(`../../../expected_result/frontend/home/${lang}/expected.json`)

test('open home page',{ tag: '@regression'}, async ({ page }) => {
    await pom_homepage.goto_homepage(page);
    await pom_homepage.check_hompage_title(page, expected_result.title);
})