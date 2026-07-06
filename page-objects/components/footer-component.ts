import { BaseObject } from "../base-object";
import { footerNavigation, FooterSection } from "../../config/footer-config";

export class FooterComponent extends BaseObject{

    async navigateTo(section: FooterSection, link: string): Promise<void>{
        const url = footerNavigation[section][link];

        await this.page.locator(`.footer a[href="${url}"]`).click();
    }
}