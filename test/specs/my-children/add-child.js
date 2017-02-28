var MainPage = require('../../pages/page');
var LoginPage = require('../../pages/login');
var ResetPasswordPage = require('../../pages/reset-password');
var MyChildrenPage = require('../../pages/my-children');
var users = require('../../data/users');
var parent2 = users.parent2;
var ts = (new Date()).getTime();
var additionalU13Child = {
  firstName: 'Additional' + ts,
  surname: 'u13 child',
  alias: 'AddU13' + ts
};
additionalU13Child.name = additionalU13Child.firstName + ' ' + additionalU13Child.surname;
var additionalO13Child = {
  firstName: 'Additional.1' + ts,
  surname: 'o13 child',
  alias: 'AddO13.1' + ts
};
additionalO13Child.name = additionalO13Child.firstName + ' ' + additionalO13Child.surname;
var additionalO13ChildWithEmail = {
  firstName: 'Additional.2' + ts,
  surname: 'o13 child',
  alias: 'AddO13.2' + ts,
  email: 'addo13.2' + ts + '@example.com'
};
additionalO13ChildWithEmail.name = additionalO13ChildWithEmail.firstName + ' ' + additionalO13ChildWithEmail.surname;
var additionalO13ChildWithEmailAndPassword = {
  firstName: 'Additional.3' + ts,
  surname: 'o13 child',
  alias: 'AddO13.3' + ts,
  email: 'addo13.3' + ts + '@example.com',
  password: 'TestPassw0rd'
};
additionalO13ChildWithEmailAndPassword.name = additionalO13ChildWithEmailAndPassword.firstName + ' ' + additionalO13ChildWithEmailAndPassword.surname;

describe('Add child tests', function () {
  describe('Adding children', function () {
    before(function () {
      return promiseSeries([
        () => LoginPage.open(),
        () => LoginPage.login(parent2.email, parent2.password),
        () => LoginPage.userMenu.waitForVisible()
      ]);
    });

    after(function () {
      return promiseSeries([
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_logout.click()
      ]);
    });

    it('adding u13 shouldnt prompt for email/password', function () {
      var dob = new Date();
      dob.setYear(dob.getFullYear() - 10);
      return promiseSeries([
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_myChildren.click(),
        () => MyChildrenPage.addChild.click(),
        () => MyChildrenPage.firstName.setValue(additionalU13Child.firstName),
        () => MyChildrenPage.surname.setValue(additionalU13Child.surname),
        () => MyChildrenPage.alias.setValue(additionalU13Child.alias),
        () => MyChildrenPage.setDoB(dob),
        () => MyChildrenPage.femaleRadioButton.click(),
        () => MyChildrenPage.o13Section.isVisible(),
        (o13SectionVisible) => {
          expect(o13SectionVisible).to.equal(false);
        },
        () => MyChildrenPage.save.click(),
        () => MyChildrenPage.childName.getText(),
        (childName) => {
          expect(childName).to.equal(additionalU13Child.name);
        },
        () => MyChildrenPage.childAlias.getText(),
        (childAlias) => {
          expect(childAlias).to.equal(additionalU13Child.alias);
        },
        () => MyChildrenPage.getChildByName(additionalU13Child.name).isVisible(),
        (childVisibleInSidebar) => {
          expect(childVisibleInSidebar).to.equal(true);
        }
      ]);
    });

    it('adding o13 should not require email and password', function () {
      var dob = new Date();
      dob.setYear(dob.getFullYear() - 14);
      return promiseSeries([
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_myChildren.click(),
        () => MyChildrenPage.addChild.click(),
        () => MyChildrenPage.firstName.setValue(additionalO13Child.firstName),
        () => MyChildrenPage.surname.setValue(additionalO13Child.surname),
        () => MyChildrenPage.alias.setValue(additionalO13Child.alias),
        () => MyChildrenPage.setDoB(dob),
        () => MyChildrenPage.maleRadioButton.click(),
        () => MyChildrenPage.o13Section.isVisible(),
        (o13SectionVisible) => {
          expect(o13SectionVisible).to.equal(true);
        },
        () => MyChildrenPage.save.click(),
        () => MyChildrenPage.childName.getText(),
        (childName) => {
          expect(childName).to.equal(additionalO13Child.name);
        },
        () => MyChildrenPage.childAlias.getText(),
        (childAlias) => {
          expect(childAlias).to.equal(additionalO13Child.alias);
        },
        () => MyChildrenPage.getChildByName(additionalO13Child.name).isVisible(),
        (childVisibleInSidebar) => {
          expect(childVisibleInSidebar).to.equal(true);
        }
      ]);
    });

    it('adding o13 should allow for email without a password', function () {
      var dob = new Date();
      dob.setYear(dob.getFullYear() - 15);
      return promiseSeries([
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_myChildren.click(),
        () => MyChildrenPage.addChild.click(),
        () => MyChildrenPage.firstName.setValue(additionalO13ChildWithEmail.firstName),
        () => MyChildrenPage.surname.setValue(additionalO13ChildWithEmail.surname),
        () => MyChildrenPage.alias.setValue(additionalO13ChildWithEmail.alias),
        () => MyChildrenPage.setDoB(dob),
        () => MyChildrenPage.maleRadioButton.click(),
        () => MyChildrenPage.o13Section.isVisible(),
        (o13SectionVisible) => {
          expect(o13SectionVisible).to.equal(true);
        },
        () => MyChildrenPage.email.setValue(additionalO13ChildWithEmail.email),
        () => MyChildrenPage.save.click(),
        () => MyChildrenPage.childName.getText(),
        (childName) => {
          expect(childName).to.equal(additionalO13ChildWithEmail.name);
        },
        () => MyChildrenPage.childAlias.getText(),
        (childAlias) => {
          expect(childAlias).to.equal(additionalO13ChildWithEmail.alias);
        },
        () => MyChildrenPage.getChildByName(additionalO13ChildWithEmail.name).isVisible(),
        (childVisibleInSidebar) => {
          expect(childVisibleInSidebar).to.equal(true);
        }
      ]);
    });

    it('adding o13 should allow for email and password', function () {
      var dob = new Date();
      dob.setYear(dob.getFullYear() - 16);
      return promiseSeries([
        () => MainPage.userMenu.click(),
        () => MainPage.userMenu_myChildren.click(),
        () => MyChildrenPage.addChild.click(),
        () => MyChildrenPage.firstName.setValue(additionalO13ChildWithEmailAndPassword.firstName),
        () => MyChildrenPage.surname.setValue(additionalO13ChildWithEmailAndPassword.surname),
        () => MyChildrenPage.alias.setValue(additionalO13ChildWithEmailAndPassword.alias),
        () => MyChildrenPage.setDoB(dob),
        () => MyChildrenPage.maleRadioButton.click(),
        () => MyChildrenPage.o13Section.isVisible(),
        (o13SectionVisible) => {
          expect(o13SectionVisible).to.equal(true);
        },
        () => MyChildrenPage.email.setValue(additionalO13ChildWithEmailAndPassword.email),
        () => MyChildrenPage.password.setValue(additionalO13ChildWithEmailAndPassword.password),
        () => MyChildrenPage.save.click(),
        () => MyChildrenPage.childName.getText(),
        (childName) => {
          expect(childName).to.equal(additionalO13ChildWithEmailAndPassword.name);
        },
        () => MyChildrenPage.childAlias.getText(),
        (childAlias) => {
          expect(childAlias).to.equal(additionalO13ChildWithEmailAndPassword.alias);
        },
        () => MyChildrenPage.getChildByName(additionalO13ChildWithEmailAndPassword.name).isVisible(),
        (childVisibleInSidebar) => {
          expect(childVisibleInSidebar).to.equal(true);
        }
      ]);
    });
  });

  describe('Using newly created o13 accounts', function () {
    beforeEach(function () {
      return promiseSeries([
        () => LoginPage.open()
      ]);
    });

    it('should be able request password reset for the newly created o13 child without password', function () {
      return promiseSeries([
        () => LoginPage.resetLink.click(),
        () => ResetPasswordPage.email.setValue(additionalO13ChildWithEmail.email),
        () => ResetPasswordPage.submit.click(),
        () => ResetPasswordPage.confirmationMessage.getText(),
        (confirmationMessage) => {
          expect(confirmationMessage).to.equal('An email with password reset instructions has been sent to you.');
        }
      ]);
    });

    it('should be able to log in as the newly created o13 child with password', function () {
      return promiseSeries([
        () => LoginPage.login(additionalO13ChildWithEmailAndPassword.email, additionalO13ChildWithEmailAndPassword.password),
        () => MainPage.userMenu_profileName.getText(),
        (profileName) => {
          expect(profileName).to.equal(additionalO13ChildWithEmailAndPassword.name);
        }
      ]);
    });
  });
});
