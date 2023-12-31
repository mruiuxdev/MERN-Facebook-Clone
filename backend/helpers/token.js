const jwt = require("jsonwebtoken");

const generateToken = (payload, expired) =>
  jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expired });

module.exports = { generateToken };
