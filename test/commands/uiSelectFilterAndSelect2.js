browser.addCommand('uiSelectFilterAndSelect2', function (prefix, name, filterText, selectText, clickableElement) {
  var baseXPath = '//*[contains(@class, "ui-select-container") and @name="' + name + '"]';

  var resultPieces = selectText.split(filterText);
  var resultXpath = baseXPath + '//div[contains(@class, "ui-select-choices-row")]//a[span';
  var resultXpathPieces = [];
  for (var i = 0; i < resultPieces.length; i++) {
    if (resultPieces[i] !== '') {
      resultXpathPieces.push('text()[contains(., "' + resultPieces[i] + '")]');
    }
  }
  if (resultXpathPieces.length > 0) {
    resultXpath += '[' + resultXpathPieces.join(' and ') + ']]';
  } else {
    resultXpath += ' and span[translate(text(), "' + filterText.toUpperCase() + '", "' + filterText.toLowerCase() + '")="' + filterText.toLowerCase() + '"]]';
  }
  return promiseSeries([
    () => browser.click(prefix + (clickableElement || '//div[@name="' + name + '"]')),
    () => browser.setValue(prefix + baseXPath + '/input[contains(@class, "ui-select-search")]', filterText),
    () => browser.waitForVisible(resultXpath),
    () => browser.click(resultXpath)
  ]);
});
