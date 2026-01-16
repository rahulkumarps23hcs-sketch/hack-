// Appointment service layer.
// Handles in-memory booking, rescheduling, and cancelling.

const { appointments } = require('../models/appointment.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function listAppointments() {
  return appointments;
}

async function getAppointmentById(id) {
  return appointments.find((a) => a.id === id) || null;
}

async function createAppointment(payload) {
  const appt = {
    id: generateId('appt'),
    patientId: payload.patientId,
    doctorId: payload.doctorId,
    datetime: payload.datetime,
    status: 'SCHEDULED',
    reason: payload.reason || null,
  };

  appointments.push(appt);
  return appt;
}

async function updateAppointment(id, payload) {
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated = {
    ...appointments[index],
    ...payload,
  };

  appointments[index] = updated;
  return updated;
}

async function cancelAppointment(id) {
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  appointments[index].status = 'CANCELLED';
  return appointments[index];
}

module.exports = {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
};
