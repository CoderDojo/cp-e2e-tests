var Page = require('../page');

function getEventCard (eventName) {
  var xpath = '//cd-event-list-item[.//h5[text()="' + eventName + '"]]';
  return browser.waitForVisible(xpath)
    .element(xpath);
}

var ViewDojoPage = Object.create(Page, {
  /**
   * define elements
   */
  firstEventCard: {
    get: function () {
      var selector = 'cd-event-list-item';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  getEventCard: {
    value: function (eventName) {
      return getEventCard(eventName);
    }
  },
  getEventAddress: {
    value: function (eventName) {
      return getEventCard(eventName).$('p[ng-bind="::cdELI.event.address"]');
    }
  },
  getEventCity: {
    value: function (eventName) {
      return getEventCard(eventName).$('p[ng-bind="::cdELI.event.city.nameWithHierarchy"]');
    }
  },
  getEventDescription: {
    value: function (eventName) {
      return getEventCard(eventName).$('div[ng-bind-html="::cdELI.event.description"]');
    }
  },
  getEventDate: {
    value: function (eventName) {
      return getEventCard(eventName).$('div[ng-bind="::cdELI.event.formattedStartDate"]');
    }
  },
  getEventStartTime: {
    value: function (eventName) {
      return getEventCard(eventName).$('span[ng-bind="::cdELI.event.formattedStartTime"]');
    }
  },
  getEventEndTime: {
    value: function (eventName) {
      return getEventCard(eventName).$('span[ng-bind="::cdELI.event.formattedEndTime"]');
    }
  },
  getEventBookButton: {
    value: function (eventName) {
      return getEventCard(eventName).$('div[class="cd-event-list-item__link"] > a');
    }
  },
  open: {
    value: function (slug) {
      return Page.open.call(this, 'dojo/' + slug);
    }
  }
});

module.exports = ViewDojoPage;
