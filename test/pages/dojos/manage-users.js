var Page = require('../page');

var DojoUsers = Object.create(Page, {
  /**
   * define elements
   */
  users: {
    get: function () {
      var path = 'cd-picture-grid p.cd-picture-grid__caption';
      return browser.waitForVisible(path)
      .then(function () {
        return browser.elements(path);
      });
    }
  },
  profileLink: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "viewProfile")]/a';
      return browser.waitForVisible(xpath)
      .then(() => {
        return $(xpath);
      });
    }
  },
  open: {
    value: function (dojoId) {
      return Page.open.call(this, 'dashboard/dojos/' + dojoId);
    }
  }
});

module.exports = DojoUsers;
