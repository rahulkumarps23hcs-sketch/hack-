// Mock User "model" using in-memory data only.
// In a real implementation this would map to a database collection or table.

const users = [
  {
    id: 'user_admin_1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'ADMIN',
    name: 'Admin User',
  },
  {
    id: 'user_doctor_1',
    email: 'doctor@example.com',
    password: 'doctor123',
    role: 'DOCTOR',
    name: 'Dr. Smith',
  },
  {
    id: 'user_patient_1',
    email: 'patient@example.com',
    password: 'patient123',
    role: 'PATIENT',
    name: 'Jane Patient',
  },
];

module.exports = {
  users,
};
