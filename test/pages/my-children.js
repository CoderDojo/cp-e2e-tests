var SidebarPage = require('./sidebar');

var MyChildrenPage = Object.create(SidebarPage, {
  /**
   * define elements
   */
  children: {
    get: function () {
      return SidebarPage.tabs;
    }
  },
  getChildByName: {
    value: function (name) {
      return SidebarPage.getTabByTitle(name);
    }
  },
  childName: {
    get: function () {
      var selector = 'h2[ng-bind="::$ctrl.child.name"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  childAlias: {
    get: function () {
      var selector = 'span[ng-bind="::$ctrl.child.alias"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  addChild: {
    get: function () {
      return SidebarPage.getTabByTitle('Add Child');
    }
  },
  firstName: {
    get: function () {
      var selector = 'input[name="cd-add-child__first-name"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  surname: {
    get: function () {
      var selector = 'input[name="cd-add-child__surname"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  alias: {
    get: function () {
      var selector = 'input[name="cd-add-child__alias"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  maleRadioButton: {
    get: function () {
      var selector = 'label[for="cd-add-child__gender-male"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  femaleRadioButton: {
    get: function () {
      var selector = 'label[for="cd-add-child__gender-female"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  undisclosedRadioButton: {
    get: function () {
      var selector = 'label[for="cd-add-child__gender-undisclosed"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  email: {
    get: function () {
      var selector = 'input[name="cd-add-child__email"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  password: {
    get: function () {
      var selector = 'input[name="cd-add-child__password"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  setDoB: {
    value: function (dob) {
      return browser.selectDate('cdAddChildDob', dob, true);
    }
  },
  o13Section: {
    get: function () {
      return browser.element('.cd-add-child__o13-section');
    }
  },
  save: {
    get: function () {
      var selector = '.cd-add-child button[type="submit"]';
      return browser.waitForVisible(selector).element(selector);
    }
  },
  open: {
    value: function () {
      return SidebarPage.open.call(this, 'dashboard/children');
    }
  }
});

module.exports = MyChildrenPage;
