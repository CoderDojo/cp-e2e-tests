var Pagination = Object.create({}, {

  nextPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page + 1")]]';
      $(xpath).waitForVisible();
      return $(xpath).$();
    }
  },
  previousPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page - 1")]]';
      $(xpath).waitForVisible();
      return $(xpath);
    }
  },
  firstPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(1")]]';
      $(xpath).waitForVisible();
      return $(xpath);
    }
  },
  lastPage: {
    get: function (prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(totalPages")]]';
      $(xpath).waitForVisible();
      return $(xpath);
    }
  },
  goToPage: {
    get: function (index, prefix) {
      var xpath = '//' + (prefix || '') + 'li[a[contains(@ng-click,"selectPage(page.number")]]';
      $(xpath).waitForVisible();
      return $(xpath);
    }
  }
});
module.exports = Pagination;
