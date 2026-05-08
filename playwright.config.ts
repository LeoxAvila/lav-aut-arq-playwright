import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60_000,
  retries: 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['list'],
    ['allure-playwright', {
      detail: true,
      resultsDir: 'allure-results',
      suiteTitle: false,
    }],
  ],
  use: {
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'e2e',
      testDir: './tests/simulador-credito',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.pichincha.com',
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1440, height: 900 },
        screenshot: 'only-on-failure',
        video: 'on',
        trace: 'on',
        actionTimeout: 15_000,
        navigationTimeout: 60_000,
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-web-security',
          ],
        },
        extraHTTPHeaders: {
          'Accept-Language': 'es-EC,es;q=0.9',
        },
      },
    },
    {
      name: 'api',
      testDir: './tests/fake-store',
      use: {
        baseURL: 'https://fakestoreapi.com',
      },
    },
  ],
  outputDir: 'reports/artifacts',
});
