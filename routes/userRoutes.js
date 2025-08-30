const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET /api/users/:uniqueId
router.get('/:uniqueId', async (req, res) => {
  try {
    const { uniqueId } = req.params;

    const user = await User.findOne({ uniqueId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User verified',
      user: {
        uniqueId: user.uniqueId,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Error verifying user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
