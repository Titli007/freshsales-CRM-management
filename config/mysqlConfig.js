require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// Create a connection to MySQL database
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }
);

module.exports = sequelize ;
