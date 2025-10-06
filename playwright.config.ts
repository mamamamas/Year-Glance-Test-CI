import { defineConfig, devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

// Optional: dotenv setup (uncomment if using .env variables)
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Set to 4 or more for CI if needed

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'results.json' }],
    // ['allure-playwright'], // Uncomment if installed
    ['github'],
  ],

  timeout: 45_000,

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'behind-login',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/login.json',
      },
      dependencies: ['setup'],
      testIgnore: [
        '**/RegisterPageTest.spec.ts',
        '**/GoogleLogin.spec.ts',
        '**/InvalidLogin.spec.ts',
      ],
    },
    {
      name: 'public',
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
      testMatch: [
        '**/RegisterPageTest.spec.ts',
        '**/GoogleLogin.spec.ts',
        '**/InvalidLogin.spec.ts',
      ],
    },
  ],

  // Optional: Dev server
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export default config;
