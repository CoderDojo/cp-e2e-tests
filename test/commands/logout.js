var LoginPage = require('../pages/login');

browser.addCommand('logout', function (email, password) {
  return promiseSeries([
    () => LoginPage.userMenu.waitForVisible(),
    () => LoginPage.userMenu.click(),
    () => LoginPage.userMenu_logout.click()
  ]);
});
