import { test as base, Page, request } from '@playwright/test'
import { HomePage } from '../../page-objects/pages/home-page'
import { SidebarPage } from '../../page-objects/pages/sidebar-page'
import { RegisterPage } from '../../page-objects/pages/register-page'
import { LoginPage } from '../../page-objects/pages/login-page'
import { CategoryPage } from '../../page-objects/pages/category-page'
import { ShoppingCartPage } from '../../page-objects/pages/shopping-cart-page'
import { ProductDetailsPage } from '../../page-objects/pages/product-details-page'
import { WishlistPage } from '../../page-objects/pages/wishlist-page'
import { addProduct } from '../helpers/addProductAPI'
import { products } from '../data/products'
import { CheckoutLoginPage } from '../../page-objects/pages/checkout-login-page'

type MyFixtures = {
    homePage: HomePage;
    sidebarPage: SidebarPage;
    registerPage: RegisterPage;
    loginPage: LoginPage;
    checkoutLoginPage: CheckoutLoginPage;
    categoryPage: CategoryPage;
    productDetailsPage: ProductDetailsPage;
    cartWithProduct: ShoppingCartPage;
    wishlistWithProduct: WishlistPage;
    loggedInUser: SidebarPage;
}

export const test = base.extend<MyFixtures & {app:Page}>({
    app: [async ({ page }, use) => {
        await page.goto('/');
        await page.locator('.header-links').waitFor();
        await use(page);
    }, { auto: true}],

    homePage: async({page}, use) => {
        await use(new HomePage(page))
    },

    sidebarPage: async({page}, use) => {
        await use(new SidebarPage(page));
    },

    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },

    checkoutLoginPage: async ({page}, use) => {
        await use(new CheckoutLoginPage(page));
    },

    registerPage: async ({page}, use) => {
        await use(new RegisterPage(page));
    },

    categoryPage: async ({page}, use) => {
        await use(new CategoryPage(page));
    },

    productDetailsPage: async({page}, use) => {
        await use(new ProductDetailsPage(page));
    },

    loggedInUser: async({page}, use) => {
        await page.request.post('/login', {
            data: {
                Email: process.env.EMAIL!,
                Password: process.env.PASSWORD!,
                RememberMe: false
            }
        })
        await use(new SidebarPage(page));
    },

    cartWithProduct: async({ page }, use) => {
        await addProduct( page, {
            productId: products.book.id,
            taget: 'cart',
            form: products.book.form
        });

        await page.goto('/cart');
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },

    wishlistWithProduct: async({ page }, use) => {
        await addProduct( page, {
            productId: products.sneaker.id,
            taget: 'wishlist',
            form: products.sneaker.form
        });
        await page.goto('/wishlist');
        const wishlistPage = new WishlistPage(page);
        await use(wishlistPage);
    }
})

export { expect } from '@playwright/test';