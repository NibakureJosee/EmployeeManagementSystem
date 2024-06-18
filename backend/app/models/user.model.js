const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/connectionPool');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - firstName
 *       - lastName
 *       - email
 *       - password
 */

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
});

// Sync student model with the database
(async () => {
  try {
    await User.sync();
    console.log("User table created successfully");
  } catch (err) {
    console.error("Error syncing User table:", err);
  }
})();

User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  return token;
};

module.exports = User;

module.exports.validateUser = (body, isUpdating = false) => {
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
  }).validate(body);
};

module.exports.validateUserLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);
};
