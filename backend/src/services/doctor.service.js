// Doctor service layer.
// Handles in-memory doctor CRUD operations.

const { doctors } = require('../models/doctor.model');

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

async function listDoctors() {
  return doctors;
}

async function getDoctorById(id) {
  return doctors.find((d) => d.id === id) || null;
}

async function createDoctor(payload) {
  const doctor = {
    id: generateId('doctor'),
    userId: payload.userId || null,
    name: payload.name || 'Unnamed Doctor',
    specialty: payload.specialty || 'General',
  };

  doctors.push(doctor);
  return doctor;
}

async function updateDoctor(id, payload) {
  const index = doctors.findIndex((d) => d.id === id);
  if (index === -1) return null;

  const updated = {
    ...doctors[index],
    ...payload,
  };

  doctors[index] = updated;
  return updated;
}

async function deleteDoctor(id) {
  const index = doctors.findIndex((d) => d.id === id);
  if (index === -1) return false;

  doctors.splice(index, 1);
  return true;
}

module.exports = {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
