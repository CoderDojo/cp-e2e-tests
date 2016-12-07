var Page = require('../page');

var ManageEventsPage = Object.create(Page, {
  /**
   * define elements
   */
  getEventLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-applications") and contains(text(), "' + name + '")]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getDate: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[2]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getCapacity: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[3]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getApplicants: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[4]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getAttending: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[5]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getStatus: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[6]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getEditLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "edit-dojo-event")]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getManageApplicationsLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-applications" and not(contains(text(), "' + name + '")))]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  getCancelButton: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/button[contains(@class, "btn-danger")]';
      return browser.waitForVisible(xpath)
        .element(xpath);
    }
  },
  createEventButton: {
    get: function () {
      var selector = '.btn-primary';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/my-dojos');
    }
  }
});

module.exports = ManageEventsPage;
