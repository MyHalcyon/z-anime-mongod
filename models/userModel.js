const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    uniqueId: { type: String, unique: true, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
