import { Locator } from "@playwright/test";
import { BaseObject } from "../base-object";
import { Categories } from "../../enums/categories";
import { Subcategories } from "../../enums/subcategories";

export class SidebarComponent extends BaseObject{
    private readonly categoriesBlock: Locator = this.page.locator(".block-category-navigation");
    private readonly manufacturersBlock: Locator = this.page.locator(".block-manufacturer-navigation");
    private readonly newsletterBlock: Locator = this.page.locator(".block-newsletter");

    async navigateTo(category: Categories): Promise<void>{
        await this.categoriesBlock.getByText(category).click();
    }

    async navigateToSubcategory(
        category: Categories,
        subcategory: Subcategories
    ): Promise<void> {
        await this.categoriesBlock.getByText(category).click();
        await this.categoriesBlock.getByText(subcategory).click();
    }
}