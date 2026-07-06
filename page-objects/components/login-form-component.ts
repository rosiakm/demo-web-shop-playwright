import { Locator } from "@playwright/test";
import { BaseObject } from "../base-object";
import { FormField } from "../form-field";
import { MessageError } from "../message-error";

export class LoginFormComponent extends BaseObject{
    public override readonly baseLocator: Locator = this.page.locator(".returning-wrapper");
    private readonly registerButton: Locator = this.page.getByRole("button", {name: "Register"});
    private readonly contentBodyText: Locator = this.page.locator(".topic-html-content-body p");

    public title: BaseObject = new BaseObject(this.page, { baseLocator: this.baseLocator.locator(".title strong")});
    public errorMessage: MessageError = new MessageError(this.page, { baseLocator: this.baseLocator.locator(".message-error")});
    public emailField: FormField = new FormField(this.page, { 
        baseLocator: this.baseLocator.locator(".inputs:has(label[for='Email'])")});
    public passwordField: FormField = new FormField(this.page, { 
        baseLocator: this.baseLocator.locator(".inputs:has(label[for='Password'])") });
    public rememberMeField: FormField = new FormField(this.page, { baseLocator: this.baseLocator.locator(".inputs:has(label[for='RememberMe'])") });
    public forgotPasswordLink: BaseObject = new BaseObject(this.page, { baseLocator: this.baseLocator.locator(".forgot-password a") });
    public loginButton: BaseObject = new BaseObject(this.page, { baseLocator: this.baseLocator.locator(".login-button") });

    async logInUser(email: string, password: string): Promise<void>{
        await this.emailField.textbox.setText(email);
        await this.passwordField.textbox.setText(password);
        await this.loginButton.click();
    }

    async openRegisterForm(): Promise<void>{
        await this.registerButton.click();
    }
}