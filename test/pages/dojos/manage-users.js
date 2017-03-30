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
  user: {
    value: function (name) {
      var xpath = '//cd-picture-grid//p[contains(@class, "cd-picture-grid__caption") and contains(text(), "' + name + '")]';
      return browser.waitForVisible(xpath)
      .then(function () {
        return $(xpath);
      });
    }
  },
  declineJoinRequest: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "decline")]/a//span';
      return browser.waitForVisible(xpath)
      .then(() => {
        return $(xpath);
      });
    }
  },
  acceptJoinRequest: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "accept")]/a//span';
      return browser.waitForVisible(xpath)
      .then(() => {
        return $(xpath);
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
  getPendingUsers: {
    get: function () {
      var xpath = '//li[@ui-sref="manage-dojo-pending-users"]';
      return browser.waitForVisible(xpath)
      .then(function () {
        return $(xpath);
      });
    }
  },
  getActiveUsers: {
    get: function () {
      var xpath = '//li[@ui-sref="manage-dojo-active-users"]';
      return browser.waitForVisible(xpath)
      .then(function () {
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
