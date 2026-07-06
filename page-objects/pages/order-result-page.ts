import { BasePage } from "./base-page";
import { Locator } from "@playwright/test";

export class OrderResultPage extends BasePage{
    private readonly titleMessage: Locator = this.page.locator('.title');
}