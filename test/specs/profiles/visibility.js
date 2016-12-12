var page = require('../../pages/profiles/view.js');
var ManageDojoUsersPage = require('../../pages/dojos/manage-users');
var MyDojosPage = require('../../pages/myDojos');
var MainPage = require('../../pages/page');
var login = require('../../data/login.js').users;
var profiles = require('../../data/profiles.js');
var _ = require('lodash');

describe('Test profile visibility', function () {
  this.timeout(120000);

  var fields = ['name', 'badges', 'email', 'dojos']; // Fields not listed here are optional
  var tests = {
    // 'manager1': profiles.full,

    // 'champion1': profiles.full,
    // 'mentor1': profiles.limited, //TODO : see w/ rosa
    // 'mentorTicketing1': profiles.limited2,
    // 'mentorAdmin1': profiles.limited2,
    // 'mentorFullAccess1': profiles.full,
    // 'parent1': profiles.limited3,
    'parentTicketing1': profiles.limited2,
    'parentAdmin1': profiles.limited2,
    // 'parentFullAccess1': profiles.full,
    // 'child1': profiles.kidLimited,
    // 'child2': profiles.kidLimited,
    //
    // // Out of dojo
    // 'champion2': profiles.restricted,
    // 'mentor2': profiles.restricted,
    // 'parent2': profiles.restricted


  };
  var urls = {};

  before(function(){
    return runTestSteps([
      () => MainPage.open(),
      () => MainPage.login('champion1@example.com', 'testchampion1'),
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageUsersLink('dojo1').click(),
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
        return runTestSteps(subSteps);
      },
      () => MainPage.userMenu.click(),
      () => MainPage.userMenu_logout.click(),
      () => MainPage.open()
    ]);
  });


  Object.keys(tests).forEach(function (loggedInUser) {
    // We exclude loggedInUser from tests, it should be covered in /profile test
    var targets = tests[loggedInUser];
    delete targets[loggedInUser];
    console.log(targets);

    Object.keys(targets).forEach(function (targetUser) {
      var visibleFields = targets[targetUser];
      it(loggedInUser + ' should see ' + targetUser + ' ' + visibleFields.join(',') , function () {
        return runTestSteps([
          () => {
            var email = loggedInUser + '@example.com';
            var password = 'test' + loggedInUser;
            var user = _.find(login, {'name': loggedInUser});
            if (user) {
              email = user.email;
              password = user.password;
            }
            MainPage.login(email, password);
          },
          () => {
            // Handle manager1 which isn't a part of the dojo
            // TODO : externalize to handle parent2 & oodojo members
            if (!urls[loggedInUser]) {
              return runTestSteps([
                () => MainPage.userMenu.waitForVisible(),
                () => MainPage.userMenu.click(),
                () => MainPage.userMenu_myProfile.click(),
                () => browser.getUrl(),
                (url) => urls[loggedInUser] = url
              ]);
            }
          },
          () => MainPage.userMenu.waitForVisible(), // We wait here elsewhat we get redirected to homepage (test2fast2test)
          () => MainPage.open(urls[targetUser]),
          // Should see
          () => {
            var promisesVisibility = [];
            console.log('fields', visibleFields)
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
            return runTestSteps(promisesVisibility);
          },
          // Should not see
          // () => {
          //   var nonVisibleFields = _.difference(fields, visibleFields);
          //   var promisesInvisibility = [];
          //   nonVisibleFields.forEach((field) => {
          //     promisesInvisibility.push(() => page[field]);
          //     promisesInvisibility.push((element) => browser.isVisible(element.selector));
          //     promisesInvisibility.push((visibility) => {
          //       console.log(visibility, 'expected false on ', field)
          //       return Promise.resolve(visibility);
          //     });
          //     promisesInvisibility.push((visible) => expect(visible).to.be.false);
          //   });
          //   return runTestSteps(promisesInvisibility);
          // },
          () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
          () => MainPage.userMenu.waitForVisible(),
          () => MainPage.userMenu.click(),
          () => MainPage.userMenu_logout.click(),
          () => MainPage.open()
        ]).then(() => console.log('Finished'));
      });
    });
  });

});
