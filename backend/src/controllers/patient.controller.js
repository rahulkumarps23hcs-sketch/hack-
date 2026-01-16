// Patient HTTP controller (placeholder).

const patientService = require('../services/patient.service');

exports.listPatients = async (req, res, next) => {
  try {
    const data = await patientService.listPatients();
    res.json({ message: 'List patients placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.getPatient = async (req, res, next) => {
  try {
    const data = await patientService.getPatientById(req.params.id);
    res.json({ message: 'Get patient placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.createPatient = async (req, res, next) => {
  try {
    const data = await patientService.createPatient(req.body);
    res.json({ message: 'Create patient placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const data = await patientService.updatePatient(req.params.id, req.body);
    res.json({ message: 'Update patient placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const data = await patientService.deletePatient(req.params.id);
    res.json({ message: 'Delete patient placeholder', data });
  } catch (err) {
    next(err);
  }
};
