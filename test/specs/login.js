var LoginPage = require('../pages/login');
var users = require('../data/users');

describe('Login tests', function () {
  this.timeout(120000);

  afterEach(function () {
    return browser.deleteCookie();
  });

  Object.keys(users).forEach(function (key) {
    var user = users[key];
    it('Login as ' + user.name, function () {
      return promiseSeries([
        () => LoginPage.open(),
        () => LoginPage.login(user.email, user.password),
        () => LoginPage.userMenu.waitForVisible(),
        () => LoginPage.userMenu_profileName.getText(),
        (profileName) => expect(profileName).to.include(user.name)
      ]);
    });
  });
});
