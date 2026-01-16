import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [patientsRes, appointmentsRes] = await Promise.all([
        api.get('/patients'),
        api.get('/appointments')
      ]);
      setPatients(patientsRes.data);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'scheduled')
    .slice(0, 5);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Doctor Dashboard</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{patients.length}</div>
            <div className="stat-label">Total Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {appointments.filter(a => a.status === 'scheduled').length}
            </div>
            <div className="stat-label">Upcoming Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <div className="stat-label">Completed Today</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Patients</h2>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input search-input"
              />
            </div>
            <div className="patients-list">
              {filteredPatients.length === 0 ? (
                <div className="empty-state">No patients found</div>
              ) : (
                filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="patient-card"
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    <div className="patient-info">
                      <h3>{patient.name}</h3>
                      <p>{patient.email}</p>
                      <span className="patient-meta">
                        {patient.chronicConditions?.length || 0} conditions
                      </span>
                    </div>
                    <div className="patient-actions">
                      <span className="arrow">→</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Upcoming Appointments</h2>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.length === 0 ? (
                <div className="empty-state">No upcoming appointments</div>
              ) : (
                upcomingAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-card">
                    <div className="appointment-date">
                      <div className="date">{appointment.date}</div>
                      <div className="time">{appointment.time}</div>
                    </div>
                    <div className="appointment-info">
                      <h4>
                        {patients.find(p => p.id === appointment.patientId)?.name || 'Unknown'}
                      </h4>
                      <p>{appointment.type}</p>
                    </div>
                    <div className="appointment-status">
                      <span className={`status-badge status-${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
