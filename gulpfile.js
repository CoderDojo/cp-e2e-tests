var yargs = require('yargs');
var argv = yargs.argv;
var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var del = require('del');
var shell = require('gulp-shell');
var semistandard = require('gulp-semistandard');

var customWdioConfig = {};
if (argv.baseUrl) {
  customWdioConfig.baseUrl = argv.baseUrl;
}
if (argv.spec) {
  customWdioConfig.spec = argv.spec;
}

gulp.task('clean', function () {
  return del([
    './allure-results',
    './allure-report'
  ]);
});

gulp.task('semistandard', function () {
  return gulp.src('./test/**/*.js')
    .pipe(semistandard())
    .pipe(semistandard.reporter('default', {
      breakOnError: true
    }));
});

var testsFailed = false;
gulp.task('wdio', ['semistandard', 'clean'], function() {
  return gulp.src('wdio.conf.js').pipe(webdriver(customWdioConfig))
  .on('error', function (err) {
    // We still want the report to generate if a test fails, so surpress the error
    testsFailed = true;
    this.emit('end');
  });
});

gulp.task('generate-report', ['clean', 'wdio'], shell.task([
  './node_modules/.bin/allure generate allure-results'
]));

gulp.task('test', ['generate-report'], function () {
  // If tests failed earlier, we want to make sure that gulp exits with 1
  if (testsFailed) {
    console.log('Some tests failed. Check the report by running `npm run report`.');
    process.exit(1);
  }
});

gulp.task('default', ['test']);
