browser.addCommand('selectDate', function (name, date) {
  var baseXPath = '//*[@name="' + name + '"]';

  return promiseSeries([
    () => browser.click(baseXPath + '/following-sibling::span[@class="input-group-btn"]'),
    () => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-daypicker")]//button[contains(@class, "uib-title")]'),
    () => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-monthpicker")]//button[contains(@class, "uib-title")]'),
    () => browser.getText(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-yearpicker")]//button[contains(@class, "uib-title")]/strong'),
    (text) => {
      var subSteps = [];
      var yearsRange = text.split(' - ');
      var numOfYearsInRange = parseInt(yearsRange[1]) - parseInt(yearsRange[0]);
      if (date.getFullYear() < yearsRange[0]) {
        var numOfPagesBack = Math.ceil((parseInt(yearsRange[0]) - date.getFullYear()) / numOfYearsInRange);
        for (var i = 0; i < numOfPagesBack; i++) {
          subSteps.push(() => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-yearpicker")]//button[contains(@class, "uib-left")]'));
        }
      } else if (date.getFullYear() > yearsRange[1]) {
        var numOfPagesForward = Math.ceil((date.getFullYear() - parseInt(yearsRange[1])) / numOfYearsInRange);
        for (var j = 0; j < numOfPagesForward; j++) {
          subSteps.push(() => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-yearpicker")]//button[contains(@class, "uib-right")]'));
        }
      }
      return promiseSeries(subSteps);
    },
    () => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-yearpicker")]//button[span[contains(text(), "' + date.getFullYear() + '")]]'),
    () => browser.click('(' + baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-monthpicker")]/tbody//button)[' + (date.getMonth() + 1) + ']'),
    () => browser.click(baseXPath + '/following-sibling::div[@uib-datepicker-popup-wrap]//table[contains(@class, "uib-daypicker")]//button[span[contains(text(), "' + date.getDate() + '") and not(contains(@class, "text-muted"))]]')
  ]);
});
