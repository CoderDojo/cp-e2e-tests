var Page = require('../page');

var ManageApplicationsPage = Object.create(Page, {
  /**
   * define elements
   */

  page: {
    get: function () {
      var selector = '.manage-event-applicants';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  totalEventCapacity: {
    get: function () {
      return $('//span[b[contains(text(), "Total event capacity:")]]/text()');
    }
  },
  totalAttending: {
    get: function () {
      return $('//span[b[contains(text(), "Total attending:")]]/text()');
    }
  },
  totalWaitlist: {
    get: function () {
      return $('//span[b[contains(text(), "Total waitlist:")]]/text()');
    }
  },
  editEventButton: {
    get: function () {
      return $('a[ui-sref^="edit-dojo-event"]');
    }
  },
  exportToCsvButton: {
    get: function () {
      return $('//button[contains(text(), "Export to CSV")]');
    }
  },
  exportGuestListButton: {
    get: function () {
      return $('//button[contains(text(), "Export to CSV")]/following-sibling::ul//a[contains(text(), "Export Guest List")]');
    }
  },
  exportWaitingListButton: {
    get: function () {
      return $('//button[contains(text(), "Export to CSV")]/following-sibling::ul//a[contains(text(), "Export Waiting List")]');
    }
  },
  exportFullListButton: {
    get: function () {
      return $('//button[contains(text(), "Export to CSV")]/following-sibling::ul//a[contains(text(), "Export Full List")]');
    }
  },
  setSearchTicketType: {
    value: function (ticketType) {
      return browser.uiSelectFilterAndSelect('ticketTypeFilter', ticketType, ticketType);
    }
  },
  getSessionCapacity: {
    value: function (sessionName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//span[b[contains(text(), "Session capacity:")]]/text()');
    }
  },
  getSessionAttending: {
    value: function (sessionName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//span[b[contains(text(), "Attending:")]]/text()');
    }
  },
  getSessionWaitlist: {
    value: function (sessionName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//span[b[contains(text(), "Waitlist:")]]/text()');
    }
  },
  getNewApplicantButton: {
    value: function (sessionName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//button[contains(text(), "New Applicant")]');
    }
  },
  getCancelEventButton: {
    value: function (sessionName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//button[contains(text(), "Cancel Event")]');
    }
  },
  getAttendeeTicketName: {
    value: function (sessionName, attendeeName) {
      return $('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[2]');
    }
  },
  getAttendeeTicketType: {
    value: function (sessionName, attendeeName) {
      return $('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[3]');
    }
  },
  getAttendeeApplicationDate: {
    value: function (sessionName, attendeeName) {
      return $('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[4]');
    }
  },
  getAttendeeAge: {
    value: function (sessionName, attendeeName) {
      return $('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[5]');
    }
  },
  getAttendeeParents: {
    value: function (sessionName, attendeeName) {
      return $$('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[6]//a');
    }
  },
  getAttendeeNotes: {
    value: function (sessionName, attendeeName) {
      return $('(//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]/td)[7]');
    }
  },
  getAttendeeApproveCheckbox: {
    value: function (sessionName, attendeeName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]//input[@name="applicationApproved"]');
    }
  },
  getAttendeeCheckinCheckbox: {
    value: function (sessionName, attendeeName) {
      return $('//uib-accordion[//span[@uib-accordion-header]/span[contains(text(), "' + sessionName + '")]]//tbody/tr[td//*[contains(text(), "' + attendeeName + '")]]//input[contains(@id, "checkInCheckbox")]');
    }
  },
  open: {
    value: function () {
      return Page.open.call(this);
    }
  }
});

module.exports = ManageApplicationsPage;
