var Page = require('./page');

var AtomicNotify = Object.create(Page, {
  /**
   * define elements
   */
  get: {
    get: function () {
      var xpath = '//div[contains(@class, "atomic-notify-item") and contains(@class, "atomic-notify-success")]//p';
      return browser.waitForVisible(xpath)
      .then(() => {
        return $(xpath);
      });
    }
  },
  close: {
    get: function () {
      return $('//div[contains(@class, "atomic-notify-item")]//button[@class="close"]');
    }
  }
});

module.exports = AtomicNotify;
