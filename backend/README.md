# Patient Management Backend API

Express.js backend API server with mock data for the Patient Management & Mental Health Tracker system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional, defaults are set):
```bash
PORT=3001
JWT_SECRET=mock_secret_key_for_demo
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login (returns mock token)
- `POST /api/auth/register` - Register (mock)
- `GET /api/auth/verify` - Verify token

### Patients
- `GET /api/patients` - Get all patients (doctor/admin)
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/patients/:id/mental-health` - Get patient's mental health entries
- `POST /api/patients/:id/mental-health` - Create mental health entry
- `GET /api/patients/:id/prescriptions` - Get patient's prescriptions

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/patients` - Get doctor's patients

### Appointments
- `GET /api/appointments` - Get appointments (filtered by role)
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment

### Mental Health
- `GET /api/mental-health` - Get all entries (filtered by role)
- `GET /api/mental-health/:id` - Get entry by ID
- `POST /api/mental-health` - Create entry
- `GET /api/mental-health/analytics/summary` - Get analytics summary

### Admin
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update settings

## Authentication

All endpoints (except `/api/auth/*`) require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

### Mock Tokens
- Patient: `patient-token`
- Doctor: `doctor-token`
- Admin: `admin-token`

## Mock Data

All data is stored in memory and resets on server restart. See `data/mockData.js` for the data structure.
