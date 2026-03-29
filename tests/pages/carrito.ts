import { expect,  Page } from '@playwright/test';


export async function verificarcarrito(page:Page , nombreProducto: string){


        const nombreProductoCarrito = page.getByRole('heading', { name: nombreProducto })
        await expect(nombreProductoCarrito).toBeVisible()


}


export async function verificarpreciocarrito(page:Page){

const subtotalw = page.getByText('Subtotal').locator('..').locator('.font-semibold') 
    const subtotal = await subtotalw.textContent()
   return Number(subtotal?.substring(1))

}