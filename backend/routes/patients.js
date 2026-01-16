const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { mockPatients, mockMentalHealthEntries, mockPrescriptions } = require('../data/mockData');

// Get all patients (doctor/admin only)
router.get('/', authenticate, requireRole('doctor', 'admin'), (req, res) => {
  res.json(mockPatients);
});

// Get patient by ID
router.get('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const patient = mockPatients.find(p => p.id === id);

  // Patients can only view their own data
  if (req.user.role === 'patient' && req.user.id !== id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  res.json(patient);
});

// Get patient's mental health entries
router.get('/:id/mental-health', authenticate, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'patient' && req.user.id !== id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const entries = mockMentalHealthEntries.filter(e => e.patientId === id);
  res.json(entries);
});

// Create mental health entry
router.post('/:id/mental-health', authenticate, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'patient' && req.user.id !== id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const newEntry = {
    id: `mh-${Date.now()}`,
    patientId: id,
    date: req.body.date || new Date().toISOString().split('T')[0],
    ...req.body
  };

  res.status(201).json(newEntry);
});

// Get patient's prescriptions
router.get('/:id/prescriptions', authenticate, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'patient' && req.user.id !== id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const prescriptions = mockPrescriptions.filter(p => p.patientId === id);
  res.json(prescriptions);
});

// Update patient profile
router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'patient' && req.user.id !== id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const patient = mockPatients.find(p => p.id === id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  const updated = { ...patient, ...req.body };
  res.json(updated);
});

module.exports = router;
