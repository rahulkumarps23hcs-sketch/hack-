// Simple JWT authentication middleware for demo purposes.
// Verifies Authorization: Bearer <token> and attaches the decoded
// payload to req.user. Returns 401 on missing or invalid tokens.

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hackathon-super-secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (!token || (scheme && scheme.toLowerCase() !== 'bearer')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
