var profilePage = require('../../pages/profiles/view.js');
var MainPage = require('../../pages/page');
var login = require('../../data/users.js');
var _ = require('lodash');

describe('Test profile visibility', function () {
  this.timeout(120000);
  Object.keys(login).forEach(function (loggedInUser) {
    var user = login[loggedInUser];
    if (user.password) {
      describe('Test profile actions for ' + loggedInUser, function () {
        before(() => {
          return logIn(user);
        });
        after(() => {
          return logOut();
        });

        it('should be able to see the actions wheel', () => {
          return promiseSeries([
            () => browser.pause(2000),
            () => MainPage.userMenu.waitForVisible(),
            () => MainPage.userMenu.click(),
            () => MainPage.userMenu_myProfile.click(),
            () => isWheelVisible()
          ]);
        });

        if (_.includes(['parent1', 'parent2'], loggedInUser)) {
          it('should be able to see kids actions wheel', () => {
            var names = [];
            return promiseSeries([
              () => profilePage.childrenList,
              (kids) => {
                var promises = [];
                kids.value.forEach((element) => {
                  promises.push(() => browser.elementIdText(element.ELEMENT));
                  promises.push((name) => names.push(name.value));
                });
                return promiseSeries(promises);
              },
              () => {
                var promises = [];
                names.forEach((childName) => {
                  promises.push(() => {
                    var refName;
                    return promiseSeries([
                      () => profilePage.name,
                      (name) => { refName = name; },
                      () => profilePage.child(childName).click(),
                      () => browser.waitUntil(() => {
                        return profilePage.name
                        .then((name) => {
                          return !_.isEqual(name.value, refName.value);
                        });
                      }), // I know, it's terrible
                      () => isWheelVisible(),
                      () => MainPage.userMenu.click(),
                      () => MainPage.userMenu_myProfile.click(),
                      () => profilePage.children.waitForVisible()
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
    }
  });

  var logIn = (loggedInUser) => {
    var email = loggedInUser.email;
    var password = loggedInUser.password;
    return promiseSeries([
      () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
      () => MainPage.login(email, password)
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

  // WHEEEEEL ./°
  var isWheelVisible = () => {
    return promiseSeries([
      () => profilePage.userActions.click(),
      () => profilePage.editUser,
      (element) => browser.isVisible(element.selector),
      (visible) => expect(visible).to.be.true
    ]);
  };
});
