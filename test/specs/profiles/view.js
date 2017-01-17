var page = require('../../pages/profiles/edit.js');
var profilePage = require('../../pages/profiles/view.js');
var MainPage = require('../../pages/page');
var login = require('../../data/users.js');
var _ = require('lodash');

describe('Test profile visibility', function () {
  this.timeout(120000);
  Object.keys(login).forEach(function (loggedInUser) {

    describe('Test profile actions for ' + loggedInUser, function () {
      before(() => {
        return logIn(loggedInUser);
      });
      after(() => {
        return logOut();
      });

      it('should be able to see the actions wheel', () => {
        return promiseSeries([
          () => browser.pause(2000),
          () => MainPage.userMenu_myProfile.click(),
          () => isWheelVisible()
        ]);
      });

      if (_.includes(['parent1', 'parent2'], loggedInUser)) {
        it('should be able to see kids actions wheel', () => {
          return promiseSeries([
            () => profilePage.childrenList,
            (element) => browser.elements(element.selector),
            (kids) => {
              var promises = [];
              kids.value.forEach((element) => {
                promises.push(() => {
                  var refName;
                  return promiseSeries([
                    () => profilePage.name,
                    (name) => {refName = name; return Promise.resolve();},
                    () => browser.elementIdClick(element.ELEMENT),
                    () => browser.waitUntil(() => {
                      return profilePage.name
                      .then((name) => {
                        console.log(name, refName, !_.isEqual(name.value, refName.value));
                        return !_.isEqual(name.value, refName.value);
                      });
                    }), // I know, it's terrible
                    () => isWheelVisible(),
                    () => browser.back(),
                  ]);
                });
              });
              return promiseSeries(promises);
            }
          ]);
        });
      }
      // TODO : test non visibility of wheel
    });
  });

  var logIn = (loggedInUser) => {
    console.log(loggedInUser);
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
      () => MainPage.userMenu.click()
    ]);
  };

  var logOut = () => {
    return promiseSeries([
      () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
      () => MainPage.userMenu.waitForVisible(),
      () => MainPage.userMenu.click(),
      () => MainPage.userMenu_logout.click(),
      () => MainPage.open()
    ]);
  };

  // WEEEEEHL
  var isWheelVisible = () => {
    return promiseSeries([
      () => profilePage.config.click(),
      () => profilePage.editUser,
      (element) => browser.isVisible(element.selector),
      (visible) => expect(visible).to.be.true
    ]);
  };

});