const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { mockAppointments } = require('../data/mockData');

// Get all appointments (filtered by role)
router.get('/', authenticate, (req, res) => {
  let appointments = mockAppointments;

  if (req.user.role === 'patient') {
    appointments = appointments.filter(a => a.patientId === req.user.id);
  } else if (req.user.role === 'doctor') {
    appointments = appointments.filter(a => a.doctorId === req.user.id);
  }

  res.json(appointments);
});

// Get appointment by ID
router.get('/:id', authenticate, (req, res) => {
  const appointment = mockAppointments.find(a => a.id === req.params.id);

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  // Check access
  if (req.user.role === 'patient' && appointment.patientId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (req.user.role === 'doctor' && appointment.doctorId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(appointment);
});

// Create appointment
router.post('/', authenticate, (req, res) => {
  const newAppointment = {
    id: `app-${Date.now()}`,
    patientId: req.body.patientId || req.user.id,
    doctorId: req.body.doctorId,
    date: req.body.date,
    time: req.body.time,
    duration: req.body.duration || 30,
    type: req.body.type || 'Consultation',
    status: 'scheduled',
    notes: req.body.notes || '',
    createdAt: new Date().toISOString()
  };

  res.status(201).json(newAppointment);
});

// Update appointment
router.put('/:id', authenticate, (req, res) => {
  const appointment = mockAppointments.find(a => a.id === req.params.id);

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  const updated = { ...appointment, ...req.body };
  res.json(updated);
});

// Cancel appointment
router.delete('/:id', authenticate, (req, res) => {
  const appointment = mockAppointments.find(a => a.id === req.params.id);

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  res.json({ message: 'Appointment cancelled', appointment });
});

module.exports = router;
