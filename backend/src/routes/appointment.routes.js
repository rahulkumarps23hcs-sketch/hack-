// Appointment routes (placeholder).

const express = require('express');
const appointmentController = require('../controllers/appointment.controller');

const router = express.Router();

// GET /api/appointments
router.get('/', appointmentController.listAppointments);

// GET /api/appointments/:id
router.get('/:id', appointmentController.getAppointment);

// POST /api/appointments
router.post('/', appointmentController.createAppointment);

// PUT /api/appointments/:id
router.put('/:id', appointmentController.updateAppointment);

// POST /api/appointments/:id/cancel
router.post('/:id/cancel', appointmentController.cancelAppointment);

module.exports = router;
