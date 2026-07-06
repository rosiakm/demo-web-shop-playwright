import { Locator } from "@playwright/test";
import { SidebarPage } from "./sidebar-page";
import { BaseObject } from "../base-object";
import { Textbox } from "../textbox";

export class ProductDetailsPage extends SidebarPage{
    public override readonly baseLocator: Locator = this.page.locator(".overview");
    public productName: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".product-name h1")});
    public productDescription: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".short-description")});
    public availabilityValue: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".stock .value")});
    public reviewsLink: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".product-review-links a:has(+span)")});
    public addReviewLink: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".product-review-links span +a")});
    public priceValue: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".product-price span")});
    public quantityInput: Textbox = new Textbox(this.page, {baseLocator: this.baseLocator.locator(".qty-input")});
    public addToCartButton: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.getByRole("button", {name:"Add to cart"})});
    public addToWishlistButton: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.getByRole("button", {name: "Add to wishlist"})});
    public colorButton: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator(".color-squares .selected-value .color-container")});
    private readonly sizeSelect: Locator = this.page.locator('select option:checked');

    async addProductToCart(): Promise<void>{
        await this.addToCartButton.click();
    }

    async addProductToWishlist(): Promise<void>{
        await this.addToWishlistButton.click();
    }

    async getStockStatus(): Promise<string>{
        return String(await this.availabilityValue.getText());
    }

    async getProductName(): Promise<string>{
        return String(await this.productName.getText());
    }

    async getQuantity(): Promise<string>{
        return String(await this.quantityInput.getText());
    }

    async getPrice(): Promise<string>{
        return String(await this.priceValue.getText());
    }

    async getSize(): Promise<string>{
        return String(await this.sizeSelect.innerText()).trim();
    }

    async getColor(): Promise<string>{
        return String(await this.colorButton.getAttribute('title') ?? '');
    }

    async isProductNameVisible(): Promise<boolean>{
        return await this.productName.isVisible();
    }

    async isProductDescriptionVisible(): Promise<boolean>{
        return await this.productDescription.isVisible();
    }

    async isPriceValueVisible(): Promise<boolean>{
        return await this.priceValue.isVisible();
    }

    async isAddToCartButtonVisible(): Promise<boolean>{
        return await this.addToCartButton.isVisible();
    }
}