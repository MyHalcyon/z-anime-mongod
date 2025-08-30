const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

// Signup Controller Function
const signup = async (req, res) => {
    // Extract email and password from query params or body
    const email = req.query.email || req.body.email;
    const password = req.query.password || req.body.password;

    // Ensure both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueId = uuidv4(); // Generate a unique UUID for the user

        const newUser = new User({
            email,
            password: hashedPassword,
            uniqueId,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', uniqueId });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


// Login Controller Function

const login = async (req, res) => {
    // Log the incoming request data
    console.log('Request Body:', req.body);      // Logs the body content
    console.log('Request Query:', req.query);    // Logs the query parameters

    // Extract email and password from query parameters or body
    const { email, password } = req.query || req.body;  // Try to extract from query params first, then body

    console.log('Extracted email:', email);   // Log the extracted email
    console.log('Extracted password:', password);   // Log the extracted password

    // Ensure both email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: 'Incorrect password' });
    }

    // If login is successful, return the uniqueId after successful login
    res.json({ message: 'Login successful', uniqueId: user.uniqueId });
};

// Reset Password Controller Function
const resetPassword = async (req, res) => {
    const { uniqueId, newPassword } = req.body;

    const user = await User.findOne({ uniqueId });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    try {
        await user.save();
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { signup, login, resetPassword };
