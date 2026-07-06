import { test, expect } from '../fixtures/fixtures'
import { UserBuilder } from '../builders/userBuilder'

test('Login form UI is consistent with the design', async ({ homePage, loginPage}) => {
    const expected = {
        title: "Returning Customer",
        isEmailInputVisible: true,
        isEmailInputEnabled: true,
        emailLabel: "Email:",
        isEmailInputFocused: true,
        isPasswordInputVisible: true,
        isPasswordInputEnabled: true,
        passwordLabel: "Password:",
        isRememberMeCheckboxVisible: true,
        isRememberMeCheckboxEnabled: true,
        isRememberMeCheckboxChecked: false,
        rememberMeLabel: "Remember me?",
        forgotPasswordText: "Forgot password?",
        isLoginButtonEnabled: true,
        loginButtonText: "Log in",
    };
    const actual = {
        title: "",
        isEmailInputVisible: false,
        isEmailInputEnabled: false,
        emailLabel: "",
        isEmailInputFocused: false,
        isPasswordInputVisible: false,
        isPasswordInputEnabled: false,
        passwordLabel: "",
        isRememberMeCheckboxVisible: false,
        isRememberMeCheckboxEnabled: false,
        isRememberMeCheckboxChecked: true,
        rememberMeLabel: "",
        forgotPasswordText: "",
        isLoginButtonEnabled: false,
        loginButtonText: "",
    };

    await homePage.Header.openLoginPage();
    actual.title = await loginPage.Login.title.getText();
    actual.isEmailInputVisible = await loginPage.Login.emailField.textbox.isVisible();
    actual.isEmailInputEnabled = await loginPage.Login.emailField.textbox.isEnabled();
    actual.emailLabel = await loginPage.Login.emailField.label.getText();
    actual.isEmailInputFocused = await loginPage.Login.emailField.textbox.isFocused();
    actual.isPasswordInputVisible = await loginPage.Login.passwordField.textbox.isVisible();
    actual.isPasswordInputEnabled = await loginPage.Login.passwordField.textbox.isEnabled();
    actual.passwordLabel = await loginPage.Login.passwordField.label.getText();
    actual.isRememberMeCheckboxVisible = await loginPage.Login.rememberMeField.checkbox.isVisible();
    actual.isRememberMeCheckboxEnabled = await loginPage.Login.rememberMeField.checkbox.isEnabled();
    actual.isRememberMeCheckboxChecked = await loginPage.Login.rememberMeField.checkbox.isChecked();
    actual.rememberMeLabel = await loginPage.Login.rememberMeField.label.getText();
    actual.forgotPasswordText = await loginPage.Login.forgotPasswordLink.getText();
    actual.isLoginButtonEnabled = await loginPage.Login.loginButton.isEnabled();
    actual.loginButtonText = await loginPage.Login.loginButton.getText();

    expect(actual).toEqual(expected);
})

test('Login user happy path', async ({homePage,loginPage}) => {
    await homePage.Header.openLoginPage();
    await loginPage.Login.logInUser(process.env.EMAIL!, process.env.PASSWORD!);

    expect (await homePage.Header.isAccountNameOptionHasName(process.env.EMAIL!)).toBeTruthy();
})

test("Login Form email address is validated", async ({ homePage, loginPage }) => {
    const expected = {
        isErrorVisibleAfterJustLeavingField: false,
        isErrorVisibleAfterFillingWithInvalidEmailNotLeavingField: false,
        isErrorVisibleAfterFillingWithInvalidEmailAndLeavingField: true,
        isErrorVisibleAfterClearingInvalidEmail: true,
        isErrorVisibleAfterFillingAgainWithValidEmail: false,
        errorText: "Please enter a valid email address."
    };
    const actual = {
        isErrorVisibleAfterJustLeavingField: true,
        isErrorVisibleAfterFillingWithInvalidEmailNotLeavingField: true,
        isErrorVisibleAfterFillingWithInvalidEmailAndLeavingField: false,
        isErrorVisibleAfterClearingInvalidEmail: false,
        isErrorVisibleAfterFillingAgainWithValidEmail: true,
        errorText: ""
    };

    await homePage.Header.openLoginPage();
    await loginPage.Login.emailField.textbox.click();
    await loginPage.Login.passwordField.textbox.click();
    actual.isErrorVisibleAfterJustLeavingField = await loginPage.Login.emailField.error.isVisible();
    await loginPage.Login.emailField.textbox.setText("blablabla");
    actual.isErrorVisibleAfterFillingWithInvalidEmailNotLeavingField = await loginPage.Login.emailField.error.isVisible();
    await loginPage.Login.emailField.textbox.setTextAndLeaveTextBox("blablabla");
    actual.isErrorVisibleAfterFillingWithInvalidEmailAndLeavingField = await loginPage.Login.emailField.error.isVisible();
    actual.errorText = await loginPage.Login.emailField.error.getText();
    await loginPage.Login.emailField.textbox.clearText();
    actual.isErrorVisibleAfterClearingInvalidEmail = await loginPage.Login.emailField.error.isVisible();
    await loginPage.Login.emailField.textbox.setText("prawidlowy@email.elo");
    actual.isErrorVisibleAfterFillingAgainWithValidEmail = await loginPage.Login.emailField.error.isVisible();

    expect(actual).toEqual(expected);
})

test('Login user - invalid user', async({homePage, loginPage}) => {
    const user = new UserBuilder().build();

    await homePage.Header.openLoginPage();
    await loginPage.Login.logInUser(user.email, user.password);

    expect(await loginPage.Login.errorMessage.summary.getText()).toEqual("Login was unsuccessful. Please correct the errors and try again.");
    expect((await loginPage.Login.errorMessage.errors).length).toEqual(1);
    expect(await (await loginPage.Login.errorMessage.errors)[0].getText()).toEqual("No customer account found");
})

test('Login user - invalid password', async({homePage, loginPage}) => {
    const user = new UserBuilder().build();

    await homePage.Header.openLoginPage();
    await loginPage.Login.logInUser(process.env.EMAIL!, user.password);

    expect(await loginPage.Login.errorMessage.summary.getText()).toEqual("Login was unsuccessful. Please correct the errors and try again.");
    expect((await loginPage.Login.errorMessage.errors).length).toEqual(1);
    expect(await (await loginPage.Login.errorMessage.errors)[0].getText()).toEqual("The credentials provided are incorrect");
})

test('Logout user happy path', async ({homePage, loginPage}) => {
    await homePage.Header.openLoginPage();
    await loginPage.Login.logInUser(process.env.EMAIL!, process.env.PASSWORD!);
    await homePage.Header.logoutUser();

    await expect (await homePage.Header.isAccontNameOptionVisible()).toBeFalsy();
    await expect (await homePage.Header.isLoginOptionVisible()).toBeTruthy();
})