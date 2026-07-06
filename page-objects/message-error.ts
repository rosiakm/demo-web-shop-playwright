import { Locator, Page } from "@playwright/test";
import { BaseObject } from "./base-object";
import { LocatorFromAnother } from "../tests/helpers/locatorUtil";

export class MessageError extends BaseObject {
        public override readonly baseLocator: Locator;
        public summary: BaseObject;
        public errors: Promise<BaseObject[]>
    
        constructor (protected page: Page, { 
            baseLocator,
            summaryLocator,
            errorsLocator }: { 
                baseLocator?: Locator,
                summaryLocator?: LocatorFromAnother,
                errorsLocator?: LocatorFromAnother }){
            super(page);
            this.baseLocator = baseLocator ? baseLocator : this.page.locator(".message-error");
            this.summary = new BaseObject(this.page, { baseLocator: summaryLocator ? summaryLocator(this.baseLocator) : this.baseLocator.locator("span")});
            this.errors = (errorsLocator ? errorsLocator(this.baseLocator) : this.baseLocator.locator("ul li"))
                .all()
                .then((errorsLocators) => errorsLocators
                    .map((errorLocator) => new BaseObject(this.page, { baseLocator: errorLocator})));
        }
}