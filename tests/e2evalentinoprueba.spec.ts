import { test, expect } from '@playwright/test';
import * as productos from './pages/productos'
import * as carrito from './pages/carrito' 
import * as pagos from './pages/pagos'
import * as contact from './pages/seguimiento'


test(`imprimir informacion de nombre de producto y precio `, async ({ page }) => {

    await page.goto('https://valentinos-magic-beans.click/products');

    const agregoloquemegusta = await productos.agregarproductoscualquiera(page, 1)

    const botonCarrito = page.locator('[data-test-id="header-cart-button"]').getByRole('button');
    await botonCarrito.click();

    await carrito.verificarcarrito(page, agregoloquemegusta.nombre!)

    const preciocarrito = await carrito.verificarpreciocarrito(page)

    expect(preciocarrito).toBe(agregoloquemegusta.precio)


    


    })

test('compra flujo completo e2e valentino ', async ({ page }) => {

 await page.goto('https://valentinos-magic-beans.click/products');

   let agregoloquemegusta : Awaited<ReturnType<typeof productos.agregarproductoscualquiera>> = {} as any
 
    await test.step('agregamos producto que queremos', async ()=>{

        agregoloquemegusta = await productos.agregarproductoscualquiera(page, 1)
    })
    
    await test.step('ir al checkout', async  ()=>{

        const botonCarrito = page.locator('[data-test-id="header-cart-button"]').getByRole('button');
    await botonCarrito.click();
    await page.locator('[data-test-id="proceed-to-checkout"]').click()
    })

    

    // await carrito.verificarcarrito(page, agregoloquemegusta.nombre!)

    // const preciocarrito = await carrito.verificarpreciocarrito(page)

    // expect(preciocarrito).toBe(agregoloquemegusta.precio)

    await test.step('completar informacion de checkout', async ()=>{

            await pagos.infocontacto(page)
    await pagos.direccionenvio(page)
    await pagos.infopago(page)
    await pagos.finalizarcompra(page)

    })

    let norderexacto : string | null 

    await test.step('obtener el id del seguimiento', async ()=>{

          const norder = page.getByText('Your Order ID is:').locator('..')
       norderexacto = await norder.getByRole('paragraph').nth(1).textContent()

    await page.getByRole('button', { name: 'Track Your Order' }).click();
    })


    test.step('registrar el seguimiento', async ()=>{

         await contact.registroseguimiento(page, norderexacto!, pagos.testValues.email)
   await contact.darlealseguimiento(page)


    })

    

// check if ordered item is returned:
const firstOrder = page.getByText(agregoloquemegusta.nombre!)
await expect(firstOrder).toBeVisible()








})

   


