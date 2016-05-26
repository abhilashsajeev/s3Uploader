'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('start', ['beautify', 'lint'], function () {
nodemon({
script: 'app.js'
});
});