const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { mockPatients, mockDoctors, mockAppointments } = require('../data/mockData');

// All admin routes require admin role
router.use(authenticate);
router.use(requireRole('admin'));

// Get system statistics
router.get('/stats', (req, res) => {
  res.json({
    totalPatients: mockPatients.length,
    totalDoctors: mockDoctors.length,
    totalAppointments: mockAppointments.length,
    activeAppointments: mockAppointments.filter(a => a.status === 'scheduled').length,
    completedAppointments: mockAppointments.filter(a => a.status === 'completed').length
  });
});

// Get all users
router.get('/users', (req, res) => {
  const users = [
    ...mockPatients.map(p => ({ ...p, type: 'patient' })),
    ...mockDoctors.map(d => ({ ...d, type: 'doctor' }))
  ];
  res.json(users);
});

// System settings (mock)
router.get('/settings', (req, res) => {
  res.json({
    clinicName: 'HealthCare Clinic',
    maxAppointmentsPerDay: 20,
    appointmentDuration: 30,
    timezone: 'America/New_York',
    notificationsEnabled: true
  });
});

router.put('/settings', (req, res) => {
  res.json({
    message: 'Settings updated',
    settings: req.body
  });
});

module.exports = router;
