import {test} from '@playwright/test'
import {mibandejadeentrada} from './utils/EmailUtils'
import * as iniciarsesion from './pages/iniciosesion'
import { login } from './pages/Login'

test('inicio de sesion', async ({page}) => {

    const bandeja = new mibandejadeentrada();

    const inbox = await bandeja.creandoInbox()


    await page.goto('/signup')

    await iniciarsesion.iniciarsesion(page, inbox.emailAddress)

    const email = await bandeja.obtenerEmail(inbox.id)
    console.log(email)

    const code = /([0-9]{6})$/.exec(email?.body!)![1]

    await iniciarsesion.codigoconfirmacion(page, code)

    await login(page, inbox.emailAddress,iniciarsesion.valoresis.clave)

    


})