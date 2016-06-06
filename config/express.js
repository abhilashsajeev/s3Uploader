'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('../app/routes');

module.exports = function(config) {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static('public'));
  app.use('/bower_components', express.static('../bower_components'));
  
  require('../app/routes/')(app);

  app.use(function(error, req, res, next){
    if (process.env.NODE_ENV === 'development-us' || process.env.NODE_ENV === 'development-fr' ||
      process.env.NODE_ENV === 'development') {
      console.log(error.message);
      console.log(error.stack);
    }

    if(error.safe) {
      res.status(400).json({
        code: error.code,
        msg: error.msg
      });
    }
    
    res.status(500).json({
      code: 1000,
      msg: 'Internal error'
    });
  });
  // catch 404 error 
  app.use(function(req, res) {
    res.sendStatus(404);
  });

  return app;
};
