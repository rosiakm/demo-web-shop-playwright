import { LoginFormComponent } from "../components/login-form-component";
import { SidebarPage } from "./sidebar-page";

export class LoginPage extends SidebarPage{
    public url: string = 'login';

    public get Login(): LoginFormComponent{
        return new LoginFormComponent(this.page);
    }
}