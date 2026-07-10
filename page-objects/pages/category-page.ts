import { SidebarPage } from "./sidebar-page";
import { Locator } from "@playwright/test";
import { ProductDetailsPage } from "./product-details-page";
import { Categories } from "../../enums/categories";
import { Subcategories } from "../../enums/subcategories";
import { PriceFilters } from "../../enums/filters";

export class CategoryPage extends SidebarPage{
    private readonly productsGrid: Locator = this.page.locator(".product-grid");
    private readonly productName: Locator = this.productsGrid.locator(".product-title");
    private readonly productItems: Locator = this.productsGrid.locator(".product-item");
    private readonly pageSizeSelect: Locator = this.page.locator("#products-pagesize");
    private readonly currentPageButton: Locator = this.page.locator(".current-page");
    private readonly individualPageButton: Locator = this.page.locator(".individual-page");
    private readonly nextPageButton: Locator = this.page.locator(".next-page");
    private readonly subcategoryGrid: Locator = this.page.locator(".sub-category-grid");
    private readonly priceRangeSelectors: Locator = this.page.locator(".price-range-selector li a");
        
    async openFirstProductDetails(): Promise<ProductDetailsPage> {
        const firstItem = this.productName.first();
        const alias = (await firstItem.locator("a").getAttribute("href"))?.replace("/", "")!;
        await firstItem.click();
    
        const productPage = new ProductDetailsPage(this.page);
        productPage.url = alias;
    
        return productPage;
    }
    
    async openProductDetailsByName(productName: string): Promise<void>{
        await this.productName.getByRole('link', {name: productName}).click();
    }
    
    async selectPageSize(option: string): Promise<void>{
        this.pageSizeSelect.selectOption(option);
    }
    
    async getSelectedPageSize() : Promise<number>{
        const text = await this.pageSizeSelect
        .locator('option[selected="selected"]')
        .textContent();
    
        return Number(text);
    }
    
    async getProductItemsCount(): Promise<number>{
        return await this.productItems.count();
    }

    async getActualPrices(): Promise<number[]>{
        const prices = await this.productItems.locator(".actual-price").allInnerTexts();
        return prices.map(price => Number(price))
    }

    async navigateToSubcategory(
        category: Categories,
        subcategory: Subcategories
        ): Promise<void> {
            await this.subcategoryGrid.getByText(category).click();
            await this.subcategoryGrid.getByText(subcategory).click();
        }

    async selectPriceFilter(filterName: PriceFilters): Promise<void>{
        await this.priceRangeSelectors.filter({hasText: filterName}).click();
    }
    
    async isProductGridVisible(): Promise<boolean>{
        return await this.productsGrid.isVisible();
    }
    
    async isAnyProductItemVisible(): Promise<boolean> {
        return await this.productItems.first().isVisible();
    }
    
    async isCurrentPageButtonVisible(): Promise<boolean>{
        return await this.currentPageButton.isVisible();
    }
    
    async isIndividualPageButtonVisible(): Promise<boolean>{
        return await this.individualPageButton.isVisible();
    }
    
    async isNextPageButtonVisible(): Promise<boolean> {
        return await this.nextPageButton.isVisible()
    }
}