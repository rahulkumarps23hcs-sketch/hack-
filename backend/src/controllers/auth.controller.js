// Auth HTTP controller.
// Wires HTTP endpoints to the auth service for mock login and registration.

const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    const user = result.user || {};

    return res.json({
      message: 'Login successful',
      token: result.token,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    if (err && err.message === 'Invalid email or password') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (err && err.message === 'Email and password are required') {
      return res.status(400).json({ message: err.message });
    }

    return next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    const user = result.user || {};

    return res.status(201).json({
      message: 'Registration successful',
      token: result.token,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    if (
      err &&
      (err.message === 'User with this email already exists' ||
        err.message === 'Name, email and password are required')
    ) {
      return res.status(400).json({ message: err.message });
    }

    return next(err);
  }
};
