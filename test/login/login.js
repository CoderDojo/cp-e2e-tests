
module.exports = {
  'tags': ['login'],

  before: function (browser) {
    browser.page.login().openPage();
  },

  'Mentor Login': function (browser) {
    var home = browser.page.login();

    home.setValue('@email', browser.globals.mentor1.login)
    .setValue('@password', browser.globals.mentor1.password)
    .submit()
    .expect.element('@userName').text.to.equal(browser.globals.mentor1.fullName);
  },

  'Multiple Clicks On User Name': function (browser) {
    console.log('DISABLED');
    var disabled = true;
    if (disabled) {
      return;
    }

    var myDojosUrl = browser.launch_url + '/dashboard/my-dojos';
    var home = browser.page.login();

    home.click('@userName');
    home.click('@userName');
    home.click('@userName');
    home.api.pause(1000);
    home.navigate(myDojosUrl)
    .waitForElementVisible('@eventsView', 1000);
  },

  'Show Dojos, Show Events, Dojo View Back and Forth': function (browser) {
    console.log('DISABLED');
    var disabled = true;
    if (disabled) {
      return;
    }

    var myDojosUrl = browser.launch_url + '/dashboard/my-dojos';
    var home = browser.page.login();
    for (var i = 0; i < 8; i++) {
      home.navigate(myDojosUrl)
      .waitForElementVisible('@eventsView', 1000)
      .click('@eventsView')
      .api.pause(1000);

      home.navigate(myDojosUrl)
      .waitForElementVisible('@listingView', 1000)
      .click('@listingView')
      .api.pause(1000);

      home.navigate(myDojosUrl)
      .waitForElementVisible('@eventsView', 1000);
    }
  },

  after: function (browser) {
    browser.end();
  }
};
