const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false }
});

UserSchema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) return next();

  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(err => next(err));
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
