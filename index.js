// index.js
require('dotenv').config
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contactRoutes');
const sequelize = require('./config/mysqlConfig');

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the contact routes
app.use('/api', contactRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Sync the database
  sequelize.sync()
    .then(() => {
      console.log('Database connected and synced');
    })
    .catch(err => {
      console.error('Failed to sync the database:', err);
    });
});
