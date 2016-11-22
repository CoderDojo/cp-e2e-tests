var Pagination = require('../pages/components/pagination');

browser.addCommand('nextPage', function (prefix) {
  Pagination.nextPage(prefix).click();
});

browser.addCommand('previousPage', function (prefix) {
  Pagination.previousPage(prefix).click();
});

browser.addCommand('firstPage', function (prefix) {
  Pagination.firstPage(prefix).click();
});

browser.addCommand('lastPage', function (prefix) {
  Pagination.lastPage(prefix).click();
});

browser.addCommand('goToPage', function (index, prefix) {
  Pagination.goToPage(index, prefix).click();
});
