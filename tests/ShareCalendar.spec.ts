import {  expect } from '@playwright/test';
import { test } from '../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config();
test('Share Calendar', async ({ page, context, baseUrl }) => {
       await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
    await page.locator('.offcanvas-backdrop').click();
    await page.waitForTimeout(15000);
    await page.getByRole('button', { name: 'Share' }).click();
    await page.waitForTimeout(3000);
    await page.getByLabel('Year - Monthly').click();
    await page.getByLabel('Agenda').click();
    await page.getByLabel('Month', { exact: true }).click();
    await page.getByLabel('Year - Horizontal').click();
    await page.getByLabel('Week').click();
    await page.getByLabel('Year - Vertical').click();
    await page.getByLabel('Day').click();
    // await page.getByRole('checkbox', { name: 'Year - Monthly' }).check();
    // await page.getByRole('checkbox', { name: 'Year - Monthly' }).check();
    // await page.getByRole('checkbox', { name: 'Agenda' }).check();
    // await page.getByRole('checkbox', { name: 'Month', exact: true }).check();
    // await page.getByRole('checkbox', { name: 'Year - Horizontal' }).check();
    // await page.getByRole('checkbox', { name: 'Week' }).check();
    // await page.getByRole('checkbox', { name: 'Year - Vertical' }).check();
    // await page.getByRole('checkbox', { name: 'Day' }).check();
    await page.waitForTimeout(3000);
    await page.locator('div').filter({ hasText: /^LinkCopy$/ }).getByRole('button').click();
    // await page.waitForTimeout(1000);
    // await expect(page.locator('role=alert')).toHaveText('Copied to clipboard.');

    // Create a new page from the context
    const page1 = await context.newPage();
    await page1.goto(
        'https://staging-v2.yearglance.com/share-my-calendar/9f9af05d-c515-432a-b5bd-b3fa2337414f?code=eyJjYWxlbmRhcl9pZHMiOltdLCJjYXRlZ29yeV9pZHMiOltdLCJwZXJtaXNzaW9uIjpmYWxzZSwibW9udGhseSI6dHJ1ZSwiYWdlbmRhIjp0cnVlLCJtb250aCI6dHJ1ZSwiaG9yaXpvbnRhbCI6dHJ1ZSwid2VlayI6dHJ1ZSwidmVydGljYWwiOnRydWUsImRheSI6dHJ1ZX0%3D'
    );

    // validate something in the shared calendar page
    await expect(page1).toHaveURL(/share-my-calendar/);
});

