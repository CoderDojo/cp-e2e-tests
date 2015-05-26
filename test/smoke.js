
var host = process.env.ENV_IP,
    port = process.env.ENV_PORT,
    cuid = require('cuid'),
    fs   = require('fs');

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
    .waitForElementVisible(selectors.logout, 1000)
    .click(selectors.logout)
    .waitForElementVisible(selectors.register, 2000)
    .waitForElementVisible(selectors.login, 1000)
}

module.exports = {
  'CoderDojo Smoke Test' : function (browser) {

    // init
    browser
      .url(host + ':' + port)
      .waitForElementVisible('body', 1000)

    // search dojo
    fill(browser, 'input[ng-model="search.dojo"]', 'dublin', 'Dojo search field')
    browser
      .click('button[type="submit"]')
      .waitForElementVisible(selectors.dojoclick, 2000)
      .verify.visible(selectors.dojoclick, 'Dojos to click')
      .click(selectors.dojoclick)
      .waitForElementVisible(selectors.div.main, 1000)
      .assert.containsText(selectors.div.main, 'Dublin')

    // register
    var payload = {
      name: 'e2etests-' + cuid(),
      email: 'e2etests-' + cuid() + '@example.com',
      password: 'Password1'
    };

    browser
      .click(selectors.register)
      .waitForElementVisible('body', 1000)
    fill(browser, selectors.reg.name, payload.name, 'Register name field');
    fill(browser, selectors.reg.email, payload.email, 'Register email field');
    fill(browser, selectors.reg.pass, payload.password, 'Register pass field');
    fill(browser, selectors.reg.passconfirm, payload.password, 'Register pass confirm field');
    browser
      .click('button[type="submit"]')
      .verify.visible('label[class="control-label has-error validationMessage"]', 'Err msg visible')
      .click('label[for="termsAndConditionsCheckbox"]') // for some reason only clicking the label checks the checkbox
      .click('button[type="submit"]');

    logout(browser, selectors)

    // safe option: u: manager@example.com, p: test
    // login
    browser.click(selectors.login);
    fill(browser, selectors.log.name, payload.email, 'Login name field');
    fill(browser, selectors.log.pass, payload.password, 'Login pass field');
    browser
      .click("input[type='submit']");

    logout(browser, selectors);

    // end
    browser
      // .pause(2000)
      .end();
  }
};
