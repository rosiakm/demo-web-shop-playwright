import { BaseObject } from "../base-object";
import { HeaderComponent } from "../components/header-component";
import { FooterComponent } from "../components/footer-component";
import { MenuComponent } from "../components/menu-component";
import { Locator } from "@playwright/test";

export class BasePage extends BaseObject{
    public url: string = "";
    public pageTitle: Locator = this.page.locator('.page-title');

    public get Header(): HeaderComponent{
        return new HeaderComponent(this.page);
    }

    public get Footer(): FooterComponent{
        return new FooterComponent(this.page);
    }

    public get Menu(): MenuComponent{
        return new MenuComponent(this.page);
    }
}