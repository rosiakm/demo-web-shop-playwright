import { Page } from "@playwright/test"

type AddProductConfig = {
    productId: number,
    taget: 'cart' | 'wishlist'
    form: Record<string, any>
}

export async function addProduct(page: Page, config: AddProductConfig) {
    const targetId = config.taget === 'cart' ? 1 : 2;

    await page.request.post(
        `/addproducttocart/details/${config.productId}/${targetId}`, 
        { form: config.form });
}

