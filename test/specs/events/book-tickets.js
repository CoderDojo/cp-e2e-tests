var _ = require('lodash');
var LoginPage = require('../../pages/login');
var MyEventsPage = require('../../pages/events/my');
var MyDojosPage = require('../../pages/myDojos');
var ManageApplicationsPage = require('../../pages/events/manageApplications');
var ManageEventsPage = require('../../pages/events/manage');
var BookEventPage = require('../../pages/events/bookEvent');
var users = require('../../data/users');
var dojos = require('../../data/dojos');

describe('Book tickets tests', function () {
  afterEach(function () {
    return browser.deleteCookie();
  });
  var parentOne = _.find(users, function (user) { return user.email === 'parent1@example.com'; });
  var championOne = _.find(users, function (user) { return user.email === 'champion1@example.com'; });

  it('Event should show up', function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(parentOne.email, parentOne.password),
      () => LoginPage.userMenu.waitForVisible(),
      () => MyEventsPage.open(),
      () => expect(MyEventsPage.getEventRow('test event 1')).to.exist
    ]);
  });

  it('Family members should show up', function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(parentOne.email, parentOne.password),
      () => LoginPage.userMenu.waitForVisible(),
      () => MyEventsPage.open(),
      () => MyEventsPage.getEventRow('test event 1').click(),
      () => BookEventPage.bookEventButton.click(),
      () => BookEventPage.selectApplicantsButton.click(),
      () => browser.getText('ul[class="dropdown-menu dropdown-menu-form"]'),
      (familyMembers) => expect(familyMembers.toString()).to.include('child1 of parent1', 'child2 of parent1')
    ]);
  });

  it('Applications should show up', function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(championOne.email, championOne.password),
      () => LoginPage.userMenu.waitForVisible(),
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageEventsLink(dojos.dojo1.name).click(),
      () => ManageEventsPage.getManageApplicationsLink('test event 1').click(),
      () => browser.waitUntil(function () {
        return ManageApplicationsPage.applicationRows
        .then(function (applicationRows) {
          return applicationRows.value.length > 0;
        });
      }),
      () => ManageApplicationsPage.deleteApplicationButtons,
      (deleteApplicationButtons) => {
        var promises = [];
        deleteApplicationButtons.value.forEach(function () {
          promises.push(() => ManageApplicationsPage.deleteApplicationButton.click());
          promises.push(() => ManageApplicationsPage.OKButton.click());
          promises.push(() => browser.refresh());
          promises.push(() => browser.waitUntil(function () {
            return browser.isExisting('//div[@class="panel-body"]');
          }));
        });
        return promiseSeries(promises);
      },
      () => LoginPage.open(),
      () => LoginPage.userMenu.click(),
      () => LoginPage.userMenu_logout.click(),
      () => LoginPage.login(parentOne.email, parentOne.password),
      () => LoginPage.userMenu.waitForVisible(),
      () => MyEventsPage.open(),
      () => MyEventsPage.getEventRow('test event 1').click(),
      () => BookEventPage.bookEventButton.click(),
      () => BookEventPage.selectApplicantsButton.click(),
      () => BookEventPage.familyMemberOption('child1 of parent1').click(),
      () => BookEventPage.familyMemberOption('child2 of parent1').click(),
      () => BookEventPage.bookTicketsButton.click(),
      () => BookEventPage.OKButton.click(),
      () => LoginPage.open(),
      () => LoginPage.userMenu.click(),
      () => LoginPage.userMenu_logout.click(),
      () => LoginPage.login(championOne.email, championOne.password),
      () => LoginPage.userMenu.waitForVisible(),
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageEventsLink(dojos.dojo1.name).click(),
      () => ManageEventsPage.getManageApplicationsLink('test event 1').click(),
      () => browser.waitUntil(function () {
        return ManageApplicationsPage.applicationRows
        .then(function (applicationRows) {
          return applicationRows.value.length > 0;
        });
      }),
      () => ManageApplicationsPage.getApplicantRowByName('child1 of parent1'),
      (applicantRow) => expect(applicantRow).to.exist,
      () => ManageApplicationsPage.getApplicantRowByName('child2 of parent1'),
      (applicantRow) => expect(applicantRow).to.exist,
      () => ManageApplicationsPage.getApprovedStatusByName('child1 of parent1'),
      (approvedStatus) => expect(approvedStatus).to.equal('true'),
      () => ManageApplicationsPage.getApprovedStatusByName('child2 of parent1'),
      (approvedStatus) => expect(approvedStatus).to.equal('true')
    ]);
  });
});
