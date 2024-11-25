const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Adjust path as necessary

// Register user function
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields (name, email, password, role) are required' });
        }

        // Check if email is valid (basic check)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the email is already in use
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Strong password validation (minimum 8 characters, at least one number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into the database
        const result = await pool.query(
            `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



// Login user function
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if email is valid (basic check)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Query the database for the user by email
        const userResult = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = userResult.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Export the functions
module.exports = { registerUser, loginUser };
