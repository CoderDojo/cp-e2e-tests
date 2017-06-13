var logins = require('../../data/users');
var dojos = require('../../data/dojos');
var LoginPage = require('../../pages/login');
var ViewDojoEventsSpecs = require('./events.spec');
var ViewDojoPage = require('../../pages/dojos/view');
var _ = require('lodash');

describe('Dojos should be properly created', function () {
  var definitions = {
    public: {
      name: 'dojo1',
      events: {
        public: 'test event 1',
        private: 'test private event 1'
      }
    },
    private: {
      name: 'privateDojo1',
      events: {
        public: 'test public event private dojo 1',
        private: 'test private event private dojo 1'
      }
    }
  };
  var profiles = {
    'undefined': { // Guest
      public: [ViewDojoEventsSpecs.seeEvent(definitions.public.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.public.events.private, false),
        ViewDojoEventsSpecs.bookEvent(definitions.public.events.public, true)],
      private: [ViewDojoEventsSpecs.seeEvent(definitions.private.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.private.events.private, false),
        ViewDojoEventsSpecs.bookEvent(definitions.private.events.public, false)]
      },
    'parent1': { // member of dojo1 (public) but not of dojo3(private)
      public: [ViewDojoEventsSpecs.seeEvent(definitions.public.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.public.events.private, true),
        ViewDojoEventsSpecs.bookEvent(definitions.public.events.public, true),
        ViewDojoEventsSpecs.bookEvent(definitions.public.events.private, true)],
      private: [ViewDojoEventsSpecs.seeEvent(definitions.private.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.private.events.private, false),
      ViewDojoEventsSpecs.bookEvent(definitions.private.events.public, false)]
    },
    'champion3': { // member of dojo3
      public: [ViewDojoEventsSpecs.seeEvent(definitions.public.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.public.events.private, false),
        ViewDojoEventsSpecs.bookEvent(definitions.public.events.public, true)],
      private: [ViewDojoEventsSpecs.seeEvent(definitions.private.events.public, true),
        ViewDojoEventsSpecs.seeEvent(definitions.private.events.private, true),
        ViewDojoEventsSpecs.bookEvent(definitions.private.events.public, true),
        ViewDojoEventsSpecs.bookEvent(definitions.private.events.private, true)]
    }
  };
  // Missing : hiding draft !!

  _.each(profiles, function (dojoType, username) {
    // 3 profiles here : guest, non-member of the dojo and member of the dojo
    describe('Capacity to see events and book as ' + username, function () {
      // As a guest
      before(function () {
        if (logins[username] !== undefined) {
          return browser.login(logins[username].email, logins[username].password)
          .then(function () {
            return LoginPage.userMenu.waitForVisible();
          });
        }
      });
      after(function () {
        if (logins[username] !== undefined) {
          return browser.logout();
        }
      });
      _.each(dojoType, function (checks, visibility) {
        describe('In a ' + visibility + 'dojo ', function () {
          before(function () {
            var dojo = dojos[definitions[visibility].name];
            return ViewDojoPage.open(dojo.slug);
          });
          it('should respect their config ', function () {
            var checksPromises = [];
            _.each(checks, function (check) {
              checksPromises.push(check);
            });
            return promiseSeries(checksPromises);
          });
        });
      });
    });
  });
});
