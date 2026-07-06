import { Locator } from "@playwright/test";
import { SidebarPage } from "./sidebar-page";
import { FormField } from "../form-field";
import { Radiobutton } from "../radiobutton";
import { BaseObject } from "../base-object";
import { MessageError } from "../message-error";

export class ReviewPage extends SidebarPage{
    public override readonly baseLocator: Locator = this.page.locator(".page-body");
    public reviewTitle: FormField = new FormField(this.page, {baseLocator: this.baseLocator.locator(".inputs:has(label[for='AddProductReview_Title'])")});
    public reviewText: FormField = new FormField(this.page, {baseLocator: this.baseLocator.locator(".inputs:has(label[for='AddProductReview_ReviewText'])")});
    public ratingRadiobutton: Radiobutton = new Radiobutton(this.page, {baseLocator: this.baseLocator.locator(".review-rating")});
    public submitReviewButton: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.getByRole("button", {name: "Submit review"})});
    public nonRegisteredUserMessageError: MessageError = new MessageError(this.page, {baseLocator: this.baseLocator.locator(".message-error")});
    public resultText: BaseObject = new BaseObject(this.page, {baseLocator: this.baseLocator.locator("div[class='result']")});

    public texts: {
        addedReview: string;
        errorMessage: string;
    } = {
        addedReview: "Product review is successfully added.",
        errorMessage: "Only registered users can write reviews"
    }

    async sendReview(title: string, text: string): Promise<void>{
        await this.reviewTitle.textbox.setText(title);
        await this.reviewText.textbox.setText(text);
        await this.selectRating(3);
        await this.submitReviewButton.click();
    }

    async selectRating(value: 1|2|3|4|5): Promise<void>{
        await this.ratingRadiobutton.checkByValue(value);
    }

    async getMessage(): Promise<string>{
        return (await this.nonRegisteredUserMessageError.getText());
    }
}