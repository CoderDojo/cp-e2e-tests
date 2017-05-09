var Page = require('../pages/page');

browser.addCommand('toggleProfileMenu', function (email, password) {
  return promiseSeries([
    () => Page.userMenu_profileName.waitForVisible(),
    () => Page.userMenu_profileName.click(),
    () => browser.pause(250) // Wait for fade-in animation (200ms + 50ms buffer)
  ]);
});
