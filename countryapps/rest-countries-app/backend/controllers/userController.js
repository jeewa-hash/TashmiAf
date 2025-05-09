const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Import your user model

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Send success response
    res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("❌ Error during registration:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send success response with token
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error("❌ Error during login:", err);
    res.status(500).json({ message: 'Server error' });
  }
};