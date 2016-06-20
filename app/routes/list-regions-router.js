var express = require('express');
var router = express.Router();

var retrieveRegions = require('../controllers/retrieve-regions-controller.js');

router.get('/', function (req, res, next) {
  retrieveRegions.listRegions()
  .then(function (data) {
    res.status(200).send(
      {
        responseCode: 200,
        responseMessage:'Data fetching successfull',
        data: data
      }
    );
  }, function (err) {
    res.status(err.status || 500 ).send(err.message || 'Upload Failed due to some internal issues.');
  });
});

module.exports = router;
