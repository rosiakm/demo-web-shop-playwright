import { test, expect } from '../fixtures/fixtures'
import { UserBuilder } from "../builders/userBuilder"
import { ContactUsPage } from '../../page-objects/pages/contact-us-page';
import { BaseObject } from '../../page-objects/base-object';

test("Send enquiry via Contact us form", async ({page, homePage}) => {
    const jakisButton: BaseObject = new BaseObject(page, { baseLocator: page.locator("JAkis Button")});
    await jakisButton.click();

    const user = new UserBuilder().build();
    
    homePage.Footer.navigateTo("information", "contactUs");
    const contactUsPage = new ContactUsPage(page);

    contactUsPage.sendAnEnquiry(`${user.firstName} ${user.lastName}`, user.email, "Test");
    expect(await contactUsPage.getResultText()).toEqual("Your enquiry has been successfully sent to the store owner.");
})