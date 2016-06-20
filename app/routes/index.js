var uploadAPI = require('./upload-router');
var listAllAPI = require('./list-all-router');
var updateDataAPI = require('./update-data-router');
var listRegionsAPI = require('./list-regions-router');
var homPageAPI = require('./home-router');

module.exports = function (app) {
  app.use('/list-all', listAllAPI);
  app.use('/update-data', updateDataAPI);
  app.use('/list-regions', listRegionsAPI);
  app.use('/upload-file', uploadAPI);
  app.use('*', homPageAPI);

};
