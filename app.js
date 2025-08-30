const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());  // To parse JSON data from the body
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data (form data)

// CORS setup
app.use(cors({ origin: '*' }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
