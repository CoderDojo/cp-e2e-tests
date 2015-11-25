
module.exports = {
  'tags': ['register'],

  before : function(browser) {
    browser.page.register().openPage();
  },

  'Register page ready': function(browser) {
    var registerPage = browser.page.register();

    registerPage.expect.element('@fullName').to.be.present;
    registerPage.expect.element('@emailAddress').to.be.present;
    registerPage.expect.element('@password').to.be.present;
    registerPage.expect.element('@passConfirmField').to.be.present;
    registerPage.expect.element('@userType').to.be.present;
    registerPage.expect.element('@mailingListCheckbox').to.be.present;
    registerPage.expect.element('@termsAndConditionsCheckbox').to.be.present;
    registerPage.expect.element('@submitButton').to.be.present;

    registerPage.setValue('@fullName', 'test full name');
  },

  'End Test': function(browser) {
    browser.end();
  },

  after : function(browser) {
  }
};
