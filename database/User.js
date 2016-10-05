var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String
});


//Método para encriptar la contraseña
UserSchema.methods.hasPassword = function (myPlaintextPassword, cb) {
  bcrypt.genSalt(10, function (err, salt) {
    if(err){
      return cb('Ocurrio un error');
    }
    bcrypt.hash(myPlaintextPassword, salt, function (err, data) {
      if(err){
        return cb('Ocurrio un error');
      }
      cb(null, data);
    });
  });
};

//Método para comparar contraseñas en el login
UserSchema.methods.comparePassword = function (candidatePassword, hashedPassword, cb) {
  bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
    if(err){
      return cb(err);
    }
    return cb(null, isMatch);
  });
};


// Antes de insertar encripta la contraseña
UserSchema.pre('save', function (next) {
  var user = this;
  this.hasPassword(user.password, function (err, hash) {
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;