import { test } from '@playwright/test';
import { mibandejadeentrada } from './utils/EmailUtils';
import * as iniciarsesion from './pages/iniciosesion';
import { login, verifySuccessfulLogin } from './pages/Login';
import { join, resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

// ESTA LÍNEA ES OBLIGATORIA: Evita que esta prueba intente usar el user.json
test.use({ storageState: { cookies: [], origins: [] } });

// Esta variable controla si ejecutamos o no el registro
const testSignUp = process.env.SIGN_UP_FLOW;

test('inicio de sesion', async ({ page }) => {
    // Si SIGN_UP_FLOW no es 'true', salta esta prueba
    test.skip(testSignUp !== 'true', 'Saltando prueba de registro para ahorrar MailSlurp');

    const bandeja = new mibandejadeentrada();
    const inbox = await bandeja.creandoInbox();

    await page.goto('/signup');

    await iniciarsesion.iniciarsesion(page, inbox.emailAddress);

    const email = await bandeja.obtenerEmail(inbox.id);
    console.log(email);

    const code = /([0-9]{6})$/.exec(email?.body!)![1];

    await iniciarsesion.codigoconfirmacion(page, code);

    // Iniciar sesión con los datos recién creados
    await login(page, inbox.emailAddress, iniciarsesion.valoresis.clave);
    
    // Verificar que el login fue exitoso antes de guardar
    await verifySuccessfulLogin(page);

    // --- GUARDAR CREDENCIALES ---
    const loginData = {
        email: inbox.emailAddress,
        pass: iniciarsesion.valoresis.clave
    };

    const authDir = resolve(__dirname, '../playwright/.auth');
    if (!existsSync(authDir)) {
        mkdirSync(authDir, { recursive: true });
    }

    writeFileSync(
        join(authDir, 'loginData.json'),
        JSON.stringify(loginData, null, 2)
    );
}); 