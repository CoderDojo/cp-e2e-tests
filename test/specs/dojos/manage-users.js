var moment = require('moment');
var _ = require('lodash');
var page = require('../../pages/dojos/manage-users.js');
var pagination = require('../../pages/components/pagination');
var modal = require('../../pages/components/modal');
var MainPage = require('../../pages/page');
var MyDojosPage = require('../../pages/myDojos');
var profilePage = require('../../pages/profiles/view');

describe.only('Manage users tests', function () {
  this.timeout(200000);

  after(function () {
    browser.deleteCookie();
  });

  before(function(){
    MainPage.open();
    MainPage.login('champion1@example.com', 'testchampion1');
  });

  beforeEach(function(){
    MainPage.userMenu.click();
    MainPage.userMenu_myDojos.click();
    MyDojosPage.getManageUsersLink('dojo1').click();
  });


  it('should see user', function () {
    var user = page.user('parent1');
    expect(user.getText()).to.be.equal('parent1');
  });

  it('may be able to navigate', function () {
    if (page.users.value.length > 30) {
      pagination.nextPage.click();
      //TODO: check page content/usersNb
      pagination.previousPage.click();
    } else {
      expect(pagination.nextPage.getAttribute('class')).to.include('disabled');
    }
  });

  it('should be able to invite', function () {
    page.invitationTextBox.setValue('champion2@example.com');
    page.invitationDropDown('Champion');
    page.submitInvitation.click();
    modal.wait();
    expect(modal.body.getText()).to.be.equal('Invite Sent!');
    modal.accept.click();
    modal.wait(true);
  });

  it('should stop invite if email is wrong', function () {
    page.invitationTextBox.setValue('champion2');
    page.invitationDropDown('Champion');
    page.submitInvitation.click();
    modal.wait(true);
    expect(page.invitationTextBox.getAttribute('class')).to.include('ng-invalid');
  });

  it('should be able to filter by name', function () {
    page.filterTextBox.setValue('champion1');
    page.submitFilter.click();
    browser.pause(1000);
    expect(page.users.value.length).to.be.equal(1);
  });

  it('should be able to support partial filter', function () {
    page.filterTextBox.setValue('child');
    page.submitFilter.click();
    browser.pause(1000);
    expect(page.users.value.length).to.be.equal(2);
  });

  it('should be able to filter by user type', function () {
    page.filterTextBox.clearElement();
    page.filterDropDown('Champion');
    page.submitFilter.click();
    browser.pause(1000);
    expect(page.users.value.length).to.be.equal(1);
  });

  it('should be able to filter by name and user type', function () {
    page.filterTextBox.setValue('1');
    page.filterDropDown('Mentor', 'Mentor/Volunteer');
    page.submitFilter.click();
    browser.pause(1000);
    expect(page.users.value.length).to.be.equal(1);
    expect(page.user('mentor1').getText()).to.be.equal('mentor1');
  });

  it.only('should be able to award badge', function () {
    var user = 'mentor1';
    page.user(user).click();
    page.awardBadgeButton.waitForVisible(4000);
    page.awardBadgeButton.click();
    page.awardBadgeDropDownTextBox.waitForVisible(4000);
    page.awardBadgeDropDown('1', 'My 1st Dojo!');
    page.awardBadgeEvidenceTextArea.setValue('Bacon ipsum dolor amet hamburger capicola rump alcatra pancetta venison meatball. Shank pork tail ball tip, brisket rump short loin pancetta short ribs pork chop turkey beef. Jowl picanha pastrami tenderloin. Cupim pork chop ribeye kielbasa ball tip boudin short ribs short loin ham doner filet mignon burgdoggen frankfurter. Pork jowl sausage burgdoggen, ham hock tri-tip short loin pork belly tail ground round boudin sirloin swine shank. Capicola brisket short loin jowl doner.');
    page.awardBadgeSubmitButton.click();
    modal.wait();
    var validationText = 'Are you sure you want to award this badge to the below user?\n' + user;
    expect(modal.body.getText()).to.be.equal(validationText);
    modal.submit.click();
    browser.waitUntil(function () {
      return modal.body? validationText != modal.body.getText() : false;
    }, 2000);
    expect(modal.body.getText()).to.be.equal('Badge Awarded!');
    modal.submit.click();
    // it shouldn't award twice
    page.awardBadgeDropDownTextBox.waitForVisible(4000);
    page.awardBadgeDropDown('1', 'My 1st Dojo!');
    page.awardBadgeEvidenceTextArea.setValue('Bacon ipsum dolor amet hamburger capicola rump alcatra pancetta venison meatball. Shank pork tail ball tip, brisket rump short loin pancetta short ribs pork chop turkey beef. Jowl picanha pastrami tenderloin. Cupim pork chop ribeye kielbasa ball tip boudin short ribs short loin ham doner filet mignon burgdoggen frankfurter. Pork jowl sausage burgdoggen, ham hock tri-tip short loin pork belly tail ground round boudin sirloin swine shank. Capicola brisket short loin jowl doner.');
    page.awardBadgeSubmitButton.click();
    modal.wait();
    expect(modal.body.getText()).to.be.equal(validationText);
    modal.submit.click();
    browser.waitUntil(function () {
      return modal.body? validationText != modal.body.getText() : false;
    }, 2000);
    expect(modal.body.getText()).to.be.equal('User has already received this badge.');
    modal.accept.click();
    modal.wait(true);
  });

  it('should not be able to award badge when the evidence is missing', function () {
    page.user('mentor1').click();
    page.awardBadgeButton.waitForVisible(4000);
    page.awardBadgeButton.click();
    page.awardBadgeDropDownTextBox.waitForVisible(2000);
    page.awardBadgeDropDown('Mentor', 'Mentor Badge');
    page.awardBadgeEvidenceTextArea.clearElement();
    expect(page.awardBadgeSubmitButton.getAttribute('disabled')).to.be.equal('true');
  });

  it('should be able to export users', function () {
    expect(page.exportUsersButton.getAttribute('href')).to.match(/api\/2.0\/dojos\/export-users\/([a-z-0-9]+)-user-export.csv$/);
  });

  it('should be able to change user role', function () {
    var user = 'parent1';
    page.user(user).click();
    page.changeUserRoleButton.waitForVisible(4000);
    page.changeUserRoleButton.click();
    page.changeUserRolePopUp.waitForVisible(2000);
    page.changeUserRolePopUpSubmit('volunteer').click();
    modal.wait();
    expect(modal.body.getText()).to.be.equal('User types successfully updated.');
    modal.accept.click();
    expect(page.userTitle(user).getText()).to.equal('Volunteer/Mentor');
  });

  it('should be able to change permissions', function () {
    var user = 'parent1';
    function togglePerm (name) {
      page.permissionCheckbox(name).$('input').click();
      modal.wait();
      expect(modal.body.getText()).to.be.equal('User permissions successfully updated.');
      modal.accept.click();
      modal.wait(true);
    }
    // Set
    page.user(user).click();
    page.permissionsButton.waitForVisible(2000);
    page.permissionsButton.click();
    togglePerm('Ticketing');
    expect(page.permissionCheckbox('Ticketing').$('input').getAttribute('class')).to.include('ng-not-empty');
    // Unset
    togglePerm('Ticketing');
    expect(page.permissionCheckbox('Ticketing').$('input').getAttribute('class')).to.include('ng-empty');
  });

  it('should be able to remove an user from the dojo', function () {
    page.user('child2').click();
    var initialLength = page.users.value.length;
    page.removeUserButton.waitForVisible(2000);
    page.removeUserButton.click();
    modal.wait();
    var validationText = 'Are you sure you want to remove this user from your Dojo?';
    var popup = modal.body;
    expect(modal.body.getText()).to.be.equal(validationText);
    modal.submit.click();
    browser.waitUntil(function(){
      return modal.body.isExisting() && popup !== modal.body;
    });
    expect(modal.body.getText()).to.be.equal('User successfully removed from Dojo.');
    modal.accept.click();
    expect(page.users.value.length).to.equal(initialLength - 1);
  });

  it('should not be able to remove the dojo owner', function () {
    page.user('champion1').click();
    var initialLength = page.users.value.length;
    page.removeUserButton.waitForVisible(2000);
    page.removeUserButton.click();
    modal.wait();
    var validationText = 'Are you sure you want to remove this user from your Dojo?';
    var popup = modal.body;
    expect(modal.body.getText()).to.be.equal(validationText);
    modal.submit.click();
    browser.waitUntil(function(){
      return modal.body.isExisting() && popup !== modal.body;
    });
    expect(modal.body.getText()).to.be.equal('Dojo owners cannot be removed.');
    modal.accept.click();
    expect(page.users.value.length).to.equal(initialLength);
  });

  // it('should be able to view mentor profile', function () {
  //   var user = 'mentor1';
  //   checkUserProfile(user);
  // });
  //
  // it('should be able to view child profile', function () {
  //   var user = 'child1';
  //   checkUserProfile(user);
  // });
  //
  // it.only('should be able to view parent profile', function () {
  //   var user = 'parent1';
  //   checkUserProfile(user);
  // });
  //
  // function checkUserProfile (user) {
  //   page.user(user).click();
  //   page.profileLink.click();
  //   expect(profilePage.name.getText()).to.equal(user);
  // }

});
