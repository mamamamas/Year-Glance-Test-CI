import { expect } from '@playwright/test'; // runtime import
import type { Page } from '@playwright/test'; // type-only import


export type EventData = {
  eventName: string;
  description: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  repeat?: string;
};

export type ValidateEventData = EventData &{
  newName: string;
};

export async function switchView(
  page: Page,
  current: string,
  next: string
): Promise<void> {
  await page.getByRole('button', { name: current }).first().click();
  const option = page.getByRole('menuitem', { name: next });
  await expect(option).toBeVisible();
  await option.click();
}

export async function addMultiDayEvent(page: Page, data: EventData): Promise<void> {
  const { eventName, description, startDate, endDate, allDay } = data;

  const addEventBtn = page.locator('button.btn-add-event');
  await addEventBtn.waitFor({ state: 'visible', timeout: 10000 });
  await addEventBtn.click();

  await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

  if (allDay) {
    await page.getByLabel('All Day').click();
  }

  await page.locator('.has-icon').first().click();
  await page.getByRole('option', { name: `Choose ${startDate}` }).click();

  await page
    .locator('div:nth-child(3) .react-datepicker__input-container .has-icon')
    .click();
  await page.getByRole('option', { name: `Choose ${endDate}` }).click();

  await page.click('#input-calendar > button');
  await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();

  await page.locator('#dropdown-category').getByRole('button').click();
  const categoryOption = page.locator(
    '.dropdown-menu.show > div > button:nth-child(6)'
  );
  await expect(categoryOption).toBeVisible({ timeout: 5000 });
  await categoryOption.click();

  await page.click('#input-sub-calendar > button');
  await page
    .getByRole('menuitem', { name: 'Main Test Calendat' })
    .click();

  await page.getByText('Add guestsGuests').click();
  await page
    .getByRole('textbox', { name: 'Add guests' })
    .fill('jennydurana@gmail.com');

  await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');
  await page.getByRole('textbox', { name: 'Description' }).fill(description);

  await page.getByRole('button', { name: 'Create Event' }).click();
  await page.waitForTimeout(800);
  await expect(page.getByRole('alert').last()).toHaveText(
    /Event created successfully/,
    { timeout: 10000 }
  );
}

export async function validateMultiDayEvent(
  page: Page,
  data: Pick<EventData, 'eventName' | 'description'>
): Promise<void> {
  const { eventName, description } = data;

  const calendarEvent = page.locator('#E-20251004');
  await expect(calendarEvent).toBeVisible({ timeout: 10000 });
  await calendarEvent.click();
  await page.waitForTimeout(5000);

  await page
    .getByRole('button', { name: new RegExp(eventName) })
    .last()
    .click({ timeout: 30000 });

  const modal = page.locator('#view-event-modal');
  await expect(modal).toContainText(eventName);
  await expect(modal).toContainText(description);
}

export async function EditMultiEvent(
  page: Page,
  data: ValidateEventData
): Promise<void> {
  const { eventName, description, newName, startDate, endDate, allDay } = data;

  const calendarEvent = page.locator('#E-20251004');
  await expect(calendarEvent).toBeVisible({ timeout: 10000 });
  await calendarEvent.click();

  await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
  await page.waitForTimeout(5000);

  await page
    .locator('#view-event-modal')
    .getByRole('button')
    .filter({ hasText: 'Loading...' })
    .first()
    .click();

  const nameInput = page.getByRole('textbox', { name: 'Name' });
  await nameInput.click();
  await nameInput.fill('');
  await nameInput.fill(newName);

  if (allDay) {
    await page.getByLabel('All Day').click();
  }

  await page.locator('.has-icon').first().click();
  await page.getByRole('option', { name: `Choose ${startDate}` }).click();

  await page
    .locator(
      'div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon'
    )
    .click();
  await page.getByRole('option', { name: `Choose ${endDate}` }).click();

  await page.getByRole('button', { name: 'Update Event' }).click();
  await expect(page.getByText('Event updated successfully')).toBeVisible();
  await page.waitForTimeout(5000);
}

export async function validateMultiEvent(
  page: Page,
  data: ValidateEventData
): Promise<void> {
  const { newName, description } = data;

  await page.waitForTimeout(15000);
  const calendarEvent = page.locator('#E-20251006');
  await expect(calendarEvent).toBeVisible({ timeout: 10000 });
  await calendarEvent.click();

  await page.getByRole('button', { name: new RegExp(newName) }).last().click();

  const modal = page.locator('#view-event-modal');
  await expect(modal).toContainText(newName);
  await expect(modal).toContainText(description);
}

// ALL DAY EVENTS
export async function addAllDayEvent(page : Page, data: EventData): Promise<void> {

    const { eventName, description, startDate, allDay } = data;
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
        // await page.getByRole('checkbox', { name: 'All Day' }).check();
    }

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();

    // Category
    await page.locator('#dropdown-category').getByRole('button').click();
    const categoryOption = page.locator('.dropdown-menu.show > div > button:nth-child(6)');
    await expect(categoryOption).toBeVisible({ timeout: 5000 });
    await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();
    // await page.getByRole('button', { name: '2nd Test Calendar', exact: true }).click();
    // await page.getByRole('menuitem', { name: '2nd Test Calendar' }).click();

    // // Guests
    // await page.getByText('Add guestsGuests').click();
    // await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');

    // const dropdownOption = page.getByRole('menuitem', { name: /^Cavallino/ });
    // await dropdownOption.scrollIntoViewIfNeeded();
    // await dropdownOption.click();


    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });


}

export async function validateAllDayEvent(page: Page, data: Pick<EventData, 'eventName' | 'description'>): Promise<void> {
    const { eventName, description } = data;
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20251004');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(eventName) })
        .last()
        .click({ timeout: 30000 });

    // await page.getByRole('button', { name: `${eventName} Sep 4, All` }, { timeout: 30000 }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(eventName, { timeout: 10000 });
    await expect(modal).toContainText(description);
    // await expect(modal).toContainText('Sep 4, All');
}

export async function EditAllDayEvent(page : Page, { eventName, newName, startDate }: { eventName: string, newName: string, startDate: string }) {
    const calendarEvent = page.locator('#E-20251004');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();
    await page.waitForTimeout(2000);
    // Open event details
    await page.getByRole('button', { name: new RegExp(eventName) }).last().click();
    await page.waitForTimeout(3000);
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    await page.getByLabel("All Day").check()


    await page.getByRole('button', { name: 'Update Event' }).click();
    await page.waitForTimeout(3000);
    // Assert success message
    await expect(page.getByText('Event updated successfully')).toBeVisible();
    await page.waitForTimeout(5000);
}
export async function validateEditedAllDayEvent(page: Page, data: ValidateEventData): Promise<void> {
    const { description, newName } = data;
    // Wait until the event appears
    const calendarEvent = page.locator('#E-20251005');
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });
    await calendarEvent.click();

    // Open event details
    await page.getByRole('button', { name: new RegExp(newName) }).last().click();
    // await page.getByRole('button', { name: `${newName} Sep 5 - 6, All` }).first().click();

    // Validate details
    const modal = page.locator('#view-event-modal');
    await expect(modal).toContainText(newName);
    await expect(modal).toContainText(description);
    // await expect(modal).toContainText('Sep 4, All');
}

// Recurring Events
export async function addReccurringEvent(page: Page, data: EventData): Promise<void> {
    const { eventName, description, startDate, endDate, allDay, repeat } = data;
    // Open "Add Event"
    const addEventBtn = page.locator('button.btn-add-event');
    await addEventBtn.waitFor({ state: 'visible' });
    await addEventBtn.click();

    // Fill Event Name
    await page.getByRole('textbox', { name: 'Name' }).fill(eventName);

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").click()
    }

    // Select Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // Select End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Repeat
    await page.getByRole('button', { name: 'Does not Repeat' }).click();
    await page.getByRole('menuitem', { name: repeat }).click();

    // Organizer
    await page.click("#input-calendar > button");
    await page.getByRole('menuitem', { name: /jennydurana@gmail.com/ }).click();
    // await page.click("#input-calendar > button");
    // await page.getByRole('menuitem', { name: /markchristiandurana75@gmail/ }).click();

    // Category
    // await page.locator('#dropdown-category').getByRole('button').click();
    // const categoryOption = page.getByRole('menuitem', { name: 'Purple category' });
    // await expect(categoryOption).toBeVisible();
    // await categoryOption.click();

    // Calendar
    await page.click("#input-sub-calendar > button")
    await page.getByRole('menuitem', { name: 'Main Test Calendat' }).click();

    // Guests
    await page.getByText('Add guestsGuests').click();
    await page.getByRole('textbox', { name: 'Add guests' }).fill('jennydurana@gmail.com');

    await page.getByRole('textbox', { name: 'Add location' }).fill('Cav');

    // const dropdownOption = page.getByRole('menuitem', { name: /^Cavallino/ });
    // await dropdownOption.scrollIntoViewIfNeeded();
    // await dropdownOption.click();



    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Submit
    await page.getByRole('button', { name: 'Create Event' }).click();
    await page.waitForTimeout(800);
    // Assert success message
    await expect(page.getByRole('alert').last()).toHaveText(/Event created successfully/, { timeout: 10000 });
    await page.waitForTimeout(800);

}

export async function EditReccurringEvent(page: Page, data: ValidateEventData): Promise<void> {
    const { eventName, newName, startDate, endDate, allDay, description } = data;
    const calendarEvent = page.locator('[aria-label="E-20251004"]'); 

    // Wait for the calendar event to be visible
    await expect(calendarEvent).toBeVisible({ timeout: 10000 });

    // Retry logic starts here
    const maxRetries = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxRetries && !success) {
        try {
            // Click the calendar event
            await calendarEvent.click();
            await page.waitForTimeout(2000); // Slight wait to allow UI to respond

            // Try clicking the event details button
            const detailsButton = page.getByRole('button', {
                name: `${eventName} Oct 4 - 5, All`,
            }).first();

            await detailsButton.waitFor({ timeout: 2000 }); // Wait for it to appear
            await detailsButton.click();

            // Success!
            success = true;
        } catch (error) {
            attempt++;
            console.warn(`Attempt ${attempt} failed to open event details. Retrying...`);
            if (attempt >= maxRetries) {
                throw new Error(`Failed to open event details for "${eventName}" after ${maxRetries} attempts.`);
            }
            await page.waitForTimeout(1000); // Wait before retrying
        }
    }

    await page.waitForTimeout(3000);

    // Edit event name
    await page.locator('#view-event-modal').getByRole('button').filter({ hasText: 'Loading...' }).first().click();
    await page.waitForTimeout(3000);
    await page.getByRole('textbox', { name: 'Name' }).fill('');
    await page.getByRole('textbox', { name: 'Name' }).fill(newName);

    // All Day
    if (allDay) {
        await page.getByLabel("All Day").check();
    }

    // Start Date
    await page.locator('.has-icon').first().click();
    await page.getByRole('option', { name: `Choose ${startDate}` }).click();

    // End Date
    await page.locator('div:nth-child(3) > .react-datepicker-wrapper > .react-datepicker__input-container > .has-icon').click();
    await page.getByRole('option', { name: `Choose ${endDate}` }).click();

    // Description
    await page.getByRole('textbox', { name: 'Description' }).fill(description);

    // Update Event
    await page.getByRole('button', { name: 'Update Event' }).click();
    await page.waitForTimeout(800);

    // Assert success
    await expect(page.getByText('Event updated successfully')).toBeVisible();
}
