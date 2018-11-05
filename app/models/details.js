var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetailSchema = new Schema({
  bname: String,
  pno: Number,
  email: String,
  baddress: String,
});

module.exports = mongoose.model('Details',DetailSchema);
