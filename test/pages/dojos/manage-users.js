var Page = require('../page');

var DojoUsers = Object.create(Page, {
  /**
   * define elements
   */
  actionBarBasePath: {
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
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  userTitle: {
    value: function (name) {
      var xpath = '//cd-picture-grid//div[@class="cd-picture-grid__info"][p[contains(text(), "' + name + '")]]/p[contains(@class, "cd-picture-grid__sub-caption")]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  invitationTextBox: {
    get: function () {
      var xpath = '//input[@name="inviteMentor"]';
      return browser.waitForVisible(xpath)
        .$(xpath);
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
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  filterDropDown: {
    value: function (search, userType) {
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
      var xpath = DojoUsers.actionBarBasePath + '//div[@class="cd-action-bar-popup-item__toggle" and @ng-click]';
      return browser.waitForVisible(xpath)
        .$(xpath);
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
      return browser.uiSelectFilterAndSelect2('//span[@class="cd-action-bar__actions"]//div[contains(@class, "--visible")]', 'filterBadges', search, badgeName || search, '//div[contains(@class, "cd-award-badge__selection")]');
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
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  removeUserButton: {
    get: function () {
      var xpath = DojoUsers.actionBarBasePath + '//a[contains(@class, "cd-action-bar-item--red")]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  exportUsersButton: {
    get: function () {
      var xpath = '//a[contains(@class, "btn") and contains(@href, "/api/2.0/dojos/export-users")]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  changeUserRoleButton: {
    get: function () {
      var xpath = DojoUsers.actionBarBasePath + '//cd-action-bar-item[contains(@ng-show, "changeRole")]/a';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  changeUserRolePopUp: {
    get: function () {
      var xpath = '//div[@role="dialog"]/div[contains(@class, "modal-dialog")]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  changeUserRolePopUpSubmit: {
    value: function (role) {
      // roles : parent, volunteer, etc
      var xpath = '//div[@role="dialog"]/div[contains(@class, "modal-dialog")]//div[contains(@class,"cd-join-dojo-modal__choice") and descendant::h3[contains(@class, "cd-' + role + '")]]//button[@ng-click]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  permissionsButton: {
    get: function () {
      var xpath = '//span[contains(@ng-click, "overflowOpen") and contains(@class, "cd-action-bar-item")]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  permissionCheckbox: {
    value: function (name) {
      // names (implied "Admin"): Ticketing, Dojo, Background
      // var xpath = '//span[contains(@class, "cd-action-bar__overflow-menu")]//cd-action-bar-checkbox-item/label/span[contains(text(), "' + name + '" )]';
      var xpath = '//span[contains(@class, "cd-action-bar__overflow-menu")]//cd-action-bar-checkbox-item[label/span[contains(text(), "' + name + '" )]]';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  profileLink: {
    get: function () {
      var xpath = '//span[@class="cd-action-bar__actions"]//cd-action-bar-item[contains(@ng-show, "viewProfile")]/a';
      return browser.waitForVisible(xpath)
        .$(xpath);
    }
  },
  open: {
    value: function (dojoId) {
      return Page.open.call(this, 'dashboard/dojos/' + dojoId);
    }
  }
});

module.exports = DojoUsers;
