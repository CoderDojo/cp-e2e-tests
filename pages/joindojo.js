var dojoCommands = {
  openPage: function () {
    this.navigate()
    .waitForElementVisible('body');
    return this;
  },

  submit: function () {
    this.waitForElementVisible('@submitButton')
      .click('@submitButton')
      .api.pause(1000);
    return this;
  },

  confirmFormSubmit: function () {
    this.waitForElementVisible('@confirmButton')
      .click('@confirmButton')
      .api.pause(1000);
    return this;
  },

  charterSubmit: function () {
    this.waitForElementVisible('@charterConfirmButton')
      .click('@charterConfirmButton')
      .api.pause(1000);
    return this;
  },

  selectCountry: function (client, countryName) {
    this.waitForElementVisible('@selectCountry')
      .click('@selectCountry')
      .api.pause(1000);
    this.api.keys([countryName, client.Keys.ENTER]);
    this.api.pause(1000);
    return this;
  },

  selectCity: function (client, cityName) {
    this.waitForElementVisible('@cityTown')
      .click('@cityTown')
      .api.pause(1000);
    this.api.keys([cityName]);
    this.api.pause(1000);
    this.api.keys([client.Keys.ENTER]);
    this.api.pause(1000);
    return this;
  },

  setDateOfBirth: function (client, dateOfBirth) {
    this.waitForElementVisible('@dateOfBirth')
      .click('@dateOfBirth')
      .api.pause(1000);
    this.api.keys([client.Keys.ENTER]).pause(1000);
    this.api.keys([client.Keys.ENTER]).pause(1000);
    this.api.keys([client.Keys.ENTER]).pause(1000);
    this.api.execute('angular.element("input[name=dateOfBirth]").val("' + dateOfBirth + '")');
    this.api.pause(1000);

    return this;
  },

  selectHowDidYouHear: function (client, howDidYouHear) {
    this.waitForElementVisible('@howDidYouHear')
      .click('@howDidYouHear')
      .api.pause(1000);
    this.api.keys([howDidYouHear]);
    this.api.pause(1000);
    this.api.keys([client.Keys.ENTER]);
    this.api.pause(1000);

    return this;
  },

  charterCheckBoxCheck: function () {
    this.click('@charterCheckBox')
      .api.pause(1000);

    return this;
  }
};

module.exports = {
  url: function () {
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
    submitButton: { selector: '[type=submit]' },
    confirmButton: { selector: 'button[ng-click="ok()"]' },
    fullNameCharter: {selector: '#agreedToBy'},
    charterCheckBox: {selector: '#agreeToCharterCheckbox'},
    charterConfirmButton: {selector: 'button[type="submit"]:not([ng-click])'}
  }
};
