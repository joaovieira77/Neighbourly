const jwt = require('jsonwebtoken');

function generateToken(userId, secret, expiresIn = '1d') {
  return jwt.sign({ id: userId }, secret, { expiresIn });
}

module.exports = { generateToken };
