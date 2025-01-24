const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');
const authRoutes=require('./Auth/authRoutes');
const protectedRoutes=require('./Auth/protectedRoutes');
const departmentRoutes=require('./routes/departmentRoutes');
const employeeRoutes=require('./routes/employeeRoutes')
const benefitRoutes=require('./routes/benefitsRoutes');
const performanceReviewRoutes=require('./routes/performanceReviewRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes')






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



app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/departments',departmentRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api/benefits',benefitRoutes);
app.use('/api/performanceReview',performanceReviewRoutes);
app.use('/api/attendance',attendanceRoutes)






app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


