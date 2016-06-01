'use strict';

var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var paths = gulp.paths;

/**
 * Beautify JS
 */

gulp.task('beautify', function () {
  console.log(paths);
  gulp.src(paths.scripts[0], {
      base: './'
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
