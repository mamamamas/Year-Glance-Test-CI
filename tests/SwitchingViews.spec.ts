import { expect } from '@playwright/test'; 
import { test } from '../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config();
test("Switch views", async ({ page, baseUrl }) => {
     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
     await expect(page).toHaveTitle(/Year Glance App/);

    await page.locator('.offcanvas-backdrop').click();

    // Switch between views
    await page.getByRole('button', { name: 'Year' }).click();
    await page.getByRole('menuitem', { name: 'Month' }).click();
    await page.getByRole('button', { name: 'Month', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Week' }).click();
    await page.getByRole('button', { name: 'Week' }).first().click();
    await page.getByRole('menuitem', { name: 'Agenda' }).click();
})