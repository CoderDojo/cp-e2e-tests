var dojoCommands = {
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
  },

  selectCountry: function(client, countryName) {
    this.waitForElementVisible('@selectCountry', 1000)
      .click('@selectCountry')
      .api.pause(1000);
    this.api.keys([countryName, client.Keys.ENTER]);
    this.api.pause(1000);
    // .api.execute('angular.element("' + this.countrySelector + '").val("' + client.globals.dojo1.dateOfBirth + '")')

    return this;
  },

  selectCity: function(client, cityName) {
    this.waitForElementVisible('@cityTown', 1000)
      .click('@cityTown')
      .api.pause(1000);
    this.api.keys([cityName]);
    this.api.pause(1000);
    this.api.keys([client.Keys.ENTER]);
    this.api.pause(1000);

    return this;
  },

  setDateOfBirth: function(client, dateOfBirth) {
    this.waitForElementVisible('@dateOfBirth', 1000)
      .click('@dateOfBirth')
      .api.pause(1000);
    this.api.keys([dateOfBirth, client.Keys.ENTER]);
    this.api.pause(1000);

    return this;
  },

  selectHowDidYouHear: function(client, howDidYouHear) {
    this.waitForElementVisible('@howDidYouHear', 1000)
      .click('@howDidYouHear')
      .api.pause(1000);
    this.api.keys([howDidYouHear]);
    this.api.pause(1000);
    this.api.keys([client.Keys.ENTER]);
    this.api.pause(1000);

    return this;
  }
};

module.exports = {
  url: function() {
    return this.api.launchUrl + '/dashboard/start-dojo';
  },
  commands: [dojoCommands],
  elements: {
    emailAddress: { selector: 'input[name="emailAddress"]' },
    fullName: { selector: 'input[name="fullName"]' },
    dateOfBirth: { selector: 'input[name="dateOfBirth"]' },
    telephoneNumber: { selector: 'input[name="telephoneNumber"]' },
    selectCountry: { selector: 'div[placeholder="Select a country"] span' },
    cityTown: { selector: 'div[placeholder="Search for or enter your area"] span' },
    address: { selector: 'textarea[name="dojoAddress1"]' },
    locationFromAddress: { selector: 'input[value="Get location from address"]' },
    howDidYouHear: { selector: 'div[placeholder="Select an option"] span' },
    submitButton: { selector: '[type=submit]' }
  }
};
