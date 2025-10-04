import { expect } from '@playwright/test';
import { test } from '../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config();

test('Incorrect Email or Password', async ({page, baseUrl  }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Year Glance App/);
     const email = page.locator('#input-email');
    const password = page.locator('#input-password');
    const loginBtn = page.locator("#btn-login");
    const errorAlert = page.locator('#custom-alert.alert-error');
    await email.fill("mcdurana+4@jlabs.team");
    await password.fill("WrongPassword!");
    await loginBtn.click();
    await expect(errorAlert).toContainText('Incorrect Password or Email', { timeout: 5000 });
});


test('Empty Text Field', async ({ page,baseUrl }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Year Glance App/);
     const email = page.locator('#input-email');
    const password = page.locator('#input-password');
    const loginBtn = page.locator("#btn-login");
    await email.fill("");
    await password.fill("");
    await expect(page.locator('#btn-login')).toHaveAttribute('disabled', '', { timeout: 5000 });
});