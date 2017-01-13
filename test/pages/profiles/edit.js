var Page = require('../page');

var Profile = Object.create(Page, {
  private: {
    get: function () {
      var selector = '//*[contains(@class, "form-group") and div/input[@id="privateProfile-yes"] and div/input[@id="privateProfile-no"]]';
      // var selector = 'input[name="privateProfile"]';
      return $(selector);
    }
  },
  open: {
    value: function (userId) {
      return Page.open.call(this, 'profile/' + userId + '/edit');
    }
  }
});

module.exports = Profile;
