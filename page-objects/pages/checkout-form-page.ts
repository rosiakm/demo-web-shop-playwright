import { BasePage } from "./base-page";
import { Locator } from "@playwright/test";
import { User } from "../../tests/models/user";
import { PostData } from "../../interfaces/post-data-interface";

export class CheckoutFormPage extends BasePage{
    public url: string = "onepagecheckout";

    private readonly firstNameInput: Locator = this.page.getByLabel('First name:');
        private readonly lastNameInput: Locator = this.page.getByLabel('Last name:');
        private readonly emailInput: Locator = this.page.getByLabel('Email:');
        private readonly countrySelect: Locator = this.page.getByLabel('Country:');
        private readonly cityInput: Locator = this.page.getByLabel('City:');
        private readonly streetAddress: Locator = this.page.getByLabel('Address 1:');
        private readonly zipCodeInput: Locator = this.page.getByLabel('Zip / postal code:');
        private readonly phoneNumberInput: Locator = this.page.getByLabel('Phone number:');
        private readonly continueButton: Locator = this.page.getByRole('button', {name: 'Continue'});
        private readonly confirmButton: Locator = this.page.getByRole('button', {name: 'Confirm'});
        private readonly billingInfoName: Locator = this.page.locator('.billing-info .name');
        private readonly billingInfoEmail: Locator = this.page.locator('.billing-info .email');
        private readonly billingInfoPhoneNumber: Locator = this.page.locator('billing-info .phone');
        private readonly billingInfoFirstAddress: Locator = this.page.locator('.billing-info .address1');
        private readonly billingInfoCityStateZip: Locator = this.page.locator('.billing-info .city-state-zip');
        private readonly billingInfoCountry: Locator = this.page.locator('.billing-info .country');
    
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
    
        async fillCountry(country: string): Promise<void>{
            await this.countrySelect.selectOption(country);
            await this.countrySelect.blur();
        }
    
        async fillCity(city: string): Promise<void>{
            await this.cityInput.clear();
            await this.cityInput.fill(city);
            await this.cityInput.blur();
        }
    
        async fillStreetAddres(street: string): Promise<void>{
            await this.streetAddress.clear();
            await this.streetAddress.fill(street);
            await this.streetAddress.blur();
        }
    
        async fillZipCode(zipCode: string): Promise<void>{
            await this.zipCodeInput.clear();
            await this.zipCodeInput.fill(zipCode);
            await this.zipCodeInput.blur();
        }
    
        async fillPhoneNumber(phoneNumber: string): Promise<void>{
            await this.phoneNumberInput.clear();
            await this.phoneNumberInput.fill(phoneNumber);
            await this.phoneNumberInput.blur();
        }
    
        async fillCheckoutForm(user: User): Promise<void>{
            await this.firstNameInput.fill(user.firstName);
            await this.lastNameInput.fill(user.lastName);
            await this.emailInput.fill(user.email);
            await this.countrySelect.selectOption(user.address.country);
            await this.cityInput.fill(user.address.city);
            await this.streetAddress.fill(user.address.firstAddress);
            await this.zipCodeInput.fill(user.address.zipCode);
            await this.phoneNumberInput.fill(user.phoneNumber);
        }
    
        async moveThroughTheForm(): Promise<void>{
            while(this.continueButton.isVisible()){
                await this.continueButton.click();
            }
        }
    
        async isNameToBe(firstName: string, lastName: string): Promise<boolean>{
            return await this.billingInfoName.textContent() === `${firstName} ${lastName}`;
        }
    
        async isEmailToBe(email: string): Promise<boolean>{
            return await this.billingInfoEmail.textContent() === `Email: ${email}`;
        }
    
        async isPhoneNumberToBe(number: string): Promise<boolean>{
            return await this.billingInfoPhoneNumber.textContent() === `Phone: ${number}`;
        }
    
        async isAddressToBe(address: string): Promise<boolean>{
            return await this.billingInfoFirstAddress.textContent() === address;
        }
    
        async isCityStateZipToBe(postData: PostData): Promise<boolean>{
            const text = (await this.billingInfoCityStateZip.textContent())?.trim();
            const expected = postData.state
                ? `${postData.city} , ${postData.state} ${postData.zipCode}`
                : `${postData.city} , ${postData.zipCode}`;
            return text === expected;
        }
    
        async isCountryToBe(country: string): Promise<boolean>{
            return await this.billingInfoCountry.textContent() === country;
        }
}