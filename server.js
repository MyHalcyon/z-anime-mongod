const app = require('./app');

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
