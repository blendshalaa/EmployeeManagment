// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../Auth/roleMiddleware');

// HR Dashboard (Accessible only to HR users)
router.get('/hr-dashboard', authenticateToken, authorizeRole('HR'), (req, res) => {
    res.json({ message: 'Welcome to the HR dashboard' });
});

// Admin Dashboard (Accessible only to Admin users)
router.get('/admin-dashboard', authenticateToken, authorizeRole('Admin'), (req, res) => {
    res.json({ message: 'Welcome to the Admin dashboard' });
});

// General Dashboard (Accessible to both HR and Admin users)
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to your dashboard, ${req.user.role}` });
});

module.exports = router;