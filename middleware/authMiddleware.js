const Admin = require('../models/Admin');

// Authentication middleware
exports.authenticateAdmin = async (req, res, next) => {
  try {
    const { username } = req.user; 
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // The user is an admin, continue to the next middleware/route
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
