// Mock Mental Health log model using in-memory structures.
// Stores basic mood / stress / sleepQuality check-ins per patient.

const mentalLogs = [
  {
    id: 'mh_1',
    patientId: 'patient_1',
    mood: 3,
    stress: 2,
    sleepQuality: 4,
    note: 'Feeling okay today.',
    loggedAt: '2026-01-10T09:00:00.000Z',
  },
  {
    id: 'mh_2',
    patientId: 'patient_1',
    mood: 2,
    stress: 4,
    sleepQuality: 2,
    note: 'Rough day at work.',
    loggedAt: '2026-01-12T21:30:00.000Z',
  },
];

module.exports = {
  mentalLogs,
};
