const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const authRoutes=require('./Auth/authRoutes');
const protectedRoutes=require('./Auth/protectedRoutes')
const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());


app.get('/test-connection', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()'); // Query the database directly
        console.log('Database connected at:', result.rows[0].now); // Log the connection time
        res.json({ message: 'Database connected!', time: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).json({ error: 'Database connection failed!' });
    }
});


// Register routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

//Log in routes



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


