var moment = require('moment');
var users = require('../../data/users');
var dojos = require('../../data/dojos');
var LoginPage = require('../../pages/login');
var MyDojosPage = require('../../pages/myDojos');
var ManageEventsPage = require('../../pages/events/manage');
var EditEventPage = require('../../pages/events/edit');
var ManageApplicationsPage = require('../../pages/events/manageApplications');
var MyEventsPage = require('../../pages/events/my');
var ViewDojoPage = require('../../pages/dojos/view');

describe('Creating a Future One-off Event', function () {
  // Only used in this test, no need to export to data folder
  var eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 1);
  var startTime = new Date();
  startTime.setHours(17);
  startTime.setMinutes(30);
  var endTime = new Date();
  endTime.setHours(19);
  endTime.setMinutes(0);
  var ts = (new Date()).getTime();
  var eventDetails = {
    name: 'Test Event - ' + ts,
    description: 'Description for test event - ' + ts,
    address: 'Palatul Culturii',
    city: 'Lasi',
    date: eventDate,
    startTime: startTime,
    endTime: endTime,
    sessions: [{
      name: 'Scratch',
      description: 'Description for Scratch session',
      tickets: [{
        name: 'Ninja',
        type: 'Youth',
        quantity: 20
      }, {
        name: 'Mentor',
        type: 'Mentor',
        quantity: 5
      }]
    }, {
      name: 'Website',
      description: 'HTML, CSS and JavaScript',
      tickets: [{
        name: 'Ninja',
        type: 'Youth',
        quantity: 10
      }, {
        name: 'Mentor',
        type: 'Mentor',
        quantity: 2
      }]
    }],
    capacity: '37' // just added up the quantities manually
  };

  before('create the event', function () {
    return promiseSeries([
      () => LoginPage.open(),
      () => LoginPage.login(users.champion1.email, users.champion1.password),
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageEventsLink(dojos.dojo1.name).click(),
      () => ManageEventsPage.createEventButton.click(),
      () => EditEventPage.eventDetailsCard.click(),
      () => EditEventPage.eventName.setValue(eventDetails.name),
      () => EditEventPage.setEventDescription(eventDetails.description),
      () => EditEventPage.oneOffRadioButton.click(),
      () => EditEventPage.setFromDate(eventDetails.date),
      () => EditEventPage.setStartTime(eventDetails.startTime),
      () => EditEventPage.setEndTime(eventDetails.endTime),
      () => EditEventPage.eventTicketsCard.click(),
      () => {
        var subSteps = [];
        eventDetails.sessions.forEach(function (session, sessionIndex) {
          if (sessionIndex !== 0) {
            subSteps.push(() => EditEventPage.addSessionButton.click());
          }
          subSteps.push(() => EditEventPage.getSessionNameInput(sessionIndex).setValue(session.name));
          subSteps.push(() => EditEventPage.getSessionDescriptionInput(sessionIndex).setValue(session.description));
          session.tickets.forEach(function (ticket, ticketIndex) {
            if (ticketIndex !== 0) {
              subSteps.push(() => EditEventPage.getAddTicketButton(sessionIndex).click());
            }
            subSteps.push(() => EditEventPage.getTicketNameInput(sessionIndex, ticketIndex).setValue(ticket.name));
            subSteps.push(() => EditEventPage.setTicketUserType(sessionIndex, ticketIndex, ticket.type));
            subSteps.push(() => EditEventPage.getTicketQuantityInput(sessionIndex, ticketIndex).setValue(ticket.quantity));
          });
        });
        return promiseSeries(subSteps);
      },
      () => EditEventPage.publish.click(),
      () => ManageApplicationsPage.page
    ]);
  });

  // after(function () {
  //   browser.deleteCookie();
  // });

  it('should appear correctly on the manage events page', function () {
    return promiseSeries([
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getManageEventsLink(dojos.dojo1.name).click(),
      () => browser.waitUntil(function () {
        return new Promise(function (resolve, reject) {
          return ManageEventsPage.getCapacity(eventDetails.name).getText()
            .then(function (capacity) {
              resolve(capacity === eventDetails.capacity);
            });
        });
      }, 10000),
      () => ManageEventsPage.getEventLink(eventDetails.name).getText(),
      (eventLink) => expect(eventLink).to.equal(eventDetails.name),
      () => ManageEventsPage.getDate(eventDetails.name).getText(),
      (date) => expect(date).to.equal(moment.utc(eventDetails.date).format('MMMM Do YYYY')),
      () => ManageEventsPage.getCapacity(eventDetails.name).getText(),
      (capacity) => expect(capacity).to.equal(eventDetails.capacity),
      () => ManageEventsPage.getApplicants(eventDetails.name).getText(),
      (applicants) => expect(applicants).to.equal('0'),
      () => ManageEventsPage.getAttending(eventDetails.name).getText(),
      (attending) => expect(attending).to.equal('0'),
      () => ManageEventsPage.getStatus(eventDetails.name).getText(),
      (status) => expect(status).to.equal('published')
    ]);
  });

  it('should appear correctly on the "My Events" page', function () {
    var expectedDate = moment(eventDetails.date).format('Do MMMM YY') + ', ' +
                        moment(eventDetails.startTime).format('HH:mm') + ' - ' +
                        moment(eventDetails.endTime).format('HH:mm');

    return promiseSeries([
      () => MyEventsPage.userMenu.click(),
      () => MyEventsPage.userMenu_myEvents.click(),
      () => MyEventsPage.getEventRow(eventDetails.name).click(),
      () => MyEventsPage.getEventDate(eventDetails.name).getText(),
      (date) => expect(date).to.equal(expectedDate),
      () => MyEventsPage.getEventType(eventDetails.name).getText(),
      (eventType) => expect(eventType).to.equal('One off'),
      () => {
        var subSteps = [];
        eventDetails.sessions.forEach(function (session) {
          var expectedSessionTicketNames = session.tickets.map(function (ticket) {
            return ticket.name;
          });
          subSteps.push(() => MyEventsPage.getSessionDescription(eventDetails.name, session.name).getText());
          subSteps.push((sessionDescription) => expect(sessionDescription).to.equal(session.description));
          subSteps.push(() => MyEventsPage.getSessionTickets(eventDetails.name, session.name));
          subSteps.push((sessionTickets) => {
            var promises = [];
            var sessionTicketNames = [];
            sessionTickets.value.forEach(function (sessionTicket) {
              promises.push(() => browser.elementIdText(sessionTicket.ELEMENT));
              promises.push((text) => sessionTicketNames.push(text.value));
            });
            return promiseSeries(promises)
              .then(() => Promise.resolve(sessionTicketNames));
          });
          subSteps.push((sessionTicketNames) => {
            expect(sessionTicketNames).to.have.members(expectedSessionTicketNames);
          });
        });
        return promiseSeries(subSteps);
      }
    ]);
  });

  it('should appear correctly on the dojo page', function () {
    var expectedDate = moment(eventDetails.date).format('Do MMMM YYYY');
    var expectedStartTime = moment(eventDetails.startTime).format('HH:mm');
    var expectedEndTime = moment(eventDetails.endTime).format('HH:mm');
    return promiseSeries([
      () => MyDojosPage.userMenu.click(),
      () => MyDojosPage.userMenu_myDojos.click(),
      () => MyDojosPage.getListingLink(dojos.dojo1.name).click(),
      () => ViewDojoPage.firstEventCard,
      () => ViewDojoPage.getEventAddress(eventDetails.name).getText(),
      (eventAddress) => expect(eventAddress).to.equal(eventDetails.address),
      () => ViewDojoPage.getEventCity(eventDetails.name).getText(),
      (eventCity) => expect(eventCity).to.equal(eventDetails.city),
      () => ViewDojoPage.getEventDescription(eventDetails.name).getText(),
      (eventDesc) => expect(eventDesc).to.equal(eventDetails.description),
      () => ViewDojoPage.getEventDate(eventDetails.name).getText(),
      (eventDate) => expect(eventDate).to.equal(expectedDate),
      () => ViewDojoPage.getEventStartTime(eventDetails.name).getText(),
      (eventStartTime) => expect(eventStartTime).to.equal(expectedStartTime),
      () => ViewDojoPage.getEventEndTime(eventDetails.name).getText(),
      (eventEndTime) => expect(eventEndTime).to.equal(expectedEndTime)
    ]);
  });

  // TODO: Implement the rest of the tests
  // it('should appear correctly on the single event page', function () {
  //   return promiseSeries([
  //     () => MyDojosPage.userMenu.click(),
  //     () => MyDojosPage.userMenu_myDojos.click(),
  //     () => MyDojosPage.getListingLink(dojos.dojo1.name).click(),
  //     () => ViewDojoPage.firstEventCard,
  //     () => ViewDojoPage.getEventBookButton(eventDetails.name).click()
  //   ]);
  // });

  // describe('share functionality on dojo page', function () {
  //   // We don't want to check page contents here, as it could be changed by the provider

  //   it('should open a Facebook share window with the correct URL', function () {

  //   });

  //   it('should open a Twitter share window with the correct URL', function () {

  //   });

  //   it('should show the correct embed code', function () {

  //   });
  // });

  // describe('share functionality on event page', function () {
  //   // We don't want to check page contents here, as it could be changed by the provider

  //   it('should open a Facebook share window with the correct URL', function () {

  //   });

  //   it('should open a Twitter share window with the correct URL', function () {

  //   });

  //   it('should show the correct embed code', function () {

  //   });
  // });
});
