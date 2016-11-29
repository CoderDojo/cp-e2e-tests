var Page = require('../page');
var WAIT_TIME = 5000;

var MyEventsPage = Object.create(Page, {
  /**
   * define elements
   */
  getEventRow: {
    value: function (eventName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getEventDate: {
    value: function (eventName) {
      var xpath = '(//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/td)[2]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getEventType: {
    value: function (eventName) {
      var xpath = '(//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/td)[3]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getSessionDescription: {
    value: function (eventName, sessionName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/following-sibling::tr//*[@ng-bind="::session.name" and text()="' + sessionName + '"]/following-sibling::p[@ng-bind-html="::session.description"]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getSessionTickets: {
    value: function (eventName, sessionName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/following-sibling::tr//*[@ng-bind="::session.name" and text()="' + sessionName + '"]/following-sibling::div//p[@ng-bind="::ticket.name"]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $$(xpath);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/dojos/events/user-events');
    }
  }
});

module.exports = MyEventsPage;
