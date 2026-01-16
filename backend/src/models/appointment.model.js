// Mock Appointment model using in-memory structures.

const appointments = [
  {
    id: 'appt_1',
    patientId: 'patient_1',
    doctorId: 'doctor_1',
    datetime: '2026-01-20T10:00:00.000Z',
    status: 'SCHEDULED',
    reason: 'Initial consultation',
  },
];

module.exports = {
  appointments,
};
