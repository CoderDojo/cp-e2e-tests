function Page () {}

Page.prototype.open = function (path) {
  path = path || '';
  path = path.indexOf('http') > -1 ? path : '/' + path;
  return browser.url(path)
    .setCookie({name: 'NG_TRANSLATE_LANG_KEY', value: '"en_US"'})
    .setCookie({name: 'cookieDisclaimer', value: '"confirmed"'});
};

module.exports = Object.create(new Page(), {
  userMenu: {
    get: function () {
      var selector = '.cd-menu__profile';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  userMenu_login: {
    get: function () {
      var selector = '.cd-menu__account a[href="/login"]';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  userMenu_register: {
    get: function () {
      var selector = '.cd-menu__account a[href="/register"]';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  userMenu_profileName: {
    get: function () {
      var selector = '.cd-menu__profile-name';
      return browser.waitForVisible(selector)
        .element(selector);
    }
  },
  userMenu_myProfile: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Profile")]');
    }
  },
  userMenu_viewProfileLink: {
    get: function () {
      return browser.getAttribute('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Profile")]', 'href').then(function (href) {
        return href[0].replace('/dashboard', '').replace('/edit', '');
      });
    }
  },
  userMenu_myDojos: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Dojos")]');
    }
  },
  userMenu_myEvents: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Events")]');
    }
  },
  userMenu_myChildren: {
    get: function () {
      var selector = '//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Children")]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  userMenu_elearning: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "E-learning")]');
    }
  },
  userMenu_manageDojos: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "Manage Dojos")]');
    }
  },
  userMenu_badgekit: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "Badgekit")]');
    }
  },
  userMenu_stats: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "Stats")]');
    }
  },
  userMenu_logout: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "Logout")]');
    }
  },
  login: {
    value: function (email, password) {
      return browser.login(email, password);
    }
  }
});
