const mongoose = require('mongoose');

// define the User model schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  password: String,
  name: String
});


module.exports = mongoose.model('User', userSchema);
