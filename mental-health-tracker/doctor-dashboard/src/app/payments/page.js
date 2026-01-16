"use client";
import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

// Backend API Comment:
// GET /api/payments/summary - Monthly earnings summary
// GET /api/payments/appointments - Appointments with payment status
// POST /api/payments/:appointmentId/mark-paid - Mark payment as received

const PAYMENT_SUMMARY = {
    thisMonth: 12450,
    lastMonth: 11200,
    pending: 3200,
    totalConsultations: 45
};

const APPOINTMENTS_WITH_PAYMENTS = [
    { id: 1, patientName: 'John Doe', type: 'Therapy Session', date: '2024-01-20', fee: 150, status: 'Paid', paymentDate: 'Jan 20, 2024' },
    { id: 2, patientName: 'Sarah Connor', type: 'Follow-up', date: '2024-01-20', fee: 100, status: 'Paid', paymentDate: 'Jan 20, 2024' },
    { id: 3, patientName: 'Michael Smith', type: 'Initial Consultation', date: '2024-01-21', fee: 200, status: 'Pending', paymentDate: null },
    { id: 4, patientName: 'Emily Chen', type: 'Medication Review', date: '2024-01-22', fee: 120, status: 'Pending', paymentDate: null },
    { id: 5, patientName: 'David Wilson', type: 'Therapy Session', date: '2024-01-18', fee: 150, status: 'Paid', paymentDate: 'Jan 18, 2024' },
    { id: 6, patientName: 'Lisa Anderson', type: 'Follow-up', date: '2024-01-17', fee: 100, status: 'Paid', paymentDate: 'Jan 17, 2024' },
];

export default function PaymentsPage() {
    const [filter, setFilter] = useState('All');

    const filteredPayments = APPOINTMENTS_WITH_PAYMENTS.filter(apt =>
        filter === 'All' || apt.status === filter
    );

    const growthPercentage = ((PAYMENT_SUMMARY.thisMonth - PAYMENT_SUMMARY.lastMonth) / PAYMENT_SUMMARY.lastMonth * 100).toFixed(1);

    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Payments & Earnings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Track consultation fees and payment status.</p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <EarningsCard
                    icon={DollarSign}
                    label="This Month"
                    value={`$${PAYMENT_SUMMARY.thisMonth.toLocaleString()}`}
                    trend={`+${growthPercentage}%`}
                    positive
                />
                <EarningsCard
                    icon={TrendingUp}
                    label="Last Month"
                    value={`$${PAYMENT_SUMMARY.lastMonth.toLocaleString()}`}
                    trend="Previous period"
                />
                <EarningsCard
                    icon={Clock}
                    label="Pending Payments"
                    value={`$${PAYMENT_SUMMARY.pending.toLocaleString()}`}
                    trend={`${APPOINTMENTS_WITH_PAYMENTS.filter(a => a.status === 'Pending').length} appointments`}
                    warning
                />
                <EarningsCard
                    icon={Calendar}
                    label="Total Consultations"
                    value={PAYMENT_SUMMARY.totalConsultations}
                    trend="This month"
                />
            </div>

            {/* Payment List */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Consultation Payments</h2>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Payments</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <table style={{ width: '100%', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Patient</th>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Consultation Type</th>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Date</th>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Fee</th>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Status</th>
                            <th style={{ paddingBottom: '12px', fontWeight: '600' }}>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <PaymentRow key={payment.id} payment={payment} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function EarningsCard({ icon: Icon, label, value, trend, positive, warning }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: warning ? 'rgba(253, 203, 110, 0.15)' : positive ? 'rgba(85, 188, 138, 0.15)' : 'rgba(107, 155, 209, 0.15)',
                    color: warning ? 'var(--warning)' : positive ? 'var(--success)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} />
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>{label}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{value}</div>
            <div style={{
                fontSize: '12px',
                color: positive ? 'var(--success)' : warning ? 'var(--warning)' : 'var(--text-muted)',
                fontWeight: '500'
            }}>
                {trend}
            </div>
        </div>
    );
}

function PaymentRow({ payment }) {
    return (
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '16px 0', fontWeight: '500' }}>{payment.patientName}</td>
            <td style={{ color: 'var(--text-muted)' }}>{payment.type}</td>
            <td style={{ color: 'var(--text-muted)' }}>{payment.date}</td>
            <td style={{ fontWeight: '600' }}>${payment.fee}</td>
            <td>
                <span className={`badge ${payment.status === 'Paid' ? 'badge-success' : 'badge-warning'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {payment.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {payment.status}
                </span>
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                {payment.paymentDate || '—'}
            </td>
        </tr>
    );
}
