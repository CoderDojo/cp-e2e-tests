var LoginPage = require('../pages/login');
var users = require('../data/users');

describe('Login tests', function () {
  this.timeout(120000);

  afterEach(function () {
    browser.deleteCookie();
  });

  Object.keys(users).forEach(function (key) {
    var user = users[key];
    it('Login as ' + user.name, function () {
      LoginPage.open();
      LoginPage.login(user.email, user.password);
      LoginPage.userMenu.waitForVisible();
      var profileName = LoginPage.userMenu_profileName.getText();
      expect(profileName).to.include(user.name);
    });
  });
});
