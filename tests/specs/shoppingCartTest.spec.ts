import { test, expect } from '../fixtures/fixtures'
import { Categories } from '../../enums/categories'
import { ShoppingCartPage } from '../../page-objects/pages/shopping-cart-page'

test('Shopping cart - verify added element', async({page, sidebarPage, categoryPage}) => {
    await sidebarPage.Sidebar.navigateTo(Categories.BOOKS);
    const productDetailsPage = await categoryPage.openFirstProductDetails();

    const productName = await productDetailsPage.getProductName();
    const quantity = await productDetailsPage.getQuantity();
    const price = await productDetailsPage.getPrice();
    const expectedTotalPrice = (Number(quantity) * Number(price)).toFixed(2);

    await productDetailsPage.addProductToCart();
    expect (await productDetailsPage.Header.getShoppingCartIndicatorText()).toEqual("(1)");
    await productDetailsPage.Header.openShoppingCart();

    const shoppingCartPage = new ShoppingCartPage(page);
    const targetTableRow = shoppingCartPage.table.rows.first();

    await shoppingCartPage.expectCartRow(
        targetTableRow, {
            productName,
            price,
            quantity,
            totalPrice: expectedTotalPrice
        }
    )
})

test.describe('Shopping cart (starting from refilled cart)', () => {
    
    // test.beforeEach(async ({page, cartWithProduct}) => {
    //     const shoppingCart = new ShoppingCartPage(page)
    // })

    test('Shopping cart - delete all items', async({cartWithProduct, page}) => {
        const shoppingCart = new ShoppingCartPage(page);
        await shoppingCart.table.removeItemFromTable(shoppingCart.table.rows.first());
        await expect(await shoppingCart.table.rows).toHaveCount(0);
        await expect(await shoppingCart.isEmptyShoppingCartHasPlaceholderText("Your Shopping Cart is empty!")).toBeTruthy();
    })

    test('Shopping cart - change quantity', async({cartWithProduct}) => {
        const targetTableRow = cartWithProduct.table.rows.first();
        const newQuantity = "2";
        const price = await targetTableRow.locator('.product-unit-price').innerText();
        const expectedTotalPrice = (Number(newQuantity) * Number(price)).toFixed(2);
        await cartWithProduct.table.changeQuantity(targetTableRow, newQuantity);

        await expect(targetTableRow.locator('.product-subtotal')).toHaveText(String(expectedTotalPrice));
    })

    test('Shopping cart - add more items', async({app, cartWithProduct, sidebarPage, categoryPage, productDetailsPage}) => {
        const shoppingCart = new ShoppingCartPage(app);
        await shoppingCart.continueShopping();

        await sidebarPage.Sidebar.navigateTo(Categories.APPAREL_SHOES);
        await categoryPage.openFirstProductDetails();

        await productDetailsPage.addProductToCart();
        expect (await productDetailsPage.Header.getShoppingCartIndicatorText()).toEqual("(2)");
        await productDetailsPage.Header.openShoppingCart();

        await expect(await shoppingCart.table.rows).toHaveCount(2);
    })

    test('Shopping cart - cart total table', async({page, cartWithProduct}) => {
        const shoppingCart = new ShoppingCartPage(page);
        const targetTableRow = shoppingCart.table.rows.first();
        const price = await targetTableRow.locator('.product-unit-price').textContent();
        const quantity = await targetTableRow.locator('.qty input').inputValue();
        const totals = await shoppingCart.getCartTotals();
        
        await expect(totals.subTotal).toEqual(Number(price) * Number(quantity));
        await expect(totals.total).toBe(totals.subTotal + totals.tax + totals.shipping);
    })
})