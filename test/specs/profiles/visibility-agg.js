var page = require('../../pages/profiles/view.js');
var ManageDojoUsersPage = require('../../pages/dojos/manage-users');
var MyDojosPage = require('../../pages/myDojos');
var MainPage = require('../../pages/page');
var login = require('../../data/users.js');
var profiles = require('../../data/profiles.js');
var _ = require('lodash');

describe('Test profile visibility', function () {
  this.timeout(120000);

  var fields = ['name', 'email', 'dojos']; // Fields not listed here doest not necessarly display
  var tests = {
    // 'manager1': profiles.full,
    //
    'champion1': profiles.full,
    'mentor1': profiles.limited,
    'mentorTicketing1': profiles.full,
    'mentorAdmin1': profiles.full,
    'mentorFullAccess1': profiles.full,
    'parent1': profiles.limitedFamily,
    'parentTicketing1': profiles.full,
    'parentAdmin1': profiles.full,
    'parentFullAccess1': profiles.full,
    'child2': profiles.limitedFamily,
    'randomParent1': profiles.none,

    // // // // Out of dojo
    'champion2': profiles.otherDojo,
    'parent2': profiles.otherDojo

  };
  var urls = {};

  before(function(){
    function getDojoUsers(n) {
      return promiseSeries([
        () => MainPage.open(),
        () => MainPage.login('champion'+ n +'@example.com', 'testchampion' + n),
        () => MyDojosPage.userMenu.click(),
        () => MyDojosPage.userMenu_myDojos.click(),
        () => MyDojosPage.getManageUsersLink('dojo' + n).click(),
        () => ManageDojoUsersPage.users,
        //  TODO: pagination in case there is more scenarios, or allow to define by get how many users we want
        (userEls) => {
          var subSteps = [];
          userEls.value.forEach(function (user) {
            var username;
            subSteps.push(() => {
              return browser.elementIdClick(user.ELEMENT)
              .catch((err) => {
                  return browser.elementIdLocation(user.ELEMENT)
                  .then((loc) => browser.scroll(loc.value.x, loc.value.y));
              });
            });
            subSteps.push(() => browser.elementIdText(user.ELEMENT));
            subSteps.push((text) => { username = text.value; });
            subSteps.push(() => ManageDojoUsersPage.profileLink.getAttribute('href'));
            subSteps.push((url) => urls[username] = url);
          });
          return promiseSeries(subSteps);
        },
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_logout.click(),
        () => MainPage.open()
      ]);
    }

    return promiseSeries([
      () => getDojoUsers(1),
      () => getDojoUsers(2)
    ]);
  });


  Object.keys(tests).forEach(function (loggedInUser) {
    // We exclude loggedInUser from tests, it should be covered in /profile test
    var targets = tests[loggedInUser];
    delete targets[loggedInUser];

    Object.keys(targets).forEach(function (targetUser) {
      var visibleFields = targets[targetUser];
      var nonVisibleFields = _.difference(fields, visibleFields);
      describe(loggedInUser + ' visibility test', () => {
        before(() => {
          return login();
        });
        if (visibleFields.length > 0) {
          it(loggedInUser + ' should see ' + targetUser + ' ' + visibleFields.join(',') , function () {
            return promiseSeries([
              handleCDF,
              () => MainPage.userMenu.waitForVisible(), // We wait here elsewhat we get redirected to homepage (test2fast2test)
              () => {
                console.log(urls[targetUser], targetUser);
                return Promise.resolve();
              },
              () => MainPage.open(urls[targetUser]),
              checkVisibleFields
            ]).then(() => console.log('Finished'));
          });
        }

        if (nonVisibleFields.length > 0) {
          it(loggedInUser + ' should not see ' + targetUser + ' ' + nonVisibleFields.join(',') , function () {
            return promiseSeries([
              handleCDF,
              () => MainPage.userMenu.waitForVisible(), // We wait here elsewhat we get redirected to homepage (test2fast2test)
              () => {
                console.log(urls[targetUser], targetUser);
                return Promise.resolve();
              },
              () => MainPage.open(urls[targetUser]),
              checkNonVisibleFields
            ]).then(() => console.log('Finished'));
          });
        }
        after(() => {
          return exit();
        });
      });


      var login = () => {
        var email = loggedInUser + '@example.com';
        var password = 'test' + loggedInUser;
        var user = _.find(login, {'name': loggedInUser});
        if (user) {
          email = user.email;
          password = user.password;
        }
        return MainPage.login(email, password);
      };
      var handleCDF = () => {
        // Handle manager1 which isn't a part of the dojo
        if (!urls[loggedInUser]) {
          return promiseSeries([
            () => MainPage.userMenu.waitForVisible(),
            () => MainPage.userMenu.click(),
            () => MainPage.userMenu_myProfile.click(),
            () => browser.getUrl(),
            (url) => urls[loggedInUser] = url
          ]);
        }
      };
    var checkVisibleFields = () => {
      var promisesVisibility = [];
      visibleFields.forEach((field) => {
        promisesVisibility.push(() => browser.waitForExist('.cd-profile'));
        promisesVisibility.push(() => page[field]);
        promisesVisibility.push((element) => browser.isVisible(element.selector));
        promisesVisibility.push((visibility) => {
          console.log(visibility, 'expected true on', field)
          return Promise.resolve(visibility);
        });
        promisesVisibility.push((visible) => expect(visible).to.be.true);
      });
      return promiseSeries(promisesVisibility);
    };
    var checkNonVisibleFields = () => {
      var promisesInvisibility = [];
      nonVisibleFields.forEach((field) => {
        promisesInvisibility.push(() => page[field]);
        promisesInvisibility.push((element) => browser.isVisible(element.selector));
        promisesInvisibility.push((visibility) => {
          console.log(visibility, 'expected false on ', field)
          return Promise.resolve(visibility);
        });
        promisesInvisibility.push((visible) => expect(visible).to.be.false);
      });
      return promiseSeries(promisesInvisibility);
    };
    var exit = () => {
      return promiseSeries([
        () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
        () => MainPage.userMenu.waitForVisible(),
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_logout.click(),
        () => MainPage.open()
      ]);
    };
    });
  });

});
