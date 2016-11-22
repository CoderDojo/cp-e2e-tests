var Page = require('./page');
var WAIT_TIME = 5000;

var DojoUsers = Object.create(Page, {
  /**
   * define elements
   */

  user: {
    get: function (name) {
      var xpath = '//cd-picture-grid//p[contains(text(), "' + name + '")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  invitationTextBox: {
    get: function () {
      var xpath = '//input[@name="inviteMentor"]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  invitationDropDown: {
    get: function () {

    }
  },
  filterTextBox: {
    get: function () {
      var xpath = '//input[@name="filterUserName"]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  filterDropDown: {
    get: function () {
      var xpath = '//span[contains(@class,"cd-action-bar-popup-item")]//div[@role="button"]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  awardBadgeButton: {
    get: function () {
      var xpath = '//span[@class ="cd-action-bar__actions"]//span[contains(@class, "--active")]//div[@class="cd-action-bar-popup-item__toggle" and @ng-click]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  awardBadgeDropDown: {
    get: function () {

    }
  },
  awardBadgeSubmitButton: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//div[contains(@class, "--visible")]//button[contains(@class, "cd-award-badge__selection-button") and contains(@ng-click, "awardBadge")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  removeUserButton: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//a[contains(@class, "cd-action-bar-item--red")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  exportUsersButton: {
    get: function () {
      var xpath = '//a[contains(@class, "btn") and contains(@href, "/api/2.0/dojos/export-users")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  changeUserRoleButton: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "changeRole")]/a';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  changeUserRolePopUp: {
    get: function () {
      var xpath = '//div[@role="dialog"]/div[contains(@class, "modal-dialog")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  changeUserRolePopUpSubmit: {
    get: function (role) {
      // roles : parent, volunteer, etc
      var xpath = '//div[@role="dialog"]/div[contains(@class, "modal-dialog")]//div[contains(@class,"cd-join-dojo-modal__choice") and descendant::h3[contains(@class, "cd-' + role + '")]]//button[@ng-click]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  permissionsList: {
    get: function () {
      var xpath = '//span[contains(@ng-click, "overflowOpen") and contains(@class, "cd-action-bar-item")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  permissionCheckbox: {
    get: function (name) {
      // names (implied "Admin"): Ticketing, Dojo, Background
      var xpath = '//span[contains(@class, "cd-action-bar__overflow-menu")]//cd-action-bar-checkbox-item/label/span[contains(text(), "' + name + '" )]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  profileLink: {
    get: function (name) {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "viewProfile")]/a';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  open: {
    value: function (dojoId) {
      return Page.open.call(this, 'dashboard/dojos/' + dojoId);
    }
  }
});

module.exports = MyDojosPage;
