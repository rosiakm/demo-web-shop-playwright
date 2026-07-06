import { Locator, Page } from "@playwright/test";
import { BaseObject } from "./base-object";
import { Textbox } from "./textbox";
import { Checkbox } from "./checkbox";
import { LocatorFromAnother } from "../tests/helpers/locatorUtil";

export class FormField extends BaseObject {
    public override readonly baseLocator: Locator;
    public label: BaseObject;
    public textbox: Textbox;
    public checkbox: Checkbox;
    public error: BaseObject;

    constructor (protected page: Page, { 
        baseLocator, labelLocator,
        textboxLocator,
        checkboxLocator,
        errorLocator }: { 
            baseLocator?: Locator, 
            labelLocator?: LocatorFromAnother,
            textboxLocator?: LocatorFromAnother,
            checkboxLocator?: LocatorFromAnother,
            errorLocator?: LocatorFromAnother }){
        super(page);
        this.baseLocator = baseLocator ? baseLocator : this.page.locator(".inputs")
        this.label = new BaseObject(this.page, { baseLocator: labelLocator ? labelLocator(this.baseLocator) : this.baseLocator.locator("label")});
        this.textbox  = new Textbox(this.page, { baseLocator: textboxLocator ? textboxLocator(this.baseLocator) : this.baseLocator.locator("input,textarea")});
        this.checkbox = new Checkbox(this.page, { baseLocator: checkboxLocator ? checkboxLocator(this.baseLocator) : this.baseLocator.locator("input[type='checkbox']")});
        this.error = new BaseObject(this.page, { baseLocator: errorLocator ? errorLocator(this.baseLocator) : this.baseLocator.locator(".field-validation-error span")});
    }
}