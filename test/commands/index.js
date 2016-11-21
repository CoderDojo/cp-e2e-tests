var commands = [
  'checkRecaptcha',
  'login',
  'register',
  'selectDate',
  'selectTime',
  'uiSelectFilterAndSelect'
];

commands.forEach(function (command) {
  require('./' + command);
});
