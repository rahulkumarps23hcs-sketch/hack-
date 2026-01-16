// Role-based access control middleware.
// Usage: roleGuard('ADMIN'), roleGuard('DOCTOR', 'ADMIN'), etc.
// Expects req.user to be populated by the auth middleware.

function roleGuard(...allowedRoles) {
  return function roleGuardMiddleware(req, res, next) {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    return next();
  };
}

module.exports = roleGuard;
