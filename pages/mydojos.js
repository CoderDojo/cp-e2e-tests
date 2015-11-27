var myDojosCommands = {
  openPage: function (url) {
    this.navigate(url)
    .waitForElementVisible('body');
    return this;
  },
  submit: function () {
    this.waitForElementVisible('@submitButton', 1000)
      .click('@submitButton')
      .api.pause(1000);
    return this;
  }
};

module.exports = {
  url: function () {
    return this.api.launchUrl + '/dashboard/my-dojos';
  },
  commands: [myDojosCommands],
  elements: {
    submitButton: { selector: '[type=submit]' }
  }
};
