var express = require('express');
var router = express.Router();

var listAllFiles = require('../controllers/list-all-files.js');

router.get('/', function (req, res, next) {
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    var sort = {
    };
    if (req.query.regionId) {
      sort = {
        sheetName: req.query.regionId
      };
    }
    listAllFiles.list(sort, skip, limit)
    .then(function (data) {
      res.status(200).send(
        {
          responseCode: 200,
          responseMessage:'Data fetching successfull',
          data: data
        }
      );
    }, function (err) {
      res.status(err.status || 500 ).send(err.message || 'Cant fetch data.');
    });
});

module.exports = router;
