var Page = require('./page');

var ResetPasswordPage = Object.create(Page, {
  /**
   * define elements
   */
  email: {
    get: function () {
      return $('form[name="forgotPasswordForm"] input[type="email"]');
    }
  },
  submit: {
    get: function () {
      return $('form[name="forgotPasswordForm"] input[type="submit"]');
    }
  },
  confirmationMessage: {
    get: function () {
      var selector = '.atomic-notify .body p';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'login');
    }
  }
});

module.exports = ResetPasswordPage;
