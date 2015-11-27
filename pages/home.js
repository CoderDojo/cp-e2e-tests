var searchCommands = {
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
  commands: [searchCommands],
  elements: {
    searchBar: { selector: 'input[ng-model="search.dojo"]' },
    submitButton: { selector: '[type=submit]' }
  }
};
