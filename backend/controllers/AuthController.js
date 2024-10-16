// /backend/controllers/AuthController.js
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET; // Add a secret key in your .env file

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the credentials match the hardcoded values
  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate JWT Token
    const token = jwt.sign({ username: ADMIN_USERNAME }, JWT_SECRET, { expiresIn: '1h' });
   
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
