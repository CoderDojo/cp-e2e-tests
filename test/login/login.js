
module.exports = {
  'tags': ['login'],

  before : function(browser) {
    browser.page.login().openPage();
  },

  'Login Test': function (browser) {
    var home = browser.page.login();

    home.setValue('@email', browser.globals.mentor1.login)
    .setValue('@password', browser.globals.mentor1.password)
    .submit()
    .expect.element('@userName').text.to.equal(browser.globals.mentor1.name);
  },

  'Logout Test': function(browser) {
  },

  after : function(browser) {
    browser.end();
  }
};
