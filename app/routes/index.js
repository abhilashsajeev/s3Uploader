'use strict';

const uploadAPI = require('./upload-router');
const listAPI = require('./listing-router');
const updateAPI = require('./update-router');

module.exports = function (app) {
  app.use('/', uploadAPI);
  app.use('/api/list/', listAPI);
  app.use('/api/update', updateAPI);
};
