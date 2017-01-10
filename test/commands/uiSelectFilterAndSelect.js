browser.addCommand('uiSelectFilterAndSelect', function (name, filterText, selectText, highlights) {
  highlights = highlights !== false; // default true
  var baseXPath = '//*[contains(@class, "ui-select-container") and @name="' + name + '"]';

  var resultPieces = selectText.split(filterText);
  var resultXpath = baseXPath + '//div[contains(@class, "ui-select-choices-row")]//a[span';
  if (highlights) {
    var resultXpathPieces = [];
    for (var i = 0; i < resultPieces.length; i++) {
      if (resultPieces[i] !== '') {
        resultXpathPieces.push('text()[contains(., "' + resultPieces[i] + '")]');
      }
    }
    if (resultXpathPieces.length > 0) {
      resultXpath += '[' + resultXpathPieces.join(' and ') + ']';
    } else {
      resultXpath += '[not(text())]';
    }
    resultXpath += ' and span/span[translate(text(), "' + filterText.toUpperCase() + '", "' + filterText.toLowerCase() + '")="' + filterText.toLowerCase() + '"]]';
  } else {
    resultXpath += '[translate(text(), "' + filterText.toUpperCase() + '", "' + filterText.toLowerCase() + '")="' + selectText.toLowerCase() + '"]]';
  }

  return promiseSeries([
    () => browser.click('div[name="' + name + '"]'),
    () => browser.setValue(baseXPath + '/input[contains(@class, "ui-select-search")]', filterText),
    () => browser.waitForVisible(resultXpath),
    () => browser.click(resultXpath)
  ]);
});
