// models/User.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

class User {
    static async register(username, email, password, role = 'HR') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
        return pool.query(query, [username, email, hashedPassword, role]);
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }
}

module.exports = User;