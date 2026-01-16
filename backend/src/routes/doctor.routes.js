// Doctor routes (placeholder).

const express = require('express');
const doctorController = require('../controllers/doctor.controller');

const router = express.Router();

// GET /api/doctors
router.get('/', doctorController.listDoctors);

// GET /api/doctors/:id
router.get('/:id', doctorController.getDoctor);

// POST /api/doctors
router.post('/', doctorController.createDoctor);

// PUT /api/doctors/:id
router.put('/:id', doctorController.updateDoctor);

// DELETE /api/doctors/:id
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
