import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './PatientDetail.css';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [mentalHealth, setMentalHealth] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      const [patientRes, mhRes, aptRes] = await Promise.all([
        api.get(`/patients/${id}`),
        api.get(`/patients/${id}/mental-health`),
        api.get(`/appointments`).then(res => 
          res.data.filter(a => a.patientId === id)
        )
      ]);
      setPatient(patientRes.data);
      setMentalHealth(mhRes.data);
      setAppointments(aptRes);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="loading">Patient not found</div>;
  }

  const averageMood = mentalHealth.length > 0
    ? (mentalHealth.reduce((sum, e) => sum + e.mood, 0) / mentalHealth.length).toFixed(1)
    : 'N/A';

  return (
    <div className="patient-detail">
      <header className="detail-header">
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
        <h1>{patient.name}</h1>
      </header>

      <div className="detail-content">
        <div className="patient-overview-card">
          <div className="overview-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email</label>
                <span>{patient.email}</span>
              </div>
              <div className="info-item">
                <label>Phone</label>
                <span>{patient.phone}</span>
              </div>
              <div className="info-item">
                <label>Date of Birth</label>
                <span>{patient.dateOfBirth}</span>
              </div>
              <div className="info-item">
                <label>Blood Type</label>
                <span>{patient.bloodType}</span>
              </div>
            </div>
          </div>

          <div className="overview-section">
            <h3>Medical Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Allergies</label>
                <span>
                  {patient.allergies?.length > 0
                    ? patient.allergies.join(', ')
                    : 'None'}
                </span>
              </div>
              <div className="info-item">
                <label>Chronic Conditions</label>
                <span>
                  {patient.chronicConditions?.length > 0
                    ? patient.chronicConditions.join(', ')
                    : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'mental-health' ? 'active' : ''}`}
            onClick={() => setActiveTab('mental-health')}
          >
            Mental Health
          </button>
          <button
            className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="metric-card">
                <div className="metric-label">Average Mood (Last 30 days)</div>
                <div className="metric-value">{averageMood}/10</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Total Appointments</div>
                <div className="metric-value">{appointments.length}</div>
              </div>
              <div className="metric-card">
                <div className="metric-label">Mental Health Entries</div>
                <div className="metric-value">{mentalHealth.length}</div>
              </div>
            </div>
          )}

          {activeTab === 'mental-health' && (
            <div className="mental-health-tab">
              {mentalHealth.length === 0 ? (
                <div className="empty-state">No mental health entries yet</div>
              ) : (
                <div className="mh-entries">
                  {mentalHealth.map(entry => (
                    <div key={entry.id} className="mh-entry-card">
                      <div className="mh-entry-date">{entry.date}</div>
                      <div className="mh-metrics">
                        <div className="mh-metric">
                          <span className="metric-name">Mood</span>
                          <span className="metric-value">{entry.mood}/10</span>
                        </div>
                        <div className="mh-metric">
                          <span className="metric-name">Anxiety</span>
                          <span className="metric-value">{entry.anxietyLevel}/10</span>
                        </div>
                        <div className="mh-metric">
                          <span className="metric-name">Sleep</span>
                          <span className="metric-value">{entry.sleepQuality}/10</span>
                        </div>
                        <div className="mh-metric">
                          <span className="metric-name">Energy</span>
                          <span className="metric-value">{entry.energyLevel}/10</span>
                        </div>
                      </div>
                      {entry.notes && (
                        <div className="mh-notes">
                          <strong>Notes:</strong> {entry.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="appointments-tab">
              {appointments.length === 0 ? (
                <div className="empty-state">No appointments scheduled</div>
              ) : (
                <div className="appointments-list">
                  {appointments.map(apt => (
                    <div key={apt.id} className="appointment-detail-card">
                      <div className="apt-header">
                        <div>
                          <h4>{apt.type}</h4>
                          <p>{apt.date} at {apt.time}</p>
                        </div>
                        <span className={`status-badge status-${apt.status}`}>
                          {apt.status}
                        </span>
                      </div>
                      {apt.notes && (
                        <div className="apt-notes">
                          <strong>Notes:</strong> {apt.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
