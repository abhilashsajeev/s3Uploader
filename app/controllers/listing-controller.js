'use strict';
var db = require('../services/db-service');
var _ = require('lodash');

exports.listFetch = function (req, res) {
  var sheetName = req.query.sheet;
  var pageNum = req.query.count;
  var dataCount;
  db.getCount(sheetName)
    .then(function (count) {
      dataCount = count;
      return db.getDataFromMongoDb(sheetName, pageNum);
    }, function (err) {

    })
    .then(function (data) {
      if (_.isEmpty(data)) {
        res.status(444).send({
          'message': 'no matching data found'
        });
      } else {
        res.status(200).send({
          'message': 'fetching successful',
          'data': data,
          'count': dataCount
        });
      }
    }, function (err) {
      res.status(500).send({
        'message': err.message
      });
    });
};

exports.sheetName = function (req, res) {
  db.getSheetNames()
    .then(function (data) {
      if (_.isEmpty(data)) {
        res.status(444).send({
          'message': 'no matching data found'
        });
      } else {
        var sheets = _.uniqBy(data, 'sheetName');
        res.status(200).send({
          'message': 'fetching successful',
          'data': sheets
        });
      }
    }, function (err) {
      res.status(500).send({
        'message': 'fetching failed'
      });
    });
};
