import { Locator } from "@playwright/test";
import { BaseObject } from "../base-object";
import { Categories } from "../../enums/categories";
import { getCategoryLabel, getSubcategoryLabel } from "../../config/categories-config";

export class MenuComponent extends BaseObject{
    private readonly menuBar: Locator = this.page.locator(".top-menu");
    
    private categoryLink(label: string): Locator {
        return this.menuBar.getByText(label);
    }

    async navigateTo(category: Categories): Promise<void>{
        await this.menuBar.getByText(getCategoryLabel(category)).click();
    }

    async navigateToSubcategory(
        category: Categories, 
        subcategoryKey: string
    ): Promise<void>{
        await this.menuBar.getByText(getCategoryLabel(category)).hover();
        await this.menuBar.getByText(getSubcategoryLabel(category, subcategoryKey)).click();
    }
}