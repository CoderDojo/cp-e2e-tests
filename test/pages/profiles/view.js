var Page = require('../page');
var WAIT_TIME = 5000;


var Profile = Object.create(Page, {
  name: {
    get: function () {
      var path = '.cd-profile__username h2';
      return $(path);
    }
  },
  nick: {
    get: function () {
      var path = '.cd-profile__username .cd-profile__alias';
      return browser.waitForVisible(path).$(path);
    }
  },
  badges: {
    get: function () {
      var xpath = '//div[@class="profile-section"]/h3[a[@id="badges"]]';
      return browser.waitForVisible(xpath).$(xpath);
    }
  },
  children: {
    get: function () {
      var xpath = '//div[@class="profile-section"]/h3[a[@id="youths"]]';
      return browser.waitForVisible(xpath).$(xpath);
    }
  },
  parents: {
    get: function () {
      var xpath = '//h3[a[@id="parents"]]';
      return browser.waitForVisible(xpath).$(xpath);
    }
  },
  dojos: {
    get: function () {
      var xpath = '//div[@class="profile-section"]/h3[a[@id="dojos"]]';
      return browser.waitForVisible(xpath).$(xpath);
    }
  },
  email: {
    get: function (name) {
      var path = 'button[title="email"]';
      return browser.waitForVisible(path).$(path);
    }
  },
  open: {
    value: function (userId) {
      return Page.open.call(this, 'profile/' + userId);
    }
  }
});

module.exports = Profile;
