
var host = process.env.ENV_IP,
    port = process.env.ENV_PORT,
    cuid = require('cuid'),
    util = require('util'),
    fs   = require('fs');

var defaultTimeout =  2000; 

console.log('host: ' + host);
console.log('port: ' + port);

var selectors = JSON.parse(fs.readFileSync(__dirname + '/selectors.json', 'utf8'));

function click(browser, selector){
  browser
    .waitForElementVisible(selector, defaultTimeout)
    .click(selector)
    .pause(750);
}

function fill(browser, selector, value, desc){
  browser
    .waitForElementVisible(selector, defaultTimeout, desc)
    .setValue(selector, value);
}

function logout(browser, selectors){
  browser.waitForElementVisible('header', defaultTimeout);
  click(browser, selectors.logout);
  browser
    .waitForElementVisible('header', defaultTimeout)
    .waitForElementVisible('body', defaultTimeout)
    .waitForElementVisible(selectors.register, defaultTimeout)
    .waitForElementVisible(selectors.login, defaultTimeout);
}

module.exports = {
  'CoderDojo Smoke Test' : function (browser) {

    // init
    browser
      .url(host + ':' + port)
      .waitForElementVisible('body', defaultTimeout);
      // .source(function (result){
      //     console.log('src: ' + result.value);
      // });

    // search dojo
    fill(browser, 'input[ng-model="search.dojo"]', 'dublin', 'Dojo search field');
    click(browser,'button[type="submit"]');
    browser.waitForElementVisible('body', defaultTimeout);
    click(browser, selectors.dojoclick);
    browser.waitForElementVisible(selectors.div.ng, defaultTimeout);

    // register
    var payload = {
      name: 'e2etests-' + cuid(),
      email: 'e2etests-' + cuid() + '@example.com',
      password: 'Password1'
    };

    click(browser, selectors.register);
    browser.waitForElementVisible('body', defaultTimeout);
    fill(browser, selectors.reg.name, payload.name, 'Register name field');
    fill(browser, selectors.reg.email, payload.email, 'Register email field');
    fill(browser, selectors.reg.pass, payload.password, 'Register pass field');
    fill(browser, selectors.reg.passconfirm, payload.password, 'Register pass confirm field');
    click(browser, 'button[type="submit"]');
    browser.waitForElementVisible('label[class="control-label has-error validationMessage"]', defaultTimeout, 'Err msg visible');
    click(browser, 'label[for="termsAndConditionsCheckbox"]'); // for some reason only clicking the label checks the checkbox
    click(browser, 'button[type="submit"]');

    logout(browser, selectors);

    // safe option: u: manager@example.com, p: test
    // login
    click(browser, selectors.login);
    fill(browser, selectors.log.name, payload.email, 'Login name field');
    fill(browser, selectors.log.pass, payload.password, 'Login pass field');
    click(browser, "input[type='submit']");
    browser.waitForElementVisible('body', defaultTimeout);

    logout(browser, selectors);

    // end
    browser
      .end();
  }
};
