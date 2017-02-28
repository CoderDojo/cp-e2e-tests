var Page = require('./page');

var RegisterPage = Object.create(Page, {
  /**
   * define elements
   */
  firstName: {
    get: function () {
      return browser.element('input[name="firstName"]');
    }
  },
  surname: {
    get: function () {
      return browser.element('input[name="surname"]');
    }
  },
  emailAddress: {
    get: function () {
      return browser.element('input[name="emailAddress"]');
    }
  },
  password: {
    get: function () {
      return browser.element('input[name="password"]');
    }
  },
  passwordConfirm: {
    get: function () {
      return browser.element('input[name="passConfirmField"]');
    }
  },
  termsAndConditions: {
    get: function () {
      return browser.element('input[name="termsConditionsAccepted"]');
    }
  },
  next: {
    get: function () {
      return browser.element('button.cd-wizard-submit');
    }
  },
  submit: {
    get: function () {
      return browser.element('button.cd-wizard-submit');
    }
  },
  dateOfBirth: {
    get: function () {
      return browser.element('input[name="dateOfBirth"]');
    }
  },
  selectDateOfBirth: {
    value: function (date) {
      return browser.selectDate('dateOfBirth', date, true);
    }
  },
  selectCountry: {
    value: function (country) {
      return browser.uiSelectFilterAndSelect('country', country, country);
    }
  },
  selectPlace: {
    value: function (place) {
      return browser.uiSelectFilterAndSelect('place', place, place);
    }
  },
  checkRecaptcha: {
    value: function (place) {
      return browser.checkRecaptcha('[vc-recaptcha] iframe');
    }
  },
  register: {
    value: function (profileData) {
      return browser.register(profileData);
    }
  },
  open: {
    value: function () {
      return Page.open.call(this, 'register');
    }
  }
});

module.exports = RegisterPage;
