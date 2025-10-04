// import { expect, test } from '@playwright/test';
// import dotenv from 'dotenv';
// dotenv.config();

// test('Delete MultiDay Events', async ({ page }) => {
//     await page.goto(process.env.API_URL, { waitUntil: 'domcontentloaded' });
//     await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
//     // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
//     await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
//     await page.locator('.offcanvas-backdrop').click();
//     await page.waitForTimeout(5000);
//     const calendarEvent = page.locator('#E-20250904');
//     await expect(calendarEvent).toBeVisible({ timeout: 10000 });
//     await calendarEvent.click();
//     await expect(async () => {
//         await page.getByRole('button', { name: /MultiDay Events/ }).last().click();
//         await page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3).click();
//     }).toPass({ timeout: 20000 });

//     await page.getByRole('button', { name: 'Delete Event' }).click();
//     await page.waitForTimeout(800);
//     // Assert success message
//     await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
// });