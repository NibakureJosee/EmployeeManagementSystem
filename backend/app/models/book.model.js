const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       author:
 *         type: string
 *       publisher:
 *         type: string
 *       publicationYear:
 *         type: string
 *       subject:
 *         type: string
 *     required:
 *       - name
 *       - author
 *       - publisher
 *       - publicationYear
 *       - subject
 */

const Book = sequelize.define("books", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
});

// Sync book model with the database
(async () => {
  try {
    await Book.sync();
    console.log("book table created successfully");
  } catch (err) {
    console.error("Error syncing book table:", err);
  }
})();

module.exports = Book;

module.exports.validateBook = (body) => {
  return Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    publisher: Joi.string().required(),
    publicationYear: Joi.string().required(),
    subject: Joi.string().required(),
  }).validate(body);
};
