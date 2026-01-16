"use client";
import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MapPin, Filter, CheckCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Backend API Comment:
// GET /api/appointments - Fetch all appointments
// GET /api/appointments?status={status} - Filter by status
// POST /api/appointments - Create new appointment

const MOCK_APPOINTMENTS = [
    { id: 1, patientName: 'John Doe', type: 'Therapy Session', date: '2024-01-20', time: '10:00 AM', duration: '60 min', status: 'Confirmed', mode: 'In-Person', fee: 150, paymentStatus: 'Paid' },
    { id: 2, patientName: 'Sarah Connor', type: 'Follow-up', date: '2024-01-20', time: '02:00 PM', duration: '30 min', status: 'Confirmed', mode: 'Video Call', fee: 100, paymentStatus: 'Paid' },
    { id: 3, patientName: 'Michael Smith', type: 'Initial Consultation', date: '2024-01-21', time: '09:00 AM', duration: '45 min', status: 'Pending', mode: 'In-Person', fee: 200, paymentStatus: 'Pending' },
    { id: 4, patientName: 'Emily Chen', type: 'Medication Review', date: '2024-01-22', time: '11:00 AM', duration: '30 min', status: 'Confirmed', mode: 'Video Call', fee: 120, paymentStatus: 'Pending' },
    { id: 5, patientName: 'David Wilson', type: 'Therapy Session', date: '2024-01-23', time: '03:00 PM', duration: '60 min', status: 'Cancelled', mode: 'In-Person', fee: 150, paymentStatus: 'Refunded' },
];

export default function AppointmentsPage() {
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredAppointments = MOCK_APPOINTMENTS.filter(apt =>
        filterStatus === 'All' || apt.status === filterStatus
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Appointments</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your upcoming and past appointments.</p>
                </div>
                <button className="btn btn-primary">+ Schedule New</button>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <StatCard label="Today's Appointments" value="3" color="var(--primary)" />
                <StatCard label="This Week" value="12" color="var(--success)" />
                <StatCard label="Pending" value="2" color="var(--warning)" />
            </div>

            <div className="card">
                {/* Filter */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
                    <Filter size={18} color="var(--text-muted)" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Status</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Appointments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredAppointments.map(apt => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }) {
    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: color, marginBottom: '8px' }}>{value}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{label}</div>
        </div>
    );
}

function AppointmentCard({ appointment }) {
    return (
        <div style={{
            padding: '20px',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.2s'
        }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'var(--bg-app)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: '20px', fontWeight: '700' }}>{appointment.date.split('-')[2]}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>JAN</div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <User size={16} color="var(--text-muted)" />
                        <span style={{ fontWeight: '600', fontSize: '16px' }}>{appointment.patientName}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>{appointment.type}</div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {appointment.time} ({appointment.duration})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {appointment.mode === 'Video Call' ? <Video size={14} /> : <MapPin size={14} />}
                            {appointment.mode}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600', color: 'var(--text-main)' }}>
                            <DollarSign size={14} />
                            ${appointment.fee}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`badge ${appointment.status === 'Confirmed' ? 'badge-success' : appointment.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                    {appointment.status}
                </span>

                <span
                    className={`badge ${appointment.paymentStatus === 'Paid' ? 'badge-success' : appointment.paymentStatus === 'Pending' ? 'badge-warning' : ''}`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: appointment.paymentStatus === 'Refunded' ? '#f0f0f0' : undefined,
                        color: appointment.paymentStatus === 'Refunded' ? 'var(--text-muted)' : undefined
                    }}
                >
                    {appointment.paymentStatus === 'Paid' && <CheckCircle size={12} />}
                    {appointment.paymentStatus === 'Pending' && <Clock size={12} />}
                    {appointment.paymentStatus}
                </span>

                {appointment.mode === 'Video Call' && appointment.status === 'Confirmed' && (
                    <Link
                        href={`/video-call?appointmentId=${appointment.id}&patient=${encodeURIComponent(appointment.patientName)}&age=45&type=${encodeURIComponent(appointment.type)}`}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Video size={16} />
                        Join Video Call
                    </Link>
                )}

                <Link
                    href={`/chat?appointmentId=${appointment.id}&patient=${encodeURIComponent(appointment.patientName)}`}
                    className="btn btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                    Open Chat
                </Link>
            </div>
        </div>
    );
}
