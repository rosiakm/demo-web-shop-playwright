import { SidebarPage } from "./sidebar-page";
import { LoginFormComponent } from "../components/login-form-component";
import { Locator } from "@playwright/test";

export class CheckoutLoginPage extends SidebarPage{
    public url: string = 'login/checkoutasguest?returnUrl=%2Fcart';

    private readonly checkoutAsGuestButton: Locator = this.page.getByRole("button", {name: "Checkout as Guest"});

    public get LoginForm(): LoginFormComponent{
        return new LoginFormComponent(this.page); 
    }

    async checkoutAsGuest(): Promise<void>{
        await this.checkoutAsGuestButton.click();
    }
}