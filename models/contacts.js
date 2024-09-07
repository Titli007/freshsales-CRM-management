const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysqlConfig');

// Define the Contact model
const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});



// Sync the model with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Failed to create database & tables:', err);
  }
);


module.exports =  Contact ;
