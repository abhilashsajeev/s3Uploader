'use strict';

const fileController = require('./file-router');

module.exports = function (app) {
  app.use('/', fileController);
};
