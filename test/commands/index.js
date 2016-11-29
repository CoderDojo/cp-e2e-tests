var commands = [
  'checkRecaptcha',
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
