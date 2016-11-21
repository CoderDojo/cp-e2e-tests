var Page = require('../page');
var WAIT_TIME = 5000;

var ManageEventsPage = Object.create(Page, {
  /**
   * define elements
   */
  getEventLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-applications") and contains(text(), "' + name + '")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getDate: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[2]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getCapacity: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[3]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getApplicants: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[4]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getAttending: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[5]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getStatus: {
    value: function (name) {
      var xpath = '(//tbody/tr[td/a[contains(text(), "' + name + '")]]/td)[6]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getEditLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "edit-dojo-event")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getManageApplicationsLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-applications" and not(contains(text(), "' + name + '")))]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getCancelButton: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/button[contains(@class, "btn-danger")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/my-dojos');
    }
  }
});

module.exports = ManageEventsPage;
