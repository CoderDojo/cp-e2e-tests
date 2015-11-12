var loginCommands = {
  openPage: function() {
    this.navigate()
    .waitForElementVisible('body');
    return this;
  },

  submit: function() {
    this.waitForElementVisible('@submitButton', 1000)
      .click('@submitButton')
      .api.pause(1000);
    return this;
  }
};

module.exports = {
  url: function() {
    return this.api.launchUrl + '/login';
  },
  commands: [loginCommands],
  elements: {
    email: { selector: 'input[name="email"]' },
    password: { selector: 'input[name="password"]' },
    submitButton: { selector: '[type=submit]' },
    userName: {selector: 'a[ui-sref^="user-profile"]'}
  }
};
