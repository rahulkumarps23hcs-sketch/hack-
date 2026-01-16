const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { mockDoctors, mockPatients } = require('../data/mockData');

// Get all doctors
router.get('/', authenticate, (req, res) => {
  res.json(mockDoctors);
});

// Get doctor by ID
router.get('/:id', authenticate, (req, res) => {
  const doctor = mockDoctors.find(d => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json(doctor);
});

// Get doctor's patients
router.get('/:id/patients', authenticate, requireRole('doctor', 'admin'), (req, res) => {
  const { id } = req.params;
  const patients = mockPatients.filter(p => p.assignedDoctor === id);
  res.json(patients);
});

module.exports = router;
