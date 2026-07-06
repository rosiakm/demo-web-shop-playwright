import { BaseObject } from "./base-object";

export class Textbox extends BaseObject {
    public override async getText(timeout?: number): Promise<string> {
        return await this.baseLocator.inputValue({ timeout });
    }

    public async clearText(timeout = 2_000): Promise<void> {
        await this.baseLocator.clear({ timeout });
    }

    public async addText(text: string, timeout: number = 2_000): Promise<void> {
        await this.baseLocator.pressSequentially(text, { timeout })
    }

    public async setText(text: string, timeout: number = 2_000): Promise<void> {
        await this.clearText(timeout);
        await this.addText(text, timeout);
    }

    public async setTextAndLeaveTextBox(text: string, timeout: number = 2_000): Promise<void> {
        await this.setText(text, timeout);
        await this.clickOutside();
    }
}