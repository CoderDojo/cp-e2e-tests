var page = require('../../pages/profiles/edit.js');
var profilePage = require('../../pages/profiles/view.js');
var MainPage = require('../../pages/page');
var login = require('../../data/users.js');
var _ = require('lodash');

describe('Test profile edit', function () {
  this.timeout(120000);
  Object.keys(login).forEach(function (loggedInUser) {
    if (loggedInUser.password) {
      describe('Test profile edit for ' + loggedInUser, function () {
        beforeEach(() => {
          var email = loggedInUser + '@example.com';
          var password = 'test' + loggedInUser;
          var user = _.find(login, {'name': loggedInUser});
          if (user) {
            email = user.email;
            password = user.password;
          }
          return promiseSeries([
            () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
            () => MainPage.login(email, password),
            () => MainPage.userMenu.waitForVisible(),
            () => MainPage.userMenu.click(),
            () => MainPage.userMenu_myProfile.click(),
            () => profilePage.userActions.click(),
            () => profilePage.editUser.click()
          ]);
        });

        afterEach(() => {
          return promiseSeries([
            () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
            () => MainPage.userMenu.waitForVisible(),
            () => MainPage.userMenu.click(),
            () => MainPage.userMenu_logout.click(),
            () => MainPage.open()
          ]);
        });

        it('should be able to switch profile visibility', () => {
          return promiseSeries([
            () => browser.pause(2000),
            () => page.private,
            (privateElement) => {
              return browser.elementIdLocation(privateElement.value.ELEMENT)
              .then((loc) => {
                browser.scroll(loc.value.x, loc.value.y);
              })
              .then(() => Promise.resolve(privateElement));
            },
            (element) => browser.isVisible(element.selector),
            (visible) => expect(visible).to.be.true
          ]);
        });
      });
    }
  });
});
