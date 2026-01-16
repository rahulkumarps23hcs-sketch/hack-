import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-content">
          <h1>Admin Panel</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats?.totalPatients || 0}</div>
            <div className="stat-label">Total Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats?.totalDoctors || 0}</div>
            <div className="stat-label">Total Doctors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats?.totalAppointments || 0}</div>
            <div className="stat-label">Total Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats?.activeAppointments || 0}</div>
            <div className="stat-label">Active Appointments</div>
          </div>
        </div>

        <div className="admin-section">
          <h2>System Users</h2>
          <div className="users-table">
            <div className="table-header">
              <div className="table-cell">Name</div>
              <div className="table-cell">Email</div>
              <div className="table-cell">Type</div>
              <div className="table-cell">Phone</div>
            </div>
            {users.map(user => (
              <div key={user.id} className="table-row">
                <div className="table-cell">{user.name}</div>
                <div className="table-cell">{user.email}</div>
                <div className="table-cell">
                  <span className={`type-badge type-${user.type}`}>
                    {user.type}
                  </span>
                </div>
                <div className="table-cell">{user.phone || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
