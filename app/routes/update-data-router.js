var express = require('express');
var _ = require('lodash');
var router = express.Router();

var updateData = require('../controllers/update-data.js');

router.post('/', function (req, res, next) {
  var id = req.body._id;
  req.body = _.omit(req.body, ['originalId', 'download_link', 'arrayIndex']);
  updateData.update(id, req.body)
    .then(function (data) {
      res.status(200).send(
        {
          responseCode: 200,
          responseMessage:'Data updated successfully',
          data: data
        }
      );
    }, function (err) {
       res.status(err.status || 500 ).send(err.message || 'Upload Failed due to some internal issues.');
    });

});


module.exports = router;
