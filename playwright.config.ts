import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
     baseURL: 'https://valentinos-magic-beans.click/',
     testIdAttribute: 'data-test-id',
     trace: 'on-first-retry',
  },

  projects: [
    // 1. PRIMERO SE EJECUTA EL SETUP (Sin buscar sesiones previas)
    {
      name: 'auth-setup',
      testMatch: ['**/auth-setup.ts', '**/auth.setup.ts'],
      use: { 
        ...devices['Desktop Chrome']
      },
    },
    // 2. LUEGO SE EJECUTA CHROMIUM (Usando la sesión que guardó el setup)
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json' 
      },
      dependencies: ['auth-setup'],
    }
  ],
});