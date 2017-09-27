var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema({
  code: String,
  description: String,
  quantity: String,
  quantitySold: String,
  purchaseValue: String,
  soldValue: String,
  discountTotal: String
});

var financeSchema = new Schema({
  totalSold: String,
  totalItemsSold: String
});

var Store = {Items: mongoose.model('Items', itemSchema), Finance: mongoose.model('Finance', financeSchema)};

module.exports = Store;
