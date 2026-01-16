// Medication service layer.
// Handles in-memory medication assignments and queries.

const { medications } = require('../models/medication.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function listMedications() {
  return medications;
}

async function getMedicationById(id) {
  return medications.find((m) => m.id === id) || null;
}

async function createMedication(payload) {
  const med = {
    id: generateId('med'),
    name: payload.name,
    dosage: payload.dosage,
    frequency: payload.frequency,
    patientId: payload.patientId || null,
  };

  medications.push(med);
  return med;
}

async function updateMedication(id, payload) {
  const index = medications.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const updated = {
    ...medications[index],
    ...payload,
  };

  medications[index] = updated;
  return updated;
}

async function deleteMedication(id) {
  const index = medications.findIndex((m) => m.id === id);
  if (index === -1) return false;

  medications.splice(index, 1);
  return true;
}

module.exports = {
  listMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
};
