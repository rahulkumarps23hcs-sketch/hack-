// Medication HTTP controller (placeholder).

const medicationService = require('../services/medication.service');

exports.listMedications = async (req, res, next) => {
  try {
    const data = await medicationService.listMedications();
    res.json({ message: 'List medications placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.getMedication = async (req, res, next) => {
  try {
    const data = await medicationService.getMedicationById(req.params.id);
    res.json({ message: 'Get medication placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.createMedication = async (req, res, next) => {
  try {
    const data = await medicationService.createMedication(req.body);
    res.json({ message: 'Create medication placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.updateMedication = async (req, res, next) => {
  try {
    const data = await medicationService.updateMedication(
      req.params.id,
      req.body
    );
    res.json({ message: 'Update medication placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.deleteMedication = async (req, res, next) => {
  try {
    const data = await medicationService.deleteMedication(req.params.id);
    res.json({ message: 'Delete medication placeholder', data });
  } catch (err) {
    next(err);
  }
};
