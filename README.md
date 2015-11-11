# cp-e2e-tests

Requires Java (tested on version 1.7.0_79)

To run all the tests execute
```
npm test
```

To run all tests that have a specific tag execute
```
npm test -- --tag 'badges'
```

To run all tests that in a group (same sub-folder) execute

```
npm test -- --group smoketests
```

To run all tests located in a file execute

```
npm test --  --test tests/demotest.js
```

To run in a specific environment all tests with a tag
```
npm test -- --env chrome --tag badges
```
