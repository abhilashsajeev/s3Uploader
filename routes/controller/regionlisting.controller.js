var regionNames = require('../services/regionlisting.services.js');

module.exports.regionNames = function (req, res) {
  regionNames.regionNameFetching()
    .then(function (data) {
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
