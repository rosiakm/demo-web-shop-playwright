import { BaseObject } from "./base-object";

export class Select extends BaseObject{
    
    public async selectOption(option: string, timeout: 2_000): Promise<void>{
        await this.baseLocator.selectOption(option, {timeout});
    }
}