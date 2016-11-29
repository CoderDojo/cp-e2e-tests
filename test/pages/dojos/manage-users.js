var Page = require('../page');
var WAIT_TIME = 5000;


var DojoUsers = Object.create(Page, {
  /**
   * define elements
   */
  actionBarBasePath : {
      get: function () {
        return '//*[ (@class="cd-action-bar" or @class="cd-action-bar cd-action-bar--fixed")  and @data-open="true"]//span[@class="cd-action-bar__actions"]';
      }
  },
  users: {
     get: function () {
       var path = 'cd-picture-grid p.cd-picture-grid__caption';
       return browser.elements(path);
     }
   },
   user: {
    value: function (name) {
      var xpath = '//cd-picture-grid//p[contains(text(), "' + name + '")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  userTitle: {
   value: function (name) {
     var xpath = '//cd-picture-grid//div[@class="cd-picture-grid__info"][p[contains(text(), "' + name + '")]]/p[contains(@class, "cd-picture-grid__sub-caption")]';
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
    value: function (userType) {
      return browser.uiSelectFilterAndSelect2('', 'inviteUserType', userType, userType);
    }
  },
  submitInvitation: {
    get: function () {
      return $('#inviteMentorForm button[type="submit"]');
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
    value: function (search, userType ) {
      return browser.uiSelectFilterAndSelect2('', 'filterUserType', search, userType || search);
    }
  },
  submitFilter: {
    get: function () {
      return $('#filterUserForm button[type="submit"]');
    }
  },
  awardBadgeButton: {
    get: function () {
      var xpath = DojoUsers.actionBarBasePath + '//div[@class="cd-action-bar-popup-item__toggle" and @ng-click]/span';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  awardBadgeDropDownTextBox: {
    get: function () {
      var path = 'span.cd-action-bar__actions div[class*="--visible"]';
      return $(path);
    }
  },
  awardBadgeDropDown: {
    value: function (search, badgeName) {
      return browser.uiSelectFilterAndSelect2('//span[@class="cd-action-bar__actions"]//div[contains(@class, "--visible")]', 'filterBadges', search, badgeName || search);
    }
  },
  awardBadgeEvidenceTextArea: {
    get: function () {
      var path = '//span[@class="cd-action-bar__actions"]//div[contains(@class, "--visible")]//textarea[@name="badgeEvidence"]';
      return $(path);
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
      var xpath = DojoUsers.actionBarBasePath + '//a[contains(@class, "cd-action-bar-item--red")]';
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
      var xpath = DojoUsers.actionBarBasePath + '//cd-action-bar-item[contains(@ng-show, "changeRole")]/a';
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
    value: function (role) {
      // roles : parent, volunteer, etc
      var xpath = '//div[@role="dialog"]/div[contains(@class, "modal-dialog")]//div[contains(@class,"cd-join-dojo-modal__choice") and descendant::h3[contains(@class, "cd-' + role + '")]]//button[@ng-click]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  permissionsButton: {
    get: function () {
      var xpath = '//span[contains(@ng-click, "overflowOpen") and contains(@class, "cd-action-bar-item")]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  permissionCheckbox: {
    value: function (name) {
      // names (implied "Admin"): Ticketing, Dojo, Background
      // var xpath = '//span[contains(@class, "cd-action-bar__overflow-menu")]//cd-action-bar-checkbox-item/label/span[contains(text(), "' + name + '" )]';
      var xpath = '//span[contains(@class, "cd-action-bar__overflow-menu")]//cd-action-bar-checkbox-item[label/span[contains(text(), "' + name + '" )]]';
      $(xpath).waitForVisible(WAIT_TIME);
      return $(xpath);
    }
  },
  profileLink: {
    get: function () {
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

module.exports = DojoUsers;
