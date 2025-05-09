const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');  // Import the controller
const router = express.Router();

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

module.exports = router;