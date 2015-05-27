
var host = process.env.ENV_IP,
    port = process.env.ENV_PORT,
    cuid = require('cuid'),
    util = require('util'),
    fs   = require('fs');

var defaultTimeout =  2000; 

console.log('host: ' + host);
console.log('port: ' + port);

var selectors = JSON.parse(fs.readFileSync(__dirname + '/selectors.json', 'utf8'));

function fill(browser, selector, value, desc){
  browser
    .verify.visible(selector, desc)
    .setValue(selector, value)
}

function logout(browser, selectors){
  browser
    .waitForElementPresent(selectors.logout, defaultTimeout)
  browser
    .click(selectors.logout)
    .waitForElementPresent('body', defaultTimeout)
    .waitForElementPresent(selectors.register, defaultTimeout)
    .waitForElementPresent(selectors.login, defaultTimeout)
}

module.exports = {
  'CoderDojo Smoke Test' : function (browser) {

    // init
    browser
      .url(host + ':' + port)
      .waitForElementPresent('body', defaultTimeout)
      // .source(function (result){
      //     console.log('src: ' + result.value);
      // })

    // search dojo
    fill(browser, 'input[ng-model="search.dojo"]', 'dublin', 'Dojo search field')
    browser
      .click('button[type="submit"]')
      .waitForElementPresent('body', defaultTimeout)
      .waitForElementPresent(selectors.dojoclick, defaultTimeout)
      .verify.visible(selectors.dojoclick, 'Dojos to click')
      .click(selectors.dojoclick)
      .waitForElementPresent(selectors.div.main, defaultTimeout)
      .assert.containsText(selectors.div.main, 'Dublin');

    // register
    var payload = {
      name: 'e2etests-' + cuid(),
      email: 'e2etests-' + cuid() + '@example.com',
      password: 'Password1'
    };

    browser
      .click(selectors.register)
      .waitForElementPresent('body', defaultTimeout);
    fill(browser, selectors.reg.name, payload.name, 'Register name field');
    fill(browser, selectors.reg.email, payload.email, 'Register email field');
    fill(browser, selectors.reg.pass, payload.password, 'Register pass field');
    fill(browser, selectors.reg.passconfirm, payload.password, 'Register pass confirm field');
    browser
      .click('button[type="submit"]')
      .verify.visible('label[class="control-label has-error validationMessage"]', 'Err msg visible')
      .click('label[for="termsAndConditionsCheckbox"]') // for some reason only clicking the label checks the checkbox
      .click('button[type="submit"]')

    logout(browser, selectors)

    // safe option: u: manager@example.com, p: test
    // login
    browser.click(selectors.login);
    fill(browser, selectors.log.name, payload.email, 'Login name field');
    fill(browser, selectors.log.pass, payload.password, 'Login pass field');
    browser
      .click("input[type='submit']")
      .waitForElementPresent('body', defaultTimeout);

    logout(browser, selectors);

    // end
    browser
      // .pause(defaultTimeout)
      .end();
  }
};
