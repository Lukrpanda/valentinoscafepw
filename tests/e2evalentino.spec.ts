import { test, expect } from '@playwright/test';

type DatosPrueba = {
    productosCafe: string;
};

const productos : DatosPrueba[] = [
    { productosCafe: 'Brazilian Santos' },
    { productosCafe: 'Colombian Supreme' },
    { productosCafe: 'Ethiopian Highlands' },
    { productosCafe: 'Guatemalan Volcano' },
    { productosCafe: 'Italian Dark Roast' },
    { productosCafe: 'Jamaican Blue Mountain' }

] 

productos.forEach(({productosCafe}) => { 

test(`imprimir informacion de nombre de producto y precio de: ${productosCafe}`, async ({ page }) => {

    await page.goto('https://valentinos-magic-beans.click/products');

    const cajapadre = page.locator('.p-6').filter({hasText:productosCafe})

    const nombreproducto = await cajapadre.locator('.font-semibold').first().textContent()
    const precio =await cajapadre.locator('.font-bold').first().textContent()

    console.log(nombreproducto,precio)


})

})



