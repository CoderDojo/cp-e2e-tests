var Page = require('../page');

var MyEventsPage = Object.create(Page, {
  /**
   * define elements
   */
  getEventRow: {
    value: function (eventName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getEventDate: {
    value: function (eventName) {
      var xpath = '(//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/td)[2]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getEventType: {
    value: function (eventName) {
      var xpath = '(//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/td)[3]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getSessionDescription: {
    value: function (eventName, sessionName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/following-sibling::tr//*[@ng-bind="::session.name" and text()="' + sessionName + '"]/following-sibling::p[@ng-bind-html="::session.description"]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getSessionTickets: {
    value: function (eventName, sessionName) {
      var xpath = '//tr[contains(@class, "event-info-row") and td[text()="' + eventName + '"]]/following-sibling::tr//*[@ng-bind="::session.name" and text()="' + sessionName + '"]/following-sibling::div//p[@ng-bind="::ticket.name"]';
      return browser.waitForVisible(xpath)
        .elements(xpath);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/dojos/events/user-events');
    }
  }
});

module.exports = MyEventsPage;
