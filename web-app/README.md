# Patient Management Web Dashboard

React web application for doctors and administrators to manage patients and view analytics.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Configuration

Update the API URL in `src/services/api.js` if your backend is running on a different port.

Default API URL: `http://localhost:3001/api`

## Features

### Doctor Dashboard
- View all assigned patients
- Patient search and filtering
- Patient detail views with mental health history
- Appointment management
- Statistics overview

### Admin Panel
- System-wide statistics
- User management
- System settings

## Demo Mode

- Login as **Doctor**: Select "Doctor" role, use any email/password
- Login as **Admin**: Select "Admin" role, use any email/password
