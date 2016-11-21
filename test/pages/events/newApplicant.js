var Page = require('./page');

var LoginPage = Object.create(Page, {
  /**
   * define elements
   */
  email: {
    get: function () {
      return $('input[name="email"]');
    }
  },
  password: {
    get: function () {
      return $('input[name="password"]');
    }
  },
  submit: {
    get: function () {
      return $('input[value="Login"]');
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'login');
    }
  }
});

module.exports = LoginPage;
