var moment = require('moment');
var _ = require('lodash');
var page = require('../../pages/dojos/manage-users.js');
var MainPage = require('../../pages/page');
var MyDojosPage = require('../../pages/myDojos');

describe.only('Manage users tests', function () {
  this.timeout(120000);

  afterEach(function () {
    browser.deleteCookie();
  });

  beforeEach(function(){
    MainPage.open();
    MainPage.login('champion1@example.com', 'testchampion1');
    MainPage.userMenu.click();
    MainPage.userMenu_myDojos.click();
    MyDojosPage.getManageUsersLink('Dojo1').click();
  });

  it('should see users', function () {
    var user = page.user('parent1');
    // expect(user).to.equal('Dublin');
    console.log(user);
  });

  // it('may be able to navigate', function () {
  // });
  //
  // it('should be able to invite', function () {
  // });
  //
  // it('should be able to filter by name', function () {
  // });
  //
  // it('should be able to filter by user type', function () {
  // });
  //
  // it('should be able to filter by name and user type', function () {
  // });
  //
  // it('should be able to award badge', function () {
  // });
  //
  // it('should be able to export users', function () {
  // });
  //
  // it('should be able to remove an user from the dojo', function () {
  // });
  //
  // it('should be able to change user role', function () {
  // });
  //
  // it('should be able to change permissions', function () {
  // });
  //
  // it('should be able to view users profile', function () {
  // });

});
