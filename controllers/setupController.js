var Items = require('../models/items.js');
var itemsData = require('../tables/data.json');

module.exports = function(app) {
  app.get('/api/setupItems', function(req, res) {
    Items.create(itemsData, function (err, results) {
      res.send(results);
    });
  });
};
