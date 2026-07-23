import { Locator } from "@playwright/test";
import { SidebarPage } from "./sidebar-page";

export class ProductDetailsPage extends SidebarPage{
    public override readonly baseLocator: Locator = this.page.locator(".overview");
    private readonly productName: Locator = this.page.locator(".product-name")
    private readonly productDescription: Locator = this.page.locator(".short-description");
    private readonly availabilityValue: Locator = this.page.locator(".stock .value");
    private readonly reviewsLink: Locator = this.page.locator(".product-review-links a:has(+span)");
    private readonly addReviewLink: Locator = this.page.locator(".product-review-links span +a");
    private readonly priceValue: Locator = this.page.locator(".product-price span");
    private readonly quantityInput: Locator = this.page.locator(".qty-input");
    private readonly addToCartButton: Locator = this.page.getByRole("button", {name: "Add to cart"});
    private readonly addToWishlistButton: Locator = this.page.getByRole("button", {name: "Add to wishlist"});
    private readonly colorButton: Locator = this.page.locator(".color-squares .selected-value .color-container");
    private readonly sizeSelect: Locator = this.page.locator('select option:checked');

    async addProductToCart(): Promise<void>{
        await this.addToCartButton.click();
    }

    async addProductToWishlist(): Promise<void>{
        await this.addToWishlistButton.click();
    }

    async openReviewsLink(): Promise<void>{
        await this.reviewsLink.click();
    }

    async openAddReviewLink(): Promise<void>{
        await this.addReviewLink.click();
    }

    async getStockStatus(): Promise<string>{
        return String(await this.availabilityValue.innerText());
    }

    async getProductName(): Promise<string>{
        return String(await this.productName.innerText());
    }

    async getQuantity(): Promise<string>{
        return String(await this.quantityInput.innerText());
    }

    async getPrice(): Promise<string>{
        return String(await this.priceValue.innerText());
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