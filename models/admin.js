const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
    },
  password: { 
    type: String, 
    required: true 
    },
  email : {
    type: String, 
    required: true
    },
  users : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  role : "Admin"
});

module.exports = mongoose.model('Admin', adminSchema);