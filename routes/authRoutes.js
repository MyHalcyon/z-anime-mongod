const express = require('express');
const router = express.Router();
const { signup, login, resetPassword } = require('../controllers/authController');

// POST request for signup
router.post('/signup', signup);

// POST request for login
router.post('/login', login);

// POST request for resetting password
router.post('/reset-password', resetPassword);

module.exports = router;
