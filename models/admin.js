const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email : {type: Email, required: true},
  role : "Admin"
});

module.exports = mongoose.model('Admin', adminSchema);