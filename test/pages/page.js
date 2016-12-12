function Page () {}

Page.prototype.open = function (path) {
  path = path || '';
  path = path.indexOf('http') > -1 ? path : '/' + path;
  return browser.url(path)
  .setCookie({name: 'NG_TRANSLATE_LANG_KEY', value: '"en_US"'});
};

module.exports = Object.create(new Page(), {
  userMenu: {
    get: function () {
      return $('.cd-menu__profile').waitForVisible(5000)
      .then(function(){
        return $('.cd-menu__profile');
      });
    }
  },
  userMenu_login: {
    get: function () {
      var path = '.cd-menu__account a[href="/login"]';
      return $(path).waitForVisible().$(path);
    }
  },
  userMenu_register: {
    get: function () {
      return $('.cd-menu__account a[href="/register"]');
    }
  },
  userMenu_profileName: {
    get: function () {
      return $('.cd-menu__profile-name');
    }
  },
  userMenu_myProfile: {
    get: function () {
      return $('//*[contains(@class, "cd-menu__profile-menu")]//a[contains(text(), "My Profile")]');
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
  },
});
