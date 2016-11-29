var commands = [
  'checkRecaptcha',
  'getLoggedInUserInstance',
  'insertIntoCkEditor',
  'login',
  'register',
  'selectDate',
  'selectTime',
  'uiSelectFilterAndSelect',
  'uiSelectFilterAndSelect2'
];

commands.forEach(function (command) {
  require('./' + command);
});
