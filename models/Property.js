const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
  },
  bathrooms: {
    type: DataTypes.FLOAT,
  },
  sqft: {
    type: DataTypes.FLOAT,
  },
  listingstatus: {
    type: DataTypes.ENUM('sold', 'coming-soon', 'for-sale'),
  },
  zillowlink: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.JSON, // Store image URLs as an array
    allowNull: true,
  },
}, {
    tableName: "properties",
    timestamps: false,
});

module.exports = Property;