import { BasePage } from "./base-page";
import { expect, Locator } from "@playwright/test";
import { ProductTableComponent } from "../../page-objects/components/product-table-component";

export class WishlistPage extends BasePage{
    public url: string = 'wishlist';

    readonly table: ProductTableComponent = new ProductTableComponent(this.page, {
                rowsRoot: this.page.locator('tbody'),
                updateButton: this.page.getByRole('button', {name: 'Update wishlist'}),
                removeCheckbox: (row) => row.locator('input[name="removefromcart"]')
            })
        
    private readonly addToCartButton: Locator = this.page.getByRole('button', {name: 'Add to cart'});
    private readonly emptyWishlistText: Locator = this.page.locator('.wishlist-content');
    
    async addProductToCart(row: Locator): Promise<void>{
            await row.locator('input[name="addtocart"]').check();
            await this.addToCartButton.click();
    }

    async expectProductRow(
        row: Locator,
        data: {
            productName: string
            size: string
            color: string
            price: string
            quantity: string
            totalPrice: string
        }
    ){
        await expect(row.locator('.product a')).toHaveText(data.productName);
        await expect(row.locator('.attributes')).toContainText(`Size: ${data.size}`);
        await expect(row.locator('.attributes')).toContainText(`Color: ${data.color}`);
        await expect(row.locator('.product-unit-price')).toHaveText(data.price);
        await expect(row.locator('.qty input')).toHaveValue(data.quantity);
        await expect(row.locator('.product-subtotal')).toHaveText(String(data.totalPrice));
    }

    async isEmptyWishlistHasPlaceholderText(text: string): Promise<boolean>{
        return (await this.emptyWishlistText.innerText())?.trim() === text;
    }
}