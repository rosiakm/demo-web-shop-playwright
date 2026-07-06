import { SidebarPage } from "./sidebar-page";
import { RegisterInputs } from "../../tests/data/registerInputs";
import { Locator } from "@playwright/test";
import { User } from "../../tests/models/user";

export class RegisterPage extends SidebarPage{
    public url: string = 'register';

    private readonly maleGenderRadioButton: Locator = this.page.getByRole("radio", {name:"Male"});
    private readonly femaleGenderRadioButton: Locator = this.page.getByRole("radio", {name:"Female"});
    private readonly firstNameInput: Locator = this.page.getByLabel("First name:");
    private readonly lastNameInput: Locator = this.page.getByLabel("Last Name:");
    private readonly emailInput: Locator = this.page.getByLabel("Email:");
    private readonly passwordInput: Locator = this.page.getByLabel("Password:", {exact: true});
    private readonly confirmPasswordInput: Locator = this.page.getByLabel("Confirm password:");
    private readonly registerButton: Locator = this.page.getByRole("button", {name: "Register"});
    private readonly registerConfirmationText: Locator = this.page.getByText("Your registration completed");
    private readonly firstNameValidationErrorText: Locator = this.page.locator(".field-validation-error",{hasText: "First name"});
    private readonly lastNameValidationErrorText: Locator = this.page.locator(".field-validation-error",{hasText: "Last name"});
    private readonly emailValidationErrorText: Locator = this.page.locator(".field-validation-error",{hasText: "Email"});
    private readonly passwordValidationErrorText: Locator = this.page.locator('[data-valmsg-for = "Password"]');
    private readonly confirmPasswordValidationErrorText: Locator = this.page.locator('[data-valmsg-for = "ConfirmPassword"]');
    private readonly continueButton: Locator = this.page.getByRole("button", {name: "Continue"});
    private readonly validationErrors: Record<RegisterInputs, { locator: Locator; label: string}> = {
            [RegisterInputs.firstName]: {
                locator: this.firstNameValidationErrorText,
                label: 'First name'
            },
            [RegisterInputs.lastName]: {
                locator: this.lastNameValidationErrorText,
                label: 'Last name'
            },
            [RegisterInputs.email]: {
                locator: this.emailValidationErrorText,
                label: 'Email'
            },
            [RegisterInputs.password]: {
                locator: this.passwordValidationErrorText,
                label: 'Password'
            },
            [RegisterInputs.confirmPassword]: {
                locator: this.confirmPasswordValidationErrorText,
                label: 'Password'
            }
        }
    
        async fillFirstName(firstName: string): Promise<void>{
            await this.firstNameInput.clear();
            await this.firstNameInput.fill(firstName);
            await this.firstNameInput.blur();
        }
    
        async fillLastName(lastName: string): Promise<void>{
            await this.lastNameInput.clear();
            await this.lastNameInput.fill(lastName);
            await this.lastNameInput.blur();
        }
    
        async fillEmail(email: string): Promise<void>{
            await this.emailInput.clear();
            await this.emailInput.fill(email);
            await this.emailInput.blur();
        }
    
        async fillPassword(password: string): Promise<void>{
            await this.passwordInput.clear();
            await this.passwordInput.fill(password);
            await this.passwordInput.blur();
        }
    
        async fillConfirmPassword(password: string): Promise<void>{
            await this.confirmPasswordInput.clear();
            await this.confirmPasswordInput.fill(password);
            await this.confirmPasswordInput.blur();
        }
    
        async selectGender(gender: User['gender']): Promise<void>{
            if (gender === 'male') {
                await this.maleGenderRadioButton.check();
            } else {
                await this.femaleGenderRadioButton.check();
            }
        }
    
        async submit(): Promise<void>{
            await this.registerButton.click();
        }
    
        async fillTheRegisterForm(user: User): Promise<void> {
            await this.fillFirstName(user.firstName);
            await this.fillLastName(user.lastName);
            await this.fillEmail(user.email);
            await this.fillPassword(user.password);
            await this.fillConfirmPassword(user.password);
            await this.selectGender(user.gender);
        }
    
        async isPlaceholderAfterRegisterConfirmationHasText(text: string): Promise<boolean>{
            return (await this.registerConfirmationText.textContent())?.trim() === text;
        }
    
        async isRequiredFieldHasErrorText(field: RegisterInputs): Promise<boolean>{
            const { locator, label } = this.validationErrors[field];
            return (await locator.textContent())?.trim() === (`${label} is required.`);
        }
    
        async isRequiredFieldsHasErrorText(fields: RegisterInputs[]): Promise<boolean> {
            const areErrors: boolean[] = [];
            for (const field of fields) {
                areErrors.push(await this.isRequiredFieldHasErrorText(field));
            }
            
            return areErrors.every(value => value);
        }
    
        async isRequiredFieldValidationTextVisible(field: RegisterInputs): Promise<boolean>{
            const {locator} = this.validationErrors[field];
            return(await locator.isVisible())
        }
    
        async getInputValidationText(field: RegisterInputs): Promise<string>{
            const { locator } = this.validationErrors[field];
            return String(await locator.textContent());
        }
    }