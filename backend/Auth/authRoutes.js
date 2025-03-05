const express = require('express');
const authController=require('../Auth/authController')
const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/create-hr-user', authController.createHRUser);

module.exports = router;
