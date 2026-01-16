// Express application setup for the hackathon backend.
// Wires global middleware, health check, and all route modules.

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const medicationRoutes = require('./routes/medication.routes');
const notificationRoutes = require('./routes/notification.routes');
const adminRoutes = require('./routes/admin.routes');
const vitalRoutes = require('./routes/vital.routes');
const mentalHealthRoutes = require('./routes/mentalHealth.routes');
const authMiddleware = require('./middleware/auth.middleware');
const roleGuard = require('./middleware/role.middleware');

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is healthy',
    data: { uptime: process.uptime() },
    error: null,
  });
});

// API routes
// Auth routes remain public
app.use('/api/auth', authRoutes);

// Protected routes with role-based access
app.use(
  '/api/patients',
  authMiddleware,
  roleGuard('PATIENT', 'DOCTOR', 'ADMIN'),
  patientRoutes
);

app.use('/api/doctors', authMiddleware, roleGuard('DOCTOR', 'ADMIN'), doctorRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/vitals', vitalRoutes);
app.use('/api/mental-health', mentalHealthRoutes);
app.use('/api/admin', authMiddleware, roleGuard('ADMIN'), adminRoutes);

// Fallback for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    data: null,
    error: { path: req.originalUrl },
  });
});

module.exports = app;
