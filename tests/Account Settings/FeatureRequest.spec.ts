import {  expect } from '@playwright/test';
import { test } from '../../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config();
test('Feature Request', async ({ page, baseUrl }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
    await page.locator('.offcanvas-backdrop').click();
    await page.getByRole('listitem').filter({ hasText: 'Loading...Account' }).getByRole('button').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Feature Request' }).click();
    const page1 = await page1Promise;
    await expect(page1.locator('h1')).toContainText('Feature requests');
});


