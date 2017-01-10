browser.addCommand('checkRecaptcha', function (iframeSelector) {
  return promiseSeries([
    () => browser.waitForVisible(iframeSelector),
    () => browser.element(iframeSelector),
    (iframe) => browser.frame(iframe.value),
    () => browser.click('.recaptcha-checkbox'),
    () => browser.waitForVisible('.recaptcha-checkbox[aria-checked="true"]'),
    () => browser.frame()
  ]);
});
