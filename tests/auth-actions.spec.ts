import { test, expect } from '@playwright/test';

test('verificar que el usuario ya entra logueado', async ({ page }) => {
    await page.goto('/');
    
    // ¡CONGELAMOS LA PANTALLA AQUÍ!
    await page.pause();
    
    const welcomeMessage = page.getByText('someFirstName');
    await expect(welcomeMessage).toBeVisible();
});