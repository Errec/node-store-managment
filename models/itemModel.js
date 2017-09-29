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

var financeSchema = new Schema({
  totalSold: String,
  totalItemsSold: String,
  discount: {
    code: String,
    quantity: String
  }
});

var Store = {Items: mongoose.model('Items', itemSchema), Finance: mongoose.model('Finance', financeSchema)};

module.exports = Store;
