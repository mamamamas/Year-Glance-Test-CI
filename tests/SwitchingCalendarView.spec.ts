
import { test } from '../Fixture.js';
import { expect } from '@playwright/test'; 
// require('dotenv').config();
import { switchView } from '../Helpers.spec.js';

test('Switch between Horizontal and Vertical views', async ({ page, baseUrl }) => {
    // Step 1: Go to the app
     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
     await expect(page).toHaveTitle(/Year Glance App/);

    // Step 2: Close backdrop if visible
    const backdrop = page.locator('.offcanvas-backdrop');
    await backdrop.click();
    await page.waitForTimeout(10000);

    // Step 3: Use helper to switch views
    await switchView(page, 'Monthly', 'Horizontal');
    await switchView(page, 'Horizontal', 'Vertical');
});
