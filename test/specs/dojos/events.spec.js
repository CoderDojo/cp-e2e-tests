var ViewDojoPage = require('../../pages/dojos/view');
module.exports = {
  seeEvent: function (eventName, expected) {
    return function () {
      return promiseSeries([
        () => ViewDojoPage.isCardExisting(eventName),
        (visible) => {console.log('seeEvent', visible, expected); return Promise.resolve(visible)},
        (visible) => expect(visible).to.be.equal(expected)
      ]);
    };
  },
  bookEvent: function (eventName, expected) {
    return function () {
      return promiseSeries([
        () => ViewDojoPage.isBookingButtonVisible(eventName),
        (visible) => {console.log('bookEvent', visible, expected); return Promise.resolve(visible)},
        (visible) => expect(visible).to.be.equal(expected)
      ]);
    };
  }
};
