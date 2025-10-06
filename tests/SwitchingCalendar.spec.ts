import { expect } from '@playwright/test';
import { test } from '../Fixture.js'; // Assuming Fixture.ts exports an extended test with baseUrl

// test with baseUrl fixture from ../Fixture.ts
test('Switching Calendar', async ({ page, baseUrl }) => {

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/Year Glance App/);
  const backdrop = page.locator('.offcanvas-backdrop');
  if (await backdrop.isVisible()) {
    await backdrop.click();
  }

  const calendars: Record<string, string> = {
    personal: '94d7a667-ca67-4d74-80ce-baddea26e87f',
    work: '9d95b1a1-e116-4505-bd1f-3563cf8eacb0',
    school: '5b351485-397c-407f-aea7-d8cef08bd290',
    events: 'c88615bb-11de-47ee-8337-b5d1893e5b95',
    holidays: '564fe93c-e314-4d1f-964c-1c41c560cb21',
  };

  const toggleCalendar = async (
    id: string,
    action: 'check' | 'uncheck'
  ): Promise<void> => {
    const input = page.locator(`input[name="${id}"]`);
    if (action === 'check') {
      await input.check();
      await expect(input).toBeChecked();
    } else {
      await input.uncheck();
      await expect(input).not.toBeChecked();
    }
  };

  await toggleCalendar(calendars.personal, 'uncheck');
  await toggleCalendar(calendars.work, 'check');
  await toggleCalendar(calendars.school, 'check');
  await toggleCalendar(calendars.work, 'uncheck');
  await toggleCalendar(calendars.school, 'uncheck');
  await toggleCalendar(calendars.events, 'check');
  await toggleCalendar(calendars.holidays, 'check');
  await toggleCalendar(calendars.events, 'uncheck');
  await toggleCalendar(calendars.holidays, 'uncheck');
  await toggleCalendar(calendars.personal, 'check');
  await toggleCalendar(calendars.work, 'check');
  await toggleCalendar(calendars.personal, 'uncheck');
});
