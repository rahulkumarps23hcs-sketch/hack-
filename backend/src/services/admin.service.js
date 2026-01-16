// Admin service layer.
// Provides a simple system overview based on in-memory models.

const { users } = require('../models/user.model');
const { patients } = require('../models/patient.model');
const { doctors } = require('../models/doctor.model');
const { appointments } = require('../models/appointment.model');
const { medications } = require('../models/medication.model');
const { notifications } = require('../models/notification.model');

async function getSystemOverview() {
  return {
    users: users.length,
    patients: patients.length,
    doctors: doctors.length,
    appointments: appointments.length,
    medications: medications.length,
    notifications: notifications.length,
  };
}

module.exports = {
  getSystemOverview,
};
