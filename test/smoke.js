var host = process.env.ENV_IP,
    port = process.env.ENV_PORT;

console.log('host: ' + host);
console.log('port: ' + port);

module.exports = {
  'CoderDojo Smoke Test' : function (browser) {
    browser
      .url(host + ':' + port)
      .waitForElementVisible('body', 1000)
      .assert.containsText('#header', 'Create a Dojo')
      .assert.containsText('#header', 'Login')
      .click('a[ui-sref=start-dojo-wizard]')
      .waitForElementVisible('body', 1000)
      .setValue("input[ng-model='registerUser.name']", 'some.name')
      .setValue("input[ng-model='registerUser.email']", 'some.email@mail.com')
      .setValue("input[ng-model='registerUser.password']", 'secret')
      .setValue("input[ng-model='passwordConfirm']", 'secret')
      .click("button[type='submit']")
      .verify.visible("label[class='control-label has-error validationMessage']", 'Err msg visible')
      .click('a[ui-sref=login]')
      .setValue("input[ng-model='login.email']", 'manager@example.com')
      .setValue("input[ng-model='login.password']", 'test')
      .click("input[type='submit']")
      .pause(2000)
      .end();
  }
};