var Page = require('../page');
var WAIT_TIME = 5000;


var Profile = Object.create(Page, {
  name: {
    get: function (name) {
      var path = '.cd-profile__username h2';
      $(path).waitForVisible(WAIT_TIME);
      return $(path);
    }
  },
  badges: {
    get: function (name) {
      var path = 'badges-list';
      $(path).waitForVisible(WAIT_TIME);
      return $(path);
    }
  },
});

module.exports = Profile;
