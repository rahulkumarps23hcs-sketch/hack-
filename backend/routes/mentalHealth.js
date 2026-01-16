const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { mockMentalHealthEntries } = require('../data/mockData');

// Get all mental health entries (filtered by role)
router.get('/', authenticate, (req, res) => {
  let entries = mockMentalHealthEntries;

  if (req.user.role === 'patient') {
    entries = entries.filter(e => e.patientId === req.user.id);
  }

  res.json(entries);
});

// Get entry by ID
router.get('/:id', authenticate, (req, res) => {
  const entry = mockMentalHealthEntries.find(e => e.id === req.params.id);

  if (!entry) {
    return res.status(404).json({ error: 'Entry not found' });
  }

  if (req.user.role === 'patient' && entry.patientId !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(entry);
});

// Create mental health entry
router.post('/', authenticate, (req, res) => {
  const newEntry = {
    id: `mh-${Date.now()}`,
    patientId: req.user.id,
    date: req.body.date || new Date().toISOString().split('T')[0],
    mood: req.body.mood,
    anxietyLevel: req.body.anxietyLevel,
    sleepQuality: req.body.sleepQuality,
    energyLevel: req.body.energyLevel,
    stressLevel: req.body.stressLevel,
    notes: req.body.notes || '',
    medications: req.body.medications || [],
    symptoms: req.body.symptoms || []
  };

  res.status(201).json(newEntry);
});

// Get analytics/summary
router.get('/analytics/summary', authenticate, (req, res) => {
  const patientId = req.query.patientId || req.user.id;
  const entries = mockMentalHealthEntries.filter(e => e.patientId === patientId);

  if (entries.length === 0) {
    return res.json({
      averageMood: 0,
      averageAnxiety: 0,
      averageSleep: 0,
      averageEnergy: 0,
      averageStress: 0,
      totalEntries: 0
    });
  }

  const summary = {
    averageMood: entries.reduce((sum, e) => sum + e.mood, 0) / entries.length,
    averageAnxiety: entries.reduce((sum, e) => sum + e.anxietyLevel, 0) / entries.length,
    averageSleep: entries.reduce((sum, e) => sum + e.sleepQuality, 0) / entries.length,
    averageEnergy: entries.reduce((sum, e) => sum + e.energyLevel, 0) / entries.length,
    averageStress: entries.reduce((sum, e) => sum + e.stressLevel, 0) / entries.length,
    totalEntries: entries.length
  };

  res.json(summary);
});

module.exports = router;
