
module.exports = {
  'tags': ['joindojo'],

  before : function(browser) {
    // login
    browser.page.login().openPage();
    var home = browser.page.login();

    home.setValue('@email', browser.globals.champion1.login)
    .setValue('@password', browser.globals.champion1.password)
    .submit()
    .expect.element('@userName').text.to.equal(browser.globals.champion1.fullName);

    // open create dojo page
    browser.page.joindojo().openPage();
  },

  'Verify dojo': function(browser) {
    var registerPage = browser.page.joindojo();

    registerPage.expect.element('@emailAddress').to.be.present;
    registerPage.expect.element('@fullName').to.be.present;
    registerPage.expect.element('@dateOfBirth').to.be.present;
    registerPage.expect.element('@telephoneNumber').to.be.present;
    registerPage.expect.element('@selectCountry').to.be.present;
    registerPage.expect.element('@cityTown').to.be.present;
    registerPage.expect.element('@address').to.be.present;
    registerPage.expect.element('@locationFromAddress').to.be.present;
    registerPage.expect.element('@howDidYouHear').to.be.present;
    registerPage.expect.element('@submitButton').to.be.present;
  },

  'Create Dojo': function(browser) {
    var registerPage = browser.page.joindojo();

    registerPage.setDateOfBirth(browser, browser.globals.dojo1.dateOfBirth)
    .setValue('@telephoneNumber', browser.globals.dojo1.telephone)
    .selectCountry(browser, browser.globals.dojo1.country)
    .api.execute('angular.element("input[name=dateOfBirth]").val("'+ browser.globals.dojo1.dateOfBirth +'")');
    registerPage.selectCity(browser, browser.globals.dojo1.city)
    .setValue('@address', browser.globals.dojo1.address)
    .selectHowDidYouHear(browser, browser.globals.dojo1.howDidYouHear)
  },

  'Join Dojo': function(browser) {
  },

  'Remove Dojo': function(browser) {
  },

  'End Test': function(browser) {
    browser.end();
  },

  after : function(browser) {
  }
};
