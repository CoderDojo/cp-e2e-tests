var commands = [
  'checkRecaptcha',
  'getLoggedInUserInstance',
  'insertIntoCkEditor',
  'login',
  'logout',
  'register',
  'selectDate',
  'selectTime',
  'uiSelectFilterAndSelect',
  'toggleProfileMenu'
];

commands.forEach(function (command) {
  require('./' + command);
});
