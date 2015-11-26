# CoderDojo end-to-end tests

## Install

```
npm install
```

## Test suite prerequisites

In the `nightwatch.json` it can be configured the url of the application to be tested. The `http://localhost:8000` is currently configured assuming the the CoderDojo application is running on the local machine.

In order to have the tests running they need the CoderDojo application to already have `mentor, admin, champion` accounts created.
In the `globals.json` file the credentials for these accounts need to be set.

>To use the already preconfigured accounts from the `globals.json` file you can have these accounts generated with the CoderDojo test data generator: 
in the `cp-users-service/test/lib/test-user-data.js` add the following test accounts and they are inserted in the database when generating test data.

```
var users = [
    { nick: 'admin@example.com', name: 'Admin', email: 'admin@example.com', password: 'test', roles: ['cdf-admin'], initUserType: { name: 'champion'}},
    { nick: 'manager@example.com', name: 'Manager', email: 'manager@example.com', password: 'test', roles: ['cdf-admin'], initUserType: {name:  'champion'}},
    { nick: 'mentor1@example.com', name: 'Mentor1', email: 'mentor1@example.com', password: 'testmentor1', roles: ['basic-user'], initUserType: {name: 'mentor'}},
    { nick: 'mentor2@example.com', name: 'Mentor2', email: 'mentor2@example.com', password: 'testmentor2', roles: ['basic-user'], initUserType: {name: 'mentor'}},
    { nick: 'champion1@example.com', name: 'Champion1', email: 'champion1@example.com', password: 'testchampion1', roles: ['basic-user'], initUserType: {name: 'champion'}}
  ];
```

The test suite can be run in the PhantomJS headless browser or in the Chrome Selenium Driver. 
See the `Running tests section` to see details on how to run tests on these browsers.

Test suites are configured in the `nightwatch.json` file. Phantom and Chrome are configured but also other browser configurations can be added.

## Verify that the test suite is configured correctly

To verify that tests are working start the CoderDojo suite on localhost and run the `smoke` tests:

```
npm test -- --env chrome --tag smoke
```

## Running tests

To run all the tests with the default browser (that is PhantomJS): 

```
npm test
```

To run all the tests with Chrome: 

```
npm test -- --env chrome
```

To run in a specific environment all tests with a tag: 

```
npm test -- --env chrome --tag smoke
```

To run all tests in a group (same sub-folder) execute

```
npm test -- --group smoketests
```

To run all tests located in a file execute

```
npm test --  --test tests/demotest.js
```
