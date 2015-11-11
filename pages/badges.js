var searchCommands = {
  openPage: function(url) {
    this.navigate(url)
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
    return this.api.launchUrl + '/register';
  },
  commands: [searchCommands],
  elements: {
    fullName: { selector: 'input[name="fullName"]' },
    emailAddress: { selector: 'input[name="emailAddress"]' },
    password: { selector: 'input[name="password"]' },
    passConfirmField: { selector: 'input[name="passConfirmField"]' },
    userType: { selector: 'input[placeholder="Select user type"]' },
    mailingListCheckbox: { selector: 'input[id="mailingListCheckbox"]' },
    termsAndConditionsCheckbox: { selector: 'input[id="termsAndConditionsCheckbox"]' },
    submitButton: { selector: '[type=submit]' }
  }
};
