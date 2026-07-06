import { Locator, Page } from "@playwright/test";

type Config = {
    rowsRoot: Locator
    updateButton?: Locator
    removeCheckbox: (row: Locator) => Locator
}

export class ProductTableComponent{
    constructor(
        private page: Page,
        private config: Config
    ){}

    get rows(){
        return this.config.rowsRoot.getByRole('row');
    }

    async changeQuantity(row: Locator, quantity: string){
        await row.locator('.qty-input').clear();
        await row.locator('.qty-input').fill(quantity);
        await this.config.updateButton!.click();
    }

    async removeItemFromTable(row:Locator){
        await this.config.removeCheckbox(row).check();
        await this.config.updateButton!.click();
    }

    async getRowByProductName(name: string){
        return this.rows.filter({hasText: name}).first();
    }
}