import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import AdminPanel from './components/AdminPanel';
import PatientDetail from './components/PatientDetail';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            user.role === 'admin' ? (
              <AdminPanel />
            ) : (
              <DoctorDashboard />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/patient/:id"
        element={user ? <PatientDetail /> : <Navigate to="/login" />}
      />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
