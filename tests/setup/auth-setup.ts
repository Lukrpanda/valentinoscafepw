import { test as setup } from '@playwright/test';
import * as loginPage from '../pages/Login';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const authSessionFile = resolve(__dirname, '../../playwright/.auth/user.json');
const loginDataFile = resolve(__dirname, '../../playwright/.auth/loginData.json');

// Leer el JSON con las credenciales creadas en la prueba de registro
const loginData = JSON.parse(readFileSync(loginDataFile, 'utf-8')) as {
    email: string;
    pass: string;
};

setup('authenticate', async ({ page }) => {
    await page.goto('/login');
    
    await loginPage.login(page, loginData.email, loginData.pass);
    await loginPage.verifySuccessfulLogin(page);

    // Guardar el estado de la sesión (Local Storage/Cookies)
    await page.context().storageState({
        path: authSessionFile
    });
});