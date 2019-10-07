var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
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
UserSchema.statics.authenticate = function (name, password, callback) {
    User.findOne({ name: name })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

module.exports = User = mongoose.model("User", UserSchema);
