const bcrypt = require('bcrypt');

const Admin = require('../models/admin');
const User = require('../models/User');

// Register a new admin
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password ,email} = req.body;

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ username, password: hashedPassword ,email});
    res.status(201).json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, adminId } = req.body; // Include adminId in the request body to match user with its admin

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword, email,admin: adminId });
    
    // update admin with the list of users.
    await Admin.findByIdAndUpdate(adminId,{ $push: { users: user._id } }, )

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
