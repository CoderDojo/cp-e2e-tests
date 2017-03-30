var users = require('../../../data/users');
var dojos = require('../../../data/dojos');
var LoginPage = require('../../../pages/login');
var MyDojosPage = require('../../../pages/myDojos');
var ManageUsersPage = require('../../../pages/dojos/manage-users');
var AtomicNotify = require('../../../pages/atomicNotify');

describe('Management of pending users', function () {
  var originalSize = 0;
  before('Go to ManageUsersPage', function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(users.champion2.email, users.champion2.password),
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageUsersLink(dojos.dojo2.name).click(),
      () => ManageUsersPage.getActiveUsers.click(),
      () => ManageUsersPage.users,
      (users) => (originalSize = users.value.length),
      () => ManageUsersPage.getPendingUsers.click()
    ]);
  });

  // Decline a request and check its visibility
  it('should be able to decline a request', function () {
    var size = 0;
    return promiseSeries([
      () => ManageUsersPage.users,
      (users) => (size = users.value.length),
      () => ManageUsersPage.user('userRequestingAccess1').click(),
      () => ManageUsersPage.declineJoinRequest.click(),
      () => AtomicNotify.get.getText(),
      (msg) => expect(msg).to.contain('declined'),
      () => AtomicNotify.close.click(),
      () => ManageUsersPage.users,
      (users) => expect(users.value.length).to.be.equal(size - 1),
      () => ManageUsersPage.getActiveUsers.click(),
      () => ManageUsersPage.users,
      (users) => expect(users.value.length).to.be.equal(originalSize)
    ]);
  });

  // Accept a request and check its visibility
  it('should be able to accept a request', function () {
    var size = 0;
    return promiseSeries([
      () => ManageUsersPage.getPendingUsers.click(),
      () => ManageUsersPage.users,
      (users) => (size = users.value.length),
      () => ManageUsersPage.user('userRequestingAccess2').click(),
      () => ManageUsersPage.acceptJoinRequest.click(),
      () => AtomicNotify.get.getText(),
      (msg) => expect(msg).to.contain('accepted'),
      () => AtomicNotify.close.click(),
      () => ManageUsersPage.users,
      (users) => expect(users.value.length).to.be.equal(size - 1),
      () => ManageUsersPage.getActiveUsers.click(),
      () => ManageUsersPage.user('userRequestingAccess2'),
      (user) => expect(user).to.exist
    ]);
  });
});
