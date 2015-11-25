# CoderDojo end-to-end tests

## Install

```
npm install
```

## Test suite preparation

The test suite can be run in the PhantomJS headless browser or in the Chrome Selenium Driver. 
See the `Running tests section` to see details on how to run tests on these browsers.

Test suites are configured in the `nightwatch.json` file. Phantom and Chrome are configured but also other browser configurations can be added.

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
