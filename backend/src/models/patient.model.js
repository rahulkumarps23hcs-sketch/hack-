// Mock Patient model using in-memory structures.
// Replace with a real database model in a production system.

const patients = [
  {
    id: 'patient_1',
    userId: 'user_patient_1',
    name: 'Jane Patient',
    age: 32,
    doctorId: 'doctor_1',
    conditions: ['Hypertension'],
  },
];

module.exports = {
  patients,
};
