'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
// const downloadPath = require('./constants').UPLOAD_FOLDER_PATH;

module.exports = function (config) {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static('public'));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  require('../app/routes')(app);

  return app;
};
