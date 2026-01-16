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
# Patient Management & Mental Health Tracker

End-to-end hackathon platform to help manage patient information, track physical health metrics, and monitor mental health trends for early risk detection and better follow-up.

This repository contains multiple apps and services:

- **patient-app/** – Mobile app for patients
- **doctor-dashboard/** – Web dashboard for doctors and care teams
- **backend/** – API, authentication, and database integration
- **ai-features/** – Mental health and trend analysis layer (no ML logic implemented yet)
- **docs/** – Documentation, diagrams, and pitch deck material

> Note: This repo currently contains only project structure, comments, and placeholders.
> No real business logic or production configuration is implemented yet.

---

## Platforms

- **Patient mobile app (`patient-app/`)**
  - Patient onboarding and profile
  - Daily health check-ins (mood, sleep, energy, basic vitals input)
  - Medication reminders and appointment reminders
  - View of personal history and trends (to be powered by `ai-features/`)

- **Doctor dashboard (`doctor-dashboard/`)**
  - Patient list and basic profiles
  - Quick view of risk flags / alerts from mental health tracking
  - Timeline of key events (appointments, check-ins, escalations)
  - Simple tools to add notes and follow-up plans

- **Backend services (`backend/`)**
  - REST/GraphQL API gateway for patient and doctor apps
  - Authentication & authorization (patients, doctors, admins)
  - Database access layer (patients, sessions, check-ins, alerts)
  - Integration points for SMS / email notifications

- **AI & analytics (`ai-features/`)**
  - Mental health check-in scoring templates
  - Trend analysis and simple rules for risk levels
  - Hooks for future ML models (burnout, depression, adherence, etc.)
  - Only placeholders and comments for now – no real models implemented

---

## Core Features

### Physical Health

- **Basic patient profile**
  - Demographics and medical history placeholders
  - Allergies, chronic conditions, and medications structure

- **Vitals & symptoms tracking**
  - Daily/weekly inputs (BP, HR, weight, temperature – as applicable)
  - Symptom log (pain level, fatigue, other custom fields)

- **Reminders & notifications**
  - Medication reminders
  - Appointment reminders and follow-up nudges

### Mental Health

- **Daily mood & stress check-ins**
  - Simple scales (e.g., 1–5) for mood, anxiety, energy, and sleep quality
  - Free-text notes/journaling field

- **Trend analysis** (powered later by `ai-features/`)
  - Detection of downward trends in mood or sleep
  - Volatility / instability in check-ins over time
  - Identification of no-check-in periods (possible disengagement)

- **Risk flags & alerts**
  - Rules-based risk levels (low / medium / high)
  - Alert hooks for the doctor dashboard (flagged patients list)

> Implementation note: all above features are currently at the design/structure level only.
> This repository provides scaffolding, not functioning clinical software.

---

## Team Roles (Suggested)

- **Product / UX Lead**
  - Define user journeys for patients and doctors
  - Wireframes and UX copy for critical flows

- **Mobile Developer(s)** – `patient-app/`
  - Implement patient app UI and navigation
  - Integrate with backend APIs and push/SMS notifications

- **Web Developer(s)** – `doctor-dashboard/`
  - Implement dashboard UI (tables, filters, patient detail views)
  - Implement risk flag visualization and alert queues

  - Design API contracts used by mobile and web frontends
  - Implement auth, data models, and integrations (DB, SMS/email)

- **AI / Data Developer(s)** – `ai-features/`
  - Design mental health check-in schema and scoring rules
  - Implement trend analysis and risk scoring logic
  - Validate assumptions and limitations (non-diagnostic, support tool only)

- **Pitch & Documentation Owner** – `docs/`
  - Keep architecture and API docs up to date
  - Prepare slides and demo script for the hackathon jury

---

## Branch Strategy

This is a suggested lightweight Git workflow for a hackathon team. Adjust as needed.

- **Main branches**
  - `main` – stable demo-ready branch
  - `dev` – integration branch for features during development

- **Feature branches** (short-lived)
  - `feature/mobile-checkins-*` – patient app features
  - `feature/dashboard-*` – doctor dashboard improvements
  - `feature/backend-api-*` – backend endpoints & integrations
  - `feature/ai-scoring-*` – AI / analytics experiments

- **Workflow**
  - Branch from `dev` for each feature
  - Open small pull requests and request quick reviews
  - Once tested together, merge `dev` → `main` for demo releases

---

## Getting Started (High-Level)

> Exact tech stacks and commands are intentionally left open.
> Replace placeholders in each subfolder with your chosen frameworks.

1. **Clone the repo**
2. **Create a `.env` file** at the root based on `.env.example`
3. **Pick your stacks**
   - Mobile: React Native / Flutter / other
   - Web: React / Next.js / Vue / other
   - Backend: Node / Python / other
4. **Install dependencies** for each subproject (see their `README.md` files)
5. **Implement business logic and real integrations** following the structure in this scaffolding.

---

## Safety & Disclaimer

- This codebase is for **hackathon and prototyping purposes only**.
- It is **not** ready for production or clinical use.
- Any real deployment must include:
  - Security hardening and privacy-by-design review
  - Compliance checks (HIPAA, GDPR, local regulations as applicable)
  - Validation with qualified healthcare professionals.
