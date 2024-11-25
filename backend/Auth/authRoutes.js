const express = require('express');
const { registerUser, loginUser } = require('./authController'); // Adjust path as needed
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
