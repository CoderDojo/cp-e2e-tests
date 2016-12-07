var Page = require('./page');

function getDojoRow (name) {
  var xpath = '//tbody/tr[td/a[contains(text(), "' + name + '")]]';
  return browser.waitForVisible(xpath)
    .element(xpath);
}

var MyDojosPage = Object.create(Page, {
  /**
   * define elements
   */
  getDojoRow: {
    value: function (name) {
      return getDojoRow(name);
    }
  },
  getListingLink: {
    value: function (name) {
      return getDojoRow(name).$('a[ui-sref^="dojo-detail"][ng-bind-html="myDojo.name"]');
    }
  },
  getManageUsersLink: {
    value: function (name) {
      return getDojoRow(name).$('a[ui-sref^="manage-dojo-users"]');
    }
  },
  getManageEventsLink: {
    value: function (name) {
      return getDojoRow(name).$('a[ui-sref^="manage-dojo-events"]');
    }
  },
  getListingViewLink: {
    value: function (name) {
      return getDojoRow(name).$('//a[starts-with(@ui-sref, "dojo-detail") and not(text()="' + name + '")]');
    }
  },
  getEditLink: {
    value: function (name) {
      return getDojoRow(name).$('a[ui-sref^="edit-dojo"]');
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/my-dojos');
    }
  }
});

module.exports = MyDojosPage;
