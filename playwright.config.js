// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Public demo services can be slow, so CI gets one retry.
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://www.saucedemo.com' },
    },
    {
      name: 'ui-mobile',
      testDir: './tests/ui',
      grep: /@smoke/,
      use: { ...devices['Pixel 7'], baseURL: 'https://www.saucedemo.com' },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
