var moment = require('moment');
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
  this.timeout(120000);

  afterEach(function () {
    browser.deleteCookie();
  });

  // TODO: Make this actually test that it's filtered
  it('Country and Place should filter when typed into', function () {
    browser.url('http://localhost:8000/register/profile');
    browser.waitForVisible('div[name="country"]', 1000);
    browser.uiSelectFilterAndSelect('country', 'Ire', 'Ireland');
    var country = browser.getText('.ui-select-container[name="country"] .ui-select-match-text');
    expect(country).to.equal('Ireland');
    browser.uiSelectFilterAndSelect('place', 'Dublin', 'Dublin');
    var place = browser.getText('.ui-select-container[name="place"] .ui-select-match-text');
    expect(place).to.equal('Dublin');
  });

  it('Register adult account', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 25);
    RegisterPage.open();
    RegisterPage.register(_.extend(baseProfile, {
      email: 'johndoe' + (new Date()).getTime() + '@example.com',
      dateOfBirth: date
    }));
    browser.waitForVisible('.cd-menu__profile-name');
    var profileName = browser.getText('.cd-menu__profile-name');
    expect(profileName).to.include(baseProfile.firstName);
    browser.timeoutsAsyncScript(5000);
    var userInstance = browser.executeAsync(function (done) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          done(JSON.parse(this.responseText));
        }
      }
      xhr.open('GET', '/api/2.0/users/instance', true);
      xhr.send();
    })
    expect(JSON.parse(userInstance.value.user.initUserType).name).to.equal('parent-guardian');
  });

  it('Register o13 account', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 15);
    RegisterPage.open();
    RegisterPage.register(_.extend(baseProfile, {
      email: 'johndoe' + (new Date()).getTime() + '@example.com',
      dateOfBirth: date
    }));
    browser.waitForVisible('.cd-menu__profile-name');
    var profileName = browser.getText('.cd-menu__profile-name');
    expect(profileName).to.include(baseProfile.firstName);
    browser.timeoutsAsyncScript(5000);
    var userInstance = browser.executeAsync(function (done) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          done(JSON.parse(this.responseText));
        }
      }
      xhr.open('GET', '/api/2.0/users/instance', true);
      xhr.send();
    })
    expect(JSON.parse(userInstance.value.user.initUserType).name).to.equal('attendee-o13');
  });

  it('Attempt to register u13 account', function () {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 10);
    RegisterPage.open();
    RegisterPage.register(_.extend(baseProfile, {
      email: 'johndoe' + (new Date()).getTime() + '@example.com',
      dateOfBirth: date
    }))
    browser.waitForVisible('.bootbox.modal .text-danger')
    var text = browser.getText('.bootbox.modal .text-danger')
    expect(text).to.equal('Sorry only users over 13 can signup, but your parent or guardian can sign up and create you an account');
  });
});
