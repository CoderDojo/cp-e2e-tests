/* global XMLHttpRequest */

browser.addCommand('getLoggedInUserInstance', function () {
  return browser.timeoutsAsyncScript(20000)
    .executeAsync((done) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          done(JSON.parse(this.responseText));
        }
      };
      xhr.open('GET', '/api/2.0/users/instance', true);
      xhr.send();
    });
});
