// Patient service layer.
// Handles basic in-memory CRUD operations for patients.

const { patients } = require('../models/patient.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function listPatients() {
  return patients;
}

async function getPatientById(id) {
  return patients.find((p) => p.id === id) || null;
}

async function createPatient(payload) {
  const patient = {
    id: generateId('patient'),
    userId: payload.userId || null,
    name: payload.name || 'Unnamed Patient',
    age: payload.age || null,
    doctorId: payload.doctorId || null,
    conditions: payload.conditions || [],
  };

  patients.push(patient);
  return patient;
}

async function updatePatient(id, payload) {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated = {
    ...patients[index],
    ...payload,
  };

  patients[index] = updated;
  return updated;
}

async function deletePatient(id) {
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) return false;

  patients.splice(index, 1);
  return true;
}

module.exports = {
  listPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
