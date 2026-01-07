const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  // other user fields...
});

module.exports = mongoose.model('user', UserSchema);