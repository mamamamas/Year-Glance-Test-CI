import { test as base } from '@playwright/test';

type Fixture = {
  baseUrl: string;
};

// Extend the base test with your custom fixture
export const test = base.extend<Fixture>({
  baseUrl: async ({}, use) => {
    const url = 'https://staging-v2.yearglance.com/';
    console.log("Setting up baseUrl...");
    await use(url);
    console.log("Test finished"); 
  },
});
