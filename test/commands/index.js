var commands = [
  'checkRecaptcha',
  'getLoggedInUserInstance',
  'insertIntoCkEditor',
  'login',
  'register',
  'selectDate',
  'selectTime',
  'uiSelectFilterAndSelect'
];

commands.forEach(function (command) {
  require('./' + command);
});
