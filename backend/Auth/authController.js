// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await User.register(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// controllers/authController.js
exports.createHRUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Register a new user with the role 'HR'
        await User.register(username, email, password, 'HR');
        res.status(201).json({ message: 'HR user created successfully' });
    } catch (error) {
        if (error.code === '23505') { // PostgreSQL unique constraint violation
            return res.status(400).json({ message: 'Email already exists' });
        }

        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};