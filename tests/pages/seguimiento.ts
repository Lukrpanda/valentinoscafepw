import { type Page } from '@playwright/test';


export async function registroseguimiento(page: Page, orderId: string, email: string) {
  await page.getByTestId('contact-order-id-input').fill(orderId);
  await page.getByTestId('contact-email-input').fill(email);
}

export async function darlealseguimiento(page: Page) {
  await page.getByTestId('contact-track-order-button').click();
}


