# Comprehensive Patient Management & Mental Health Tracker

A hackathon project providing a complete healthcare management system with separate platforms for patients (mobile) and healthcare providers (web).

## 🏗️ Project Structure

```
├── backend/          # Node.js/Express API Server
├── web-app/          # React Web App (Doctor Dashboard + Admin Panel)
├── mobile-app/       # React Native Mobile App (Patient App)
└── docs/             # Documentation
```

## 🎨 Design Philosophy

- **No dark UI** - Professional light theme only
- **Balanced colors** - Soft greys, muted blues, pastel greens
- **Premium medical aesthetic** - Calm, professional, trustworthy
- **Accessibility** - High contrast where needed, but not harsh

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- For mobile: Expo CLI (`npm install -g expo-cli`) or React Native CLI

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:3001`

### Web App Setup
```bash
cd web-app
npm install
npm start
```
App runs on `http://localhost:3000`

### Mobile App Setup
```bash
cd mobile-app
npm install
npm start
# Then press 'a' for Android or 'i' for iOS
# Or use: npm run android / npm run ios
```

**Note**: For physical devices, update the API URL in `mobile-app/src/services/api.js` to use your computer's IP address instead of `localhost`.

## 🔐 Authentication & Roles

- **Patient** - Access mobile app, view own records, track mental health
- **Doctor** - Access web dashboard, manage assigned patients, view analytics
- **Admin** - Full system access, manage users and settings

### Demo Login Credentials
All authentication is mocked. Use any credentials:
- **Role**: Select from dropdown (Patient/Doctor/Admin)
- **Email**: Any email address
- **Password**: Any password

Mock tokens are automatically assigned based on role.

## 📱 Features

### Patient Mobile App
- ✅ User authentication
- ✅ Dashboard with health summary
- ✅ Mental health tracking (mood, anxiety, sleep, energy, stress)
- ✅ View and manage appointments
- ✅ Profile management
- ✅ Add daily mental health entries

### Doctor Web Dashboard
- ✅ Patient list with search functionality
- ✅ Detailed patient profiles
- ✅ Mental health history and analytics
- ✅ Appointment overview
- ✅ Statistics dashboard
- ✅ Role-based access control

### Admin Panel
- ✅ System-wide statistics
- ✅ User management (patients and doctors)
- ✅ System settings management
- ✅ Comprehensive analytics

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, Mock Authentication
- **Web**: React 18, React Router v6, Axios
- **Mobile**: React Native, Expo, React Navigation
- **Styling**: CSS Modules (Web), StyleSheet (Mobile)
- **Color Scheme**: Professional medical palette (soft blues, greens, greys)

## 📝 Notes

- ✅ All data is **mock data** stored in memory (resets on server restart)
- ✅ API endpoints use placeholder/mock implementations
- ✅ Authentication is fully simulated with role-based tokens
- ✅ System is **demo-ready** for hackathon presentation
- ✅ Professional medical color scheme applied throughout
- ✅ Responsive design for web dashboard
- ✅ Cross-platform mobile app (iOS/Android)

## 🎨 Design System

The application uses a professional medical color palette:
- **Primary Blue**: `#6B9BD1` - Trust, professionalism
- **Secondary Green**: `#A8D5BA` - Health, wellness
- **Accent Grey**: `#E8EDF2` - Calm, neutral
- **Text Colors**: Soft greys for readability
- **Background**: Light `#F5F7FA` - Easy on the eyes

No dark mode, no extreme whites - balanced professional appearance.

## 👥 Team

Built for Hackathon - Team Innovative
