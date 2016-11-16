browser.addCommand('login', function (email, password) {
    browser.setValue('input[name="email"]', email);
    browser.setValue('input[name="password"]', password);
    browser.click('button[value="Login"]');
});
