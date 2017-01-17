var Page = require('../page');

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
      return $(path);
    }
  },
  badges: {
    get: function () {
      var xpath = '//div[@class="profile-section"]/h3[a[@id="badges"]]';
      return $(xpath);
    }
  },
  children: {
    get: function () {
      var xpath = '//div[@class="profile-section"]//h3[a[@id="youths"]]';
      return $(xpath);
    }
  },
  childrenList: {
    get: function () {
      return $('//div[@class="profile-section" and div/h3[a[@id="youths"]]]//a[contains(@class, "cd-picture-grid__item")]');
    }
  },
  parents: {
    get: function () {
      var xpath = '//h3[a[@id="parents"]]';
      return $(xpath);
    }
  },
  dojos: {
    get: function () {
      var xpath = '//div[@class="profile-section"]/h3[a[@id="dojos"]]';
      return $(xpath);
    }
  },
  email: {
    get: function () {
      var path = 'button[title="email"]';
      return $(path);
    }
  },
  config: {
    get: function () {
      var selector = 'button#cd-dojo-action';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  editUser: {
    get: function () {
      var selector = '//a[contains(@ui-sref, "edit-user-profile")]';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  open: {
    value: function (userId) {
      return Page.open.call(this, 'profile/' + userId);
    }
  }
});

module.exports = Profile;
