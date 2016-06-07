'use strict';
var db = require('../services/db-service');
var _ = require('lodash');
var aws = require('../services/aws-services.js');
exports.updateMongo = function (req, res) {
  var id = req.body._id;
  req.body = _.omit(req.body, ['_id']);
  db.updateMongoDb(id, req.body)
    .then(function (data) {
      var pickedObjects = _.pick(data, ['metaTitle', 'metaDescription']);
      var filePath = (data.sheetName + '/' + data.category.replace(/\s>\s|>\s|>|\s>/g, '/')).trim() +
        '/' + data.categoryId + '.json';
      filePath = filePath.replace(/\s/g, '_');
      aws.upload(filePath, JSON.stringify(pickedObjects));
      res.status(200).send({
        'message': 'Updated',
        'data': data
      });
    }, function (err) {
      res.status(500).send({
        'message': 'Updation failed'
      });
    });
};
