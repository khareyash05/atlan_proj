const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    },
  password: { 
    type: String, 
    required: true 
    },
  email : {
    type: Email, 
    required: true
    },
  admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin'
    },
  role : "User"
});

module.exports = mongoose.model('User', userSchema);