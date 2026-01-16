// Medication routes (placeholder).

const express = require('express');
const medicationController = require('../controllers/medication.controller');

const router = express.Router();

// GET /api/medications
router.get('/', medicationController.listMedications);

// GET /api/medications/:id
router.get('/:id', medicationController.getMedication);

// POST /api/medications
router.post('/', medicationController.createMedication);

// PUT /api/medications/:id
router.put('/:id', medicationController.updateMedication);

// DELETE /api/medications/:id
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
