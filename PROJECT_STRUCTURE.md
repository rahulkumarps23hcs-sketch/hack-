# Project Structure

## 📁 Directory Overview

```
hack-
├── backend/                 # Node.js/Express API Server
│   ├── data/
│   │   └── mockData.js     # All mock data (patients, doctors, appointments, etc.)
│   ├── middleware/
│   │   └── auth.js         # Authentication & authorization middleware
│   ├── routes/
│   │   ├── admin.js        # Admin endpoints
│   │   ├── appointments.js # Appointment management
│   │   ├── auth.js         # Authentication endpoints
│   │   ├── doctors.js      # Doctor endpoints
│   │   ├── mentalHealth.js # Mental health tracking
│   │   └── patients.js     # Patient endpoints
│   ├── server.js           # Main server file
│   └── package.json
│
├── web-app/                # React Web Application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPanel.js/css      # Admin dashboard
│   │   │   ├── DoctorDashboard.js/css # Doctor dashboard
│   │   │   ├── Login.js/css           # Login page
│   │   │   └── PatientDetail.js/css   # Patient detail view
│   │   ├── context/
│   │   │   └── AuthContext.js         # Authentication context
│   │   ├── services/
│   │   │   └── api.js                 # API service
│   │   ├── App.js                     # Main app component
│   │   ├── App.css
│   │   ├── index.js                   # Entry point
│   │   └── index.css                  # Global styles
│   └── package.json
│
├── mobile-app/             # React Native Mobile App
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.js         # Login screen
│   │   │   ├── HomeScreen.js          # Dashboard
│   │   │   ├── MentalHealthScreen.js  # Mental health tracker
│   │   │   ├── AppointmentsScreen.js  # Appointments list
│   │   │   ├── ProfileScreen.js       # User profile
│   │   │   └── AddEntryScreen.js      # Add mental health entry
│   │   ├── context/
│   │   │   └── AuthContext.js         # Authentication context
│   │   ├── services/
│   │   │   └── api.js                 # API service
│   │   └── App.js                     # Main app with navigation
│   ├── app.json                       # Expo configuration
│   └── package.json
│
├── README.md               # Main project documentation
├── SETUP.md                # Quick setup guide
└── PROJECT_STRUCTURE.md    # This file
```

## 🔄 Data Flow

### Authentication Flow
1. User logs in → `POST /api/auth/login`
2. Backend returns mock token based on role
3. Token stored in localStorage (web) or AsyncStorage (mobile)
4. Token sent in Authorization header for all requests
5. Middleware validates token and attaches user to request

### Patient Flow (Mobile)
1. Login → Get patient token
2. View dashboard → Fetch mental health summary
3. Add entry → `POST /api/mental-health`
4. View appointments → `GET /api/appointments` (filtered by patient ID)

### Doctor Flow (Web)
1. Login → Get doctor token
2. View patients → `GET /api/patients`
3. View patient details → `GET /api/patients/:id`
4. View mental health → `GET /api/patients/:id/mental-health`

### Admin Flow (Web)
1. Login → Get admin token
2. View stats → `GET /api/admin/stats`
3. View users → `GET /api/admin/users`

## 🎨 Styling Approach

### Web App
- CSS Modules with CSS variables for colors
- Professional medical color scheme
- Responsive grid layouts
- Card-based design

### Mobile App
- React Native StyleSheet
- Same color scheme as web
- Tab navigation
- Stack navigation for detail screens

## 🔐 Security (Mock)

- Tokens are simple strings (not real JWTs)
- Role-based access control in middleware
- Patients can only access their own data
- Doctors can access assigned patients
- Admins have full access

## 📊 Mock Data Structure

All mock data is in `backend/data/mockData.js`:
- **Patients**: 3 sample patients
- **Doctors**: 2 sample doctors
- **Appointments**: 3 sample appointments
- **Mental Health Entries**: 3 sample entries
- **Prescriptions**: 2 sample prescriptions
- **Messages**: 2 sample messages

## 🚀 Key Features by Platform

### Mobile (Patient)
- ✅ Mental health tracking
- ✅ Appointment viewing
- ✅ Profile management
- ✅ Health summary dashboard

### Web (Doctor)
- ✅ Patient list with search
- ✅ Patient detail views
- ✅ Mental health analytics
- ✅ Appointment management

### Web (Admin)
- ✅ System statistics
- ✅ User management
- ✅ Settings management

## 🔧 Configuration Points

1. **API URLs**: 
   - Web: `web-app/src/services/api.js`
   - Mobile: `mobile-app/src/services/api.js`

2. **Backend Port**: `backend/server.js` (default: 3001)

3. **Mock Data**: `backend/data/mockData.js`

4. **Color Scheme**: 
   - Web: `web-app/src/index.css` (CSS variables)
   - Mobile: Individual StyleSheet files

## 📝 Notes

- All data is in-memory (resets on server restart)
- No database required for demo
- All authentication is mocked
- CORS enabled for development
- Error handling is basic (for demo purposes)
