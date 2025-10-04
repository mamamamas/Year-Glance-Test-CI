import { expect } from '@playwright/test';
import { test } from '../Fixture.js';
// import dotenv from 'dotenv';
// dotenv.config({ quiet: true });
import {
  validateMultiDayEvent,
  addMultiDayEvent,
  validateAllDayEvent,
  addAllDayEvent,
  addReccurringEvent,
  validateEditedAllDayEvent,
  EditAllDayEvent,
  EditMultiEvent,
  validateMultiEvent,
  EditReccurringEvent
} from '../Helpers.spec.js'; 

interface EventData {
  eventName: string;
  description: string;
  startDate?: string;
  endDate?: string;
  allDay?: boolean;
  repeat?: string;
  newName?: string;
}

// --- Create Events ---

test.describe.serial("Create/Edit/Delete MultiDay Events", () => {
    test("Add MULTI DAY event", async ({ page, baseUrl }) => {
       await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);
        const eventData = {
            eventName: "MultiDay Events",
            description: "Automating testing",
            startDate: "Saturday, October 4th,",
            endDate: "Wednesday, October 8th,",
            allDay: true,
        };

        await addMultiDayEvent(page, eventData);
    });

    test("Validate MultiDay event", async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);

        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "MultiDay Events",
            description: "Automating testing",
            allDay: true,
        };

        await validateMultiDayEvent(page, eventData);
    });

});

    test("Edit MultiDay event", async ({ page, baseUrl }) => {
        await page.goto("https://staging-v2.yearglance.com/");

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "MultiDay Events",
            newName: "Edited MultiDay Events",
            description: "Automating testing",
            startDate: "Monday, October 6th,",
            endDate: "Saturday, October 11th,",
            numDay: "4",
            allDay: true,
        };

        await EditMultiEvent(page, eventData);
    });


    test("Validate MultiDays event", async ({ page, baseUrl }) => {
          await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();

        const eventData = {
            newName: "Edited MultiDay Events",
            description: "Automating testing",
        };

        

        await validateMultiEvent(page, {
            newName: eventData.newName,
            description: eventData.description,
            eventName: '',
            startDate: '',
            endDate: '',
            allDay: true,
        });
    });
    test('Delete MultiDay Events', async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);
        const calendarEvent = page.locator('#E-20251006');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();

        await page.getByRole('button', { name: /Edited MultiDay Events/ }).last().click();
        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);

        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();



        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        // Assert success message
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });


test.describe.serial("Create/Edit/Delete AllDay Events", () => {
    test("Add ALL DAY event", async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);
        const eventData = {
            eventName: "All Day Events",
            description: "Automating testing",
            startDate: "Saturday, October 4th,",
            endDate: "Saturday, October 4th,",
            allDay: true,
        };

        await addAllDayEvent(page, eventData);
    });
    test("Validate AllDay event", async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // await page.locator(`input[name="9bfbeee1-e10c-4ba5-a001-a5720875ef0d"]`).check();
        // await page.locator(`input[name="0a2ced40-2a0e-4118-8e92-43f90e6f0f31"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "All Day Events",
            description: "Automating testing",
            allDay: true,
        };

        await validateAllDayEvent(page, eventData);
    });


    test("Edit AllDay event", async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();


        const eventData = {
            eventName: "All Day Events",
            newName: "Edited All Day Events",
            description: "Automating testing",
            startDate: "Sunday, October 5th,",
            numDay: "4",
            allDay: true,
        };
        await page.waitForTimeout(10000);
        await EditAllDayEvent(page, eventData);
    });

    test("Validate Edited AllDays event", async ({ page, baseUrl }) => {
        await page.goto("https://staging-v2.yearglance.com/");

        // Enable Google Calendar, disable Microsoft Calendar
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);

        const eventData = {
            eventName: "All Day Events",
            newName: "Edited All Day Events",
            description: "Automating testing",
            startDate: "Sunday, October 5th,",
            endDate: "Sunday, October 5th,",
            numDay: "4",
            allDay: true,
        };

        await validateEditedAllDayEvent(page, eventData);
    });

    test("Delete All Day Event", async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(10000);
        const calendarEvent = page.locator('#E-20251005');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();

        await page.getByRole('button', { name: /Edited All Day Events/ }).last().click();
        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);

        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();;

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        // Assert success message
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });

    });

});



test.describe.serial("Create Recurring Events", () => {
    const repeats = ["Daily", "Weekly", "Monthly", "Annually"];

    for (const repeat of repeats) {
        test(`Add ${repeat} Event and validate event`, async ({ page, baseUrl }) => {
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
            await page.locator('.offcanvas-backdrop').click();
            await page.waitForTimeout(10000);
            const eventData = {
                eventName: `${repeat} Repeat`,
                description: "Automating testing",
                startDate: "Saturday, October 4th,",
                endDate: "Sunday, October 5th,",
                allDay: true,
                repeat,
            };

            await addReccurringEvent(page, eventData);
        });
    }

    for (const repeat of repeats) {
        test(`Edit ${repeat} Event and validate event`, async ({ page, baseUrl }) => {
            await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
            // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
            // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
            // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
            await page.locator('.offcanvas-backdrop').click();
            await page.waitForTimeout(4000);
            const eventData = {
                eventName: `${repeat} Repeat`,   // Event name before edit
                newName: `Edited ${repeat} Event`, // Event name after edit
                description: "Updated description",
                startDate: "Sunday, October 5th,",
                endDate: "Friday, October 10th,",
                allDay: true,
                repeat,
            };

            await EditReccurringEvent(page, eventData);
        });
    }

    test('Delete Daily', async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20251005');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();

        await page.getByRole('button', { name: `Edited Daily Event Oct 5 - 10, All` }).first().click();
        await page.waitForTimeout(5000);
        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);
        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Weekly', async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20251005');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();
        await page.getByRole('button', { name: `Edited Weekly Event Oct 5 - 10, All` }).first().click();

        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);

        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Monthly', async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check();
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20251005');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();

        await page.getByRole('button', { name: `Edited Monthly Event Oct 5 - 10, All` }).first().click();
        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);

        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await expect(page.getByRole('alert').first()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
    test('Delete Annually', async ({ page, baseUrl }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Year Glance App/);
        // await page.locator(`input[name="${process.env.GOOGLE_CALENDAR}"]`).check()
        // await page.locator('input[name="0f60b054-10d0-4693-afaf-b32a34860a8d"]').check();
        // await page.locator(`input[name="${process.env.MICROSOFT_CALENDAR}"]`).uncheck();
        await page.locator('.offcanvas-backdrop').click();
        await page.waitForTimeout(5000);
        const calendarEvent = page.locator('#E-20251005');
        await expect(calendarEvent).toBeVisible({ timeout: 10000 });
        await calendarEvent.click();

        await page.getByRole('button', { name: `Edited Annually Event Oct 5 - 10, All` }).first().click();
        const loadingButton = page.getByRole('button').filter({ hasText: /^Loading\.\.\.$/ }).nth(3);

        await loadingButton.waitFor({ state: 'visible' });
        await loadingButton.click();

        await page.getByRole('button', { name: 'Delete Event' }).click();
        await page.waitForTimeout(800);
        await expect(page.getByRole('alert').last()).toHaveText(/Event deleted successfully/, { timeout: 10000 });
    });
});

