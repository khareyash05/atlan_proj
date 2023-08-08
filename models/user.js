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
    type: String, 
    required: true
    },
    // check to which admin the user belongs to
  admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin'
    },
  role : "User",
  // evaluations by admin
  evaluations  : {
    type : String,
  }
});

module.exports = mongoose.model('User', userSchema);