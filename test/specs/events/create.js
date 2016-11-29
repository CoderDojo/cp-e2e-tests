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
  this.timeout(120000);

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
    LoginPage.open();
    LoginPage.login(users.champion1.email, users.champion1.password);
    MyDojosPage.userMenu.click();
    MyDojosPage.userMenu_myDojos.click();
    MyDojosPage.getManageEventsLink(dojos.dojo1.name).click();
    ManageEventsPage.createEventButton.click();
    EditEventPage.eventDetailsCard.click();
    EditEventPage.eventName.setValue(eventDetails.name);
    EditEventPage.setEventDescription(eventDetails.description);
    EditEventPage.oneOffRadioButton.click();
    EditEventPage.setFromDate(eventDetails.date);
    EditEventPage.setStartTime(eventDetails.startTime);
    EditEventPage.setEndTime(eventDetails.endTime);
    EditEventPage.eventTicketsCard.click();
    eventDetails.sessions.forEach(function (session, sessionIndex) {
      if (sessionIndex !== 0) {
        EditEventPage.addSessionButton.click();
      }
      EditEventPage.getSessionNameInput(sessionIndex).setValue(session.name);
      EditEventPage.getSessionDescriptionInput(sessionIndex).setValue(session.description);
      session.tickets.forEach(function (ticket, ticketIndex) {
        if (ticketIndex !== 0) {
          EditEventPage.getAddTicketButton(sessionIndex).click();
        }
        EditEventPage.getTicketNameInput(sessionIndex, ticketIndex).setValue(ticket.name);
        EditEventPage.setTicketUserType(sessionIndex, ticketIndex, ticket.type);
        EditEventPage.getTicketQuantityInput(sessionIndex, ticketIndex).setValue(ticket.quantity);
      });
    });
    EditEventPage.publish.click();
    ManageApplicationsPage.page.waitForVisible(5000);
  })

  // after(function () {
  //   browser.deleteCookie();
  // });

  it('should appear correctly on the manage events page', function () {
    MyDojosPage.userMenu.click();
    MyDojosPage.userMenu_myDojos.click();
    MyDojosPage.getManageEventsLink('dojo1').click();
    var eventLink = ManageEventsPage.getEventLink(eventDetails.name);
    var date = ManageEventsPage.getDate(eventDetails.name);
    var capacity = ManageEventsPage.getCapacity(eventDetails.name);
    var applicants = ManageEventsPage.getApplicants(eventDetails.name);
    var attending = ManageEventsPage.getAttending(eventDetails.name);
    var status = ManageEventsPage.getStatus(eventDetails.name);
    expect(eventLink.getText()).to.equal(eventDetails.name);
    expect(date.getText()).to.equal(moment.utc(eventDetails.date).format('MMMM Do YYYY'));
    browser.waitUntil(function () {
      return capacity.getText() === eventDetails.capacity;
    }, 5000);
    expect(capacity.getText()).to.equal(eventDetails.capacity);
    expect(applicants.getText()).to.equal('0');
    expect(attending.getText()).to.equal('0');
    expect(status.getText()).to.equal('published');
  });

  it('should appear correctly on the "My Events" page', function () {
    var expectedDate = moment(eventDetails.date).format('Do MMMM YY') + ', ' +
                        moment(eventDetails.startTime).format('HH:mm') +  ' - ' +
                        moment(eventDetails.endTime).format('HH:mm');

    MyEventsPage.userMenu.click();
    MyEventsPage.userMenu_myEvents.click();
    MyEventsPage.getEventRow(eventDetails.name).click();
    var date = MyEventsPage.getEventDate(eventDetails.name);
    var eventType = MyEventsPage.getEventType(eventDetails.name);
    expect(date.getText()).to.equal(expectedDate);
    expect(eventType.getText()).to.equal('one-off');
    eventDetails.sessions.forEach(function (session) {
      var sessionDescription = MyEventsPage.getSessionDescription(eventDetails.name, session.name);
      expect(sessionDescription.getText()).to.equal(session.description);
      var sessionTickets = MyEventsPage.getSessionTickets(eventDetails.name, session.name);
      var sessionTicketNames = sessionTickets.map(function (sessionTicket) {
        return sessionTicket.getText();
      });
      var expectedSessionTicketNames = session.tickets.map(function (ticket) {
        return ticket.name;
      });
      expect(sessionTicketNames).to.have.members(expectedSessionTicketNames);
    });
  });

  it('should appear correctly on the dojo page', function () {
    var expectedDate = moment(eventDetails.date).format('Do MMMM YYYY');
    var expectedStartTime = moment(eventDetails.startTime).format('HH:mm');
    var expectedEndTime = moment(eventDetails.endTime).format('HH:mm');
    MyDojosPage.userMenu.click();
    MyDojosPage.userMenu_myDojos.click();
    MyDojosPage.getListingLink(dojos.dojo1.name).click();
    ViewDojoPage.firstEventCard.waitForVisible();
    var eventAddress = ViewDojoPage.getEventAddress(eventDetails.name);
    var eventCity = ViewDojoPage.getEventCity(eventDetails.name);
    var eventDesc = ViewDojoPage.getEventDescription(eventDetails.name);
    var eventDate = ViewDojoPage.getEventDate(eventDetails.name);
    var eventStartTime = ViewDojoPage.getEventStartTime(eventDetails.name);
    var eventEndTime = ViewDojoPage.getEventEndTime(eventDetails.name);
    expect(eventAddress.getText()).to.equal(eventDetails.address);
    expect(eventCity.getText()).to.equal(eventDetails.city);
    expect(eventDesc.getText()).to.equal(eventDetails.description);
    expect(eventDate.getText()).to.equal(expectedDate);
    expect(eventStartTime.getText()).to.equal(expectedStartTime);
    expect(eventEndTime.getText()).to.equal(expectedEndTime);
  });

  it('should appear correctly on the single event page', function () {
    MyDojosPage.userMenu.click();
    MyDojosPage.userMenu_myDojos.click();
    MyDojosPage.getListingLink(dojos.dojo1.name).click();
    ViewDojoPage.firstEventCard.waitForVisible();
    ViewDojoPage.getEventBookButton(dojos.dojo1.name).click();
    browser.pause(10000);
  });

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
