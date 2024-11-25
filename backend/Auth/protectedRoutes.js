const express = require('express');
const authMiddleware = require('./authMiddleware');
const roleMiddleware = require('./roleMiddleware'); // Role middleware
const router = express.Router();

// Admin route (only accessible by Admin)
router.get('/admin-dashboard', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

// HR route (accessible by HR and Admin)
router.get('/hr-dashboard', authMiddleware, roleMiddleware(['HR', 'Admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the HR dashboard' });
});

// General route (accessible by both Admin and HR)
router.get('/user-dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.user.role}` });
});

module.exports = router;
