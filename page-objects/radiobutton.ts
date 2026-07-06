import { BaseObject } from "./base-object";

export class Radiobutton extends BaseObject{
    public async check(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.check({ timeout });
    }

    public async checkByValue(value: string | number, timeout: number = 2_000): Promise<void> {
        await this.baseLocator.locator(`input[value='${value}']`).check({ timeout });
    }

    public async isChecked(timeout: number = 2_000): Promise<boolean> {
        return await this.baseLocator.isChecked({ timeout });
    }
}