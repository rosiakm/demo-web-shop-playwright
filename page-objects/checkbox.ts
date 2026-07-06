import { BaseObject } from "./base-object";

export class Checkbox extends BaseObject {
    public async check(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.check({ timeout });
    }

    public async uncheck(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.uncheck({ timeout });
    }

    public async isChecked(timeout: number = 2_000): Promise<boolean> {
        return await this.baseLocator.isChecked({ timeout });
    }
}