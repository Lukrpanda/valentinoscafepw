import {test,Page,expect} from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });


const mockproductos = {

    success: true,
    source: 'dynamodb',
    data: [
        {
            
            name: 'pulseras de piedras colombia',
            price: 3500.00,
            id: '0'
        
        },
        {
            
            name: 'llama de peluche',
            price: 28000.00,
          
            id: '1'
        
        },
        {
           name: 'cuy peluche',
           price: 23000.00,
            
            id: '2'
           
        }

]

}


test('interceptar la data productos cafe', async ({page})=>{


    await page.route('https://api.valentinos-magic-beans.click/products', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockproductos),
        });
    })

       await page.goto('/products')

    await page.waitForLoadState('networkidle')

    await page.locator('[data-test-id="product-card-add-to-cart-button-0"]').click()

    await page.getByTestId('header-cart-button').click()

    const nombreaverificar = page.getByRole('heading', { name: mockproductos.data[0].name })

    await expect(nombreaverificar).toBeVisible()



        })


    test('bloquear las imagenes de la peticion', async ({page}) => {



        await page.route('**/*',(route)=>{

            if (route.request().resourceType() === 'image'){

                route.abort()
            }

            return route.continue()
        })


        await page.waitForLoadState('networkidle')
    })


   



