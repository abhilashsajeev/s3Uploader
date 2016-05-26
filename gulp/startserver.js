'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('start', ['beautify'], function () {
  nodemon({
    script: './bin/www'
  });
});
