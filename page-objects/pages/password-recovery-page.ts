import { Locator } from "@playwright/test";
import { SidebarPage } from "./sidebar-page";

export class PasswordRecoveryPage extends SidebarPage{
    public url: string =  "passwordrecovery";

    private readonly emailInput: Locator = this.page.locator("#Email");
    private readonly recoverButton: Locator = this.page.getByRole("button",{name: "Recover"});

    async recoverPassword(email: string): Promise<void>{
        await this.emailInput.clear();
        await this.emailInput.fill(email);
        await this.recoverButton.click();
    }
}