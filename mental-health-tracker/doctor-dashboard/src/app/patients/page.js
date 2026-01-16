"use client";
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MoreVertical } from 'lucide-react';
import Link from 'next/link';

// Backend API Comment:
// Data should be fetched from: GET /api/patients
// Searching should use: GET /api/patients?search={query}
// Filtering should use: GET /api/patients?status={status}

const MOCK_PATIENTS = [
    { id: 1, name: 'John Doe', age: 45, diagnosis: 'Anxiety Disorder', status: 'Improving', lastVisit: '2023-10-24', riskLevel: 'Low' },
    { id: 2, name: 'Sarah Connor', age: 32, diagnosis: 'PTSD', status: 'Stable', lastVisit: '2023-10-20', riskLevel: 'Medium' },
    { id: 3, name: 'Michael Smith', age: 28, diagnosis: 'Major Depression', status: 'High Risk', lastVisit: '2023-10-25', riskLevel: 'High' },
    { id: 4, name: 'Emily Chen', age: 54, diagnosis: 'Insomnia', status: 'Stable', lastVisit: '2023-10-15', riskLevel: 'Low' },
    { id: 5, name: 'David Wilson', age: 39, diagnosis: 'Bipolar II', status: 'Monitoring', lastVisit: '2023-10-22', riskLevel: 'Medium' },
];

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredPatients = MOCK_PATIENTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === 'All' || p.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Patient Management</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your patient records and monitor status.</p>
                </div>
                <button className="btn btn-primary">+ Add New Patient</button>
            </div>

            <div className="card">
                {/* Controls */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or diagnosis..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input"
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                transition: 'all 0.2s'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Filter size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                padding: '12px 36px 12px 40px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                appearance: 'none',
                                background: 'white',
                                cursor: 'pointer',
                                minWidth: '150px'
                            }}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Stable">Stable</option>
                            <option value="Improving">Improving</option>
                            <option value="High Risk">High Risk</option>
                            <option value="Monitoring">Monitoring</option>
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', background: 'var(--bg-app)' }}>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>PATIENT NAME</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>AGE</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>DIAGNOSIS</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>RISK LEVEL</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>STATUS</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>LAST VISIT</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '12px', letterSpacing: '0.05em' }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="hover:bg-gray-50">
                                    <td style={{ padding: '16px', fontWeight: '500' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '36px', height: '36px',
                                                background: p.riskLevel === 'High' ? '#FFECEC' : 'var(--accent)',
                                                color: p.riskLevel === 'High' ? 'var(--danger)' : 'var(--text-muted)',
                                                borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '14px', fontWeight: '600'
                                            }}>
                                                {p.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div>{p.name}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>ID: #{String(p.id).padStart(4, '0')}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{p.age}</td>
                                    <td style={{ padding: '16px' }}>{p.diagnosis}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            color: p.riskLevel === 'High' ? 'var(--danger)' : p.riskLevel === 'Medium' ? 'var(--warning)' : 'var(--success)',
                                            fontWeight: '600', fontSize: '14px'
                                        }}>
                                            {p.riskLevel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span className={`badge ${p.status === 'High Risk' ? 'badge-danger' : p.status === 'Stable' ? 'badge-success' : 'badge-warning'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{p.lastVisit}</td>
                                    <td style={{ padding: '16px' }}>
                                        <Link href={`/patients/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
