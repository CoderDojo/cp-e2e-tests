var moment = require('moment');

browser.addCommand('selectTime', function (selector, time) {
  $(selector + ' input[ng-model="hours"]').setValue(moment(time).format('HH'));
  $(selector + ' input[ng-model="minutes"]').setValue(moment(time).format('mm'));
});
