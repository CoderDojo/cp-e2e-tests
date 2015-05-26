
var host = process.env.ENV_IP,
    port = process.env.ENV_PORT,
    fs   = require('fs');

console.log('host: ' + host);
console.log('port: ' + port);

var selectors = JSON.parse(fs.readFileSync(__dirname + '/selectors.json', 'utf8'));

function fill(browser, path, value, desc){
  browser
    .verify.visible(path, desc)
    .setValue(path, value)
}

module.exports = {
  'CoderDojo Smoke Test' : function (browser) {

    // init
    browser
      .url(host + ':' + port)
      .waitForElementVisible(selectors.register, 1000)
      .waitForElementVisible(selectors.login, 1000)

    // search dojo
    fill(browser, 'input[ng-model="search.dojo"]', 'dublin', 'Dojo search field')
    browser
      .click('button[type="submit"]')
      .waitForElementVisible(selectors.dojoclick, 2000)
      .verify.visible(selectors.dojoclick, 'Dojos to click')
      .click(selectors.dojoclick)
      .waitForElementVisible(selectors.div.main, 1000)
      .assert.containsText(selectors.div.main, 'Dublin')


    // login
    browser.click(selectors.login)
    fill(browser, selectors.log.name, 'manager@example.com', 'Login name field')
    fill(browser, selectors.log.pass, 'test', 'Login pass field')
    browser
      .click("input[type='submit']")
      .waitForElementVisible(selectors.logout, 1000)

    // logout
    browser
      .click(selectors.logout)
      .waitForElementVisible(selectors.register, 1000)
      .waitForElementVisible(selectors.login, 1000)

    // TODO: Figure out how to click the termsAndConfitions checkbox
    // // register
    // browser
    // .click(selectors.register)
    // .waitForElementVisible('body', 1000)
    // // .verify.visible('checkbox', 'Terms and conditions checkbox')
    // // .click('input[id="termsAndConditionsCheckbox"]', 'Terms and conditions checkbox')
    // fill(browser, selectors.reg.name, 'some.name', 'Register name field')
    // fill(browser, selectors.reg.email, 'some.email@mail.com', 'Register email field')
    // fill(browser, selectors.reg.pass, 'secret', 'Register pass field')
    // fill(browser, selectors.reg.passconfirm, 'secret', 'Register pass confirm field')
    // browser
    //   .click('button[type="submit"]')
    //   .verify.visible('label[class="control-label has-error validationMessage"]', 'Err msg visible')

    // end
    browser
      // .pause(2000)
      .end();
  }
};
