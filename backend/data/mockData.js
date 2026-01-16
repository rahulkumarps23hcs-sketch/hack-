// Mock data for demo purposes

const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0101',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1-555-0102',
      relationship: 'Spouse'
    },
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    assignedDoctor: '101',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phone: '+1-555-0201',
    dateOfBirth: '1990-08-22',
    gender: 'Female',
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: {
      name: 'Robert Johnson',
      phone: '+1-555-0202',
      relationship: 'Father'
    },
    bloodType: 'A+',
    allergies: [],
    chronicConditions: ['Asthma', 'Anxiety'],
    assignedDoctor: '101',
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1-555-0301',
    dateOfBirth: '1978-12-03',
    gender: 'Male',
    address: '789 Pine Rd, City, State 12345',
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+1-555-0302',
      relationship: 'Wife'
    },
    bloodType: 'B+',
    allergies: ['Shellfish'],
    chronicConditions: ['Diabetes Type 2'],
    assignedDoctor: '102',
    createdAt: '2024-01-20T10:00:00Z'
  }
];

const mockDoctors = [
  {
    id: '101',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@clinic.com',
    phone: '+1-555-1001',
    specialization: 'General Practice',
    department: 'Primary Care',
    licenseNumber: 'MD-12345',
    yearsOfExperience: 12,
    patients: ['1', '2']
  },
  {
    id: '102',
    name: 'Dr. James Wilson',
    email: 'james.wilson@clinic.com',
    phone: '+1-555-1002',
    specialization: 'Psychiatry',
    department: 'Mental Health',
    licenseNumber: 'MD-12346',
    yearsOfExperience: 8,
    patients: ['3']
  }
];

const mockAppointments = [
  {
    id: 'app-1',
    patientId: '1',
    doctorId: '101',
    date: '2024-03-15',
    time: '10:00',
    duration: 30,
    type: 'Consultation',
    status: 'scheduled',
    notes: 'Regular checkup',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'app-2',
    patientId: '2',
    doctorId: '101',
    date: '2024-03-16',
    time: '14:00',
    duration: 45,
    type: 'Follow-up',
    status: 'scheduled',
    notes: 'Mental health follow-up',
    createdAt: '2024-03-02T10:00:00Z'
  },
  {
    id: 'app-3',
    patientId: '3',
    doctorId: '102',
    date: '2024-03-14',
    time: '11:00',
    duration: 60,
    type: 'Therapy',
    status: 'completed',
    notes: 'Session completed successfully',
    createdAt: '2024-02-28T10:00:00Z'
  }
];

const mockMentalHealthEntries = [
  {
    id: 'mh-1',
    patientId: '1',
    date: '2024-03-10',
    mood: 7,
    anxietyLevel: 3,
    sleepQuality: 6,
    energyLevel: 7,
    stressLevel: 4,
    notes: 'Feeling good today, had a productive day at work',
    medications: ['Sertraline 50mg'],
    symptoms: []
  },
  {
    id: 'mh-2',
    patientId: '1',
    date: '2024-03-11',
    mood: 5,
    anxietyLevel: 5,
    sleepQuality: 5,
    energyLevel: 5,
    stressLevel: 6,
    notes: 'Moderate day, some work stress',
    medications: ['Sertraline 50mg'],
    symptoms: ['Headache']
  },
  {
    id: 'mh-3',
    patientId: '2',
    date: '2024-03-10',
    mood: 6,
    anxietyLevel: 4,
    sleepQuality: 7,
    energyLevel: 6,
    stressLevel: 5,
    notes: 'Stable mood, good sleep',
    medications: ['Buspirone 15mg'],
    symptoms: []
  }
];

const mockPrescriptions = [
  {
    id: 'rx-1',
    patientId: '1',
    doctorId: '101',
    medication: 'Sertraline',
    dosage: '50mg',
    frequency: 'Once daily',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    instructions: 'Take with food',
    status: 'active'
  },
  {
    id: 'rx-2',
    patientId: '2',
    doctorId: '101',
    medication: 'Buspirone',
    dosage: '15mg',
    frequency: 'Twice daily',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    instructions: 'Take with meals',
    status: 'active'
  }
];

const mockMessages = [
  {
    id: 'msg-1',
    from: { id: '1', name: 'John Doe', role: 'patient' },
    to: { id: '101', name: 'Dr. Sarah Smith', role: 'doctor' },
    subject: 'Medication question',
    content: 'I have a question about my medication dosage. Should I take it in the morning or evening?',
    timestamp: '2024-03-12T09:30:00Z',
    read: false
  },
  {
    id: 'msg-2',
    from: { id: '101', name: 'Dr. Sarah Smith', role: 'doctor' },
    to: { id: '1', name: 'John Doe', role: 'patient' },
    subject: 'Re: Medication question',
    content: 'Take it in the morning with breakfast for best results.',
    timestamp: '2024-03-12T10:15:00Z',
    read: true
  }
];

module.exports = {
  mockPatients,
  mockDoctors,
  mockAppointments,
  mockMentalHealthEntries,
  mockPrescriptions,
  mockMessages
};
