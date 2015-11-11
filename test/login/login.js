
module.exports = {
  'tags': ['login'],

  before : function(browser) {
    browser.page.login().openPage();
  },

  'Login Test': function (browser) {
    var home = browser.page.login();

    home.setValue('@email', 'test@test.com')
    .setValue('@password', 'test')
    .submit();
  },

  'Logout Test': function(browser) {
  },

  after : function(browser) {
    browser.end();
  }
};
