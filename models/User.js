var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("User", UserSchema);
