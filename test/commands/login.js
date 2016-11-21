var LoginPage = require('../pages/login');

browser.addCommand('login', function (email, password) {
  LoginPage.userMenu_login.click();
  LoginPage.email.waitForVisible();
  LoginPage.email.setValue(email);
  LoginPage.password.setValue(password);
  LoginPage.submit.click();
});
