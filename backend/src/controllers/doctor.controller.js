// Doctor HTTP controller (placeholder).

const doctorService = require('../services/doctor.service');

exports.listDoctors = async (req, res, next) => {
  try {
    const data = await doctorService.listDoctors();
    res.json({ message: 'List doctors placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    const data = await doctorService.getDoctorById(req.params.id);
    res.json({ message: 'Get doctor placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const data = await doctorService.createDoctor(req.body);
    res.json({ message: 'Create doctor placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const data = await doctorService.updateDoctor(req.params.id, req.body);
    res.json({ message: 'Update doctor placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const data = await doctorService.deleteDoctor(req.params.id);
    res.json({ message: 'Delete doctor placeholder', data });
  } catch (err) {
    next(err);
  }
};
