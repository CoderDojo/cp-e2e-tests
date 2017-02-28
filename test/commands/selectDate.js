/**
 * Select a date from an uib-datepicker
 *
 * @param String  name  name of the input
 * @param String  date  date to input, separated by '-'
 * @param Bool  floating  option to define if the datepicker modal is detached from the input
 */
browser.addCommand('selectDate', function (name, date, floating) {
  var baseXPath = function (bypass) {
    return floating && !bypass ? '/' : '//*[@name="' + name + '"]';
  };
  var midXPath = function (path) {
    return '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "' + path + '")]';
  };
  return promiseSeries([
    () => browser.waitForVisible(baseXPath(true) + '/following-sibling::span[@class="input-group-btn"]'),
    () => browser.click(baseXPath(true) + '/following-sibling::span[@class="input-group-btn"]'),
    () => browser.isVisible(baseXPath() + midXPath('uib-daypicker') + '//button[contains(@class, "uib-title")]'),
    (dayPickerTitleVisible) => {
      if (dayPickerTitleVisible) {
        return browser.click(baseXPath() + midXPath('uib-daypicker') + '//button[contains(@class, "uib-title")]');
      }
    },
    () => browser.isVisible(baseXPath() + midXPath('uib-monthpicker') + '//button[contains(@class, "uib-title")]'),
    (monthPickerTitleVisible) => {
      if (monthPickerTitleVisible) {
        return browser.click(baseXPath() + midXPath('uib-monthpicker') + '//button[contains(@class, "uib-title")]');
      }
    },
    () => browser.getText(baseXPath() + midXPath('uib-yearpicker') + '//button[contains(@class, "uib-title")]/strong'),
    (text) => {
      var subSteps = [];
      var yearsRange = text.split(' - ');
      var numOfYearsInRange = parseInt(yearsRange[1]) - parseInt(yearsRange[0]);
      if (date.getFullYear() < yearsRange[0]) {
        var numOfPagesBack = Math.ceil((parseInt(yearsRange[0]) - date.getFullYear()) / numOfYearsInRange);
        for (var i = 0; i < numOfPagesBack; i++) {
          subSteps.push(() => browser.click(baseXPath() + midXPath('uib-yearpicker') + '//button[contains(@class, "uib-left")]'));
        }
      } else if (date.getFullYear() > yearsRange[1]) {
        var numOfPagesForward = Math.ceil((date.getFullYear() - parseInt(yearsRange[1])) / numOfYearsInRange);
        for (var j = 0; j < numOfPagesForward; j++) {
          subSteps.push(() => browser.click(baseXPath() + midXPath('uib-yearpicker') + '//button[contains(@class, "uib-right")]'));
        }
      }
      return promiseSeries(subSteps);
    },
    () => browser.click(baseXPath() + midXPath('uib-yearpicker') + '//button[span[contains(text(), "' + date.getFullYear() + '")]]'),
    () => browser.click('(' + baseXPath() + midXPath('uib-monthpicker') + '/tbody//button)[' + (date.getMonth() + 1) + ']'),
    () => browser.click(baseXPath() + midXPath('uib-daypicker') + '//button[span[contains(text(), "' + date.getDate() + '") and not(contains(@class, "text-muted"))]]')
  ]);
});
