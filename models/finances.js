var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var financeSchema = new Schema({
  totalSold: String,
  totalItemsSold: String,
  discount: {
    code: String,
    quantity: String
  }
});

var Finances = mongoose.model('Finance', financeSchema);

module.exports = Finances;
