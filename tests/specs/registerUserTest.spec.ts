import { test, expect } from '../fixtures/fixtures'
import { UserBuilder } from '../builders/userBuilder'
import { faker } from '@faker-js/faker'
import { RegisterInputs } from '../data/registerInputs';

test('Register user happy path', async ({homePage, registerPage}) => {
    const user = new UserBuilder()
        .withGender('female')
        .build();

    await homePage.Header.openRegisterPage();
    await registerPage.fillTheRegisterForm(user);
    await registerPage.submit();

    expect (await registerPage.isPlaceholderAfterRegisterConfirmationHasText("Your registration completed")).toBeTruthy();
})

test('Register form - submit empty form - validation messages', async({homePage, registerPage}) => {
    await homePage.Header.openRegisterPage();
    await registerPage.submit();

    expect(await registerPage.isRequiredFieldsHasErrorText([
        RegisterInputs.firstName,
        RegisterInputs.lastName,
        RegisterInputs.email,
        RegisterInputs.password,
        RegisterInputs.confirmPassword
    ])).toBeTruthy();
})

test('Register form - validation disappears after input', async ({homePage, registerPage}) => {
    const user = new UserBuilder().build();
    
    await homePage.Header.openRegisterPage();
    await registerPage.submit();

    await registerPage.fillFirstName(user.firstName);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.firstName)).toBeFalsy();

    await registerPage.fillLastName(user.lastName);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.lastName)).toBeFalsy();

    await registerPage.fillEmail(user.email);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.email)).toBeFalsy();

    await registerPage.fillPassword(user.password);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.password)).toBeFalsy();

    await registerPage.fillConfirmPassword(user.password);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.confirmPassword)).toBeFalsy();
})

test('Register form - invalid password length', async ({homePage, registerPage}) => {
    const user = new UserBuilder()
        .withPassword(faker.internet.password({length: 5}))
        .build();

    await homePage.Header.openRegisterPage();
    await registerPage.fillPassword(user.password);
    expect(await registerPage.getInputValidationText(RegisterInputs.password)).toEqual("The password should have at least 6 characters.");

    await registerPage.fillPassword(`${user.password}x`);
    expect(await registerPage.isRequiredFieldValidationTextVisible(RegisterInputs.password)).toBeFalsy();
})

test('Register form - non matched passwords', async({homePage, registerPage}) => {
    const user = new UserBuilder().build();

    await homePage.Header.openRegisterPage();
    await registerPage.fillPassword(user.password);
    await registerPage.fillConfirmPassword(`${user.password}xyz`);

    expect(await registerPage.getInputValidationText(RegisterInputs.confirmPassword)).toEqual("The password and confirmation password do not match.");
})