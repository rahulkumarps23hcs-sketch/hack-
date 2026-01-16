const express = require('express');
const router = express.Router();

// Mock login - returns a token based on role
router.post('/login', (req, res) => {
  const { email, password, role } = req.body;

  // Mock authentication - accepts any credentials
  // In production, this would verify against database
  const tokens = {
    patient: 'patient-token',
    doctor: 'doctor-token',
    admin: 'admin-token'
  };

  const token = tokens[role] || tokens.patient;
  
  const userData = {
    patient: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'patient'
    },
    doctor: {
      id: '101',
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@clinic.com',
      role: 'doctor'
    },
    admin: {
      id: '201',
      name: 'Admin User',
      email: 'admin@clinic.com',
      role: 'admin'
    }
  };

  res.json({
    token,
    user: userData[role] || userData.patient,
    message: 'Login successful'
  });
});

// Mock register
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;
  
  // Mock registration - just returns success
  res.json({
    message: 'Registration successful',
    user: {
      name,
      email,
      role: role || 'patient'
    }
  });
});

// Verify token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  const mockUsers = {
    'patient-token': { id: '1', role: 'patient', name: 'John Doe' },
    'doctor-token': { id: '101', role: 'doctor', name: 'Dr. Sarah Smith' },
    'admin-token': { id: '201', role: 'admin', name: 'Admin User' }
  };

  const user = mockUsers[token];
  
  if (user) {
    res.json({ valid: true, user });
  } else {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

module.exports = router;
