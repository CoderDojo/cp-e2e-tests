var Page = require('./page');

function getDojoCard (name) {
  var selector = 'cd-expanding-card[main-title="' + name + '"]';
  return browser.waitForVisible(selector)
    .element(selector);
}

var MyDojosPage = Object.create(Page, {
  /**
   * define elements
   */
  getDojoCard: {
    value: function (name) {
      return getDojoCard(name);
    }
  },
  getListingLink: {
    value: function (name) {
      return getDojoCard(name).$('a[ui-sref^="dojo-detail"]');
    }
  },
  getManageUsersLink: {
    value: function (name) {
      return getDojoCard(name).$('a[ui-sref^="manage-dojo-users"]');
    }
  },
  getManageEventsLink: {
    value: function (name) {
      return getDojoCard(name).$('a[ui-sref^="manage-dojo-events"]');
    }
  },
  getEditLink: {
    value: function (name) {
      return getDojoCard(name).$('a[ui-sref^="edit-dojo"]');
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'dashboard/my-dojos');
    }
  }
});

module.exports = MyDojosPage;
