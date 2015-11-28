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

  confirmFormSubmit: function (buttonSelector) {
    this.waitForElementVisible(buttonSelector)
      .click(buttonSelector)
      .api.pause(1000);
    return this;
  },

  charterSubmit: function () {
    this.waitForElementVisible('@charterConfirmButton')
      .click('@charterConfirmButton')
      .api.pause(1000);
    return this;
  },

  selectCountry: function (selector, client, countryName) {
    this.waitForElementVisible(selector)
      .click(selector)
      .api.pause(1000);
    this.api.keys([countryName, client.Keys.ENTER]);
    this.api.pause(1000);
    return this;
  },

  selectCombo: function (selector, client, countryName) {
    this.waitForElementVisible(selector)
      .click(selector)
      .api.pause(1000);
    this.api.keys([countryName]);
    this.api.pause(3000);
    this.waitForElementVisible('@comboChoicesVisible');
    this.click('@comboChoicesVisible');
    this.api.keys([client.keys.ENTER]);
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

  checkboxCheck: function (checkBoxSelector) {
    this.waitForElementVisible(checkBoxSelector)
      .click(checkBoxSelector)
      .api.pause(1000);

    return this;
  },

  selectGroup: function (groupName) {
    this.click(groupName)
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
    charterConfirmButton: {selector: 'button[type="submit"]:not([ng-click])'},
    gatherTeamGroup: {selector: 'div[id="accordion"] > div:nth-child(1)'},
    gatherTeamCheckbox: {selector: 'label[for="findTechnicalMentors"]'},
    gatherTeam: {selector: 'input[name="findTechnicalMentors-text"]'},
    findVenueGroup: {selector: 'div[id="accordion"] > div:nth-child(2)'},
    findVenueCheckbox: {selector: 'label[for="locateVenue"]'},
    findVenue: {selector: 'input[name="locateVenue-text"]'},
    planDojoGroup: {selector: 'div[id="accordion"] > div:nth-child(3)'},
    planDojoCheckbox: {selector: 'label[for="setDojoDateAndTime"]'},
    planDojo: {selector: 'input[name="setDojoDateAndTime-text"]'},
    promoteDojoGroup: {selector: 'div[id="accordion"] > div:nth-child(4)'},
    promoteDojo: {selector: 'label[for="setDojoEmailAddress"]'},
    embodyEthosGroup: {selector: 'div[id="accordion"] > div:nth-child(5)'},
    embodyEthos: {selector: 'label[for="embodyCoderDojoTao"]'},
    saveDojoSetupButton: {selector: 'button[ng-click="openAllSteps(this)"]'},

    dojoName: {selector: 'input[name="dojoName"]'},
    dojoEmail: {selector: 'input[name="dojoEmail"]'},
    dojoCountry: {selector: 'div[placeholder="Select a country"]'},
    dojoCity: {selector: 'div[placeholder="Search for or enter your area"]'},
    dojoAddress: {selector: 'textarea[name="dojoAddress1"]'},
    comboChoicesVisible: {selector: 'div[id^="ui-select-choices-row"]'},
    createDojoButton: {selector: 'button[ng-click="scrollToInvalid(createDojoForm)"]'}
  }
};
