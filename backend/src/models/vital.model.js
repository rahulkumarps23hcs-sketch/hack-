// Mock Vitals model using in-memory structures.
// Stores simple vital sign entries per patient.

const vitals = [
  {
    id: 'vital_1',
    patientId: 'patient_1',
    type: 'blood_pressure',
    value: { systolic: 120, diastolic: 80 },
    unit: 'mmHg',
    recordedAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'vital_2',
    patientId: 'patient_1',
    type: 'heart_rate',
    value: { bpm: 72 },
    unit: 'bpm',
    recordedAt: '2026-01-10T08:05:00.000Z',
  },
];

module.exports = {
  vitals,
};
