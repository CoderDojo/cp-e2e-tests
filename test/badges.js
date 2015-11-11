
module.exports = {
  'tags': ['badges'],

  before : function(browser) {
    browser.page.badges().openPage();
  },

  'Register Page ready': function(browser) {
    var registerPage = browser.page.badges();

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
    console.log('remove the 2 accounts');
  }
};
