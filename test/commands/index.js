var commands = [
  'checkRecaptcha',
  'getLoggedInUserInstance',
  'insertIntoCkEditor',
  'login',
  'register',
  'selectDate',
  'selectTime',
  'uiSelectFilterAndSelect',
  'toggleProfileMenu'
];

commands.forEach(function (command) {
  require('./' + command);
});
