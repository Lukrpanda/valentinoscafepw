import { Page } from '@playwright/test';


  export const valoresis = {

    nombres : 'someFirstName',
    apellidos : 'someLastName',
    clave :  '1234567zxcGJr!'

  }

  export async function iniciarsesion(page:Page , email: string ){

    await page.getByTestId('signup-firstname-input').fill(valoresis.nombres)
    await page.getByTestId('signup-lastname-input').fill(valoresis.apellidos)
    await page.getByTestId('signup-email-input').fill(email)
    await page.getByTestId('signup-password-input').fill(valoresis.clave)
    await page.getByTestId('signup-submit-button').click()

  }

  export async function codigoconfirmacion(page:Page , codigo: string){

    await page.locator('//input[@inputmode="numeric"]').fill(codigo)
    await page.getByTestId('confirm-signup-submit-button').click()

  }