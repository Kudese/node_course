const jwt = require('jsonwebtoken');

// Sign jwt helper function
module.exports = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
