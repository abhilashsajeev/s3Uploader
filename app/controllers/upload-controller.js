'use strict';

var exportService = require('../services/export-service.js');
exports.uploadFile = function (req, res) {
  exportService.uploadMethod(req.file.filename)
    .then(function (data) {
      res.send({
        'message': 'Updation successful',
        'data': data
      });
    }, function (err) {
      res.send({
        'message': err.message
      });
    });
};
