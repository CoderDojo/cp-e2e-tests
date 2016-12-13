var Modal = Object.create({}, {
  base: {
    get: function () {
      return '.modal[role="dialog"] .modal-dialog:not(.modal-lg)';
    }
  },
  wait: {
    value: function (visible) {
      return browser.waitForVisible(Modal.base, 6000, visible || false)
      .then(() => browser.pause(100));
    }
  },
  body: {
    get: function () {
      return $(Modal.base + ' .modal-body .bootbox-body');
    }
  },
  submit: {
    get: function () {
      return $(Modal.base + ' .modal-footer button[type="button"][data-bb-handler="confirm"]');
    }
  },
  accept: {
    get: function () {
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
