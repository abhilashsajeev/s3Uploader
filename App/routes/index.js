'use strict';

var uploadAPI = require('./upload-router');

module.exports = function (app) {
  app.use('/', uploadAPI);
};
