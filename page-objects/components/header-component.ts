import { BaseObject } from "../base-object";
import { Locator } from "@playwright/test";

export class HeaderComponent extends BaseObject{
    private readonly loginOption: Locator = this.page.locator('.header-links a',{hasText:'Log in'});
    private readonly logoutOption: Locator = this.page.locator('.header-links a',{hasText:'Log out'});
    private readonly accountNameOption: Locator = this.page.locator('.header-links').locator('.account');
    private readonly registerOption: Locator = this.page.locator('.header-links a',{hasText:'Register'});
    private readonly shoppingCartOption: Locator = this.page.locator('.header-links a',{hasText: "Shopping cart"});
    private readonly shoppingCartIndicator: Locator = this.shoppingCartOption.locator(".cart-qty");
    private readonly wishlistOption: Locator = this.page.locator('.header-links a',{hasText:'Wishlist'});
    private readonly wishlistOptionIndicator: Locator = this.wishlistOption.locator(".wishlist-qty");
    private readonly searchInput: Locator = this.page.locator('#small-searchterms');
    private readonly searchButton: Locator = this.page.getByRole('button',{name: 'Search'});

    async openLoginPage(): Promise<void>{
        await this.loginOption.click();
    }

    async openRegisterPage(): Promise<void>{
        await this.registerOption.waitFor({state: 'visible'});
        await this.registerOption.click();
    }

    async openShoppingCart(): Promise<void>{
        await this.shoppingCartOption.click();
    }

    async openWhishlist(): Promise<void>{
        await this.wishlistOption.click();
    }

    async logoutUser(): Promise<void>{
        await this.logoutOption.click();
    }

    async isAccountNameOptionHasName(name: string): Promise<boolean>{
        return (await this.accountNameOption.innerText())?.trim() === name;
    }

    async isAccontNameOptionVisible(): Promise<boolean>{
        return await this.accountNameOption.isVisible();
    }

    async isLoginOptionVisible(): Promise<boolean>{
        return await this.loginOption.isVisible();
    }

    async getShoppingCartIndicatorText(): Promise<string>{
        return (await this.shoppingCartIndicator.innerText())?.trim();
    }

    async getWishlistCartIndicatorText(): Promise<string>{
        return (await this.wishlistOptionIndicator.innerText())?.trim();
    }
}