const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
