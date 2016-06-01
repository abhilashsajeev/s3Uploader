'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var $ = require('gulp-load-plugins')();

/**
 * JavaScript Linting
 */
gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/**
 * JavaScript Build Lint Task
 */
gulp.task('lint:build', function () {
  return gulp.src(paths.scripts)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});
