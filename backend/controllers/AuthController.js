// /backend/controllers/AuthController.js
const dotenv = require('dotenv');

dotenv.config();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the credentials match the hardcoded values
  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // You can implement token generation or session management here
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
