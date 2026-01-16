// Mental health routes.
// POST /api/mental-health/log
// GET /api/mental-health/:patientId

const express = require('express');
const mentalHealthController = require('../controllers/mentalHealth.controller');

const router = express.Router();

router.post('/log', mentalHealthController.createLog);
router.get('/:patientId', mentalHealthController.getLogsForPatient);

module.exports = router;
