var LoginPage = require('../pages/login');
var users = require('../data/users');

describe('Login tests', function () {
  afterEach(function () {
    return browser.deleteCookie();
  });

  Object.keys(users).forEach(function (key) {
    var user = users[key];
    if (user.password) {
      it('Login as ' + user.name, function () {
        return promiseSeries([
          () => LoginPage.open(),
          () => LoginPage.login(user.email, user.password),
          () => LoginPage.userMenu.waitForVisible(),
          () => LoginPage.userMenu_profileName.getText(),
          (profileName) => expect(profileName).to.include(user.name)
        ]);
      });
    }
  });
});
