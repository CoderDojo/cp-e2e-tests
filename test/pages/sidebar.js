var Page = require('./page');

var SidebarPage = Object.create(Page, {
  /**
   * define elements
   */
  tabs: {
    get: function () {
      var selector = '.cd-sidebar__tab';
      return browser.waitForVisible(selector)
        .elements(selector);
    }
  },
  getTabTitleByElementId: {
    value: function (tabElId) {
      return browser.elementIdElement(tabElId, '.cd-sidebar__tab-title');
    }
  },
  getTabSubTitleByElementId: {
    value: function (tabElId) {
      return browser.elementIdElement(tabElId, '.cd-sidebar__tab-sub-title');
    }
  },
  getTabByTitle: {
    value: function (title) {
      var selector = '//a[contains(@class, "cd-sidebar__tab") and .//span[contains(@class, "cd-sidebar__tab-title") and contains(text(), "' + title + '")]]';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  open: {
    value: function (path) {
      return Page.open.call(this, path);
    }
  }
});

module.exports = SidebarPage;
