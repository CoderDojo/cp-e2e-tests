var LoginPage = require('../pages/login');

browser.addCommand('login', function (email, password) {
  return LoginPage.userMenu_login.waitForVisible()
    .then(function(){
      return LoginPage.userMenu_login.click();
    })
    .then(function(){
      return LoginPage.email.waitForVisible();
    })
    .then(function(){
      return LoginPage.email.setValue(email);
    })
    .then(function(){
      return LoginPage.password.setValue(password);
    })
    .then(function(){
      return LoginPage.submit.click();
    });
});

// ```
// var LoginPage = require('../pages/login');
// browser.addCommand('login', function (email, password) {
//   // return runTestSteps([
//     LoginPage.userMenu_login.click();
//     LoginPage.email.waitForVisible();
//     LoginPage.email.setValue(email);
//     LoginPage.password.setValue(password);
//     LoginPage.submit.click();
//   // ]);
// });
