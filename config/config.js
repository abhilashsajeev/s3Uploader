'use strict';

var glob = require('glob');

glob('./config/env/' + process.env.NODE_ENV + '.js', {
  sync: true
}, function (err, envFiles) {
  if (err) {
    throw err;
  }
  if (!envFiles.length) {
    if (process.env.NODE_ENV) {
      console.error('There is no configuration file');
    } else {
      console.error('NODE_ENV is not defined');
    }
    process.env.NODE_ENV = 'development';
    console.log('Running on development env');
  } else {
    console.log('Running on environment', process.env.NODE_ENV);
  }
});

module.exports = require('./env/' + process.env.NODE_ENV) || {};
