var ViewDojoPage = require('../../pages/dojos/view');
module.exports = {
  seeEvent: function (eventName, expected) {
    return function () {
      return promiseSeries([
        () => ViewDojoPage.isCardExisting(eventName),
        (visible) => expect(visible).to.be.equal(expected)
      ]);
    };
  },
  bookEvent: function (eventName, expected) {
    return function () {
      return promiseSeries([
        () => ViewDojoPage.isBookingButtonVisible(eventName),
        (visible) => expect(visible).to.be.equal(expected)
      ]);
    };
  }
};
