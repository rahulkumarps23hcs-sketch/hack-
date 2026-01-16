"use client";
import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, Save } from 'lucide-react';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your account and preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '800px' }}>

                {/* Profile Settings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <User size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Profile Information</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Full Name</label>
                            <input
                                type="text"
                                defaultValue="Dr. Sarah Smith"
                                className="input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Specialization</label>
                            <input
                                type="text"
                                defaultValue="Cardiology"
                                className="input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                defaultValue="sarah.smith@clinic.com"
                                className="input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Phone</label>
                            <input
                                type="tel"
                                defaultValue="+1 (555) 123-4567"
                                className="input"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Bell size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Notifications</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <ToggleSetting
                            label="Push Notifications"
                            description="Receive notifications about appointments and alerts"
                            checked={notifications}
                            onChange={setNotifications}
                        />
                        <ToggleSetting
                            label="Email Alerts"
                            description="Get email updates for important events"
                            checked={emailAlerts}
                            onChange={setEmailAlerts}
                        />
                    </div>
                </div>

                {/* Security Settings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Lock size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Security</h2>
                    </div>

                    <button className="btn btn-secondary" style={{ marginBottom: '12px' }}>
                        Change Password
                    </button>
                    <button className="btn btn-secondary">
                        Enable Two-Factor Authentication
                    </button>
                </div>

                {/* Save Button */}
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function ToggleSetting({ label, description, checked, onChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
            <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{description}</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: checked ? 'var(--primary)' : '#ccc',
                    transition: '0.4s',
                    borderRadius: '26px'
                }}>
                    <span style={{
                        position: 'absolute',
                        content: '',
                        height: '20px',
                        width: '20px',
                        left: checked ? '27px' : '3px',
                        bottom: '3px',
                        backgroundColor: 'white',
                        transition: '0.4s',
                        borderRadius: '50%'
                    }}></span>
                </span>
            </label>
        </div>
    );
}
