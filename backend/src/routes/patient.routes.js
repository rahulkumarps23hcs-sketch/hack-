// Patient routes (placeholder).

const express = require('express');
const patientController = require('../controllers/patient.controller');

const router = express.Router();

// GET /api/patients
router.get('/', patientController.listPatients);

// GET /api/patients/:id
router.get('/:id', patientController.getPatient);

// POST /api/patients
router.post('/', patientController.createPatient);

// PUT /api/patients/:id
router.put('/:id', patientController.updatePatient);

// DELETE /api/patients/:id
router.delete('/:id', patientController.deletePatient);

module.exports = router;
