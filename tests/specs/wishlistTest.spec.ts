import { test, expect } from '../fixtures/fixtures'
import { Categories } from '../../enums/categories'
import { ShoppingCartPage } from '../../page-objects/pages/shopping-cart-page'
import { WishlistPage } from '../../page-objects/pages/wishlist-page'

test('Wishlist - add product to wishlist', async({ 
    page,  
    sidebarPage, 
    categoryPage, 
    productDetailsPage 
}) => {

    await sidebarPage.Sidebar.navigateTo(Categories.APPAREL_SHOES);
    await categoryPage.openProductDetailsByName("Blue and green Sneaker");

    const productName = await productDetailsPage.getProductName();
    const size = await productDetailsPage.getSize();
    const color = await productDetailsPage.getColor();
    const quantity = await productDetailsPage.getQuantity();
    const price = await productDetailsPage.getPrice();
    const expectedTotalPrice = (Number(quantity) * Number(price)).toFixed(2);

    await productDetailsPage.addProductToWishlist();
    await expect (productDetailsPage.Header.getWishlistCartIndicatorText()).toEqual("(1)")
    await productDetailsPage.Header.openWhishlist();

    const wishlistPage = new WishlistPage(page);
    const targetTableRow = wishlistPage.table.rows.first();

    await wishlistPage.expectProductRow(targetTableRow, {
        productName,
        size,
        color,
        price,
        quantity,
        totalPrice: expectedTotalPrice
    })
})

test('Wishlist - delete all items', async({wishlistWithProduct, page}) => {
    const wishlist = new WishlistPage(page);
    await wishlist.table.removeItemFromTable(wishlist.table.rows.first());
    await expect(wishlist.table.rows).toHaveCount(0);
    await expect(wishlist.isEmptyWishlistHasPlaceholderText("The wishlist is empty!")).toBeTruthy();
})

test('Whishlist - change quantity', async({wishlistWithProduct, page}) => {
    const wishlist = new WishlistPage(page);
    const targetTableRow = wishlist.table.rows.first();
    const newQuantity = "2";
    const price = await targetTableRow.locator('.product-unit-price').innerText();
    const expectedTotalPrice = (Number(newQuantity) * Number(price)).toFixed(2);
    await wishlist.table.changeQuantity(targetTableRow, newQuantity);

    await expect(targetTableRow.locator('.product-subtotal')).toHaveText(String(expectedTotalPrice));
})

test('Wishlist - add product to cart', async({wishlistWithProduct, page}) => {
    const wishlist = new WishlistPage(page);
    
    await expect (wishlist.Header.getShoppingCartIndicatorText()).toEqual('(0)');
    await expect (wishlist.Header.getWishlistCartIndicatorText()).toEqual('(1)');
    
    const productName = await wishlist.table.rows.first().locator('.product a').innerText();
    await wishlist.addProductToCart(wishlist.table.rows.first());

    const shoppingCart = new ShoppingCartPage(page);
    await expect (wishlist.Header.getShoppingCartIndicatorText()).toEqual('(1)');
    await expect (wishlist.Header.getWishlistCartIndicatorText()).toEqual('(0)');
    await expect(shoppingCart.table.rows.first().locator('.product a[class="product-name"]')).toHaveText(productName);
})