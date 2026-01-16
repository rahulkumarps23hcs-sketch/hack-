// Appointment HTTP controller (placeholder).

const appointmentService = require('../services/appointment.service');

exports.listAppointments = async (req, res, next) => {
  try {
    const data = await appointmentService.listAppointments();
    res.json({ message: 'List appointments placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const data = await appointmentService.getAppointmentById(req.params.id);
    res.json({ message: 'Get appointment placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const data = await appointmentService.createAppointment(req.body);
    res.json({ message: 'Create appointment placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const data = await appointmentService.updateAppointment(
      req.params.id,
      req.body
    );
    res.json({ message: 'Update appointment placeholder', data });
  } catch (err) {
    next(err);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  try {
    const data = await appointmentService.cancelAppointment(req.params.id);
    res.json({ message: 'Cancel appointment placeholder', data });
  } catch (err) {
    next(err);
  }
};
