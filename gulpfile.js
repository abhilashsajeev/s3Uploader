'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.paths = {
  scripts: ['public/uploader/*.js', './app/**/*.js']
};

gulp.task('sourceIntegration', function () {

  return gulp.src(['./public/router.js',
      './public/uploader/upload-controller.js',
      './public/uploader/background-image-directive.js',
      './public/uploader/upload-directive.js',
      './public/uploader/upload-service.js'
    ])
    .pipe(concat('./public/source-integrated-file.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

require('require-dir')('./gulp');
