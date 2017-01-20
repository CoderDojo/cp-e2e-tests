var page = require('../../pages/profiles/view.js');
var dojos = require('../../data/dojos.js');
var ManageDojoUsersPage = require('../../pages/dojos/manage-users');
var MyDojosPage = require('../../pages/myDojos');
var MainPage = require('../../pages/page');
var profiles = require('../../data/profiles.js');
var logins = require('../../data/users.js');
var _ = require('lodash');

describe('Test profile visibility', function () {
  this.timeout(120000);

  var fields = ['name', 'email', 'dojos']; // Fields not listed here doest not necessarly display
  var tests = {
    'manager1': profiles.cdf, // CDF admin

    'champion1': profiles.full,
    'child2-1': profiles.full, // kid champ
    'mentor1': profiles.limited,
    'mentorTicketing1': profiles.full,
    'mentorAdmin1': profiles.full,
    'mentorFullAccess1': profiles.full,
    'parent1': profiles.limitedFamily,
    'parentTicketing1': profiles.full,
    'parentAdmin1': profiles.full,
    'parentFullAccess1': profiles.full,
    'child2': profiles.limitedFamily,

    // Other Dojo
    'randomParent1': profiles.outsider,
    'champion2': profiles.otherDojo,
    'parent2': profiles.otherDojoLimitedFamily
  };
  var urls = {};

  before(function () {
    // Save urls of profiles from a dojo, logging in as the champ and looping through users
    function getDojoUsers (dojoName) {
      return promiseSeries([
        () => MainPage.open(),
        () => {
          var dojo = _.find(dojos, {name: dojoName});
          return dojo.owner;
        },
        (champion) => MainPage.login(champion + '@example.com', 'test' + champion),
        () => MyDojosPage.userMenu.click(),
        () => MyDojosPage.userMenu_myDojos.click(),
        () => MyDojosPage.getManageUsersLink(dojoName).click(),
        () => ManageDojoUsersPage.users,
        //  TODO: pagination in case there is more scenarios, or allow to define by get how many users we want
        (userEls) => {
          var subSteps = [];
          userEls.value.forEach(function (user) {
            var username;
            subSteps.push(() => {
              return browser.elementIdLocation(user.ELEMENT)
              .then((loc) => browser.scroll(loc.value.x, loc.value.y - 200)) // 200 = header height
              .then(() => browser.elementIdClick(user.ELEMENT));
            });
            subSteps.push(() => browser.elementIdText(user.ELEMENT));
            subSteps.push((text) => { username = text.value; });
            subSteps.push(() => ManageDojoUsersPage.profileLink.getAttribute('href'));
            subSteps.push((url) => { urls[username] = url; });
          });
          return promiseSeries(subSteps);
        },
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_logout.click(),
        () => MainPage.open()
      ]);
    }

    // Save urls of profiles for users not belonging to a dojo
    function getIndependantUsers (users) {
      var promises = [];
      users.forEach((user) => {
        promises.push(() => login(user));
        promises.push(() => MainPage.userMenu.click());
        promises.push(() => MainPage.userMenu_myProfile.click());
        promises.push(() => browser.getUrl());
        promises.push((url) => urls[user] = url);
        promises.push(() => logout());
      });
      return promiseSeries(promises);
    }

    return promiseSeries([
      () => getDojoUsers('dojo1'),
      () => getDojoUsers('dojo2'),
      () => getIndependantUsers(['randomParent1', 'mentor2', 'manager1'])
    ]);
  });

  Object.keys(tests).forEach(function (loggedInUser) {
    // We exclude loggedInUser from tests, it should be covered in /profile test
    var targets = _.clone(tests[loggedInUser]);
    delete targets[loggedInUser];
    describe(loggedInUser + ' visibility test', () => {
      before(() => {
        return promiseSeries([
          () => login(loggedInUser),
          () => MainPage.userMenu.waitForVisible(), // We wait here elsewhat we get redirected to homepage (test2fast2test)
        ]);
      });
      after(() => {
        return logout();
      });
      Object.keys(targets).forEach(function (targetUser) {
        var visibleFields = targets[targetUser];
        var nonVisibleFields = _.difference(fields, visibleFields);
        describe(loggedInUser + ' visibility test against ' + targetUser, () => {
          before(() =>{
            return MainPage.open(urls[targetUser]);
          });
          if (visibleFields.length > 0) {
            it(loggedInUser + ' should see ' + targetUser + ' ' + visibleFields.join(','), function () {
              return checkVisibleFields();
            });
          }

          if (nonVisibleFields.length > 0) {
            it(loggedInUser + ' should not see ' + targetUser + ' ' + nonVisibleFields.join(','), function () {
              return checkNonVisibleFields();
            });
          }
        });

        var checkVisibleFields = () => {
          var promisesVisibility = [];
          visibleFields.forEach((field) => {
            promisesVisibility.push(() => browser.waitForExist('.cd-profile'));
            promisesVisibility.push(() => page[field]);
            promisesVisibility.push((element) => browser.isVisible(element.selector));
            promisesVisibility.push((visible) => expect(visible).to.be.true);
          });
          return promiseSeries(promisesVisibility);
        };
        var checkNonVisibleFields = () => {
          var promisesInvisibility = [];
          nonVisibleFields.forEach((field) => {
            promisesInvisibility.push(() => browser.waitForExist('.cd-profile'));
            promisesInvisibility.push(() => page[field]);
            promisesInvisibility.push((element) => browser.isVisible(element.selector));
            promisesInvisibility.push((visible) => expect(visible).to.be.false);
          });
          return promiseSeries(promisesInvisibility);
        };
      });
    });
  });
  var logout = () => {
    return promiseSeries([
      () => MainPage.open(), // TODO: fix menu z-index, "temp" bypass menu issue
      () => MainPage.userMenu.waitForVisible(),
      () => MainPage.userMenu.click(),
      () => MainPage.userMenu_logout.click(),
      () => MainPage.open()
    ]);
  };
  var login = (username) => {
    var email = username + '@example.com';
    var password = 'test' + username;
    var user = _.find(logins, {'name': username});
    if (user) {
      email = user.email;
      password = user.password;
    }
    return MainPage.login(email, password);
  };
});
