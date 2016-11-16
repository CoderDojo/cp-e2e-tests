browser.addCommand('checkRecaptcha', function (iframeSelector) {
  var iframe = browser.element(iframeSelector);
  browser.frame(iframe.value);
  browser.click('.recaptcha-checkbox');
  browser.waitForVisible('.recaptcha-checkbox[aria-checked="true"]');
  browser.frame();
});
