import { test, expect } from '../fixtures/fixtures'
import { UserBuilder } from '../builders/userBuilder'
import { ShoppingCartPage } from '../../page-objects/pages/shopping-cart-page'
import { CheckoutFormPage } from '../../page-objects/pages/checkout-form-page'

test('Order product as guest - happy path', async({cartWithProduct, page, checkoutLoginPage}) => {
    const shoppingCart = new ShoppingCartPage(page);
    const user = new UserBuilder().build();
    await shoppingCart.proceedCheckout();

    await checkoutLoginPage.checkoutAsGuest();

    const checkoutFormPage = new CheckoutFormPage(page);
    await checkoutFormPage.fillCheckoutForm(user);
    await checkoutFormPage.moveThroughTheForm();

    await expect(checkoutFormPage.isNameToBe(user.firstName,user.lastName)).toBeTruthy();
    await expect(checkoutFormPage.isEmailToBe(user.email)).toBeTruthy();
    await expect(checkoutFormPage.isPhoneNumberToBe(user.phoneNumber)).toBeTruthy();
    await expect(checkoutFormPage.isAddressToBe(user.address.firstAddress)).toBeTruthy();
    await expect(checkoutFormPage.isCityStateZipToBe(user.address.city,user.address.zipCode)).toBeTruthy();
    await expect(checkoutFormPage.isCountryToBe(user.address.country)).toBeTruthy();
})