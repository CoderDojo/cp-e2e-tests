var _ = require('lodash');
var MainPage = require('../../pages/page');
var LoginPage = require('../../pages/login');
var MyChildrenPage = require('../../pages/my-children');
var users = require('../../data/users');
var parent1 = users.parent1;
var parent1sChildren = _.filter(users, function (user, key) {
  return _.includes(parent1.children, key);
});

describe('View Children tests', function () {
  before(function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(parent1.email, parent1.password),
      () => LoginPage.userMenu.waitForVisible()
    ]);
  });

  it('should display a list of children', function () {
    return promiseSeries([
      () => MainPage.userMenu.click(),
      () => MainPage.userMenu_myChildren.click(),
      () => MyChildrenPage.children,
      (children) => {
        var expectedNames = _.map(parent1sChildren, function (child) {
          return child.name;
        });
        var expectedAliases = _.map(parent1sChildren, function (child) {
          return child.alias;
        });

        var promises = [];
        var displayedNames = [];
        var displayedAliases = [];
        children.value.forEach(function (childEl) {
          promises = promises.concat([
            () => MyChildrenPage.getTabTitleByElementId(childEl.ELEMENT),
            (tabTitle) => browser.elementIdText(tabTitle.value.ELEMENT),
            (tabTitleText) => {
              displayedNames.push(tabTitleText.value);
            },
            () => MyChildrenPage.getTabSubTitleByElementId(childEl.ELEMENT),
            (tabSubTitle) => browser.elementIdText(tabSubTitle.value.ELEMENT),
            (tabSubTitleText) => {
              displayedAliases.push(tabSubTitleText.value);
            }
          ]);
        });
        promises.push(() => {
          expect(displayedNames.slice(0, displayedNames.length - 1)).to.deep.equal(expectedNames);
          expect(displayedAliases.slice(0, displayedNames.length - 1)).to.deep.equal(expectedAliases);
        });
        return promiseSeries(promises);
      }
    ]);
  });

  parent1sChildren.forEach(function (child) {
    it('should display details for ' + child.name + ' when clicked', function () {
      return promiseSeries([
        () => MyChildrenPage.getChildByName(child.name).click(),
        () => browser.pause(100),
        () => MyChildrenPage.childName.getText(),
        (childNameText) => {
          expect(childNameText).to.equal(child.name);
        },
        () => MyChildrenPage.childAlias.getText(),
        (childAliasText) => {
          expect(childAliasText).to.equal(child.alias);
        }
      ]);
    });
  });
});
