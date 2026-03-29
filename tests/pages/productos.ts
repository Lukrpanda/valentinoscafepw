import { type Page } from '@playwright/test';

export async function agregarproductoscualquiera(page:Page,index: number){


    const cajapadre = page.locator('.p-6').nth(index)

    const nombreproducto = await cajapadre.locator('.font-semibold').first().textContent()
    const precio =await cajapadre.locator('.font-bold').first().textContent()


    const botonAgregar = cajapadre.getByRole('button', { name: 'Add to Cart' });
    await botonAgregar.click();

    
    
    return {

        nombre: nombreproducto,
        precio : Number(precio?.substring(1))
    }

}


