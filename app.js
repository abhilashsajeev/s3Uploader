'use strict';
var express = require('express');
var logger = require('morgan');
var routes = require('./app/routes');
var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(routes);

app.listen(3000, function () {
  
});
