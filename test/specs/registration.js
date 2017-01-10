var _ = require('lodash');
var RegisterPage = require('../pages/register');

describe('Registration tests', function () {
  var baseProfile = {
    firstName: 'John',
    surname: 'Doe',
    password: 'Passw0rd',
    country: 'Ireland',
    place: 'Dublin'
  };

  afterEach(function () {
    return browser.deleteCookie();
  });

  // TODO: Make this actually test that it's filtered
  it('Country and Place should filter when typed into', function () {
    return promiseSeries([
      () => browser.url('http://localhost:8000/register/profile'),
      () => browser.waitForVisible('div[name="country"]', 1000),
      () => browser.uiSelectFilterAndSelect('country', 'Ire', 'Ireland'),
      () => browser.getText('.ui-select-container[name="country"] .ui-select-match-text'),
      (country) => expect(country).to.equal('Ireland'),
      () => browser.uiSelectFilterAndSelect('place', 'Dublin', 'Dublin'),
      () => browser.getText('.ui-select-container[name="place"] .ui-select-match-text'),
      (place) => expect(place).to.equal('Dublin')
    ]);
  });

  it('Register adult account (promiseSeries)', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 25);

    return promiseSeries([
      () => RegisterPage.open(),
      () => RegisterPage.register(_.extend(baseProfile, {
        email: 'johndoe' + (new Date()).getTime() + '@example.com',
        dateOfBirth: date
      })),
      () => browser.waitForVisible('.cd-menu__profile-name'),
      () => browser.getText('.cd-menu__profile-name'),
      (profileName) => expect(profileName).to.include(baseProfile.firstName),
      () => browser.getLoggedInUserInstance(),
      (userInstance) => expect(JSON.parse(userInstance.value.user.initUserType).name).to.equal('parent-guardian')
    ]);
  });

  it('Register o13 account', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 15);
    return promiseSeries([
      () => RegisterPage.open(),
      () => RegisterPage.register(_.extend(baseProfile, {
        email: 'johndoe' + (new Date()).getTime() + '@example.com',
        dateOfBirth: date
      })),
      () => browser.waitForVisible('.cd-menu__profile-name'),
      () => browser.getText('.cd-menu__profile-name'),
      (profileName) => expect(profileName).to.include(baseProfile.firstName),
      () => browser.getLoggedInUserInstance(),
      (userInstance) => expect(JSON.parse(userInstance.value.user.initUserType).name).to.equal('attendee-o13')
    ]);
  });

  it('Attempt to register u13 account', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    return promiseSeries([
      () => RegisterPage.open(),
      () => RegisterPage.register(_.extend(baseProfile, {
        email: 'johndoe' + (new Date()).getTime() + '@example.com',
        dateOfBirth: date
      })),
      () => browser.waitForVisible('.bootbox.modal .text-danger'),
      () => browser.getText('.bootbox.modal .text-danger'),
      (text) => expect(text).to.equal('Sorry only users over 13 can signup, but your parent or guardian can sign up and create you an account')
    ]);
  });
});
