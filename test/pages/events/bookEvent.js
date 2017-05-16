var Page = require('../page');

var BookEventPage = Object.create(Page, {
  /**
   * define elements
   */
  OKButton: {
    get: function () {
      var xpath = '//button[contains(text(), "OK")]';
      return browser.waitForVisible(xpath, 2000).then(function() {
        return $(xpath);
      });
    }
  },
  bookEventButton: {
    get: function () {
      var path = 'button[class="btn btn-block btn-secondary ng-scope"]';
      return browser.waitForVisible(path, 2000).then(function() {
        return $(path);
      });
    }
  },
  selectApplicantsButton: {
    get: function () {
      var path = 'button[class="dropdown-toggle ng-binding btn btn-primary btn-block"]';
      return browser.waitForVisible(path, 2000).then(function() {
        return $(path);
      });
    }
  },
  bookTicketsButton: {
    get: function () {
      var path = 'button[class="btn btn-primary"]';
      return browser.waitForVisible(path, 2000).then(function() {
        return $(path);
      });
    }
  },
  familyMemberOption: {
    value: function(name) {
      var xpath = '//a[contains(text(), "' + name + '")]';
      return browser.waitForVisible(xpath, 2000).then(function() {
        return $(xpath);
      });
    }
  }
});

module.exports = BookEventPage;
