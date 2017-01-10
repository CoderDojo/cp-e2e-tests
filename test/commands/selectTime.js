var moment = require('moment');

browser.addCommand('selectTime', function (selector, time) {
  return promiseSeries([
    () => browser.setValue(selector + ' input[ng-model="hours"]', moment(time).format('HH')),
    () => browser.setValue(selector + ' input[ng-model="minutes"]', moment(time).format('mm'))
  ]);
});
