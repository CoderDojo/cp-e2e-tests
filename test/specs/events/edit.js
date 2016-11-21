var MainPage = require('../../pages/page');
var EditEventPage = require('../../pages/events/edit');
var MyDojosPage = require('../../pages/myDojos');
var ManageEventsPage = require('../../pages/events/manage');

describe('Edit event', function () {
  this.timeout(120000);

  afterEach(function () {
    browser.deleteCookie();
  });

  it('Edit event', function () {
    process.emit('allure:addLabel', {
      label: 'asdf',
      value: 'qwer'
    });
    MainPage.open();
    MainPage.login('daniel@coderdojo.org', 'test');
    MainPage.userMenu.click();
    MainPage.userMenu_myDojos.click();
    MyDojosPage.getManageEventsLink('Dublin Docklands @ CHQ').click();
    ManageEventsPage.getEditLink('Docklands Dojo Dojo (5th)').click();
    EditEventPage.eventTicketsCard.click();
    EditEventPage.getSessionNameInput().setValue('My Session Name');
    EditEventPage.getSessionDescriptionInput().setValue('My Session Description');
    EditEventPage.addSessionButton.click();
    EditEventPage.getSessionNameInput(1).setValue('My Other Session Name');
    EditEventPage.getSessionDescriptionInput(1).setValue('My Other Session Description');
  });
});
