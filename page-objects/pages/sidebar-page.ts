import { SidebarComponent } from "../components/sidebar-component";
import { BasePage } from "./base-page";

export class SidebarPage extends BasePage{    
    
    public get Sidebar(): SidebarComponent{
        return new SidebarComponent(this.page);
    }
}