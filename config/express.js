'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var multer = require('multer');
const downloadPath = require('./constants').DOWNLOAD_FILE_PATH;

module.exports = function (config) {

  const app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  require('../app/routes')(app);

  app.use(function (error, req, res, next) {

    if (process.env.NODE_ENV === 'development') {
      console.log(error.message);
      console.log(error.stack);
    }
    res.status(500).json({
      resultCode: 900,
      message: 'Internal error'
    });
  });

  return app;
};