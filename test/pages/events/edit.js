var Page = require('../page');

var EditEventPage = Object.create(Page, {
  /**
   * define elements
   */
  copyEventDetails: {
    value: function (eventName) {
      return browser.uiSelectFilterAndSelect('dupEventPicker', eventName, eventName);
    }
  },
  eventDetailsCard: {
    get: function () {
      var selector = 'cd-expanding-card[main-title="Event Details"] .cd-expanding-card';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  eventName: {
    get: function () {
      return $('input[name="event-name"]');
    }
  },
  setEventDescription: {
    value: function (text) {
      return browser.insertIntoCkEditor('#description ~ #cke_description iframe', text);
    }
  },
  eventDescription: {
    get: function () {
      return $('#description');
    }
  },
  recurringRadioButton: {
    get: function () {
      return $('input#recurring');
    }
  },
  oneOffRadioButton: {
    get: function () {
      return $('input#one-off');
    }
  },
  setFromDate: {
    value: function (date) {
      return browser.selectDate('fromDate', date);
    }
  },
  setToDate: {
    value: function (date) {
      return browser.selectDate('toDate', date);
    }
  },
  setStartTime: {
    value: function (time) {
      return browser.selectTime('#start-time', time);
    }
  },
  setEndTime: {
    value: function (time) {
      return browser.selectTime('[name="endTime"]', time);
    }
  },
  setRecurringDay: {
    value: function (day) {
      return browser.uiSelectFilterAndSelect('weekday', day, day);
    }
  },
  weeklyRadioButton: {
    get: function () {
      return $('input[name="recurringType"][value="weekly"]');
    }
  },
  biweeklyRadioButton: {
    get: function () {
      return $('input[name="recurringType"][value="biweekly"]');
    }
  },
  setCity: {
    value: function (city) {
      return browser.uiSelectFilterAndSelect('city', city, city);
    }
  },
  address: {
    value: function () {
      return $('textarea[name="address"]');
    }
  },
  eventTicketsCard: {
    get: function () {
      var selector = 'cd-expanding-card[main-title="Event Tickets"] .cd-expanding-card';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  addSessionButton: {
    get: function () {
      return $('.session-expand-button');
    }
  },
  getRemoveSessionButton: {
    value: function (index) {
      index = index || 0;
      return $('ticket-box:nth-of-type(' + (index + 1) + ') button[ng-bootbox-confirm-action="removeSession($index)"]');
    }
  },
  getSessionNameInput: {
    value: function (index) {
      index = index || 0;
      return $('.ticket-box:nth-of-type(' + (index + 1) + ') .session-name');
    }
  },
  getSessionDescriptionInput: {
    value: function (index) {
      index = index || 0;
      return $('.ticket-box:nth-of-type(' + (index + 1) + ') textarea[ng-model="session.description"]');
    }
  },
  getTicketNameInput: {
    value: function (sessionIndex, ticketIndex) {
      sessionIndex = sessionIndex || 0;
      ticketIndex = ticketIndex || 0;
      return $('[name="session-' + sessionIndex + '-ticketName-' + ticketIndex + '"]');
    }
  },
  setTicketUserType: {
    value: function (sessionIndex, ticketIndex, ticketType) {
      sessionIndex = sessionIndex || 0;
      ticketIndex = ticketIndex || 0;
      return browser.uiSelectFilterAndSelect('session-' + sessionIndex + '-ticketUserType-' + ticketIndex, ticketType, ticketType, false);
    }
  },
  getTicketQuantityInput: {
    value: function (sessionIndex, ticketIndex) {
      sessionIndex = sessionIndex || 0;
      ticketIndex = ticketIndex || 0;
      return $('[name="session-' + sessionIndex + '-ticketQuantity-' + ticketIndex + '"]');
    }
  },
  getAddTicketButton: {
    value: function (sessionIndex) {
      sessionIndex = sessionIndex || 0;
      return $('.ticket-box:nth-of-type(' + (sessionIndex + 1) + ') button[ng-click="addTicket(session)"]');
    }
  },
  isPublicCheckbox: {
    get: function () {
      return $('input#is-public');
    }
  },
  ticketApprovalCheckbox: {
    get: function () {
      return $('input#ticketApproval');
    }
  },
  publish: {
    get: function () {
      return $('.btn-toolbar .btn-success');
    }
  },
  saveDraft: {
    get: function () {
      return $('.btn-toolbar .btn-secondary');
    }
  },
  cancel: {
    get: function () {
      return $('.btn-toolbar .btn-danger');
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/dojo/358784b6-79e2-4e43-80a4-792da79f5418/event-form/ab1b8f0a-957c-4d32-85a6-91b4dcc337ca');
    }
  }
});

module.exports = EditEventPage;
