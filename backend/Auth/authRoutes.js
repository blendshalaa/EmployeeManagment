const express = require('express');
const authController=require('../Auth/authController')// Adjust path as needed
const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
