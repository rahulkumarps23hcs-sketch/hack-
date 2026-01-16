// Mock authentication middleware
// In production, this would verify JWT tokens

const mockUsers = {
  'patient-token': { id: '1', role: 'patient', name: 'John Doe' },
  'doctor-token': { id: '101', role: 'doctor', name: 'Dr. Sarah Smith' },
  'admin-token': { id: '201', role: 'admin', name: 'Admin User' }
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.headers['x-auth-token'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const user = mockUsers[token];
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = user;
  next();
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

module.exports = { authenticate, requireRole };
