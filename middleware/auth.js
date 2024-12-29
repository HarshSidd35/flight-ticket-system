const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify if the user is authenticated
const isUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = await User.findById(verified.id);
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to verify if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { isUser, isAdmin };
