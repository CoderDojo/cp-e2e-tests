var moment = require('moment');
var RegisterPage = require('../pages/register');

browser.addCommand('register', function (profileData) {
  RegisterPage.firstName.setValue(profileData.firstName);
  RegisterPage.surname.setValue(profileData.surname);
  RegisterPage.emailAddress.setValue(profileData.email);
  RegisterPage.password.setValue(profileData.password);
  RegisterPage.passwordConfirm.setValue(profileData.password);
  RegisterPage.termsAndConditions.click();
  RegisterPage.next.click();
  RegisterPage.selectDateOfBirth(profileData.dateOfBirth);
  RegisterPage.selectCountry(profileData.country);
  RegisterPage.selectPlace(profileData.place);
  RegisterPage.checkRecaptcha();
  RegisterPage.submit.click();
});
