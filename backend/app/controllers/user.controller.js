const bcrypt = require('bcryptjs');
const { validateUser, validateUserLogin } = require('../models/user.model');
const User = require('../models/user.model');
const { generateAuthToken } = require('../utils/imports'); // Assuming generateAuthToken is defined in utils/imports.js

/**
 * Create a new user
 * @param {*} req 
 * @param {*} res 
 */
exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10); // Using bcrypt.hash directly

    // Create new user
    const newUser = await User.create(req.body);

    return res.status(201).send({ message: 'User created successfully', data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};

/**
 * Login User
 * @param {*} req 
 * @param {*} res 
 */
exports.userLogin = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Find user by email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: 'Invalid credentials' });
    }

    // Validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(404).send({ message: 'Invalid credentials' });a
    }

    // Generate JWT token
    const token = generateAuthToken(user); // Assuming generateAuthToken method is correctly implemented

    return res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
};
