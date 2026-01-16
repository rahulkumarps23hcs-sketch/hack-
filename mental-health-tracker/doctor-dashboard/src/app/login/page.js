"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-app)'
        }}>
            <div className="card" style={{ width: '400px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', margin: '0 auto 16px' }}></div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to MediTrack Dashboard</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                background: 'var(--bg-app)'
                            }}
                            placeholder="doctor@clinic.com"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                background: 'var(--bg-app)'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', padding: '14px' }}>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
                    <a href="#">Forgot password?</a>
                </div>
            </div>
        </div>
    );
}
