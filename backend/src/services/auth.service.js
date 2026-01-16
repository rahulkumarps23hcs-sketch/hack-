// Auth service layer.
// Handles mock authentication and JWT issuing using the in-memory users model.

const jwt = require('jsonwebtoken');
const { users } = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'hackathon-super-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function login({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = createToken(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    token,
  };
}

async function register({ name, email, password, role }) {
  if (!name || !email || !password) {
    throw new Error('Name, email and password are required');
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error('User with this email already exists');
  }

  const normalizedRole = role || 'PATIENT';

  const user = {
    id: generateId('user'),
    email,
    password, // plain text for demo only
    role: normalizedRole,
    name,
  };

  users.push(user);

  const token = createToken(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    token,
  };
}

module.exports = {
  login,
  register,
};
