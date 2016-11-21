var Page = require('./page');
var WAIT_TIME = 5000;

var MyDojosPage = Object.create(Page, {
  /**
   * define elements
   */
  getListingLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "dojo-detail") and contains(text(), "' + name + '"))]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getManageUsersLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-dojo-users")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getManageEventsLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "manage-dojo-events")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getListingViewLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "dojo-detail") and not(contains(text(), "' + name + '")))]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  getEditLink: {
    value: function (name) {
      var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]/td/a[contains(@ui-sref, "edit-dojo")]';
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

module.exports = MyDojosPage;
