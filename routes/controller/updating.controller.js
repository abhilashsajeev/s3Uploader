var _ = require('lodash');
var db = require('../services/mongodb.services.js');
var updateFakes3 = require('./updatefakes3.js');
module.exports.updatemongo = function (req, res) {
  var id = req.body.id;
  req.body = _.omit(req.body, ['id', 'Downloadlink']);
  db.updatemongoDatabase(id, req.body)
    .then(function (data) {
      updateFakes3.awsUpdate(data);
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
