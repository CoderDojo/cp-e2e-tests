var LoginPage = require('../pages/login');
var loginData = require('../data/login');

describe('Login tests', function () {
  this.timeout(120000);

  afterEach(function () {
    browser.deleteCookie();
  });

  loginData.users.forEach(function (user) {
    it('Login as ' + user.name, function () {
      LoginPage.open();
      LoginPage.login(user.email, user.password);
      LoginPage.userMenu.waitForVisible();
      var profileName = LoginPage.profileName.getText();
      expect(profileName).to.include(user.name);
    });
  });
});
