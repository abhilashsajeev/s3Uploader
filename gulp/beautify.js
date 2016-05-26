'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var prettify = require('gulp-jsbeautifier');

/**
 * Beautify JS
 */
gulp.task('beautify', function () {
  gulp.src(paths.scripts, {
      base: '.'
    })
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest('.'));
});

/**
 * Check if code can be beautified
 * without overwriting.
 * Fails if it can be beautifed.
 */
gulp.task('beautify:build', function () {
  gulp.src(paths.scripts)
    .pipe(prettify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_ONLY'
    }));
});
