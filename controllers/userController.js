const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Profile Controller Function
const profile = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ uniqueId: decoded.userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ name: user.name, email: user.email, uniqueId: user.uniqueId });
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = { profile };
