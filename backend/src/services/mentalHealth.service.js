// Mental health service layer.
// Handles in-memory creation and lookup of mental health logs per patient.

const { mentalLogs } = require('../models/mentalLog.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function createMentalLog(payload) {
  const log = {
    id: generateId('mh'),
    patientId: payload.patientId,
    mood: payload.mood,
    stress: payload.stress,
    sleepQuality: payload.sleepQuality,
    note: payload.note || null,
    loggedAt: new Date().toISOString(),
  };

  mentalLogs.push(log);
  return log;
}

async function listMentalLogsByPatient(patientId) {
  return mentalLogs.filter((log) => log.patientId === patientId);
}

module.exports = {
  createMentalLog,
  listMentalLogsByPatient,
};
