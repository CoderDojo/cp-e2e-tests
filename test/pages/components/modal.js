var Page = require('../page');
var WAIT_TIME = 5000;

var Modal = Object.create({}, {
  base : {
    get: function (){
      return '.modal[role="dialog"]';
    }
  },
  wait: {
    value: function (visible) {
      browser.waitForVisible(Modal.base, WAIT_TIME, visible || false);
    }
  },
  body: {
    get: function () {
      return $(Modal.base + ' .modal-body .bootbox-body');
    },
  },
  submit: {
    get: function () {
      return $(Modal.base + ' .modal-footer button[type="button"][data-bb-handler="confirm"]');
    }
  },
  accept: {
    get: function (){
      return $(Modal.base + ' .modal-footer button[type="button"][data-bb-handler="ok"]');
    }
  },
  cancel: {
    get: function () {
      return $(Modal.base + ' .modal-body button.close');
    }
  }
});
module.exports = Modal;
