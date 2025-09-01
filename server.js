const app = require('./app');
const userRoutes = require('./routes/userRoutes');

// Register routes *before* starting the server
app.use('/api/users', userRoutes);

// Start the server on Render’s assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
