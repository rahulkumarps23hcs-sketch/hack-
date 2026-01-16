"use client";
import React, { useState } from 'react';
import { ArrowLeft, Activity, Heart, AlertTriangle, Plus, Save, FileText, Pill, Watch, Moon, Footprints } from 'lucide-react';
import Link from 'next/link';
import TrendChart from '../../../components/TrendChart';

// Backend API Comment:
// GET /api/patients/:id - Patient Profile
// GET /api/patients/:id/vitals - Vitals History
// GET /api/patients/:id/mental-health - Mood/Anxiety History
// GET /api/patients/:id/wearable-data - Wearable fitness data
// POST /api/patients/:id/consultations - Save consultation notes
// GET /api/patients/:id/consultations - Get consultation history

const MOOD_DATA = [
    { date: 'Mon', mood: 4, anxiety: 3 },
    { date: 'Tue', mood: 5, anxiety: 4 },
    { date: 'Wed', mood: 6, anxiety: 2 },
    { date: 'Thu', mood: 5, anxiety: 5 },
    { date: 'Fri', mood: 7, anxiety: 3 },
    { date: 'Sat', mood: 8, anxiety: 2 },
    { date: 'Sun', mood: 7, anxiety: 2 },
];

const HEART_RATE_DATA = [
    { date: 'Mon', bpm: 72 },
    { date: 'Tue', bpm: 75 },
    { date: 'Wed', bpm: 71 },
    { date: 'Thu', bpm: 82 },
    { date: 'Fri', bpm: 74 },
    { date: 'Sat', bpm: 70 },
    { date: 'Sun', bpm: 72 },
];

const WEARABLE_DATA = {
    heartRate: [
        { date: 'Mon', avg: 68, min: 55, max: 95 },
        { date: 'Tue', avg: 72, min: 58, max: 98 },
        { date: 'Wed', avg: 70, min: 56, max: 92 },
        { date: 'Thu', avg: 75, min: 60, max: 110 }, // Abnormal max
        { date: 'Fri', avg: 69, min: 57, max: 94 },
        { date: 'Sat', avg: 67, min: 54, max: 88 },
        { date: 'Sun', avg: 68, min: 55, max: 90 },
    ],
    sleep: [
        { date: 'Mon', hours: 7.2, deep: 2.1, rem: 1.8 },
        { date: 'Tue', hours: 6.5, deep: 1.8, rem: 1.5 },
        { date: 'Wed', hours: 7.8, deep: 2.4, rem: 2.0 },
        { date: 'Thu', hours: 5.2, deep: 1.2, rem: 1.0 }, // Abnormal low
        { date: 'Fri', hours: 7.5, deep: 2.2, rem: 1.9 },
        { date: 'Sat', hours: 8.1, deep: 2.6, rem: 2.2 },
        { date: 'Sun', hours: 7.6, deep: 2.3, rem: 2.0 },
    ],
    activity: [
        { date: 'Mon', steps: 8200, calories: 420 },
        { date: 'Tue', steps: 9500, calories: 480 },
        { date: 'Wed', steps: 7800, calories: 390 },
        { date: 'Thu', steps: 4200, calories: 210 }, // Abnormal low
        { date: 'Fri', steps: 8900, calories: 450 },
        { date: 'Sat', steps: 10200, calories: 520 },
        { date: 'Sun', steps: 9100, calories: 460 },
    ]
};

const INITIAL_CONSULTATIONS = [
    {
        id: 1,
        date: 'Jan 20, 2024',
        notes: 'Patient showing signs of improvement. Sleep cycle regulating. Recommended continuing current medication.',
        prescriptions: [
            { medicine: 'Sertraline', dosage: '50mg', duration: '30 days' }
        ]
    },
    {
        id: 2,
        date: 'Jan 10, 2024',
        notes: 'Reported panic attack. Instructed breathing exercises. Patient agreed to try mindfulness.',
        prescriptions: []
    }
];

export default function PatientDetail({ params }) {
    const [consultations, setConsultations] = useState(INITIAL_CONSULTATIONS);
    const [showNotesForm, setShowNotesForm] = useState(false);
    const [notes, setNotes] = useState('');
    const [prescriptions, setPrescriptions] = useState([{ medicine: '', dosage: '', duration: '' }]);

    const patient = {
        id: params.id || 1,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        diagnosis: 'Generalized Anxiety Disorder',
        status: 'Improving',
        contact: '+1 (555) 123-4567',
        email: 'john.doe@example.com',
        allergies: ['Penicillin'],
        medications: ['Sertraline 50mg', 'Melatonin 3mg']
    };

    const handleAddPrescription = () => {
        setPrescriptions([...prescriptions, { medicine: '', dosage: '', duration: '' }]);
    };

    const handlePrescriptionChange = (index, field, value) => {
        const updated = [...prescriptions];
        updated[index][field] = value;
        setPrescriptions(updated);
    };

    const handleSaveConsultation = () => {
        if (!notes.trim()) {
            alert('Please enter consultation notes');
            return;
        }

        const newConsultation = {
            id: consultations.length + 1,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            notes: notes,
            prescriptions: prescriptions.filter(p => p.medicine.trim() !== '')
        };

        setConsultations([newConsultation, ...consultations]);
        setNotes('');
        setPrescriptions([{ medicine: '', dosage: '', duration: '' }]);
        setShowNotesForm(false);
        alert('Consultation saved successfully!');
    };

    // Calculate wearable averages
    const avgHeartRate = Math.round(WEARABLE_DATA.heartRate.reduce((sum, d) => sum + d.avg, 0) / WEARABLE_DATA.heartRate.length);
    const avgSleep = (WEARABLE_DATA.sleep.reduce((sum, d) => sum + d.hours, 0) / WEARABLE_DATA.sleep.length).toFixed(1);
    const avgSteps = Math.round(WEARABLE_DATA.activity.reduce((sum, d) => sum + d.steps, 0) / WEARABLE_DATA.activity.length);

    return (
        <div>
            {/* Top Navigation */}
            <div style={{ marginBottom: '24px' }}>
                <Link href="/patients" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>
                    <ArrowLeft size={16} /> Back to Patients
                </Link>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                            {patient.name.charAt(0)}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{patient.name}</h1>
                            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>
                                <span>ID: #{patient.id}</span>
                                <span>•</span>
                                <span>{patient.age} yrs, {patient.gender}</span>
                                <span>•</span>
                                <span>{patient.diagnosis}</span>
                            </div>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <span className="badge badge-success">{patient.status}</span>
                                {patient.allergies.length > 0 && <span className="badge badge-warning">Allergy Alert</span>}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => setShowNotesForm(!showNotesForm)}
                            className="btn btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Plus size={18} />
                            {showNotesForm ? 'Cancel' : 'New Consultation'}
                        </button>
                    </div>
                </div>
            </div>

            {/* New Consultation Form */}
            {showNotesForm && (
                <div className="card" style={{ marginBottom: '24px', background: 'var(--bg-app)', border: '2px solid var(--primary)' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileText size={20} color="var(--primary)" />
                        New Consultation Notes
                    </h2>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Clinical Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Enter consultation notes, observations, and recommendations..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <label style={{ fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Pill size={18} color="var(--primary)" />
                                Prescriptions
                            </label>
                            <button
                                onClick={handleAddPrescription}
                                className="btn btn-secondary"
                                style={{ padding: '6px 12px', fontSize: '13px' }}
                            >
                                + Add Medicine
                            </button>
                        </div>

                        {prescriptions.map((rx, index) => (
                            <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                                <input
                                    type="text"
                                    placeholder="Medicine name"
                                    value={rx.medicine}
                                    onChange={(e) => handlePrescriptionChange(index, 'medicine', e.target.value)}
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        fontSize: '14px'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Dosage (e.g., 50mg)"
                                    value={rx.dosage}
                                    onChange={(e) => handlePrescriptionChange(index, 'dosage', e.target.value)}
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        fontSize: '14px'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Duration (e.g., 30 days)"
                                    value={rx.duration}
                                    onChange={(e) => handlePrescriptionChange(index, 'duration', e.target.value)}
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleSaveConsultation}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Save size={18} />
                        Save Consultation
                    </button>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* LEFT COLUMN: Charts and History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Wearable & Fitness Data Section */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Watch size={20} color="var(--primary)" />
                                Wearable & Fitness Data
                            </h2>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '6px' }}>
                                Last 7 Days
                            </span>
                        </div>

                        {/* Summary Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                            <WearableStatCard
                                icon={Heart}
                                label="Avg Heart Rate"
                                value={`${avgHeartRate} BPM`}
                                color="var(--danger)"
                            />
                            <WearableStatCard
                                icon={Moon}
                                label="Avg Sleep"
                                value={`${avgSleep} hrs`}
                                color="var(--primary)"
                            />
                            <WearableStatCard
                                icon={Footprints}
                                label="Avg Steps"
                                value={avgSteps.toLocaleString()}
                                color="var(--success)"
                            />
                        </div>

                        {/* Wearable Charts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-muted)' }}>Heart Rate Trends</h3>
                                <div style={{ height: '180px' }}>
                                    <TrendChart data={WEARABLE_DATA.heartRate} dataKey="avg" color="var(--danger)" />
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-muted)' }}>Sleep Duration</h3>
                                <div style={{ height: '180px' }}>
                                    <TrendChart data={WEARABLE_DATA.sleep} dataKey="hours" color="var(--primary)" />
                                </div>
                                {WEARABLE_DATA.sleep.some(d => d.hours < 6) && (
                                    <div style={{ marginTop: '8px', padding: '8px 12px', background: '#FFF8F8', borderLeft: '3px solid var(--danger)', borderRadius: '4px', fontSize: '12px' }}>
                                        ⚠️ <strong>Low sleep detected</strong> on Thursday (5.2 hrs)
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-muted)' }}>Daily Activity (Steps)</h3>
                                <div style={{ height: '180px' }}>
                                    <TrendChart data={WEARABLE_DATA.activity} dataKey="steps" color="var(--success)" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mental Health Trends Chart */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Activity size={20} color="var(--primary)" />
                                Mental Health Trends
                            </h2>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div> Mood
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--warning)' }}></div> Anxiety
                                </div>
                            </div>
                        </div>

                        <div style={{ height: '300px' }}>
                            <TrendChart data={MOOD_DATA} dataKey="mood" color="var(--primary)" />
                        </div>
                    </div>

                    {/* Consultation History Timeline */}
                    <div className="card">
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Consultation History</h2>
                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                            <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border)' }}></div>

                            {consultations.map((consultation, index) => (
                                <ConsultationCard key={consultation.id} consultation={consultation} isLatest={index === 0} />
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Quick Stats, Meds, Alerts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Medications */}
                    <div className="card">
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Current Medications</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {patient.medications.map((med, i) => (
                                <div key={i} style={{ padding: '12px', background: 'var(--bg-app)', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    {med}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="card" style={{ background: '#FFF8F8', border: '1px solid #FFE4E4' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <AlertTriangle size={18} />
                            AI Risk Alert
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                            <strong>Irregular Heart Rate detected</strong> on Thursday. Correlates with reported high anxiety levels and poor sleep (5.2 hrs). Recommended check-up.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

function WearableStatCard({ icon: Icon, label, value, color }) {
    return (
        <div style={{
            padding: '16px',
            background: 'var(--bg-app)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={20} />
            </div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)' }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>{label}</div>
        </div>
    );
}

function ConsultationCard({ consultation, isLatest }) {
    return (
        <div style={{ position: 'relative', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{
                position: 'absolute',
                left: '-20px',
                top: '4px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isLatest ? 'var(--primary)' : 'var(--border)',
                border: '2px solid white'
            }}></div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{consultation.date}</div>
            <p style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '12px', lineHeight: '1.5' }}>
                {consultation.notes}
            </p>

            {consultation.prescriptions.length > 0 && (
                <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px' }}>PRESCRIPTIONS</div>
                    {consultation.prescriptions.map((rx, i) => (
                        <div key={i} style={{ fontSize: '13px', marginBottom: '4px' }}>
                            <strong>{rx.medicine}</strong> - {rx.dosage} for {rx.duration}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
