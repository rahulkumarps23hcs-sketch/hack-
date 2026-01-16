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