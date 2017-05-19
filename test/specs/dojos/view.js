var logins = require('../../data/users');
var dojos = require('../../data/dojos');
var LoginPage = require('../../pages/login');
var ViewDojoPage = require('../../pages/dojos/view');

describe('Dojos should be properly created', function () {
  var users = [undefined, 'parent1'];

  users.forEach(function (loggedInUser) {
    describe('Capacity to join as ' + loggedInUser, function () {
      before(function () {
        if (logins[loggedInUser] !== undefined) {
          return browser.login(logins[loggedInUser].email, logins[loggedInUser].password)
          .then(function () {
            return LoginPage.userMenu.waitForVisible();
          });
        }
      });
      it('should be able to join a public dojo', function () {
        return promiseSeries([
          () => ViewDojoPage.open(dojos.dojo2.slug),
          () => ViewDojoPage.getJoinButton.isVisible(),
          (visible) => expect(visible).to.be.equal(true)
        ]);
      });
      it('shouldnt be able to join a private dojo', function () {
        return promiseSeries([
          () => ViewDojoPage.open(dojos.privateDojo1.slug),
          () => ViewDojoPage.getJoinButton.isVisible(),
          (visible) => expect(visible).to.be.equal(false)
        ]);
      });
    });
  });
});
