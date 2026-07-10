import { Locator } from "@playwright/test";
import { SidebarPage } from "./sidebar-page";

export class ContactUsPage extends SidebarPage{
  public url: string = "contactus";
  
  private readonly contentText: Locator = this.page.locator(".topic-html-content-body");
  private readonly nameInput: Locator = this.page.getByLabel("Your name");
  private readonly emailInput: Locator = this.page.getByLabel("Your email");
  private readonly enquiryInput: Locator = this.page.getByLabel("Enquiry");
  private readonly submitButton: Locator = this.page.getByRole("button", {name: "Submit"});
  private readonly resultText: Locator = this.page.locator(".page-body .result");

  async sendAnEnquiry(firstName: string, email: string, enquiry: string): Promise<void>{
    await this.nameInput.clear();
    await this.nameInput.fill(firstName);
    await this.emailInput.clear();
    await this.emailInput.fill(email);
    await this.enquiryInput.clear();
    await this.enquiryInput.fill(enquiry);
    await this.submitButton.click();
  }

  async getResultText(): Promise<string> {
    return await this.resultText.innerText();
  }
}
