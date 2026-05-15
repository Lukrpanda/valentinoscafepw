import { Page, expect } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
    await page.getByTestId('login-email-input').fill(email);
    await page.getByTestId('login-password-input').fill(password);
    await page.getByTestId('login-submit-button').click();
}

export async function verifySuccessfulLogin(page: Page) {
    // 1. Verifica que la URL cambie a la página de inicio
    await expect(page).toHaveURL('/');
    
    // 2. ¡LA MAGIA ESTÁ AQUÍ! 
    // Obligamos a Playwright a esperar a que la red se calme y no haya cargas pendientes
    await page.waitForLoadState('networkidle');
    
    // 3. Un pequeño respiro extra de 1 segundo para asegurar que el token se escribió en el Local Storage
    await page.waitForTimeout(1000); 
}