// Vitals service layer.
// Handles in-memory creation and lookup of vitals per patient.

const { vitals } = require('../models/vital.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function createVital(payload) {
  const vital = {
    id: generateId('vital'),
    patientId: payload.patientId,
    type: payload.type,
    value: payload.value,
    unit: payload.unit || null,
    recordedAt: new Date().toISOString(),
  };

  vitals.push(vital);
  return vital;
}

async function listVitalsByPatient(patientId) {
  return vitals.filter((v) => v.patientId === patientId);
}

module.exports = {
  createVital,
  listVitalsByPatient,
};
