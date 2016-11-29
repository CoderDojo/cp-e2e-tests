var Page = require('../page');
var WAIT_TIME = 5000;

var Pagination = Object.create({},{

  nextPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page + 1")]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath).$();
    }
  },
  previousPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page - 1")]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  firstPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(1")]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  lastPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(totalPages")]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  goToPage: {
    get: function (index, prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page.number")]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  }
});
module.exports = Pagination;
