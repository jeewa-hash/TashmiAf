const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect route
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if the Authorization header is available and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token is found
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');

    // Fetch the user associated with the token
    req.user = await User.findById(decoded.userId).select('-password'); // Exclude password

    // If the user is not found
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Allow the request to proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired, please log in again' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Generic error handling
    res.status(401).json({ message: 'Not authorized', error: error.message });
  }
};

module.exports = { protect };