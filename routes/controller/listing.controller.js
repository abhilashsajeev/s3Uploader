var listing = require('../services/listing.services.js');

module.exports.listFetch = function (req, res) {
  listing.listFetching(req.query.storedData, parseInt(req.query.skip), parseInt(req.query.count))
    .then(function (data) {
      res.status(200).send({
        'message': 'Updated',
        'data': data
      });
    }, function (err) {
      res.status(500).send({
        'message': 'fetching failed'
      });
    });
};
