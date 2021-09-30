var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
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

//authenticate input against database
UserSchema.statics.authenticate = function(name, password, callback) {
  User.findOne({ name: name }).exec(function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

module.exports = User = mongoose.model("User", UserSchema);
