'use strict';

var gulp = require('gulp');

gulp.paths = {
  scripts: ['*.js', '*.json']
};

require('require-dir')('./gulp');
