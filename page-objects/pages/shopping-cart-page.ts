import { BasePage } from "./base-page";
import { Locator, expect } from "@playwright/test";
import { ProductTableComponent } from "../../page-objects/components/product-table-component";
import { Cart } from "../../interfaces/cart-interfaces"

export class ShoppingCartPage extends BasePage{
    public url: string = 'cart';

    readonly table: ProductTableComponent = new ProductTableComponent(this.page, {
            rowsRoot: this.page.locator('table:has(thead) tbody'),
            updateButton: this.page.getByRole('button',{
                name: 'Update shopping cart'}),
            removeCheckbox: (row) => row.getByRole("checkbox")
        });

    private readonly continueShoppingButton: Locator = this.page.getByRole('button', {name: 'Continue shopping'});
    private readonly emptyCartText: Locator = this.page.locator(".order-summary-content");
    private readonly subTotalValue: Locator = this.page.locator("tr", {hasText: 'Sub-Total:'}).locator('.product-price');
    private readonly totalValue: Locator = this.page.locator('tr', {hasText: 'Total:'}).locator('.order-total');
    private readonly shippingValue: Locator = this.page.locator("tr", {hasText: 'Shipping:'}).locator('.product-price');
    private readonly taxValue: Locator = this.page.locator("tr", {hasText: 'Tax:'}).locator('.product-price');
    private readonly termsOfServiceCheckbox: Locator = this.page.locator('.terms-of-service').getByRole('checkbox');
    private readonly checkoutButton: Locator = this.page.getByRole('button', {name: "Checkout"});

    async continueShopping(): Promise<void>{
        await this.continueShoppingButton.click();
    }

    async expectCartRow(row: Locator,
        data: {
            productName: string
            price: string
            quantity: string
            totalPrice: string
        }
    ): Promise<void>{
        await expect(row.locator('.product')).toHaveText(data.productName);
        await expect(row.locator('.product-unit-price')).toHaveText(data.productName);
        await expect(row.locator('.qty input')).toHaveValue(data.quantity);
        await expect(row.locator('.product-subtotal')).toHaveText(String(data.totalPrice));
    }

    async getCartTotals(): Promise<Cart> {
        return {
            subTotal: Number(await this.subTotalValue.textContent()),
            shipping: Number(await this.shippingValue.textContent()),
            tax: Number(await this.taxValue.textContent()),
            total: Number(await this.totalValue.textContent())
        }
    }

    async proceedCheckout(): Promise<void>{
        await this.termsOfServiceCheckbox.check();
        await this.checkoutButton.click();
    }

    async isEmptyShoppingCartHasPlaceholderText(text: string): Promise<boolean>{
        return (await this.emptyCartText.textContent())?.trim() === text;
    }
}