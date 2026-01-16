// Vitals routes.
// POST /api/vitals
// GET /api/vitals/:patientId

const express = require('express');
const vitalController = require('../controllers/vital.controller');

const router = express.Router();

router.post('/', vitalController.createVital);
router.get('/:patientId', vitalController.getVitalsForPatient);

module.exports = router;
