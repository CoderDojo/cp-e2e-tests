var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var del = require('del');
var shell = require('gulp-shell');

gulp.task('clean', function () {
  return del([
    './allure-results',
    './allure-report'
  ]);
});

gulp.task('test', ['clean'], function() {
    return gulp.src('wdio.conf.js').pipe(webdriver());
});

gulp.task('generate-report', ['clean', 'test'], shell.task([
  './node_modules/.bin/allure generate allure-results'
]));

gulp.task('default', ['generate-report']);
