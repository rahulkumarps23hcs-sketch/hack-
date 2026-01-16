// Vitals HTTP controller.
// Provides mock endpoints for recording and fetching patient vitals.

const vitalService = require('../services/vital.service');

exports.createVital = async (req, res, next) => {
  try {
    const data = await vitalService.createVital(req.body);
    res.status(201).json({ message: 'Vital recorded (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.getVitalsForPatient = async (req, res, next) => {
  try {
    const data = await vitalService.listVitalsByPatient(req.params.patientId);
    res.json({ message: 'Patient vitals (mock)', data });
  } catch (err) {
    next(err);
  }
};
