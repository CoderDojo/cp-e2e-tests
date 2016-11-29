browser.addCommand('insertIntoCkEditor', function (iframeSelector, text) {
  var ckeditorFrame = $(iframeSelector);
  browser.frame(ckeditorFrame.value);
  $('body').click();
  browser.keys(text);
  browser.frame();
});
