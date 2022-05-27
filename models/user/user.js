'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {type: String, required: true},
  fullName: {type: String, required: true},
  hash_password: {type: String},
  created: {type: Date, default: Date.now},
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('Users', UserSchema);

module.exports = User;
