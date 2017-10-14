var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  code: String,
  brand: String,
  description: {
    category: String,
    about: String,
    color : String,
    sex: String,
    size: String
  },
  quantity: {
    bought: String,
    sold: String
  },
  value: {
    bought: String,
    sold: String,
    tag: String
  }
});

var Items = mongoose.model('Finance', itemSchema);

module.exports = Items;
