var page = require('../../pages/dojos/manage-users.js');
var pagination = require('../../pages/components/pagination');
var modal = require('../../pages/components/modal');
var MainPage = require('../../pages/page');
var MyDojosPage = require('../../pages/myDojos');

describe.only('Manage users tests', function () {
  this.timeout(100000000);

  after(function () {
    browser.deleteCookie();
  });

  before(function () {
    return promiseSeries([
      () => MainPage.open(),
      () => MainPage.login('champion1@example.com', 'testchampion1')
    ]);
  });

  beforeEach(function () {
    return promiseSeries([
      () => MainPage.userMenu.click(),
      () => MainPage.userMenu_myDojos.waitForVisible(),
      () => MainPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageUsersLink('dojo1').click()
    ]);
  });

  it('should see user', function () {
    return promiseSeries([
      () => page.user('parent1').getText(),
      (userText) => expect(userText).to.be.equal('parent1')
    ]);
  });

  it('may be able to navigate', function () {
    return page.users
    .then((users) => {
      if (users.value.length > 30) {
        //  TODO: check page content/usersNb
        return promiseSeries([
          () => pagination.nextPage.click(),
          () => pagination.previousPage.click()
        ]);
      } else {
        return promiseSeries([
          () => pagination.nextPage.getAttribute('class'),
          (classes) => expect(classes).to.include('disabled')
        ]);
      }
    });
  });

  it('should be able to invite', function () {
    return promiseSeries([
      () => page.invitationTextBox.setValue('champion2@example.com'),
      () => page.invitationDropDown('Champion'),
      () => page.submitInvitation.click(),
      () => modal.wait(),
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal('Invite Sent!'),
      () => modal.accept.click(),
      () => modal.wait(true)
    ]);
  });

  it('should stop invite if email is wrong', function () {
    return promiseSeries([
      () => page.invitationTextBox.setValue('champion2'),
      () => page.invitationDropDown('Champion'),
      () => page.submitInvitation.click(),
      () => modal.wait(true),
      () => page.invitationTextBox.getAttribute('class'),
      (classes) => expect(classes).to.include('ng-invalid')
    ]);
  });

  it('should be able to filter by name', function () {
    return promiseSeries([
      () => page.filterTextBox.setValue('champion1'),
      () => page.submitFilter.click(),
      () => browser.pause(2000),
      () => page.users,
      (users) => expect(users.value.length).to.be.equal(1)
    ]);
  });

  it('should be able to support partial filter', function () {
    return promiseSeries([
      () => page.filterTextBox.setValue('child'),
      () => page.submitFilter.click(),
      () => browser.pause(2000), // load time + animation
      () => page.users,
      (users) => expect(users.value.length).to.be.equal(2)
    ]);
  });

  it('should be able to filter by user type', function () {
    return promiseSeries([
      () => page.filterTextBox.clearElement(),
      () => page.filterDropDown('Champion'),
      () => page.submitFilter.click(),
      () => browser.pause(2000), // load time + animation
      () => page.users,
      (users) => expect(users.value.length).to.be.equal(1)
    ]);
  });

  it('should be able to filter by name and user type', function () {
    return promiseSeries([
      () => page.filterTextBox.setValue('1'),
      () => page.filterDropDown('Mentor', 'Mentor/Volunteer'),
      () => page.submitFilter.click(),
      () => browser.pause(2000), // load time + animation
      () => page.users,
      (users) => expect(users.value.length).to.be.equal(1),
      () => page.user('mentor1').getText(),
      (mentorText) => expect(mentorText).to.be.equal('mentor1')
    ]);
  });

  it('should be able to award badge', function () {
    var user = 'mentor1';
    var validationText = 'Are you sure you want to award this badge to the below user?\n' + user;
    var evidence = 'Bacon ipsum dolor amet hamburger capicola rump alcatra pancetta venison meatball. Shank pork tail ball tip, brisket rump short loin pancetta short ribs pork chop turkey beef. Jowl picanha pastrami tenderloin. Cupim pork chop ribeye kielbasa ball tip boudin short ribs short loin ham doner filet mignon burgdoggen frankfurter. Pork jowl sausage burgdoggen, ham hock tri-tip short loin pork belly tail ground round boudin sirloin swine shank. Capicola brisket short loin jowl doner.';
    var popup;
    return promiseSeries([
      () => page.user(user).click(),
      () => page.awardBadgeButton.waitForVisible(),
      () => page.awardBadgeButton.click(),
      () => page.awardBadgeDropDownTextBox.waitForVisible(),
      () => browser.pause(1000),
      () => page.awardBadgeDropDown('1', 'My 1st Dojo!'),
      () => page.awardBadgeEvidenceTextArea.setValue(evidence),
      () => page.awardBadgeSubmitButton.click(),
      () => modal.wait(),
      () => modal.body,
      (modalBody) => { popup = modalBody; },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal(validationText),

      () => modal.submit.click(),
      () => {
        return browser.waitUntil(function () {
          return modal.body
          .then((modalBody) => {
            if (popup.value.ELEMENT !== modalBody.value.ELEMENT) {
              return true;
            }
            return false;
          });
        });
      },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal('Badge Awarded!'),
      () => modal.accept.click(),
      () => modal.wait(true)
      // it shouldn't award twice,
      // () => browser.pause(20000),
      // () => page.awardBadgeButton.waitForVisible(),
      // () => page.awardBadgeButton.scroll(),
      // () => page.awardBadgeButton.click(),
      // () => console.log('awardBadgeButton clicked'),
      // () => page.awardBadgeDropDownTextBox.waitForVisible(),
      // () => page.awardBadgeDropDown('1', 'My 1st Dojo!'),
      // () => page.awardBadgeEvidenceTextArea.setValue(evidence),
      // () => page.awardBadgeSubmitButton.click(),
      // () => modal.wait(),
      // () => modal.body.getText(),
      // (modalText) => expect(modalText).to.be.equal(validationText),
      // () => modal.submit.click(),
      // () => {
      //   return browser.waitUntil(function () {
      //     return modal.body ? validationText !== modal.body.getText() : false;
      //   }, 2000);
      // },
      // () => modal.body.getText(),
      // (modalText) => expect(modalText).to.be.equal('User has already received this badge.'),
      // () => modal.accept.click(),
      // () => modal.wait(true)
    ]);
  });

  it.skip('should not be able to award badge when the evidence is missing', function () {
    return promiseSeries([
      () => page.user('mentor1').click(),
      () => page.awardBadgeButton.waitForVisible(),
      () => page.awardBadgeButton.click(),
      () => page.awardBadgeDropDownTextBox.waitForVisible(),
      () => page.awardBadgeDropDown('Mentor', 'Mentor Badge'),
      () => page.awardBadgeEvidenceTextArea.clearElement(),
      () => page.awardBadgeSubmitButton.getAttribute('disabled'),
      (disabled) => expect(disabled).to.be.equal('true')
    ]);
  });

  it('should be able to export users', function () {
    return promiseSeries([
      () => page.exportUsersButton.getAttribute('href'),
      (href) => expect(href).to.match(/api\/2.0\/dojos\/export-users\/([a-z-0-9]+)-user-export.csv$/)
    ]);
  });

  it('should be able to change user role', function () {
    var user = 'parent1';
    return promiseSeries([
      () => page.user(user).click(),
      () => page.changeUserRoleButton.waitForVisible(),
      () => page.changeUserRoleButton.click(),
      () => page.changeUserRolePopUp.waitForVisible(),
      () => page.changeUserRolePopUpSubmit('volunteer').click(),
      () => page.changeUserRolePopUp.waitForVisible(5000, false),
      () => modal.wait(),
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal('User types successfully updated.'),
      () => modal.accept.click(),
      () => modal.wait(true),
      () => page.userTitle(user).getText(),
      (userTitle) => expect(userTitle).to.equal('Volunteer/Mentor')
    ]);
  });

  it('should be able to change permissions', function () {
    var user = 'parent1';
    function togglePerm (name) {
      return promiseSeries([
        () => page.permissionCheckbox(name).$('input').click(),
        () => modal.wait(),
        () => modal.body.getText(),
        (modalText) => expect(modalText).to.be.equal('User permissions successfully updated.'),
        () => modal.accept.click(),
        () => modal.wait(true)
      ]);
    }

    return promiseSeries([
      // Set
      () => page.user(user).click(),
      () => page.permissionsButton.waitForVisible(),
      () => page.permissionsButton.click(),
      () => togglePerm('Ticketing'),
      () => page.permissionCheckbox('Ticketing').$('input').getAttribute('class'),
      (classes) => expect(classes).to.include('ng-not-empty'),
      // Unset,
      () => togglePerm('Ticketing'),
      () => page.permissionCheckbox('Ticketing').$('input').getAttribute('class'),
      (classes) => expect(classes).to.include('ng-empty')
    ]);
  });

  it('should be able to remove an user from the dojo', function () {
    var popup, initialLength;
    var validationText = 'Are you sure you want to remove this user from your Dojo?';
    return promiseSeries([
      () => page.user('child2').click(),
      () => page.users,
      (users) => { initialLength = users.value.length; },
      () => page.removeUserButton.waitForVisible(),
      () => page.removeUserButton.click(),
      () => modal.wait(),
      () => modal.body,
      (modalBody) => { popup = modalBody; },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal(validationText),
      () => modal.submit.click(),
      () => {
        return browser.waitUntil(function () {
          return modal.body
          .then((modalBody) => {
            if (popup.value.ELEMENT !== modalBody.value.ELEMENT) {
              return true;
            }
            return false;
          });
        });
      },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal('User successfully removed from Dojo.'),
      () => modal.accept.click(),
      () => modal.wait(true),
      () => page.users,
      (users) => expect(users.value.length).to.equal(initialLength - 1)
    ]);
  });

  it('should not be able to remove the dojo owner', function () {
    var initialLength, popup;
    var validationText = 'Are you sure you want to remove this user from your Dojo?';
    return promiseSeries([
      () => page.user('champion1').click(),
      () => page.users,
      (users) => { initialLength = users.value.length; },
      () => page.removeUserButton.waitForVisible(),
      () => page.removeUserButton.click(),
      () => modal.wait(),
      () => modal.body,
      (modalBody) => { popup = modalBody; },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal(validationText),
      () => modal.submit.click(),
      () => {
        return browser.waitUntil(function () {
          return modal.body
          .then((modalBody) => {
            if (popup.value.ELEMENT !== modalBody.value.ELEMENT) {
              return true;
            }
            return false;
          });
        });
      },
      () => modal.body.getText(),
      (modalText) => expect(modalText).to.be.equal('Dojo owners cannot be removed.'),
      () => modal.accept.click(),
      () => modal.wait(true),
      () => page.users,
      (users) => expect(users.value.length).to.equal(initialLength)
    ]);
  });
});
