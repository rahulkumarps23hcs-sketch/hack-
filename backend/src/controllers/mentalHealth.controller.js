// Mental health HTTP controller.
// Provides mock endpoints for recording and fetching mental health logs.

const mentalHealthService = require('../services/mentalHealth.service');

exports.createLog = async (req, res, next) => {
  try {
    const data = await mentalHealthService.createMentalLog(req.body);
    res.status(201).json({ message: 'Mental health log created (mock)', data });
  } catch (err) {
    next(err);
  }
};

exports.getLogsForPatient = async (req, res, next) => {
  try {
    const data = await mentalHealthService.listMentalLogsByPatient(
      req.params.patientId
    );
    res.json({ message: 'Mental health logs (mock)', data });
  } catch (err) {
    next(err);
  }
};
