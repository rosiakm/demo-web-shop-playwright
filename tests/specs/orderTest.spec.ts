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

    expect(await checkoutFormPage.isNameToBe(user.firstName,user.lastName)).toBeTruthy();
    expect(await checkoutFormPage.isEmailToBe(user.email)).toBeTruthy();
    expect(await checkoutFormPage.isPhoneNumberToBe(user.phoneNumber)).toBeTruthy();
    expect(await checkoutFormPage.isAddressToBe(user.address.firstAddress)).toBeTruthy();
    expect(await checkoutFormPage.isCityStateZipToBe(user.address.city,user.address.zipCode)).toBeTruthy();
    expect(await checkoutFormPage.isCountryToBe(user.address.country)).toBeTruthy();
})