var RegisterPage = require('../pages/register');

browser.addCommand('register', function (profileData) {
  return promiseSeries([
    () => RegisterPage.firstName.waitForVisible(),
    () => RegisterPage.firstName.setValue(profileData.firstName),
    () => RegisterPage.surname.setValue(profileData.surname),
    () => RegisterPage.emailAddress.setValue(profileData.email),
    () => RegisterPage.password.setValue(profileData.password),
    () => RegisterPage.passwordConfirm.setValue(profileData.password),
    () => RegisterPage.termsAndConditions.click(),
    () => RegisterPage.next.click(),
    () => RegisterPage.dateOfBirth.waitForVisible(),
    () => RegisterPage.selectDateOfBirth(profileData.dateOfBirth),
    () => RegisterPage.selectCountry(profileData.country),
    () => RegisterPage.selectPlace(profileData.place),
    () => RegisterPage.checkRecaptcha(),
    () => RegisterPage.submit.click()
  ]);
});
