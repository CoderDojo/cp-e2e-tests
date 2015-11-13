
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
    // .expect.element('@userName').text.to.equal(browser.globals.mentor1.name);

    // crash test simulation
    var myDojosUrl = browser.launch_url + '/dashboard/my-dojos';
    for (var i=0; i<30; i++) {
      home.navigate(myDojosUrl)
      .waitForElementVisible('@eventsView', 2000)
      .click('@eventsView')
      .api.pause(2000);

      home.navigate(myDojosUrl)
      .waitForElementVisible('@listingView', 2000)
      .click('@listingView')
      .api.pause(2000);

      home.navigate(myDojosUrl)
      .waitForElementVisible('@eventsView', 2000);
    }
  },

  'Logout Test': function(browser) {
  },

  after : function(browser) {
    browser.end();
  }
};
