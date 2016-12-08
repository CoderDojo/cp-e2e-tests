browser.addCommand('insertIntoCkEditor', function (iframeSelector, text) {
  return promiseSeries([
    () => browser.waitForVisible(iframeSelector),
    () => $(iframeSelector),
    (ckeditorFrame) => browser.frame(ckeditorFrame.value),
    () => browser.waitForVisible('body'),
    () => browser.click('body'),
    () => browser.keys(text),
    () => browser.frame()
  ]);
});
