"use client";
import React from 'react';
import { TrendingUp, Users, Activity, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Backend API Comment:
// GET /api/analytics/overview - Overall statistics
// GET /api/analytics/patient-trends - Patient growth data
// GET /api/analytics/diagnosis-distribution - Diagnosis breakdown

const PATIENT_GROWTH = [
    { month: 'Jan', patients: 45 },
    { month: 'Feb', patients: 52 },
    { month: 'Mar', patients: 61 },
    { month: 'Apr', patients: 68 },
    { month: 'May', patients: 75 },
    { month: 'Jun', patients: 82 },
];

const DIAGNOSIS_DATA = [
    { name: 'Anxiety', value: 35, color: '#6B9BD1' },
    { name: 'Depression', value: 28, color: '#A8D5BA' },
    { name: 'PTSD', value: 18, color: '#FDCB6E' },
    { name: 'Bipolar', value: 12, color: '#FF7675' },
    { name: 'Other', value: 7, color: '#DFE6E9' },
];

const RECOVERY_RATES = [
    { category: 'Excellent', count: 45 },
    { category: 'Good', count: 68 },
    { category: 'Fair', count: 32 },
    { category: 'Poor', count: 8 },
];

export default function AnalyticsPage() {
    return (
        <div>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Analytics & Insights</h1>
                <p style={{ color: 'var(--text-muted)' }}>Track patient outcomes and system performance.</p>
            </div>

            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <MetricCard icon={Users} label="Total Patients" value="153" change="+12%" positive />
                <MetricCard icon={Activity} label="Active Cases" value="89" change="+5%" positive />
                <MetricCard icon={TrendingUp} label="Recovery Rate" value="78%" change="+3%" positive />
                <MetricCard icon={AlertCircle} label="High Risk" value="12" change="-2" positive />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Patient Growth Chart */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Patient Growth (Last 6 Months)</h2>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={PATIENT_GROWTH}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                <XAxis dataKey="month" tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                                <YAxis tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="patients" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Diagnosis Distribution */}
                <div className="card">
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Diagnosis Distribution</h2>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={DIAGNOSIS_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {DIAGNOSIS_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        {DIAGNOSIS_DATA.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }}></div>
                                    <span>{item.name}</span>
                                </div>
                                <span style={{ fontWeight: '600' }}>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recovery Rates */}
            <div className="card">
                <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recovery Rate Distribution</h2>
                <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={RECOVERY_RATES}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                            <XAxis dataKey="category" tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                            <YAxis tick={{ fill: 'var(--text-light)', fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="count" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ icon: Icon, label, value, change, positive }) {
    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--bg-app)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={20} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '13px', color: positive ? 'var(--success)' : 'var(--danger)', fontWeight: '600' }}>
                {change}
            </div>
        </div>
    );
}
