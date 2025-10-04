import { expect } from '@playwright/test';
import { test } from '../../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config();
test('ChangeLog', async ({ page, baseUrl }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();

    const [page1] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByRole('menuitem', { name: 'Changelog' }).click()
    ]);

    // Wait for the new page to be ready
    await page1.waitForLoadState('domcontentloaded');

    // ✅ Assert that the popup contains the text
    await expect(page1.locator('#content')).toContainText('Changelog');

});