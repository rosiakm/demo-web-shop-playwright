import { Locator, Page } from "@playwright/test";
import { LocatorFromAnother } from "../tests/helpers/locatorUtil";

export class BaseObject {
    public readonly baseLocator: Locator;

    constructor (protected page: Page, init?: Partial<BaseObject>){
        this.baseLocator = this.page.locator("body");
        Object.assign(this, init);
    }

    public async click(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.click({timeout});
        await this.page.waitForLoadState();
    }

    public async getText(timeout: number = 2_000): Promise<string> {
        return await this.baseLocator.textContent({ timeout }) || await this.baseLocator.inputValue({ timeout });
    }

    public async getAttribute(name: string): Promise<string> {
        return String(await this.baseLocator.getAttribute(name));
    }

    public async isVisible(timeout: number = 2_000): Promise<boolean> {
        return await this.baseLocator.isVisible({ timeout });
    }

    public async isNotVisible(timeout: number = 2_000): Promise<boolean> {
        return await this.baseLocator.isHidden({ timeout });
    }

    public async isDisabled(timeout: number = 0): Promise<boolean> {
        return await this.baseLocator.isDisabled({ timeout });
    }

    public async isEnabled(timeout:number = 0): Promise<boolean> {
        return await this.baseLocator.isEnabled({ timeout });
    }

    public async isFocused(timeout: number = 1_000): Promise<boolean> {
        return await this.baseLocator.evaluate((el) => el === document.activeElement, null, { timeout });
    }

    public async hover(timeout = 1_000): Promise<void> {
        await this.baseLocator.hover({ timeout });
    }

    public async waitUntilNotVisible(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.waitFor({ state: "hidden", timeout });
    }

    public async waitUntiVisible(timeout: number = 2_000): Promise<void> {
        await this.baseLocator.waitFor({ state: "visible", timeout });
    }

    protected async clickOutside(): Promise<void> {
        await this.page.mouse.click(0, 0);
    }

    protected getLocatorFromAnotherBySelector(selectorInput: string): LocatorFromAnother {
        return (baseLocator: Locator) => baseLocator.locator(selectorInput);
    }
}